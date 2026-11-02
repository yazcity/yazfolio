import { profile } from "@/content/profile";
import { Reveal } from "../reveal";
import { Parallax } from "../scroll/parallax";
import { SplitReveal } from "../scroll/split-reveal";
import { ButtonLink } from "../ui";
import { ArrowRight, Mail } from "../icons";

export function ContactCta() {
  return (
    <section aria-labelledby="cta-title" className="container-page py-24">
      <Reveal from="scale">
        <div className="relative isolate overflow-hidden rounded-[2rem] border border-line bg-surface px-6 py-20 text-center sm:px-12">
          <div aria-hidden className="bg-grid absolute inset-0 -z-10 opacity-70" />
          <Parallax offset={50} className="absolute left-1/2 top-0 -z-10 -translate-x-1/2">
            <div
              aria-hidden
              className="h-64 w-[40rem] max-w-[90vw] -translate-y-1/2 rounded-full opacity-50 blur-3xl"
              style={{ background: "linear-gradient(90deg, var(--accent), var(--accent-2))" }}
            />
          </Parallax>
          <p className="eyebrow">{profile.availability}</p>
          <SplitReveal
            id="cta-title"
            text="Have a system that needs to just work?"
            className="mx-auto mt-4 max-w-2xl text-3xl font-semibold leading-[1.08] sm:text-5xl"
          />
          <Reveal delay={0.3}>
            <p className="mx-auto mt-5 max-w-xl text-lg text-muted">
              Hiring a senior .NET engineer, or planning a project? Tell me about it — I usually reply within a day or two.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <ButtonLink href="/contact?intent=hire">
                Hire me <ArrowRight className="transition group-hover:translate-x-1" />
              </ButtonLink>
              <ButtonLink href="/contact?intent=project" variant="secondary">Start a project</ButtonLink>
              <ButtonLink href={`mailto:${profile.email}`} variant="secondary">
                <Mail /> Email me
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Reveal>
    </section>
  );
}
