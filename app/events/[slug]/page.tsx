import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CalendarDays,
  MapPin,
  Users,
  ArrowLeft,
  ExternalLink,
  Handshake,
  Trophy,
  Image as ImageIcon,
  Link as LinkIcon,
} from "lucide-react";
import { ItchIcon, InstagramIcon } from "@/components/SocialIcons";
import ShareButton from "@/components/ShareButton";
import { events } from "@/lib/data";

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);
  if (!event) return {};
  return {
    title: `${event.title} | Hack The Loop`,
    description: event.summary,
  };
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function formatDate(iso: string) {
  const d = new Date(iso);
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);
  if (!event) notFound();

  const isPast = event.status === "past";
  const dateLabel = event.endDate
    ? `${formatDate(event.date)} to ${formatDate(event.endDate)}`
    : formatDate(event.date);

  return (
    <div>
      {/* Cover */}
      <section className="relative h-[46vh] min-h-[320px] w-full overflow-hidden border-b-3 border-(--color-ink)">
        <Image src={event.cover} alt={event.title} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-(--color-ink)/90 via-(--color-ink)/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-5xl px-5 sm:px-8 pb-8">
            <Link
              href="/events"
              className="inline-flex items-center gap-1.5 text-(--color-cream)/85 text-sm font-bold mb-4 hover:text-(--color-cream)"
            >
              <ArrowLeft size={16} /> All events
            </Link>
            <div className="mb-3">
              <span
                className={`inline-flex rounded-full border-2 border-(--color-ink) px-3 py-1 text-xs font-bold ${
                  isPast ? "bg-(--color-purple-300)" : "bg-(--color-green-500)"
                }`}
              >
                {isPast ? "Past event" : "Upcoming"}
              </span>
            </div>
            <h1 className="font-display text-3xl sm:text-5xl font-bold text-(--color-cream) leading-tight max-w-3xl">
              {event.title}
            </h1>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-5 sm:px-8 py-12 grid gap-10 lg:grid-cols-[1fr_280px]">
        <div>
          <p className="text-lg leading-relaxed text-(--color-ink)/80">{event.description}</p>

          {isPast ? (
            <>
              {event.recapSummary && (
                <div className="mt-8 rounded-2xl border-3 border-(--color-ink) bg-(--color-purple-100) p-6 shadow-poster-sm">
                  <h2 className="font-display text-lg font-bold mb-2">How it went</h2>
                  <p className="text-(--color-ink)/75 leading-relaxed">{event.recapSummary}</p>
                </div>
              )}
              {event.recapPhotos && event.recapPhotos.length > 0 && (
                <div className="mt-10">
                  <h2 className="font-display text-xl font-bold mb-5">Photos from the day</h2>
                  <div className="columns-2 sm:columns-3 gap-3 [column-fill:balance]">
                    {event.recapPhotos.map((src) => (
                      <div key={src} className="mb-3 overflow-hidden rounded-xl border-3 border-(--color-ink) break-inside-avoid">
                        <Image src={src} alt={event.title} width={600} height={800} className="w-full h-auto object-cover" />
                      </div>
                    ))}
                  </div>
                  <Link
                    href="/gallery"
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-(--color-purple-900) hover:gap-2.5 transition-all"
                  >
                    See the full gallery <ExternalLink size={14} />
                  </Link>
                </div>
              )}
            </>
          ) : (
            <div className="mt-10 rounded-3xl border-3 border-(--color-ink) bg-(--color-green-100) p-8 text-center shadow-poster">
              <h2 className="font-display text-2xl sm:text-3xl font-bold mb-2">Come along</h2>
              <p className="text-(--color-ink)/70 max-w-md mx-auto mb-6">
                Free, open to every level, and limited on space. Grab your spot now.
              </p>
              <a
                href={event.joinUrl ?? "#"}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-(--color-green-700) text-(--color-cream) border-3 border-(--color-ink) px-8 py-4 text-base font-bold shadow-poster transition-transform hover:-translate-y-1"
              >
                Join this event <ExternalLink size={18} />
              </a>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="lg:sticky lg:top-28 h-fit rounded-2xl border-3 border-(--color-ink) bg-(--color-cream) p-6 shadow-poster-sm">
          <span className="inline-flex rounded-full border-2 border-(--color-ink) bg-(--color-purple-500) text-(--color-cream) px-3.5 py-1 text-xs font-bold uppercase tracking-widest">
            {event.category}
          </span>
          <h3 className="mt-4 font-display font-bold mb-4">The details</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex gap-3">
              <CalendarDays size={18} className="text-(--color-purple-900) shrink-0 mt-0.5" />
              <div>
                <div className="font-bold">{dateLabel}</div>
                <div className="text-(--color-ink)/60">{event.time}</div>
              </div>
            </li>
            <li className="flex gap-3">
              <MapPin size={18} className="text-(--color-purple-900) shrink-0 mt-0.5" />
              <div className="font-medium">{event.location}</div>
            </li>
            {event.attendeeCount && (
              <li className="flex gap-3">
                <Users size={18} className="text-(--color-purple-900) shrink-0 mt-0.5" />
                <div className="font-medium">{event.attendeeCount} people came</div>
              </li>
            )}
          </ul>
          {/* Sponsors, always shown so every event has the slot */}
          <div className="mt-6 pt-6 border-t-2 border-(--color-ink)/15">
            <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-(--color-ink)/50">
              <Handshake size={13} /> Sponsors
            </span>
            {event.sponsors && event.sponsors.length > 0 ? (
              <ul className="mt-3 grid grid-cols-2 gap-2.5">
                {event.sponsors.map((s) => {
                  // A logo renders as an image tile; without one we fall back to the name.
                  const inner = s.logo ? (
                    <span className="flex h-14 w-full items-center justify-center rounded-xl border-2 border-(--color-ink) bg-(--color-paper) p-2">
                      <Image
                        src={s.logo}
                        alt={s.name}
                        width={220}
                        height={88}
                        className="max-h-full w-auto object-contain"
                      />
                    </span>
                  ) : (
                    <span className="flex h-14 w-full items-center justify-center rounded-xl border-2 border-(--color-ink) bg-(--color-purple-100) px-2 text-center text-xs font-bold leading-tight">
                      {s.name}
                    </span>
                  );

                  return (
                    <li key={s.name}>
                      {s.url ? (
                        <a
                          href={s.url}
                          target="_blank"
                          rel="noreferrer"
                          title={`${s.name} (opens their website)`}
                          className="group block transition-transform duration-300 hover:-translate-y-1"
                        >
                          {inner}
                        </a>
                      ) : (
                        inner
                      )}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="mt-1.5 text-sm text-(--color-ink)/45">To be announced</p>
            )}
          </div>

          {/* Outcomes, for events that have already happened */}
          {isPast && (
            <div className="mt-5 pt-5 border-t-2 border-(--color-ink)/15">
              <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-(--color-ink)/50">
                <Trophy size={13} /> Outcomes
              </span>
              {event.outcomes && event.outcomes.length > 0 ? (
                <ul className="mt-2.5 space-y-2">
                  {event.outcomes.map((o) => {
                    const external = o.url.startsWith("http");
                    // Each kind gets its own mark so the list reads at a glance.
                    const Icon =
                      o.kind === "photos"
                        ? ImageIcon
                        : o.kind === "itch"
                        ? ItchIcon
                        : o.kind === "instagram"
                        ? InstagramIcon
                        : LinkIcon;
                    return (
                      <li key={o.url}>
                        <a
                          href={o.url}
                          {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                          className="group flex items-start gap-2 text-sm font-bold text-(--color-purple-900) hover:gap-2.5 transition-all"
                        >
                          <Icon width={15} height={15} className="shrink-0 mt-0.5" />
                          <span className="underline underline-offset-4 decoration-2 decoration-(--color-purple-900)/30 group-hover:decoration-(--color-purple-900)">
                            {o.label}
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="mt-1.5 text-sm text-(--color-ink)/45">Nothing published yet</p>
              )}
            </div>
          )}

          {!isPast && <ShareButton />}
        </aside>
      </div>
    </div>
  );
}
