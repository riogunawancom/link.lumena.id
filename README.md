# link.lumena.id — Landing Page Program Kemitraan

Next.js 16 (App Router) + TypeScript. Implementasi dari wireframe Claude
Design **"Lumena partnership website wireframes"** →
`Lumena Kemitraan Wireframes.dc.html` (artboard `3a` desktop, `3b` mobile,
`3c` lightbox, `3d` Thank You).

```bash
npm install
cp .env.example .env.local   # lalu isi (lihat "Sebelum go-live")
npm run dev                  # http://localhost:5188/kemitraan-tea-tree
```

Perintah lain: `npm run build`, `npm start`, `npm run typecheck`.

---

## Struktur

```
app/
  layout.tsx              Font, metadata, base Meta Pixel
  kemitraan-tea-tree/     Landing page — merangkai 7 bagian
  globals.css             Style halaman, di atas token design system
  terima-kasih/page.tsx   Halaman Thank You (server component)
  api/lead/route.ts       Penerima lead → meneruskan ke LEAD_ENDPOINT

components/
  CekKotaProvider.tsx     Context: semua tombol CTA membuka lightbox yang sama
  CekKotaModal.tsx        Lightbox 3 langkah
  CityCombobox.tsx        Dropdown kota dengan pencarian
  CtaBlock.tsx            Kalimat pengantar + tombol (identik di semua bagian)
  Navbar.tsx  Footer.tsx  Icons.tsx  MetaPixel.tsx
  sections/               Hero, ProductKnowledge, HasilNyata, Formulator,
                          Peluang, FasilitasMitra, HighlightCta

lib/
  cities.ts               Daftar kota + pencocokan
  lead.ts                 Tipe, validasi, pre-text WhatsApp
  content.ts              Copy & URL aset yang dipakai lebih dari sekali

_ds/lumena-design-system/ Design system Lumena (divendor dari project Design)
public/                   Logo Lumena (riptide + putih)
public/foto/              Foto produk & formulator (di-host sendiri)
design/                   Sumber wireframe, untuk referensi
```

Hanya `CekKotaProvider`, `CekKotaModal`, `CityCombobox`, dan `CtaBlock`
yang berjalan di browser. Sisanya server component.

---

## Sebelum go-live

Isi `.env.local`:

| Variabel | Wajib | Keterangan |
|---|---|---|
| `WA_NUMBER` | ✅ | Nomor WhatsApp tim, format internasional tanpa `+`, mis. `6281234567890`. **Selama kosong tombol "Terhubung Di WhatsApp" dinonaktifkan.** Dibaca saat request, jadi bisa diganti tanpa build ulang. |
| `LEAD_ENDPOINT` | ✅ | URL penerima lead. **Selama kosong lead TIDAK tersimpan** — hanya jadi warning di log server. Hanya dibaca di server, tidak pernah sampai ke browser. |
| `NEXT_PUBLIC_META_PIXEL_ID` | — | Kalau kosong, tidak ada request pihak ketiga sama sekali. Kalau diisi, base code otomatis dipasang dan event `Lead` dikirim di halaman terima kasih. |

`LEAD_ENDPOINT` menerima `POST` JSON:

```json
{ "namaDepan": "…", "namaBelakang": "…", "nama": "…",
  "email": "…", "whatsapp": "…", "kota": "…",
  "waktu": "08 Sep 2026, 12:41:46 WIB", "sumber": "…",
  "utm_source": "…", "utm_medium": "…", "utm_campaign": "…",
  "utm_content": "…", "utm_term": "…", "utm_id": "…",
  "gclid": "…", "gbraid": "…", "wbraid": "…",
  "fbclid": "…", "external_id": "…", "fbp": "…", "fbc": "…",
  "campaign_id": "…", "adset_id": "…", "ad_id": "…",
  "ttclid": "…", "msclkid": "…" }
```

Parameter iklan Meta: `fbclid` dari URL klik, `external_id` dari URL
(kalau diisi di iklan) atau UUID first-party di `localStorage`, plus
cookie Pixel `_fbp`/`_fbc` sebagai `fbp`/`fbc`. Kalau ada `fbclid`
tapi cookie `_fbc` belum ada, `fbc` dibentuk `fb.1.{timestamp}.{fbclid}`.
`campaign_id`, `adset_id`, dan `ad_id` ikut kalau ada di URL.

Kalau endpoint gagal atau timeout (8 detik), pengunjung **tetap**
diteruskan ke halaman Thank You dan kegagalannya dicatat di log server —
supaya calon mitra tidak tertahan.

---

## Foto

Semua foto **di-host sendiri** di `public/foto/` — diunduh dari lumena.id,
bukan di-hotlink, jadi halaman ini tidak ikut rusak kalau situs utama
berubah. Tidak ada host eksternal yang perlu di-allowlist di
`next.config.mjs`.

| File | Dipakai di | Sumber di lumena.id |
|---|---|---|
| `logo.png` (`public/`) | Favicon | `2026/05/logo.png` |
| `hero-tea-tree.avif` | Hero | `2026/06/hero-2-tto-avif-scaled.avif` |
| `produk-tea-tree.avif` | Product Knowledge | `2026/06/hero-1-tto-avif-scaled.avif` |
| `hasil-minggu-1/3/6.avif` | Hasil Nyata | `2026/06/week-{1,3,6}-avif.avif` |
| `dr-nico-lumenta.avif` | Formulator | `2026/05/new-profile-photo-dr-nico-scaled.avif` |
| `ilustrasi-kontak-mitra-avif.avif` | Fasilitas Mitra | aset lokal |

Total ±560 KB AVIF; `next/image` yang mengecilkan sesuai `sizes`. Kalau
foto di situs utama diperbarui, unduh ulang ke nama file yang sama.

Video pengguna masih di-embed dari Bunny Stream (bukan file lokal).

---

## Catatan implementasi

**CTA.** Wireframe `3a`/`3b` menaruh tombol "Cek Kota Saya" di **Hero** dan
**Highlight CTA** saja — di bagian lain slot CTA-nya sudah dikosongkan.
Brief awal (`lumena-partnership-structure.md`) meminta CTA di keenam bagian.
Implementasi ini mengikuti wireframe. Untuk kembali ke brief, cukup tambah
`<CtaBlock />` di akhir section yang bersangkutan.

**Ketersediaan kota.** Sesuai brief, untuk campaign pertama semua kota
tersedia — tidak ada percabangan "kota sudah terisi", dan state itu memang
belum didesain. Kalau nanti dibutuhkan, langkah 2 perlu tampilan tambahan
lebih dulu.

**Validasi ganda.** `lib/lead.ts` dipakai di dua sisi: di browser untuk
umpan balik langsung, dan di `/api/lead` supaya tidak bisa dilewati. Kota
yang tidak ada di `lib/cities.ts` ditolak server dengan `400`.

**Nama, kota, dan parameter iklan ke halaman Thank You** lewat URL
(`?nama=…&kota=…` plus `utm_*`, `fbclid`, `external_id`, dll.), supaya
pre-text WhatsApp terisi tanpa input ulang dan atribusi Meta tetap ada
saat event `Lead` di-fire. Nama/kota dibatasi 60 karakter dan dirender
sebagai teks biasa (React meng-escape isinya). Parameter iklan hanya
di URL, tidak ditampilkan di halaman.

**Font.** Poppins di-host sendiri lewat `next/font/google`, jadi tidak ada
request ke Google Fonts saat runtime dan tidak perlu file `.ttf` di repo.
Token `--font-sans` milik design system diarahkan ke sana di `globals.css`.

**Design system.** `_ds/lumena-design-system/` divendor apa adanya dari
project Claude Design; `colors_and_type.css` hanya kehilangan blok
`@font-face` (lihat catatan di file). `ui_kits/marketing/kit.css` ikut
divendor demi kelengkapan tapi tidak di-import — kit itu untuk arketipe
halaman webinar, bukan halaman ini.

**Aksesibilitas.** Lightbox punya `role="dialog"` + `aria-modal`, focus trap,
tutup dengan Esc / klik di luar / tombol ×, dan mengembalikan fokus ke tombol
pemicu. Dropdown kota adalah combobox dengan navigasi panah dan Enter. Semua
field punya `<label>` dan pesan error `role="alert"`.
