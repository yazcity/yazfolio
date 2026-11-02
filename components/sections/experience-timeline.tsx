import Image from "next/image";
import { experience } from "@/content/experience";
import { Reveal } from "../reveal";
import { TimelineLine } from "../scroll/timeline-line";
import { SectionHeading } from "../ui";

export function ExperienceTimeline({ detailed = false }: { detailed?: boolean }) {
  return (
    <section aria-labelledby="experience-title" className="container-page py-24">
      <SectionHeading
        id="experience-title"
        eyebrow="Experience"
        title="Where I've shipped"
        intro="12+ years of enterprise software across government, education and enterprise — in the UAE and India."
      />

      <div className="relative mt-16">
        <TimelineLine className="left-[19px] md:left-1/2" />
        <ol className="space-y-14">
          {experience.map((job, i) => {
            const flip = i % 2 === 1;
            return (
              <li key={job.company} className="relative grid gap-4 pl-14 md:grid-cols-2 md:gap-14 md:pl-0">
                <Reveal
                  from="scale"
                  className="absolute left-[11px] top-1.5 z-10 md:left-1/2 md:-ml-[8.5px]"
                >
                  <span aria-hidden className="grid size-[17px] place-items-center rounded-full border-2 border-accent bg-bg shadow-[0_0_0_6px_var(--bg)]">
                    <span className="size-1.5 rounded-full bg-accent" />
                  </span>
                </Reveal>

                <Reveal from={flip ? "right" : "left"} className={flip ? "md:order-2" : "md:text-right"}>
                  <p className="font-mono text-sm text-accent">
                    {job.start} — {job.end}
                  </p>
                  <div className={`mt-2 flex items-center gap-3 ${flip ? "" : "md:flex-row-reverse"}`}>
                    {job.logo ? (
                      <span className="grid size-11 shrink-0 place-items-center overflow-hidden rounded-xl border border-line bg-white p-1">
                        <Image src={job.logo} alt="" width={44} height={44} className="h-auto max-h-full w-auto" />
                      </span>
                    ) : (
                      <span aria-hidden className="grid size-11 shrink-0 place-items-center rounded-xl border border-line bg-surface-2 font-display text-sm font-semibold text-accent">
                        {job.company.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                      </span>
                    )}
                    <div>
                      <h3 className="text-xl font-semibold sm:text-2xl">{job.role}</h3>
                      <p className="text-muted">
                        {job.company} · {job.location}
                      </p>
                    </div>
                  </div>
                </Reveal>

                <Reveal from={flip ? "left" : "right"} delay={0.1} className={flip ? "md:order-1" : ""}>
                  <div className="card p-6 transition duration-500 hover:border-accent/50">
                    <p className="text-fg">{job.summary}</p>
                    {detailed && (
                      <ul className="mt-4 space-y-2 text-muted">
                        {job.highlights.map((h) => (
                          <li key={h} className="flex gap-3">
                            <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
