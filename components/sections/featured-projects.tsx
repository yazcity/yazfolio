import { featuredProjects } from "@/content/projects";
import { ProjectStack } from "../scroll/project-stack";
import { ButtonLink, SectionHeading } from "../ui";
import { ArrowRight } from "../icons";

export function FeaturedProjects() {
  return (
    <section aria-labelledby="work-title">
      <ProjectStack
        projects={featuredProjects}
        intro={
          <SectionHeading
            id="work-title"
            eyebrow="Selected work"
            title="Selected platforms in production"
            intro="University platforms I lead at City University Ajman and government systems for Dubai Municipality — built for automation, efficiency and scale."
          />
        }
        outro={
          <ButtonLink href="/projects" variant="secondary">
            All projects <ArrowRight className="transition group-hover:translate-x-1" />
          </ButtonLink>
        }
      />
    </section>
  );
}
