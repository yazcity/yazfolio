import Image from "next/image";
import { profile } from "@/content/profile";
import { education, certifications } from "@/content/education";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/breadcrumbs";
import { Reveal } from "@/components/reveal";
import { ButtonLink, SectionHeading } from "@/components/ui";
import { ArrowUpRight, Check, Download, Mail, MapPin, Phone } from "@/components/icons";
import { competencies, tools } from "@/content/skills";
import { CountUp } from "@/components/scroll/count-up";
import { Skills } from "@/components/sections/skills";
import { ExperienceTimeline } from "@/components/sections/experience-timeline";
import { ContactCta } from "@/components/sections/contact-cta";

export const metadata = pageMetadata({
  title: "About Me – Senior .NET Developer, Sharjah UAE",
  description: `About ${profile.name}, a ${profile.role} in ${profile.location} with ${profile.yearsOfExperience} years building enterprise web, mobile and desktop applications with ASP.NET Core, MVC, React, Angular, .NET MAUI and SQL Server.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ name: "About", path: "/about" }]}
        eyebrow="About me"
        title="A .NET engineer who cares about the whole system."
        intro={profile.valueStatement}
      />

      <section aria-label="Profile" className="container-page grid gap-12 py-12 lg:grid-cols-[1fr_20rem]">
        <Reveal className="space-y-5 text-lg text-muted">
          {profile.bio.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <p>
            Along the way I&apos;ve built Dubai Municipality&apos;s inspection and advertisement-permit systems, ERP,
            HR and payroll modules for a 12-company group, and university platforms used across academic departments
            — integrating payment gateways and government APIs, and supporting hundreds of business users.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <aside className="card space-y-4 p-6" aria-label="Quick facts">
            <Image src={profile.avatar.src} alt={profile.avatar.alt} width={896} height={1050} sizes="320px" className="h-auto w-full rounded-xl" />
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3"><MapPin className="text-accent" /> {profile.location}</li>
              <li className="flex items-center gap-3"><Mail className="text-accent" /> <a className="hover:text-accent" href={`mailto:${profile.email}`}>{profile.email}</a></li>
              <li className="flex items-center gap-3"><Phone className="text-accent" /> <a className="hover:text-accent" href={`tel:${profile.phone.replace(/\s/g, "")}`}>{profile.phone}</a></li>
            </ul>
            <ButtonLink href={profile.resumePath} download className="w-full"><Download /> Download résumé</ButtonLink>
          </aside>
        </Reveal>
      </section>

      <section aria-labelledby="achievements-title" className="container-page py-16">
        <SectionHeading id="achievements-title" eyebrow="Key achievements" title="Recognised for the work" />
        <div className="mt-12 grid gap-6 lg:grid-cols-[18rem_1fr]">
          <Reveal from="scale" className="card relative overflow-hidden p-7">
            <div aria-hidden className="absolute -right-10 -top-10 size-40 rounded-full bg-accent/20 blur-3xl" />
            <p className="font-display text-6xl font-semibold text-accent"><CountUp value="98.5%" /></p>
            <p className="mt-2 text-muted">Highest annual appraisal score — above 97% for five consecutive years.</p>
          </Reveal>
          <ul className="grid gap-4">
            {profile.achievements.map((a, i) => (
              <Reveal as="li" key={a} delay={i * 0.08} from="right" className="card flex gap-4 p-5">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-accent/15 text-accent"><Check width={18} height={18} /></span>
                <span>{a}</span>
              </Reveal>
            ))}
          </ul>
        </div>
        <Reveal delay={0.1}>
          <h3 className="eyebrow mt-14">Core competencies</h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {competencies.map((c) => (
              <li key={c} className="rounded-full border border-line-strong px-4 py-2 text-sm font-medium">{c}</li>
            ))}
          </ul>
          <h3 className="eyebrow mt-8">Tools I use daily</h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {tools.map((t) => (
              <li key={t} className="rounded-full border border-line bg-surface-2 px-3 py-1.5 font-mono text-xs">{t}</li>
            ))}
          </ul>
        </Reveal>
      </section>

      <ExperienceTimeline detailed />
      <Skills />

      <section aria-labelledby="education-title" className="container-page py-24">
        <SectionHeading id="education-title" eyebrow="Education" title="Foundations" />
        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {education.map((e, i) => (
            <Reveal as="li" key={e.school} delay={i * 0.08} from={i % 2 ? "right" : "left"} className="card p-7">
              <div className="flex items-center gap-4">
                <span className="grid size-14 shrink-0 place-items-center overflow-hidden rounded-xl border border-line bg-white p-1.5">
                  <Image src={e.logo} alt="" width={56} height={56} className="h-auto max-h-full w-auto" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold">{e.school}</h3>
                  <p className="text-muted">{e.degree}</p>
                  <p className="font-mono text-sm text-accent">{e.period}{e.location && <span className="text-muted"> · {e.location}</span>}</p>
                </div>
              </div>
              {e.summary && <p className="mt-4 text-fg">{e.summary}</p>}
              <ul className="mt-4 space-y-2 text-muted">
                {e.highlights.map((h) => (
                  <li key={h} className="flex gap-3"><span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />{h}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ul>
      </section>

      <section aria-labelledby="certs-title" className="container-page py-24">
        <SectionHeading id="certs-title" eyebrow="Certifications & awards" title="Always learning" intro="Recognitions and certifications that reflect my professional growth." />
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {certifications.map((c, i) => (
            <Reveal as="li" key={c.title} delay={(i % 4) * 0.08} from="scale" className="card group flex flex-col overflow-hidden">
              <div className="relative aspect-[4/3] overflow-hidden">
                {c.image ? (
                  <Image src={c.image} alt="" fill sizes="(min-width: 1024px) 280px, (min-width: 640px) 50vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" />
                ) : (
                  <div aria-hidden className="bg-grid grid size-full place-items-center bg-surface-2">
                    <span className="grid size-16 place-items-center rounded-2xl bg-linear-to-br from-accent to-accent-2 font-display text-xl font-bold text-on-accent transition duration-500 group-hover:rotate-6 group-hover:scale-110">
                      {(c.issuer ?? c.title).slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-semibold">{c.title}</h3>
                {(c.issuer || c.date) && <p className="text-sm text-accent">{[c.issuer, c.date].filter(Boolean).join(" · ")}</p>}
                <p className="mt-2 flex-1 text-sm text-muted">{c.description}</p>
                {c.url && (
                  <a href={c.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline">
                    View credential <ArrowUpRight width={16} height={16} /><span className="sr-only">for {c.title} (opens in a new tab)</span>
                  </a>
                )}
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      <ContactCta />
    </>
  );
}
