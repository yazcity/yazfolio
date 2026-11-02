import { profile } from "@/content/profile";
import { ScrollText } from "../scroll/scroll-text";

/** Full-width statement that lights up word by word on scroll. */
export function Manifesto() {
  return (
    <section aria-label="What I do, in one sentence" className="container-page py-28 sm:py-40">
      <p className="eyebrow flex items-center gap-3">
        <span aria-hidden className="h-px w-8 bg-accent" />
        In one sentence
      </p>
      <ScrollText
        text={profile.manifesto}
        className="mt-8 max-w-5xl font-display text-3xl font-semibold leading-[1.18] tracking-tight sm:text-5xl lg:text-6xl"
      />
    </section>
  );
}
