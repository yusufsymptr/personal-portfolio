"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getDictionary, Locale } from "@/lib/i18n/dictionaries";

export default function Navbar({ locale }: { locale: string }) {
  const dict = getDictionary(locale as Locale);
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { key: "home" as const, label: dict.nav.home, href: `/${locale}` },
    { key: "about" as const, label: dict.nav.about, href: `/${locale}/about` },
    { key: "projects" as const, label: dict.nav.projects, href: `/${locale}/projects` },
    { key: "skills" as const, label: dict.nav.skills, href: `/${locale}/skills` },
    { key: "contact" as const, label: dict.nav.contact, href: `/${locale}/contact` },
  ];

  const switchLocaleUrl = () => {
    const targetLocale = locale === "en" ? "id" : "en";
    if (!pathname) return `/${targetLocale}`;
    return pathname.replace(/^\/[^\/]+/, `/${targetLocale}`);
  };

  return (
    <>
      {/* =========================================
          VERSI DESKTOP (Normal di Atas) — tidak diubah
          ========================================= */}
      <header
        className={`hidden md:flex fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-background/90 backdrop-blur-md border-b border-borderLight py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-[1200px] w-full mx-auto px-8 flex items-center justify-between">
          <Link href={`/${locale}`} className="text-xl font-bold tracking-tighter text-textPrimary">
            YUSUF.
          </Link>

          <nav className="flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.key}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-accent ${
                    isActive ? "text-accent" : "text-textPrimary/70"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <div className="w-px h-5 bg-borderLight mx-2"></div>

            <Link
              href={switchLocaleUrl()}
              className="flex items-center gap-2 text-sm font-medium text-textPrimary/70 hover:text-accent transition-colors px-4 py-1.5 border border-borderLight rounded-full bg-background/50"
              title="Switch Language"
            >
              <span>{locale === "en" ? "English" : "Indonesia"}</span>
            </Link>
          </nav>
        </div>
      </header>

      {/* =========================================
          VERSI MOBILE (Logo & Bahasa di Atas) — tidak diubah
          ========================================= */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 p-5 flex justify-between items-center pointer-events-none">
        <Link href={`/${locale}`} className="text-xl font-bold tracking-tighter text-textPrimary pointer-events-auto mix-blend-difference text-white">
          YUSUF.
        </Link>
        <Link
          href={switchLocaleUrl()}
          className="pointer-events-auto px-3 py-1 text-[10px] font-bold uppercase tracking-wide border border-borderLight bg-background/80 backdrop-blur-md rounded-sm text-textPrimary hover:text-accent transition-colors"
        >
          {locale === "en" ? "English" : "Indonesia"}
        </Link>
      </div>

      {/* =========================================
          VERSI MOBILE (Navbar Bawah) — teks diperbesar,
          padding tap area dinaikin biar tetep nyaman dipencet
          ========================================= */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-borderLight pb-safe">
      <div className="flex items-center justify-between w-full px-5">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.key}
              href={link.href}
              className={`py-4 text-sm font-bold uppercase whitespace-nowrap transition-colors ${
                isActive ? "text-accent" : "text-textPrimary/60"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
    </>
  );
}