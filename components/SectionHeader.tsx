import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";

type Tone = "onLight" | "onDark";
type Accent = "purple" | "green" | "cream";

const PILL: Record<Accent, string> = {
  purple: "bg-(--color-purple-500) text-(--color-cream)",
  green: "bg-(--color-green-500) text-(--color-ink)",
  cream: "bg-(--color-cream) text-(--color-ink)",
};

/**
 * One header shape for every section on the site:
 * eyebrow pill, then heading, then optional description.
 * Only the colors change from section to section.
 */
export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "onLight",
  accent = "purple",
  action,
  as = "h2",
  bottomSpace = true,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  tone?: Tone;
  accent?: Accent;
  action?: ReactNode;
  as?: "h1" | "h2";
  bottomSpace?: boolean;
}) {
  const Heading = as;
  const centered = align === "center";
  const bodyColor = tone === "onDark" ? "text-(--color-cream)/80" : "text-(--color-ink)/70";

  return (
    <div
      className={`${bottomSpace ? "mb-12" : ""} flex flex-col gap-5 ${
        centered
          ? "items-center text-center"
          : action
          ? "sm:flex-row sm:items-end sm:justify-between"
          : "items-start"
      }`}
    >
      <Reveal className={centered ? "flex flex-col items-center" : ""}>
        <span
          className={`inline-block rounded-full border-2 border-(--color-ink) px-4 py-1.5 text-xs font-bold uppercase tracking-widest ${PILL[accent]}`}
        >
          {eyebrow}
        </span>
        <Heading
          className={`mt-5 font-display font-bold leading-[1.05] ${
            as === "h1" ? "text-4xl sm:text-6xl" : "text-3xl sm:text-5xl"
          }`}
        >
          {title}
        </Heading>
        {description && (
          <p className={`mt-4 text-lg leading-relaxed max-w-xl ${bodyColor} ${centered ? "mx-auto" : ""}`}>
            {description}
          </p>
        )}
      </Reveal>
      {action && <Reveal delay={0.1}>{action}</Reveal>}
    </div>
  );
}
