"use client";

import { use, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion, Variants } from "framer-motion";
import { getDictionary, Locale } from "@/lib/i18n/dictionaries";
import Tag from "@/components/ui/Tag";

// Komponen Kartu Proyek
const ProjectCard = ({ project, locale }: { project: any, locale: Locale }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Validasi ketat: pastikan images ada dan merupakan array dengan lebih dari 1 item
    if (Array.isArray(project.images) && project.images.length > 1) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % project.images.length);
      }, 3500);
      return () => clearInterval(timer);
    }
  }, [project.images]);

  // Fallback super aman: Cek array 'images' baru -> cek string 'image' lama -> fallback gambar default
  const imageSrc = Array.isArray(project.images) && project.images.length > 0
    ? project.images[currentIndex]
    : (project.image || "/images/nyamaw.png");

  return (
    <Link href={`/${locale}/projects/${project.id}`} className="group block h-full">
      <div className="flex flex-col h-full bg-background/50 border border-borderLight rounded-xl overflow-hidden hover:border-accent/40 transition-colors duration-300 backdrop-blur-sm relative z-10">
        
        {/* Slideshow Container */}
        <div className="relative aspect-video w-full overflow-hidden bg-borderLight/30">
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
        </div>

        {/* Content Container */}
        <div className="p-6 flex flex-col flex-grow">
          <h2 className="text-xl font-medium mb-3 group-hover:text-accent transition-colors duration-300">
            {project.title}
          </h2>
          <p className="text-sm text-textPrimary/70 leading-relaxed mb-6 flex-grow">
            {project.description}
          </p>
          
          {/* Tags (dengan opsional chaining '?' untuk jaga-jaga) */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.tags?.map((tag: string, idx: number) => (
              <Tag key={idx}>{tag}</Tag>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default function Projects({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = use(params);
  const shouldReduceMotion = useReducedMotion();
  const dict = getDictionary(locale);

  // Spotlight State
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
      
      {/* Background Grid & Spotlight */}
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
        
        {/* Header Section */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={container}
          className="max-w-2xl mb-12"
        >
          <motion.h1 variants={itemVariant} className="text-3xl md:text-4xl font-semibold mb-4">
            {dict.projects.title}
          </motion.h1>
          <motion.p variants={itemVariant} className="text-base md:text-lg text-textPrimary/70 leading-relaxed">
            {dict.projects.subtitle}
          </motion.p>
        </motion.div>

        {/* Project Grid */}
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