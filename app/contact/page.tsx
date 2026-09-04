import type { Metadata } from "next";
import { Mail, ExternalLink } from "lucide-react";
import MailboxForm from "@/components/MailboxForm";
import SectionHeader from "@/components/SectionHeader";
import HeroBanner from "@/components/HeroBanner";
import Reveal from "@/components/Reveal";
import { InstagramIcon, LinkedInIcon, TikTokIcon } from "@/components/SocialIcons";
import { siteContent } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact | Hack The Loop",
  description: "Get in touch with Hack The Loop, volunteer, collaborate on an event or suggest a mentor.",
};

export default function ContactPage() {
  return (
    <div>
      <HeroBanner theme="contact" className="bg-(--color-green-100)">
        <SectionHeader
          as="h1"
          eyebrow="Contact"
          title="Leave a message, we'll pick it up."
          description="Joining, collaborating, mentoring or just saying hello. The box is always open."
          accent="purple"
          bottomSpace={false}
        />
      </HeroBanner>

      <section className="dots bg-(--color-paper) py-16">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <MailboxForm />
        </div>
      </section>

      {/* Volunteer, the one place it gets a full callout */}
      <section className="dots bg-(--color-paper) pb-10">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <a
              href={siteContent.volunteerUrl}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col sm:flex-row items-center justify-between gap-6 rounded-3xl bg-(--color-green-700) text-(--color-cream) px-8 py-8 border-3 border-(--color-ink) shadow-poster transition-transform hover:-translate-y-1.5"
            >
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold">Become a volunteer</h2>
                <p className="mt-2 text-(--color-cream)/85 max-w-md">
                  No experience needed. From event day support to making content, there&apos;s a spot
                  for whatever you&apos;re good at.
                </p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full bg-(--color-cream) text-(--color-ink) border-3 border-(--color-ink) px-6 py-3.5 text-sm font-bold shrink-0 transition-transform group-hover:translate-x-1">
                Open the form <ExternalLink size={16} />
              </span>
            </a>
          </Reveal>
        </div>
      </section>

      {/* Direct info */}
      <section className="dots bg-(--color-paper) pb-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid gap-5 sm:grid-cols-3">
            <Reveal>
              <a
                href={`mailto:${siteContent.email}`}
                className="h-full flex flex-col items-center gap-3 rounded-2xl border-3 border-(--color-ink) bg-(--color-purple-100) p-6 text-center shadow-poster-sm transition-transform duration-300 hover:-translate-y-1.5"
              >
                <span className="h-12 w-12 rounded-full bg-(--color-cream) border-2 border-(--color-ink) flex items-center justify-center">
                  <Mail size={20} />
                </span>
                <span className="font-bold text-sm break-all">{siteContent.email}</span>
                <span className="text-xs text-(--color-ink)/55">General enquiries</span>
              </a>
            </Reveal>

            <Reveal delay={0.08}>
              <a
                href={siteContent.social.linkedin}
                target="_blank"
                rel="noreferrer"
                className="h-full flex flex-col items-center gap-3 rounded-2xl border-3 border-(--color-ink) bg-(--color-green-100) p-6 text-center shadow-poster-sm transition-transform duration-300 hover:-translate-y-1.5"
              >
                <span className="h-12 w-12 rounded-full bg-(--color-cream) border-2 border-(--color-ink) flex items-center justify-center">
                  <LinkedInIcon width={20} height={20} />
                </span>
                <span className="font-bold text-sm">Hack The Loop</span>
                <span className="text-xs text-(--color-ink)/55">Follow us on LinkedIn</span>
              </a>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="h-full flex flex-col items-center gap-3 rounded-2xl border-3 border-(--color-ink) bg-(--color-cream) p-6 text-center shadow-poster-sm transition-transform duration-300 hover:-translate-y-1.5">
                <span className="h-12 w-12 rounded-full bg-(--color-purple-300) border-2 border-(--color-ink) flex items-center justify-center">
                  <ExternalLink size={20} />
                </span>
                <span className="font-bold text-sm">Find us online</span>
                <div className="flex gap-3 pt-1">
                  <a href={siteContent.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="h-9 w-9 flex items-center justify-center rounded-full border-2 border-(--color-ink) hover:bg-(--color-purple-500) hover:text-(--color-cream) transition-colors">
                    <InstagramIcon width={15} height={15} />
                  </a>
                  <a href={siteContent.social.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="h-9 w-9 flex items-center justify-center rounded-full border-2 border-(--color-ink) hover:bg-(--color-purple-500) hover:text-(--color-cream) transition-colors">
                    <LinkedInIcon width={15} height={15} />
                  </a>
                  <a href={siteContent.social.tiktok} target="_blank" rel="noreferrer" aria-label="TikTok" className="h-9 w-9 flex items-center justify-center rounded-full border-2 border-(--color-ink) hover:bg-(--color-purple-500) hover:text-(--color-cream) transition-colors">
                    <TikTokIcon width={15} height={15} />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
