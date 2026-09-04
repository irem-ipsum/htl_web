import type { Metadata } from "next";
import EventsList from "@/components/EventsList";
import SectionHeader from "@/components/SectionHeader";
import HeroBanner from "@/components/HeroBanner";
import { upcomingEvents, pastEvents } from "@/lib/data";

export const metadata: Metadata = {
  title: "Events | Hack The Loop",
  description: "Past and upcoming Hack The Loop events: game jams, workshops, talks and meetups.",
};

export default function EventsPage() {
  return (
    <div>
      <HeroBanner theme="events" className="bg-(--color-purple-100)">
        <SectionHeader
          as="h1"
          eyebrow="Calendar"
          title="Events"
          description="Game jams, workshops, talks and meetups. All free, and spots do run out."
          accent="green"
          bottomSpace={false}
        />
      </HeroBanner>

      <section className="dots bg-(--color-paper) py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <EventsList upcoming={upcomingEvents} past={pastEvents} />
        </div>
      </section>
    </div>
  );
}
