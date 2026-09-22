"use client";

import { useState } from "react";
import * as stylex from "@stylexjs/stylex";
import { AppShell } from "@astryxdesign/core/AppShell";
import { Popover } from "@astryxdesign/core/Popover";
import { radiusVars } from "@astryxdesign/core/theme/tokens.stylex";
import { Sidebar } from "@/components/host/Sidebar";
import { TopBar } from "@/components/host/TopBar";
import { HostSettingsPage } from "@/components/host/HostSettingsPage";
import { FieldRow } from "@/components/host/FieldRow";
import { StatusBadge, type FieldStatus } from "@/components/product/StatusBadge";
import { Launcher } from "@/components/product/Launcher";
import { AddCriterioForm } from "@/components/product/AddCriterioForm";

const styles = stylex.create({
  trigger: {
    background: "none",
    border: "none",
    padding: 0,
    cursor: "pointer",
    borderRadius: radiusVars["--radius-full"],
  },
});

export default function AgregarPage() {
  const [isOpen, setIsOpen] = useState(true);
  const [status, setStatus] = useState<FieldStatus>("sin-documentar");

  return (
    <AppShell topNav={<TopBar />} sideNav={<Sidebar />} contentPadding={6}>
      <HostSettingsPage
        breadcrumb="Campañas  ›  Envío de bienvenida  ›  Configuración"
        title="Envío de bienvenida"
        subtitle="Campaña de email · Activa"
        rows={[
          <FieldRow
            key="descuento"
            label="Límite de descuento por campaña"
            value="15%"
            badge={
              <Popover
                isOpen={isOpen}
                onOpenChange={setIsOpen}
                isModal={false}
                placement="below"
                alignment="end"
                label="Agregar el criterio de: Límite de descuento por campaña"
                content={
                  <AddCriterioForm
                    fieldLabel="Límite de descuento por campaña"
                    status={status}
                    placeholderExample="Se probó enviar a diario y bajaba el open rate un 12%. 3 envíos por semana es el punto óptimo para esta lista."
                    onCancel={() => setIsOpen(false)}
                    onSave={() => {
                      setStatus("documentado");
                      setIsOpen(false);
                    }}
                  />
                }
              >
                <button
                  type="button"
                  aria-label="Agregar el criterio de Límite de descuento por campaña"
                  {...stylex.props(styles.trigger)}
                >
                  <StatusBadge status={status} />
                </button>
              </Popover>
            }
          />,
          <FieldRow
            key="frecuencia"
            label="Frecuencia de envío de emails"
            value="3 por semana"
            badge={<StatusBadge status="documentado" />}
          />,
          <FieldRow
            key="segmento"
            label="Segmento por defecto"
            value="Clientes activos"
            badge={<StatusBadge status="documentado" />}
          />,
          <FieldRow
            key="lead"
            label="Campo de puntuación de lead"
            value="Score mayor a 80"
            badge={<StatusBadge status="sensible" />}
          />,
        ]}
      />

      <Launcher />
    </AppShell>
  );
}
