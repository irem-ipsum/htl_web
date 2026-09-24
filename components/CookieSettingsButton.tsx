"use client";

import { openCookieSettings } from "@/lib/consent";

/** Reopens the cookie preferences panel. Lives in the footer on every page. */
export default function CookieSettingsButton({
  className = "",
  children = "Cookie settings",
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <button type="button" onClick={openCookieSettings} className={className}>
      {children}
    </button>
  );
}
