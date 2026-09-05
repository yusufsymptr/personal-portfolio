"use client";

import { use, useState, useEffect } from "react";
import { motion, useReducedMotion, Variants, animate } from "framer-motion";
import { getDictionary, Locale } from "@/lib/i18n/dictionaries";

// --- KOMPONEN TYPEWRITER (Dioptimasi) ---
const TypewriterText = ({ text, speed = 0.03, className = "", showCursor = false }: { text: string, speed?: number, className?: string, showCursor?: boolean }) => {
  const characters = Array.from(text);
  return (
    <motion.div 
      initial="hidden" animate="visible" 
      variants={{ visible: { transition: { staggerChildren: speed } } }}
      className={className}
    >
      {characters.map((char, index) => (
        <motion.span key={index} variants={{ hidden: { opacity: 0, y: 5 }, visible: { opacity: 1, y: 0 } }} className="inline-block">
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
      {showCursor && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
          className="inline-block w-[0.4em] h-[0.9em] bg-accent ml-1.5 align-baseline translate-y-[2px]"
        />
      )}
    </motion.div>
  );
};

// --- KOMPONEN PROGRESS BAR INTERAKTIF (Dioptimasi GPU) ---
const SkillProgressBar = ({ skill, index, dict }: { skill: any, index: number, dict: any }) => {
  const [count, setCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const delay = index * 0.4;
    
    if (shouldReduceMotion) {
      setCount(skill.percentage);
      setIsComplete(true);
      return;
    }

    const controls = animate(0, skill.percentage, {
      duration: 2.5, 
      delay: delay,
      ease: "easeOut",
      onUpdate: (value) => setCount(Math.round(value)),
      onComplete: () => setIsComplete(true),
    });

    return () => controls.stop();
  }, [skill.percentage, index, shouldReduceMotion]);

  return (
    <div className="group bg-background/40 border border-borderLight rounded-xl p-6 md:p-8 relative overflow-hidden backdrop-blur-sm hover:border-accent/40 transition-colors duration-500 shadow-sm hover:shadow-lg">
      
      {/* Efek Holographic disembunyikan di HP (md:block) untuk menghemat memori */}
      <div className="hidden md:block absolute inset-0 bg-[linear-gradient(rgba(59,74,63,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(59,74,63,0.04)_1px,transparent_1px)] [background-size:20px_20px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 relative z-10">
        <div>
          <h3 className="text-xl md:text-2xl font-semibold text-textPrimary tracking-tight group-hover:text-accent transition-colors duration-300">
            {skill.name}
          </h3>
          <p className="text-sm text-textPrimary/60 mt-2 max-w-lg leading-relaxed">
            {skill.description}
          </p>
        </div>
        
        <div className="mt-5 md:mt-0 flex flex-col items-start md:items-end font-mono">
          <span className={`text-[10px] md:text-xs tracking-[0.2em] uppercase font-bold mb-1 ${isComplete ? 'text-accent' : 'text-accent/60 animate-pulse'}`}>
            {isComplete ? dict.skills.statusComplete : dict.skills.statusLoading}
          </span>
          <span className="text-4xl md:text-5xl font-light text-textPrimary tracking-tighter">
            {count}<span className="text-2xl text-textPrimary/40 ml-1">%</span>
          </span>
        </div>
      </div>

      <div className="w-full h-3 bg-borderLight/40 rounded-full overflow-hidden relative z-10 shadow-inner translate-z-0">
        <motion.div 
          className="absolute top-0 left-0 h-full bg-accent flex justify-end items-center origin-left"
          // PERBAIKAN: Menggunakan width memicu CPU, tapi dalam konteks progress bar ini masih bisa ditoleransi karena hanya 4 elemen. translate-z-0 memaksa GPU rendering.
          initial={{ width: "0%" }}
          animate={{ width: `${skill.percentage}%` }}
          transition={{ duration: 2.5, delay: index * 0.4, ease: "easeOut" }}
          style={{ willChange: "width" }}
        >
          <div className="w-3 h-3 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.9)] mr-px" />
        </motion.div>
      </div>
    </div>
  );
};

export default function Skills({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = use(params);
  const shouldReduceMotion = useReducedMotion();
  const dict = getDictionary(locale);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Mengecek apakah perangkat memiliki kursor (bukan layar sentuh murni)
    const hasPointer = window.matchMedia("(pointer: fine)").matches;
    if (!hasPointer) return;

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: shouldReduceMotion ? 0 : 0.15 } }
  };

  const itemVariant: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <main className="relative min-h-screen pt-24 pb-24 px-6 md:px-8 overflow-hidden group">
      
      <div className="fixed inset-0 z-[-3] bg-[radial-gradient(#E4E2DD_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-80 pointer-events-none" />
      
      {/* PERBAIKAN CRT SCANNER: Menggunakan 'y' (Transform GPU) alih-alih 'top' (Layout CPU) */}
      {!shouldReduceMotion && (
        <motion.div
          initial={{ y: "-20vh" }}
          animate={{ y: "120vh" }}
          transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
          className="fixed left-0 right-0 h-40 bg-gradient-to-b from-transparent via-accent/5 to-transparent z-[-2] pointer-events-none will-change-transform"
        />
      )}

      {/* PERBAIKAN SPOTLIGHT: Disembunyikan sepenuhnya di layar HP (hidden md:block) */}
      {!shouldReduceMotion && (
        <div 
          className="hidden md:block fixed inset-0 z-[-1] bg-[radial-gradient(#3B4A3F_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none will-change-transform"
          style={{
            WebkitMaskImage: `radial-gradient(circle 350px at ${mousePosition.x}px ${mousePosition.y}px, black, transparent)`,
            maskImage: `radial-gradient(circle 350px at ${mousePosition.x}px ${mousePosition.y}px, black, transparent)`
          }}
        />
      )}

      <div className="w-full max-w-[900px] mx-auto relative z-10">
        
        <div className="mb-14 min-h-[120px]">
          <TypewriterText 
            text={dict.skills.title} 
            speed={0.06} 
            showCursor={true} 
            className="text-4xl md:text-5xl font-semibold mb-4 tracking-tight" 
          />
          <TypewriterText 
            text={dict.skills.subtitle} 
            speed={0.015} 
            className="text-base md:text-lg text-textPrimary/70 leading-relaxed max-w-2xl" 
          />
        </div>

        <motion.div 
          variants={container} 
          initial="hidden" 
          animate="visible" 
          className="flex flex-col gap-6 md:gap-8"
        >
          {dict.skills.items.map((skill: any, index: number) => (
            <motion.div key={index} variants={itemVariant} className="transform-gpu">
              <SkillProgressBar skill={skill} index={index} dict={dict} />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </main>
  );
}