import type { SVGProps } from "react";

/** Wacky's icon set — 24 px grid, 2 px stroke, round caps/joins, currentColor, outline only (Graphics board). */
const paths: Record<string, React.ReactNode> = {
  wings: (<><ellipse cx="15" cy="9" rx="5.5" ry="4.5" transform="rotate(-45 15 9)" /><path d="M11.2 12.8l-4.6 4.6" /><circle cx="5" cy="17.2" r="1.5" /><circle cx="6.8" cy="19" r="1.5" /></>),
  beer: (<><path d="M5 8h10v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z" /><path d="M15 10.5h2a2.5 2.5 0 0 1 0 5h-2" /><path d="M5 8a3 3 0 0 1 3-3 3 3 0 0 1 5 0 2.5 2.5 0 0 1 2 3" /><path d="M9 12v5M11.5 12v5" /></>),
  cocktails: (<><path d="M4 5h16l-8 8z" /><path d="M12 13v7M8 20h8" /><path d="M15.5 5l2.5-3" /></>),
  arcade: (<><rect x="4" y="15" width="16" height="5" rx="1.5" /><path d="M12 15v-5" /><circle cx="12" cy="7" r="3" /><path d="M16 17.5h1.5" /></>),
  vr: (<><path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-4l-1.5-2.5h-3L9 17H5a2 2 0 0 1-2-2z" /><circle cx="8" cy="12" r="1.5" /><circle cx="16" cy="12" r="1.5" /></>),
  sports: (<><rect x="3" y="4" width="18" height="13" rx="1.5" /><path d="M8 21h8M12 17v4" /><path d="M10 8.5l4.5 2-4.5 2z" /></>),
  northern: (<path d="M12 2.5l1.4 3.2 1.8-.9-.4 3.8 3.2-1.9-.5 2.4 2.8.5-1.8 2.3.9 1-4.2 2.3.4 1.9-3.1-.6V21h-1v-4.5l-3.1.6.4-1.9-4.2-2.3.9-1-1.8-2.3 2.8-.5-.5-2.4 3.2 1.9-.4-3.8 1.8.9z" />),
  heat: (<path d="M12 2.5c1.2 3.8 5.5 5.8 5.5 10.6a5.5 5.5 0 0 1-11 0c0-2.7 1.6-4.4 2.7-5.4.3 2 1.3 3 2.7 3.2.6-3.2-1-5.8.1-8.4z" />),
  pin: (<><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></>),
  call: (<path d="M5 3h3.5L10 7.5 8 9a12 12 0 0 0 7 7l1.5-2 4.5 1.5V19a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2z" />),
  reserve: (<><rect x="3.5" y="5" width="17" height="15.5" rx="1.5" /><path d="M3.5 10h17M8 3v4M16 3v4" /></>),
  playcard: (<><path d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2.5a2.5 2.5 0 0 0 0 5V17a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2.5a2.5 2.5 0 0 0 0-5z" /><path d="M14 6v2M14 11v2M14 16v2" /></>),
  prizes: (<><path d="M7 4h10v5a5 5 0 0 1-10 0z" /><path d="M7 6H4.5a2.5 2.5 0 0 0 2.6 3.5M17 6h2.5a2.5 2.5 0 0 1-2.6 3.5" /><path d="M12 14v3M8.5 20.5h7l-1-3.5h-5z" /></>),
  parties: (<><rect x="4" y="9" width="16" height="11" rx="1" /><path d="M3 9h18M12 9v11" /><path d="M12 9c-1.5-3-5-3.5-5-1.5S10 9 12 9c2 0 5 .5 5-1.5S13.5 6 12 9z" /></>),
  takeout: (<><path d="M5 8h14l-1 12H6z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></>),
  vip: (<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z" />),
  billiards: (<><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="10" r="3" /><path d="M10.5 14.5h3" /></>),
  airhockey: (<><ellipse cx="12" cy="17" rx="7" ry="2.5" /><path d="M5 17v-1.5M19 17v-1.5" /><circle cx="12" cy="8" r="3.5" /><path d="M12 4.5V3" /></>),
  // Utility glyphs drawn on the same grid.
  menu: (<path d="M4 7h16M4 12h16M4 17h16" />),
  close: (<path d="M6 6l12 12M18 6L6 18" />),
  arrow: (<path d="M5 12h14M13 6l6 6-6 6" />),
  search: (<><circle cx="11" cy="11" r="6.5" /><path d="M16 16l4.5 4.5" /></>),
  check: (<path d="M5 12.5l4.5 4.5L19 7.5" />),
  chevron: (<path d="M6 9l6 6 6-6" />),
  sound: (<><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" /><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11" /></>),
  mute: (<><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" /><path d="M16 9.5l5 5M21 9.5l-5 5" /></>),
  shuffle: (<><path d="M3 7h3.5a4 4 0 0 1 3.3 1.7l4.4 6.6A4 4 0 0 0 17.5 17H21" /><path d="M3 17h3.5a4 4 0 0 0 3.3-1.7l.7-1M14.2 8.7A4 4 0 0 1 17.5 7H21" /><path d="M18.5 4.5L21 7l-2.5 2.5M18.5 14.5L21 17l-2.5 2.5" /></>),
  instagram: (<><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r=".6" /></>),
  facebook: (<path d="M14 8.5h3V4.5h-3a4 4 0 0 0-4 4v2.5H7.5v4H10v7h4v-7h3l.5-4H14V9a.5.5 0 0 1 .5-.5z" />),
  external: (<><path d="M14 4h6v6M20 4l-9 9" /><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" /></>),
  clock: (<><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></>),
  mail: (<><rect x="3" y="5.5" width="18" height="13" rx="1.5" /><path d="M3.5 6.5L12 13l8.5-6.5" /></>),
  locate: (<><circle cx="12" cy="12" r="3" /><circle cx="12" cy="12" r="7.5" /><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22" /></>),
};

export type IconName = keyof typeof paths;

export function Icon({ name, size = 24, title, ...rest }: { name: string; size?: number; title?: string } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round"
      aria-hidden={title ? undefined : true} role={title ? "img" : undefined} aria-label={title}
      focusable="false" {...rest}
    >
      {paths[name] ?? paths.wings}
    </svg>
  );
}

export function HeatFlames({ level, size = 14 }: { level: number; size?: number }) {
  return (
    <span className="inline-flex gap-0.5" aria-hidden>
      {Array.from({ length: level }, (_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.5c1.2 3.8 5.5 5.8 5.5 10.6a5.5 5.5 0 0 1-11 0c0-2.7 1.6-4.4 2.7-5.4.3 2 1.3 3 2.7 3.2.6-3.2-1-5.8.1-8.4z" /></svg>
      ))}
    </span>
  );
}
