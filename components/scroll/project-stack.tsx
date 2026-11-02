"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useSyncExternalStore, type ReactNode } from "react";
import { useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import * as m from "motion/react-m";
import type { Project } from "@/content/types";
import { ProjectCard } from "../project-card";
import { Reveal } from "../reveal";
import { ArrowUpRight } from "../icons";

const WIDE = "(min-width: 768px)";
const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(WIDE);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
const useIsWide = () => useSyncExternalStore(subscribe, () => window.matchMedia(WIDE).matches, () => false);

/**
 * Tablet/desktop: each project pins as a large card; the next one slides up over it while
 * the previous cards shrink back into a stack. Phones / reduced motion: a regular grid.
 */
export function ProjectStack({ projects, intro, outro }: { projects: Project[]; intro: ReactNode; outro: ReactNode }) {
  const wide = useIsWide();
  const reduced = useReducedMotion();

  if (!wide || reduced) {
    return (
      <div className="container-page py-24">
        {intro}
        <ul className="mt-12 grid gap-6 sm:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={(i % 2) * 0.08}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </ul>
        <div className="mt-10">{outro}</div>
      </div>
    );
  }

  return <StackedList projects={projects} intro={intro} outro={outro} />;
}

function StackedList({ projects, intro, outro }: { projects: Project[]; intro: ReactNode; outro: ReactNode }) {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: container, offset: ["start start", "end end"] });
  return (
    <div className="pt-24">
      <div className="container-page">{intro}</div>
      <div ref={container} className="relative">
        {projects.map((p, i) => (
          <StackCard key={p.slug} project={p} index={i} count={projects.length} progress={scrollYProgress} />
        ))}
      </div>
      <div className="container-page flex justify-center pb-24">{outro}</div>
    </div>
  );
}

function StackCard({ project, index, count, progress }: { project: Project; index: number; count: number; progress: MotionValue<number> }) {
  const wrapper = useRef<HTMLDivElement>(null);
  const isLast = index === count - 1;

  // Card i is fully pinned at progress i/(count-1); the next one covers it by (i+1)/(count-1).
  // Shrink once later cards start covering this one; earlier cards end up smallest.
  const steps = Math.max(1, count - 1);
  const pinned = index / steps;
  const covered = Math.min(1, (index + 1) / steps);
  const targetScale = 1 - (count - 1 - index) * 0.045;
  const scale = useTransform(progress, [pinned, 1], [1, isLast ? 1 : targetScale]);
  const shade = useTransform(progress, [pinned, covered], [0, isLast ? 0 : 0.5]);

  // The image settles from a gentle zoom as the card arrives.
  const { scrollYProgress: arrive } = useScroll({ target: wrapper, offset: ["start end", "start start"] });
  const imageScale = useTransform(arrive, [0, 1], [1.25, 1]);
  const lift = useTransform(arrive, [0, 1], [60, 0]);

  const logo = project.image.style === "logo";

  return (
    <div ref={wrapper} className="sticky top-0 flex h-svh items-center justify-center px-4 sm:px-6">
      <m.article
        style={{ scale, top: `calc(-4vh + ${index * 26}px)` }}
        className="group relative grid h-[min(560px,74svh)] w-full max-w-[72rem] origin-top overflow-hidden rounded-[2rem] border border-line bg-surface shadow-[0_30px_80px_-30px_rgb(0_0_0/0.45)] transition-colors duration-500 hover:border-accent/50 md:grid-cols-[1.15fr_1fr]"
      >
        <div className={`relative overflow-hidden ${logo ? "bg-[#eceef1]" : "bg-[#0b1724]"}`}>
          <m.div style={{ scale: imageScale }} className="absolute inset-0">
            <Image
              src={project.image.src}
              alt={project.image.alt}
              fill
              sizes="(min-width: 1152px) 620px, 55vw"
              className={`object-contain transition duration-700 group-hover:scale-105 ${logo ? "p-10" : ""}`}
            />
          </m.div>
          <span className="absolute left-6 top-6 rounded-full bg-black/55 px-3 py-1 font-mono text-xs text-white backdrop-blur">
            {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </span>
        </div>

        <m.div style={{ y: lift }} className="flex flex-col justify-center p-8 lg:p-12">
          <p className="font-mono text-xs uppercase tracking-wider text-accent">
            {project.client} · {project.year}
          </p>
          <h3 className="mt-3 text-3xl font-semibold leading-tight lg:text-4xl">
            <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0 after:z-10 focus-visible:outline-none">
              {project.fullTitle}
            </Link>
          </h3>
          <p className="mt-4 text-lg text-fg">{project.tagline}</p>
          <p className="mt-3 line-clamp-3 text-muted">{project.description}</p>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies">
            {project.tech.slice(0, 6).map((t) => (
              <li key={t} className="rounded-full border border-line bg-surface-2 px-3 py-1 font-mono text-xs">{t}</li>
            ))}
          </ul>
          <span aria-hidden className="mt-8 inline-flex items-center gap-2 font-semibold text-accent">
            Read case study
            <ArrowUpRight width={18} height={18} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </m.div>

        {/* Darkens a card as the next one slides over it. */}
        <m.div aria-hidden style={{ opacity: shade }} className="pointer-events-none absolute inset-0 z-20 bg-bg" />
        <span aria-hidden className="pointer-events-none absolute inset-0 z-30 rounded-[2rem] group-has-[:focus-visible]:ring-2 group-has-[:focus-visible]:ring-accent" />
      </m.article>
    </div>
  );
}
