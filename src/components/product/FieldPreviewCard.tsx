import * as stylex from "@stylexjs/stylex";
import { colorVars, spacingVars } from "@astryxdesign/core/theme/tokens.stylex";
import { Text } from "@astryxdesign/core/Text";

const styles = stylex.create({
  card: {
    display: "flex",
    flexDirection: "column",
    gap: spacingVars["--spacing-2"],
    width: 280,
  },
  metaRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  // Quién y cuándo se documentó — mismo contenido que "REGISTRADO POR" en
  // la card de detalle completa (que ya usa secondary); no hay razón para
  // que este preview liviano sea menos accesible que la card completa.
  author: {
    color: colorVars["--color-text-secondary"],
  },
  link: {
    color: colorVars["--color-accent"],
    fontWeight: 500,
    fontSize: 11,
    background: "none",
    border: "none",
    cursor: "pointer",
    fontFamily: "inherit",
    padding: 0,
  },
});

/**
 * Preview del "por qué" al pasar el mouse sobre un badge documentado
 * (Figma: "Primer uso — Tooltip al pasar el mouse", node 51:5). Metadata
 * "quién/cuándo" 100% automática — CLAUDE.md, nunca la completa el
 * usuario a mano, formato de fecha relativo.
 */
export function FieldPreviewCard({
  criterio,
  registradoPor,
  cuando,
  onVerDetalle,
}: {
  criterio: string;
  registradoPor: string;
  cuando: string;
  onVerDetalle?: () => void;
}) {
  return (
    <div {...stylex.props(styles.card)}>
      <Text type="body" color="secondary">
        {criterio}
      </Text>
      <div {...stylex.props(styles.metaRow)}>
        <Text type="supporting" as="span" xstyle={styles.author}>
          {registradoPor} · {cuando}
        </Text>
        <button type="button" onClick={onVerDetalle} {...stylex.props(styles.link)}>
          Ver detalle →
        </button>
      </div>
    </div>
  );
}
