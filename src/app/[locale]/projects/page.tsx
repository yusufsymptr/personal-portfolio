"use client";

import { use, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion, Variants, useMotionTemplate, useMotionValue } from "framer-motion";
import { getDictionary, Locale } from "@/lib/i18n/dictionaries";
import Tag from "@/components/ui/Tag";

// --- KOMPONEN EFEK TYPEWRITER HALUS ---
const TypewriterText = ({ text, speed = 0.03, className = "" }: { text: string, speed?: number, className?: string }) => {
  const characters = Array.from(text);
  return (
    <motion.div 
      initial="hidden" 
      animate="visible" 
      variants={{
        visible: { transition: { staggerChildren: speed } }
      }}
      className={className}
    >
      {characters.map((char, index) => (
        <motion.span
          key={index}
          variants={{
            hidden: { opacity: 0, y: 5 },
            visible: { opacity: 1, y: 0 }
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
};

// --- KOMPONEN KARTU DENGAN GLOWING BORDER & MORPH ID ---
const ProjectCard = ({ project, locale }: { project: any, locale: Locale }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // State untuk melacak kursor (Glowing Border)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  useEffect(() => {
    if (Array.isArray(project.images) && project.images.length > 1) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % project.images.length);
      }, 3500);
      return () => clearInterval(timer);
    }
  }, [project.images]);

  const imageSrc = Array.isArray(project.images) && project.images.length > 0
    ? project.images[currentIndex]
    : (project.image || "/images/unity.png");

  return (
    <Link href={`/${locale}/projects/${project.id}`} className="group block h-full">
      {/* 
        layoutId untuk Opsi 1 (Shared Layout Morph). 
        Ini akan meleburkan kartu menjadi background detail page
      */}
      <motion.div 
        layoutId={`project-container-${project.id}`}
        onMouseMove={handleMouseMove}
        className="relative flex flex-col h-full bg-background/50 border border-borderLight rounded-xl overflow-hidden transition-colors duration-500 backdrop-blur-sm z-10"
      >
        {/* Opsi 3: Magic Glowing Border - Muncul saat di-hover dan mengikuti kursor */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100 z-20"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                400px circle at ${mouseX}px ${mouseY}px,
                rgba(59, 74, 63, 0.15),
                transparent 80%
              )
            `,
          }}
        />
        
        {/* Slideshow Container (Dengan layoutId terpisah untuk gambar) */}
        <motion.div 
          layoutId={`project-image-${project.id}`}
          className="relative aspect-video w-full overflow-hidden bg-borderLight/30 z-10"
        >
          <AnimatePresence mode="popLayout">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image 
                src={imageSrc}
                alt={`${project.title} preview`}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Content Container */}
        <div className="p-6 flex flex-col flex-grow z-10">
          <motion.h2 
            layoutId={`project-title-${project.id}`}
            className="text-xl font-medium mb-3 group-hover:text-accent transition-colors duration-300"
          >
            {project.title}
          </motion.h2>
          <p className="text-sm text-textPrimary/70 leading-relaxed mb-6 flex-grow">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.tags?.map((tag: string, idx: number) => (
              <Tag key={idx}>{tag}</Tag>
            ))}
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default function Projects({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = use(params);
  const shouldReduceMotion = useReducedMotion();
  const dict = getDictionary(locale);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
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
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <main className="relative min-h-screen pt-24 pb-24 px-6 md:px-8 group">
      
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

      <div className="w-full max-w-[1200px] mx-auto relative z-10">
        
        <div className="max-w-2xl mb-12 min-h-[120px]">
          {/* Teks muncul seperti diketik secara halus */}
          <TypewriterText 
            text={dict.projects.title} 
            speed={0.06}
            className="text-3xl md:text-4xl font-semibold mb-4" 
          />
          {/* Deskripsi diketik lebih cepat agar tidak menunggu lama */}
          <TypewriterText 
            text={dict.projects.subtitle} 
            speed={0.015}
            className="text-base md:text-lg text-textPrimary/70 leading-relaxed inline-block" 
          />
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10"
        >
          {dict.projects.items.map((project: any) => (
            <motion.div key={project.id} variants={itemVariant}>
              <ProjectCard project={project} locale={locale} />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </main>
  );
}