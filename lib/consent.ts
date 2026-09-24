/**
 * Cookie consent, kept in one small first party cookie.
 *
 * The consent cookie itself is strictly necessary (it is how the site
 * remembers your answer), so it needs no permission. Everything else waits
 * for a yes. Nothing optional loads before a choice has been saved.
 *
 * Bump CONSENT_VERSION whenever the cookies the site uses change. Everyone is
 * then asked again, because an old answer no longer covers the new cookies.
 */

export const CONSENT_COOKIE = "htl_consent";
export const CONSENT_VERSION = 1;
/** How long an answer is remembered before we ask again. Six months. */
export const CONSENT_MAX_AGE_DAYS = 180;

/** Optional categories. Strictly necessary cookies are always on. */
export type ConsentChoices = { analytics: boolean };

export type Consent = ConsentChoices & {
  necessary: true;
  version: number;
  updatedAt: string;
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

let cachedRaw: string | null | undefined;
let cachedValue: Consent | null = null;
const listeners = new Set<() => void>();

function readRaw(): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${CONSENT_COOKIE}=([^;]*)`));
  return match ? match[1] : null;
}

function parse(raw: string | null): Consent | null {
  if (!raw) return null;
  try {
    const value = JSON.parse(decodeURIComponent(raw)) as Partial<Consent>;
    if (value.version !== CONSENT_VERSION) return null;
    return {
      necessary: true,
      analytics: value.analytics === true,
      version: CONSENT_VERSION,
      updatedAt: typeof value.updatedAt === "string" ? value.updatedAt : "",
    };
  } catch {
    return null;
  }
}

/**
 * The saved answer, or null when there is none yet. Returns the same object
 * until the cookie changes, which is what useSyncExternalStore needs.
 */
export function getConsent(): Consent | null {
  if (typeof document === "undefined") return null;
  const raw = readRaw();
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedValue = parse(raw);
  }
  return cachedValue;
}

export function subscribeConsent(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** Removes Google Analytics cookies on this domain and its parent domain. */
function clearAnalyticsCookies() {
  const names = document.cookie
    .split(";")
    .map((c) => c.trim().split("=")[0])
    .filter((n) => n === "_ga" || n.startsWith("_ga_") || n === "_gid" || n.startsWith("_gat"));
  if (!names.length) return;

  const host = window.location.hostname;
  const parts = host.split(".");
  const domains = [host, ...(parts.length > 2 ? ["." + parts.slice(-2).join(".")] : []), "." + host];
  for (const name of names) {
    document.cookie = `${name}=; Max-Age=0; Path=/`;
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; Path=/; Domain=${domain}`;
    }
  }
}

export function saveConsent(choices: ConsentChoices) {
  const value: Consent = {
    necessary: true,
    analytics: choices.analytics,
    version: CONSENT_VERSION,
    updatedAt: new Date().toISOString(),
  };
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie =
    `${CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify(value))}` +
    `; Max-Age=${CONSENT_MAX_AGE_DAYS * 24 * 60 * 60}; Path=/; SameSite=Lax${secure}`;

  if (GA_ID) {
    // Google's own switch: once this is true the tag stops sending anything,
    // even if it already loaded earlier in this visit.
    (window as unknown as Record<string, boolean>)[`ga-disable-${GA_ID}`] = !value.analytics;
  }
  if (!value.analytics) clearAnalyticsCookies();

  listeners.forEach((l) => l());
}

/** Opens the preferences panel from anywhere, such as the footer link. */
export const OPEN_COOKIE_SETTINGS = "htl:open-cookie-settings";

export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS));
}

/** True when analytics is configured for the site at all. */
export const analyticsConfigured = Boolean(GA_ID);
