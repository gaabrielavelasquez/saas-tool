import { Suspense } from "react";
import { CampaignPage } from "@/components/product/CampaignPage";

/**
 * Flujo principal P0+P1 completo, en memoria (sin backend todavía):
 * hover → preview → detalle → editar → guardar, Cobertura en vivo, y
 * ahora el launcher + Índice de justificaciones global (busca y salta
 * entre esta y las otras 2 campañas mock). El estado real vive en
 * `useCampaigns()` (src/lib/campaignsStore.tsx); esta página es solo el
 * wrapper de ruta para la campaña "Envío de bienvenida".
 *
 * `Suspense` es porque CampaignPage lee `useSearchParams()` (el
 * `?campo=` que arma el Índice al saltar de otra campaña) — Next.js
 * exige un límite de Suspense alrededor de esa lectura.
 */
export default function FlujoCompletoPage() {
  return (
    <Suspense fallback={null}>
      <CampaignPage campaignId="envio-de-bienvenida" />
    </Suspense>
  );
}
