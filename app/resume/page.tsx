import Link from "next/link";
import { profile } from "@/content/profile";
import { experience } from "@/content/experience";
import { competencies, skillGroups, tools } from "@/content/skills";
import { certifications, education } from "@/content/education";
import { projects } from "@/content/projects";
import { profilePageSchema } from "@/lib/person-schema";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd, ButtonLink } from "@/components/ui";
import { Download, Mail, MapPin, Phone } from "@/components/icons";

const TITLE = "Ahammed Yaseen Resume / CV – Senior Full Stack .NET Developer";

export const metadata = {
  ...pageMetadata({
    title: TITLE,
    description:
      "Resume (CV) of Ahammed Yaseen, Senior Full Stack .NET Developer in Sharjah, UAE: 12+ years of experience, skills, projects, certifications and education. Download the PDF.",
    path: "/resume",
    type: "profile",
  }),
  title: { absolute: TITLE },
};

/** Full résumé as an HTML page — ranks for "Ahammed Yaseen resume / CV" far better than a PDF alone. */
export default function ResumePage() {
  return (
    <>
      <JsonLd data={profilePageSchema("/resume", TITLE)} />
      <article className="container-page max-w-4xl pb-16 pt-28">
        <Breadcrumbs items={[{ name: "Résumé", path: "/resume" }]} />

        <header className="mt-8 flex flex-wrap items-end justify-between gap-6 border-b border-line pb-8">
          <div>
            <p className="eyebrow">Resume / CV</p>
            <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">{profile.name}</h1>
            <p className="mt-2 text-xl text-accent">{profile.role}</p>
            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
              <li className="flex items-center gap-2"><MapPin width={16} height={16} /> {profile.location}</li>
              <li className="flex items-center gap-2"><Mail width={16} height={16} /> <a className="hover:text-accent" href={`mailto:${profile.email}`}>{profile.email}</a></li>
              <li className="flex items-center gap-2"><Phone width={16} height={16} /> <a className="hover:text-accent" href={`tel:${profile.phone.replace(/\s/g, "")}`}>{profile.phone}</a></li>
            </ul>
          </div>
          <ButtonLink href={profile.resumePath} download>
            <Download /> Download PDF
          </ButtonLink>
        </header>

        <section aria-labelledby="summary" className="mt-10">
          <h2 id="summary" className="text-2xl font-semibold">Professional profile</h2>
          <div className="mt-4 space-y-3 text-muted">
            {profile.bio.map((p) => <p key={p}>{p}</p>)}
          </div>
          <ul className="mt-5 flex flex-wrap gap-2">
            {competencies.map((c) => <li key={c} className="rounded-full border border-line-strong px-3 py-1.5 text-sm">{c}</li>)}
          </ul>
        </section>

        <section aria-labelledby="experience" className="mt-12">
          <h2 id="experience" className="text-2xl font-semibold">Work experience</h2>
          <ol className="mt-6 space-y-8">
            {experience.map((job) => (
              <li key={`${job.company}-${job.start}`} className="border-l-2 border-accent/60 pl-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-semibold">{job.role} · {job.company}</h3>
                  <p className="font-mono text-sm text-accent">{job.start} – {job.end}</p>
                </div>
                <p className="text-sm text-muted">{job.location}</p>
                <p className="mt-3">{job.summary}</p>
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-muted marker:text-accent">
                  {job.highlights.map((h) => <li key={h}>{h}</li>)}
                </ul>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="projects" className="mt-12">
          <h2 id="projects" className="text-2xl font-semibold">Key projects</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {projects.map((p) => (
              <li key={p.slug} className="card p-5">
                <h3 className="font-semibold"><Link href={`/projects/${p.slug}`} className="hover:text-accent">{p.fullTitle}</Link></h3>
                <p className="text-sm text-muted">{p.client} · {p.year}</p>
                <p className="mt-2 text-sm">{p.tech.join(", ")}</p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="skills" className="mt-12">
          <h2 id="skills" className="text-2xl font-semibold">Technical expertise</h2>
          <dl className="mt-6 space-y-3">
            {skillGroups.map((g) => (
              <div key={g.title} className="grid gap-1 sm:grid-cols-[13rem_1fr]">
                <dt className="font-semibold">{g.title}</dt>
                <dd className="text-muted">{g.skills.join(", ")}</dd>
              </div>
            ))}
            <div className="grid gap-1 sm:grid-cols-[13rem_1fr]">
              <dt className="font-semibold">Tools</dt>
              <dd className="text-muted">{tools.join(", ")}</dd>
            </div>
          </dl>
        </section>

        <section aria-labelledby="achievements" className="mt-12">
          <h2 id="achievements" className="text-2xl font-semibold">Key achievements</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-muted marker:text-accent">
            {profile.achievements.map((a) => <li key={a}>{a}</li>)}
          </ul>
        </section>

        <section aria-labelledby="certifications" className="mt-12">
          <h2 id="certifications" className="text-2xl font-semibold">Certifications & training</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-muted marker:text-accent">
            {certifications.map((c) => (
              <li key={c.title}>
                <span className="text-fg">{c.title}</span>
                {(c.issuer || c.date) && <> — {[c.issuer, c.date].filter(Boolean).join(", ")}</>}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="education" className="mt-12">
          <h2 id="education" className="text-2xl font-semibold">Education</h2>
          <ul className="mt-4 space-y-3">
            {education.map((e) => (
              <li key={e.school} className="flex flex-wrap items-baseline justify-between gap-2">
                <span><span className="font-semibold">{e.degree}</span> — {e.school}{e.location && `, ${e.location}`}</span>
                <span className="font-mono text-sm text-accent">{e.period}</span>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-14 flex flex-wrap gap-3 border-t border-line pt-8">
          <ButtonLink href={profile.resumePath} download><Download /> Download résumé (PDF)</ButtonLink>
          <ButtonLink href="/contact?intent=hire" variant="secondary">Hire me</ButtonLink>
        </div>
      </article>
    </>
  );
}
