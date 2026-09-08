import Image from "next/image";

import { PHOTO } from "@/lib/content";

export function Formulator() {
  return (
    <section className="pk-sec" aria-labelledby="formulator-title">
      <div className="pk-wrap pk-grid pk-grid--split pk-grid--split-c">
        {/* Masih dipotong ke 3:4 dari sumber 1:1 — belum diminta diubah. */}
        <div className="pk-media pk-media--person">
          <Image
            src={PHOTO.formulator.src}
            alt={PHOTO.formulator.alt}
            fill
            sizes="(max-width: 899px) 100vw, 375px"
          />
        </div>

        <div className="pk-card pk-card--quote">
          <h2 className="pk-h3" id="formulator-title">
            Formulator
          </h2>
          <div className="pk-stack" style={{ gap: 5 }}>
            <p className="pk-h2">dr. Nico A. Lumenta, K.Nefro, MM</p>
            <p className="pk-eyebrow">
              Dokter senior, pencetus keamanan pasien · Kabid Litbang KARS
            </p>
          </div>
          <p className="pk-p">
            Diformulasikan oleh dokter yang mengutamakan keamanan pasien.
          </p>
          <p className="pk-p">
            Di balik setiap botol, ada dokter senior yang bertanggung jawab. Produk yang lahir dari
            prinsip keamanan pasien.
          </p>
        </div>
      </div>
    </section>
  );
}
