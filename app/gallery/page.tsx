import type { Metadata } from "next";
import MasonryGallery from "@/components/MasonryGallery";
import SectionHeader from "@/components/SectionHeader";
import HeroBanner from "@/components/HeroBanner";
import { gallery } from "@/lib/data";

export const metadata: Metadata = {
  title: "Gallery | Hack The Loop",
  description: "Photos from Hack The Loop jams, talks, workshops and meetups.",
};

export default function GalleryPage() {
  return (
    <div>
      <HeroBanner theme="gallery" className="bg-(--color-green-100)">
        <SectionHeader
          as="h1"
          eyebrow="Gallery"
          title="Moments from the room"
          description="Jams, talks, workshops and the evenings in between."
          accent="purple"
          bottomSpace={false}
        />
      </HeroBanner>

      <section className="dots bg-(--color-paper) py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <MasonryGallery photos={gallery} />
        </div>
      </section>
    </div>
  );
}
