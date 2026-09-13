"use client";

import { use, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, Variants } from "framer-motion";
import Button from "@/components/ui/Button";
import { getDictionary, Locale } from "@/lib/i18n/dictionaries";

const socialIcons = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/yusuf-syamputra-6b66a5428/",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle>
      </svg>
    )
  },
  {
    name: "GitHub",
    url: "https://github.com/yusufsymptr",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.26c3-.3 6-2 6-7a5.2 5.2 0 0 0-1.38-3.41 5.2 5.2 0 0 0-.12-3.41s-1.11-.36-3.6 1.34a12.8 12.8 0 0 0-7 0C5.3 1.25 4.2 1.6 4.2 1.6a5.2 5.2 0 0 0-.12 3.41A5.2 5.2 0 0 0 2.7 8.44c0 4.9 3 6.7 6 7A4.8 4.8 0 0 0 8 18.6V22"></path>
      </svg>
    )
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/yusuf_symptr/",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    )
  },
  {
    name: "Email",
    url: "mailto:yusufsymptr03@gmail.com",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
      </svg>
    )
  }
];

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

  const marqueeData = dict.home?.marqueeItems || [];

  return (
    <div className="flex flex-col flex-1 w-full min-h-[90vh] md:min-h-[calc(100vh-5rem)]">
      <section 
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative flex flex-1 flex-col justify-center pt-16 md:pt-10 pb-32 md:pb-10 px-6 md:px-8 overflow-hidden group"
      >
        {/* Background Dasar Redup */}
        <div className="absolute inset-0 z-[-2] bg-[radial-gradient(#E4E2DD_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-80 pointer-events-none" />
        
        {/* Efek Senter yang Diperkuat */}
        {!shouldReduceMotion && (
          <div 
            className="absolute inset-0 z-[-1] bg-[radial-gradient(#3B4A3F_2px,transparent_2px)] [background-size:24px_24px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              WebkitMaskImage: `radial-gradient(circle 450px at ${mousePosition.x}px ${mousePosition.y}px, black 15%, transparent 80%)`,
              maskImage: `radial-gradient(circle 450px at ${mousePosition.x}px ${mousePosition.y}px, black 15%, transparent 80%)`
            }}
          />
        )}

        <div className="w-full max-w-[1200px] mx-auto grid md:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Bagian Kiri: Teks & Tombol */}
          <motion.div 
            variants={container} 
            initial="hidden" 
            animate="visible" 
            className="md:col-span-7 lg:col-span-8 z-10 pointer-events-auto"
          >
            <motion.div variants={item} className="flex items-center gap-2 mb-5">
              <span className="w-2 h-2 rounded-[2px] bg-accent" />
              <span className="text-xs md:text-sm font-medium uppercase tracking-[0.12em] text-textPrimary/70">
                {dict.home.role}
              </span>
            </motion.div>

            <motion.h1 variants={item} className="text-[40px] md:text-[64px] font-semibold leading-[1.05] tracking-tight">
              {dict.home.title}
            </motion.h1>

            <motion.p variants={item} className="mt-6 text-base md:text-lg leading-[1.6] text-textPrimary/90 max-w-[560px] bg-background/60 backdrop-blur-sm py-2 px-3 -mx-3 rounded-lg border border-borderLight/30">
              {dict.home.intro}
            </motion.p>

            {/* BARIS TOMBOL UTAMA */}
            <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
              <motion.div whileHover={{ opacity: 0.85 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.15 }}>
                <Link
                  href={`/${locale}/projects`}
                  className="px-6 py-3 rounded-[4px] text-base font-medium bg-accent text-background inline-flex items-center justify-center block"
                >
                  {dict.home.viewProjects}
                </Link>
              </motion.div>

              <Button
                variant="secondary"
                disabled
                title={dict.home.cvUnavailable || "CV coming soon"}
                className="opacity-50 cursor-not-allowed pointer-events-none bg-background/50 backdrop-blur-sm"
              >
                {dict.home.viewCV}
              </Button>
            </motion.div>

            {/* BARIS IKON SOSIAL */}
            <motion.div variants={item} className="mt-6 flex flex-wrap items-center gap-3">
              {socialIcons.map((social) => (
                <a 
                  key={social.name}
                  href={social.url}
                  target={social.name === "Email" ? undefined : "_blank"}
                  rel={social.name === "Email" ? undefined : "noopener noreferrer"}
                  className="flex items-center justify-center w-[48px] h-[48px] border border-borderLight rounded-[4px] text-textPrimary/70 hover:border-accent hover:text-accent hover:bg-accent/10 bg-background/80 backdrop-blur-sm transition-all duration-300 group"
                  title={social.name}
                >
                  <div className="transform group-hover:scale-110 transition-transform duration-300">
                    {social.icon}
                  </div>
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Bagian Kanan: Kubus 3D */}
          <div className="hidden md:flex md:col-span-5 lg:col-span-4 justify-center lg:justify-end items-center pointer-events-none">
            <div className="relative w-64 h-64 [perspective:1200px]">
              <motion.div
                animate={{ rotateX: rotation.x, rotateY: rotation.y }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="w-full h-full relative"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="absolute inset-0 border-2 border-accent/40 bg-accent/5 backdrop-blur-[2px] [transform:translateZ(128px)]" />
                <div className="absolute inset-0 border-2 border-accent/40 bg-accent/5 backdrop-blur-[2px] [transform:rotateY(180deg)_translateZ(128px)]" />
                <div className="absolute inset-0 border-2 border-accent/40 bg-accent/5 backdrop-blur-[2px] [transform:rotateY(90deg)_translateZ(128px)]" />
                <div className="absolute inset-0 border-2 border-accent/40 bg-accent/5 backdrop-blur-[2px] [transform:rotateY(-90deg)_translateZ(128px)]" />
                <div className="absolute inset-0 border-2 border-accent/40 bg-accent/5 backdrop-blur-[2px] [transform:rotateX(90deg)_translateZ(128px)]" />
                <div className="absolute inset-0 border-2 border-accent/40 bg-accent/5 backdrop-blur-[2px] [transform:rotateX(-90deg)_translateZ(128px)]" />
                
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-accent/80 rounded-full blur-[10px]" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="relative flex shrink-0 overflow-x-hidden bg-accent text-background py-4 md:py-5 border-y border-borderLight mt-auto mb-3 md:mb-0">
        <motion.div
          animate={shouldReduceMotion ? {} : { x: ["0%", "-50%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap items-center"
        >
          {[...marqueeData, ...marqueeData].map((item, index) => (
            <div key={index} className="flex items-center">
              <span className="mx-6 text-sm md:text-base font-medium tracking-wide uppercase">
                {item}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-background/50 mx-2" />
            </div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}