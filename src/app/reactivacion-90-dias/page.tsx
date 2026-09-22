import { Suspense } from "react";
import { CampaignPage } from "@/components/product/CampaignPage";

export default function ReactivacionNoventaDiasPage() {
  return (
    <Suspense fallback={null}>
      <CampaignPage campaignId="reactivacion-90-dias" />
    </Suspense>
  );
}
