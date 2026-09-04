"use client";

import { useState } from "react";
import Link from "next/link";
import { CalendarDays, MapPin, ArrowRight, MousePointerClick } from "lucide-react";
import EventCard from "@/components/EventCard";
import EventsCalendar from "@/components/EventsCalendar";
import Reveal from "@/components/Reveal";
import type { EventItem } from "@/lib/data";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatDate(iso: string) {
  const d = new Date(iso);
  return { day: d.getDate(), month: MONTHS[d.getMonth()], year: d.getFullYear() };
}

export default function EventsList({
  upcoming,
  past,
}: {
  upcoming: EventItem[];
  past: EventItem[];
}) {
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  const list = tab === "upcoming" ? upcoming : past;
  const next = upcoming[0];

  return (
    <div>
      {/* calendar + next-up panel fill the row together */}
      <div className="mb-14 grid gap-6 lg:grid-cols-[320px_1fr] items-stretch">
        <Reveal className="h-full">
          <EventsCalendar events={[...upcoming, ...past]} />
        </Reveal>

        <Reveal delay={0.1} className="h-full">
          <div className="h-full flex flex-col justify-between gap-6 rounded-2xl border-3 border-(--color-ink) bg-(--color-cream) p-6 sm:p-7 shadow-poster-sm">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-(--color-purple-500) text-(--color-cream) border-2 border-(--color-ink) px-3 py-1 text-[11px] font-bold uppercase tracking-widest">
                <MousePointerClick size={12} /> Tap a highlighted day
              </span>

              {next ? (
                <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-5">
                  <div className="shrink-0 flex flex-col items-center justify-center rounded-xl bg-(--color-green-500) border-3 border-(--color-ink) px-4 py-2.5 w-20">
                    <span className="font-display text-2xl font-bold leading-none">
                      {formatDate(next.date).day}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wide">
                      {formatDate(next.date).month} {formatDate(next.date).year}
                    </span>
                  </div>

                  <div className="min-w-0">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-(--color-purple-900)">
                      Next up · {next.category}
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl font-bold leading-snug mt-0.5">
                      {next.title}
                    </h3>
                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs font-medium text-(--color-ink)/65">
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarDays size={13} /> {next.time}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin size={13} /> {next.location}
                      </span>
                    </div>
                    <Link
                      href={`/events/${next.slug}`}
                      className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-(--color-purple-900) hover:gap-3 transition-all"
                    >
                      Details and sign up <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              ) : (
                <p className="mt-5 text-(--color-ink)/70">
                  Nothing scheduled yet. Follow us and you&apos;ll hear about the next one first.
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-5 border-t-2 border-(--color-ink)/15">
              <span className="text-xs font-bold uppercase tracking-widest text-(--color-ink)/50 mr-1">
                Browse
              </span>
              <div className="inline-flex rounded-full border-3 border-(--color-ink) p-1 bg-(--color-paper)">
                <button
                  onClick={() => setTab("upcoming")}
                  className={`px-5 py-2 rounded-full text-sm font-bold transition-colors ${
                    tab === "upcoming" ? "bg-(--color-green-500)" : "text-(--color-ink)/60"
                  }`}
                >
                  Upcoming ({upcoming.length})
                </button>
                <button
                  onClick={() => setTab("past")}
                  className={`px-5 py-2 rounded-full text-sm font-bold transition-colors ${
                    tab === "past" ? "bg-(--color-purple-500) text-(--color-cream)" : "text-(--color-ink)/60"
                  }`}
                >
                  Past ({past.length})
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {list.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((e, i) => (
            <Reveal key={e.slug} delay={i * 0.08} className="h-full">
              <EventCard event={e} />
            </Reveal>
          ))}
        </div>
      ) : (
        <p className="text-center text-(--color-ink)/60">
          {tab === "upcoming" ? "Nothing scheduled right now." : "No past events yet."}
        </p>
      )}
    </div>
  );
}
