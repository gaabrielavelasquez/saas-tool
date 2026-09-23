"use client";

import { useRouter } from "next/navigation";
import * as stylex from "@stylexjs/stylex";
import { AppShell } from "@astryxdesign/core/AppShell";
import { HoverCard } from "@astryxdesign/core/HoverCard";
import { radiusVars } from "@astryxdesign/core/theme/tokens.stylex";
import { Sidebar } from "@/components/host/Sidebar";
import { TopBar } from "@/components/host/TopBar";
import { HostSettingsPage } from "@/components/host/HostSettingsPage";
import { FieldRow } from "@/components/host/FieldRow";
import { StatusBadge } from "@/components/product/StatusBadge";
import { Launcher } from "@/components/product/Launcher";
import { FieldPreviewCard } from "@/components/product/FieldPreviewCard";

const styles = stylex.create({
  trigger: {
    background: "none",
    border: "none",
    padding: 0,
    cursor: "pointer",
    borderRadius: radiusVars["--radius-full"],
  },
});

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
                <button
                  type="button"
                  aria-label="Ver el criterio documentado de Frecuencia de envío de emails"
                  {...stylex.props(styles.trigger)}
                >
                  <StatusBadge status="documentado" />
                </button>
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
