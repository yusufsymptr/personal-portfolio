"use client";

import { use, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { getDictionary, Locale } from "@/lib/i18n/dictionaries";
import Tag from "@/components/ui/Tag";

export default function ProjectDetail({ params }: { params: Promise<{ locale: Locale, id: string }> }) {
  const { locale, id } = use(params);
  const shouldReduceMotion = useReducedMotion();
  const dict = getDictionary(locale);

  const project = dict.projects.items.find((item: any) => item.id === id);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  if (!project) {
    notFound();
  }

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
    // PERBAIKAN: pt-32 diubah menjadi pt-24 agar tidak terlalu ke bawah
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

      <div className="w-full max-w-[1000px] mx-auto relative z-10">
        
        <motion.div variants={container} initial="hidden" animate="visible">
          
          {/* Tombol Back */}
          <motion.div variants={itemVariant} className="mb-10 mt-4">
            <Link 
              href={`/${locale}/projects`}
              className="inline-flex items-center text-sm font-medium text-textPrimary/60 hover:text-accent transition-colors duration-200"
            >
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              {locale === 'en' ? 'Back to Projects' : 'Kembali ke Proyek'}
            </Link>
          </motion.div>

          {/* Header Proyek */}
          <motion.div variants={itemVariant} className="mb-12">
            <h1 className="text-4xl md:text-5xl font-semibold mb-6 tracking-tight">
              {project.title}
            </h1>
            <div className="flex flex-wrap gap-3 mb-8">
              {project.tags?.map((tag: string, idx: number) => (
                <Tag key={idx}>{tag}</Tag>
              ))}
            </div>
            <p className="text-lg text-textPrimary/80 leading-relaxed max-w-3xl">
              {project.description}
            </p>
          </motion.div>

          {/* Gambar Utama (Fallback dengan pengecekan aman) */}
          <motion.div variants={itemVariant} className="relative aspect-video w-full rounded-2xl overflow-hidden border border-borderLight shadow-lg mb-12 bg-background/50">
            <Image 
              src={project.images[0] || "/images/unity.png"} 
              alt={`${project.title} main preview`}
              fill
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1000px"
              priority
            />
          </motion.div>

          {/* Galeri Gambar */}
          {project.images && project.images.length > 1 && (
            <motion.div variants={itemVariant}>
              <h3 className="text-xl font-medium mb-6">
                {locale === 'en' ? 'Project Gallery' : 'Galeri Proyek'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.images.slice(1).map((imgSrc: string, idx: number) => (
                  <div key={idx} className="relative aspect-video w-full rounded-xl overflow-hidden border border-borderLight/50 shadow-sm bg-background/30 hover:border-accent/30 transition-colors">
                    <Image 
                      src={imgSrc} 
                      alt={`${project.title} gallery image ${idx + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          )}

        </motion.div>
      </div>
    </main>
  );
}