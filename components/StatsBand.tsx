"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

type Stat = { value: number; suffix?: string; label: string };

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const duration = reduced ? 1 : 1100;
    let start: number | null = null;
    const step = (t: number) => {
      if (start === null) start = t;
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

export default function StatsBand({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
      {stats.map((s, i) => (
        <div
          key={s.label}
          className={`rounded-3xl border-3 border-(--color-ink) p-6 text-center shadow-poster-sm transition-transform duration-300 hover:-translate-y-1.5 ${
            i % 2 === 0 ? "bg-(--color-purple-100)" : "bg-(--color-green-100)"
          }`}
        >
          <div className="font-display text-4xl sm:text-5xl font-bold text-(--color-ink)">
            <Counter to={s.value} suffix={s.suffix} />
          </div>
          <div className="mt-2 text-xs sm:text-sm font-bold uppercase tracking-wide text-(--color-ink)/60">
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}
