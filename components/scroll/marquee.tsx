/** Infinite, edge-faded ribbon of items. Pauses on hover; static when reduced motion is on. */
export function Marquee({ items, reverse = false, speed = 40 }: { items: string[]; reverse?: boolean; speed?: number }) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-4 pr-4">
      {items.map((item) => (
        <li
          key={item}
          className="whitespace-nowrap rounded-full border border-line bg-surface px-5 py-2.5 font-display text-lg font-medium text-fg transition hover:border-accent hover:text-accent"
        >
          {item}
        </li>
      ))}
    </ul>
  );
  return (
    <div className="group relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
      <div
        className="flex w-max animate-[marquee_var(--speed)_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:animate-none"
        style={{ "--speed": `${speed}s`, animationDirection: reverse ? "reverse" : "normal" } as React.CSSProperties}
      >
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
