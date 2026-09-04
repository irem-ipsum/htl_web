"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryPhoto } from "@/lib/data";

/**
 * Alt text is what a screen reader announces and what shows if the file fails
 * to load. Writing a real description in data.ts is always better, but a photo
 * added without one still has to render, so fall back rather than break.
 */
function altFor(photo: GalleryPhoto) {
  return photo.alt?.trim() || "Photo from a Hack The Loop event";
}

export default function MasonryGallery({ photos }: { photos: GalleryPhoto[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);
  const prev = useCallback(
    () => setActiveIndex((i) => (i === null ? null : (i - 1 + photos.length) % photos.length)),
    [photos.length]
  );
  const next = useCallback(
    () => setActiveIndex((i) => (i === null ? null : (i + 1) % photos.length)),
    [photos.length]
  );

  useEffect(() => {
    if (activeIndex === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [activeIndex, close, prev, next]);

  return (
    <>
      <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 [column-fill:balance]">
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            onClick={() => setActiveIndex(i)}
            className="group relative mb-4 block w-full overflow-hidden rounded-2xl border-3 border-(--color-ink) break-inside-avoid focus:outline-none focus:ring-4 focus:ring-(--color-purple-500)/40"
          >
            <Image
              src={photo.src}
              alt={altFor(photo)}
              width={800}
              height={1000}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <span className="absolute inset-0 bg-(--color-ink)/0 group-hover:bg-(--color-ink)/20 transition-colors" />
          </button>
        ))}
      </div>

      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-(--color-ink)/95 backdrop-blur-sm p-4 sm:p-10"
          role="dialog"
          aria-modal="true"
          onClick={close}
        >
          <button
            onClick={(e) => { e.stopPropagation(); close(); }}
            aria-label="Close"
            className="absolute top-5 right-5 h-11 w-11 rounded-full bg-(--color-cream)/10 text-(--color-cream) flex items-center justify-center hover:bg-(--color-cream)/20 transition-colors"
          >
            <X size={22} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Previous image"
            className="absolute left-3 sm:left-6 h-11 w-11 rounded-full bg-(--color-cream)/10 text-(--color-cream) flex items-center justify-center hover:bg-(--color-cream)/20 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>

          <div
            className="relative max-h-[85vh] max-w-4xl w-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              key={photos[activeIndex].src}
              src={photos[activeIndex].src}
              alt={altFor(photos[activeIndex])}
              width={1200}
              height={1500}
              className="max-h-[85vh] w-auto h-auto rounded-2xl object-contain animate-[fade_0.2s_ease]"
              priority
            />
            <span className="absolute -bottom-9 left-0 right-0 text-center text-(--color-cream)/60 text-xs font-semibold">
              {activeIndex + 1} / {photos.length}
            </span>
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Next image"
            className="absolute right-3 sm:right-6 h-11 w-11 rounded-full bg-(--color-cream)/10 text-(--color-cream) flex items-center justify-center hover:bg-(--color-cream)/20 transition-colors"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}
    </>
  );
}
