"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import type { Project } from "@/content/types";
import { ArrowUpRight } from "./icons";

/** Project card with a subtle pointer-follow spotlight and tilt on hover. */
export function ProjectCard({ project, headingLevel = "h3" }: { project: Project; headingLevel?: "h2" | "h3" }) {
  const ref = useRef<HTMLElement>(null);
  const Heading = headingLevel;

  function onMove(e: React.PointerEvent) {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
    el.style.setProperty("--rx", `${(0.5 - y) * 5}deg`);
    el.style.setProperty("--ry", `${(x - 0.5) * 7}deg`);
  }
  function onLeave() {
    ref.current?.style.setProperty("--rx", "0deg");
    ref.current?.style.setProperty("--ry", "0deg");
  }

  return (
    <article
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="card group relative h-full overflow-hidden transition-[transform,border-color,box-shadow] duration-300 [transform:perspective(900px)_rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))] hover:border-accent/60 hover:shadow-[0_20px_60px_-20px_rgb(var(--glow)/0.45)] motion-reduce:[transform:none]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: "radial-gradient(420px circle at var(--mx,50%) var(--my,50%), color-mix(in oklab, var(--accent) 14%, transparent), transparent 60%)" }}
      />
      <div className={`relative aspect-[16/10] overflow-hidden ${project.image.style === "logo" ? "bg-[#eceef1]" : "bg-[#0a0e17]"}`}>
        <Image
          src={project.image.src}
          alt={project.image.alt}
          fill
          sizes="(min-width: 1024px) 544px, (min-width: 640px) 50vw, 100vw"
          className={`transition duration-700 group-hover:scale-105 ${project.image.style === "logo" ? "object-contain p-4" : "object-cover"}`}
        />
      </div>
      <div className="relative p-6">
        <p className="font-mono text-xs uppercase tracking-wider text-muted">
          {project.client} · {project.year}
        </p>
        <Heading className="mt-2 text-xl font-semibold">
          <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0 after:z-20 focus-visible:outline-none">
            {project.fullTitle}
          </Link>
        </Heading>
        <p className="mt-2 text-muted">{project.tagline}</p>
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies">
          {project.tech.slice(0, 4).map((t) => (
            <li key={t} className="rounded-full border border-line px-2.5 py-0.5 font-mono text-xs text-muted">{t}</li>
          ))}
        </ul>
        <span aria-hidden className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent">
          Read case study <ArrowUpRight width={16} height={16} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
      {/* Focus ring around the whole card when its link has keyboard focus. */}
      <span aria-hidden className="pointer-events-none absolute inset-0 z-30 rounded-[1.25rem] group-has-[:focus-visible]:ring-2 group-has-[:focus-visible]:ring-accent" />
    </article>
  );
}
