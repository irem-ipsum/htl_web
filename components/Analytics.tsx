"use client";

import Script from "next/script";
import { useSyncExternalStore } from "react";
import { getConsent, subscribeConsent } from "@/lib/consent";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/**
 * Google Analytics, loaded only when both are true:
 *   1. NEXT_PUBLIC_GA_ID is set (see .env.example), and
 *   2. the visitor has said yes to analytics cookies.
 * Until then not a single request goes to Google.
 */
export default function Analytics() {
  const consent = useSyncExternalStore(subscribeConsent, getConsent, () => null);
  if (!GA_ID || !consent?.analytics) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`window['ga-disable-${GA_ID}'] = false;
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
      </Script>
    </>
  );
}
