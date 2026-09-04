# Hack The Loop Website

A responsive front end for Hack The Loop, built with Next.js 16 (App Router), TypeScript and Tailwind CSS v4.

**New here?** Read `ADMIN-GUIDE.md` first. It covers everything below in plain language, plus image sizes, event workflows and troubleshooting.

## Getting started

```bash
git clone <this repo url>
cd hacktheloop
npm install
npm run dev
```

Open http://localhost:3000.

After adding or changing any photos, check them before you publish:

```bash
npm run check-images
```

It confirms every image path in `lib/data.ts` resolves to a real file and that every gallery photo has alt text.

To build for production:

```bash
npm run build
npm start
```

## Structure

- `app/` contains the pages (App Router): landing (`/`), `about`, `contact`, `gallery`, `events`, `events/[slug]`
- `components/` holds the shared UI (Header, Footer, Hero, EventCard, MailboxForm, MailboxIllustration, MasonryGallery, EventsCalendar, ProfileCard)
- `lib/data.ts` is where **all editable content lives**: team members, events, gallery photos, mission and story text, industry figures, contact details and links. Swap placeholders for real content by editing this one file.
- `public/images/` has the logo plus generated placeholder imagery in `team/`, `gallery/` and `events/`. Drop a real photo in with the same filename to swap it, or point at a new path from `lib/data.ts`.
- `scripts/generate_placeholders.py` is the script that generated the placeholder imagery. You won't need it once real photos are in.

## What is real and what is placeholder

Real: the mission, the values, the founding story and the 18 month numbers, the Turkish industry figures (Gaming in Türkiye 2025), the contact email `info@hacktheloop.org`, the social links, and the volunteer Google Form.

Placeholder, waiting on you: team members and their bios, the six sample events, and every photo.

## Turning on the contact form

The form posts to `app/api/contact/route.ts`, which emails the message to `info@hacktheloop.org`. It needs mail credentials before it can actually send:

1. Copy `.env.example` to `.env.local`.
2. Fill in your mail provider's SMTP details. For Google Workspace that means `smtp.gmail.com`, port `465`, the address as the user, and an **App Password** (created at myaccount.google.com under Security, not the normal account password).
3. Restart the dev server.

Until that's done the form still works: it detects that sending isn't configured and offers the visitor a button that opens their own mail app with the message pre-filled to the same address. Nothing is lost, so it's safe to deploy before the credentials exist.

When you deploy (Vercel, Netlify and so on), add the same variables in the host's environment settings rather than committing `.env.local`.

## Event sponsors and outcomes

Both live on the event itself in `lib/data.ts`, and both show up in the sidebar of the event page.

Sponsors take a logo file and the sponsor's website. Drop the logo into `public/images/sponsors/` (a transparent PNG or an SVG, roughly 600 by 240, reads best) and point at it:

```ts
sponsors: [
  { name: "Bug Lab Zone", url: "https://buglabzone.com", logo: "/images/sponsors/bug-lab-zone.png" },
],
```

The tile becomes a link that opens their site in a new tab. Leave `logo` off and the sponsor's name shows in a pill instead; leave the whole `sponsors` list off and the slot reads "To be announced".

Outcomes are the links a past event leaves behind. `kind` only picks the little icon:

```ts
outcomes: [
  { label: "All 11 games on itch.io", url: "https://itch.io/jam/...", kind: "itch" },
  { label: "Jam recap on Instagram", url: "https://instagram.com/hack.theloop", kind: "instagram" },
  { label: "Photos from the weekend", url: "/gallery", kind: "photos" },
  { label: "Write up on our blog", url: "https://...", kind: "link" },
],
```

Outcomes appear on past events only. Upcoming events get the Share button in that spot.

## Brand

Colors and fonts are set in one place, the `@theme` block in `app/globals.css`. That is the strict palette (five purples, five greens, cream `#FEF2E0`, ink `#171717`) plus Space Grotesk for headings and Plus Jakarta Sans for body text, both self hosted through `@fontsource` so the site makes no external font requests.

The layout uses full bleed color blocks, chunky black borders and hard offset shadows. Helper classes for that live in `globals.css`: `.shadow-poster`, `.shadow-poster-sm`, `.shadow-poster-light`, `.dots`.

## Notes

- The mailbox flag on the contact page is driven by the page scroll: it rises from flat to 90 degrees over the first 420 pixels of scrolling and lowers again on the way back up. Change `SCROLL_DISTANCE` in `components/MailboxIllustration.tsx` to make that travel longer or shorter. Sending a message locks the flag up.
- The volunteer buttons across the site all point at `siteContent.volunteerUrl`, which is your Google Form.
- Event join buttons use each event's own `joinUrl`, currently Linktree. Set a real registration link per event in `lib/data.ts`.
