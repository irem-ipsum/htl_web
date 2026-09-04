import type { Metadata } from "next";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/space-grotesk/700.css";
import "@fontsource/plus-jakarta-sans/400.css";
import "@fontsource/plus-jakarta-sans/500.css";
import "@fontsource/plus-jakarta-sans/600.css";
import "@fontsource/plus-jakarta-sans/700.css";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Hack The Loop | Breaking the loop in the gaming industry",
  description:
    "Hack The Loop is a free, open community making the work of women in gameing industry visible. Game jams, mentorship, talks and meetups.",
  metadataBase: new URL("https://www.hack-the-loop.com"),
  openGraph: {
    title: "Hack The Loop",
    description: "Breaking the loop in the gaming industry.",
    images: ["/images/logo.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-(--color-paper) text-(--color-ink)">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
