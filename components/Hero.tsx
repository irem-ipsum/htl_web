"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowDown, Sparkles } from "lucide-react";
import { siteContent } from "@/lib/data";

const WORDS = [
  "Visibility",
  "Solidarity",
  "Mentorship",
  "Game jams",
  "No gatekeeping",
  "Portfolios",
  "Game nights",
  "First commits",
  "Playtesting",
  "Narrative design",
  "Pixel art",
  "Sound design",
  "Level design",
  "Free to join",
  "Volunteer run",
  "Meetups",
  "Prototypes",
  "Showcases",
  "Peer review",
  "Room for beginners",
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-(--color-purple-900) text-(--color-cream) dots">
      {/* drifting shapes */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -top-24 -left-20 h-80 w-80 rounded-full bg-(--color-green-500)/25"
          animate={{ y: [0, 26, 0], x: [0, 14, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/4 -right-20 h-96 w-96 rounded-full bg-(--color-purple-500)/40"
          animate={{ y: [0, -30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-24 left-1/3 h-28 w-28 rounded-3xl border-4 border-(--color-green-300)/50"
          animate={{ rotate: [0, 18, -8, 0], y: [0, -18, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-32 right-1/3 h-16 w-16 rounded-full border-4 border-(--color-cream)/30"
          animate={{ y: [0, 22, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 pt-16 pb-14 sm:pt-24 sm:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full bg-(--color-green-500) text-(--color-ink) border-2 border-(--color-ink) px-4 py-1.5 text-xs sm:text-sm font-bold mb-8 shadow-poster-sm"
        >
          <motion.span
            animate={{ rotate: [0, 18, -18, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles size={14} />
          </motion.span>
          Free to join, no experience needed
        </motion.div>

        {/* headline, word by word */}
        <h1 className="font-display font-bold text-[14vw] leading-[0.92] sm:text-7xl md:text-8xl tracking-tight max-w-5xl">
          {["We're", "breaking"].map((w, i) => (
            <motion.span
              key={w}
              className="inline-block mr-[0.25em]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              {w}
            </motion.span>
          ))}
          <motion.span
            className="relative inline-block mr-[0.25em]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="relative z-10 text-(--color-ink) px-3">the loop</span>
            <motion.span
              className="absolute inset-0 bg-(--color-green-500) border-3 border-(--color-ink) rounded-xl origin-left"
              initial={{ scaleX: 0, rotate: 0 }}
              animate={{ scaleX: 1, rotate: -2 }}
              transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
          </motion.span>
          {["in", "games"].map((w, i) => (
            <motion.span
              key={w}
              className="inline-block mr-[0.25em]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.5 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              {w}
            </motion.span>
          ))}
          <motion.span
            className="inline-block"
            animate={{ y: [0, -14, 0], rotate: [0, 8, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            👾
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.62 }}
          className="mt-8 max-w-2xl text-lg sm:text-xl text-(--color-cream)/85 leading-relaxed"
        >
          {siteContent.missionShort} We run game jams, mentorship and talks, all of it free,
          all of it open to anyone who wants in.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.72 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Link
            href="/events"
            className="group inline-flex items-center gap-2 rounded-full bg-(--color-green-500) text-(--color-ink) border-3 border-(--color-ink) px-7 py-4 text-base font-bold shadow-poster transition-all hover:-translate-y-1 hover:shadow-[9px_9px_0_0_#171717] active:translate-y-0 active:shadow-poster-sm"
          >
            See what&apos;s on
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 rounded-full bg-(--color-cream) text-(--color-ink) border-3 border-(--color-ink) px-7 py-4 text-base font-bold shadow-poster transition-all hover:-translate-y-1 hover:shadow-[9px_9px_0_0_#171717]"
          >
            Who we are
          </Link>
        </motion.div>

        {/* scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="mt-14 hidden sm:flex items-center gap-2 text-sm font-bold text-(--color-cream)/60"
        >
          <motion.span
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown size={18} />
          </motion.span>
          Scroll for more
        </motion.div>
      </div>

      {/* marquee band */}
      <div className="relative border-y-3 border-(--color-ink) bg-(--color-cream) text-(--color-ink) py-3 overflow-hidden">
        {/* Exactly two copies of the list, sliding by half the track. The second
            copy lands where the first began, so the loop has no gap or jump. */}
        <div
          className="flex w-max whitespace-nowrap animate-marquee font-display font-bold text-2xl sm:text-3xl uppercase tracking-tight"
          style={{ animationDuration: "70s" }}
        >
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0" aria-hidden={copy === 1}>
              {WORDS.map((w) => (
                <span key={w} className="flex items-center shrink-0">
                  <span className="mx-6">{w}</span>
                  <span className="text-(--color-purple-700)">◆</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
