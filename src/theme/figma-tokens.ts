/**
 * Valores reales extraídos de Figma, archivo `Herramienta-dashboard-B2B`
 * (fileKey Y8iUlG94EG5OlGlYKsS0dI), página "Fase 4 — Tokens" (node 39:2).
 *
 * Los nombres de las claves son exactamente los nombres de capa de Figma
 * (ej. "bg/canvas", "text/secondary") para poder comparar Figma↔código
 * directamente. No editar a mano — si el token sheet de Figma cambia,
 * volver a traer los valores con get_design_context sobre el node 39:65.
 */

export const figmaColor = {
  "bg/canvas": "#ffffff",
  "bg/surface": "#faf9f7",
  "bg/subtle": "#f3f1ed",
  "border/default": "#e7e3dc",
  "border/subtle": "#f3f1ed",

  "text/primary": "#2b2621",
  "text/secondary": "#5c544d",
  "text/muted": "#b8b0a3",
  "interactive/default": "#4f5cd1",
  "interactive/hover": "#33399a",
  "interactive/subtle-bg": "#e7e9fb",

  "status/documentado-bg": "#def2e4",
  "status/documentado-icon": "#3e9b5c",
  "status/documentado-text": "#245c37",
  "status/sensible-bg": "#fbeadb",
  "status/sensible-icon": "#c97a2b",
  "status/sensible-text": "#7a4a18",
  /** Reusa text/muted — "sin documentar" es neutral, sin color propio. */
  "status/sin-documentar-icon": "#b8b0a3",
} as const;

/** spacing/N = N × 4px — coincide exacto con la escala default de Astryx (--spacing-N). */
export const figmaSpacing = {
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
} as const;

export const figmaRadius = {
  sm: 6,
  md: 10,
  lg: 16,
  full: 999,
} as const;

export const figmaFontFamily = "Plus Jakarta Sans";

/** Cada valor: { tamaño en px, peso, alto de línea en px, tracking en px }. */
export const figmaTypography = {
  display: { size: 28, weight: 600, lineHeight: 36, letterSpacing: -0.4 },
  h1: { size: 22, weight: 600, lineHeight: 28, letterSpacing: -0.3 },
  h2: { size: 18, weight: 600, lineHeight: 24, letterSpacing: -0.2 },
  h3: { size: 16, weight: 500, lineHeight: 22, letterSpacing: -0.1 },
  bodyMedium: { size: 14, weight: 500, lineHeight: 20, letterSpacing: -0.1 },
  body: { size: 14, weight: 400, lineHeight: 20, letterSpacing: -0.1 },
  small: { size: 13, weight: 400, lineHeight: 18, letterSpacing: 0 },
  caption: { size: 12, weight: 400, lineHeight: 16, letterSpacing: 0 },
  label: { size: 12, weight: 500, lineHeight: 16, letterSpacing: 0.1 },
} as const;
