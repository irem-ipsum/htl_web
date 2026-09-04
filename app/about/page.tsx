import type { Metadata } from "next";
import { ArrowRight, MapPin, Sparkles, HandHeart } from "lucide-react";
import ProfileCard from "@/components/ProfileCard";
import SectionHeader from "@/components/SectionHeader";
import HeroBanner from "@/components/HeroBanner";
import Reveal from "@/components/Reveal";
import StatsBand from "@/components/StatsBand";
import { siteContent, team, story, milestones } from "@/lib/data";

export const metadata: Metadata = {
  title: "About | Hack The Loop",
  description:
    "How Hack The Loop started in İstanbul in November 2024, what we have run since, and the people behind it.",
};

export default function AboutPage() {
  const coreTeam = team.filter((t) => t.kind === "team");
  const volunteers = team.filter((t) => t.kind === "volunteer");

  return (
    <div>
      {/* Intro */}
      <HeroBanner theme="about" className="bg-(--color-purple-900) text-(--color-cream)">
        <SectionHeader
          as="h1"
          eyebrow="About us"
          title="We are here to break a cycle."
          description={siteContent.mission}
          tone="onDark"
          accent="green"
          bottomSpace={false}
        />
      </HeroBanner>

      {/* Who we are */}
      <section className="dots bg-(--color-paper) py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeader
            eyebrow="Who we are"
            title="Nobody opened the door, so we opened it ourselves"
            align="left"
            accent="purple"
          />

          <div className="grid gap-6 lg:grid-cols-3">
            {[
              { icon: MapPin, label: "How it started", text: story.founded, bg: "bg-(--color-purple-100)" },
              { icon: Sparkles, label: "What we build", text: story.what, bg: "bg-(--color-green-100)" },
              { icon: HandHeart, label: "How it runs", text: story.how, bg: "bg-(--color-cream)" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.label} delay={i * 0.09}>
                  <div
                    className={`h-full rounded-3xl border-3 border-(--color-ink) ${item.bg} p-6 shadow-poster-sm transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-poster`}
                  >
                    <div className="h-11 w-11 rounded-2xl bg-(--color-purple-500) border-2 border-(--color-ink) flex items-center justify-center mb-4">
                      <Icon size={20} className="text-(--color-ink)" />
                    </div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-(--color-purple-900)">
                      {item.label}
                    </h3>
                    <p className="mt-2 text-base leading-relaxed text-(--color-ink)/80">{item.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* The numbers */}
      <section className="dots bg-(--color-green-900) text-(--color-cream) border-y-3 border-(--color-ink) py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeader
            eyebrow="Since November 2024"
            title="Eighteen months, counted honestly"
            tone="onDark"
            accent="cream"
          />
          <Reveal>
            <StatsBand stats={milestones} />
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="dots bg-(--color-paper) py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <SectionHeader eyebrow="Our values" title="What we hold to" accent="purple" />
          <div className="grid gap-4 sm:grid-cols-2">
            {siteContent.values.map((v, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div
                  className={`h-full rounded-2xl border-3 border-(--color-ink) p-6 flex gap-4 shadow-poster-sm transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-poster ${
                    i % 2 === 0 ? "bg-(--color-green-100)" : "bg-(--color-purple-100)"
                  }`}
                >
                  <span className="font-display text-3xl font-bold shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-base font-medium leading-relaxed pt-1">{v}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="dots bg-(--color-cream) border-y-3 border-(--color-ink) py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeader eyebrow="The team" title="Who runs this" accent="purple" />
          {/* Same four column grid as the volunteers below, so the cards match. */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {coreTeam.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.07} className="h-full">
                <ProfileCard person={p} accent="purple" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteers */}
      <section className="dots bg-(--color-purple-900) text-(--color-cream) py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeader
            eyebrow="Volunteers"
            title="The people who make the days happen"
            tone="onDark"
            accent="cream"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {volunteers.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.07} className="h-full">
                <ProfileCard person={p} accent="green" />
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.15}>
            <div className="mt-12 text-center">
              <a
                href={siteContent.volunteerUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-(--color-green-500) text-(--color-ink) border-3 border-(--color-cream) px-7 py-4 text-base font-bold shadow-poster-light transition-transform hover:-translate-y-1"
              >
                Join them <ArrowRight size={18} />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
