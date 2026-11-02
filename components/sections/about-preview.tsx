import Image from "next/image";
import { profile } from "@/content/profile";
import { experience } from "@/content/experience";
import { Reveal } from "../reveal";
import { CountUp } from "../scroll/count-up";
import { Parallax, RevealImage } from "../scroll/parallax";
import { SplitReveal } from "../scroll/split-reveal";
import { ButtonLink } from "../ui";
import { ArrowRight } from "../icons";

export function AboutPreview() {
  const stats = [
    { value: profile.yearsOfExperience, label: "Years building software" },
    { value: profile.uaeYears, label: "Years in the UAE" },
    { value: "97%+", label: "Appraisal ratings, 5 years running" },
    { value: "400+", label: "Users supported across 12 companies" },
  ];

  return (
    <section id="about" aria-labelledby="about-title" className="container-page scroll-mt-24 py-24">
      <div className="grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="relative mx-auto w-full max-w-sm">
          <Parallax offset={30} className="absolute -inset-4 -z-10">
            <div aria-hidden className="size-full rounded-[2.25rem] bg-linear-to-br from-accent/45 to-accent-2/45 opacity-70 blur-2xl" />
          </Parallax>
          <RevealImage className="rounded-[1.75rem] border border-line">
            <Image
              src={profile.avatar.src}
              alt={profile.avatar.alt}
              width={896}
              height={1050}
              sizes="(min-width: 1024px) 384px, 80vw"
              className="h-auto w-full"
            />
          </RevealImage>
          <Parallax offset={-40} className="absolute -bottom-6 -right-4 sm:-right-10">
            <div className="card px-4 py-3 shadow-xl">
              <p className="font-mono text-xs text-muted">Currently</p>
              <p className="font-semibold">{experience[0].role}</p>
              <p className="text-sm text-accent">{experience[0].company}</p>
            </div>
          </Parallax>
        </div>

        <div>
          <Reveal>
            <p className="eyebrow flex items-center gap-3">
              <span aria-hidden className="h-px w-8 bg-accent" />
              About
            </p>
          </Reveal>
          <SplitReveal id="about-title" text="Engineering the systems organisations run on." className="mt-4 text-4xl font-semibold leading-[1.05] sm:text-5xl" />
          <div className="mt-6 space-y-4 text-lg text-muted">
            {profile.bio.map((p, i) => (
              <Reveal key={p} delay={0.1 + i * 0.08}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
          <dl className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08} from="scale" className="card flex flex-col p-4">
                <dt className="text-sm text-muted">{s.label}</dt>
                <dd className="order-first font-display text-3xl font-semibold text-accent">
                  <CountUp value={s.value} />
                </dd>
              </Reveal>
            ))}
          </dl>
          <Reveal delay={0.2}>
            <ButtonLink href="/about" variant="secondary" className="mt-8">
              More about me <ArrowRight className="transition group-hover:translate-x-1" />
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
