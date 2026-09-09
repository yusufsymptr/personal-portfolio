"use client";

import { use, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { getDictionary, Locale } from "@/lib/i18n/dictionaries";
import Tag from "@/components/ui/Tag";
import { supabase } from "@/lib/supabase/client";
import ViewCounter from "@/components/ui/ViewCounter";

export default function ProjectDetail({ params }: { params: Promise<{ locale: Locale, id: string }> }) {
  const { locale, id } = use(params);
  const shouldReduceMotion = useReducedMotion();
  const dict = getDictionary(locale);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // State untuk menampung data dari Supabase
  const [project, setProject] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Efek Senter Background
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  // Fetching Data spesifik berdasarkan ID dari URL
  useEffect(() => {
    const fetchProjectDetail = async () => {
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .eq("id", id)
          .single(); // Ambil hanya 1 baris yang ID-nya cocok

        if (error) throw error;
        setProject(data);
      } catch (error) {
        console.error("Error fetching project details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjectDetail();
  }, [id]);

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: shouldReduceMotion ? 0 : 0.15, delayChildren: 0.2 } }
  };

  const itemVariant: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  // Jika loading selesai tapi data tidak ada (URL salah/asal)
  if (!isLoading && !project) {
    notFound();
  }

  return (
    <main className="relative min-h-screen pt-24 pb-24 px-6 md:px-8 group">
      
      <div className="fixed inset-0 z-[-2] bg-[radial-gradient(#E4E2DD_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-80" />
      
      {!shouldReduceMotion && (
        <div 
          className="fixed inset-0 z-[-1] bg-[radial-gradient(#3B4A3F_2px,transparent_2px)] [background-size:24px_24px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            WebkitMaskImage: `radial-gradient(circle 450px at ${mousePosition.x}px ${mousePosition.y}px, black 15%, transparent 80%)`,
            maskImage: `radial-gradient(circle 450px at ${mousePosition.x}px ${mousePosition.y}px, black 15%, transparent 80%)`
          }}
        />
      )}

      <div className="w-full max-w-[1000px] mx-auto relative z-10">
        
        {isLoading ? (
          // SKELETON LOADING (Biar tidak nge-blank saat nembak Supabase)
          <div className="animate-pulse mt-4">
            <div className="h-4 w-32 bg-textPrimary/10 rounded mb-10" />
            <div className="h-12 w-3/4 bg-textPrimary/10 rounded mb-6" />
            <div className="h-6 w-24 bg-textPrimary/10 rounded mb-8" />
            <div className="h-4 w-full bg-textPrimary/10 rounded mb-2" />
            <div className="h-4 w-5/6 bg-textPrimary/10 rounded mb-12" />
            <div className="aspect-video w-full rounded-2xl bg-textPrimary/5" />
          </div>
        ) : (
          // KONTEN ASLI JIKA DATA SUDAH TERSEDIA
          <motion.div variants={container} initial="hidden" animate="visible">
            
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

            <motion.div variants={itemVariant} className="mb-12">
              <motion.h1 
                layoutId={`project-title-${project.id}`}
                className="text-4xl md:text-5xl font-semibold mb-6 tracking-tight"
              >
                {project.title}
              </motion.h1>

              {/* FITUR VIEW COUNTER MENYALA DI SINI */}
              <div className="mb-6">
                <ViewCounter slug={project.id} />
              </div>
              
              <div className="flex flex-wrap gap-3 mb-8">
                {project.tags?.map((tag: string, idx: number) => (
                  <Tag key={idx}>{tag}</Tag>
                ))}
              </div>
              
              <p className="text-lg text-textPrimary/80 leading-relaxed max-w-3xl">
                {project.description}
              </p>
            </motion.div>

            <motion.div 
              layoutId={`project-image-${project.id}`}
              className="relative aspect-video w-full rounded-2xl overflow-hidden border border-borderLight shadow-lg mb-12 bg-background/50"
            >
              <Image 
                src={project.images && project.images.length > 0 ? project.images[0] : "/images/unity.png"} 
                alt={`${project.title} main preview`}
                fill
                className="object-cover"
                sizes="(max-width: 1200px) 100vw, 1000px"
                priority
              />
            </motion.div>

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
        )}
      </div>
    </main>
  );
}