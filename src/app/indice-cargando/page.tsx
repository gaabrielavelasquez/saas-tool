"use client";

import { useEffect, useState } from "react";
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

/**
 * Arranca "cargando" en cada montaje y revela los datos a los 1.5s. El
 * único setState corre dentro del callback del timer, nunca sincrónico
 * en el cuerpo del efecto (regla react-hooks/set-state-in-effect).
 */
function LoadingIndexPanel({ onClose }: { onClose: () => void }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return <IndexPanel entries={ENTRIES} isLoading={isLoading} onClose={onClose} />;
}

/**
 * Demuestra el estado "Índice — Cargando (skeleton)" (Figma 76:865).
 * En un caso real esto dura lo que tarda la carga; acá lo mantenemos
 * 1.5s fijos para poder verlo sin tener que interceptar una red real.
 * `openKey` fuerza un remount de LoadingIndexPanel en cada apertura,
 * así el ciclo de carga se repite cada vez que se vuelve a abrir.
 */
export default function IndiceCargandoPage() {
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [openKey, setOpenKey] = useState(0);

  function handleToggle(next: boolean) {
    setIsPanelOpen(next);
    if (next) setOpenKey((k) => k + 1);
  }

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

      <Launcher isActive={isPanelOpen} onToggle={handleToggle} />

      {isPanelOpen && (
        <LoadingIndexPanel key={openKey} onClose={() => setIsPanelOpen(false)} />
      )}
    </AppShell>
  );
}
