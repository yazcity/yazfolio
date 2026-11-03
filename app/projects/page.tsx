import { projects } from "@/content/projects";
import type { Project } from "@/content/types";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/breadcrumbs";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { SplitReveal } from "@/components/scroll/split-reveal";
import { ContactCta } from "@/components/sections/contact-cta";

export const metadata = pageMetadata({
  title: "Projects & Case Studies – .NET, React, Angular",
  description:
    "Case studies of enterprise .NET systems by Ahammed Yaseen — university platforms (UMS, TIPAM, LMS, TMS, .NET MAUI mobile app), Dubai Municipality permit and inspection systems, e-commerce, ERP and hospital management.",
  path: "/projects",
});

// Projects are grouped by where the work was done (based on `client` in content/projects.ts).
const groups: { id: string; title: string; intro: string; match: (p: Project) => boolean }[] = [
  {
    id: "city-university",
    title: "City University Ajman",
    intro: "Enterprise platforms I lead today — web, API and mobile.",
    match: (p) => p.client === "City University Ajman",
  },
  {
    id: "canada-hitech",
    title: "Dubai Municipality & Canada Hitech",
    intro: "Government and commercial systems for the Dubai Government and private clients.",
    match: (p) => p.client.includes("Canada Hitech"),
  },
  {
    id: "earlier",
    title: "Earlier work in India",
    intro: "ERP, company-management and healthcare systems from my early career.",
    match: (p) => p.client !== "City University Ajman" && !p.client.includes("Canada Hitech"),
  },
];

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ name: "Projects", path: "/projects" }]}
        eyebrow={`${projects.length} projects`}
        title="Platforms built to run real organisations."
        intro="Production systems I've designed and built across education, government and business. Open any one for the full case study: the problem, my approach, the stack and the result."
      />

      <nav aria-label="Project groups" className="container-page">
        <ul className="flex flex-wrap gap-2">
          {groups.map((g) => (
            <li key={g.id}>
              <a href={`#${g.id}`} className="inline-flex rounded-full border border-line px-4 py-2 text-sm transition hover:border-accent hover:text-accent">
                {g.title} <span className="ml-2 text-muted">{projects.filter(g.match).length}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {groups.map((g) => {
        const items = projects.filter(g.match);
        if (items.length === 0) return null;
        return (
          <section key={g.id} id={g.id} aria-labelledby={`${g.id}-title`} className="container-page scroll-mt-24 py-14">
            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
              <SplitReveal id={`${g.id}-title`} text={g.title} className="text-3xl font-semibold sm:text-4xl" />
              <p className="max-w-md text-muted">{g.intro}</p>
            </div>
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((p, i) => (
                <Reveal as="li" key={p.slug} delay={(i % 3) * 0.08}>
                  <ProjectCard project={p} headingLevel="h3" />
                </Reveal>
              ))}
            </ul>
          </section>
        );
      })}

      <ContactCta />
    </>
  );
}
