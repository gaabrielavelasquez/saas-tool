import * as stylex from "@stylexjs/stylex";
import { colorVars, spacingVars } from "@astryxdesign/core/theme/tokens.stylex";
import { Text } from "@astryxdesign/core/Text";

const styles = stylex.create({
  row: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: 56,
    paddingInline: spacingVars["--spacing-6"],
  },
  rowButton: {
    width: "100%",
    border: "none",
    textAlign: "left",
    cursor: "pointer",
    fontFamily: "inherit",
    backgroundColor: {
      default: colorVars["--color-background-surface"],
      ":hover": {
        "@media (hover: hover)":
          `color-mix(in srgb, ${colorVars["--color-background-surface"]}, ${colorVars["--color-tint-hover"]} 5%)`,
      },
    },
  },
  left: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  dot: {
    color: colorVars["--color-text-disabled"],
  },
});

/**
 * Una fila de la lista de campos del host mock ("Host UI / Settings
 * list" en Figma). `badge` recibe el StatusBadge — a veces envuelto en
 * Popover/HoverCard según la pantalla, por eso queda como slot.
 *
 * `onClick` es opcional: cuando se pasa (ej. la lista de Cobertura), la
 * fila entera se vuelve clickeable para saltar a ese campo. Sin él, es
 * la misma fila estática de siempre.
 */
export function FieldRow({
  label,
  value,
  badge,
  onClick,
}: {
  label: string;
  value: string;
  badge: React.ReactNode;
  onClick?: () => void;
}) {
  const content = (
    <>
      <div {...stylex.props(styles.left)}>
        <Text type="body" weight="medium">
          {label}
        </Text>
        <span {...stylex.props(styles.dot)}>·</span>
        <Text type="body" color="secondary">
          {value}
        </Text>
      </div>
      {badge}
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        {...stylex.props(styles.row, styles.rowButton)}
      >
        {content}
      </button>
    );
  }

  return <div {...stylex.props(styles.row)}>{content}</div>;
}
