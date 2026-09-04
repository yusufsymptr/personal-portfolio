"use client";

import { use, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, Variants } from "framer-motion";
import Button from "@/components/ui/Button";
import { getDictionary, Locale } from "@/lib/i18n/dictionaries";

const socialLinks = [
  { label: "GitHub", href: "https://github.com/yusufsymptr", external: true },
  { label: "Instagram", href: "https://www.instagram.com/yusuf_symptr/", external: true },
  { label: "Email", href: "mailto:yusufsymptr03@gmail.com", external: false },
];

const MotionLink = motion(Link);

export default function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = use(params);
  const shouldReduceMotion = useReducedMotion();
  const dict = getDictionary(locale);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState({ x: 15, y: -15 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    setMousePosition({ x: mouseX, y: mouseY });

    if (!shouldReduceMotion) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotX = ((mouseY - centerY) / centerY) * -35; 
      const rotY = ((mouseX - centerX) / centerX) * 35;
      setRotation({ x: rotX, y: rotY });
    }
  };

  const handleMouseLeave = () => {
    if (!shouldReduceMotion) {
      setRotation({ x: 15, y: -15 });
    }
  };

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

  return (
    <>
      {/* Menggunakan kembali struktur asli Anda yang vertikalnya sudah pas */}
      <section 
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative flex flex-col justify-center pt-32 pb-20 px-6 md:px-8 overflow-hidden group"
      >
        {/* Layer 1: Grid dasar */}
        <div className="absolute inset-0 z-[-2] bg-[radial-gradient(#E4E2DD_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-80" />
        
        {/* Layer 2: Grid Spotlight */}
        {!shouldReduceMotion && (
          <div 
            className="absolute inset-0 z-[-1] bg-[radial-gradient(#3B4A3F_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"
            style={{
              WebkitMaskImage: `radial-gradient(circle 250px at ${mousePosition.x}px ${mousePosition.y}px, black, transparent)`,
              maskImage: `radial-gradient(circle 250px at ${mousePosition.x}px ${mousePosition.y}px, black, transparent)`
            }}
          />
        )}

        <div className="w-full max-w-[1200px] mx-auto grid md:grid-cols-12 gap-8 items-center">
          
          {/* Kiri: Teks */}
          <motion.div variants={container} initial="hidden" animate="visible" className="md:col-span-7 lg:col-span-8 z-10 pointer-events-auto">
            <motion.div variants={item} className="flex items-center gap-2 mb-5">
              <span className="w-2 h-2 rounded-[2px] bg-accent" />
              <span className="text-xs md:text-sm font-medium uppercase tracking-[0.12em] text-textPrimary/70">
                {dict.home.role}
              </span>
            </motion.div>

            <motion.h1 variants={item} className="text-[40px] md:text-[64px] font-semibold leading-[1.05] tracking-tight">
              {dict.home.title}
            </motion.h1>

            <motion.p variants={item} className="mt-6 text-base md:text-lg leading-[1.6] text-textPrimary/80 max-w-[560px]">
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
                title={dict.home.cvUnavailable || "CV coming soon"}
                className="opacity-50 cursor-not-allowed pointer-events-none bg-background/50 backdrop-blur-sm"
              >
                {dict.home.viewCV}
              </Button>
            </motion.div>

            <motion.div variants={item} className="mt-12 flex flex-wrap items-center gap-3 text-sm text-textPrimary/60">
              {socialLinks.map((link, idx) => (
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
                  {idx < socialLinks.length - 1 && (
                    <span className="text-textPrimary/30">·</span>
                  )}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Kanan: Kubus 3D - Diperbesar (w-64 h-64) dan posisi disesuaikan */}
          <div className="hidden md:flex md:col-span-5 lg:col-span-4 justify-center lg:justify-end items-center pointer-events-none">
            <div className="relative w-64 h-64 [perspective:1200px]">
              <motion.div
                animate={{ rotateX: rotation.x, rotateY: rotation.y }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="w-full h-full relative"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Wajah-wajah Kubus - Teks SYS dihapus, jarak Z diperbesar ke 128px */}
                <div className="absolute inset-0 border-2 border-accent/40 bg-accent/5 backdrop-blur-[2px] [transform:translateZ(128px)]" />
                <div className="absolute inset-0 border-2 border-accent/40 bg-accent/5 backdrop-blur-[2px] [transform:rotateY(180deg)_translateZ(128px)]" />
                <div className="absolute inset-0 border-2 border-accent/40 bg-accent/5 backdrop-blur-[2px] [transform:rotateY(90deg)_translateZ(128px)]" />
                <div className="absolute inset-0 border-2 border-accent/40 bg-accent/5 backdrop-blur-[2px] [transform:rotateY(-90deg)_translateZ(128px)]" />
                <div className="absolute inset-0 border-2 border-accent/40 bg-accent/5 backdrop-blur-[2px] [transform:rotateX(90deg)_translateZ(128px)]" />
                <div className="absolute inset-0 border-2 border-accent/40 bg-accent/5 backdrop-blur-[2px] [transform:rotateX(-90deg)_translateZ(128px)]" />
                
                {/* Inti (Core) di dalam kubus */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-accent/80 rounded-full blur-[10px]" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="relative flex overflow-x-hidden bg-accent text-background py-4 md:py-5 border-y border-borderLight">
        <motion.div
          animate={shouldReduceMotion ? {} : { x: ["0%", "-50%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap items-center"
        >
          {[...dict.home.marqueeItems, ...dict.home.marqueeItems].map((item, index) => (
            <div key={index} className="flex items-center">
              <span className="mx-6 text-sm md:text-base font-medium tracking-wide uppercase">
                {item}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-background/50 mx-2" />
            </div>
          ))}
        </motion.div>
      </section>
    </>
  );
}