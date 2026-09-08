import { isKnownCity } from "@/lib/cities";

export type Lead = {
  namaDepan: string;
  namaBelakang: string;
  email: string;
  whatsapp: string;
  kota: string;
};

/** Gabungan nama depan + belakang, untuk pre-text WA dan halaman terima kasih. */
export function joinNama(depan: string, belakang: string): string {
  return [depan, belakang].map((part) => part.trim()).filter(Boolean).join(" ");
}

/** Waktu kirim lead dalam zona Asia/Jakarta, contoh `08 Sep 2026, 12:41:46 WIB`. */
export function formatWaktuWib(date = new Date()): string {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Jakarta",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hourCycle: "h23",
    })
      .formatToParts(date)
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, part.value]),
  ) as Record<string, string>;
  return `${parts.day} ${parts.month} ${parts.year}, ${parts.hour}:${parts.minute}:${parts.second} WIB`;
}

export type FieldErrors = Partial<Record<keyof Lead, string>>;

export const DEFAULT_DIAL = "+62";

/** Nomor WhatsApp tim kemitraan untuk tombol di halaman terima kasih.
   Format wa.me: internasional, hanya digit. Bisa ditimpa lewat WA_NUMBER. */
export const DEFAULT_WA_NUMBER = "6281116613238";

/** Rapikan nomor ke digit wa.me (08… → 628…). */
export function waDigits(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.startsWith("0")) return `62${digits.slice(1)}`;
  return digits;
}

export function waChatHref(number: string, pretext: string): string | undefined {
  const digits = waDigits(number);
  if (!digits) return undefined;
  return `https://wa.me/${digits}?text=${encodeURIComponent(pretext)}`;
}

/** Kode negara yang bisa dipilih. Indonesia (+62) selalu di atas sebagai default. */
export const DIAL_OPTIONS = [
  { dial: "+62", iso: "ID", name: "Indonesia" },
  { dial: "+60", iso: "MY", name: "Malaysia" },
  { dial: "+65", iso: "SG", name: "Singapura" },
  { dial: "+673", iso: "BN", name: "Brunei" },
  { dial: "+66", iso: "TH", name: "Thailand" },
  { dial: "+63", iso: "PH", name: "Filipina" },
  { dial: "+84", iso: "VN", name: "Vietnam" },
  { dial: "+61", iso: "AU", name: "Australia" },
  { dial: "+1", iso: "US", name: "AS / Kanada" },
  { dial: "+44", iso: "GB", name: "Inggris" },
  { dial: "+31", iso: "NL", name: "Belanda" },
  { dial: "+49", iso: "DE", name: "Jerman" },
  { dial: "+81", iso: "JP", name: "Jepang" },
  { dial: "+82", iso: "KR", name: "Korea Selatan" },
  { dial: "+86", iso: "CN", name: "Tiongkok" },
  { dial: "+852", iso: "HK", name: "Hong Kong" },
  { dial: "+886", iso: "TW", name: "Taiwan" },
  { dial: "+966", iso: "SA", name: "Arab Saudi" },
  { dial: "+971", iso: "AE", name: "UEA" },
] as const;

const DIAL_DIGITS = DIAL_OPTIONS.map((o) => o.dial.slice(1)).sort(
  (a, b) => b.length - a.length,
);

const KNOWN_DIALS = new Set<string>(DIAL_OPTIONS.map((o) => o.dial));

function digitsOnly(value: string): string {
  return value.replace(/\D/g, "");
}

function matchDialDigits(digits: string): string | null {
  return DIAL_DIGITS.find((code) => digits.startsWith(code)) ?? null;
}

export function isKnownDial(dial: string): boolean {
  return KNOWN_DIALS.has(dial);
}

/** Email yang kelihatan bisa dihubungi — bukan sekadar ada tanda @. */
export function isValidEmail(value: string): boolean {
  const email = value.trim();
  if (email.length < 6 || email.length > 254) return false;
  if (email.includes("..")) return false;
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z]{2,})+$/.test(
    email,
  );
}

/**
 * Satukan nomor ke E.164 (`+62812…`).
 * `08…` dengan kode +62 jadi `+628…`. Nomor yang sudah diawali + atau 00
 * dianggap sudah memakai kode negara. Digit lokal tidak dicocokkan ke
 * kode negara lain (812… bukan +81).
 */
export function normalizeWhatsapp(raw: string, dial = DEFAULT_DIAL): string {
  const trimmed = raw.trim();
  if (!trimmed) return "";

  const explicit = trimmed.startsWith("+") || trimmed.startsWith("00");
  let digits = digitsOnly(trimmed);
  if (digits.startsWith("00")) digits = digits.slice(2);
  if (!digits) return "";

  const dialDigits = digitsOnly(isKnownDial(dial) ? dial : DEFAULT_DIAL);

  if (explicit) return `+${digits}`;

  if (digits.startsWith(dialDigits) && digits.length - dialDigits.length >= 6) {
    return `+${digits}`;
  }

  if (digits.startsWith("0")) {
    return `+${dialDigits}${digits.slice(1)}`;
  }

  return `+${dialDigits}${digits}`;
}

export function splitWhatsapp(
  raw: string,
  currentDial = DEFAULT_DIAL,
): { dial: string; local: string } {
  const trimmed = raw.trim();
  const e164 = normalizeWhatsapp(raw, currentDial);
  if (!e164) return { dial: currentDial, local: "" };

  const digits = e164.slice(1);
  const explicit = trimmed.startsWith("+") || trimmed.startsWith("00");
  if (explicit) {
    const prefix = matchDialDigits(digits);
    if (prefix) return { dial: `+${prefix}`, local: digits.slice(prefix.length) };
  }

  const dialDigits = digitsOnly(isKnownDial(currentDial) ? currentDial : DEFAULT_DIAL);
  if (digits.startsWith(dialDigits)) {
    return { dial: `+${dialDigits}`, local: digits.slice(dialDigits.length) };
  }
  return { dial: currentDial, local: digits };
}

export function isValidWhatsapp(value: string, dial = DEFAULT_DIAL): boolean {
  const e164 = normalizeWhatsapp(value, dial);
  if (!/^\+[1-9]\d{7,14}$/.test(e164)) return false;

  const digits = e164.slice(1);
  const prefix = matchDialDigits(digits);
  if (!prefix) return false;

  const subscriber = digits.slice(prefix.length);
  if (prefix === "62") {
    // HP Indonesia: 08… → 8…, 8–13 digit setelah kode negara.
    return /^8\d{7,12}$/.test(subscriber);
  }
  return subscriber.length >= 6 && subscriber.length <= 12;
}

/* Validasi yang sama dipakai di browser (umpan balik langsung) dan di
   route handler /api/lead (supaya tidak bisa dilewati). */
export function validateLead(input: Partial<Lead>): FieldErrors {
  const errors: FieldErrors = {};

  if (!input.namaDepan || input.namaDepan.trim().length < 1) {
    errors.namaDepan = "Mohon isi nama depan Anda.";
  }
  if (!input.namaBelakang || input.namaBelakang.trim().length < 1) {
    errors.namaBelakang = "Mohon isi nama belakang Anda.";
  }
  if (!isValidEmail(input.email ?? "")) {
    errors.email = "Mohon isi email yang valid.";
  }
  if (!isValidWhatsapp(input.whatsapp ?? "")) {
    errors.whatsapp = "Mohon isi nomor WhatsApp dengan kode negara yang valid.";
  }
  if (!input.kota || !isKnownCity(input.kota)) {
    errors.kota = "Mohon pilih kota dari daftar.";
  }

  return errors;
}

export function hasErrors(errors: FieldErrors): boolean {
  return Object.keys(errors).length > 0;
}

/* Pre-text WhatsApp — menyebut "sudah cek dan masih tersedia" supaya
   tim langsung tahu konteksnya (sesuai brief). */
export function waPretext(nama: string, kota: string): string {
  const orang = nama || "calon mitra";
  const tempat = kota || "kota saya";
  return (
    `Halo Lumena, saya ${orang} dari ${tempat}. ` +
    `Saya sudah cek dan ${tempat} masih tersedia. ` +
    `Saya tertarik menjadi mitra dan ingin tahu langkah selanjutnya.`
  );
}
