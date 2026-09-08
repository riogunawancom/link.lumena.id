import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";

import "@/_ds/lumena-design-system/colors_and_type.css";
import "@/_ds/lumena-design-system/ui_kits/registration/kit.css";
import "./globals.css";

import { MetaPixel } from "@/components/MetaPixel";
import { PersistMarketing } from "@/components/PersistMarketing";
import { PHOTO } from "@/lib/content";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  /* Supaya og:image jadi URL absolut. */
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://link.lumena.id"),
  title: "Program Kemitraan Lumena — Jadi Mitra Pertama di Kota Anda",
  description:
    "Lumena Tea Tree Acne Serum membuka kemitraan reseller, agen, dan distributor. Cek ketersediaan kota Anda.",
  openGraph: {
    type: "website",
    title: "Program Kemitraan Lumena — Jadi Mitra Pertama di Kota Anda",
    description:
      "Lumena Tea Tree Acne Serum membuka kemitraan reseller, agen, dan distributor. Cek ketersediaan kota Anda.",
    images: [PHOTO.hero.src],
  },
  icons: {
    icon: [{ url: "/logo.png", type: "image/png" }],
    apple: "/logo.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#211f21",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={poppins.variable}>
      <body>
        <MetaPixel />
        <PersistMarketing />
        {children}
      </body>
    </html>
  );
}
