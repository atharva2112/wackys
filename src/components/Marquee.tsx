export function Marquee({ items, className = "", reverse = false }: { items: string[]; className?: string; reverse?: boolean }) {
  const row = (
    <div className="flex shrink-0 items-center gap-8 pr-8">
      {items.map((t, i) => (
        <span key={i} className="flex items-center gap-8 whitespace-nowrap">
          <span>{t}</span><span aria-hidden className="text-amber">★</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className={`overflow-hidden ${className}`} aria-hidden>
      <div className="animate-marquee flex w-max" style={{ animationDirection: reverse ? "reverse" : "normal" }}>
        {row}{row}
      </div>
    </div>
  );
}
