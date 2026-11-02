import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/content/projects";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/breadcrumbs";
import { Reveal } from "@/components/reveal";
import { ButtonLink, Tag } from "@/components/ui";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from "@/components/icons";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return pageMetadata({
    title: `${p.fullTitle} — case study`,
    description: `${p.tagline} ${p.problem}`.slice(0, 158),
    path: `/projects/${p.slug}`,
  });
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <article>
      <PageHeader
        crumbs={[
          { name: "Projects", path: "/projects" },
          { name: project.title, path: `/projects/${project.slug}` },
        ]}
        eyebrow={`Case study · ${project.year}`}
        title={project.fullTitle}
        intro={project.description}
      />

      <div className="container-page grid gap-12 py-8 lg:grid-cols-[1fr_20rem]">
        <div className="space-y-16">
          <Reveal>
            <div className={`relative aspect-[16/10] overflow-hidden rounded-[1.5rem] border border-line ${project.image.style === "logo" ? "bg-[#eceef1]" : "bg-[#0a0e17]"}`}>
              <Image src={project.image.src} alt={project.image.alt} fill priority sizes="(min-width: 1024px) 720px, 100vw" className={project.image.style === "logo" ? "object-contain p-8" : "object-cover"} />
            </div>
          </Reveal>

          <Reveal as="section">
            <h2 className="text-2xl font-semibold sm:text-3xl">The problem</h2>
            <p className="mt-4 text-lg text-muted">{project.problem}</p>
          </Reveal>

          <Reveal as="section">
            <h2 className="text-2xl font-semibold sm:text-3xl">My approach</h2>
            <ol className="mt-6 space-y-4">
              {project.approach.map((step, i) => (
                <li key={step} className="card flex gap-4 p-5">
                  <span aria-hidden className="font-mono text-sm text-accent">0{i + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal as="section">
            <h2 className="text-2xl font-semibold sm:text-3xl">What&apos;s inside</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {project.modules.map((m) => (
                <li key={m} className="flex items-center gap-3">
                  <Check className="shrink-0 text-accent" /> {m}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal as="section">
            <div className="rounded-[1.5rem] border border-accent/40 bg-surface p-8">
              <h2 className="eyebrow">The result</h2>
              <p className="mt-3 font-display text-2xl font-medium leading-snug sm:text-3xl">{project.result}</p>
            </div>
          </Reveal>
        </div>

        <aside aria-label="Project details" className="lg:sticky lg:top-24 lg:self-start">
          <dl className="card space-y-5 p-6">
            <div>
              <dt className="eyebrow">Client</dt>
              <dd className="mt-1">{project.client}</dd>
            </div>
            <div>
              <dt className="eyebrow">Role</dt>
              <dd className="mt-1">{project.role}</dd>
            </div>
            <div>
              <dt className="eyebrow">Timeline</dt>
              <dd className="mt-1">{project.year}</dd>
            </div>
            <div>
              <dt className="eyebrow">Tech</dt>
              <dd className="mt-2 flex flex-wrap gap-2">
                {project.tech.map((t) => <Tag key={t}>{t}</Tag>)}
              </dd>
            </div>
            {project.sourceNote && <p className="border-t border-line pt-4 text-sm text-muted">{project.sourceNote}</p>}
            <div className="flex flex-col gap-2">
              {project.liveUrl && (
                <ButtonLink href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  Live site <ArrowUpRight width={16} height={16} />
                </ButtonLink>
              )}
              {project.githubUrl && (
                <ButtonLink href={project.githubUrl} variant="secondary" target="_blank" rel="noopener noreferrer">
                  {project.sourceNote ? "More on GitHub" : "View on GitHub"} <ArrowUpRight width={16} height={16} />
                </ButtonLink>
              )}
            </div>
          </dl>
        </aside>
      </div>

      <nav aria-label="More projects" className="container-page mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8">
        <Link href="/projects" className="inline-flex items-center gap-2 text-muted hover:text-fg">
          <ArrowLeft /> All projects
        </Link>
        <Link href={`/projects/${next.slug}`} className="group inline-flex items-center gap-2 text-right font-semibold hover:text-accent">
          Next: {next.fullTitle} <ArrowRight className="transition group-hover:translate-x-1" />
        </Link>
      </nav>
    </article>
  );
}
