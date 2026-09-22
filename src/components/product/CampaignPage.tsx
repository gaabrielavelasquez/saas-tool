"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AppShell } from "@astryxdesign/core/AppShell";
import { Sidebar } from "@/components/host/Sidebar";
import { TopBar } from "@/components/host/TopBar";
import { HostSettingsPage, type HostSettingsTab } from "@/components/host/HostSettingsPage";
import { FieldRow } from "@/components/host/FieldRow";
import { useCampaigns } from "@/lib/campaignsStore";
import { StatusBadge } from "./StatusBadge";
import { InteractiveStatusBadge } from "./InteractiveStatusBadge";
import { CoverageSummary } from "./CoverageSummary";
import { CoverageEmptyState } from "./CoverageEmptyState";
import { LauncherAndIndexPanel } from "./LauncherAndIndexPanel";
import { OnboardingTour, RestartTourButton, type TourStep } from "./OnboardingTour";
import type { IndexEntry } from "./IndexPanel";

function tourBadgeId(fieldId: string) {
  return `tour-badge-${fieldId}`;
}

/**
 * La pantalla de una campaña (host mock + flujo P0 + Índice global P1),
 * genérica por `campaignId` — la usan /flujo-completo y las otras
 * campañas mock. El estado documentado vive en `useCampaigns()`
 * (compartido entre todas), así el Índice puede buscar y saltar entre
 * campañas y la Cobertura de cada una queda siempre al día.
 */
export function CampaignPage({ campaignId }: { campaignId: string }) {
  const { campaigns, updateField, hasSeenOnboardingTour, markOnboardingTourSeen } =
    useCampaigns();
  const campaign = campaigns.find((c) => c.id === campaignId);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [tab, setTab] = useState<HostSettingsTab>("configuracion");
  // Si se llegó acá desde un resultado del Índice de otra campaña, la
  // URL trae `?campo=<id>` — se lee una sola vez, de forma síncrona en
  // el mount (no en un efecto), porque InteractiveStatusBadge decide si
  // auto-abrirse con el valor inicial de este estado.
  const [jumpToFieldId, setJumpToFieldId] = useState<string | null>(() =>
    searchParams.get("campo"),
  );

  useEffect(() => {
    // Solo limpia la URL una vez consumido el query param del mount —
    // no vuelve a correr aunque `jumpToFieldId` cambie después (ej. por
    // un salto desde Cobertura, que no toca la URL).
    if (searchParams.get("campo")) {
      router.replace(pathname, { scroll: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Onboarding — se dispara solo en el primer campaign page que se
  // visite en la sesión (el flag vive en campaignsStore, compartido).
  // Lazy init en vez de un efecto que llame setState propio: igual
  // patrón que `autoOpen` en InteractiveStatusBadge.
  const [isTourOpen, setIsTourOpen] = useState(() => !hasSeenOnboardingTour);
  const [isIndexPanelOpen, setIsIndexPanelOpen] = useState(false);

  useEffect(() => {
    // Solo notifica al padre (campaignsStore) que ya se mostró — no
    // setea estado propio, así que no cae en la regla de "setState
    // síncrono en el cuerpo del efecto".
    if (isTourOpen) markOnboardingTourSeen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!campaign) return null;

  function jumpToField(fieldId: string) {
    setJumpToFieldId(fieldId);
    setTab("configuracion");
  }

  function openTourManually() {
    setTab("configuracion");
    setIsTourOpen(true);
  }

  function handleSelectIndexEntry(entry: IndexEntry) {
    if (!campaign) return;
    if (entry.campaignId === campaign.id) {
      jumpToField(entry.fieldId);
      return;
    }
    const target = campaigns.find((c) => c.id === entry.campaignId);
    if (target) router.push(`${target.path}?campo=${entry.fieldId}`);
  }

  const allEntries: IndexEntry[] = campaigns.flatMap((c) =>
    c.fields.map((field) => ({
      fieldId: field.id,
      fieldLabel: field.label,
      campaignId: c.id,
      campaignLabel: c.name,
      status: field.status,
    })),
  );

  const configuracionRows = campaign.fields.map((field) => (
    <FieldRow
      key={field.id}
      label={field.label}
      value={field.value}
      badge={
        <InteractiveStatusBadge
          id={tourBadgeId(field.id)}
          fieldLabel={field.label}
          registradoPor={field.registradoPor}
          placeholderExample={field.placeholderExample}
          status={field.status}
          criterio={field.criterio}
          isSensitive={field.isSensitive}
          cuando={field.cuando}
          onSave={(value, sensitive) => updateField(campaign.id, field.id, value, sensitive)}
          autoOpen={field.id === jumpToFieldId}
          onAutoOpened={() => setJumpToFieldId(null)}
        />
      }
    />
  ));

  const coberturaRows = campaign.fields.map((field) => (
    <FieldRow
      key={field.id}
      label={field.label}
      value={field.value}
      badge={<StatusBadge status={field.status} />}
      onClick={() => jumpToField(field.id)}
    />
  ));

  const breadcrumbByTab: Record<HostSettingsTab, string> = {
    detalles: `Campañas  ›  ${campaign.name}  ›  Detalles`,
    configuracion: `Campañas  ›  ${campaign.name}  ›  Configuración`,
    actividad: `Campañas  ›  ${campaign.name}  ›  Actividad`,
    cobertura: `Campañas  ›  ${campaign.name}  ›  Cobertura`,
  };

  // Onboarding — 4 pasos, cada uno apunta a un elemento real ya
  // construido (nada de placeholders). Paso 1 de Figma (node 44:3);
  // pasos 2-4 sin diseño propio, definidos acá. Los targets de los
  // pasos 1 y 2 se resuelven con los datos reales de esta campaña —
  // así el mismo tour funciona en cualquiera de las 3.
  const firstSinDocumentar = campaign.fields.find((f) => f.status === "sin-documentar");
  const firstDocumentado = campaign.fields.find((f) => f.status === "documentado");
  const tourSteps: TourStep[] = [
    firstSinDocumentar && {
      targetId: tourBadgeId(firstSinDocumentar.id),
      title: 'Así se ve un campo sin "por qué"',
      description: "Acá vas a ver el por qué detrás de cada configuración.",
    },
    firstDocumentado && {
      targetId: tourBadgeId(firstDocumentado.id),
      title: "Previsualiza el criterio sin salir de la pantalla",
      description: "Pasa el mouse por el indicador para ver el criterio documentado.",
    },
    {
      targetId: "product-launcher",
      title: "Busca cualquier criterio documentado",
      description: "Accedé al índice completo, de cualquier campaña, desde acá.",
    },
    {
      targetId: "tour-tab-cobertura",
      title: "Revisa el nivel de cobertura del registro",
      description: "Mira qué tan documentado está todo el registro, de un vistazo.",
    },
  ].filter((s): s is TourStep => Boolean(s));

  return (
    <AppShell topNav={<TopBar />} sideNav={<Sidebar />} contentPadding={6}>
      <HostSettingsPage
        breadcrumb={breadcrumbByTab[tab]}
        title={campaign.name}
        subtitle={campaign.subtitle}
        tab={tab}
        onTabChange={setTab}
        summary={
          tab === "cobertura" && campaign.fields.length > 0 ? (
            <CoverageSummary fields={campaign.fields.map((field) => field.status)} />
          ) : undefined
        }
        rows={
          tab === "cobertura"
            ? campaign.fields.length === 0
              ? [<CoverageEmptyState key="empty" onGoToConfig={() => setTab("configuracion")} />]
              : coberturaRows
            : configuracionRows
        }
      />

      <LauncherAndIndexPanel
        entries={allEntries}
        onSelectEntry={handleSelectIndexEntry}
        onOpenChange={setIsIndexPanelOpen}
      />

      {isTourOpen ? (
        <OnboardingTour steps={tourSteps} onClose={() => setIsTourOpen(false)} />
      ) : (
        !isIndexPanelOpen && <RestartTourButton onClick={openTourManually} />
      )}
    </AppShell>
  );
}
