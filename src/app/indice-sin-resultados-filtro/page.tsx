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

// Esta campaña todavía no tiene ningún campo marcado como "sensible" —
// por eso el filtro "Sensible" da 0 resultados de verdad (no es un
// estado forzado: son los datos reales de esta campaña puntual).
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

export default function IndiceSinResultadosFiltroPage() {
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
        ]}
      />

      <Launcher isActive={isPanelOpen} onToggle={setIsPanelOpen} />

      {isPanelOpen && (
        <IndexPanel
          entries={ENTRIES}
          initialStatuses={["sensible"]}
          onClose={() => setIsPanelOpen(false)}
        />
      )}
    </AppShell>
  );
}
