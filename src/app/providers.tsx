"use client";

import { Theme } from "@astryxdesign/core/theme";
// Generado por `npm run theme:build` (predev/prebuild) a partir de
// src/theme/astryxTheme.ts — no editar src/theme/dist a mano.
import { revopsDocsTheme } from "@/theme/dist/revops-docs";
import { CampaignsProvider } from "@/lib/campaignsStore";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Theme theme={revopsDocsTheme}>
      <CampaignsProvider>{children}</CampaignsProvider>
    </Theme>
  );
}
