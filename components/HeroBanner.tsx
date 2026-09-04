"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

export type BannerTheme = "events" | "gallery" | "about" | "contact";

type Motif = { x: string; y: string; scale: number; rotate: number; delay: number };

const LAYOUT: Motif[] = [
  { x: "5%", y: "18%", scale: 1, rotate: -12, delay: 0 },
  { x: "16%", y: "64%", scale: 0.75, rotate: 9, delay: 0.7 },
  { x: "30%", y: "12%", scale: 0.6, rotate: 16, delay: 1.4 },
  { x: "68%", y: "70%", scale: 0.7, rotate: -8, delay: 0.4 },
  { x: "82%", y: "16%", scale: 0.95, rotate: 11, delay: 1.1 },
  { x: "92%", y: "58%", scale: 0.65, rotate: -15, delay: 1.9 },
];

function DateCard() {
  return (
    <svg width="74" height="76" viewBox="0 0 74 76" fill="none">
      <rect x="4" y="12" width="66" height="60" rx="10" fill="#FEF2E0" stroke="#171717" strokeWidth="5" />
      <path d="M4 30 H70" stroke="#171717" strokeWidth="5" />
      <rect x="4" y="12" width="66" height="18" rx="9" fill="#AE62A4" stroke="#171717" strokeWidth="5" />
      <rect x="18" y="2" width="9" height="18" rx="4.5" fill="#171717" />
      <rect x="47" y="2" width="9" height="18" rx="4.5" fill="#171717" />
      <rect x="16" y="40" width="16" height="14" rx="4" fill="#62AE6C" />
      <rect x="42" y="40" width="16" height="14" rx="4" fill="#D7A2CA" />
      <rect x="16" y="58" width="16" height="8" rx="3" fill="#D7A2CA" />
    </svg>
  );
}

function PhotoFrame() {
  return (
    <svg width="76" height="84" viewBox="0 0 76 84" fill="none">
      <rect x="4" y="4" width="68" height="76" rx="8" fill="#FEF2E0" stroke="#171717" strokeWidth="5" />
      <rect x="13" y="13" width="50" height="42" rx="5" fill="#A2D7AF" stroke="#171717" strokeWidth="4" />
      <circle cx="27" cy="27" r="6" fill="#FEF2E0" stroke="#171717" strokeWidth="3" />
      <path d="M15 50 L31 34 L44 46 L52 39 L61 50" stroke="#171717" strokeWidth="4" fill="none" strokeLinejoin="round" />
      <rect x="15" y="63" width="32" height="7" rx="3.5" fill="#D7A2CA" />
    </svg>
  );
}

function ControllerBlob() {
  return (
    <svg width="82" height="60" viewBox="0 0 82 60" fill="none">
      <rect x="4" y="12" width="74" height="42" rx="20" fill="#C5E9D0" stroke="#171717" strokeWidth="5" />
      <path d="M22 25 V41 M14 33 H30" stroke="#171717" strokeWidth="5" strokeLinecap="round" />
      <circle cx="55" cy="28" r="6" fill="#AE62A4" stroke="#171717" strokeWidth="4" />
      <circle cx="66" cy="39" r="6" fill="#FEF2E0" stroke="#171717" strokeWidth="4" />
    </svg>
  );
}

function EnvelopeMotif() {
  return (
    <svg width="76" height="56" viewBox="0 0 76 56" fill="none">
      <rect x="4" y="4" width="68" height="48" rx="7" fill="#FEF2E0" stroke="#171717" strokeWidth="5" />
      <path d="M9 11 L38 34 L67 11" stroke="#171717" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const MOTIFS: Record<BannerTheme, () => ReactNode> = {
  events: DateCard,
  gallery: PhotoFrame,
  about: ControllerBlob,
  contact: EnvelopeMotif,
};

export default function HeroBanner({
  theme,
  className = "",
  children,
}: {
  theme: BannerTheme;
  className?: string;
  children: ReactNode;
}) {
  const Motif = MOTIFS[theme];

  return (
    <section className={`dots relative overflow-hidden border-b-3 border-(--color-ink) py-16 sm:py-20 ${className}`}>
      {/* drifting thematic motifs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden sm:block">
        {LAYOUT.map((m, i) => (
          <motion.div
            key={i}
            className="absolute opacity-70"
            style={{ left: m.x, top: m.y, scale: m.scale }}
            initial={{ rotate: m.rotate }}
            animate={{
              y: [0, i % 2 === 0 ? -18 : 16, 0],
              rotate: [m.rotate, m.rotate + (i % 2 === 0 ? 10 : -10), m.rotate],
            }}
            transition={{
              duration: 7 + i * 0.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: m.delay,
            }}
          >
            <Motif />
          </motion.div>
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">{children}</div>
    </section>
  );
}
