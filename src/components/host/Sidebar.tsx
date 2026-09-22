"use client";

import * as stylex from "@stylexjs/stylex";
import { colorVars } from "@astryxdesign/core/theme/tokens.stylex";
import {
  SideNav,
  SideNavItem,
  SideNavHeading,
  useSideNavCollapse,
} from "@astryxdesign/core/SideNav";
import { TextInput } from "@astryxdesign/core/TextInput";
import { Avatar } from "@astryxdesign/core/Avatar";
import { Text } from "@astryxdesign/core/Text";
import { Badge } from "@astryxdesign/core/Badge";
import { Stack } from "@astryxdesign/core/Layout";
import { Home, Flag, Users, BarChart3, Settings } from "lucide-react";

const styles = stylex.create({
  accentBadge: {
    backgroundColor: colorVars["--color-accent"],
    color: colorVars["--color-on-accent"],
  },
  mutedBadge: {
    backgroundColor: colorVars["--color-background-muted"],
    color: colorVars["--color-text-secondary"],
  },
  profileText: {
    minWidth: 0,
  },
});

/**
 * Astryx solo oculta la etiqueta de sus propios SideNavItem al colapsar
 * el rail — el contenido custom del `footer` (nuestro Avatar + texto) no
 * se adapta solo, por eso hay que leer el estado de colapso a mano acá.
 */
function SidebarProfile() {
  const { isCollapsed } = useSideNavCollapse();

  return (
    <Stack direction="horizontal" gap={3} vAlign="center">
      <Avatar name="Ana Torres" size="sm" />
      {!isCollapsed && (
        <div {...stylex.props(styles.profileText)}>
          <Text type="label" as="div" maxLines={1}>
            Ana Torres
          </Text>
          <Text type="supporting" color="secondary" as="div" maxLines={1}>
            Marketing Ops
          </Text>
        </div>
      )}
    </Stack>
  );
}

/**
 * Mismo problema que el footer: un TextInput completo no entra en el
 * rail colapsado (48px), así que se oculta en vez de quedar cortado.
 */
function SidebarSearch() {
  const { isCollapsed } = useSideNavCollapse();
  if (isCollapsed) return null;

  return (
    <TextInput
      label="Buscar"
      isLabelHidden
      placeholder="Buscar…"
      startIcon="search"
      value=""
      onChange={() => {}}
    />
  );
}

/**
 * Sidebar de la herramienta B2B anfitriona (mock genérico), Figma
 * component id 58:2 ("Sidebar / Host UI"). Es el host sobre el que se
 * inyecta la capa overlay del producto — no es UI propia del producto.
 */
export function Sidebar() {
  return (
    <SideNav
      collapsible={{ hasButton: true, buttonLabel: "Colapsar sidebar" }}
      header={<SideNavHeading heading="Panel de campañas" />}
      topContent={<SidebarSearch />}
      footer={<SidebarProfile />}
    >
      <SideNavItem label="Inicio" icon={Home} href="#" />
      <SideNavItem
        label="Campañas"
        icon={Flag}
        href="#"
        isSelected
        endContent={<Badge label="3" xstyle={styles.accentBadge} />}
      />
      <SideNavItem
        label="Contactos"
        icon={Users}
        href="#"
        endContent={<Badge label="12" xstyle={styles.mutedBadge} />}
      />
      <SideNavItem label="Reportes" icon={BarChart3} href="#" />
      <SideNavItem label="Configuración" icon={Settings} href="#" />
    </SideNav>
  );
}
