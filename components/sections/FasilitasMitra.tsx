import Image from "next/image";

import { IconCamera, IconPin, IconPlay } from "@/components/Icons";
import { PHOTO } from "@/lib/content";

export function FasilitasMitra() {
  return (
    <section className="pk-sec" aria-labelledby="fasilitas-title">
      <div className="pk-wrap pk-stack">
        <h2 className="pk-h2" id="fasilitas-title">
          Fasilitas mitra yang mendukung penjualan Anda.
        </h2>

        <div className="pk-grid pk-grid--facilities">
          {/* Fasilitas paling kuat untuk cold market, jadi diberi kartu
              terbesar — sesuai catatan di brief. */}
          <article className="pk-card pk-card--accent">
            <span className="pk-ico" aria-hidden="true">
              <IconPin />
            </span>
            <h3 className="pk-h3">Kontak Anda di Website Resmi Lumena</h3>
            <p className="pk-p">
              Nama dan nomor WhatsApp Anda dipasang di halaman resmi Lumena sebagai mitra kota
              Anda. Konsumen yang mencari produk di kota Anda menghubungi Anda langsung.
            </p>
            <div className="pk-media pk-media--natural pk-media--accent">
              <Image
                src={PHOTO.kontakMitra.src}
                alt={PHOTO.kontakMitra.alt}
                width={PHOTO.kontakMitra.width}
                height={PHOTO.kontakMitra.height}
                sizes="(max-width: 899px) 100vw, 640px"
              />
            </div>
          </article>

          <div className="pk-facility-col pk-grid">
            <article className="pk-card">
              <span className="pk-ico" aria-hidden="true">
                <IconCamera />
              </span>
              <h3 className="pk-h3">Foto &amp; Video Produk</h3>
              <p className="pk-p">
                Kumpulan foto dan video produk siap pakai — tinggal unggah ke TikTok, Instagram,
                atau marketplace tanpa perlu membuat materi sendiri.
              </p>
            </article>

            <article className="pk-card">
              <span className="pk-ico" aria-hidden="true">
                <IconPlay />
              </span>
              <h3 className="pk-h3">Video Pengguna</h3>
              <p className="pk-p">
                Video pengguna yang boleh Anda pakai di semua kanal jualan sebagai bukti produk
                bekerja.
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
