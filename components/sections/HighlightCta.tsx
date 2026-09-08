import { CtaBlock } from "@/components/CtaBlock";

export function HighlightCta() {
  return (
    <section className="pk-sec pk-highlight" aria-labelledby="penutup-title">
      <div className="pk-wrap pk-stack">
        <h2 className="pk-h2" id="penutup-title">
          Jadilah mitra pertama di kota Anda.
        </h2>
        <CtaBlock />
      </div>
    </section>
  );
}
