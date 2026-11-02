"use client";

import { useRef } from "react";
import { useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import * as m from "motion/react-m";

/** Large statement whose words light up one by one as the reader scrolls through it. */
export function ScrollText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.4"] });
  const words = text.split(" ");

  if (reduced)
    return (
      <p ref={ref} className={className}>
        {text}
      </p>
    );

  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {words.map((word, i) => (
          <Word key={`${word}-${i}`} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
            {word}
          </Word>
        ))}
      </span>
    </p>
  );
}

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const y = useTransform(progress, range, [6, 0]);
  return (
    <>
      <m.span style={{ opacity, y }} className="inline-block">
        {children}
      </m.span>{" "}
    </>
  );
}
