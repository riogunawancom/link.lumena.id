"use client";

import { useSearchParams } from "next/navigation";

import { IconCheck } from "@/components/Icons";
import { waChatHref, waPretext } from "@/lib/lead";

function readParam(value: string | null, max = 60): string {
  if (!value) return "";
  return value.trim().slice(0, max);
}

export function TerimaKasihCopy({ waNumber }: { waNumber: string }) {
  const params = useSearchParams();
  const nama = readParam(params.get("nama"));
  const kota = readParam(params.get("kota"));
  const pretext = waPretext(nama, kota);
  const waHref = waChatHref(waNumber, pretext);

  return (
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
          Tim kemitraan Lumena akan menghubungi Anda untuk membahas peluang di {kota || "kota Anda"}.
          <br />
          Ingin lebih cepat? Hubungi kami sekarang lewat WhatsApp.
        </p>

        {waHref ? (
          <a className="pk-btn" href={waHref} target="_blank" rel="noopener noreferrer">
            Terhubung Di WhatsApp
          </a>
        ) : (
          <span className="pk-btn" aria-disabled="true" role="link">
            Terhubung Di WhatsApp
          </span>
        )}
      </div>
    </section>
  );
}
