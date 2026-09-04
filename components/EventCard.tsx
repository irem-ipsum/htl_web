import Link from "next/link";
import Image from "next/image";
import { CalendarDays, MapPin, ArrowUpRight } from "lucide-react";
import type { EventItem } from "@/lib/data";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatDate(iso: string) {
  const d = new Date(iso);
  return { day: d.getDate(), month: MONTHS[d.getMonth()], year: d.getFullYear() };
}

export default function EventCard({ event }: { event: EventItem }) {
  const { day, month, year } = formatDate(event.date);
  const isPast = event.status === "past";

  return (
    <Link
      href={`/events/${event.slug}`}
      className="group relative h-full flex flex-col overflow-hidden rounded-3xl border-3 border-(--color-ink) bg-(--color-paper) shadow-poster transition-all hover:-translate-y-1.5 hover:shadow-[9px_9px_0_0_#171717]"
    >
      <div className="relative h-48 w-full overflow-hidden border-b-3 border-(--color-ink)">
        <Image
          src={event.cover}
          alt={event.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3 flex flex-col items-center justify-center rounded-xl bg-(--color-cream) border-2 border-(--color-ink) px-3 py-1.5">
          <span className="font-display text-xl font-bold leading-none">{day}</span>
          <span className="text-[10px] font-bold uppercase tracking-wide">{month} {year}</span>
        </div>
        <span
          className={`absolute top-3 right-3 rounded-full border-2 border-(--color-ink) px-3 py-1 text-xs font-bold ${
            isPast
              ? "bg-(--color-purple-300) text-(--color-ink)"
              : "bg-(--color-green-500) text-(--color-ink)"
          }`}
        >
          {isPast ? "Past" : "Upcoming"}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <span className="text-xs font-bold uppercase tracking-wide text-(--color-purple-700)">
          {event.category}
        </span>
        <h3 className="mt-1.5 font-display text-xl font-bold leading-snug">{event.title}</h3>
        <p className="mt-2 text-sm text-(--color-ink)/70 leading-relaxed line-clamp-2">
          {event.summary}
        </p>

        <div className="mt-4 flex flex-col gap-1.5 text-xs font-medium text-(--color-ink)/60">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays size={14} /> {event.time}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin size={14} /> {event.location}
          </span>
        </div>

        <div className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-(--color-purple-900) group-hover:gap-2 transition-all">
          {isPast ? "Read the recap" : "Details and sign up"}
          <ArrowUpRight size={16} />
        </div>
      </div>
    </Link>
  );
}
