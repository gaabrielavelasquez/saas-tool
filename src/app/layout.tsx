import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { plusJakartaSans } from "./fonts";

export const metadata: Metadata = {
  title: "SaaS Tool",
  description: "Capa de documentación contextual para RevOps",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={plusJakartaSans.variable}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
