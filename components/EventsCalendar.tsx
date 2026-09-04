"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { EventItem } from "@/lib/data";

const DAY_LABELS = ["M", "T", "W", "T", "F", "S", "S"];
const MONTH_LABELS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function toISODate(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/**
 * "Today" is resolved on the client only. The server runs in UTC while the
 * visitor's browser runs in their own timezone, so computing it during render
 * would highlight a different cell on each side and break hydration for anyone
 * loading the page in the hours where those two dates disagree.
 */
function useToday(): string | null {
  return useSyncExternalStore(
    () => () => {},
    () => toISODate(new Date()),
    () => null
  );
}

export default function EventsCalendar({ events }: { events: EventItem[] }) {
  const today = useToday();
  const [cursor, setCursor] = useState(() => {
    const upcoming = events.find((e) => e.status === "upcoming");
    const base = upcoming ? new Date(upcoming.date) : new Date();
    return new Date(base.getFullYear(), base.getMonth(), 1);
  });

  const eventsByDate = useMemo(() => {
    const map = new Map<string, EventItem[]>();
    for (const e of events) {
      const start = new Date(e.date);
      const end = e.endDate ? new Date(e.endDate) : start;
      const d = new Date(start);
      while (d <= end) {
        const key = toISODate(d);
        map.set(key, [...(map.get(key) ?? []), e]);
        d.setDate(d.getDate() + 1);
      }
    }
    return map;
  }, [events]);

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const startOffset = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (Date | null)[] = [
    ...Array.from({ length: startOffset }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1)),
  ];

  return (
    // capped so the cells stay compact when the row stacks on smaller screens
    <div className="w-full max-w-[340px] mx-auto lg:mx-0 h-full rounded-2xl border-3 border-(--color-ink) bg-(--color-paper) p-4 shadow-poster-sm">
      <div className="flex items-center justify-between gap-2 mb-3">
        <h3 className="font-display text-sm font-bold truncate">
          {MONTH_LABELS[month]} {year}
        </h3>
        <div className="flex gap-1 shrink-0">
          <button
            aria-label="Previous month"
            onClick={() => setCursor(new Date(year, month - 1, 1))}
            className="h-7 w-7 rounded-full border-2 border-(--color-ink) flex items-center justify-center hover:bg-(--color-purple-100) transition-colors"
          >
            <ChevronLeft size={12} />
          </button>
          <button
            aria-label="Next month"
            onClick={() => setCursor(new Date(year, month + 1, 1))}
            className="h-7 w-7 rounded-full border-2 border-(--color-ink) flex items-center justify-center hover:bg-(--color-purple-100) transition-colors"
          >
            <ChevronRight size={12} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-(--color-ink)/45 mb-1">
        {DAY_LABELS.map((d, i) => (
          <span key={i}>{d}</span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((date, i) => {
          if (!date) return <div key={`empty-${i}`} />;
          const key = toISODate(date);
          const dayEvents = eventsByDate.get(key);
          const isToday = today !== null && key === today;
          const content = (
            <div
              className={`aspect-square rounded-md flex items-center justify-center text-[11px] font-bold transition-transform ${
                dayEvents
                  ? dayEvents[0].status === "upcoming"
                    ? "bg-(--color-green-500) border border-(--color-ink) hover:scale-110"
                    : "bg-(--color-purple-300) border border-(--color-ink) hover:scale-110"
                  : isToday
                  ? "bg-(--color-cream) border border-(--color-ink)"
                  : "text-(--color-ink)/55"
              }`}
            >
              {date.getDate()}
            </div>
          );
          return dayEvents ? (
            <Link key={key} href={`/events/${dayEvents[0].slug}`} title={dayEvents.map((e) => e.title).join(", ")}>
              {content}
            </Link>
          ) : (
            <div key={key}>{content}</div>
          );
        })}
      </div>

      <div className="mt-3 flex flex-wrap gap-3 text-[10px] font-bold text-(--color-ink)/55">
        <span className="inline-flex items-center gap-1">
          <span className="h-2.5 w-2.5 rounded-full bg-(--color-green-500) border border-(--color-ink)" /> Upcoming
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="h-2.5 w-2.5 rounded-full bg-(--color-purple-300) border border-(--color-ink)" /> Past
        </span>
      </div>
    </div>
  );
}
