import { NextResponse } from "next/server";

import { formatWaktuWib, hasErrors, joinNama, normalizeWhatsapp, validateLead, type Lead } from "@/lib/lead";
import {
  marketingFromReferer,
  mergeMarketing,
  pickMarketing,
  type MarketingParams,
} from "@/lib/marketing";

/* Endpoint hanya dibaca di server, jadi URL-nya tidak pernah ikut
   terkirim ke browser. */
const LEAD_ENDPOINT = process.env.LEAD_ENDPOINT;

export async function POST(request: Request) {
  let body: Partial<Lead> & Partial<MarketingParams>;

  try {
    body = (await request.json()) as Partial<Lead>;
  } catch {
    return NextResponse.json({ ok: false, error: "Body bukan JSON." }, { status: 400 });
  }

  /* Validasi diulang di server supaya tidak bisa dilewati dari browser. */
  const errors = validateLead(body);
  if (hasErrors(errors)) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  const namaDepan = body.namaDepan!.trim();
  const namaBelakang = body.namaBelakang!.trim();
  const referer = request.headers.get("referer");
  const marketing = mergeMarketing(pickMarketing(body), marketingFromReferer(referer));
  const lead = {
    namaDepan,
    namaBelakang,
    nama: joinNama(namaDepan, namaBelakang),
    email: body.email!.trim(),
    whatsapp: normalizeWhatsapp(body.whatsapp!.trim()),
    kota: body.kota!,
    waktu: formatWaktuWib(),
    sumber: referer ?? "link.lumena.id",
    ...marketing,
  };

  if (!LEAD_ENDPOINT) {
    /* Belum dikonfigurasi: jangan diam-diam membuang lead — catat di log
       server supaya ketahuan saat staging. */
    console.warn("LEAD_ENDPOINT belum diisi; lead tidak disimpan:", lead.email);
    return NextResponse.json({ ok: true, stored: false });
  }

  try {
    const response = await fetch(LEAD_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      console.error("Gagal menyimpan lead:", response.status, await response.text());
      return NextResponse.json({ ok: true, stored: false });
    }
  } catch (error) {
    console.error("Gagal menghubungi LEAD_ENDPOINT:", error);
    return NextResponse.json({ ok: true, stored: false });
  }

  return NextResponse.json({ ok: true, stored: true });
}
