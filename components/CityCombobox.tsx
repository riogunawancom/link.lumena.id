"use client";

import { useId, useMemo, useRef, useState } from "react";

import { isKnownCity, matchCities } from "@/lib/cities";

type Props = {
  /** Kota yang sudah dipilih; string kosong berarti belum memilih. */
  value: string;
  onChange: (city: string) => void;
};

const MIN_QUERY = 3;

/**
 * Dropdown dengan pencarian. Kota hanya dianggap terpilih kalau benar-benar
 * ada di daftar, jadi tombol "Cek Ketersediaan" tidak bisa aktif karena
 * ketikan bebas. Daftar baru muncul setelah 3 karakter.
 */
export function CityCombobox({ value, onChange }: Props) {
  const listId = useId();
  const inputId = useId();

  const [query, setQuery] = useState(value);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const blurTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const canSearch = query.trim().length >= MIN_QUERY;
  const options = useMemo(
    () => (canSearch ? matchCities(query) : []),
    [canSearch, query],
  );
  const listOpen = isOpen && canSearch;

  function pick(city: string) {
    setQuery(city);
    onChange(city);
    setIsOpen(false);
    setActiveIndex(-1);
  }

  function handleChange(next: string) {
    setQuery(next);
    // Mengetik ulang membatalkan pilihan sampai ada kota yang dipilih lagi.
    onChange(isKnownCity(next) ? next : "");
    setIsOpen(next.trim().length >= MIN_QUERY);
    setActiveIndex(-1);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      if (!canSearch) return;
      event.preventDefault();
      setIsOpen(true);
      setActiveIndex((i) => (options.length === 0 ? -1 : (i + 1) % options.length));
    } else if (event.key === "ArrowUp") {
      if (!listOpen) return;
      event.preventDefault();
      setActiveIndex((i) =>
        options.length === 0 ? -1 : (i - 1 + options.length) % options.length,
      );
    } else if (event.key === "Enter") {
      if (listOpen && activeIndex > -1 && options[activeIndex]) {
        event.preventDefault();
        pick(options[activeIndex]);
      }
    } else if (event.key === "Escape" && listOpen) {
      // Tutup daftar dulu, jangan langsung menutup lightbox-nya.
      event.preventDefault();
      setIsOpen(false);
      setActiveIndex(-1);
    }
  }

  const activeId = activeIndex > -1 ? `${listId}-${activeIndex}` : undefined;

  return (
    <div className="pk-combo">
      <label className="pk-sr" htmlFor={inputId}>
        Cari kota
      </label>
      <input
        id={inputId}
        ref={inputRef}
        type="text"
        role="combobox"
        autoComplete="off"
        placeholder="Ketik minimal 3 huruf…"
        value={query}
        aria-expanded={listOpen}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={activeId}
        onChange={(event) => handleChange(event.target.value)}
        onFocus={() => {
          if (canSearch) setIsOpen(true);
        }}
        onBlur={() => {
          // Beri jeda supaya klik pada opsi sempat terproses.
          blurTimer.current = setTimeout(() => setIsOpen(false), 120);
        }}
        onKeyDown={handleKeyDown}
      />

      {listOpen ? (
        <ul className="pk-combo-list" id={listId} role="listbox" aria-label="Daftar kota">
          {options.length === 0 ? (
            <li className="pk-combo-empty">Kota tidak ditemukan. Coba ejaan lain.</li>
          ) : (
            options.map((city, index) => (
              <li
                key={city}
                id={`${listId}-${index}`}
                role="option"
                aria-selected={index === activeIndex}
                className="pk-combo-opt"
                onMouseDown={(event) => {
                  // mousedown, supaya pilihan terekam sebelum input blur.
                  event.preventDefault();
                  if (blurTimer.current) clearTimeout(blurTimer.current);
                  pick(city);
                  inputRef.current?.focus();
                }}
              >
                {city}
              </li>
            ))
          )}
        </ul>
      ) : null}
    </div>
  );
}
