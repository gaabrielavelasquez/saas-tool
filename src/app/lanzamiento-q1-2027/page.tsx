import { Suspense } from "react";
import { CampaignPage } from "@/components/product/CampaignPage";

export default function LanzamientoQ1_2027Page() {
  return (
    <Suspense fallback={null}>
      <CampaignPage campaignId="lanzamiento-q1-2027" />
    </Suspense>
  );
}
