import type { Metadata } from "next";

import { CekKotaProvider } from "@/components/CekKotaProvider";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { FasilitasMitra } from "@/components/sections/FasilitasMitra";
import { Formulator } from "@/components/sections/Formulator";
import { HasilNyata } from "@/components/sections/HasilNyata";
import { Hero } from "@/components/sections/Hero";
import { HighlightCta } from "@/components/sections/HighlightCta";
import { Peluang } from "@/components/sections/Peluang";
import { ProductKnowledge } from "@/components/sections/ProductKnowledge";

export const metadata: Metadata = {
  alternates: { canonical: "/kemitraan-tea-tree" },
  openGraph: { url: "/kemitraan-tea-tree" },
};

export default function KemitraanTeaTree() {
  return (
    /* Provider hanya membungkus; isinya tetap server component, cuma
       tombol CTA dan lightbox-nya yang berjalan di browser. */
    <CekKotaProvider>
      <Navbar />
      <main>
        <Hero />
        <ProductKnowledge />
        <HasilNyata />
        <Formulator />
        <Peluang />
        <FasilitasMitra />
        <HighlightCta />
      </main>
      <Footer />
    </CekKotaProvider>
  );
}
