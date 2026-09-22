"use client";

import { TopNav, TopNavHeading } from "@astryxdesign/core/TopNav";
import { IconButton } from "@astryxdesign/core/IconButton";
import { Icon } from "@astryxdesign/core/Icon";
import { HelpCircle, Bell } from "lucide-react";

/**
 * Top bar de la herramienta B2B anfitriona (mock genérico), Figma
 * component id 64:2 ("Top bar / Global"). Host, no producto propio.
 */
export function TopBar() {
  return (
    <TopNav
      label="Barra superior"
      heading={
        <TopNavHeading
          heading="Acme Corp"
          headerEndContent={
            <Icon icon="chevronDown" size="sm" color="secondary" />
          }
        />
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
