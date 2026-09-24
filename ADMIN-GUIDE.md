# Hack The Loop: Admin Guide

Everything you need to run the site yourself. No coding background assumed.

The short version: **all the words live in one file (`lib/data.ts`) and all the pictures live in one folder (`public/images/`)**. If you only ever learn those two places, you can update ninety percent of the site.

---

## Table of contents

1. [Getting set up](#1-getting-set-up)
2. [How to run and preview the site](#2-how-to-run-and-preview-the-site)
3. [The two places you edit](#3-the-two-places-you-edit)
4. [Rules for editing `data.ts` without breaking it](#4-rules-for-editing-datats-without-breaking-it)
5. [Image specifications (read this before exporting anything)](#5-image-specifications)
6. [Events: adding, editing, and closing them out](#6-events)
7. [Sponsors on an event](#7-sponsors-on-an-event)
8. [Outcomes on a past event](#8-outcomes-on-a-past-event)
9. [The photo gallery](#9-the-photo-gallery)
10. [Team and volunteers](#10-team-and-volunteers)
11. [Site wide texts: mission, values, numbers, story](#11-site-wide-texts)
12. [Email, socials, and the volunteer form](#12-email-socials-and-the-volunteer-form)
13. [Headings and page titles](#13-headings-and-page-titles)
14. [The sliding words on the landing page](#14-the-sliding-words-on-the-landing-page)
15. [Logo and favicon](#15-logo-and-favicon)
16. [Turning on the contact form email](#16-turning-on-the-contact-form-email)
17. [Cookies and analytics](#17-cookies-and-analytics)
18. [Publishing your changes](#18-publishing-your-changes)
19. [When something breaks](#19-when-something-breaks)
20. [One page cheat sheet](#20-one-page-cheat-sheet)

---

## 1. Getting set up

You need two things installed once, and then never again.

**Node.js.** Download the LTS version from [nodejs.org](https://nodejs.org) and install it. This is what runs the site on your computer.

**A code editor.** Use [Visual Studio Code](https://code.visualstudio.com). It is free.

> **Do not edit these files in TextEdit, Notes, Word, or Pages.** Those apps quietly turn straight quotes `"` into curly quotes `"` `"`, and curly quotes break the site instantly. VS Code never does this.

Once both are installed, open the `hacktheloop` folder in VS Code (File, then Open Folder), open the built in terminal (View, then Terminal), and run this one time:

```bash
npm install
```

That downloads everything the site needs. It takes a minute or two and only has to happen once, or again after you pull down a new version of the project.

---

## 2. How to run and preview the site

In the terminal, inside the project folder:

```bash
npm run dev
```

Wait for it to say `Ready`, then open **http://localhost:3000** in your browser.

Leave that terminal running while you work. Every time you save a file, the browser updates within a second or two. You do not need to restart anything.

To stop the server, click the terminal and press `Control` and `C` together.

**Three commands, and what they are for:**

| Command | What it does | When to use it |
|---|---|---|
| `npm run dev` | Runs a live preview on your computer | Every time you are editing |
| `npm run build` | Checks the whole site for errors | Before you publish, always |
| `npm start` | Runs the finished built version | Rarely, only to double check a build |
| `npm run check-images` | Checks every image path in `data.ts` really exists, and that every photo has alt text | After adding photos, before publishing |

---

## 3. The two places you edit

```
hacktheloop/
├── lib/
│   └── data.ts          ← ALL the words, dates, links, and names
└── public/
    └── images/
        ├── logo.png     ← the club logo
        ├── events/      ← event cover photos
        ├── gallery/     ← gallery photos
        ├── team/        ← team and volunteer portraits
        └── sponsors/    ← sponsor logos
```

Everything else in the project is the design and the machinery. You should not need to touch it, and if you leave it alone you cannot break the site badly.

**What lives in `lib/data.ts`, in order from top to bottom:**

| Section | Controls |
|---|---|
| `team` | Everyone on the About page, both core team and volunteers |
| `gallery` | Every photo on the Gallery page |
| `events` | All six events, past and upcoming, and their detail pages |
| `siteContent` | Mission, values, what we do, email, social links, volunteer form link |
| `industry` | The "Why we exist" figures on the landing page |
| `story` | The three founding story cards on the About page |
| `milestones` | The four counting numbers (1758 people, 4 jams, and so on) |

---

## 4. Rules for editing `data.ts` without breaking it

The file is written in a format where punctuation matters. Five rules cover everything.

**Rule 1. Text always sits inside straight double quotes.**

```ts
title: "Winter Game Jam 2026",
```

**Rule 2. Every line ends with a comma.** Including the last one. An extra comma is harmless. A missing comma breaks the page.

**Rule 3. Each entry is wrapped in curly braces, and entries are separated by commas.**

```ts
{ name: "Ela Y.", role: "Founder" },
{ name: "Sude K.", role: "Jam Director" },
```

**Rule 4. Numbers have no quotes. Text always does.**

```ts
attendeeCount: 42,          // correct, it is a number
attendeeCount: "42",        // wrong, this will error
```

**Rule 5. Apostrophes inside text are fine. Double quotes inside text are not.**

```ts
summary: "It's open to everyone.",           // fine
summary: "The theme was "reflection".",      // breaks
summary: "The theme was 'reflection'.",      // use single quotes instead
```

**The safest way to add anything:** find an existing entry that looks like what you want, copy the whole block from `{` to `},`, paste it below, and change the values. Never start from scratch.

**If you break it,** the browser shows a red error screen naming the file and the line number. Press `Command` and `Z` to undo until it goes away. Nothing is permanently damaged.

---

## 5. Image specifications

This is the section to bookmark. Every image on the site has a shape the design expects, and matching it is the difference between a photo that looks intentional and one that looks cropped by accident.

### The specification table

| What | Folder | Size to export | Shape | Format | Keep under |
|---|---|---|---|---|---|
| **Event cover** | `public/images/events/` | **1600 x 900** | 16:9 landscape | JPG | 400 KB |
| **Gallery photo** | `public/images/gallery/` | **1200 to 1600 on the long side** | any shape works | JPG | 400 KB |
| **Team or volunteer portrait** | `public/images/team/` | **600 x 600** | perfect square | JPG | 200 KB |
| **Sponsor logo** | `public/images/sponsors/` | **600 x 240** | wide landscape | PNG with transparent background, or SVG | 100 KB |
| **Club logo** | `public/images/logo.png` | **512 x 512** | square | PNG with transparent background | 200 KB |

### What each one has to look like

**Event covers** run across the top of the event page as a wide banner, and again as the top of the event card in the list. The bottom part of the banner sits under a dark gradient with the event title on top, so **do not put anything important in the bottom third of the photo**. Faces and action belong in the upper two thirds. Anything wider or narrower than 16:9 gets cropped from the centre.

**Gallery photos** go into a masonry layout, which is the Pinterest style grid where columns are even but each photo keeps its own height. This means **you do not have to crop gallery photos at all**. Portrait, landscape, and square all sit happily side by side, and mixing them actually looks better than making them uniform. Just make sure the long side is at least 1200 pixels, because clicking a photo opens it large.

**Team portraits** are displayed as a square with rounded corners, around 144 pixels on screen. Export them square at 600 x 600 and crop so the face sits in the middle. If you hand the site a rectangle it will crop the centre out and someone will lose the top of their head.

**Sponsor logos** sit inside a white tile 56 pixels tall, and the logo is scaled down to fit inside it with a little padding. This is why they need a **transparent background**: a logo saved with a white box around it shows that box against the white tile and looks wrong. Horizontal logos work best. A tall or square logo will still fit, but it ends up small because the tile limits the height. If the sponsor gives you a tall logo, ask for their horizontal version, most brands have both.

### Rules for the files themselves

**Naming.** Lowercase letters, numbers, and hyphens only.

```
good:   winter-jam-2026.jpg     bug-lab-zone.png     avatar-11.jpg
bad:    Winter Jam 2026.jpg     büglab logo.PNG      IMG_4821.HEIC
```

No spaces, no capital letters, no Turkish characters (ı, ş, ğ, ü, ö, ç), no apostrophes. These all become part of the web address of the image and cause problems that are hard to spot.

**Format.** JPG for photographs. PNG for anything that needs a transparent background, meaning logos. SVG also works for sponsor logos and is the best option if the sponsor gives you one.

**HEIC does not work.** Photos straight off an iPhone are `.HEIC` files and browsers cannot show them. Convert first:

- On Mac: open the photo in Preview, then File, then Export, then choose JPEG and set Quality to around 80 percent.
- On iPhone, to stop it happening at all: Settings, then Camera, then Formats, then choose Most Compatible.

**File size.** Nothing above 400 KB. Large photos make the page slow, and slow pages lose visitors. The quickest fix is exporting at JPEG quality 75 to 80 rather than 100. The difference is invisible and often cuts the file size by two thirds.

**Do not go above about 2000 pixels** on any side. The site automatically makes smaller versions for phones, and feeding it a 6000 pixel photo just wastes time and space with no visible benefit.

> **This is the single most common problem.** Photos straight off a camera are 6000 to 7000 pixels wide and 8 to 18 MB each. Eighteen of those is over 200 MB on one page, which makes the gallery crawl and can leave tiles blank while the preview server grinds through resizing them. Always export smaller copies before putting them in the project. Keep the full size originals wherever you normally keep photos, not in the website folder.

**On a Mac you can resize a whole batch at once.** Select the photos in Finder, right click, choose Quick Actions, then Convert Image, pick JPEG and set Image Size to Large. Or open them all in Preview, select all in the sidebar, then Tools, then Adjust Size, and set the longest side to 1600.

### Checking your work

After adding photos, run this before anything else:

```bash
npm run check-images
```

It reads every image path in `data.ts`, checks the file is really there, and warns about photos with no alt text. It catches the two mistakes that are easy to make and almost impossible to spot by eye: a folder or filename that does not match what `data.ts` says, and a forgotten description.

### Where to put a new image

Drag the file into the right folder in VS Code's sidebar, or into the folder in Finder. Then reference it in `data.ts` with a path that **starts with a slash and leaves out the word `public`**:

```
file on disk:     public/images/events/winter-jam-2026.jpg
what you write:   "/images/events/winter-jam-2026.jpg"
```

That trips everyone up once. The `public` folder is the root of the website, so it disappears from the path.

---

## 6. Events

Every event, past and upcoming, is one block inside the `events` list in `data.ts`. Each one automatically gets its own page, a card in the list, and a marker on the calendar. You never create a page by hand.

### Every field explained

| Field | Required | What it does |
|---|---|---|
| `slug` | yes | The web address of the event page. `"winter-jam-2026"` becomes `hack-the-loop.com/events/winter-jam-2026`. Lowercase and hyphens only, and it must be different from every other event. |
| `title` | yes | The event name, shown everywhere. |
| `date` | yes | Start date, always written `"YYYY-MM-DD"`. So 4 December 2026 is `"2026-12-04"`. Any other format will not show on the calendar. |
| `endDate` | no | Only for events that run more than one day. Same format. Leave it out for a single day event. |
| `time` | yes | Free text, shown as written. Examples: `"19:00 to 22:00"` or `"3 day jam, Fri 18:00 to Sun 20:00"`. |
| `location` | yes | Venue and city. Write `"To be announced, İstanbul"` if you do not know yet. |
| `category` | yes | **Exactly one of these**: `"Game Jam"`, `"Workshop"`, `"Talk"`, `"Meetup"`, `"Game Night"`, `"Pocket Jam"`. Anything else stops the site building. To add a new one, add it to the `category` line in the `EventItem` type near the top of `data.ts`. This shows as the purple pill at the top of the details box. |
| `summary` | yes | One or two sentences. This is what appears on the event card in the list. Keep it to about 140 characters, longer text gets cut off with dots. |
| `description` | yes | The full paragraph at the top of the event page. Two to four sentences is the sweet spot. |
| `cover` | yes | Path to the cover image. See the image table above. |
| `status` | yes | Either `"upcoming"` or `"past"`. This one field decides almost everything about how the event is displayed. |
| `joinUrl` | upcoming only | One registration link. The button reads "Join this event". See "Registration links" below. |
| `joinLinks` | upcoming only | Several registration buttons with your own labels, for example participants and mentors. Use this instead of `joinUrl`. |
| `attendeeCount` | past only | A plain number, no quotes. Shows as "42 people came". |
| `recapSummary` | past only | A sentence or two on how it went, shown in the purple "How it went" box. |
| `recapPhotos` | past only | The photo strip on the event page. See below. |
| `sponsors` | no | See [section 7](#7-sponsors-on-an-event). |
| `outcomes` | past only | See [section 8](#8-outcomes-on-a-past-event). |

### Adding a new upcoming event

Copy an existing upcoming event, paste it into the `events` list, and edit. A complete minimum entry looks like this:

```ts
{
  slug: "spring-jam-2027",
  title: "Spring Game Jam 2027",
  date: "2027-03-05",
  endDate: "2027-03-07",
  time: "3 day jam, Fri 18:00 to Sun 20:00",
  location: "Bug Lab Zone, İstanbul",
  category: "Game Jam",
  summary: "Our International Women's Day jam returns. Mentor backed teams, playable prototypes by Sunday.",
  description:
    "Teams form on the spot and get paired with mentors from partner studios. Open to every experience level, no portfolio needed.",
  cover: "/images/events/spring-jam-2027.jpg",
  status: "upcoming",
  joinUrl: "https://forms.gle/your-registration-form",
  sponsors: [
    { name: "Bug Lab Zone", url: "https://buglabzone.com", logo: "/images/sponsors/bug-lab-zone.png" },
  ],
},
```

Order does not matter. The site sorts upcoming events by date automatically, soonest first, and past events newest first.

### Registration links

Every event has its own registration link, so each jam or meetup can point at its own Google Form. Nothing is shared between events: change one and the others are untouched. Two events can still point at the same form if you want them to, just paste the same link into both.

**One form for the event.** Add a `joinUrl` line. The green button reads "Join this event".

```ts
status: "upcoming",
joinUrl: "https://forms.gle/your-tea-time-form",
```

**Several forms for the event.** A jam often needs one form for participants and another for mentors or volunteers. Use `joinLinks` instead, and write each button's label yourself. The first button is green, the others are white. `note` is optional, it adds a short line under the button.

```ts
status: "upcoming",
joinLinks: [
  { label: "Join as a participant", url: "https://forms.gle/participants", note: "Coders, artists, writers, beginners" },
  { label: "Join as a mentor", url: "https://forms.gle/mentors", note: "Industry folks who want to guide a team" },
  { label: "Volunteer on the day", url: "https://forms.gle/volunteers" },
],
```

**No form yet.** Leave both out. Instead of a button that goes nowhere, the page says "Registration opens soon". The moment you add a link, the button appears. Every new upcoming event has a reminder line ready for you:

```ts
// joinUrl: "paste this event's registration form link here",
```

Delete the two slashes at the start, paste the link between the quotes, and save.

Where to get the link: in Google Forms press **Send**, choose the link tab, tick "Shorten URL", and copy it. Do not copy the address bar while you are editing the form, that link only works for you.

### Turning an event into a past event

This is the routine after every event, and it takes about five minutes.

1. Change `status: "upcoming"` to `status: "past"`.
2. Delete the `joinUrl` or `joinLinks` lines. They are not needed any more and the Join box disappears on its own.
3. Add `attendeeCount:` with the real number.
4. Add `recapSummary:` with a sentence about how it went.
5. Upload the photos to `public/images/gallery/`, add them to the `gallery` list with this event's slug in `eventSlug` (see [section 9](#9-the-photo-gallery)), then add the recap line below.
6. Add `outcomes:` with the itch.io page, Instagram post, and anything else worth linking.

The finished result:

```ts
{
  slug: "spring-jam-2027",
  title: "Spring Game Jam 2027",
  date: "2027-03-05",
  endDate: "2027-03-07",
  time: "3 day jam, Fri 18:00 to Sun 20:00",
  location: "Bug Lab Zone, İstanbul",
  category: "Game Jam",
  summary: "Our International Women's Day jam returns. Mentor backed teams, playable prototypes by Sunday.",
  description:
    "Teams formed on the spot and got paired with mentors from partner studios. Open to every experience level, no portfolio needed.",
  cover: "/images/events/spring-jam-2027.jpg",
  status: "past",
  attendeeCount: 51,
  recapSummary: "51 people came, 13 teams formed, and 12 of them finished something playable by the showcase.",
  recapPhotos: gallery.filter((g) => g.eventSlug === "spring-jam-2027").map((g) => g.src),
  sponsors: [
    { name: "Bug Lab Zone", url: "https://buglabzone.com", logo: "/images/sponsors/bug-lab-zone.png" },
  ],
  outcomes: [
    { label: "All 13 games on itch.io", url: "https://itch.io/jam/htl-spring-2027", kind: "itch" },
    { label: "Recap on Instagram", url: "https://instagram.com/p/xxxxx", kind: "instagram" },
    { label: "Photos from the weekend", url: "/gallery", kind: "photos" },
  ],
},
```

That `recapPhotos` line looks intimidating but it is a copy and paste. It means "every gallery photo tagged with this event". The only thing you change is the slug in the middle, and it has to match this event's own slug exactly.

If you would rather list the photos by hand, this also works:

```ts
recapPhotos: [
  "/images/gallery/gallery-21.jpg",
  "/images/gallery/gallery-22.jpg",
],
```

### Deleting an event

Delete the whole block from its opening `{` to its closing `},`. Its page and calendar entry disappear.

> **A warning about slugs.** Once you have posted an event link anywhere, on Instagram, in an email, in a Discord message, that link points at the slug. Changing the slug later breaks every one of those links forever. Get the slug right the first time and then leave it alone, even if the title changes.

---

## 7. Sponsors on an event

Sponsors show up in the sidebar of the event page as a grid of clickable logo tiles. Both upcoming and past events have this section. If an event has no sponsors listed, the section still appears and reads "To be announced", which is deliberate: it looks like a slot waiting to be filled rather than something missing.

### Adding a sponsor

Get the logo, ideally as a PNG with a transparent background or an SVG, in a horizontal layout. Save it into `public/images/sponsors/` with a clean lowercase name. Then add it to the event:

```ts
sponsors: [
  { name: "Bug Lab Zone", url: "https://buglabzone.com", logo: "/images/sponsors/bug-lab-zone.png" },
  { name: "Games for Change Türkiye", url: "https://gamesforchange.org.tr", logo: "/images/sponsors/games-for-change-turkiye.png" },
],
```

| Part | Required | Notes |
|---|---|---|
| `name` | yes | Used as the alt text and the hover tooltip. Screen readers read this out, so write the real company name. |
| `url` | no | Their website. With it, the logo becomes a link that opens in a new tab. Without it the logo shows but does not click. |
| `logo` | no | Path to the file. Without it, the sponsor's name shows in a purple pill instead, which is a fine stopgap while you wait for the logo file. |

The tiles sit two per row. Any number of sponsors works, though four to six starts to crowd the sidebar. Sponsors that back several events need to be listed on each of those events. The same logo file can be reused as many times as you like.

**A sponsor with no logo yet:**

```ts
sponsors: [{ name: "Studio Name" }],
```

---

## 8. Outcomes on a past event

Outcomes are the links an event leaves behind: the itch.io jam page, the Instagram recap, the photo set, a write up. They appear in the sidebar of past events only, in the spot where upcoming events show the Share button.

```ts
outcomes: [
  { label: "All 11 games on itch.io", url: "https://itch.io/jam/hacktheloop-iwd-2026", kind: "itch" },
  { label: "Jam recap on Instagram", url: "https://instagram.com/p/xxxxx", kind: "instagram" },
  { label: "Photos from the weekend", url: "/gallery", kind: "photos" },
  { label: "What we learned, on our blog", url: "https://medium.com/@hacktheloop/...", kind: "link" },
],
```

| Part | What it does |
|---|---|
| `label` | The clickable text. Write it like a human would say it, not like a filename. "All 11 games on itch.io" beats "itch.io link". |
| `url` | Where it goes. A full address starting `https://` opens in a new tab. A path starting with `/`, like `/gallery`, stays on our site. |
| `kind` | Picks the little icon next to the label. Four options: `"itch"`, `"instagram"`, `"photos"`, `"link"`. Leave it out and it uses the plain link icon. |

You can list as many as you like, and any mix of kinds. An event with no outcomes shows "Nothing published yet", so it is worth going back and filling these in once the itch.io page is live.

**Upcoming events do not get outcomes.** They get the Share button instead, which copies the event link to the visitor's clipboard. That is automatic and needs nothing from you.

---

## 9. The photo gallery

The Gallery page shows every photo in the `gallery` list, in the order you write them. Clicking one opens it full screen with arrow keys to move between photos.

Photos are grouped into a folder per event, so `public/images/gallery/iwd-2026/` holds the IWD jam photos. Each photo is then one line in `data.ts`:

```ts
{ src: "/images/gallery/iwd-2026/iwd26-1.jpg", alt: "Teams presenting at the closing showcase", eventSlug: "iwd-game-jam-2026" },
```

> **Folder names have to match exactly.** `oyun_bozan_1` on disk and `oyun-bozan-1` in `data.ts` are two different names, and the photos will silently not appear. Underscores are not hyphens and capitals are not lowercase. Stick to lowercase and hyphens everywhere and this cannot bite you.

| Part | Required | Notes |
|---|---|---|
| `src` | yes | Path to the file in `public/images/gallery/`. |
| `alt` | strongly recommended | A short description of what is happening in the photo. This is read aloud to blind visitors and shows if the image fails to load. Describe the scene, do not just write "photo". If you leave it out the site still works, it just falls back to a generic description. |
| `eventSlug` | no | Tag the photo with an event slug and it also appears in that event's recap strip. Leave it off for general community photos. |

### Adding a batch of photos after an event

1. Convert them to JPG if they came off an iPhone.
2. Export at around 1200 to 1600 pixels on the long side, quality 80.
3. Make a folder for the event inside `public/images/gallery/`, named the same as the event slug, and put the photos in it. So the IWD jam photos live in `public/images/gallery/iwd-2026/`.
4. Name the files short and lowercase: `iwd26-1.jpg`, `iwd26-2.jpg`, and so on.
5. Add one line each to the `gallery` list in `data.ts`, tagged with the event slug.
6. Run `npm run check-images` to confirm every path matches.

New photos go at the top of the list if you want them to appear first on the page.

**How many is too many?** The page handles fifty or sixty photos comfortably. Beyond that it gets slow to load on phones. Pick the best ones rather than uploading the whole camera roll, twenty strong photos read better than eighty average ones.

**Removing a photo:** delete its line. You can also delete the file, but leaving it in the folder is harmless.

---

## 10. Team and volunteers

Both live in the `team` list at the top of `data.ts`. The only thing separating them is the `kind` field, which decides which section of the About page they land in.

```ts
{
  slug: "ela-y",
  name: "Ela Y.",
  role: "Founder & Community Lead",
  bio: "Sets the direction and keeps the loop from closing again.",
  image: "/images/team/avatar-1.jpg",
  kind: "team",
},
```

| Field | Notes |
|---|---|
| `slug` | An internal id. Lowercase and hyphens, unique. Not shown anywhere. |
| `name` | As they want it shown. First name and initial is fine, plenty of people prefer that. |
| `role` | Their title, shown in purple capitals under the name. Keep it to three or four words. |
| `bio` | One sentence. The cards look best when everyone's bio is roughly the same length, so aim for 60 to 90 characters. |
| `image` | Square portrait, 600 x 600. See the image table. |
| `kind` | `"team"` puts them in "Who runs this". `"volunteer"` puts them in "The people who make the days happen". |

The cards in each row automatically stretch to match the tallest one, so a slightly long bio will not break the layout. It will just make that whole row taller.

**Someone leaves:** delete their block. **Someone is promoted from volunteer to core team:** change `kind: "volunteer"` to `kind: "team"`, nothing else.

**No photo yet?** Everyone needs an image path or the card breaks. Point them at one of the existing placeholder avatars until you get a real portrait.

---

## 11. Site wide texts

These four blocks sit at the bottom of `data.ts` and feed the landing page and About page.

### `siteContent`

| Key | Where it shows |
|---|---|
| `mission` | The long paragraph at the top of the About page |
| `missionShort` | The one line under the logo in the footer |
| `values` | The four "What we hold to" cards, on both the landing page and About page |
| `activities` | The four "Four ways in" cards on the landing page, each with a `title` and a `desc` |

`values` is a plain list of sentences. Add or remove lines freely, though the grid is built for four and looks best with four or eight.

`activities` entries look like this:

```ts
{ title: "Game Jams", desc: "Three day build sprints with mentors on hand, like our IWD Jam." },
```

Keep `desc` to one line. There are four icons assigned in order, so if you add a fifth activity it reuses one. That is fine visually.

### `industry`

The "Why we exist" section on the landing page.

```ts
export const industry = {
  headline: "Half the players in Türkiye are women. One in ten of the people making the games are.",
  intro: "The industry is growing faster than the door into it...",
  figures: [
    { value: "46%", label: "of players in Türkiye are women" },
    { value: "12%", label: "of the people working in the games industry are women" },
    { value: "$1B+", label: "revenue the Turkish games industry passed in 2025" },
  ],
  source: "Gaming in Türkiye industry report, 2025",
};
```

`value` is text, not a number, so `"46%"` and `"$1B+"` both work. Three figures fit the row exactly. **Update `source` whenever you update the figures**, and update the figures when a newer industry report comes out, roughly once a year. Numbers with a stale source do more harm than no numbers.

### `story`

The three cards on the About page: `founded`, `what`, and `how`. One paragraph each. The headings above them ("How it started", "What we build", "How it runs") live in `app/about/page.tsx` if you ever want to change those words.

### `milestones`

The four numbers that count up as you scroll.

```ts
export const milestones = [
  { value: 1758, label: "People in the community" },
  { value: 4, label: "Game jams run" },
  { value: 5, label: "Game nights" },
  { value: 2, label: "Industry meetups" },
];
```

`value` must be a plain number with no quotes and no commas inside it, because the animation counts up to it. Write `1758`, never `"1,758"`. The display adds the thousands separator for you.

**Update these after every event.** They are the most visible thing on the site that goes stale, and they are a thirty second edit.

---

## 12. Email, socials, and the volunteer form

All in `siteContent`, near the bottom of `data.ts`:

```ts
email: "info@hacktheloop.org",
social: {
  instagram: "https://instagram.com/hack.theloop",
  linkedin: "https://linkedin.com/company/hack-the-loop",
  tiktok: "https://tiktok.com/@hacktheloop",
  linktree: "https://linktr.ee/hacktheloop",
},
volunteerUrl: "https://docs.google.com/forms/d/e/1FAIpQLSc.../viewform",
```

Change any of these in one place and every button, link, and icon across the whole site follows. There is no second copy hiding anywhere.

**`email`** appears on the contact page and in the footer, and is where contact form messages go if you have not set a separate delivery address (see [section 16](#16-turning-on-the-contact-form-email)).

**`volunteerUrl`** is your Google Form. Every "Become a volunteer" button on the site points here. If you replace the form, paste the new address here and you are done. Use the address you get from the form's **Send** button, then the link tab, not the address bar while you are editing the form.

**`social`** links feed the round icons in the footer and on the contact page. To remove a platform entirely you have to delete its icon from `components/Footer.tsx` and `app/contact/page.tsx` as well, so if you are just pausing a platform, leaving the link in place is easier.

---

## 13. Headings and page titles

Section headings are not in `data.ts`, because they are part of the layout rather than the content. They sit in the page files, and they all look the same:

```tsx
<SectionHeader
  eyebrow="Why we exist"
  title="Half the players in Türkiye are women."
  description="The industry is growing faster than the door into it."
/>
```

`eyebrow` is the small pill above the heading. `title` is the big line. `description` is the paragraph under it and can be left out.

Where to find each one:

| Page | File |
|---|---|
| Landing page | `app/page.tsx` |
| About | `app/about/page.tsx` |
| Events | `app/events/page.tsx` |
| Gallery | `app/gallery/page.tsx` |
| Contact | `app/contact/page.tsx` |
| Single event page | `app/events/[slug]/page.tsx` |

**Browser tab titles and Google descriptions** are at the top of each of those same files, in a block called `metadata`:

```tsx
export const metadata: Metadata = {
  title: "Gallery | Hack The Loop",
  description: "Photos from Hack The Loop jams, talks, workshops and meetups.",
};
```

The site wide default, used for the home page and for link previews when someone shares the site, is in `app/layout.tsx`. Keep descriptions between 120 and 160 characters, that is what search engines display.

**The navigation menu** is the `NAV` list at the top of `components/Header.tsx`.

---

## 14. The sliding words on the landing page

The band of words scrolling across the hero is a list called `WORDS` near the top of `components/Hero.tsx`:

```ts
const WORDS = [
  "Visibility",
  "Solidarity",
  "Mentorship",
  // ...
];
```

There are twenty. Add or remove freely, though keep it above about twelve so the band never runs out of words and shows a gap. Short phrases work better than long ones, three words maximum.

The speed is set a little further down the same file, in `animationDuration: "70s"`. A larger number is slower.

---

## 15. Logo and favicon

The logo appears in three places and comes from two files.

| File | Used for | Size |
|---|---|---|
| `public/images/logo.png` | The header, the footer, and social link previews | 512 x 512 PNG, transparent |
| `app/icon.png` | The little icon in the browser tab | 512 x 512 PNG, transparent |
| `app/apple-icon.png` | The icon when someone saves the site to a phone home screen | 180 x 180 PNG |

To change the logo, replace all three files, keeping the exact same filenames. Then do a hard refresh in the browser (`Command`, `Shift`, and `R`) because browsers hold on to old tab icons stubbornly.

`public/images/logo-full.png` is the original full resolution artwork, kept for print and for making new sizes. The site does not use it directly. **Do not swap it into the header**, it is 4561 pixels wide and will slow the site down noticeably.

---

## 16. Turning on the contact form email

Right now the contact form works, but it does not send email by itself. When someone submits it, the site notices no mail account is configured and instead opens the visitor's own mail app with the message already filled in and addressed to you. Nothing is lost. It is a perfectly safe way to launch.

To have messages arrive in your inbox automatically:

**Step 1.** In the project folder, find the file called `.env.example`. Duplicate it and name the copy `.env.local`. The name matters exactly, including the dot at the front.

**Step 2.** Fill in your mail provider's details:

```
CONTACT_TO=info@hacktheloop.org
CONTACT_FROM=info@hacktheloop.org
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=info@hacktheloop.org
SMTP_PASS=your-app-password-here
```

**Step 3.** For Gmail or Google Workspace, `SMTP_PASS` is **not** your normal password. Go to myaccount.google.com, then Security, then App Passwords, and generate one specifically for the website. Paste that sixteen character code in. Other providers: Zoho is `smtp.zoho.eu` on port 465, Fastmail is `smtp.fastmail.com` on port 465.

**Step 4.** Stop the dev server and start it again. Environment settings are only read at startup.

**Step 5.** Send yourself a test message through the form on the site.

> **Never share or commit `.env.local`.** It holds a working password to your mailbox. The project is already set up to keep it out of any upload, but do not email it, paste it in Discord, or put it in a shared folder.
>
> When you deploy the site (see next section), you add these same six values in your hosting provider's settings panel rather than uploading the file.

---

## 17. Cookies and analytics

The site asks every visitor about cookies the first time they arrive, following the Turkish KVKK cookie guide and the EU rules: "Accept all" and "Reject all" look exactly the same and sit side by side, nothing optional is switched on in advance, and anyone can change their mind later from the **Cookie settings** link at the bottom of every page. The answer is remembered for six months, then they are asked again.

The full cookie policy lives at `/cookies` and is linked from the banner and the footer.

**What it covers right now.** Only one cookie is ever set without asking, `htl_consent`, which remembers the visitor's answer. That is allowed without permission because the site needs it. Nothing else runs until someone says yes.

### Turning on Google Analytics

The banner is ready for analytics, but nothing is collected until you add your Google Analytics ID.

1. Create a property at [analytics.google.com](https://analytics.google.com) and copy the Measurement ID. It looks like `G-XXXXXXXXXX`.
2. Add it to `.env.local` on your computer:
   ```
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```
3. Add the same line on your host, for Vercel under Settings then Environment Variables, and redeploy.

Even then, analytics only runs for visitors who accept it. People who reject it send nothing to Google at all.

### When the cookies change

If you ever add something new that sets cookies, such as a second analytics tool, an embedded video or an Instagram feed, three things need updating together. Ask for help the first time, it is easy to miss one:

1. Add a row for each new cookie to the table in `app/cookies/page.tsx`.
2. Change `LAST_UPDATED` at the top of that same file.
3. Raise `CONSENT_VERSION` by one in `lib/consent.ts`, so everyone is asked again. An old yes does not cover cookies it was never asked about.

> The cookie policy was written to follow the published KVKK and EU guidance, but it is not legal advice. If the club ever collects more than simple visit counts, have someone qualified look it over.

---

## 18. Publishing your changes

Editing on your computer only changes what you see at localhost:3000. To get it onto the real hack-the-loop.com:

**Step 1. Check it builds.** Always do this before publishing.

```bash
npm run build
```

If it prints errors, fix them before going further. A build error means the live site would break. The most common cause by far is a missing comma or a stray quote mark in `data.ts`, and the error message names the file and line.

**Step 2. Look at every page you changed** in the local preview, on a narrow browser window as well as a wide one. Roughly half your visitors are on a phone.

**Step 3. Push it live.** How this works depends on how the site is hosted. The usual setup is [Vercel](https://vercel.com), which is free for a site like this: you connect the project to a GitHub repository once, and after that every change you push to GitHub goes live automatically in about a minute.

If it is not set up yet, the one time steps are: put the project on GitHub, create a Vercel account, click Import Project and pick the repository, add the six email settings from section 16, and the analytics ID from section 17 if you use one, under Settings then Environment Variables, and point the hack-the-loop.com domain at it under Settings then Domains.

**A habit worth having:** make your edits in small batches and publish often. Twenty small changes published one at a time are far easier to untangle than one big change that broke something somewhere.

---

## 19. When something breaks

| What you see | What it means | Fix |
|---|---|---|
| Red error screen, "Unexpected token" or "Expected `,`" | Punctuation in `data.ts` | It names the line number. Look for a missing comma, an unclosed quote, or a curly quote from copying and pasting out of a document. |
| A whole folder of photos is blank, others are fine | The folder name on disk does not match `data.ts` | Run `npm run check-images`. It names every path that does not resolve. Usually underscores against hyphens, or a capital letter. |
| The gallery is slow, tiles appear one by one | The photos are full size camera files | Resize them to 1600 pixels on the long side. See section 5. |
| Console error "Image is missing required alt property" | A gallery photo has no `alt` | Add `alt: "..."` to that line. `npm run check-images` lists them all. |
| An image slot is empty or shows a broken icon | Wrong path | Check the path starts with `/images/` and not `/public/images/`. Check the spelling and capitals match the real filename exactly. `Photo.JPG` and `photo.jpg` are different files. |
| Image file is there but shows nothing | Probably a HEIC renamed to .jpg | Renaming does not convert. Re-export it properly from Preview. |
| An event is missing from the calendar | Date format | It must be `"YYYY-MM-DD"`. `"2026-3-6"` and `"06/03/2026"` both fail. |
| Build fails mentioning `category` | An invalid category | It has to be one of the categories listed in the `EventItem` type in `data.ts`, capitals included. |
| Event page shows "404 not found" | Slug mismatch | The address has to match the `slug` exactly. |
| Changes are not appearing | The file is not saved, or the server stopped | Press `Command` and `S`, then check the terminal is still running. Restart with `npm run dev`. |
| The Join button says "Registration opens soon" | The event has no `joinUrl` or `joinLinks` | Add the form link. See "Registration links" in section 6. |
| Browser says "unencrypted connection" or "Not secure" | You are on an `http://` address | On `http://localhost:3000` this is normal: the preview never leaves your computer, so nothing needs fixing. On the real site, the site now redirects every `http://` visit to `https://` by itself (`proxy.ts`). Also switch on **Always Use HTTPS** in Cloudflare, under SSL/TLS then Edge Certificates. |
| The live site says "too many redirects" | Your host passes traffic on without saying it was secure | Delete `proxy.ts`, commit and push. Then turn on **Always Use HTTPS** in Cloudflare instead. |
| The cookie banner shows up on every visit | The browser is blocking cookies, or clearing them on close | Nothing to fix on the site. It is asking because it cannot remember the answer. |
| Contact form says it could not send | Email not configured, or wrong credentials | See section 16. Check the app password, not the account password. |
| Everything is broken and you do not know why | You changed something you did not mean to | Press `Command` and `Z` repeatedly to undo. If the project is on GitHub, you can also revert to the last working version there. |

**When in doubt, undo.** `Command` and `Z` in VS Code goes back step by step and will always get you to a working state.

---

## 20. One page cheat sheet

**Everyday commands**

```bash
npm run dev            # start the preview at localhost:3000
npm run check-images   # every image path resolves, every photo has alt text
npm run build          # check for errors before publishing
```

**Where things live**

| I want to change | Go to |
|---|---|
| An event, its date, its details | `lib/data.ts`, the `events` list |
| Registration form links for an event | `lib/data.ts`, that event's `joinUrl` or `joinLinks` |
| Sponsors on an event | `lib/data.ts`, that event's `sponsors` |
| itch.io and Instagram links after an event | `lib/data.ts`, that event's `outcomes` |
| Gallery photos | `lib/data.ts`, the `gallery` list, plus files in `public/images/gallery/` |
| Team and volunteers | `lib/data.ts`, the `team` list |
| Mission, values, what we do | `lib/data.ts`, `siteContent` |
| The industry percentages | `lib/data.ts`, `industry` |
| The counting numbers | `lib/data.ts`, `milestones` |
| Email address, Instagram, LinkedIn, volunteer form | `lib/data.ts`, `siteContent` |
| The scrolling words on the homepage | `components/Hero.tsx`, the `WORDS` list |
| Section headings | The matching file in `app/` |
| The logo | `public/images/logo.png` and `app/icon.png` |
| The cookie policy text | `app/cookies/page.tsx` |
| Google Analytics | `NEXT_PUBLIC_GA_ID` in `.env.local` and on your host |

**Image sizes, from memory**

```
Event cover      1600 x 900   JPG    keep the bottom third clear
Gallery photo    1200+ long side, any shape, JPG
Team portrait    600 x 600    JPG    square, face centred
Sponsor logo     600 x 240    PNG transparent, horizontal
```

Everything under 400 KB. Filenames lowercase with hyphens, no spaces, no Turkish characters.

**The after every event checklist**

- [ ] Change `status` to `"past"`
- [ ] Delete `joinUrl` or `joinLinks`
- [ ] Add `attendeeCount` and `recapSummary`
- [ ] Resize photos to 1600 on the long side, put them in `public/images/gallery/<event-slug>/`
- [ ] Add them to `gallery` tagged with the event slug
- [ ] Run `npm run check-images`
- [ ] Add the `recapPhotos` line
- [ ] Add `outcomes` with itch.io and Instagram links
- [ ] Update the `milestones` numbers
- [ ] Add the next event as `"upcoming"`, with its registration form link
- [ ] `npm run build` to check, then publish
