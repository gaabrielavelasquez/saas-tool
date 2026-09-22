import { Plus_Jakarta_Sans } from "next/font/google";

// Figma "Fase 4 — Tokens" usa Plus Jakarta Sans en Regular/Medium/SemiBold
// para toda la escala tipográfica (body y headings comparten familia).
export const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plus-jakarta-sans",
});
