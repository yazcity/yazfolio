import { testimonials } from "@/content/testimonials";
import { Reveal } from "../reveal";
import { SectionHeading } from "../ui";

/** Renders nothing until content/testimonials.ts has entries. */
export function Testimonials() {
  if (testimonials.length === 0) return null;
  return (
    <section aria-labelledby="testimonials-title" className="container-page py-24">
      <SectionHeading id="testimonials-title" eyebrow="Kind words" title="What people say" />
      <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <Reveal as="li" key={t.name} delay={i * 0.06}>
            <figure className="card flex h-full flex-col p-7">
              <span aria-hidden className="font-display text-5xl leading-none text-accent">&ldquo;</span>
              <blockquote className="mt-2 flex-1 text-lg">{t.quote}</blockquote>
              <figcaption className="mt-6 border-t border-line pt-4">
                <p className="font-semibold">{t.name}</p>
                <p className="text-sm text-muted">{t.title}, {t.company}</p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
