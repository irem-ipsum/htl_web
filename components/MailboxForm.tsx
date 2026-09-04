"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { siteContent } from "@/lib/data";
import MailboxIllustration from "@/components/MailboxIllustration";

const SUBJECTS = [
  "Joining the community",
  "Event collaboration",
  "Venue or space support",
  "Mentorship",
  "Interview or podcast invite",
  "Press",
  "Something else",
];

type Status = "idle" | "sending" | "sent" | "fallback" | "error";

export default function MailboxForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [values, setValues] = useState({ name: "", email: "", subject: SUBJECTS[0], message: "" });

  const mailtoHref = `mailto:${siteContent.email}?subject=${encodeURIComponent(
    values.subject
  )}&body=${encodeURIComponent(`${values.message}\n\nFrom ${values.name} (${values.email})`)}`;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.ok) {
        setStatus("sent");
      } else if (data.reason === "not_configured") {
        // mail credentials aren't set yet, hand off to the visitor's mail app
        setStatus("fallback");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  function reset() {
    setStatus("idle");
    setValues({ name: "", email: "", subject: SUBJECTS[0], message: "" });
  }

  const done = status === "sent" || status === "fallback";

  return (
    <div className="grid gap-10 lg:grid-cols-[300px_1fr] items-start">
      {/* Illustration */}
      <div className="mx-auto lg:mx-0 flex flex-col items-center">
        <MailboxIllustration flagUp={done} />
        <p className="mt-4 text-center text-sm font-semibold text-(--color-ink)/60 max-w-[240px]">
          {done
            ? "Flag is up. Your message is on its way."
            : "Drop your message in the box and we'll raise the flag."}
        </p>
      </div>

      {/* Envelope card */}
      <div className="relative overflow-hidden rounded-3xl border-3 border-(--color-ink) bg-(--color-paper) shadow-poster">
        {/* flat purple band across the top of the envelope */}
        <div aria-hidden className="h-14 bg-(--color-purple-900) border-b-3 border-(--color-ink)" />

        <div className="p-6 sm:p-10">
          {!done ? (
            <form onSubmit={handleSubmit} className="grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-bold uppercase tracking-wide text-(--color-ink)/60">
                    Name
                  </span>
                  <input
                    suppressHydrationWarning
                    required
                    value={values.name}
                    onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
                    className="rounded-xl border-2 border-(--color-ink)/25 px-4 py-3 text-sm focus:border-(--color-purple-700) focus:outline-none transition-colors"
                    placeholder="Your name"
                  />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-bold uppercase tracking-wide text-(--color-ink)/60">
                    Email
                  </span>
                  <input
                    suppressHydrationWarning
                    required
                    type="email"
                    value={values.email}
                    onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
                    className="rounded-xl border-2 border-(--color-ink)/25 px-4 py-3 text-sm focus:border-(--color-purple-700) focus:outline-none transition-colors"
                    placeholder="you@example.com"
                  />
                </label>
              </div>

              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-bold uppercase tracking-wide text-(--color-ink)/60">
                  What&apos;s it about
                </span>
                <select
                  suppressHydrationWarning
                  value={values.subject}
                  onChange={(e) => setValues((v) => ({ ...v, subject: e.target.value }))}
                  className="rounded-xl border-2 border-(--color-ink)/25 px-4 py-3 text-sm focus:border-(--color-purple-700) focus:outline-none transition-colors bg-(--color-paper)"
                >
                  {SUBJECTS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-bold uppercase tracking-wide text-(--color-ink)/60">
                  Message
                </span>
                <textarea
                  suppressHydrationWarning
                  required
                  rows={5}
                  value={values.message}
                  onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
                  className="rounded-xl border-2 border-(--color-ink)/25 px-4 py-3 text-sm focus:border-(--color-purple-700) focus:outline-none transition-colors resize-none"
                  placeholder="Tell us what's on your mind"
                />
              </label>

              {status === "error" && (
                <p className="flex items-start gap-2 rounded-xl border-2 border-(--color-ink)/20 bg-(--color-purple-100) p-3 text-sm">
                  <AlertCircle size={18} className="shrink-0 mt-0.5" />
                  <span>
                    That didn&apos;t go through. Try again, or email us directly at{" "}
                    <a href={`mailto:${siteContent.email}`} className="font-bold underline">
                      {siteContent.email}
                    </a>
                    .
                  </span>
                </p>
              )}

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex items-center gap-2 rounded-full bg-(--color-purple-900) text-(--color-cream) border-3 border-(--color-ink) px-7 py-3.5 text-sm font-bold shadow-poster-sm transition-all hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_#171717] disabled:opacity-60"
                >
                  <Send size={16} />
                  {status === "sending" ? "Posting" : "Put it in the box"}
                </button>
                <a
                  href={mailtoHref}
                  className="text-sm font-semibold text-(--color-ink)/60 hover:text-(--color-purple-900) underline underline-offset-4"
                >
                  or just email us directly
                </a>
              </div>
            </form>
          ) : (
            <div className="flex flex-col items-center text-center py-10">
              <CheckCircle2 size={48} className="text-(--color-green-700)" />
              <h3 className="mt-4 font-display text-2xl font-bold">
                {status === "sent" ? "Got it" : "Almost there"}
              </h3>
              {status === "sent" ? (
                <p className="mt-2 text-(--color-ink)/70 max-w-sm">
                  Your message landed in our inbox. We usually get back within a few days.
                </p>
              ) : (
                <p className="mt-2 text-(--color-ink)/70 max-w-sm">
                  Sending isn&apos;t switched on yet on this server. Use the button below and your
                  mail app will open with the message ready to send to{" "}
                  <span className="font-bold">{siteContent.email}</span>.
                </p>
              )}
              {status === "fallback" && (
                <a
                  href={mailtoHref}
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-(--color-green-700) text-(--color-cream) border-3 border-(--color-ink) px-6 py-3 text-sm font-bold shadow-poster-sm"
                >
                  <Send size={16} /> Open my mail app
                </a>
              )}
              <button
                onClick={reset}
                className="mt-6 text-sm font-bold text-(--color-purple-900) underline underline-offset-4"
              >
                Write another one
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
