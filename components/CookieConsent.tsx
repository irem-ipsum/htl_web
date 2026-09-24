"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Cookie, X } from "lucide-react";
import {
  getConsent,
  saveConsent,
  subscribeConsent,
  OPEN_COOKIE_SETTINGS,
  type Consent,
  type ConsentChoices,
} from "@/lib/consent";

/** On the server there is no cookie to read, so render nothing until hydrated. */
const ON_SERVER = "server" as const;

function useConsent() {
  return useSyncExternalStore<Consent | null | typeof ON_SERVER>(
    subscribeConsent,
    getConsent,
    () => ON_SERVER
  );
}

/*
 * Accept and Reject share one style on purpose. Consent only counts if saying
 * no is as easy and as visible as saying yes, so neither is allowed to look
 * like the "right" answer.
 */
const choiceButton =
  "inline-flex min-h-11 items-center justify-center rounded-full border-3 border-(--color-ink) px-5 py-2.5 text-sm font-bold transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-(--color-purple-500)/40";
const solid = `${choiceButton} bg-(--color-purple-900) text-(--color-cream)`;
const outline = `${choiceButton} bg-(--color-paper) text-(--color-ink)`;

function Switch({
  checked,
  onChange,
  labelledBy,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  labelledBy: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-labelledby={labelledBy}
      onClick={() => onChange(!checked)}
      className={`relative h-8 w-14 shrink-0 rounded-full border-3 border-(--color-ink) transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-(--color-purple-500)/40 ${
        checked ? "bg-(--color-green-500)" : "bg-(--color-ink)/15"
      }`}
    >
      <span
        aria-hidden
        className={`absolute top-1/2 left-0.5 h-5 w-5 -translate-y-1/2 rounded-full border-2 border-(--color-ink) bg-(--color-paper) transition-transform ${
          checked ? "translate-x-6" : "translate-x-0"
        }`}
      />
      <span className="sr-only">{checked ? "On" : "Off"}</span>
    </button>
  );
}

export default function CookieConsent() {
  const consent = useConsent();
  const reduceMotion = useReducedMotion();
  const [panelOpen, setPanelOpen] = useState(false);
  const [draft, setDraft] = useState<ConsentChoices>({ analytics: false });
  const panelRef = useRef<HTMLDivElement>(null);

  // The footer "Cookie settings" link fires this event from any page.
  useEffect(() => {
    const open = () => {
      const current = getConsent();
      setDraft({ analytics: current?.analytics ?? false });
      setPanelOpen(true);
    };
    window.addEventListener(OPEN_COOKIE_SETTINGS, open);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS, open);
  }, []);

  // While the panel is open: Escape closes it, the page behind stops
  // scrolling, and keyboard focus moves into the panel.
  useEffect(() => {
    if (!panelOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPanelOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [panelOpen]);

  if (consent === ON_SERVER) return null;

  const decide = (choices: ConsentChoices) => {
    saveConsent(choices);
    setPanelOpen(false);
  };

  const openPanel = () => {
    setDraft({ analytics: consent?.analytics ?? false });
    setPanelOpen(true);
  };

  const enter = reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 };
  const shown = reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 };

  return (
    <>
      {consent === null && !panelOpen && (
        <motion.section
          role="region"
          aria-label="Cookie consent"
          initial={enter}
          animate={shown}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed inset-x-3 bottom-3 z-90 sm:inset-x-auto sm:left-5 sm:bottom-5 sm:w-[26rem] rounded-3xl border-3 border-(--color-ink) bg-(--color-cream) p-5 sm:p-6 text-(--color-ink) shadow-poster"
        >
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border-2 border-(--color-ink) bg-(--color-purple-100) text-(--color-purple-900)">
              <Cookie size={18} />
            </span>
            <h2 className="font-display text-lg font-bold">A quick word on cookies</h2>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-(--color-ink)/75">
            We use one cookie to remember this choice. With your OK we would also use analytics
            cookies to see which pages get read, so we know what is worth keeping. No ads, and
            nothing optional is set until you choose.{" "}
            <Link href="/cookies" className="font-bold text-(--color-purple-900) underline underline-offset-2">
              Cookie policy
            </Link>
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2.5">
            <button type="button" className={solid} onClick={() => decide({ analytics: true })}>
              Accept all
            </button>
            <button type="button" className={solid} onClick={() => decide({ analytics: false })}>
              Reject all
            </button>
            <button type="button" className={`${outline} col-span-2`} onClick={openPanel}>
              Manage preferences
            </button>
          </div>
        </motion.section>
      )}

      {panelOpen && (
        <div
          className="fixed inset-0 z-120 flex items-end sm:items-center justify-center bg-(--color-ink)/60 p-3 sm:p-6"
          onClick={() => setPanelOpen(false)}
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-prefs-title"
            tabIndex={-1}
            initial={enter}
            animate={shown}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl border-3 border-(--color-ink) bg-(--color-cream) p-6 sm:p-7 text-(--color-ink) shadow-poster focus:outline-none"
          >
            <button
              type="button"
              onClick={() => setPanelOpen(false)}
              aria-label="Close cookie preferences"
              className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border-2 border-(--color-ink) bg-(--color-paper) hover:bg-(--color-purple-100) transition-colors"
            >
              <X size={16} />
            </button>

            <h2 id="cookie-prefs-title" className="font-display text-2xl font-bold pr-10">
              Cookie preferences
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-(--color-ink)/70">
              Choose what you are happy with. You can change this any time from the Cookie
              settings link at the bottom of every page.
            </p>

            <ul className="mt-5 space-y-3">
              <li className="rounded-2xl border-2 border-(--color-ink) bg-(--color-paper) p-4">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-display font-bold">Strictly necessary</h3>
                  <span className="shrink-0 rounded-full border-2 border-(--color-ink) bg-(--color-green-100) px-3 py-1 text-[11px] font-bold uppercase tracking-wide">
                    Always on
                  </span>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-(--color-ink)/70">
                  Remembers the choice you make here. Without it we would have to ask on every page.
                </p>
              </li>
              <li className="rounded-2xl border-2 border-(--color-ink) bg-(--color-paper) p-4">
                <div className="flex items-center justify-between gap-4">
                  <h3 id="cookie-analytics-label" className="font-display font-bold">
                    Analytics
                  </h3>
                  <Switch
                    checked={draft.analytics}
                    onChange={(analytics) => setDraft({ analytics })}
                    labelledBy="cookie-analytics-label"
                  />
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-(--color-ink)/70">
                  Counts visits and shows which pages people read, so we can see what is useful. Run
                  by Google Analytics. Off unless you switch it on.
                </p>
              </li>
            </ul>

            <div className="mt-6 grid gap-2.5 sm:grid-cols-3">
              <button type="button" className={solid} onClick={() => decide(draft)}>
                Save choices
              </button>
              <button type="button" className={outline} onClick={() => decide({ analytics: true })}>
                Accept all
              </button>
              <button type="button" className={outline} onClick={() => decide({ analytics: false })}>
                Reject all
              </button>
            </div>

            <p className="mt-4 text-xs text-(--color-ink)/55">
              Full details, including every cookie by name, are in our{" "}
              <Link
                href="/cookies"
                onClick={() => setPanelOpen(false)}
                className="font-bold text-(--color-purple-900) underline underline-offset-2"
              >
                cookie policy
              </Link>
              .
            </p>
          </motion.div>
        </div>
      )}
    </>
  );
}
