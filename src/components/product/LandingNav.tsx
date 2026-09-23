import * as stylex from "@stylexjs/stylex";
import { colorVars } from "@astryxdesign/core/theme/tokens.stylex";
import { Text } from "@astryxdesign/core/Text";
import { Button } from "@astryxdesign/core/Button";
import { Stack } from "@astryxdesign/core/Stack";
import { InlayMark } from "./InlayMark";

/** Alto real del nav fijo — page.tsx lo usa para no tapar el hero debajo,
 * y el ancla de "Ver casos de ejemplo" lo usa como scroll-margin. */
export const LANDING_NAV_HEIGHT = 64;

const styles = stylex.create({
  nav: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    height: LANDING_NAV_HEIGHT,
    zIndex: 40,
    backgroundColor: colorVars["--color-background-body"],
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colorVars["--color-border"],
  },
});

/**
 * Nav fija de la landing (no confundir con TopBar.tsx, que es el chrome
 * del *producto*): marca + wordmark a la izquierda, un solo CTA a la
 * derecha. No usa TopNav de Astryx a propósito — ese componente está
 * pensado para el chrome de una app, no para una landing pública.
 */
export function LandingNav() {
  return (
    <Stack
      as="nav"
      direction="horizontal"
      justify="between"
      align="center"
      paddingInline={6}
      xstyle={styles.nav}
    >
      <Stack direction="horizontal" gap={2} align="center">
        <InlayMark size={24} />
        <Text type="label" weight="semibold">
          Inlay
        </Text>
      </Stack>
      <Button label="Ver demo" variant="primary" size="sm" href="/flujo-completo" />
    </Stack>
  );
}
