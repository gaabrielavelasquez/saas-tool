import * as stylex from "@stylexjs/stylex";
import { colorVars } from "@astryxdesign/core/theme/tokens.stylex";
import { EmptyState } from "@astryxdesign/core/EmptyState";
import { Button } from "@astryxdesign/core/Button";

const styles = stylex.create({
  wrapper: {
    paddingBlock: 56,
    display: "flex",
    justifyContent: "center",
  },
  icon: {
    display: "flex",
    flexDirection: "column",
    gap: 3,
    alignItems: "center",
    justifyContent: "center",
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colorVars["--color-background-muted"],
  },
  bar: {
    height: 2.5,
    borderRadius: 1.25,
    backgroundColor: colorVars["--color-text-disabled"],
  },
});

/**
 * Cobertura — Vacío (empty state), Figma node 76:353. Se muestra cuando
 * una campaña recién creada todavía no tiene ningún campo con criterio.
 */
export function CoverageEmptyState({ onGoToConfig }: { onGoToConfig?: () => void }) {
  return (
    <div {...stylex.props(styles.wrapper)}>
      <EmptyState
        icon={
          <div {...stylex.props(styles.icon)}>
            <span {...stylex.props(styles.bar)} style={{ width: 22 }} />
            <span {...stylex.props(styles.bar)} style={{ width: 16 }} />
            <span {...stylex.props(styles.bar)} style={{ width: 10 }} />
          </div>
        }
        title="Todavía no hay nada documentado en esta campaña"
        description="Es normal en una campaña recién creada. A medida que se agreguen criterios en Configuración, van a aparecer acá."
        actions={
          <Button
            label="Ir a Configuración →"
            variant="primary"
            onClick={onGoToConfig}
          />
        }
      />
    </div>
  );
}
