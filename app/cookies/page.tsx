import type { Metadata } from "next";
import SectionHeader from "@/components/SectionHeader";
import CookieSettingsButton from "@/components/CookieSettingsButton";
import { siteContent } from "@/lib/data";
import { CONSENT_COOKIE, CONSENT_MAX_AGE_DAYS } from "@/lib/consent";

export const metadata: Metadata = {
  title: "Cookie policy | Hack The Loop",
  description: "Which cookies the Hack The Loop website uses, why, for how long, and how to change your choice.",
};

/** Update this whenever the policy text or the cookie list changes. */
const LAST_UPDATED = "21 September 2026";

type CookieRow = {
  name: string;
  provider: string;
  purpose: string;
  duration: string;
  category: "Strictly necessary" | "Analytics";
};

const COOKIES: CookieRow[] = [
  {
    name: CONSENT_COOKIE,
    provider: "Hack The Loop",
    purpose: "Remembers whether you accepted or rejected optional cookies, so we do not ask on every page.",
    duration: `${Math.round(CONSENT_MAX_AGE_DAYS / 30)} months`,
    category: "Strictly necessary",
  },
  {
    name: "_ga",
    provider: "Google Analytics",
    purpose: "Tells one visitor apart from another so visits can be counted. Set only if you allow analytics.",
    duration: "Up to 2 years",
    category: "Analytics",
  },
  {
    name: "_ga_<ID>",
    provider: "Google Analytics",
    purpose: "Keeps track of a single visit, such as which pages were viewed. Set only if you allow analytics.",
    duration: "Up to 2 years",
    category: "Analytics",
  },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="font-display text-xl sm:text-2xl font-bold">{title}</h2>
      <div className="space-y-3 text-(--color-ink)/75 leading-relaxed">{children}</div>
    </section>
  );
}

export default function CookiePolicyPage() {
  return (
    <div>
      <section className="dots bg-(--color-purple-100) border-b-3 border-(--color-ink) py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <SectionHeader
            as="h1"
            eyebrow="Cookie policy"
            title="What we store in your browser, and why"
            description={`Last updated ${LAST_UPDATED}`}
            accent="purple"
            bottomSpace={false}
          />
        </div>
      </section>

      <div className="dots bg-(--color-paper) py-14 sm:py-16">
        <div className="mx-auto max-w-3xl px-5 sm:px-8 space-y-12">
          <Section title="The short version">
            <p>
              This site uses one cookie that it cannot work properly without: the one that remembers
              your cookie choice. Anything else, which means analytics, only runs if you say yes. We
              do not show ads, we do not sell data, and we do not use cookies to follow you around
              other websites.
            </p>
            <div className="pt-1">
              <CookieSettingsButton className="inline-flex min-h-11 items-center rounded-full border-3 border-(--color-ink) bg-(--color-purple-900) px-6 py-2.5 text-sm font-bold text-(--color-cream) shadow-poster-sm transition-transform hover:-translate-y-0.5 cursor-pointer">
                Change my cookie settings
              </CookieSettingsButton>
            </div>
          </Section>

          <Section title="What cookies are">
            <p>
              Cookies are small text files a website saves in your browser. Some are needed for the site
              to work. Others help the people running it understand how it is used. They can be set by
              the site you are on, or by another company whose service the site uses.
            </p>
          </Section>

          <Section title="The cookies we use">
            <p>Every cookie this site can set, by name:</p>
            <div className="overflow-x-auto rounded-2xl border-3 border-(--color-ink) bg-(--color-paper) shadow-poster-sm">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="bg-(--color-cream)">
                  <tr className="border-b-2 border-(--color-ink)">
                    <th className="px-4 py-3 font-display font-bold">Name</th>
                    <th className="px-4 py-3 font-display font-bold">Provider</th>
                    <th className="px-4 py-3 font-display font-bold">What it does</th>
                    <th className="px-4 py-3 font-display font-bold">Kept for</th>
                    <th className="px-4 py-3 font-display font-bold">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {COOKIES.map((c) => (
                    <tr key={c.name} className="border-b border-(--color-ink)/10 last:border-0 align-top">
                      <td className="px-4 py-3 font-mono text-xs font-semibold whitespace-nowrap text-(--color-ink)">{c.name}</td>
                      <td className="px-4 py-3 whitespace-nowrap">{c.provider}</td>
                      <td className="px-4 py-3">{c.purpose}</td>
                      <td className="px-4 py-3 whitespace-nowrap">{c.duration}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex whitespace-nowrap rounded-full border-2 border-(--color-ink) px-2.5 py-0.5 text-[11px] font-bold ${
                            c.category === "Strictly necessary" ? "bg-(--color-green-100)" : "bg-(--color-purple-100)"
                          }`}
                        >
                          {c.category}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>
              <strong className="text-(--color-ink)">Strictly necessary</strong> cookies do not need your
              permission because the site depends on them. <strong className="text-(--color-ink)">Analytics</strong>{" "}
              cookies are off until you switch them on. Google Analytics is run by Google, which handles the
              data under its own{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noreferrer"
                className="font-bold text-(--color-purple-900) underline underline-offset-2"
              >
                privacy policy
              </a>
              .
            </p>
          </Section>

          <Section title="Links to other websites">
            <p>
              Our event registration forms, and our Instagram, LinkedIn and TikTok pages, live on other
              websites. Clicking through to them takes you to a site with its own cookies and its own
              policy. We do not control those, so it is worth checking theirs.
            </p>
          </Section>

          <Section title="Changing your mind">
            <p>
              You can change your choice at any time with the Cookie settings link at the bottom of every
              page. Switching analytics off stops it straight away and removes its cookies. Your choice is
              kept for {Math.round(CONSENT_MAX_AGE_DAYS / 30)} months, after which we ask again. We also ask
              again if the cookies we use ever change.
            </p>
            <p>
              You can also block or delete cookies in your browser settings. If you block every cookie, the
              site still works, but it will ask about cookies each time you visit.
            </p>
          </Section>

          <Section title="Your rights">
            <p>
              Hack The Loop, based in İstanbul, is responsible for the data this site collects. We handle it
              under Türkiye&apos;s Personal Data Protection Law (KVKK, Law No. 6698) and, for visitors in the
              European Union, the GDPR. Analytics cookies rely on your consent, and you can withdraw it as
              easily as you gave it.
            </p>
            <p>
              You can ask us what we hold about you, ask us to correct or delete it, or object to how it is
              used. Write to{" "}
              <a
                href={`mailto:${siteContent.email}`}
                className="font-bold text-(--color-purple-900) underline underline-offset-2"
              >
                {siteContent.email}
              </a>{" "}
              and we will reply.
            </p>
          </Section>

          <Section title="Changes to this policy">
            <p>
              If we change the cookies we use, we will update this page and the date at the top, and ask for
              your choice again.
            </p>
          </Section>
        </div>
      </div>
    </div>
  );
}
