"use client";

import { useEffect } from "react";

import { persistMarketingFromUrl } from "@/lib/marketing";

/** Simpan UTM/Meta dari query di setiap halaman, termasuk thank-you. */
export function PersistMarketing() {
  useEffect(() => {
    persistMarketingFromUrl();
  }, []);
  return null;
}
