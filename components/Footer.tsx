import Link from "next/link";
import Image from "next/image";
import { Mail, Link2 } from "lucide-react";
import { siteContent } from "@/lib/data";
import { InstagramIcon, LinkedInIcon, TikTokIcon } from "@/components/SocialIcons";

export default function Footer() {
  return (
    <footer className="bg-(--color-ink) text-(--color-cream) border-t-3 border-(--color-ink)">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <Image
              src="/images/logo.png"
              alt="Hack The Loop logo"
              width={40}
              height={40}
              className="h-9 w-9"
            />
            <span className="font-display font-bold text-lg">Hack The Loop</span>
          </div>
          <p className="text-sm text-(--color-cream)/70 max-w-sm leading-relaxed">
            {siteContent.missionShort}
          </p>
        </div>

        <div>
          <h4 className="font-display font-bold mb-4 text-(--color-green-300)">Explore</h4>
          <ul className="space-y-2 text-sm text-(--color-cream)/80">
            <li><Link href="/events" className="hover:text-(--color-purple-300)">Events</Link></li>
            <li><Link href="/gallery" className="hover:text-(--color-purple-300)">Gallery</Link></li>
            <li><Link href="/about" className="hover:text-(--color-purple-300)">About</Link></li>
            <li><Link href="/contact" className="hover:text-(--color-purple-300)">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold mb-4 text-(--color-green-300)">Get in touch</h4>
          <ul className="space-y-3 text-sm text-(--color-cream)/80">
            <li className="flex items-center gap-2">
              <Mail size={16} className="text-(--color-purple-300) shrink-0" />
              <a href={`mailto:${siteContent.email}`} className="hover:text-(--color-purple-300) break-all">
                {siteContent.email}
              </a>
            </li>
            <li className="flex gap-3 pt-1">
              <a href={siteContent.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="h-9 w-9 flex items-center justify-center rounded-full bg-(--color-cream)/10 hover:bg-(--color-purple-700) transition-colors">
                <InstagramIcon width={16} height={16} />
              </a>
              <a href={siteContent.social.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="h-9 w-9 flex items-center justify-center rounded-full bg-(--color-cream)/10 hover:bg-(--color-purple-700) transition-colors">
                <LinkedInIcon width={16} height={16} />
              </a>
              <a href={siteContent.social.tiktok} target="_blank" rel="noreferrer" aria-label="TikTok" className="h-9 w-9 flex items-center justify-center rounded-full bg-(--color-cream)/10 hover:bg-(--color-purple-700) transition-colors">
                <TikTokIcon width={16} height={16} />
              </a>
              <a href={siteContent.social.linktree} target="_blank" rel="noreferrer" aria-label="Linktree" className="h-9 w-9 flex items-center justify-center rounded-full bg-(--color-cream)/10 hover:bg-(--color-purple-700) transition-colors">
                <Link2 size={16} />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-(--color-cream)/10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-5 text-xs text-(--color-cream)/50 flex flex-col sm:flex-row gap-2 justify-between">
          <span>© {new Date().getFullYear()} Hack The Loop. No fees, no experience required.</span>
          <span>Built by our volunteers 💜</span>
        </div>
      </div>
    </footer>
  );
}
