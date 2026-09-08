import { IconAudience, IconGrowth, IconRepeat } from "@/components/Icons";

const FAKTA = [
  {
    Icon: IconAudience,
    judul: "Pasar Luas",
    teks: "Jerawat dialami hampir semua orang usia 12–30 tahun, dan mereka aktif mencari solusinya setiap hari. Permintaannya sudah ada, Anda tinggal menawarkan.",
  },
  {
    Icon: IconGrowth,
    judul: "Untung Besar",
    teks: "Setiap botol yang terjual memberi untung hingga 153%, tergantung level kemitraan Anda. Modal kembali dari botol pertama, sisanya keuntungan Anda.",
  },
  {
    Icon: IconRepeat,
    judul: "Repeat Order",
    teks: "Satu botol habis dalam sebulan, dan jerawat butuh perawatan rutin. Pembeli yang cocok akan kembali ke Anda tanpa perlu dicari lagi.",
  },
];

export function Peluang() {
  return (
    <section className="pk-sec" aria-labelledby="peluang-title">
      <div className="pk-wrap pk-stack">
        <h2 className="pk-h2" id="peluang-title">
          Pasarnya besar, margin tinggi &amp; pembelinya balik lagi.
        </h2>

        <div className="pk-grid pk-grid--3">
          {FAKTA.map(({ Icon, judul, teks }) => (
            <article key={judul} className="pk-card">
              <span className="pk-ico" aria-hidden="true">
                <Icon />
              </span>
              <h3 className="pk-h3">{judul}</h3>
              <p className="pk-p">{teks}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
