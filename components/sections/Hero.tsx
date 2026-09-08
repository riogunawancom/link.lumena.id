import Image from "next/image";

import { CtaBlock } from "@/components/CtaBlock";
import { PHOTO } from "@/lib/content";

export function Hero() {
  return (
    <section className="pk-sec pk-hero" aria-labelledby="hero-title">
      <div className="pk-wrap pk-grid pk-hero-grid">
        <div className="pk-hero-copy">
          <div className="pk-hero-lead">
            <p className="pk-eyebrow">Kesempatan Emas</p>
            <h1 className="pk-h1" id="hero-title">
              Jadi Yang Pertama Di Kota Anda Serta Dapatkan Keuntungan Hingga 153%.
            </h1>
          </div>
          <p className="pk-p">
            Lumena Tea Tree Acne Serum membuka program kemitraan di kota Anda.
          </p>
          <CtaBlock />
        </div>

        {/* Di HP foto naik ke atas teks (wireframe 3b) lewat order di CSS. */}
        <div className="pk-media pk-media--natural pk-hero-media">
          <Image
            src={PHOTO.hero.src}
            alt={PHOTO.hero.alt}
            width={PHOTO.hero.width}
            height={PHOTO.hero.height}
            sizes="(max-width: 899px) 100vw, 400px"
            priority
          />
        </div>
      </div>
    </section>
  );
}
