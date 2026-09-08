/* eslint-disable @next/next/no-img-element */
import { COPYRIGHT, DISCLAIMER, FOOTER_LINKS } from "@/lib/content";

export function Footer() {
  return (
    <footer className="pk-footer">
      <div className="pk-wrap pk-stack">
        <img
          className="pk-footer-logo"
          src="/lumena-white.svg"
          alt="Lumena"
          width={718}
          height={996}
        />
        <nav className="pk-footer-links" aria-label="Legal">
          {FOOTER_LINKS.map((link) => (
            <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
              {link.label}
            </a>
          ))}
        </nav>
        <p className="pk-fine">{DISCLAIMER}</p>
        <p className="pk-fine">{COPYRIGHT}</p>
      </div>
    </footer>
  );
}
