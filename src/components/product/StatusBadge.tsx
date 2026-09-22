"use client";

import * as stylex from "@stylexjs/stylex";
import { colorVars, radiusVars, spacingVars } from "@astryxdesign/core/theme/tokens.stylex";

export type FieldStatus = "documentado" | "sin-documentar" | "sensible";

const LABEL: Record<FieldStatus, string> = {
  documentado: "Documentado",
  "sin-documentar": "Sin documentar",
  sensible: "Sensible",
};

const styles = stylex.create({
  base: {
    display: "inline-flex",
    alignItems: "center",
    gap: spacingVars["--spacing-1-5"],
    paddingBlock: 5,
    paddingInline: 10,
    borderRadius: radiusVars["--radius-full"],
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: radiusVars["--radius-full"],
  },
  label: {
    fontSize: 12,
    fontWeight: 500,
  },
  documentadoBg: { backgroundColor: colorVars["--color-background-green"] },
  documentadoDot: { backgroundColor: colorVars["--color-icon-green"] },
  documentadoText: { color: colorVars["--color-text-green"] },
  sensibleBg: { backgroundColor: colorVars["--color-background-orange"] },
  sensibleDot: { backgroundColor: colorVars["--color-icon-orange"] },
  sensibleText: { color: colorVars["--color-text-orange"] },
  sinDocumentarBg: { backgroundColor: colorVars["--color-background-muted"] },
  sinDocumentarDot: { backgroundColor: colorVars["--color-icon-disabled"] },
  // El label del badge ("Sin documentar") es el estado real de un campo,
  // hay que poder leerlo — el token de disabled da ~2:1 contra el fondo
  // del badge, reprueba hasta AA. text-secondary ya está endurecido a
  // ~7.45:1 (AAA), igual que el resto del texto informativo del producto.
  sinDocumentarText: { color: colorVars["--color-text-secondary"] },
});

const VARIANT_STYLES: Record<
  FieldStatus,
  { bg: stylex.StyleXStyles; dot: stylex.StyleXStyles; text: stylex.StyleXStyles }
> = {
  documentado: {
    bg: styles.documentadoBg,
    dot: styles.documentadoDot,
    text: styles.documentadoText,
  },
  sensible: {
    bg: styles.sensibleBg,
    dot: styles.sensibleDot,
    text: styles.sensibleText,
  },
  "sin-documentar": {
    bg: styles.sinDocumentarBg,
    dot: styles.sinDocumentarDot,
    text: styles.sinDocumentarText,
  },
};

/**
 * Badge de estado por campo — CLAUDE.md, vocabulario: `documentado` /
 * `sin documentar` / `sensible`, badge + color semántico (no solo texto).
 */
export function StatusBadge({
  status,
  ref,
  id,
}: {
  status: FieldStatus;
  ref?: React.Ref<HTMLSpanElement>;
  id?: string;
}) {
  const variant = VARIANT_STYLES[status];
  return (
    <span ref={ref} id={id} {...stylex.props(styles.base, variant.bg)}>
      <span {...stylex.props(styles.dot, variant.dot)} />
      <span {...stylex.props(styles.label, variant.text)}>{LABEL[status]}</span>
    </span>
  );
}
