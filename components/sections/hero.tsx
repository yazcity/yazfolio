import Link from "next/link";
import { profile } from "@/content/profile";
import { HeroVisual } from "../hero/hero-visual";
import { HeroScroll } from "../scroll/hero-scroll";
import { ButtonLink } from "../ui";
import { ArrowRight, Download, GitHub, LinkedIn } from "../icons";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate flex min-h-svh items-center overflow-hidden pt-16">
      <div aria-hidden className="bg-grid absolute inset-0 -z-20" />
      <div className="absolute inset-y-0 right-0 -z-10 w-full lg:w-[60%] lg:[mask-image:linear-gradient(to_right,transparent,#000_28%)]">
        <HeroVisual />
      </div>
      {/* Keeps text readable over the scene on narrow screens. */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-r from-bg via-bg/80 to-transparent lg:via-bg/40" />

      <div className="container-page py-20">
        <HeroScroll className="max-w-2xl">
          <p className="rise inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3 py-1.5 text-sm text-fg backdrop-blur">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            {profile.availability}
          </p>

          <h1 id="hero-title" className="mt-6 text-[clamp(2.1rem,9.5vw,3.75rem)] font-semibold leading-[1.02] [overflow-wrap:anywhere] lg:text-7xl">
            {profile.name}
            <span className="mt-3 block text-2xl font-medium leading-tight sm:text-3xl lg:text-4xl">
              <span className="text-gradient">{profile.role}</span>
            </span>
          </h1>

          <p className="rise rise-1 mt-6 max-w-xl text-lg text-muted sm:text-xl">
            {profile.valueStatement} <span className="text-fg">{profile.yearsOfExperience} years</span> of full-stack
            .NET — ASP.NET Core &amp; MVC, React, Angular and SQL — {profile.uaeYears} of them in the UAE.
          </p>

          <div className="rise rise-2 mt-9 flex flex-wrap items-center gap-3">
            <ButtonLink href="/contact?intent=hire">
              Hire me <ArrowRight className="transition group-hover:translate-x-1" />
            </ButtonLink>
            <ButtonLink href="/contact?intent=project" variant="secondary">
              Start a project
            </ButtonLink>
            <a
              href={profile.resumePath}
              download
              className="group inline-flex items-center gap-2 rounded-full px-3 py-3 text-sm font-semibold text-fg underline-offset-4 hover:text-accent hover:underline"
            >
              <Download className="transition group-hover:translate-y-0.5" /> Download résumé
            </a>
          </div>

          <ul className="rise rise-3 mt-8 flex items-center gap-2" aria-label="Profiles">
            {[
              { label: "LinkedIn", href: profile.socials.find((s) => s.icon === "linkedin")?.href, Icon: LinkedIn },
              { label: "GitHub", href: profile.socials.find((s) => s.icon === "github")?.href, Icon: GitHub },
            ].map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="me noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-2 text-sm font-medium text-muted transition hover:border-accent hover:text-fg"
                >
                  <Icon width={16} height={16} /> {label}
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>

          <p className="rise rise-3 mt-6 text-sm text-muted">
            Recently: architecting{" "}
            <Link href="/projects/university-management-system" className="font-medium text-fg underline decoration-line-strong underline-offset-4 hover:decoration-accent">
              University Management System
            </Link>{" "}
            at City University Ajman.
          </p>
        </HeroScroll>
      </div>

      <a href="#about" className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs text-muted transition hover:text-fg sm:flex">
        Scroll
        <span aria-hidden className="h-10 w-px bg-linear-to-b from-muted to-transparent" />
      </a>
    </section>
  );
}
