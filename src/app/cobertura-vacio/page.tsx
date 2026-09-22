"use client";

import { useRouter } from "next/navigation";
import { AppShell } from "@astryxdesign/core/AppShell";
import { Sidebar } from "@/components/host/Sidebar";
import { TopBar } from "@/components/host/TopBar";
import { HostSettingsPage } from "@/components/host/HostSettingsPage";
import { CoverageEmptyState } from "@/components/product/CoverageEmptyState";
import { Launcher } from "@/components/product/Launcher";

export default function CoberturaVacioPage() {
  const router = useRouter();

  return (
    <AppShell topNav={<TopBar />} sideNav={<Sidebar />} contentPadding={6}>
      <HostSettingsPage
        breadcrumb="Campañas  ›  Lanzamiento Q1 2027  ›  Cobertura"
        title="Lanzamiento Q1 2027"
        subtitle="Campaña de email · Activa"
        defaultTab="cobertura"
        rows={[
          <CoverageEmptyState
            key="empty"
            onGoToConfig={() => router.push("/agregar")}
          />,
        ]}
      />

      <Launcher />
    </AppShell>
  );
}
