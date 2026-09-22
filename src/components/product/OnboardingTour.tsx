"use client";

import { useEffect, useRef, useState } from "react";
import * as stylex from "@stylexjs/stylex";
import {
  colorVars,
  radiusVars,
  shadowVars,
  spacingVars,
} from "@astryxdesign/core/theme/tokens.stylex";
import { SpotlightCoachmark } from "./SpotlightCoachmark";

export type TourStep = {
  targetId: string;
  title: string;
  description: string;
};

const FOCUSABLE_SELECTOR =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

function getFocusable(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (el) => el.offsetParent !== null,
  );
}

/**
 * Onboarding tour — P0, última pieza portada de Figma (paso 1, node
 * 44:3; los pasos 2-4 se definen en código, no tienen diseño propio).
 * Reusa SpotlightCoachmark por paso, y agrega lo que un tour necesita
 * encima: avanzar/retroceder, saltar pasos cuyo target no está en el DOM
 * (ej. si algún día un campo deja de existir), y cerrarse con click
 * afuera o Esc — mismo patrón que ya usamos en LauncherAndIndexPanel.
 */
export function OnboardingTour({
  steps,
  onClose,
}: {
  steps: TourStep[];
  onClose: () => void;
}) {
  const [stepIndex, setStepIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Si ya no queda ningún paso (el último se saltó o se completó), cierra.
  // Es la única setState real acá; el resto de la lógica de "saltar
  // pasos" vive en `onTargetMissing`, que solo llama a `setStepIndex` -
  // pero ese callback corre disparado por el efecto de SpotlightCoachmark
  // (el hijo), no por un efecto acá, así que no cae en la regla que
  // prohíbe setState síncrono en el cuerpo de un efecto propio.
  useEffect(() => {
    if (stepIndex >= steps.length) onClose();
  }, [stepIndex, steps.length, onClose]);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      // Trampa de foco: con el tour abierto, el resto de la pantalla está
      // atenuado a propósito — sin esto, Tab seguía el orden normal de
      // toda la página (topbar, sidebar, los 4 campos) antes de llegar a
      // los botones del tour, dejando interactuar con contenido "oculto".
      if (event.key === "Tab" && containerRef.current) {
        const focusable = getFocusable(containerRef.current);
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement;
        if (!containerRef.current.contains(active)) {
          event.preventDefault();
          first.focus();
        } else if (event.shiftKey && active === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && active === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  // Al desmontar (cualquier forma de cerrar: Esc, click afuera, Omitir,
  // Siguiente/Listo en el último paso), devuelve el foco al botón que
  // vuelve a abrir el tour — para el momento en que este efecto de
  // limpieza corre, React ya renderizó ese botón en su lugar.
  useEffect(() => {
    return () => {
      document.getElementById("restart-tour-button")?.focus();
    };
  }, []);

  if (stepIndex >= steps.length) return null;
  const current = steps[stepIndex];
  const isLast = stepIndex === steps.length - 1;

  return (
    <div ref={containerRef}>
      <SpotlightCoachmark
        targetId={current.targetId}
        step={stepIndex + 1}
        totalSteps={steps.length}
        title={current.title}
        description={current.description}
        onSkip={onClose}
        onBack={stepIndex > 0 ? () => setStepIndex((i) => i - 1) : undefined}
        onNext={isLast ? onClose : () => setStepIndex((i) => i + 1)}
        onTargetMissing={() => setStepIndex((i) => i + 1)}
        nextLabel={isLast ? "Listo" : "Siguiente →"}
      />
    </div>
  );
}

const restartStyles = stylex.create({
  button: {
    position: "fixed",
    right: 24,
    bottom: 84,
    zIndex: 55,
    display: "flex",
    alignItems: "center",
    paddingBlock: spacingVars["--spacing-2"],
    paddingInline: spacingVars["--spacing-3"],
    borderRadius: radiusVars["--radius-full"],
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colorVars["--color-border"],
    backgroundColor: colorVars["--color-background-surface"],
    color: colorVars["--color-text-secondary"],
    boxShadow: shadowVars["--shadow-low"],
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 500,
    fontFamily: "inherit",
  },
});

/**
 * Disparador manual del tour — no está en Figma, es un affordance de
 * desarrollo/testing (pedido explícitamente) para poder volver a verlo
 * las veces que haga falta sin depender del flag de "primera vez". Vive
 * en nuestra propia UI flotante (no en el chrome del host) para no
 * romper la separación overlay/host del producto.
 */
export function RestartTourButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      id="restart-tour-button"
      onClick={onClick}
      {...stylex.props(restartStyles.button)}
    >
      Ver tour
    </button>
  );
}
