/* Copy yang dipakai di lebih dari satu tempat. Teks yang hanya muncul
   sekali ditulis langsung di komponennya masing-masing. */

/** Kalimat pengantar yang selalu mendahului tombol CTA — dua baris. */
export const CTA_QUESTION = [
  "Tertarik menjadi mitra yang melayani penjualan di kota Anda?",
  "Lihat ketersediaan di kota Anda ↓",
] as const;

export const CTA_LABEL = "Cek Kota Saya";

export const DISCLAIMER =
  "Persentase yang disebutkan adalah margin per botol dan bukan jaminan penghasilan, " +
  "hasil setiap mitra dapat berbeda; Lumena Tea Tree Acne Serum adalah produk kosmetik " +
  "terdaftar BPOM NA18250118100, bukan obat; dan situs ini tidak berafiliasi dengan atau " +
  "didukung oleh Facebook, Instagram, maupun Meta Platforms, Inc.";

export const COPYRIGHT = "© 2026 PT Lumena Mentari Nusantara";

export const FOOTER_LINKS = [
  { label: "Kebijakan Privasi", href: "https://lumena.id/privasi" },
  { label: "Syarat & Ketentuan", href: "https://lumena.id/ketentuan" },
  { label: "Disclaimer", href: "https://lumena.id/disclaimer" },
] as const;

/* Foto di-host sendiri di /public/foto — diunduh dari lumena.id, bukan
   di-hotlink, supaya halaman ini tidak bergantung pada situs lain.
   Ukuran asli ikut dicatat supaya gambar tampil sesuai proporsinya
   sendiri, tanpa dipotong.

   Sumber asli:
     hero-tea-tree    ← 2026/06/hero-2-tto-avif-scaled.avif
     produk-tea-tree  ← 2026/06/hero-1-tto-avif-scaled.avif
     hasil-minggu-*   ← 2026/06/week-{1,3,6}-avif.avif
     dr-nico-lumenta  ← 2026/05/new-profile-photo-dr-nico-scaled.avif
     ilustrasi-kontak-mitra-avif ← aset lokal untuk kartu Fasilitas Mitra */
export const PHOTO = {
  hero: {
    src: "/foto/hero-tea-tree.avif",
    width: 1911,
    height: 2560,
    alt: "Manfaat Lumena Tea Tree Acne Serum: membantu bersihkan pori, mengurangi minyak berlebih, menenangkan kemerahan, dan menyamarkan noda bekas.",
  },
  produk: {
    src: "/foto/produk-tea-tree.avif",
    width: 1911,
    height: 2560,
    alt: "Botol Lumena Tea Tree Acne Serum dengan foto perbandingan kulit sebelum dan sesudah pemakaian.",
  },
  formulator: {
    src: "/foto/dr-nico-lumenta.avif",
    width: 2560,
    height: 2560,
    alt: "dr. Nico A. Lumenta, K.Nefro, MM",
  },
  kontakMitra: {
    src: "/foto/ilustrasi-kontak-mitra-avif.avif",
    width: 1696,
    height: 684,
    alt: "Ilustrasi halaman resmi Lumena yang menampilkan nama dan WhatsApp mitra di kota Anda.",
  },
} as const;

/* Tahapan perawatan di bagian "Hasil Nyata". */
export const HASIL_NYATA = [
  {
    src: "/foto/hasil-minggu-1.avif",
    judul: "Sebelum",
    teks: "Jerawat aktif & meradang",
    alt: "Ilustrasi kondisi kulit sebelum perawatan: jerawat aktif dan meradang.",
  },
  {
    src: "/foto/hasil-minggu-3.avif",
    judul: "3 Minggu",
    teks: "Jerawat & kemerahan berkurang",
    alt: "Ilustrasi kondisi kulit setelah 3 minggu: jerawat dan kemerahan berkurang.",
  },
  {
    src: "/foto/hasil-minggu-6.avif",
    judul: "6 Minggu",
    teks: "Bersih dari jerawat, bekas memudar",
    alt: "Ilustrasi kondisi kulit setelah 6 minggu: bersih dari jerawat dan bekasnya memudar.",
  },
] as const;

/* Semua foto "Hasil Nyata" berukuran sama. */
export const HASIL_SIZE = { width: 1024, height: 1024 } as const;

/* Embed yang sama dengan halaman penjualan lumena.id/tea-tree. */
export const VIDEOS = [
  {
    nama: "Aurelia Bianca, 23 tahun",
    src: "https://player.mediadelivery.net/embed/677445/3d9d63e2-fa7c-41c3-8bb7-e9fbbdb9a519",
  },
  {
    nama: "Sarah Said, 44 tahun",
    src: "https://player.mediadelivery.net/embed/677445/84732686-1c81-421c-bf77-f1d6edafdb78",
  },
  {
    nama: "Rachelia, 20 tahun",
    src: "https://player.mediadelivery.net/embed/677445/1a677868-5e23-4c6d-8d0c-d75c0df92b75",
  },
] as const;
