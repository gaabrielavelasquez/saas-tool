"use client";

import { useState } from "react";
import * as stylex from "@stylexjs/stylex";
import { colorVars, shadowVars } from "@astryxdesign/core/theme/tokens.stylex";
import { X } from "lucide-react";

const styles = stylex.create({
  button: {
    position: "fixed",
    right: 24,
    bottom: 24,
    // Por encima del IndexPanel (zIndex 50): en Figma el launcher queda
    // visible sobre el panel cuando está abierto, doblando como cierre.
    zIndex: 55,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 48,
    height: 48,
    borderRadius: 24,
    border: "none",
    cursor: "pointer",
    backgroundColor: {
      default: colorVars["--color-accent"],
      ":hover": colorVars["--color-accent"],
    },
    boxShadow: shadowVars["--shadow-low"],
    transitionProperty: "transform, box-shadow",
    transitionDuration: "150ms",
    transform: {
      default: "scale(1)",
      ":hover": "scale(1.05)",
    },
    // lucide's X icon defaults to stroke="currentColor" — setting `color`
    // here lets the active-state icon inherit it without a raw color prop.
    color: colorVars["--color-on-accent"],
  },
  bars: {
    display: "flex",
    flexDirection: "column",
    gap: 3.5,
  },
  bar: {
    height: 3,
    borderRadius: 1.5,
    backgroundColor: colorVars["--color-on-accent"],
  },
  barLg: { width: 22 },
  barMd: { width: 16 },
  barSm: { width: 10 },
});

/**
 * Launcher flotante — punto de entrada del overlay del producto (CLAUDE.md:
 * "launcher flotante circular, esquina inferior derecha, independiente de
 * la sidebar del host"). Figma component set State=Default/Hover/Active;
 * en Active el ícono cambia de 3 barras a una X (no solo el color).
 */
export function Launcher({
  isActive,
  onToggle,
  label = "Índice de justificaciones",
}: {
  isActive?: boolean;
  onToggle?: (isActive: boolean) => void;
  label?: string;
}) {
  const [internalActive, setInternalActive] = useState(false);
  const active = isActive ?? internalActive;

  function handleClick() {
    const next = !active;
    if (onToggle) onToggle(next);
    else setInternalActive(next);
  }

  return (
    <button
      type="button"
      id="product-launcher"
      aria-label={label}
      aria-pressed={active}
      onClick={handleClick}
      {...stylex.props(styles.button)}
    >
      {active ? (
        <X size={20} />
      ) : (
        <span {...stylex.props(styles.bars)}>
          <span {...stylex.props(styles.bar, styles.barLg)} />
          <span {...stylex.props(styles.bar, styles.barMd)} />
          <span {...stylex.props(styles.bar, styles.barSm)} />
        </span>
      )}
    </button>
  );
}
