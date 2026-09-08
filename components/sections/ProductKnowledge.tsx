import Image from "next/image";

import { PHOTO, VIDEOS } from "@/lib/content";

const BADGES = ["BPOM NA18250118100", "Cruelty-free", "Fragrance-free"];

export function ProductKnowledge() {
  return (
    <section className="pk-sec" aria-labelledby="produk-title">
      <div className="pk-wrap pk-stack">
        <div className="pk-grid pk-grid--split pk-grid--split-b">
          <div className="pk-media pk-media--natural">
            <Image
              src={PHOTO.produk.src}
              alt={PHOTO.produk.alt}
              width={PHOTO.produk.width}
              height={PHOTO.produk.height}
              sizes="(max-width: 899px) 100vw, 400px"
            />
          </div>

          <div className="pk-stack">
            <h2 className="pk-h2 pk-p--accent" id="produk-title">
              Lumena Tea Tree Acne Serum
            </h2>
            <p className="pk-p">
              Serum untuk kulit berjerawat: melawan jerawat membandel, meredakan peradangan, dan
              menyamarkan bekasnya.
            </p>
            <p className="pk-p">
              Memadukan tea tree oil, salicylic acid, niacinamide + zinc PCA, dan centella +
              panthenol.
            </p>
            <p className="pk-p">
              Tekstur ringan, cepat meresap, tanpa pewangi, cocok untuk kulit sensitif.
            </p>
            <ul className="pk-pills">
              {BADGES.map((badge) => (
                <li key={badge} className="pk-pill">
                  {badge}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <h3 className="pk-sr">Video pengguna</h3>
        <div className="pk-grid pk-grid--3">
          {VIDEOS.map((video) => (
            <figure key={video.src} className="pk-card pk-card--media">
              <div className="pk-media pk-media--portrait">
                {/* Vertikal 9:16, tanpa autoplay — sesuai brief. */}
                <iframe
                  src={`${video.src}?autoplay=false&preload=false`}
                  title={`Video pengguna — ${video.nama}`}
                  loading="lazy"
                  allow="encrypted-media;picture-in-picture"
                  allowFullScreen
                />
              </div>
              <figcaption className="pk-caption">{video.nama}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
