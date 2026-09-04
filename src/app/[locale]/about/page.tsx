"use client";

import { use, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { getDictionary, Locale } from "@/lib/i18n/dictionaries";
import Tag from "@/components/ui/Tag";

export default function About({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = use(params);
  const shouldReduceMotion = useReducedMotion();
  const dict = getDictionary(locale);

  // Spotlight Grid State
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Menggunakan useEffect untuk melacak mouse di level window agar spotlight tetap 
  // akurat meskipun halaman di-scroll ke bawah
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  const fadeUpVariant: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const listContainerVariant: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: shouldReduceMotion ? 0 : 0.15 }
    }
  };

  return (
    <main className="relative min-h-screen pt-32 pb-24 px-6 md:px-8 group">
      
      {/* Background Spotlight Grid - Fixed agar mencakup seluruh tinggi scroll */}
      <div className="fixed inset-0 z-[-2] bg-[radial-gradient(#E4E2DD_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-80" />
      
      {!shouldReduceMotion && (
        <div 
          className="fixed inset-0 z-[-1] bg-[radial-gradient(#3B4A3F_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"
          style={{
            WebkitMaskImage: `radial-gradient(circle 300px at ${mousePosition.x}px ${mousePosition.y}px, black, transparent)`,
            maskImage: `radial-gradient(circle 300px at ${mousePosition.x}px ${mousePosition.y}px, black, transparent)`
          }}
        />
      )}

      <div className="w-full max-w-[1000px] mx-auto relative z-10">
        
        {/* HEADER & BIO SECTION */}
        <div className="grid md:grid-cols-12 gap-12 md:gap-16 items-center">
          
          {/* Foto Profil */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-5 lg:col-span-4"
          >
            <motion.div 
              whileHover={{ scale: 1.03, rotate: 1 }}
              transition={{ duration: 0.3 }}
              className="relative aspect-[4/5] w-full rounded-lg overflow-hidden bg-background/50 backdrop-blur-sm border border-borderLight"
            >
              <Image 
                src="/images/foto_profile.png" 
                alt={dict.about.title}
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-in-out"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority
              />
            </motion.div>
          </motion.div>

          {/* Bio Teks */}
          <motion.div 
            variants={listContainerVariant}
            initial="hidden"
            animate="visible"
            className="md:col-span-7 lg:col-span-8 flex flex-col justify-center h-full"
          >
            <motion.h1 variants={fadeUpVariant} className="text-3xl md:text-4xl font-semibold mb-6">
              {dict.about.title}
            </motion.h1>
            <motion.p variants={fadeUpVariant} className="text-base md:text-lg leading-[1.7] text-textPrimary/80">
              {dict.about.bio}
            </motion.p>
            
            {/* Tag Eksplorasi */}
            <motion.div variants={fadeUpVariant} className="mt-8">
              <p className="text-xs font-heading uppercase tracking-[0.1em] text-textPrimary/50 mb-4">
                {dict.about.interestsTitle}
              </p>
              <div className="flex flex-wrap gap-2">
                {dict.about.interests.map((interest: string, idx: number) => (
                  <Tag key={idx}>{interest}</Tag>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* DIVIDER */}
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ originX: 0 }}
          className="my-20 h-px bg-borderLight w-full"
        />

        {/* EDUCATION & JOURNEY SECTION */}
        <div className="grid md:grid-cols-2 gap-16">
          
          {/* Education */}
          <motion.section
            variants={listContainerVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.3, once: true }}
          >
            <motion.h2 variants={fadeUpVariant} className="text-sm font-medium uppercase tracking-[0.1em] text-textPrimary/50 mb-8">
              {dict.about.educationTitle}
            </motion.h2>
            <div className="space-y-6">
              {dict.about.education.map((edu: any, idx: number) => (
                <motion.div variants={fadeUpVariant} key={idx} className="flex flex-col border-l-2 border-accent pl-4 bg-background/40 backdrop-blur-sm p-3 rounded-r-lg">
                  <span className="text-lg font-medium">{edu.school}</span>
                  <span className="text-textPrimary/70 mt-1">{edu.degree}</span>
                  <span className="text-sm text-textPrimary/50 mt-2 font-heading tracking-wide">{edu.year}</span>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Journey */}
          <motion.section
            variants={listContainerVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.3, once: true }}
          >
            <motion.h2 variants={fadeUpVariant} className="text-sm font-medium uppercase tracking-[0.1em] text-textPrimary/50 mb-8">
              {dict.about.journeyTitle}
            </motion.h2>
            <div className="relative border-l border-borderLight ml-[5px] space-y-10">
              {dict.about.journey.map((item: any, idx: number) => (
                <motion.div variants={fadeUpVariant} key={idx} className="relative pl-8">
                  {/* Timeline dot */}
                  <div className="absolute w-3 h-3 bg-background border-2 border-accent rounded-full -left-[6.5px] top-1.5" />
                  
                  <span className="text-xs font-heading text-textPrimary/50 uppercase tracking-wider block mb-1">
                    {item.year}
                  </span>
                  <h3 className="text-lg font-medium">{item.title}</h3>
                  <p className="text-textPrimary/70 mt-2 text-sm leading-relaxed bg-background/40 backdrop-blur-sm p-2 -ml-2 rounded-lg">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.section>

        </div>
      </div>
    </main>
  );
}