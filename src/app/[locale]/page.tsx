"use client";

import { use } from "react";
import Link from "next/link";
import { motion, useReducedMotion, Variants } from "framer-motion";
import Button from "@/components/ui/Button";
import { getDictionary, Locale } from "@/lib/i18n/dictionaries";

const socialLinks = [
  { label: "GitHub", href: "https://github.com/yusufsymptr", external: true },
  { label: "Instagram", href: "https://www.instagram.com/yusuf_symptr/", external: true },
  { label: "Email", href: "mailto:yusufsymptr03@gmail.com", external: false },
];

const areasOfInterest = [
  { title: "Web Development", subtitle: "React · Laravel" },
  { title: "Machine Learning", subtitle: "Exploring & Learning" },
  { title: "Database & AI", subtitle: "Data · Artificial Intelligence" },
];

const MotionLink = motion(Link);

export default function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = use(params);
  const shouldReduceMotion = useReducedMotion();
  const dict = getDictionary(locale);

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: shouldReduceMotion ? 0 : 0.12 } },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const lineVariants: Variants = {
    hidden: { scaleY: shouldReduceMotion ? 1 : 0 },
    visible: {
      scaleY: 1,
      transition: { duration: shouldReduceMotion ? 0 : 0.8, ease: [0.22, 1, 0.36, 1], delay: shouldReduceMotion ? 0 : 0.3 },
    },
  };

  return (
    <>
      {/* HERO */}
      <section className="relative py-24 md:py-32 px-6 md:px-8">
        <div className="w-full max-w-[1200px] mx-auto grid md:grid-cols-2 gap-8 items-center">
          <motion.div variants={container} initial="hidden" animate="visible">
            {/* Role: label kecil dengan aksen kotak + tracking lebar */}
            <motion.div variants={item} className="flex items-center gap-2 mb-5">
              <span className="w-2 h-2 rounded-[2px] bg-accent" />
              <span className="text-xs md:text-sm font-medium uppercase tracking-[0.12em] text-textPrimary/70">
                {dict.home.role}
              </span>
            </motion.div>

            <motion.h1 variants={item} className="text-[32px] md:text-[48px] font-semibold">
              {dict.home.title}
            </motion.h1>

            <motion.p variants={item} className="mt-6 text-base leading-[1.6] text-textPrimary/80 max-w-[560px]">
              {dict.home.intro}
            </motion.p>

            <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
              <MotionLink
                href={`/${locale}/projects`}
                whileHover={{ opacity: 0.85 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className="px-6 py-3 rounded-[4px] text-base font-medium bg-accent text-background inline-flex items-center justify-center"
              >
                {dict.home.viewProjects}
              </MotionLink>

              <Button
                variant="secondary"
                disabled
                title="CV coming soon"
                className="opacity-50 cursor-not-allowed pointer-events-none"
              >
                {dict.home.viewCV}
              </Button>
            </motion.div>

            <motion.div variants={item} className="mt-12 flex flex-wrap items-center gap-3 text-sm text-textPrimary/60">
              {socialLinks.map((link, index) => (
                <span key={link.label} className="flex items-center gap-3">
                  <motion.a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    whileHover={{ opacity: 0.7 }}
                    transition={{ duration: 0.15 }}
                    className="hover:text-textPrimary transition-colors duration-200"
                  >
                    {link.label}
                  </motion.a>
                  {index < socialLinks.length - 1 && (
                    <span className="text-textPrimary/30">·</span>
                  )}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Divider lines — tumbuh dari atas saat load */}
          <div className="hidden md:block h-full">
            <div className="h-full flex gap-16 justify-end pr-4">
              <motion.div
                variants={lineVariants}
                initial="hidden"
                animate="visible"
                style={{ transformOrigin: "top" }}
                className="w-px h-full bg-borderLight"
              />
              <motion.div
                variants={lineVariants}
                initial="hidden"
                animate="visible"
                style={{ transformOrigin: "top" }}
                className="w-px h-full bg-borderLight"
              />
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <motion.a
          href="#interests"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: shouldReduceMotion ? 0 : 1, duration: 0.5 }}
          className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-textPrimary/40 hover:text-textPrimary/70 transition-colors duration-200"
        >
          <span className="text-[11px] uppercase tracking-[0.1em]">Scroll</span>
          <motion.svg
            animate={shouldReduceMotion ? {} : { y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            width="14" height="14" viewBox="0 0 14 14" fill="none"
          >
            <path d="M2 5L7 10L12 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
        </motion.a>
      </section>

      {/* AREAS OF INTEREST — teaser, detail lengkap ada di About */}
      <motion.section
        id="interests"
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.3, once: true }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="px-6 md:px-8 pb-24 md:pb-32 scroll-mt-24"
      >
        <div className="w-full max-w-[1200px] mx-auto">
          <p className="text-xs uppercase tracking-[0.08em] text-textPrimary/50 mb-6">
            Areas I&apos;m exploring
          </p>
          <div className="grid md:grid-cols-3 gap-x-8 gap-y-6">
            {areasOfInterest.map((area) => (
              <motion.div
                key={area.title}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="border-t border-borderLight hover:border-accent pt-4 transition-colors duration-200"
              >
                <h3 className="text-base font-medium">{area.title}</h3>
                <p className="mt-1 text-sm text-textPrimary/60">{area.subtitle}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </>
  );
}