
// Mission, partners, email and social links are real, taken from hack-the-loop.com.
// Team members are real, events and photos are structured placeholders.

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  kind: "team" | "volunteer";
};

export const team: TeamMember[] = [
  { slug: "defne-t", name: "Defne T.", role: "Founder & Community Lead", bio: "Sets the direction and keeps the loop from closing again.", image: "/images/team/yk-defne-1.jpg", kind: "team" },
  { slug: "selin-k", name: "Selin K.", role: "Co-Founder", bio: "Becomes the bridge between the community and industry.", image: "/images/team/yk-2.jpg", kind: "team" },
  { slug: "pinar-t", name: "Pınar T.", role: "Co-Founder", bio: "Keeps our organisation running between events.", image: "/images/team/yk-3.jpg", kind: "team" },
  { slug: "sudenas-t", name: "Sudenas T.", role: "Design Coordinator", bio: "Makes sure everything we put out actually looks like us.", image: "/images/team/yk-4.jpg", kind: "team" },
  { slug: "ece-l", name: "Ece L.", role: "Design Coordinator", bio: "Creates beautiful designs for our every project", image: "/images/team/yk-5.jpg", kind: "team" },
  { slug: "asude-y", name: "Asude Y.", role: "Illustration Lead", bio: "Creates the illustrations for our products, events and much more.", image: "/images/team/yk-6.jpg", kind: "team" },
  { slug: "helin-c", name: "Helin C.", role: "PR Director", bio: "Event day logistics and a familiar face at the registration desk.", image: "/images/team/yk-7.jpg", kind: "team" },
  { slug: "nehir-a", name: "Nehir A.", role: "Content & Social Media", bio: "Face of the organisation. Photographing and documenting what happens on the day.", image: "/images/team/yk-8.jpg", kind: "team" },
  { slug: "irem-a", name: "İrem A.", role: "Event Coordinator", bio: "Runs the jams, plans the events, thrives on a deadline.", image: "/images/team/yk-9.jpg", kind: "team" },
  { slug: "sena-y", name: "Sena Y.", role: "Volunteer", bio: "Events and Preprations Team", image: "/images/team/vol-10.jpg", kind: "volunteer" },
  { slug: "sude-b", name: "Sude B.", role: "Volunteer", bio: "Design Team", image: "/images/team/vol-11.jpg", kind: "volunteer" },
  { slug: "seher-k", name: "Seher K.", role: "Volunteer", bio: "Design Team", image: "/images/team/vol-13.jpg", kind: "volunteer" },
  { slug: "sudenur-t", name: "Sudenur T.", role: "Volunteer", bio: "Content Writer", image: "/images/team/vol-14.jpg", kind: "volunteer" },
  { slug: "ipek-c", name: "İpek C.", role: "Volunteer", bio: "Content Writer", image: "/images/team/vol-15.jpg", kind: "volunteer" },
  { slug: "damla-a", name: "Damla A.", role: "Volunteer", bio: "Community moderation", image: "/images/team/vol-16.jpg", kind: "volunteer" },
  { slug: "furkan-k", name: "Furkan K.", role: "Volunteer", bio: "Community moderation", image: "/images/team/vol-17.jpg", kind: "volunteer" }, 
];

/**
 * One entry per photo on the gallery page, newest first pls pls
 * `src` is the file under /public. `alt` describes the photo for screen readers
 * and for anyone whose images fail to load. `eventSlug` is optional: set it and
 * the photo also shows up in that event's recap.
 */
export type GalleryPhoto = { src: string; alt?: string; eventSlug?: string };

export const gallery: GalleryPhoto[] = [
  { src: "/images/gallery/oyun-bozan-1/ob1-1.jpg", alt: "Members playing board games at the Oyun Bozan meetup", eventSlug: "oyun-bozan-1" },
  { src: "/images/gallery/oyun-bozan-1/ob1-2.jpg", alt: "A table mid game at the Oyun Bozan evening", eventSlug: "oyun-bozan-1" },
  { src: "/images/gallery/oyun-bozan-1/ob1-3.jpg", alt: "The community gathered around the board games", eventSlug: "oyun-bozan-1" },
  { src: "/images/gallery/oyun-bozan-1/ob1-4.jpg", alt: "Players talking through a round at Oyun Bozan", eventSlug: "oyun-bozan-1" },
  { src: "/images/gallery/oyun-bozan-1/ob1-5.jpg", alt: "The full room at the first Oyun Bozan meetup", eventSlug: "oyun-bozan-1" },
  { src: "/images/gallery/oyun-bozan-2/oyun-bozan-1.jpg", alt: "Board games laid out for the second Oyun Bozan meetup", eventSlug: "oyun-bozan-2" },
  { src: "/images/gallery/oyun-bozan-2/oyun-bozan-2.jpg", alt: "Players setting up a game at Periwinkle Cafe", eventSlug: "oyun-bozan-2" },
  { src: "/images/gallery/oyun-bozan-2/oyun-bozan-3.jpg", alt: "The community playing together at Oyun Bozan", eventSlug: "oyun-bozan-2" },
  { src: "/images/gallery/oyun-bozan-2/oyun-bozan-4.jpg", alt: "A group deep in a board game round", eventSlug: "oyun-bozan-2" },
  { src: "/images/gallery/oyun-bozan-2/oyun-bozan-5.jpg", alt: "Laughing over a game at the Oyun Bozan evening", eventSlug: "oyun-bozan-2" },
  { src: "/images/gallery/oyun-bozan-2/oyun-bozan-6.jpg", alt: "The room at the end of the Oyun Bozan meetup", eventSlug: "oyun-bozan-2" },
  { src: "/images/gallery/iwd-2026/iwd26-1.jpg", alt: "Participants gathered at the International Women's Day Game Jam", eventSlug: "iwd-game-jam-2026" },
  { src: "/images/gallery/iwd-2026/iwd26-2.jpg", alt: "A team working on their game during the IWD Jam", eventSlug: "iwd-game-jam-2026" },
  { src: "/images/gallery/iwd-2026/iwd26-3.jpg", alt: "Jammers collaborating at the IWD Game Jam", eventSlug: "iwd-game-jam-2026" },
  { src: "/images/gallery/iwd-2026/iwd26-4.jpg", alt: "The audience at the IWD Jam opening", eventSlug: "iwd-game-jam-2026" },
  { src: "/images/gallery/iwd-2026/iwd26-5.jpg", alt: "Teams presenting their games at the IWD Jam", eventSlug: "iwd-game-jam-2026" },
  { src: "/images/gallery/iwd-2026/iwd26-6.jpg", alt: "Members catching up between IWD Jam sessions", eventSlug: "iwd-game-jam-2026" },
  { src: "/images/gallery/iwd-2026/iwd26-7.jpg", alt: "The whole group at the close of the IWD Game Jam", eventSlug: "iwd-game-jam-2026" },
  { src: "/images/gallery/drink-draw-1/dd1-1.jpg", alt: "Members gathering around the table for the event", eventSlug: "drink-and-draw-1" },
  { src: "/images/gallery/drink-draw-1/dd1-2.jpg", alt: "A cool art work", eventSlug: "drink-and-draw-1" },
  { src: "/images/gallery/drink-draw-1/dd1-3.jpg", alt: "Members drawing", eventSlug: "drink-and-draw-1" },
  { src: "/images/gallery/drink-draw-1/dd1-4.jpg", alt: "Our team in a group photo", eventSlug: "drink-and-draw-1" },
  { src: "/images/gallery/drink-draw-1/dd1-5.jpg", alt: "One of our member's drawing on the progress", eventSlug: "drink-and-draw-1" },
  { src: "/images/gallery/drink-draw-1/dd1-6.jpg", alt: "People discussing and drawing together", eventSlug: "drink-and-draw-1" },
  { src: "/images/gallery/drink-draw-1/dd1-7.jpg", alt: "Some chatting", eventSlug: "drink-and-draw-1" },
  { src: "/images/gallery/pocket-jam-1/pj1-1.jpg", alt: "Members filling our mural for the day", eventSlug: "rainbow-pocket-jam" },
  { src: "/images/gallery/pocket-jam-1/pj1-2.jpg", alt: "Members filling our mural for the day on another angle", eventSlug: "rainbow-pocket-jam" },
  { src: "/images/gallery/pocket-jam-1/pj1-3.jpg", alt: "The mural itself", eventSlug: "rainbow-pocket-jam" },
  { src: "/images/gallery/pocket-jam-1/pj1-4.jpg", alt: "Members discussing about the boardgame they're working on", eventSlug: "rainbow-pocket-jam" }
];

/**
 * Who backed a single event. Leave the list off and the card says "To be announced".
 * `logo` is a path under /public; with a `url` the logo becomes a link to their site.
 */
export type EventSponsor = { name: string; url?: string; logo?: string };


/** What came out of a past event: itch.io pages, Instagram posts, photo sets, write ups. */
export type EventOutcome = {
  label: string;
  url: string;
  kind?: "itch" | "instagram" | "photos" | "link";
};

/**
 * A registration button on an upcoming event. Each event carries its own
 * links, so every jam or meetup can point at its own Google Form.
 * `note` is an optional short line shown under the button.
 */
export type JoinLink = { label: string; url: string; note?: string };

export type EventItem = {
  slug: string;
  title: string;
  date: string; // ISO date
  endDate?: string;
  time: string;
  location: string;
  category: "Game Jam" | "Workshop" | "Talk" | "Meetup" | "Game Night" | "Pocket Jam";
  summary: string;
  description: string;
  cover: string;
  status: "upcoming" | "past";
  /** One registration link. The button reads "Join this event". */
  joinUrl?: string;
  /** Several registration buttons, for example participants and mentors. Used instead of joinUrl. */
  joinLinks?: JoinLink[];
  recapPhotos?: string[];
  recapSummary?: string;
  attendeeCount?: number;
  sponsors?: EventSponsor[];
  outcomes?: EventOutcome[];
};

export const events: EventItem[] = [
  {
    slug: "she-jams-2025",
    title: "She Jams Game Jam 2025",
    date: "2025-10-23",
    endDate: "2025-10-25",
    time: "3 day jam, Fri 18:00 to Sun 20:00",
    location: "Beykoz University, İstanbul",
    category: "Game Jam",
    summary: "She Jams is in istanbul now! Three days, mentor backed teams, playable prototypes at the end.",
    description:
      "Teams formed on the spot, got paired with mentors from partner studios, and shipped playable prototypes in under 72 hours. Open to every experience level. No portfolio needed, just curiosity.",
    cover: "/images/events/shejams.jpg",
    status: "past",
    recapSummary: "54 people showed up, 12 teams formed, and all 12 finished something playable in time for the closing showcase.",
    recapPhotos: gallery.filter((g) => g.eventSlug === "she-jams-2025").map((g) => g.src),
    attendeeCount: 54,
    sponsors: [
      { name: "IndieCore", url: "https://indiecore.org/", logo: "/images/sponsors/indie-core-logo.png" },
      { name: "D.O.T Beykoz Üniversitesi", url: "https://www.instagram.com/dot_beykozuniversitesi?utm_source=ig_web_button_share_sheet&igsi=ZDNlZDc0MzIxNw==", logo: "/images/sponsors/dot-beykoz-logo.png" },
    ],
    outcomes: [
      { label: "Jam recap on Instagram", url: "https://www.instagram.com/p/DQW9jbsgrms/?utm_source=ig_web_button_share_sheet&igsi=MzRlODBiNWFlZA==", kind: "instagram" },
      { label: "Photos from the weekend", url: "/gallery", kind: "photos" },
    ],
  },
  {
    slug: "iwd-game-jam-2026",
    title: "International Women's Day Game Jam 2026",
    date: "2026-03-06",
    endDate: "2026-03-08",
    time: "3 day jam, Fri 18:00 to Sun 18:00",
    location: "Bahçeşehir University Galata Campus, İstanbul",
    category: "Game Jam",
    summary: "A cozy game jam with women only participation.",
    description:
      "3 days full of sisterhood and games! Gather your team, design your game and have fun!",
    cover: "/images/events/iwd-26.jpg",
    status: "past",
    recapSummary: "For honoring the day our topic was unity. All the teams created games with their vision of sticking together.",
    recapPhotos: gallery.filter((g) => g.eventSlug === "iwd-game-jam-2026").map((g) => g.src),
    attendeeCount: 60,
    sponsors: [
      { name: "Games For Change Türkiye", url: "https://turkiye.gamesforchange.org/", logo: "/images/sponsors/games-for-change-logo.png" },
      { name: "BUG Zone", url: "https://www.instagram.com/buglabzone?utm_source=ig_web_button_share_sheet&igsi=ZDNlZDc0MzIxNw==", logo: "/images/sponsors/buglab-logo.png" },
    ],
    outcomes: [
      { label: "Jam recap on Instagram", url: "https://www.instagram.com/p/DVv9CyzAtqc/?utm_source=ig_web_copy_link&igsi=MzRlODBiNWFlZA==", kind: "instagram" },
      { label: "Photos from the night", url: "/gallery", kind: "photos" },
    ],
  },
  {
    slug: "oyun-bozan-1",
    title: "Oyun Bozan Buluşması",
    date: "2026-04-18",
    time: "16:00 to 22:00",
    location: "Kaful Çay Kahve, İstanbul",
    category: "Game Night",
    summary: "Are you ready to play some board games with us?",
    description:
      "Welcome to another one of our regular Oyun Bozan game evening meets! We're gathering together with our community to play some board games, socilize and have fun!",
    cover: "/images/events/oyunbozan-1.jpg",
    status: "past",
    recapSummary: "We had a great evening with our community while playing many board games together.",
    recapPhotos: gallery.filter((g) => g.eventSlug === "oyun-bozan-1").map((g) => g.src),
    attendeeCount: 30,
    sponsors: [{ name: "NeoTroy Games", url: "https://neotroygames.com/", logo: "/images/sponsors/neo-troy-games-logo.png" }],
    outcomes: [
      { label: "Highlights on Instagram", url: "https://www.instagram.com/p/DXpBlLEAruC/?utm_source=ig_web_copy_link&igsi=MzRlODBiNWFlZA==", kind: "instagram" },
      { label: "Photos from the evening", url: "/gallery", kind: "photos" },
    ],
  },
  {
    slug: "oyun-bozan-2",
    title: "Oyun Bozan Buluşması",
    date: "2026-06-06",
    time: "16:00 to 22:00",
    location: "Periwinkle Cafe, İstanbul",
    category: "Game Night",
    summary: "Are you ready to play some board games with us?",
    description:
      "Welcome to another one of our regular Oyun Bozan game evening meets! We're gathering together with our community to play some board games, socilize and have fun!",
    cover: "/images/events/oyunbozan-2.jpg",
    status: "past",
    recapSummary: "We had a great evening with our community while playing many board games together.",
    recapPhotos: gallery.filter((g) => g.eventSlug === "oyun-bozan-2").map((g) => g.src),
    attendeeCount: 20,
    sponsors: [{ name: "NeoTroy Games", url: "https://neotroygames.com/", logo: "/images/sponsors/neo-troy-games-logo.png" }],
    outcomes: [
      { label: "Highlights on Instagram", url: "https://www.instagram.com/p/DZS74N-AuDu/?utm_source=ig_web_copy_link&igsi=MzRlODBiNWFlZA==", kind: "instagram" },
      { label: "Photos from the evening", url: "/gallery", kind: "photos" },
    ],
  },
  {
    slug: "rainbow-pocket-jam",
    title: "Rainbow Pocket Jam",
    date: "2026-06-26",
    time: "10:00 to 18:00",
    location: "Coado Coffe & Roastry, İstanbul",
    category: "Pocket Jam",
    summary: "Welcome to our colorful pocket jam!",
    description:
      "We're gathering for a pocket game jam with our community to creat some digital and physical games together! We're happy to welcome you all to our colorful day!",
    cover: "/images/events/pocket-jam.jpg",
    status: "past",
    recapSummary: "4 Teams created with the total of 18 people. All the teams created their games and we chatted with our community along with good coffee  ",
    recapPhotos: gallery.filter((g) => g.eventSlug === "rainbow-pocket-jam").map((g) => g.src),
    attendeeCount: 18,
    outcomes: [
      { label: "Highlights on Instagram", url: "https://www.instagram.com/p/DaI8IFCAlna/?utm_source=ig_web_copy_link&igsi=MzRlODBiNWFlZA==", kind: "instagram" },
      { label: "Photos from the evening", url: "/gallery", kind: "photos" },
    ],
  },
  {
    slug: "drink-and-draw-1",
    title: "Drink & Draw",
    date: "2026-08-08",
    time: "17:00 to 22:00",
    location: "Arsen Lupen Teras, İstanbul",
    category: "Meetup",
    summary: "Let's draw together!",
    description:
      "Pack your pens, sketchbooks or tablets and come out for an evening to drink and draw with us! No need to be good at it, being creative is the motive.",
    cover: "/images/events/drink-1.jpg",
    status: "past",
    recapSummary: "We had a fun evening with everyone. There were people across so many levels and styles. Lots of art works created along with good memories.",
    recapPhotos: gallery.filter((g) => g.eventSlug === "drink-and-draw-1").map((g) => g.src),
    attendeeCount: 25,
    outcomes: [
      { label: "Highlights on Instagram", url: "https://www.instagram.com/p/Db6L2uoApdi/?utm_source=ig_web_copy_link&igsi=MzRlODBiNWFlZA==", kind: "instagram" },
      { label: "Photos from the evening", url: "/gallery", kind: "photos" },
    ],
  },
  {
    slug: "women-game-jam-2026",
    title: "Women Game Jam 2026",
    date: "2026-10-16",
    endDate: "2026-10-18",
    time: "3 day jam, Fri 18:00 to Sun 18:00",
    location: "İstinye University Vadi İstanbul Campus, İstanbul",
    category: "Game Jam",
    summary: "Woman Game Jam 2026 is here!",
    description: "Got a game idea you've always wanted to make? This is your chance. Join Hack the Loop's Women Game Jam: team up, create a game from scratch and have fun building it with other women in tech and games. You don't need any experience. Coders, artists, designers, writers, musicians and curious beginners are all welcome.",
    cover: "/images/events/wgj-2026.jpg",
    status: "upcoming",
    joinLinks: [{ label: "Register Now!", url: "https://www.womengamejam.org/register", note: "Spots are limited" }],
    sponsors: [{ name: "Woman Game Jam", url: "https://www.womengamejam.org/", logo: "/images/sponsors/wgj-logo.png" }],
  },
  {
    slug: "tea-time-1",
    title: "Tea Time",
    date: "2026-09-26",
    time: "14:00 to 18:00",
    location: "Coado Coffee, İstanbul",
    category: "Meetup",
    summary: "Want some tea?",
    description: "A new academic year is here, and we're kicking it off the chill way. Join us in Kadıköy for tea, coffee and good conversations. You can meet new people, catch up with old friends and start the year with us.",
    cover: "/images/events/tea-1.jpeg",
    status: "upcoming",
    joinLinks: [{ label: "Join Now!", url: "https://forms.gle/Bq4nrZp7BrRPNrcx7", note: "Spots are limited" }],
    sponsors: [{ name: "Coado Coffee", url: "https://www.instagram.com/coadocoffee?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==", logo: "/images/sponsors/COADO.png" }],
  },
];

/**
 * The registration buttons for an event: its joinLinks if it has any,
 * otherwise a single button from joinUrl, otherwise none. Blank links are
 * ignored, so a half filled entry never produces a dead button.
 */
export function getJoinLinks(event: EventItem): JoinLink[] {
  const listed = (event.joinLinks ?? []).filter((l) => l.url && l.url.trim());
  if (listed.length) return listed;
  if (event.joinUrl && event.joinUrl.trim()) {
    return [{ label: "Join this event", url: event.joinUrl.trim() }];
  }
  return [];
}

export const upcomingEvents = events
  .filter((e) => e.status === "upcoming")
  .sort((a, b) => a.date.localeCompare(b.date));

export const pastEvents = events
  .filter((e) => e.status === "past")
  .sort((a, b) => b.date.localeCompare(a.date));

export const siteContent = {
  mission:
    "There is a cycle we are here to break. Women in the game industry stay invisible. Without visibility they never get to be role models. Without role models, the next ones through the door have nothing to steer by.",
  missionShort:
    "We make the work of women in games visible, and build the community that keeps them in it.",
  values: [
    "No experience required. Everyone starts somewhere.",
    "Visible work is the whole point.",
    "Solidarity comes before competition.",
    "Inclusivity is not up for negotiation.",
  ],
  activities: [
    { title: "Game Jams", desc: "Three day build sprints with mentors on hand." },
    { title: "Talks", desc: "Women from the industry telling their own stories, in their own words." },
    { title: "Mentorship", desc: "Newcomers paired with people who have already done the job." },
    { title: "Meetups", desc: "Relaxed evenings with peers from the field, built around actually meeting people." },
  ],
  email: "info@hacktheloop.org",
  social: {
    instagram: "https://instagram.com/hack.theloop",
    linkedin: "https://linkedin.com/company/hack-the-loop",
    tiktok: "https://tiktok.com/@hacktheloop",
    linktree: "https://linktr.ee/hacktheloop",
  },
  volunteerUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSc-JuV6Knj33bhLb8m_R_OrR_ejkEjyYKfKftkHNtUiQZNH6g/viewform",
};

/** Where the industry actually stands, and why the club exists. */
export const industry = {
  headline: "Half the players in Türkiye are women. One in ten of the people making the games are.",
  intro:
    "The industry is growing faster than the door into it. The talent is already here. The way in is not. That gap is the whole reason we exist, and closing it is the work.",
  figures: [
    { value: "46%", label: "of players in Türkiye are women" },
    { value: "12%", label: "of the people working in the games industry are women" },
    { value: "$1B+", label: "revenue the Turkish games industry passed in 2025" },
  ],
  source: "Gaming in Türkiye industry report, 2025",
};

/** Our own story and the numbers behind it. */
export const story = {
  founded:
    "We started in İstanbul in November 2024. The founders were students who could not find a way into the industry, and developers still in their first years of it. Nobody opened that door for us, so we opened it ourselves.",
  what:
    "We build routes into games for women who make things, through game jams, mentorship and portfolio support.",
  how:
    "Everything runs on volunteers. No membership fee, no advertising, and nothing behind a paywall. We are student founded and still growing, and we would rather say that plainly than pretend otherwise.",
};

/** Real numbers from the first 18 months. */
export const milestones = [
  { value: 1758, label: "People in the community" },
  { value: 4, label: "Game jams run" },
  { value: 6, label: "Game events" },
  { value: 3, label: "Industry meetups" },
];
