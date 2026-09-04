import Link from "next/link";
import { ArrowRight, Gamepad2, Users, Mic, PartyPopper } from "lucide-react";
import Hero from "@/components/Hero";
import EventCard from "@/components/EventCard";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";
import StatsBand from "@/components/StatsBand";
import { siteContent, upcomingEvents, industry, milestones } from "@/lib/data";

const ICONS = [Gamepad2, Mic, Users, PartyPopper];

export default function Home() {
  const preview = upcomingEvents.slice(0, 3);

  return (
    <>
      <Hero />

      {/* What we have built so far */}
      <section className="dots bg-(--color-paper) border-b-3 border-(--color-ink) py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <StatsBand stats={milestones} />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-center text-sm font-semibold text-(--color-ink)/55">
              Our first 18 months. All volunteer run, no membership fee, no advertising.
            </p>
          </Reveal>
        </div>
      </section>

      {/* The gap in the industry */}
      <section className="dots bg-(--color-green-900) text-(--color-cream) border-b-3 border-(--color-ink) py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeader
            eyebrow="Why we exist"
            title={industry.headline}
            description={industry.intro}
            align="left"
            tone="onDark"
            accent="cream"
          />

          <div className="grid gap-5 sm:grid-cols-3">
            {industry.figures.map((f, i) => (
              <Reveal key={f.value} delay={i * 0.1} className="h-full">
                <div
                  className={`h-full rounded-3xl border-3 border-(--color-ink) p-7 shadow-poster text-(--color-ink) transition-transform duration-300 hover:-translate-y-2 ${
                    i === 2 ? "bg-(--color-purple-100)" : "bg-(--color-cream)"
                  }`}
                >
                  <div className="font-display text-5xl sm:text-6xl font-bold leading-none">
                    {f.value}
                  </div>
                  <p className="mt-4 text-base font-medium leading-relaxed text-(--color-ink)/75">
                    {f.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-(--color-cream)/60">
                Source: {industry.source}
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 font-bold text-(--color-cream) hover:gap-3 transition-all"
              >
                How we got started <ArrowRight size={18} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="dots bg-(--color-paper) py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeader eyebrow="What we hold to" title="Four things we do not bend on" accent="green" />
          <div className="grid gap-4 sm:grid-cols-2">
            {siteContent.values.map((v, i) => (
              <Reveal key={i} delay={i * 0.08} className="h-full">
                <div
                  className={`h-full flex gap-4 rounded-2xl border-3 border-(--color-ink) p-5 shadow-poster-sm transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-poster ${
                    i % 2 === 0 ? "bg-(--color-purple-100)" : "bg-(--color-green-100)"
                  }`}
                >
                  <span className="font-display text-2xl font-bold shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-base font-medium leading-relaxed pt-0.5">{v}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Activities */}
      <section className="dots bg-(--color-purple-900) text-(--color-cream) border-y-3 border-(--color-ink) py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeader
            eyebrow="What we do"
            title="Four ways in"
            description="No membership fee, no application, no experience bar. Turn up and you're in."
            tone="onDark"
            accent="green"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {siteContent.activities.map((a, i) => {
              const Icon = ICONS[i % ICONS.length];
              const bg = i % 2 === 0 ? "bg-(--color-cream)" : "bg-(--color-green-100)";
              return (
                <Reveal key={a.title} delay={i * 0.09} className="h-full">
                  <div
                    className={`group h-full rounded-3xl border-3 border-(--color-ink) ${bg} text-(--color-ink) p-6 shadow-poster transition-transform duration-300 hover:-translate-y-2`}
                  >
                    <div className="h-12 w-12 rounded-2xl bg-(--color-purple-500) border-2 border-(--color-ink) flex items-center justify-center mb-5 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
                      <Icon size={22} className="text-(--color-ink)" />
                    </div>
                    <h3 className="font-display text-lg font-bold">{a.title}</h3>
                    <p className="mt-2 text-sm text-(--color-ink)/75 leading-relaxed">{a.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Upcoming events */}
      <section className="dots bg-(--color-cream) border-b-3 border-(--color-ink) py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeader
            eyebrow="Calendar"
            title="Coming up next"
            align="left"
            accent="purple"
            action={
              <Link
                href="/events"
                className="inline-flex items-center gap-2 font-bold text-(--color-purple-900) hover:gap-3 transition-all"
              >
                All events <ArrowRight size={18} />
              </Link>
            }
          />
          {preview.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {preview.map((e, i) => (
                <Reveal key={e.slug} delay={i * 0.1} className="h-full">
                  <EventCard event={e} />
                </Reveal>
              ))}
            </div>
          ) : (
            <p className="text-(--color-ink)/60">Nothing on the calendar right now. Check back soon.</p>
          )}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="dots bg-(--color-ink) text-(--color-cream) py-24">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <SectionHeader
            eyebrow="Get involved"
            title="Ready to break the cycle with us?"
            description="Contact us! Come to the next event, or help us run one."
            tone="onDark"
            accent="green"
          />
          <Reveal delay={0.1}>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href={siteContent.volunteerUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-(--color-green-500) text-(--color-ink) border-3 border-(--color-cream) px-8 py-4 text-base font-bold shadow-poster-light transition-transform hover:-translate-y-1"
              >
                Become a volunteer <ArrowRight size={18} />
              </a>
              <Link
                href="/events"
                className="inline-flex items-center gap-2 rounded-full border-3 border-(--color-cream) px-8 py-4 text-base font-bold transition-colors hover:bg-(--color-cream) hover:text-(--color-ink)"
              >
                See the calendar
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
