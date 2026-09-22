"use client";

import { useState } from "react";
import { AppShell } from "@astryxdesign/core/AppShell";
import { Sidebar } from "@/components/host/Sidebar";
import { TopBar } from "@/components/host/TopBar";
import { HostSettingsPage } from "@/components/host/HostSettingsPage";
import { FieldRow } from "@/components/host/FieldRow";
import { StatusBadge } from "@/components/product/StatusBadge";
import { Launcher } from "@/components/product/Launcher";
import { IndexPanel, type IndexEntry } from "@/components/product/IndexPanel";

const ENTRIES: IndexEntry[] = [
  {
    fieldId: "frecuencia",
    fieldLabel: "Frecuencia de envío de emails",
    campaignId: "envio-de-bienvenida",
    campaignLabel: "Envío de bienvenida",
    status: "documentado",
  },
  {
    fieldId: "segmento",
    fieldLabel: "Segmento por defecto",
    campaignId: "envio-de-bienvenida",
    campaignLabel: "Envío de bienvenida",
    status: "documentado",
  },
  {
    fieldId: "ventana-inactividad",
    fieldLabel: "Ventana de inactividad",
    campaignId: "reactivacion-90-dias",
    campaignLabel: "Reactivación 90 días",
    status: "sensible",
  },
  {
    fieldId: "canal-reenganche",
    fieldLabel: "Canal de reenganche",
    campaignId: "reactivacion-90-dias",
    campaignLabel: "Reactivación 90 días",
    status: "sin-documentar",
  },
  {
    fieldId: "descuento-bf",
    fieldLabel: "Límite de descuento por campaña",
    campaignId: "black-friday-2026",
    campaignLabel: "Black Friday 2026",
    status: "sin-documentar",
  },
  {
    fieldId: "tope-envios-diarios",
    fieldLabel: "Tope de envíos diarios",
    campaignId: "black-friday-2026",
    campaignLabel: "Black Friday 2026",
    status: "documentado",
  },
];

export default function IndicePage() {
  const [isPanelOpen, setIsPanelOpen] = useState(true);

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
            badge={<StatusBadge status="sin-documentar" />}
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

      <Launcher isActive={isPanelOpen} onToggle={setIsPanelOpen} />

      {isPanelOpen && (
        <IndexPanel entries={ENTRIES} onClose={() => setIsPanelOpen(false)} />
      )}
    </AppShell>
  );
}
