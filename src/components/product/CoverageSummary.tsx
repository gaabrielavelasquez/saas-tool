import * as stylex from "@stylexjs/stylex";
import {
  colorVars,
  spacingVars,
  radiusVars,
} from "@astryxdesign/core/theme/tokens.stylex";
import { Text } from "@astryxdesign/core/Text";
import type { FieldStatus } from "./StatusBadge";

const styles = stylex.create({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    gap: spacingVars["--spacing-4"],
    paddingBlock: spacingVars["--spacing-5"],
    paddingInline: spacingVars["--spacing-6"],
  },
  topRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  stat: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  percent: {
    fontSize: 34,
    fontWeight: 600,
    color: colorVars["--color-text-primary"],
    lineHeight: 1.1,
  },
  // "de los campos tiene contexto documentado" es la explicación del
  // número grande, no contenido deshabilitado.
  caption: {
    color: colorVars["--color-text-secondary"],
  },
  chips: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 6,
  },
  chip: {
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: radiusVars["--radius-full"],
  },
  documentadoDot: { backgroundColor: colorVars["--color-icon-green"] },
  sensibleDot: { backgroundColor: colorVars["--color-icon-orange"] },
  sinDocumentarDot: { backgroundColor: colorVars["--color-icon-disabled"] },
  bar: {
    display: "flex",
    gap: 2,
    height: 8,
    width: "100%",
    borderRadius: radiusVars["--radius-full"],
    overflow: "hidden",
  },
  segment: {
    height: "100%",
  },
  documentadoSegment: { backgroundColor: colorVars["--color-icon-green"] },
  sensibleSegment: { backgroundColor: colorVars["--color-icon-orange"] },
  sinDocumentarSegment: { backgroundColor: colorVars["--color-icon-disabled"] },
});

/**
 * Resumen de cobertura — CLAUDE.md P0 #4: % documentado, desglose por
 * estado, barra segmentada. Figma: "Cobertura", node 57:3.
 *
 * El % cuenta "documentado" y "sensible" juntos: un campo sensible SÍ
 * tiene el criterio documentado, solo que marcado para no tocar sin
 * preguntar — no es lo mismo que "sin documentar".
 */
export function CoverageSummary({ fields }: { fields: FieldStatus[] }) {
  const total = fields.length;
  const documentado = fields.filter((f) => f === "documentado").length;
  const sensible = fields.filter((f) => f === "sensible").length;
  const sinDocumentar = fields.filter((f) => f === "sin-documentar").length;
  const withContext = documentado + sensible;
  const percent = total > 0 ? Math.round((withContext / total) * 100) : 0;

  return (
    <div {...stylex.props(styles.wrapper)}>
      <div {...stylex.props(styles.topRow)}>
        <div {...stylex.props(styles.stat)}>
          <span {...stylex.props(styles.percent)}>{percent}%</span>
          <Text type="supporting" as="span" xstyle={styles.caption}>
            de los campos tiene contexto documentado
          </Text>
        </div>
        <div {...stylex.props(styles.chips)}>
          <div {...stylex.props(styles.chip)}>
            <span {...stylex.props(styles.dot, styles.documentadoDot)} />
            <Text type="supporting" as="span">
              {documentado} Documentados
            </Text>
          </div>
          <div {...stylex.props(styles.chip)}>
            <span {...stylex.props(styles.dot, styles.sensibleDot)} />
            <Text type="supporting" as="span">
              {sensible} Sensible
            </Text>
          </div>
          <div {...stylex.props(styles.chip)}>
            <span {...stylex.props(styles.dot, styles.sinDocumentarDot)} />
            <Text type="supporting" as="span">
              {sinDocumentar} Sin documentar
            </Text>
          </div>
        </div>
      </div>

      <div {...stylex.props(styles.bar)}>
        {documentado > 0 && (
          <div
            {...stylex.props(styles.segment, styles.documentadoSegment)}
            style={{ flexGrow: documentado }}
          />
        )}
        {sensible > 0 && (
          <div
            {...stylex.props(styles.segment, styles.sensibleSegment)}
            style={{ flexGrow: sensible }}
          />
        )}
        {sinDocumentar > 0 && (
          <div
            {...stylex.props(styles.segment, styles.sinDocumentarSegment)}
            style={{ flexGrow: sinDocumentar }}
          />
        )}
      </div>
    </div>
  );
}
