"use client";

import { useState, useSyncExternalStore } from "react";
import { profile } from "@/content/profile";
import { ArrowRight, Check } from "./icons";

/*
 * TODO (optional): connect a free form service so messages arrive without opening
 * the visitor's email app. E.g. create a form at https://formspree.io, then add
 *   NEXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/f/xxxxxxx
 * to .env.local and to your Vercel project's Environment Variables.
 * Without it, the form falls back to opening a pre-filled email (mailto:).
 */
const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

const intents = {
  hire: { label: "Hiring for a role", subject: "Job opportunity" },
  project: { label: "Freelance / project work", subject: "Project enquiry" },
  other: { label: "Something else", subject: "Hello" },
} as const;
type Intent = keyof typeof intents;

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "mt-2 w-full rounded-xl border border-line-strong bg-bg px-4 py-3 text-fg placeholder:text-muted transition focus:border-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40";

// Pre-select the intent from ?intent=… — read on the client so the page stays static.
const noSubscribe = () => () => {};
function readUrlIntent(): Intent {
  const q = new URLSearchParams(window.location.search).get("intent");
  return q && q in intents ? (q as Intent) : "hire";
}

export function ContactForm() {
  const urlIntent = useSyncExternalStore(noSubscribe, readUrlIntent, () => "hire" as Intent);
  const [chosen, setIntent] = useState<Intent | null>(null);
  const intent = chosen ?? urlIntent;
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("company_website")) return; // honeypot: bots fill hidden fields

    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");
    const subject = `${intents[intent].subject} — from ${name}`;

    if (!ENDPOINT) {
      const body = `${message}\n\n— ${name}\n${email}`;
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus("sent");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, intent: intents[intent].label, _subject: subject }),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="card flex flex-col items-start gap-4 p-8">
        <span className="grid size-12 place-items-center rounded-full bg-accent text-on-accent"><Check /></span>
        <h2 className="text-2xl font-semibold">{ENDPOINT ? "Message sent — thank you!" : "Your email app should open now."}</h2>
        <p className="text-muted">
          {ENDPOINT
            ? "I'll get back to you soon."
            : <>If nothing happened, email me directly at <a className="font-medium text-accent underline" href={`mailto:${profile.email}`}>{profile.email}</a>.</>}
        </p>
        <button type="button" onClick={() => setStatus("idle")} className="font-semibold text-accent hover:underline">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card space-y-6 p-6 sm:p-8" noValidate={false}>
      <fieldset>
        <legend className="font-semibold">What can I help with?</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {(Object.keys(intents) as Intent[]).map((key) => (
            <label key={key} className="cursor-pointer">
              <input type="radio" name="intent" value={key} checked={intent === key} onChange={() => setIntent(key)} className="peer sr-only" />
              <span className="inline-block rounded-full border border-line-strong px-4 py-2 text-sm transition peer-checked:border-accent peer-checked:bg-accent peer-checked:text-on-accent peer-focus-visible:ring-2 peer-focus-visible:ring-accent peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-surface">
                {intents[key].label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="font-semibold">Name</label>
          <input id="name" name="name" required autoComplete="name" className={field} />
        </div>
        <div>
          <label htmlFor="email" className="font-semibold">Email</label>
          <input id="email" name="email" type="email" required autoComplete="email" className={field} />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="font-semibold">Message</label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className={field}
          placeholder={intent === "project" ? "What are you building, and by when?" : intent === "hire" ? "Tell me about the role and team." : "How can I help?"}
        />
      </div>
      {/* Honeypot — hidden from people and assistive tech. */}
      <div aria-hidden className="hidden">
        <label>Company website <input name="company_website" tabIndex={-1} autoComplete="off" /></label>
      </div>

      {status === "error" && (
        <p role="alert" className="rounded-xl border border-red-500/50 bg-red-500/10 p-3 text-sm">
          Something went wrong sending your message. Please email me at{" "}
          <a className="font-semibold underline" href={`mailto:${profile.email}`}>{profile.email}</a>.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-on-accent transition hover:-translate-y-0.5 disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send message"}
        <ArrowRight className="transition group-hover:translate-x-1" />
      </button>
    </form>
  );
}
