/** Original decorative artwork for Wacky's (not photography). All aria-hidden. */

export function WingArt({ className = "", hue = "sauce", cut = "drum", style }: { className?: string; hue?: "sauce" | "bbq" | "dry" | "fire"; cut?: "drum" | "flat"; style?: React.CSSProperties }) {
  const p = {
    sauce: ["#FFB25C", "#F5821F", "#A8301A"],
    bbq: ["#C77B45", "#8C3A1E", "#3A1A10"],
    dry: ["#F3D59A", "#D29A68", "#8C5A35"],
    fire: ["#FF7A45", "#D52B1E", "#5E0F09"],
  }[hue];
  const id = `w-${hue}-${cut}`;
  const bone = { fill: "#F3E3C3", stroke: "#C9A878", strokeWidth: 2 };
  return (
    <svg viewBox="0 0 240 140" className={className} style={style} aria-hidden>
      <defs>
        <radialGradient id={`${id}-g`} cx="35%" cy="28%" r="80%">
          <stop offset="0" stopColor={p[0]} />
          <stop offset=".5" stopColor={p[1]} />
          <stop offset="1" stopColor={p[2]} />
        </radialGradient>
      </defs>
      {cut === "drum" ? (
        <>
          <path d="M150 58l52-6 2 16-52 6z" {...bone} />
          <circle cx="210" cy="50" r="11" {...bone} />
          <circle cx="213" cy="70" r="11" {...bone} />
          <path d="M24 70C22 34 60 14 102 18c32 3 56 22 68 38 6 7 6 13 0 20-14 18-40 36-72 40-42 5-72-12-74-46z" fill={`url(#${id}-g)`} />
        </>
      ) : (
        <>
          <circle cx="24" cy="54" r="9" {...bone} />
          <circle cx="216" cy="76" r="9" {...bone} />
          <path d="M28 62c0-24 32-36 92-34 56 2 92 14 92 40 0 24-34 34-92 32-60-2-92-14-92-38z" fill={`url(#${id}-g)`} />
        </>
      )}
      <g fill={p[2]} opacity=".35">
        <circle cx="70" cy="50" r="3" /><circle cx="104" cy="40" r="2.4" /><circle cx="132" cy="70" r="3.2" /><circle cx="92" cy="88" r="2.6" /><circle cx="56" cy="80" r="2.2" /><circle cx="118" cy="98" r="2.4" />
      </g>
      <path d={cut === "drum" ? "M56 40c16-12 44-14 64-4" : "M60 42c24-8 70-8 100 0"} stroke="#fff" strokeOpacity=".7" strokeWidth="7" strokeLinecap="round" fill="none" />
      <path d="M44 62c1-5 4-9 8-12" stroke="#fff" strokeOpacity=".5" strokeWidth="5" strokeLinecap="round" fill="none" />
      {hue === "dry" ? (
        <g fill="#FFF6E0" opacity=".9">
          <circle cx="80" cy="36" r="1.6" /><circle cx="112" cy="58" r="1.4" /><circle cx="62" cy="66" r="1.6" /><circle cx="96" cy="74" r="1.3" /><circle cx="140" cy="82" r="1.5" /><circle cx="76" cy="100" r="1.4" /><circle cx="128" cy="44" r="1.2" />
        </g>
      ) : (
        <path d="M104 112c0 10 4 18 8 18s7-6 6-13c-1-5-4-7-6-11z" fill={p[1]} />
      )}
    </svg>
  );
}

export function Splash({ className = "", color = "#F5821F", style }: { className?: string; color?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 200 200" className={className} style={style} aria-hidden>
      <path fill={color} d="M100 22c10 0 12 22 22 24s22-16 30-8-6 26 2 34 30 2 32 14-22 14-22 24 20 20 12 30-28-4-34 4 4 30-8 34-18-18-30-18-18 22-30 18-6-26-14-32-30 8-34-4 16-20 12-30-26-10-24-22 26-6 30-14-12-26-2-32 24 12 32 6-4-24 16-24z" />
      <circle cx="30" cy="40" r="7" fill={color} /><circle cx="178" cy="150" r="9" fill={color} /><circle cx="160" cy="28" r="5" fill={color} /><circle cx="22" cy="168" r="6" fill={color} />
    </svg>
  );
}

export function Token({ className = "", label = "W", style }: { className?: string; label?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 80 80" className={className} style={style} aria-hidden>
      <circle cx="40" cy="40" r="37" fill="#FFC23D" stroke="#1B1512" strokeWidth="3" />
      <circle cx="40" cy="40" r="28" fill="none" stroke="#1B1512" strokeWidth="2" strokeDasharray="4 4" />
      <text x="40" y="51" textAnchor="middle" fontFamily="var(--font-alfa), serif" fontSize="30" fill="#1B1512">{label}</text>
    </svg>
  );
}

export function TicketStrip({ className = "", text = "ADMIT ONE", style }: { className?: string; text?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 180 70" className={className} style={style} aria-hidden>
      <path d="M8 4h164a4 4 0 0 0 4 4v18a9 9 0 0 0 0 18v18a4 4 0 0 0-4 4H8a4 4 0 0 0-4-4V44a9 9 0 0 0 0-18V8a4 4 0 0 0 4-4z" fill="#D52B1E" />
      <path d="M134 10v50" stroke="#fff" strokeOpacity=".6" strokeWidth="2" strokeDasharray="4 4" />
      <text x="70" y="42" textAnchor="middle" fontFamily="var(--font-barlow-condensed), sans-serif" fontWeight="800" fontSize="18" letterSpacing="3" fill="#fff">{text}</text>
      <text x="155" y="42" textAnchor="middle" fontFamily="var(--font-silkscreen), monospace" fontSize="14" fill="#FFC23D">★</text>
    </svg>
  );
}

export function Star({ className = "", color = "#FFC23D", style }: { className?: string; color?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden>
      <path fill={color} d="M12 1l2.9 7.6L23 9.3l-6.2 5.2 2 8L12 18.3 5.2 22.5l2-8L1 9.3l8.1-.7z" />
    </svg>
  );
}

export function MapleLeaf({ className = "", color = "#D52B1E", style }: { className?: string; color?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden>
      <path fill={color} d="M12 2.5l1.4 3.2 1.8-.9-.4 3.8 3.2-1.9-.5 2.4 2.8.5-1.8 2.3.9 1-4.2 2.3.4 1.9-3.1-.6V21h-1v-4.5l-3.1.6.4-1.9-4.2-2.3.9-1-1.8-2.3 2.8-.5-.5-2.4 3.2 1.9-.4-3.8 1.8.9z" />
    </svg>
  );
}

export function Joystick({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 80 90" className={className} style={style} aria-hidden>
      <rect x="6" y="58" width="68" height="26" rx="6" fill="#2A211C" stroke="#3EF0A6" strokeWidth="2.5" />
      <rect x="36" y="26" width="8" height="34" rx="3" fill="#B9A898" />
      <circle cx="40" cy="22" r="16" fill="#D52B1E" stroke="#1B1512" strokeWidth="2.5" />
      <circle cx="34" cy="16" r="4" fill="#fff" opacity=".6" />
      <circle cx="60" cy="70" r="5" fill="#3EF0A6" /><circle cx="20" cy="70" r="5" fill="#FFC23D" />
    </svg>
  );
}

/** A full "plate" composition of wings used where photography hasn't been supplied yet. */
export function WingPile({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`} aria-hidden>
      <div className="absolute inset-[6%] rounded-full bg-[radial-gradient(circle_at_40%_35%,#3A2D25,#1B1512_70%)] shadow-[inset_0_0_0_10px_#2A211C,inset_0_0_0_14px_#8C5A35]" />
      <WingArt hue="sauce" className="absolute left-[10%] top-[16%] w-[52%] -rotate-[28deg] drop-shadow-[0_18px_18px_rgba(0,0,0,.55)]" />
      <WingArt hue="fire" cut="flat" className="absolute right-[6%] top-[22%] w-[46%] rotate-[38deg] drop-shadow-[0_18px_18px_rgba(0,0,0,.55)]" />
      <WingArt hue="bbq" className="absolute bottom-[16%] left-[12%] w-[48%] rotate-[150deg] drop-shadow-[0_18px_18px_rgba(0,0,0,.55)]" />
      <WingArt hue="dry" cut="flat" className="absolute bottom-[14%] right-[12%] w-[46%] -rotate-[20deg] drop-shadow-[0_18px_18px_rgba(0,0,0,.55)]" />
      <WingArt hue="sauce" className="absolute left-[24%] top-[36%] w-[52%] rotate-[100deg] drop-shadow-[0_22px_22px_rgba(0,0,0,.6)]" />
    </div>
  );
}
