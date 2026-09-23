/**
 * Wordmark de Inlay — un rombo insertado en un cuadrado, jugando con
 * "inlay" (algo incrustado en una superficie). Mismo SVG en todos lados
 * donde aparece la marca (home + chrome del producto) — un solo color
 * (currentColor), hereda el acento de quien lo envuelve.
 */
export function InlayMark({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <rect
        x="8.4"
        y="8.4"
        width="7.2"
        height="7.2"
        rx="1.2"
        fill="currentColor"
        transform="rotate(45 12 12)"
      />
    </svg>
  );
}
