import { AppShell } from "@astryxdesign/core/AppShell";
import { Sidebar } from "@/components/host/Sidebar";
import { TopBar } from "@/components/host/TopBar";
import { HostSettingsPage } from "@/components/host/HostSettingsPage";
import { FieldRow } from "@/components/host/FieldRow";
import { StatusBadge, type FieldStatus } from "@/components/product/StatusBadge";
import { CoverageSummary } from "@/components/product/CoverageSummary";
import { Launcher } from "@/components/product/Launcher";

const FIELDS: { label: string; value: string; status: FieldStatus }[] = [
  {
    label: "Límite de descuento por campaña",
    value: "15%",
    status: "sin-documentar",
  },
  {
    label: "Frecuencia de envío de emails",
    value: "3 por semana",
    status: "documentado",
  },
  {
    label: "Segmento por defecto",
    value: "Clientes activos",
    status: "documentado",
  },
  {
    label: "Campo de puntuación de lead",
    value: "Score mayor a 80",
    status: "sensible",
  },
];

export default function CoberturaPage() {
  return (
    <AppShell topNav={<TopBar />} sideNav={<Sidebar />} contentPadding={6}>
      <HostSettingsPage
        breadcrumb="Campañas  ›  Envío de bienvenida  ›  Cobertura"
        title="Envío de bienvenida"
        subtitle="Campaña de email · Activa"
        defaultTab="cobertura"
        summary={<CoverageSummary fields={FIELDS.map((f) => f.status)} />}
        rows={FIELDS.map((f) => (
          <FieldRow
            key={f.label}
            label={f.label}
            value={f.value}
            badge={<StatusBadge status={f.status} />}
          />
        ))}
      />

      <Launcher />
    </AppShell>
  );
}
