import { skillGroups } from "@/content/skills";
import { Reveal } from "../reveal";
import { Marquee } from "../scroll/marquee";
import { SectionHeading } from "../ui";

export function Skills() {
  const all = skillGroups.flatMap((g) => g.skills);
  const half = Math.ceil(all.length / 2);

  return (
    <section aria-labelledby="skills-title" className="relative py-24">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-line-strong/50 to-transparent" />
      <div className="container-page">
        <SectionHeading
          id="skills-title"
          eyebrow="What I do"
          title="Full stack, end to end"
          intro="From database schema to the pixel on screen — I design, build and run the whole thing."
        />
      </div>

      <div role="group" aria-label="Technologies I work with" className="mt-14 space-y-4">
        <Marquee items={all.slice(0, half)} speed={45} />
        <Marquee items={all.slice(half)} speed={50} reverse />
      </div>

      <ul className="container-page mt-16 grid gap-5 md:grid-cols-2">
        {skillGroups.map((g, i) => (
          <Reveal
            as="li"
            key={g.title}
            delay={(i % 2) * 0.1}
            from={i % 2 ? "right" : "left"}
            className="card group relative overflow-hidden p-7 transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-accent/50"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -right-6 -top-10 font-display text-[9rem] font-bold leading-none text-fg/[0.04] transition duration-700 group-hover:-translate-x-3 group-hover:text-accent/10"
            >
              0{i + 1}
            </span>
            <h3 className="relative text-xl font-semibold">{g.title}</h3>
            <p className="relative mt-3 text-muted">{g.description}</p>
            <ul className="relative mt-5 flex flex-wrap gap-2" aria-label={`${g.title} skills`}>
              {g.skills.map((s) => (
                <li key={s} className="rounded-full border border-line bg-surface-2 px-3 py-1 text-sm transition group-hover:border-line-strong">
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
