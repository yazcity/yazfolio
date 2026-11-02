import { site } from "@/content/site";
import { PERSON_ID, profilePageSchema } from "@/lib/person-schema";
import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/ui";
import { Hero } from "@/components/sections/hero";
import { Manifesto } from "@/components/sections/manifesto";
import { AboutPreview } from "@/components/sections/about-preview";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { Skills } from "@/components/sections/skills";
import { ExperienceTimeline } from "@/components/sections/experience-timeline";
import { Testimonials } from "@/components/sections/testimonials";
import { ContactCta } from "@/components/sections/contact-cta";

export const metadata = {
  ...pageMetadata({ title: site.title, description: site.description, path: "/", type: "profile" }),
  // The home page uses the full title as-is (no " · Ahammed Yaseen" suffix).
  title: { absolute: site.title },
};

export default function HomePage() {
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${site.name} — Portfolio`,
    alternateName: ["yazcity", ...site.alternateNames],
    url: site.url,
    author: { "@id": PERSON_ID },
  };

  return (
    <>
      <JsonLd data={[profilePageSchema("/", site.title), website]} />
      <Hero />
      <Manifesto />
      <AboutPreview />
      <FeaturedProjects />
      <Skills />
      <ExperienceTimeline />
      <Testimonials />
      <ContactCta />
    </>
  );
}
