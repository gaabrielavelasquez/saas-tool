"use client";

import { useId } from "react";

/**
 * Marca de Inlay — ícono de app completo (fondo indigo + capas), no un
 * glyph de un solo trazo: a diferencia de la versión anterior, sus
 * colores vienen fijos en el propio archivo de marca (el indigo ya es
 * el mismo token de acento del producto), no de `currentColor`. Mismo
 * SVG en todos lados donde aparece la marca (home + chrome del
 * producto). `useId` evita que el filtro choque si el ícono aparece
 * más de una vez en la misma página (los ids de <filter> deben ser
 * únicos en el documento).
 */
export function InlayMark({ size = 26 }: { size?: number }) {
  const filterId = `inlay-mark-shadow-${useId()}`;
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" aria-hidden="true">
      <rect width="120" height="120" rx="10" fill="#4F5CD1" />
      <g filter={`url(#${filterId})`}>
        <circle cx="58.97" cy="31.01" r="9.01" fill="#F3F1ED" />
      </g>
      <path d="M48.0519 62.28H71.535L78.5799 68.11H40.4199L48.0519 62.28Z" fill="#F3F1ED" fillOpacity="0.8" />
      <path d="M47.4159 67.58H72.2036L79.6399 72.88H39.3599L47.4159 67.58Z" fill="#F3F1ED" fillOpacity="0.7" />
      <path d="M46.7798 71.82H72.8721L80.6998 77.12H38.2998L46.7798 71.82Z" fill="#F3F1ED" fillOpacity="0.6" />
      <path d="M46.1442 76.06H73.5412L81.7602 81.36H37.2402L46.1442 76.06Z" fill="#F3F1ED" fillOpacity="0.5" />
      <path d="M45.5082 80.3H74.2097L82.8202 85.6H36.1802L45.5082 80.3Z" fill="#F3F1ED" fillOpacity="0.4" />
      <path d="M44.8721 84.54H74.8783L83.8801 89.84H35.1201L44.8721 84.54Z" fill="#F3F1ED" fillOpacity="0.3" />
      <path d="M44.2361 88.78H75.5468L84.9401 94.08H34.0601L44.2361 88.78Z" fill="#F3F1ED" fillOpacity="0.3" />
      <path d="M43.6 93.02H76.2154L86 98.32H33L43.6 93.02Z" fill="#F3F1ED" fillOpacity="0.2" />
      <path d="M48.688 56.98H70.8664L77.52 62.81H41.48L48.688 56.98Z" fill="#F3F1ED" fillOpacity="0.9" />
      <path d="M49.43 51.68H70.63L76.99 57.51H42.54L49.43 51.68Z" fill="#F3F1ED" fillOpacity="0.95" />
      <path d="M50.5962 47.44H68.8608L74.3402 52.74H44.6602L50.5962 47.44Z" fill="#F3F1ED" />
      <defs>
        <filter id={filterId} x="40.42" y="12.46" width="37.1" height="37.1" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset />
          <feGaussianBlur stdDeviation="4.77" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.905882 0 0 0 0 0.913725 0 0 0 0 0.984314 0 0 0 1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_103_616" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_103_616" result="shape" />
        </filter>
      </defs>
    </svg>
  );
}
