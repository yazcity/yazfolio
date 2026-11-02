import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { Reveal } from "./reveal";
import { SplitReveal } from "./scroll/split-reveal";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  download?: boolean;
  className?: string;
} & Omit<ComponentProps<"a">, "href">;

const styles = {
  primary:
    "bg-accent text-on-accent shadow-[0_8px_30px_-8px_rgb(var(--glow)/0.55)] hover:shadow-[0_12px_40px_-8px_rgb(var(--glow)/0.75)]",
  secondary: "border border-line-strong text-fg hover:border-accent hover:text-accent",
};

/** Pill button rendered as a link. Uses <a> for files/external/hash links, <Link> otherwise. */
export function ButtonLink({ href, children, variant = "primary", download, className = "", ...rest }: ButtonProps) {
  const cls = `group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition duration-300 hover:-translate-y-0.5 active:translate-y-0 ${styles[variant]} ${className}`;
  const isPlainAnchor = download || href.startsWith("http") || href.startsWith("mailto:") || href.endsWith(".pdf");
  if (isPlainAnchor) {
    return (
      <a href={href} download={download || undefined} className={cls} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}

/** Eyebrow + word-by-word headline + intro, each revealed on scroll. */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  as = "h2",
  id,
}: {
  eyebrow: string;
  title: string;
  intro?: ReactNode;
  as?: "h1" | "h2";
  id?: string;
}) {
  return (
    <div className="max-w-2xl">
      <Reveal>
        <p className="eyebrow flex items-center gap-3">
          <span aria-hidden className="h-px w-8 bg-accent" />
          {eyebrow}
        </p>
      </Reveal>
      <SplitReveal as={as} id={id} text={title} className="mt-4 text-4xl font-semibold leading-[1.05] sm:text-5xl" />
      {intro && (
        <Reveal delay={0.25}>
          <p className="mt-5 text-lg text-muted">{intro}</p>
        </Reveal>
      )}
    </div>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-line bg-surface-2 px-3 py-1 font-mono text-xs text-fg">
      {children}
    </span>
  );
}

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
