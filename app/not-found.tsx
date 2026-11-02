import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui";
import { ArrowRight } from "@/components/icons";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This page doesn't exist.",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="relative isolate grid min-h-[80svh] place-items-center overflow-hidden px-4 pt-16 text-center">
      <div aria-hidden className="bg-grid absolute inset-0 -z-10" />
      <div>
        <p aria-hidden className="font-display text-[clamp(6rem,22vw,14rem)] font-bold leading-none text-gradient">404</p>
        <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">This endpoint returned nothing.</h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-muted">
          The page you&apos;re looking for has moved or never existed. Let&apos;s get you back on a known route.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/">Back home <ArrowRight className="transition group-hover:translate-x-1" /></ButtonLink>
          <ButtonLink href="/projects" variant="secondary">See projects</ButtonLink>
        </div>
        <p className="mt-8 text-sm text-muted">
          Think something&apos;s broken? <Link href="/contact" className="text-accent underline underline-offset-4">Tell me</Link>.
        </p>
      </div>
    </section>
  );
}
