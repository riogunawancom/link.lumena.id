import type { Metadata } from "next";

import { Footer } from "@/components/Footer";
import { IconCheck } from "@/components/Icons";
import { MetaPixelLead } from "@/components/MetaPixel";
import { Navbar } from "@/components/Navbar";
import { DEFAULT_WA_NUMBER, waChatHref, waPretext } from "@/lib/lead";

export const metadata: Metadata = {
  title: "Terima kasih — Program Kemitraan Lumena",
  description: "Data Anda sudah kami terima. Tim kemitraan Lumena akan menghubungi Anda.",
  robots: { index: false, follow: false },
};

/* Dibaca saat request (bukan build), jadi nomor bisa diganti tanpa
   build ulang. Kosong = pakai nomor tim kemitraan default. */
const WA_NUMBER = process.env.WA_NUMBER?.trim() || DEFAULT_WA_NUMBER;

/** Dibatasi panjangnya supaya parameter URL tidak bisa dipakai
    menaruh teks panjang di halaman. React meng-escape isinya. */
function readParam(value: string | string[] | undefined, max = 60): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

export default async function TerimaKasih({
  searchParams,
}: {
  searchParams: Promise<{ nama?: string | string[]; kota?: string | string[] }>;
}) {
  const params = await searchParams;
  const nama = readParam(params.nama);
  const kota = readParam(params.kota);

  const pretext = waPretext(nama, kota);
  const waHref = waChatHref(WA_NUMBER, pretext);

  return (
    <div className="pk-page">
      <Navbar />

      <main>
        <section className="pk-sec pk-ty" aria-labelledby="ty-title">
          <div className="pk-wrap pk-stack">
            <span className="pk-check" aria-hidden="true">
              <IconCheck />
            </span>

            <h1 className="pk-h1" id="ty-title">
              Data sudah kami terima.
            </h1>

            <p className="pk-p">
              Terima kasih, {nama || "Kak"}.
              <br />
              Tim kemitraan Lumena akan menghubungi Anda untuk membahas peluang di{" "}
              {kota || "kota Anda"}.
              <br />
              Ingin lebih cepat? Hubungi kami sekarang lewat WhatsApp.
            </p>

            {waHref ? (
              <a className="pk-btn" href={waHref} target="_blank" rel="noopener noreferrer">
                Terhubung Di WhatsApp
              </a>
            ) : (
              /* WA_NUMBER belum diisi — jangan kirim pengunjung ke link rusak. */
              <span className="pk-btn" aria-disabled="true" role="link">
                Terhubung Di WhatsApp
              </span>
            )}
          </div>
        </section>
      </main>

      <Footer />
      <MetaPixelLead />
    </div>
  );
}
