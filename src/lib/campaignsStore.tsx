"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { FieldStatus } from "@/components/product/StatusBadge";

export type FieldDoc = {
  id: string;
  label: string;
  value: string;
  registradoPor: string;
  placeholderExample: string;
  status: FieldStatus;
  criterio: string;
  isSensitive: boolean;
  cuando: string;
};

export type Campaign = {
  id: string;
  /** Ruta de la pantalla "host" de esta campaña — a donde navega el
   * Índice cuando el resultado elegido es de otra campaña. */
  path: string;
  name: string;
  subtitle: string;
  fields: FieldDoc[];
};

const INITIAL_CAMPAIGNS: Campaign[] = [
  {
    id: "envio-de-bienvenida",
    path: "/flujo-completo",
    name: "Envío de bienvenida",
    subtitle: "Campaña de email · Activa",
    fields: [
      {
        id: "descuento",
        label: "Límite de descuento por campaña",
        value: "15%",
        registradoPor: "Ana Torres",
        placeholderExample:
          "Se probó enviar a diario y bajaba el open rate un 12%. 3 envíos por semana es el punto óptimo para esta lista.",
        status: "sin-documentar",
        criterio: "",
        isSensitive: false,
        cuando: "",
      },
      {
        id: "frecuencia",
        label: "Frecuencia de envío de emails",
        value: "3 por semana",
        registradoPor: "Ana Torres",
        placeholderExample:
          "Se probó enviar a diario y bajaba el open rate un 12%. 3 envíos por semana es el punto óptimo para esta lista.",
        status: "documentado",
        criterio:
          "El equipo probaba distintas frecuencias de envío para esta lista de bienvenida. Se llegó a 3 envíos por semana: a diario bajaba el open rate 12%, y menos de 3 perdía momentum con los leads nuevos.",
        isSensitive: false,
        cuando: "hace 12 días",
      },
      {
        id: "segmento",
        label: "Segmento por defecto",
        value: "Clientes activos",
        registradoPor: "Ana Torres",
        placeholderExample: "Se eligió este segmento porque...",
        status: "documentado",
        criterio:
          "Se usa 'Clientes activos' porque los inactivos tienen tasas de apertura 3 veces más bajas y generan más quejas de spam en esta lista en particular.",
        isSensitive: false,
        cuando: "hace 12 días",
      },
      {
        id: "lead",
        label: "Campo de puntuación de lead",
        value: "Score mayor a 80",
        registradoPor: "Ana Torres",
        placeholderExample: "Explicá el criterio detrás de este valor...",
        status: "sensible",
        criterio:
          "Threshold acordado con el equipo de Ventas — por debajo de 80 se considera un lead frío. No cambiar este número sin avisarles primero.",
        isSensitive: true,
        cuando: "hace 12 días",
      },
    ],
  },
  {
    id: "reactivacion-90-dias",
    path: "/reactivacion-90-dias",
    name: "Reactivación 90 días",
    subtitle: "Campaña de email · Activa",
    fields: [
      {
        id: "ventana-inactividad",
        label: "Ventana de inactividad",
        value: "90 días",
        registradoPor: "Ana Torres",
        placeholderExample: "Se definió este número porque...",
        status: "sensible",
        criterio:
          "Se definió con Legal — antes eran 60 días, pero generaba quejas de gente que solo estaba de vacaciones. No bajarlo sin confirmar con ellos primero.",
        isSensitive: true,
        cuando: "hace 12 días",
      },
      {
        id: "canal-reenganche",
        label: "Canal de reenganche",
        value: "Email + push",
        registradoPor: "Ana Torres",
        placeholderExample: "Se eligió esta combinación de canales porque...",
        status: "sin-documentar",
        criterio: "",
        isSensitive: false,
        cuando: "",
      },
      {
        id: "descuento-reactivacion",
        label: "Descuento de reactivación",
        value: "20%",
        registradoPor: "Ana Torres",
        placeholderExample: "Se llegó a este descuento porque...",
        status: "documentado",
        criterio:
          "Se probó con 10% y la conversión fue muy baja (1.2%). Con 20% subió a 4.8%, y es el máximo que Finanzas aprobó para este segmento sin afectar el margen del trimestre.",
        isSensitive: false,
        cuando: "hace 8 días",
      },
      {
        id: "frecuencia-maxima-contacto",
        label: "Frecuencia máxima de contacto",
        value: "1 vez por semana",
        registradoPor: "Ana Torres",
        placeholderExample: "Se limitó el contacto porque...",
        status: "documentado",
        criterio:
          "Con más de 1 contacto semanal, los unsubscribes subían de 2% a 9% en pruebas anteriores sobre esta misma lista.",
        isSensitive: false,
        cuando: "hace 8 días",
      },
    ],
  },
  {
    id: "black-friday-2026",
    path: "/black-friday-2026",
    name: "Black Friday 2026",
    subtitle: "Campaña de email · Programada",
    fields: [
      {
        id: "descuento-bf",
        label: "Límite de descuento por campaña",
        value: "40%",
        registradoPor: "Ana Torres",
        placeholderExample: "Se llegó a este límite porque...",
        status: "sin-documentar",
        criterio: "",
        isSensitive: false,
        cuando: "",
      },
      {
        id: "tope-envios-diarios",
        label: "Tope de envíos diarios",
        value: "2 por día",
        registradoPor: "Ana Torres",
        placeholderExample: "Se definió este tope porque...",
        status: "documentado",
        criterio:
          "El año pasado con 4 envíos diarios el opt-out se disparó. 2 por día es el máximo que sostiene el engagement sin quemar la lista durante la semana de Black Friday.",
        isSensitive: false,
        cuando: "hace 3 días",
      },
      {
        id: "segmento-excluido",
        label: "Segmento excluido",
        value: "Compradores últimos 7 días",
        registradoPor: "Ana Torres",
        placeholderExample: "Se excluyó este segmento porque...",
        status: "sensible",
        criterio:
          "Excluir a quien ya compró evita el efecto 'me lo venden más barato al día siguiente' — hubo quejas directas a Atención al Cliente el año pasado. No sacar esta exclusión sin avisar a CS.",
        isSensitive: true,
        cuando: "hace 3 días",
      },
      {
        id: "umbral-stock-minimo",
        label: "Umbral de stock mínimo",
        value: "5 unidades",
        registradoPor: "Ana Torres",
        placeholderExample: "Se definió este umbral porque...",
        status: "sin-documentar",
        criterio: "",
        isSensitive: false,
        cuando: "",
      },
    ],
  },
  {
    // Campaña recién creada, sin ningún campo todavía — la única forma
    // real de llegar al estado "Cobertura vacío" (Figma node 76:353, que
    // usa este mismo nombre de campaña como ejemplo).
    id: "lanzamiento-q1-2027",
    path: "/lanzamiento-q1-2027",
    name: "Lanzamiento Q1 2027",
    subtitle: "Campaña de email · Activa",
    fields: [],
  },
];

type CampaignsContextValue = {
  campaigns: Campaign[];
  updateField: (
    campaignId: string,
    fieldId: string,
    value: string,
    sensitive: boolean,
  ) => void;
  /** Onboarding — Paso 1 (CLAUDE.md/Figma 44:3): true una vez que el tour
   * ya se mostró (automático o manual), para no disparar el automático
   * de nuevo en otra campaña dentro de la misma sesión. En memoria, como
   * el resto del estado acá — se resetea si se recarga la página, igual
   * que todo lo demás en esta demo. */
  hasSeenOnboardingTour: boolean;
  markOnboardingTourSeen: () => void;
};

const CampaignsContext = createContext<CampaignsContextValue | null>(null);

/**
 * Única fuente de verdad del estado documentado de las 3 campañas mock,
 * compartida por las pantallas de campaña y el panel de Índice (P1) —
 * así una edición en una campaña se ve reflejada en el Índice global y
 * en la Cobertura de esa campaña sin recargar. Todo en memoria, sin
 * backend, como el resto del flujo (CLAUDE.md).
 */
export function CampaignsProvider({ children }: { children: ReactNode }) {
  const [campaigns, setCampaigns] = useState<Campaign[]>(INITIAL_CAMPAIGNS);
  const [hasSeenOnboardingTour, setHasSeenOnboardingTour] = useState(false);

  function markOnboardingTourSeen() {
    setHasSeenOnboardingTour(true);
  }

  function updateField(
    campaignId: string,
    fieldId: string,
    value: string,
    sensitive: boolean,
  ) {
    setCampaigns((prev) =>
      prev.map((campaign) => {
        if (campaign.id !== campaignId) return campaign;
        return {
          ...campaign,
          fields: campaign.fields.map((field) => {
            if (field.id !== fieldId) return field;
            const trimmed = value.trim();
            if (trimmed.length === 0) {
              // Vaciar el criterio de un campo ya documentado lo vuelve
              // a sin-documentar (mismo comportamiento que en /flujo-completo).
              return { ...field, status: "sin-documentar", criterio: "", isSensitive: false };
            }
            return {
              ...field,
              status: sensitive ? "sensible" : "documentado",
              criterio: value,
              isSensitive: sensitive,
              cuando: "justo ahora",
            };
          }),
        };
      }),
    );
  }

  return (
    <CampaignsContext.Provider
      value={{ campaigns, updateField, hasSeenOnboardingTour, markOnboardingTourSeen }}
    >
      {children}
    </CampaignsContext.Provider>
  );
}

export function useCampaigns() {
  const ctx = useContext(CampaignsContext);
  if (!ctx) {
    throw new Error("useCampaigns debe usarse dentro de <CampaignsProvider>");
  }
  return ctx;
}
