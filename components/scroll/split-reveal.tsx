"use client";

import * as m from "motion/react-m";

type SplitRevealProps = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  id?: string;
  className?: string;
  delay?: number;
};

/**
 * Headline that rises in word by word from behind a mask as it enters the viewport.
 * Screen readers get the plain sentence; the animated words are hidden from them.
 */
export function SplitReveal({ text, as: Tag = "h2", id, className, delay = 0 }: SplitRevealProps) {
  const words = text.split(" ");
  return (
    <Tag id={id} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {words.map((word, i) => (
          <span key={`${word}-${i}`}>
            <span className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-bottom">
              <m.span
                className="inline-block will-change-transform"
                initial={{ y: "110%", rotate: 4 }}
                whileInView={{ y: "0%", rotate: 0 }}
                viewport={{ once: true, margin: "0px 0px -8% 0px" }}
                transition={{ duration: 0.9, delay: delay + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              >
                {word}
              </m.span>
            </span>
            {i < words.length - 1 && " "}
          </span>
        ))}
      </span>
    </Tag>
  );
}
