"use client";

import { useRouter } from "next/navigation";
import { AppShell } from "@astryxdesign/core/AppShell";
import { HoverCard } from "@astryxdesign/core/HoverCard";
import { Sidebar } from "@/components/host/Sidebar";
import { TopBar } from "@/components/host/TopBar";
import { HostSettingsPage } from "@/components/host/HostSettingsPage";
import { FieldRow } from "@/components/host/FieldRow";
import { StatusBadge } from "@/components/product/StatusBadge";
import { Launcher } from "@/components/product/Launcher";
import { FieldPreviewCard } from "@/components/product/FieldPreviewCard";

export default function PrimerUsoPage() {
  const router = useRouter();

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
            badge={
              <HoverCard
                placement="below"
                alignment="end"
                label="Vista previa del criterio documentado"
                content={
                  <FieldPreviewCard
                    criterio="Se probó a diario y bajaba el open rate 12%. 3 envíos por semana es el punto óptimo para esta lista."
                    registradoPor="Ana Torres"
                    cuando="hace 12 días"
                    onVerDetalle={() => router.push("/detalle")}
                  />
                }
              >
                <StatusBadge status="documentado" />
              </HoverCard>
            }
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
