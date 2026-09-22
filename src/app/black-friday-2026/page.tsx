import { Suspense } from "react";
import { CampaignPage } from "@/components/product/CampaignPage";

export default function BlackFriday2026Page() {
  return (
    <Suspense fallback={null}>
      <CampaignPage campaignId="black-friday-2026" />
    </Suspense>
  );
}
