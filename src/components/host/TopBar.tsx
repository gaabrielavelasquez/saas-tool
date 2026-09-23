"use client";

import * as stylex from "@stylexjs/stylex";
import { colorVars } from "@astryxdesign/core/theme/tokens.stylex";
import { TopNav, TopNavHeading } from "@astryxdesign/core/TopNav";
import { IconButton } from "@astryxdesign/core/IconButton";
import { Icon } from "@astryxdesign/core/Icon";
import { Divider } from "@astryxdesign/core/Divider";
import { Stack } from "@astryxdesign/core/Stack";
import { HelpCircle, Bell } from "lucide-react";
import { InlayMark } from "@/components/product/InlayMark";

const styles = stylex.create({
  mark: {
    display: "inline-flex",
    color: colorVars["--color-accent"],
  },
  divider: {
    height: 20,
  },
});

/**
 * Top bar de la herramienta B2B anfitriona (mock genérico), Figma
 * component id 64:2 ("Top bar / Global"). Host, no producto propio —
 * la marca de Inlay se suma al lado (overlay inyectado), nunca
 * reemplaza al workspace del cliente.
 */
export function TopBar() {
  return (
    <TopNav
      label="Barra superior"
      heading={
        <Stack direction="horizontal" gap={3} vAlign="center">
          <span {...stylex.props(styles.mark)}>
            <InlayMark size={20} />
          </span>
          <Divider orientation="vertical" xstyle={styles.divider} />
          <TopNavHeading
            heading="Acme Corp"
            headerEndContent={
              <Icon icon="chevronDown" size="sm" color="secondary" />
            }
          />
        </Stack>
      }
      endContent={
        <>
          <IconButton
            label="Ayuda"
            tooltip="Ayuda"
            icon={<HelpCircle size={18} />}
            variant="ghost"
          />
          <IconButton
            label="Notificaciones"
            tooltip="Notificaciones"
            icon={<Bell size={18} />}
            variant="ghost"
          />
        </>
      }
    />
  );
}
