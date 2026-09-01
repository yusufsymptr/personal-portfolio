"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { getDictionary, Locale } from "@/lib/i18n/dictionaries";

const navKeys = ["home", "about", "projects", "skills", "contact"] as const;
const navPaths: Record<(typeof navKeys)[number], string> = {
  home: "",
  about: "/about",
  projects: "/projects",
  skills: "/skills",
  contact: "/contact",
};

export default function Navbar({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const dict = getDictionary(locale);
  const otherLocale: Locale = locale === "en" ? "id" : "en";

  // Ganti prefix locale di URL saat ini, biar posisi halaman tetap sama pas switch bahasa
  const switchHref = pathname.replace(`/${locale}`, `/${otherLocale}`) || `/${otherLocale}`;

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex fixed top-0 w-full z-50 bg-background border-b border-borderLight">
        <div className="flex w-full max-w-[1200px] mx-auto px-8 h-20 items-center justify-end gap-10">
          {navKeys.map((key) => {
            const href = `/${locale}${navPaths[key]}`;
            const isActive = pathname === href;
            return (
              <Link
                key={key}
                href={href}
                className="relative group flex items-baseline text-sm font-medium"
              >
                <span className={`transition-colors duration-200 ${isActive ? "text-textPrimary" : "text-textPrimary/60 group-hover:text-textPrimary"}`}>
                  {dict.nav[key]}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator-desktop"
                    className="absolute -bottom-2 left-0 right-0 h-[2px] bg-accent"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Link>
            );
          })}

          <Link
            href={switchHref}
            className="text-sm font-medium text-textPrimary/60 hover:text-textPrimary transition-colors duration-200 border-l border-borderLight pl-6"
          >
            {otherLocale.toUpperCase()}
          </Link>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 w-full z-50 bg-background border-t border-borderLight">
        <div className="flex justify-around items-center h-16 px-2">
          {navKeys.map((key) => {
            const href = `/${locale}${navPaths[key]}`;
            const isActive = pathname === href;
            return (
              <Link
                key={key}
                href={href}
                className={`flex flex-col items-center justify-center w-full h-full transition-colors duration-200 ${
                  isActive ? "text-accent" : "text-textPrimary/40"
                }`}
              >
                <span className="text-xs font-medium">{dict.nav[key]}</span>
              </Link>
            );
          })}
          <Link
            href={switchHref}
            className="flex flex-col items-center justify-center w-full h-full text-textPrimary/40"
          >
            <span className="text-xs font-medium">{otherLocale.toUpperCase()}</span>
          </Link>
        </div>
      </nav>
    </>
  );
}