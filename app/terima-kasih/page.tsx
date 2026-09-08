import { Suspense } from "react";
import type { Metadata } from "next";

import { Footer } from "@/components/Footer";
import { MetaPixelLead } from "@/components/MetaPixel";
import { Navbar } from "@/components/Navbar";
import { TerimaKasihCopy } from "@/components/TerimaKasihCopy";
import { DEFAULT_WA_NUMBER } from "@/lib/lead";

export const metadata: Metadata = {
  title: "Terima kasih — Program Kemitraan Lumena",
  description: "Data Anda sudah kami terima. Tim kemitraan Lumena akan menghubungi Anda.",
  robots: { index: false, follow: false },
};

/* Nomor dibaca saat build Worker. Ganti WA_NUMBER lalu `npm run deploy`. */
const WA_NUMBER = process.env.WA_NUMBER?.trim() || DEFAULT_WA_NUMBER;

export default function TerimaKasih() {
  return (
    <div className="pk-page">
      <Navbar />

      <main>
        <Suspense>
          <TerimaKasihCopy waNumber={WA_NUMBER} />
        </Suspense>
      </main>

      <Footer />
      <MetaPixelLead />
    </div>
  );
}
