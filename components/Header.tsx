"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-(--color-paper) border-b-3 border-(--color-ink) transition-shadow ${
        scrolled ? "shadow-[0_4px_0_0_#171717]" : ""
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex h-20 sm:h-24 items-center justify-between gap-3 py-3">
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3.5 min-w-0 group">
            <Image
              src="/images/logo.png"
              alt="Hack The Loop logo"
              width={72}
              height={72}
              className="h-12 w-12 sm:h-16 sm:w-16 shrink-0 transition-transform duration-300 group-hover:rotate-12"
              priority
            />
            <span className="font-display font-bold text-xl sm:text-2xl lg:text-3xl tracking-tight truncate">
              Hack The Loop
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((item) => {
              const active =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 text-sm font-bold rounded-full border-2 transition-colors ${
                    active
                      ? "bg-(--color-purple-900) text-(--color-paper) border-(--color-ink)"
                      : "border-transparent hover:border-(--color-ink) hover:bg-(--color-purple-100)"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>



          <button
            className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-full border-2 border-(--color-ink)"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
          open ? "max-h-96 border-t-2 border-(--color-ink)" : "max-h-0"
        }`}
      >
        <nav className="mx-auto max-w-7xl px-5 py-4 flex flex-col gap-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-4 py-3 rounded-xl text-base font-bold hover:bg-(--color-purple-100)"
            >
              {item.label}
            </Link>
          ))}

        </nav>
      </div>
    </header>
  );
}
