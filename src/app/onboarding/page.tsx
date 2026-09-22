"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@astryxdesign/core/AppShell";
import { Sidebar } from "@/components/host/Sidebar";
import { TopBar } from "@/components/host/TopBar";
import { HostSettingsPage } from "@/components/host/HostSettingsPage";
import { FieldRow } from "@/components/host/FieldRow";
import { StatusBadge } from "@/components/product/StatusBadge";
import { Launcher } from "@/components/product/Launcher";
import { SpotlightCoachmark } from "@/components/product/SpotlightCoachmark";

export default function OnboardingPage() {
  const router = useRouter();
  const [showCoachmark, setShowCoachmark] = useState(true);

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
            badge={<StatusBadge id="onboarding-demo-badge" status="sin-documentar" />}
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

      {showCoachmark && (
        <SpotlightCoachmark
          targetId="onboarding-demo-badge"
          step={1}
          totalSteps={4}
          title='Así se ve un campo sin "por qué"'
          description="Este punto te avisa cuando un campo todavía no tiene el criterio documentado. En el siguiente paso vas a ver cómo agregarlo."
          onSkip={() => setShowCoachmark(false)}
          onNext={() => router.push("/agregar")}
        />
      )}
    </AppShell>
  );
}
