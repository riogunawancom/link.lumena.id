/* Ikon garis 24×24, mengikuti gaya yang dipakai di wireframe. */

type IconProps = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function IconAudience(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M2.5 19c0-3.3 2.9-5 6.5-5s6.5 1.7 6.5 5" />
      <path d="M16.5 6.2a3 3 0 0 1 0 5.6" />
      <path d="M18.5 14.4c1.9.6 3 1.9 3 4.6" />
    </svg>
  );
}

export function IconGrowth(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <polyline points="3 17 9.5 10.5 13.5 14.5 21 7" />
      <polyline points="15 7 21 7 21 13" />
    </svg>
  );
}

export function IconRepeat(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 12a8 8 0 0 1 13.7-5.6L21 9" />
      <polyline points="21 4 21 9 16 9" />
      <path d="M20 12a8 8 0 0 1-13.7 5.6L3 15" />
      <polyline points="3 20 3 15 8 15" />
    </svg>
  );
}

export function IconPin(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}

export function IconCamera(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 8.5A2 2 0 0 1 5 6.5h2l1.2-2h7.6L17 6.5h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
      <circle cx="12" cy="12.5" r="3.4" />
    </svg>
  );
}

export function IconPlay(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="4.5" width="18" height="15" rx="2.5" />
      <polygon points="10.5 9 15 12 10.5 15" />
    </svg>
  );
}

export function IconCheck(props: IconProps) {
  return (
    <svg {...base} strokeWidth={3} {...props}>
      <polyline points="4 12.5 9.5 18 20 6.5" />
    </svg>
  );
}
