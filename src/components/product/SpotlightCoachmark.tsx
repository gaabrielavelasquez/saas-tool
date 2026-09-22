"use client";

import { useEffect, useRef, useState } from "react";
import * as stylex from "@stylexjs/stylex";
import {
  colorVars,
  radiusVars,
  spacingVars,
  shadowVars,
} from "@astryxdesign/core/theme/tokens.stylex";
import { Text, Heading } from "@astryxdesign/core/Text";
import { Button } from "@astryxdesign/core/Button";

const RING_PADDING = 8;
const CARD_WIDTH = 360;
const GAP = 16;
const ARROW_SIZE = 8;
const ARROW_MARGIN = 20; // keeps the arrow off the card's rounded corners

const styles = stylex.create({
  ring: {
    position: "fixed",
    borderRadius: radiusVars["--radius-full"],
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: colorVars["--color-accent"],
    // The huge spread is the "spotlight": it dims the whole viewport
    // except for this element's own box (the cutout around the target).
    // Uses the theme's own overlay/scrim token, not an invented rgba.
    boxShadow: "0 0 0 9999px var(--color-overlay)",
    pointerEvents: "none",
    zIndex: 60,
    transitionProperty: "top, left, width, height",
    transitionDuration: "150ms",
  },
  card: {
    position: "fixed",
    zIndex: 61,
    width: CARD_WIDTH,
    display: "flex",
    flexDirection: "column",
    gap: spacingVars["--spacing-3"],
    padding: spacingVars["--spacing-6"],
    borderRadius: radiusVars["--radius-element"],
    backgroundColor: colorVars["--color-background-surface"],
    boxShadow: shadowVars["--shadow-med"],
  },
  arrowUp: {
    position: "fixed",
    zIndex: 61,
    width: 0,
    height: 0,
    borderLeftWidth: ARROW_SIZE,
    borderRightWidth: ARROW_SIZE,
    borderBottomWidth: ARROW_SIZE,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderLeftStyle: "solid",
    borderRightStyle: "solid",
    borderBottomStyle: "solid",
    borderBottomColor: colorVars["--color-background-surface"],
    pointerEvents: "none",
  },
  // Cuando no entra abajo (ej. el launcher, pegado al borde inferior), la
  // card se ubica arriba del target y la flecha se da vuelta para seguir
  // apuntando hacia él.
  arrowDown: {
    position: "fixed",
    zIndex: 61,
    width: 0,
    height: 0,
    borderLeftWidth: ARROW_SIZE,
    borderRightWidth: ARROW_SIZE,
    borderTopWidth: ARROW_SIZE,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderLeftStyle: "solid",
    borderRightStyle: "solid",
    borderTopStyle: "solid",
    borderTopColor: colorVars["--color-background-surface"],
    pointerEvents: "none",
  },
  // "Paso X de Y" es información real (en qué paso está el usuario), no
  // contenido deshabilitado — mismo criterio de contraste que el resto.
  step: {
    color: colorVars["--color-text-secondary"],
  },
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: spacingVars["--spacing-1"],
  },
  footerLeft: {
    display: "flex",
    alignItems: "center",
    gap: spacingVars["--spacing-4"],
  },
  // "Omitir" es un botón real y clickeable, no un control deshabilitado.
  skip: {
    color: colorVars["--color-text-secondary"],
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 500,
    fontFamily: "inherit",
  },
  back: {
    color: colorVars["--color-text-secondary"],
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 500,
    fontFamily: "inherit",
  },
});

// Techo aproximado de alto de la card (con 3-4 líneas de descripción) —
// no medimos el alto real a propósito: posicionar la card por `bottom`
// en vez de `top` cuando no entra abajo evita necesitar ese número exacto,
// esto solo decide DE QUÉ LADO va.
const CARD_MIN_SPACE_BELOW = 260;

/**
 * Onboarding tour — spotlight/coachmark reutilizable para cualquier paso
 * (Figma 44:3 es el paso 1). Atenúa toda la pantalla salvo un "agujero"
 * alrededor del elemento con id `targetId`, y muestra una card anclada
 * con el paso actual, texto y acciones. Si el target queda muy cerca del
 * borde inferior del viewport (ej. el launcher), la card se reacomoda
 * arriba en vez de abajo — la flecha se da vuelta con ella.
 */
export function SpotlightCoachmark({
  targetId,
  step,
  totalSteps,
  title,
  description,
  onSkip,
  onBack,
  onNext,
  onTargetMissing,
  nextLabel = "Siguiente →",
}: {
  targetId: string;
  step: number;
  totalSteps: number;
  title: string;
  description: string;
  onSkip: () => void;
  onBack?: () => void;
  onNext: () => void;
  /** El elemento con `targetId` no está en el DOM — ej. un paso mal
   * configurado, o llamado desde una pantalla donde ese target no
   * existe. Deja que quien orquesta el tour decida (típicamente,
   * saltar al siguiente paso) en vez de quedarse mostrando nada. */
  onTargetMissing?: () => void;
  nextLabel?: string;
}) {
  const [rect, setRect] = useState<DOMRect | null>(null);
  const reportedMissingRef = useRef(false);
  const primaryButtonRef = useRef<HTMLButtonElement>(null);
  const focusedForTargetRef = useRef<string | null>(null);

  useEffect(() => {
    reportedMissingRef.current = false;
    function measure() {
      const el = document.getElementById(targetId);
      setRect(el ? el.getBoundingClientRect() : null);
      if (!el && !reportedMissingRef.current) {
        reportedMissingRef.current = true;
        onTargetMissing?.();
      }
    }
    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, true);
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure, true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetId]);

  // Enfoca el botón principal apenas la card de este paso está realmente
  // en pantalla (rect ya resuelto) — una sola vez por paso, no en cada
  // re-medición por resize/scroll (que también actualiza `rect`), para
  // no robarle el foco al usuario si ya se movió a otro lado.
  useEffect(() => {
    if (rect && focusedForTargetRef.current !== targetId) {
      focusedForTargetRef.current = targetId;
      primaryButtonRef.current?.focus();
    }
  }, [rect, targetId]);

  if (!rect) return null;

  const ringTop = rect.top - RING_PADDING;
  const ringLeft = rect.left - RING_PADDING;
  const ringWidth = rect.width + RING_PADDING * 2;
  const ringHeight = rect.height + RING_PADDING * 2;

  const cardLeft = Math.max(
    16,
    Math.min(
      ringLeft + ringWidth - CARD_WIDTH,
      window.innerWidth - CARD_WIDTH - 16,
    ),
  );

  // Points at the ring's horizontal center, clamped so it never sits
  // over the card's rounded corners.
  const arrowLeft = Math.min(
    Math.max(ringLeft + ringWidth / 2 - ARROW_SIZE, cardLeft + ARROW_MARGIN),
    cardLeft + CARD_WIDTH - ARROW_MARGIN - ARROW_SIZE * 2,
  );

  const spaceBelow = window.innerHeight - (ringTop + ringHeight);
  const placeAbove = spaceBelow < CARD_MIN_SPACE_BELOW;

  const cardPositionStyle: React.CSSProperties = placeAbove
    ? { bottom: window.innerHeight - ringTop + GAP, left: cardLeft }
    : { top: ringTop + ringHeight + GAP, left: cardLeft };

  const arrowPositionStyle: React.CSSProperties = placeAbove
    ? { bottom: window.innerHeight - ringTop + GAP - ARROW_SIZE, left: arrowLeft }
    : { top: ringTop + ringHeight + GAP - ARROW_SIZE, left: arrowLeft };

  return (
    <>
      <div
        {...stylex.props(styles.ring)}
        style={{
          top: ringTop,
          left: ringLeft,
          width: ringWidth,
          height: ringHeight,
        }}
      />
      <div
        {...stylex.props(placeAbove ? styles.arrowDown : styles.arrowUp)}
        style={arrowPositionStyle}
      />
      <div {...stylex.props(styles.card)} style={cardPositionStyle}>
        <Text type="supporting" as="div" xstyle={styles.step}>
          Paso {step} de {totalSteps}
        </Text>
        <Heading level={3}>{title}</Heading>
        <Text type="body" color="secondary">
          {description}
        </Text>
        <div {...stylex.props(styles.footer)}>
          <div {...stylex.props(styles.footerLeft)}>
            <button type="button" onClick={onSkip} {...stylex.props(styles.skip)}>
              Omitir
            </button>
            {onBack && (
              <button type="button" onClick={onBack} {...stylex.props(styles.back)}>
                Volver
              </button>
            )}
          </div>
          <Button ref={primaryButtonRef} label={nextLabel} variant="primary" onClick={onNext} />
        </div>
      </div>
    </>
  );
}
