import { defineTheme } from "@astryxdesign/core/theme";
import { figmaColor, figmaRadius, figmaTypography } from "./figma-tokens";

const fontFamily = "var(--font-plus-jakarta-sans)";
const fontFallbacks =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

/** Unitless line-height ratio (Astryx's own token convention), redondeado a 4 decimales. */
function leading(lineHeightPx: number, sizePx: number): string {
  return (lineHeightPx / sizePx).toFixed(4);
}

/**
 * Theme de Astryx armado con los valores reales de la página
 * "Fase 4 — Tokens" de Figma (ver src/theme/figma-tokens.ts).
 *
 * Cada override de `tokens` lleva un comentario con el nombre de capa
 * de Figma del que sale, para poder comparar Figma↔código.
 *
 * Decisiones registradas (confirmadas con Gabi):
 * - border/default (el más visible) → --color-border-emphasized;
 *   border/subtle → --color-border (el que usan los componentes por
 *   defecto). Mapeo por rol visual, no por coincidencia de nombre.
 * - interactive/hover (#33399a) no tiene token plano en Astryx: el
 *   hover de --color-accent se calcula con --color-tint-hover. Se deja
 *   sin override; ajustar por componente si hace falta el hex exacto.
 * - letter-spacing de Figma no tiene equivalente en el sistema de
 *   tokens de Astryx — no se puede portar acá. Aplicar vía `xstyle`
 *   en los componentes de texto que lo necesiten.
 * - Solo hay paleta clara en Figma (v1) — todos los valores son un
 *   único string (mismo valor en light y dark), no tuplas [light, dark].
 */
export const astryxTheme = defineTheme({
  name: "revops-docs",

  color: {
    accent: figmaColor["interactive/default"], // interactive/default
    neutralStyle: "warm", // Figma: "Paleta clara, cálida y calma"
  },

  typography: {
    body: { family: fontFamily, fallbacks: fontFallbacks },
    heading: { family: fontFamily, fallbacks: fontFallbacks },
  },

  tokens: {
    // color.accent (arriba) pasa por el generador de escala de Astryx y
    // NO conserva el hex exacto — se fuerza acá como override explícito
    // (los overrides explícitos siempre ganan sobre lo generado).
    "--color-accent": figmaColor["interactive/default"],

    // ---- Color — Fondos y bordes ----
    "--color-background-body": figmaColor["bg/canvas"],
    "--color-background-surface": figmaColor["bg/surface"],
    "--color-background-card": figmaColor["bg/surface"],
    "--color-background-popover": figmaColor["bg/surface"],
    "--color-background-muted": figmaColor["bg/subtle"],
    "--color-border-emphasized": figmaColor["border/default"],
    "--color-border": figmaColor["border/subtle"],

    // ---- Color — Texto e interactivo ----
    "--color-text-primary": figmaColor["text/primary"],
    "--color-icon-primary": figmaColor["text/primary"],
    "--color-text-secondary": figmaColor["text/secondary"],
    "--color-icon-secondary": figmaColor["text/secondary"],
    "--color-text-disabled": figmaColor["text/muted"], // cubre status/sin-documentar-icon también
    "--color-icon-disabled": figmaColor["text/muted"],
    "--color-accent-muted": figmaColor["interactive/subtle-bg"],

    // ---- Color — Estados: documentado → familia "green" ----
    "--color-background-green": figmaColor["status/documentado-bg"],
    "--color-icon-green": figmaColor["status/documentado-icon"],
    "--color-border-green": figmaColor["status/documentado-icon"],
    "--color-text-green": figmaColor["status/documentado-text"],

    // ---- Color — Estados: sensible → familia "orange" ----
    "--color-background-orange": figmaColor["status/sensible-bg"],
    "--color-icon-orange": figmaColor["status/sensible-icon"],
    "--color-border-orange": figmaColor["status/sensible-icon"],
    "--color-text-orange": figmaColor["status/sensible-text"],

    // ---- Radius (radius/full ≈ --radius-full default, sin override) ----
    "--radius-inner": `${figmaRadius.sm}px`,
    "--radius-element": `${figmaRadius.md}px`,
    "--radius-container": `${figmaRadius.lg}px`,

    // ---- Tipografía ----
    "--text-display-1-size": `${figmaTypography.display.size}px`,
    "--text-display-1-weight": `${figmaTypography.display.weight}`,
    "--text-display-1-leading": leading(
      figmaTypography.display.lineHeight,
      figmaTypography.display.size,
    ),

    "--text-heading-1-size": `${figmaTypography.h1.size}px`,
    "--text-heading-1-weight": `${figmaTypography.h1.weight}`,
    "--text-heading-1-leading": leading(
      figmaTypography.h1.lineHeight,
      figmaTypography.h1.size,
    ),

    "--text-heading-2-size": `${figmaTypography.h2.size}px`,
    "--text-heading-2-weight": `${figmaTypography.h2.weight}`,
    "--text-heading-2-leading": leading(
      figmaTypography.h2.lineHeight,
      figmaTypography.h2.size,
    ),

    "--text-heading-3-size": `${figmaTypography.h3.size}px`,
    "--text-heading-3-weight": `${figmaTypography.h3.weight}`,
    "--text-heading-3-leading": leading(
      figmaTypography.h3.lineHeight,
      figmaTypography.h3.size,
    ),

    // Body Medium no es un rol propio: se usa <Text type="body" weight="medium">.
    "--text-body-size": `${figmaTypography.body.size}px`,
    "--text-body-weight": `${figmaTypography.body.weight}`,
    "--text-body-leading": leading(
      figmaTypography.body.lineHeight,
      figmaTypography.body.size,
    ),

    // LABEL (uppercase, tracking +0.1px) → <Text type="label">.
    // El uppercase/tracking se aplica en el componente, no acá.
    "--text-label-size": `${figmaTypography.label.size}px`,
    "--text-label-weight": `${figmaTypography.label.weight}`,
    "--text-label-leading": leading(
      figmaTypography.label.lineHeight,
      figmaTypography.label.size,
    ),

    // Caption (metadatos/timestamps) → <Text type="supporting">.
    // "Small" (13px) no tiene slot propio: usar type="supporting" o
    // type="body" size="sm" según el caso, al construir componentes.
    "--text-supporting-size": `${figmaTypography.caption.size}px`,
    "--text-supporting-weight": `${figmaTypography.caption.weight}`,
    "--text-supporting-leading": leading(
      figmaTypography.caption.lineHeight,
      figmaTypography.caption.size,
    ),
  },
});
