import { HeatFlames } from "./Icon";

/** Wing heat scale — colour is always paired with flame count and label, never colour alone. */
export const HEAT = [
  null,
  { label: "Mild", bg: "#FFC23D", fg: "#1B1512" },
  { label: "Medium", bg: "#F5821F", fg: "#1B1512" },
  { label: "Hot", bg: "#D52B1E", fg: "#FFFFFF" },
  { label: "Fire", bg: "#8E1A12", fg: "#FFFFFF" },
  { label: "Wacky", bg: "#1B1512", fg: "#3EF0A6" },
] as const;

export function HeatChip({ level, className = "" }: { level: number; className?: string }) {
  const h = HEAT[level]!;
  const wacky = level === 5;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-[4px] px-2 py-1 ${wacky ? "pixel border-2 border-aurora text-[13px] font-bold" : "font-label text-[14px] font-extrabold tracking-[.08em] uppercase"} ${className}`}
      style={{ background: h.bg, color: h.fg, textShadow: wacky ? "0 0 8px rgba(62,240,166,.6)" : undefined }}
    >
      <HeatFlames level={level} size={12} />
      <span>{h.label.toUpperCase()}</span>
      <span className="sr-only">heat, {level} of 5</span>
    </span>
  );
}

/** Illustrated thermometer-style meter used on flavour cards. */
export function HeatMeter({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-1" role="img" aria-label={`Heat ${level} of 5: ${HEAT[level]!.label}`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className="h-2.5 flex-1 rounded-full transition-transform duration-300"
          style={{
            background: i <= level ? HEAT[i]!.bg : "rgba(185,168,152,.25)",
            boxShadow: i <= level && i === 5 ? "0 0 10px rgba(62,240,166,.7)" : undefined,
            outline: i === 5 && i <= level ? "2px solid #3EF0A6" : undefined,
          }}
        />
      ))}
    </div>
  );
}
