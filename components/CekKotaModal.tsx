"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { CityCombobox } from "@/components/CityCombobox";
import { IconPin } from "@/components/Icons";
import {
  DEFAULT_DIAL,
  DIAL_OPTIONS,
  type FieldErrors,
  hasErrors,
  isValidEmail,
  isValidWhatsapp,
  joinNama,
  normalizeWhatsapp,
  splitWhatsapp,
  validateLead,
} from "@/lib/lead";
import { appendMarketingQuery, getMarketingForLead } from "@/lib/marketing";

type Step = 0 | 1 | 2;

const MIN_SEND_MS = 2000;

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

export function CekKotaModal({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const titleId = useId();

  const [step, setStep] = useState<Step>(0);
  const [kota, setKota] = useState("");
  const [dial, setDial] = useState(DEFAULT_DIAL);
  const [waLocal, setWaLocal] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSending, setIsSending] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const sendingRef = useRef<HTMLDivElement>(null);
  const restoreFocusTo = useRef<HTMLElement | null>(null);

  /* Kunci scroll halaman & kembalikan fokus ke tombol pemicu saat tutup. */
  useEffect(() => {
    restoreFocusTo.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
      restoreFocusTo.current?.focus?.();
    };
  }, []);

  /* Esc menutup, Tab tetap berputar di dalam dialog. */
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        if (isSending) {
          event.preventDefault();
          return;
        }
        // Combobox yang sedang terbuka menangani Esc-nya sendiri.
        if (event.defaultPrevented) return;
        onClose();
        return;
      }

      if (event.key !== "Tab" || !modalRef.current) return;

      const items = Array.from(
        modalRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((el) => el.offsetParent !== null);
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isSending, onClose]);

  /* Pindahkan fokus ke elemen pertama setiap kali langkah berganti. */
  useEffect(() => {
    if (isSending) return;
    const target = modalRef.current?.querySelector<HTMLElement>("input, button");
    target?.focus();
  }, [isSending, step]);

  useEffect(() => {
    if (isSending) sendingRef.current?.focus();
  }, [isSending]);

  const backToStepOne = useCallback(() => {
    setStep(0);
    setErrors({});
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSending) return;

    const data = new FormData(event.currentTarget);
    const namaDepan = String(data.get("namaDepan") ?? "").trim();
    const namaBelakang = String(data.get("namaBelakang") ?? "").trim();
    const lead = {
      namaDepan,
      namaBelakang,
      email: String(data.get("email") ?? "").trim(),
      whatsapp: normalizeWhatsapp(waLocal, dial),
      kota,
    };

    const found = validateLead(lead);
    if (hasErrors(found)) {
      setErrors(found);
      if (found.kota) {
        // Tidak seharusnya terjadi lewat alur normal.
        backToStepOne();
        return;
      }
      const firstBad = (["namaDepan", "namaBelakang", "email", "whatsapp"] as const).find(
        (k) => found[k],
      );
      formRef.current?.querySelector<HTMLInputElement>(`[name="${firstBad}"]`)?.focus();
      return;
    }

    setErrors({});
    setIsSending(true);

    const marketing = getMarketingForLead();

    /* Tunggu n8n minimal 2 detik, atau sampai fetch selesai kalau lebih lama. */
    const minWait = new Promise<void>((resolve) => {
      window.setTimeout(resolve, MIN_SEND_MS);
    });

    try {
      await Promise.all([
        fetch("/api/lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...lead, ...marketing }),
        }),
        minWait,
      ]);
    } catch {
      // Jangan menahan calon mitra kalau endpoint sedang bermasalah —
      // kegagalan sudah dicatat di server. Layar loading tetap 2 detik.
      await minWait;
    }

    /* Halaman terpisah, bukan state di dalam lightbox, supaya pixel
       konversi iklan bisa dipasang di sana. UTM/fbclid/external_id ikut
       di URL thank-you. */
    const query = new URLSearchParams({
      nama: joinNama(namaDepan, namaBelakang),
      kota: lead.kota,
    });
    appendMarketingQuery(query, marketing);
    router.push(`/terima-kasih?${query.toString()}`);
  }

  return (
    <div
      className={isSending ? "pk-overlay pk-overlay--sending" : "pk-overlay"}
      aria-busy={isSending || undefined}
      onMouseDown={(event) => {
        if (isSending) return;
        if (event.target === event.currentTarget) onClose();
      }}
    >
      {isSending ? (
        <div
          className="pk-sending"
          role="status"
          aria-live="assertive"
          tabIndex={-1}
          ref={sendingRef}
        >
          <span className="pk-sending-spinner" aria-hidden="true" />
          <p className="pk-sending-title">Mengirim data…</p>
          <p className="pk-sending-copy">Mohon tunggu sebentar.</p>
        </div>
      ) : (
      <div
        className="pk-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        ref={modalRef}
      >
        <div className="pk-modal-head">
          <div className="pk-pips">
            {[0, 1, 2].map((i) => (
              <span key={i} className={i <= step ? "pk-pip on" : "pk-pip"} />
            ))}
          </div>
          <button
            type="button"
            className="pk-close"
            onClick={onClose}
            aria-label="Tutup"
            disabled={isSending}
          >
            ×
          </button>
        </div>

        {/* ── Langkah 1 — pilih kota ─────────────────────────── */}
        {step === 0 && (
          <div className="pk-step">
            <h2 className="pk-step-title" id={titleId}>
              Anda ingin menjadi mitra di kota mana?
            </h2>
            <CityCombobox value={kota} onChange={setKota} />
            <button
              type="button"
              className="pk-btn pk-btn--block"
              disabled={!kota}
              onClick={() => setStep(1)}
            >
              Cek Ketersediaan
            </button>
          </div>
        )}

        {/* ── Langkah 2 — hasil ketersediaan ─────────────────── */}
        {step === 1 && (
          <div className="pk-step">
            <span className="pk-check" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="4 12.5 9.5 18 20 6.5" />
              </svg>
            </span>
            <h2 className="pk-step-title" id={titleId}>
              Kabar baik. {kota} masih tersedia.
            </h2>
            <p className="pk-p">
              Belum ada mitra Lumena yang melayani penjualan di {kota}. Anda bisa menjadi yang
              pertama.
            </p>
            <button type="button" className="pk-btn pk-btn--block" onClick={() => setStep(2)}>
              Saya Tertarik
            </button>
            <button type="button" className="pk-link pk-link--center" onClick={backToStepOne}>
              Cek kota lain
            </button>
          </div>
        )}

        {/* ── Langkah 3 — isi data ───────────────────────────── */}
        {step === 2 && (
          <div className="pk-step">
            <h2 className="pk-step-title" id={titleId}>
              Data Anda
            </h2>
            <p className="pk-step-lede">Isi data Anda.</p>
            <div className="pk-citybar">
              <span className="pk-citybar-badge" aria-hidden="true">
                <IconPin />
              </span>
              <div className="pk-citybar-info">
                <span className="pk-citybar-label">Kota</span>
                <span className="pk-citybar-name">{kota}</span>
              </div>
              <button type="button" className="pk-citybar-ubah" onClick={backToStepOne}>
                Ubah
              </button>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} noValidate>
              <div className="pk-name-row">
                <Field
                  name="namaDepan"
                  label="Nama depan"
                  type="text"
                  autoComplete="given-name"
                  placeholder="Rio"
                  error={errors.namaDepan}
                  onInput={() => setErrors((e) => ({ ...e, namaDepan: undefined }))}
                />
                <Field
                  name="namaBelakang"
                  label="Nama belakang"
                  type="text"
                  autoComplete="family-name"
                  placeholder="Gunawan"
                  error={errors.namaBelakang}
                  onInput={() => setErrors((e) => ({ ...e, namaBelakang: undefined }))}
                />
              </div>
              <Field
                name="email"
                label="Email"
                type="email"
                autoComplete="email"
                placeholder="rio@lumena.id"
                error={errors.email}
                onInput={() => setErrors((e) => ({ ...e, email: undefined }))}
                onBlur={(value) => {
                  if (!value || isValidEmail(value)) {
                    setErrors((e) => ({ ...e, email: undefined }));
                    return;
                  }
                  setErrors((e) => ({ ...e, email: "Mohon isi email yang valid." }));
                }}
              />
              <WhatsAppField
                dial={dial}
                local={waLocal}
                error={errors.whatsapp}
                onDialChange={(next) => {
                  setDial(next);
                  setErrors((e) => ({ ...e, whatsapp: undefined }));
                }}
                onLocalChange={(next) => {
                  setWaLocal(next);
                  setErrors((e) => ({ ...e, whatsapp: undefined }));
                }}
                onBlurCheck={(value, currentDial) => {
                  if (!value.trim()) {
                    setErrors((e) => ({ ...e, whatsapp: undefined }));
                    return;
                  }
                  const parsed = splitWhatsapp(value, currentDial);
                  setDial(parsed.dial);
                  setWaLocal(parsed.local);
                  if (isValidWhatsapp(parsed.local, parsed.dial)) {
                    setErrors((e) => ({ ...e, whatsapp: undefined }));
                  } else {
                    setErrors((e) => ({
                      ...e,
                      whatsapp: "Mohon isi nomor WhatsApp dengan kode negara yang valid.",
                    }));
                  }
                }}
              />
              <button type="submit" className="pk-btn pk-btn--block" disabled={isSending}>
                {isSending ? (
                  <>
                    <span className="lmn-spinner" aria-hidden="true" /> Mengirim…
                  </>
                ) : (
                  "Kirim Data"
                )}
              </button>
            </form>

            <p className="pk-fine">
              Data dipakai untuk menghubungi Anda soal kemitraan.
            </p>
          </div>
        )}
      </div>
      )}
    </div>
  );
}

type FieldProps = {
  name: "namaDepan" | "namaBelakang" | "email";
  label: string;
  type: string;
  autoComplete: string;
  placeholder: string;
  error?: string;
  onInput: () => void;
  onBlur?: (value: string) => void;
};

function Field({
  name,
  label,
  type,
  autoComplete,
  placeholder,
  error,
  onInput,
  onBlur,
}: FieldProps) {
  const errorId = `${name}-error`;

  return (
    <div className="lmn-group">
      <label className="lmn-label" htmlFor={name}>
        {label} <span className="lmn-required">*</span>
      </label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className={error ? "has-error" : undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        onInput={onInput}
        onBlur={(event) => onBlur?.(event.currentTarget.value.trim())}
        required
      />
      {error ? (
        <p className="pk-field-error" id={errorId} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

type WhatsAppFieldProps = {
  dial: string;
  local: string;
  error?: string;
  onDialChange: (dial: string) => void;
  onLocalChange: (local: string) => void;
  onBlurCheck: (local: string, dial: string) => void;
};

function WhatsAppField({
  dial,
  local,
  error,
  onDialChange,
  onLocalChange,
  onBlurCheck,
}: WhatsAppFieldProps) {
  const errorId = "whatsapp-error";

  return (
    <div className="lmn-group">
      <label className="lmn-label" htmlFor="whatsapp">
        Nomor WhatsApp <span className="lmn-required">*</span>
      </label>
      <div className={error ? "lmn-phone pk-phone has-error" : "lmn-phone pk-phone"}>
        <div className="lmn-cc pk-cc">
          <label className="pk-sr" htmlFor="whatsapp-dial">
            Kode negara
          </label>
          <select
            id="whatsapp-dial"
            value={dial}
            aria-invalid={error ? true : undefined}
            onChange={(event) => onDialChange(event.currentTarget.value)}
          >
            {DIAL_OPTIONS.map((option) => (
              <option key={option.dial} value={option.dial}>
                {option.iso} {option.dial}
              </option>
            ))}
          </select>
        </div>
        <input
          id="whatsapp"
          name="whatsapp"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="812 3456 7890"
          value={local}
          className={error ? "has-error" : undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          onChange={(event) => onLocalChange(event.currentTarget.value)}
          onBlur={(event) => onBlurCheck(event.currentTarget.value, dial)}
          required
        />
      </div>
      {error ? (
        <p className="pk-field-error" id={errorId} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
