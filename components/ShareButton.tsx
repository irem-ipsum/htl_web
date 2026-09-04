"use client";

import { useEffect, useRef, useState } from "react";
import { Share2, Check } from "lucide-react";

/**
 * Copies the current event page link to the clipboard.
 * Falls back to a hidden input + execCommand where the async clipboard API
 * is unavailable (older browsers, or any page not served over https).
 */
export default function ShareButton({ label = "Share this event" }: { label?: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  async function copy() {
    const url = window.location.href;
    let ok = false;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(url);
        ok = true;
      }
    } catch {
      ok = false;
    }

    if (!ok) {
      const field = document.createElement("textarea");
      field.value = url;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      try {
        ok = document.execCommand("copy");
      } catch {
        ok = false;
      }
      document.body.removeChild(field);
    }

    if (ok) {
      setCopied(true);
      if (timer.current) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2200);
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-live="polite"
      className={`group mt-6 w-full flex items-center justify-center gap-2 rounded-full border-3 border-(--color-ink) px-5 py-3.5 text-sm font-bold shadow-poster-sm transition-all hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_#171717] active:translate-y-0 active:shadow-[1px_1px_0_0_#171717] ${
        copied
          ? "bg-(--color-green-500) text-(--color-ink)"
          : "bg-(--color-purple-500) text-(--color-cream)"
      }`}
    >
      <span className="relative flex h-4 w-4 items-center justify-center">
        <Share2
          size={16}
          className={`absolute transition-all duration-200 ${
            copied ? "scale-0 opacity-0" : "scale-100 opacity-100 group-hover:rotate-12"
          }`}
        />
        <Check
          size={16}
          className={`absolute transition-all duration-200 ${
            copied ? "scale-100 opacity-100" : "scale-0 opacity-0"
          }`}
        />
      </span>
      {copied ? "Link copied" : label}
    </button>
  );
}
