"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

import { CekKotaModal } from "@/components/CekKotaModal";

type CekKotaContextValue = { open: () => void };

const CekKotaContext = createContext<CekKotaContextValue | null>(null);

export function useCekKota(): CekKotaContextValue {
  const ctx = useContext(CekKotaContext);
  if (!ctx) {
    throw new Error("useCekKota harus dipakai di dalam <CekKotaProvider>.");
  }
  return ctx;
}

/**
 * Menyimpan status lightbox di satu tempat supaya semua tombol
 * "Cek Kota Saya" di halaman membuka lightbox yang sama.
 */
export function CekKotaProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const value = useMemo(() => ({ open }), [open]);

  return (
    <CekKotaContext.Provider value={value}>
      {children}
      {isOpen ? <CekKotaModal onClose={close} /> : null}
    </CekKotaContext.Provider>
  );
}
