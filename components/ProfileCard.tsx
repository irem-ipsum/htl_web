import Image from "next/image";
import type { TeamMember } from "@/lib/data";

export default function ProfileCard({
  person,
  accent = "purple",
}: {
  person: TeamMember;
  accent?: "purple" | "green";
}) {
  const bg = accent === "purple" ? "bg-(--color-purple-100)" : "bg-(--color-green-100)";
  return (
    // h-full plus a column layout keeps every card in a row the same height,
    // whatever the length of the bio or the browser's zoom level.
    <div
      className={`group h-full flex flex-col rounded-3xl border-3 border-(--color-ink) ${bg} text-(--color-ink) p-5 shadow-poster-sm transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-poster`}
    >
      <div className="relative aspect-square w-32 sm:w-36 mx-auto shrink-0 overflow-hidden rounded-2xl border-3 border-(--color-ink)">
        <Image
          src={person.image}
          alt={person.name}
          fill
          sizes="(max-width: 640px) 128px, 144px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="mt-4 text-center flex flex-col flex-1">
        <h3 className="font-display text-lg font-bold text-balance">{person.name}</h3>
        <p className="text-xs font-bold uppercase tracking-wide text-(--color-purple-900) mt-1 text-balance">
          {person.role}
        </p>
        <p className="mt-2 text-sm text-(--color-ink)/70 leading-relaxed text-pretty">
          {person.bio}
        </p>
      </div>
    </div>
  );
}
