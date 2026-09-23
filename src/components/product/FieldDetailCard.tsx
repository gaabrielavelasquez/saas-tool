import * as stylex from "@stylexjs/stylex";
import { colorVars, spacingVars } from "@astryxdesign/core/theme/tokens.stylex";
import { Text } from "@astryxdesign/core/Text";
import { Button } from "@astryxdesign/core/Button";
import { Divider } from "@astryxdesign/core/Divider";
import { IconButton } from "@astryxdesign/core/IconButton";
import { StatusBadge, type FieldStatus } from "./StatusBadge";

const styles = stylex.create({
  card: {
    display: "flex",
    flexDirection: "column",
    gap: spacingVars["--spacing-4"],
    width: 380,
  },
  header: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: spacingVars["--spacing-3"],
  },
  headerLeft: {
    display: "flex",
    flexDirection: "column",
    gap: spacingVars["--spacing-1-5"],
  },
  section: {
    display: "flex",
    flexDirection: "column",
    gap: spacingVars["--spacing-1"],
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: 600,
    letterSpacing: 0.3,
    textTransform: "uppercase",
    color: colorVars["--color-text-secondary"],
  },
  footer: {
    display: "flex",
    justifyContent: "flex-end",
  },
});

/**
 * Card de detalle de un campo — CLAUDE.md P0 #2: sección única
 * "CRITERIO / CONTEXTO" + "REGISTRADO POR", anclada, 380px, no modal.
 * Figma: "Vista de detalle — por qué documentado", node 53:75.
 */
export function FieldDetailCard({
  fieldLabel,
  status,
  criterio,
  registradoPor,
  cuando,
  onClose,
  onEdit,
}: {
  fieldLabel: string;
  status: FieldStatus;
  criterio: string;
  registradoPor: string;
  cuando: string;
  onClose?: () => void;
  onEdit?: () => void;
}) {
  return (
    <div {...stylex.props(styles.card)}>
      <div {...stylex.props(styles.header)}>
        <div {...stylex.props(styles.headerLeft)}>
          <Text type="body" weight="semibold">
            {fieldLabel}
          </Text>
          <StatusBadge status={status} />
        </div>
        <IconButton
          label="Cerrar"
          tooltip="Cerrar"
          icon={<span aria-hidden>×</span>}
          variant="ghost"
          size="sm"
          onClick={onClose}
        />
      </div>

      <Divider />

      <div {...stylex.props(styles.section)}>
        <Text as="div" xstyle={styles.sectionLabel}>
          CRITERIO / CONTEXTO
        </Text>
        <Text type="body" color="secondary">
          {criterio}
        </Text>
      </div>

      <div {...stylex.props(styles.section)}>
        <Text as="div" xstyle={styles.sectionLabel}>
          REGISTRADO POR
        </Text>
        <Text type="body" color="secondary">
          {registradoPor} · {cuando}
        </Text>
      </div>

      <div {...stylex.props(styles.footer)}>
        <Button label="Editar" variant="secondary" size="sm" onClick={onEdit} />
      </div>
    </div>
  );
}
