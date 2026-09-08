/* Parameter atribusi iklan dari query string + cookie Meta. Hanya kunci
   yang diizinkan yang diteruskan ke LEAD_ENDPOINT — jangan kirim seluruh
   query, supaya payload tidak bisa diisi sembarang. */

export const MARKETING_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "utm_id",
  "gclid",
  "gbraid",
  "wbraid",
  "fbclid",
  "external_id",
  "fbp",
  "fbc",
  "campaign_id",
  "adset_id",
  "ad_id",
  "ttclid",
  "msclkid",
] as const;

export type MarketingKey = (typeof MARKETING_KEYS)[number];
export type MarketingParams = Record<MarketingKey, string>;

const STORAGE_KEY = "pk-marketing";
export const EXTERNAL_ID_KEY = "pk-external-id";
const MAX_VALUE = 512;

export function emptyMarketing(): MarketingParams {
  return Object.fromEntries(MARKETING_KEYS.map((key) => [key, ""])) as MarketingParams;
}

export function sanitizeMarketingValue(raw: unknown): string {
  if (typeof raw !== "string") return "";
  return raw.replace(/[\u0000-\u001F\u007F]/g, "").trim().slice(0, MAX_VALUE);
}

/** Ambil hanya kunci allowlist dari objek bebas (body POST / storage). */
export function pickMarketing(input: unknown): MarketingParams {
  const out = emptyMarketing();
  if (!input || typeof input !== "object") return out;
  const rec = input as Record<string, unknown>;
  for (const key of MARKETING_KEYS) {
    out[key] = sanitizeMarketingValue(rec[key]);
  }
  return out;
}

export function parseMarketingSearch(search: string): Partial<MarketingParams> {
  const query = search.startsWith("?") ? search.slice(1) : search;
  const params = new URLSearchParams(query);
  const out: Partial<MarketingParams> = {};
  for (const key of MARKETING_KEYS) {
    const value = sanitizeMarketingValue(params.get(key) ?? "");
    if (value) out[key] = value;
  }
  return out;
}

function readStoredMarketing(): MarketingParams {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyMarketing();
    return pickMarketing(JSON.parse(raw) as unknown);
  } catch {
    return emptyMarketing();
  }
}

function readCookie(name: string): string {
  if (typeof document === "undefined") return "";
  const prefix = `${name}=`;
  const row = document.cookie.split("; ").find((part) => part.startsWith(prefix));
  if (!row) return "";
  try {
    return sanitizeMarketingValue(decodeURIComponent(row.slice(prefix.length)));
  } catch {
    return sanitizeMarketingValue(row.slice(prefix.length));
  }
}

/** Cookie `_fbc` Pixel, atau `fb.1.{waktu}.{fbclid}` kalau Pixel belum
    sempat menulis cookie. */
function resolveFbc(fbclid: string, cookieFbc: string, storedFbc: string): string {
  if (cookieFbc) return cookieFbc;
  if (fbclid) {
    if (storedFbc.endsWith(`.${fbclid}`)) return storedFbc;
    return `fb.1.${Date.now()}.${fbclid}`;
  }
  return storedFbc;
}

/** `external_id` dari URL iklan Meta, atau ID first-party yang stabil
    di localStorage (untuk CAPI / Advanced Matching). */
function resolveExternalId(fromUrl: string, stored: string): string {
  if (fromUrl) return fromUrl;
  if (stored) return stored;
  try {
    const existing = localStorage.getItem(EXTERNAL_ID_KEY);
    if (existing) return sanitizeMarketingValue(existing);
    const id = crypto.randomUUID();
    localStorage.setItem(EXTERNAL_ID_KEY, id);
    return id;
  } catch {
    return "";
  }
}

/** Gabungkan UTM/Meta di URL, cookie Pixel, dan yang sudah tersimpan.
    First-touch query tidak ditimpa oleh kunjungan tanpa parameter. */
export function persistMarketingFromUrl(): MarketingParams {
  const merged = readStoredMarketing();
  const fromUrl = parseMarketingSearch(window.location.search);
  for (const key of MARKETING_KEYS) {
    if (fromUrl[key]) merged[key] = fromUrl[key]!;
  }

  const fbp = readCookie("_fbp");
  if (fbp) merged.fbp = fbp;
  merged.fbc = resolveFbc(merged.fbclid, readCookie("_fbc"), merged.fbc);
  merged.external_id = resolveExternalId(fromUrl.external_id ?? "", merged.external_id);

  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  } catch {
    /* mode privat / kuota penuh — tetap kirim nilai yang sudah digabung */
  }
  return merged;
}

export function getMarketingForLead(): MarketingParams {
  return persistMarketingFromUrl();
}

/** Parameter klik (UTM, fbclid, external_id, …) untuk URL thank-you.
    Cookie Pixel `fbp`/`fbc` tidak ikut di query. */
export function appendMarketingQuery(
  params: URLSearchParams,
  marketing: MarketingParams,
): void {
  for (const key of MARKETING_KEYS) {
    if (key === "fbp" || key === "fbc") continue;
    const value = marketing[key];
    if (value) params.set(key, value);
  }
}

/** Cadangan di server kalau body klien tidak membawa UTM, tapi Referer
    masih menyertakan query landing page. */
export function marketingFromReferer(referer: string | null): MarketingParams {
  if (!referer) return emptyMarketing();
  try {
    return pickMarketing(parseMarketingSearch(new URL(referer).search));
  } catch {
    return emptyMarketing();
  }
}

export function mergeMarketing(
  primary: MarketingParams,
  fallback: MarketingParams,
): MarketingParams {
  const out = emptyMarketing();
  for (const key of MARKETING_KEYS) {
    out[key] = primary[key] || fallback[key];
  }
  return out;
}
