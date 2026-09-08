"use client";

import { useCekKota } from "@/components/CekKotaProvider";
import { CTA_LABEL, CTA_QUESTION } from "@/lib/content";

/**
 * Blok CTA yang identik di seluruh halaman: kalimat pengantar yang
 * sama, lalu satu tombol yang membuka lightbox (bukan pindah halaman).
 */
export function CtaBlock() {
  const { open } = useCekKota();

  return (
    <div className="pk-cta">
      <p className="pk-cta-q">
        {CTA_QUESTION[0]}
        <br />
        {CTA_QUESTION[1]}
      </p>
      <button type="button" className="pk-btn pk-btn--block" onClick={open}>
        {CTA_LABEL}
      </button>
    </div>
  );
}
