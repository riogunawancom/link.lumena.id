/* Logo memakai <img> biasa, bukan next/image: file-nya SVG statis di
   /public, dan optimizer next/image tidak menyentuh SVG. */
/* eslint-disable @next/next/no-img-element */

export function Navbar() {
  return (
    <header className="pk-nav">
      <div className="pk-wrap pk-nav-inner">
        <img
          className="pk-nav-logo"
          src="/lumena-riptide.svg"
          alt="Lumena"
          width={964}
          height={271}
        />
        {/* Penanda konteks halaman — badge, bukan tombol. */}
        <span className="pk-nav-pill">Program Kemitraan</span>
      </div>
    </header>
  );
}
