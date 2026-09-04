"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { getDictionary, Locale } from "@/lib/i18n/dictionaries";

export default function Navbar({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const dict = getDictionary(locale);

  // Daftar rute navigasi
  const navItems = [
    { key: "home", href: `/${locale}` },
    { key: "about", href: `/${locale}/about` },
    { key: "projects", href: `/${locale}/projects` },
    { key: "skills", href: `/${locale}/skills` },
    { key: "contact", href: `/${locale}/contact` },
  ];

  return (
    <>
      {/* DESKTOP NAV (Atas) */}
      <nav className="hidden md:flex fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-borderLight">
        <div className="flex w-full max-w-[1200px] mx-auto px-8 h-20 items-center justify-between">
          
          {/* Kiri: Logo */}
          <Link href={`/${locale}`} className="font-heading font-bold text-xl tracking-tighter hover:text-accent transition-colors">
            YUSUF<span className="text-accent">.</span>
          </Link>

          {/* Kanan: Menu & Bahasa */}
          <div className="flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.key} href={item.href} className="relative group text-sm font-medium">
                  <span className={`transition-colors duration-200 ${isActive ? "text-textPrimary" : "text-textPrimary/60 group-hover:text-textPrimary"}`}>
                    {dict.nav[item.key as keyof typeof dict.nav]}
                  </span>
                  {isActive && (
                    <motion.div 
                      layoutId="navbar-indicator-desktop" 
                      className="absolute -bottom-2 left-0 right-0 h-[2px] bg-accent" 
                    />
                  )}
                </Link>
              );
            })}
            
            {/* Language Switcher */}
            <div className="pl-4 border-l border-borderLight flex items-center h-4">
              <Link 
                href={pathname.replace(`/${locale}`, `/${locale === 'en' ? 'id' : 'en'}`)}
                className="text-sm font-medium text-textPrimary/50 hover:text-textPrimary transition-colors"
              >
                {locale === 'en' ? 'ID' : 'EN'}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE NAV (Bawah) */}
      <nav className="md:hidden fixed bottom-0 w-full z-50 bg-background/90 backdrop-blur-lg border-t border-borderLight pb-safe">
        <div className="flex justify-around items-center h-16 px-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.key} href={item.href} className="relative flex flex-col items-center justify-center w-full h-full">
                <span className={`text-[10px] font-medium uppercase tracking-wider transition-colors duration-200 ${isActive ? "text-accent" : "text-textPrimary/50"}`}>
                  {dict.nav[item.key as keyof typeof dict.nav]}
                </span>
                {isActive && (
                  <motion.div 
                    layoutId="navbar-indicator-mobile" 
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-accent rounded-b-full" 
                  />
                )}
              </Link>
            );
          })}
          
          {/* Language Switcher Mobile */}
          <Link 
            href={pathname.replace(`/${locale}`, `/${locale === 'en' ? 'id' : 'en'}`)}
            className="flex flex-col items-center justify-center h-full px-2"
          >
             <span className="text-[10px] font-medium uppercase tracking-wider text-textPrimary/50">
               {locale === 'en' ? 'ID' : 'EN'}
             </span>
          </Link>
        </div>
      </nav>
    </>
  );
}