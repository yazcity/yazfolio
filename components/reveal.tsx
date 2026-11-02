"use client";

import type { ReactNode } from "react";
import * as m from "motion/react-m";

const offsets = {
  up: { y: 32 },
  left: { x: -48 },
  right: { x: 48 },
  scale: { scale: 0.92, y: 24 },
} as const;

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article";
  from?: keyof typeof offsets;
};

/** Fades content into view once, as it scrolls into the viewport. */
export function Reveal({ children, delay = 0, className, as = "div", from = "up" }: RevealProps) {
  const Tag = m[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, ...offsets[from] }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Tag>
  );
}
