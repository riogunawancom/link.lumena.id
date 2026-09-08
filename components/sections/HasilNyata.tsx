import Image from "next/image";

import { HASIL_NYATA, HASIL_SIZE } from "@/lib/content";

export function HasilNyata() {
  return (
    <section className="pk-sec" aria-labelledby="hasil-title">
      <div className="pk-wrap pk-stack">
        <p className="pk-eyebrow">Hasil Nyata</p>
        <h2 className="pk-h2" id="hasil-title">
          Lihat Perubahannya
        </h2>
        <p className="pk-p">Simulasi penggunaan produk Tea Tree Acne Serum.</p>

        <div className="pk-grid pk-grid--3">
          {HASIL_NYATA.map((tahap) => (
            <figure key={tahap.src} className="pk-card pk-card--media">
              <div className="pk-media pk-media--natural">
                <Image
                  src={tahap.src}
                  alt={tahap.alt}
                  width={HASIL_SIZE.width}
                  height={HASIL_SIZE.height}
                  sizes="(max-width: 899px) 100vw, 340px"
                />
              </div>
              <figcaption className="pk-figcap">
                <span className="pk-h3 pk-p--accent">{tahap.judul}</span>
                <span className="pk-p pk-p--sm">{tahap.teks}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="pk-fine">
          Gambar di atas merupakan ilustrasi simulasi untuk menggambarkan tahapan perawatan. Hasil
          dapat berbeda pada setiap individu.
        </p>
      </div>
    </section>
  );
}
