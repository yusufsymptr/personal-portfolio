"use client";

import { use, useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Locale } from "@/lib/i18n/dictionaries";

// Komponen kecil biar marquee nggak diulang-ulang di tiap kotak — visualnya
// identik dengan yang tadinya cuma ada di kotak Full-stack.
function MarqueeRow({
  items,
  duration = 22,
  reverse = false,
  variant = "default",
}: {
  items: string[];
  duration?: number;
  reverse?: boolean;
  variant?: "default" | "accent" | "outline";
}) {
  const tagClass =
    variant === "accent"
      ? "mx-1.5 px-3 py-1.5 rounded border border-accent/30 group-hover/card:border-background/30 bg-accent/5 group-hover/card:bg-background/20 text-xs font-bold tracking-wide text-textPrimary/90 group-hover/card:text-background transition-colors duration-500 shadow-sm group-hover/card:shadow-none"
      : variant === "outline"
      ? "mx-1.5 px-3 py-1.5 border border-borderLight group-hover/card:border-background/30 text-xs font-bold text-textPrimary group-hover/card:text-background bg-transparent group-hover/card:bg-background/10 transition-colors duration-500"
      : "mx-1.5 px-3 py-1.5 rounded border border-borderLight group-hover/card:border-background/30 text-xs font-bold text-textPrimary group-hover/card:text-background bg-background group-hover/card:bg-background/10 transition-colors duration-500 shadow-sm group-hover/card:shadow-none";

  return (
    <div className="relative w-full overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-background group-hover/card:from-accent to-transparent z-10 transition-colors duration-500" />
      <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-background group-hover/card:from-accent to-transparent z-10 transition-colors duration-500" />
      <motion.div
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
        className="flex whitespace-nowrap w-max"
      >
        {[...items, ...items].map((tag, i) => (
          <span key={i} className={tagClass}>
            {tag}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function Skills({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = use(params);

  const shouldReduceMotion = useReducedMotion();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  const translations = {
    en: {
      map: "CAPABILITY MAP",
      title: "Skills, kept practical.",
      subtitle: "I build the technical product first, ensuring solid logic and architecture, then support it with clear design, planning, and documentation.",
      fullstack: "Full-stack Web Development",
      fullstackDesc: "Websites, dashboards, admin systems, and modern interactive UI.",
      backend: "Backend, API & Database",
      backendDesc: "Server logic, relational storage, and APIs.",
      network: "Networking & Infrastructure",
      networkDesc: "Routing, switching, wireless, and network security protocols.",
      ml: "Machine Learning & AI",
      mlDesc: "Data patterns, models, and AI workflow.",
      mobile: "Mobile Utilities",
      mobileDesc: "Mobile-facing apps and cross-platform UI.",
      delivery: "Project Delivery & Architecture",
      deliveryDesc: "System planning, visual design, and operational docs.",
      archPlan: "Architecture & Planning",
      visual: "Visual & Design"
    },
    id: {
      map: "PETA KAPABILITAS",
      title: "Keahlian Praktis & Terukur.",
      subtitle: "Saya membangun fondasi teknis terlebih dahulu, memastikan logika yang solid, lalu mendukungnya dengan desain, perencanaan, dan dokumentasi yang jelas.",
      fullstack: "Pengembangan Web Full-stack",
      fullstackDesc: "Situs web, dasbor, sistem admin, dan UI interaktif modern.",
      backend: "Backend, API & Basis Data",
      backendDesc: "Logika server, penyimpanan relasional, dan API.",
      network: "Jaringan & Infrastruktur",
      networkDesc: "Routing, switching, nirkabel, dan protokol keamanan jaringan.",
      ml: "Machine Learning & AI",
      mlDesc: "Pola data, pemodelan, dan alur kerja kecerdasan buatan.",
      mobile: "Utilitas Mobile",
      mobileDesc: "Aplikasi seluler dan antarmuka lintas platform.",
      delivery: "Pengiriman Proyek & Arsitektur",
      deliveryDesc: "Perencanaan sistem, desain visual, dan dokumen operasional.",
      archPlan: "Arsitektur & Perencanaan",
      visual: "Visual & Desain"
    }
  };

  const t = translations[locale as keyof typeof translations] || translations.en;

  const webTools1 = ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js"];
  const webTools2 = ["Laravel", "PHP", "Tailwind CSS", "Bootstrap", "Framer Motion"];
  const backendTools = ["Java", "Node.js", "Express", "Supabase", "PostgreSQL", "MySQL", "Prisma", "RESTful API"];
  const networkTools = ["Cisco IOS", "MikroTik RouterOS", "VLAN & STP", "OSPF", "IPv4/IPv6", "WLAN", "Packet Tracer", "Network Security"];
  const mlTools = ["Python", "TensorFlow", "Scikit-Learn", "Pandas", "Jupyter", "OpenAI API"];
  const mobileTools = ["React Native", "Flutter", "Dart", "Expo", "Kotlin"];
  const archPlanTools = ["Mermaid.js", "Draw.io", "Microsoft Project", "Jira", "Notion"];
  const visualTools = ["Figma", "Canva", "UI/UX Layout", "Adobe Illustrator"];

  return (
    <div className="relative min-h-screen group">

      {/* BACKGROUND DASAR (Redup) */}
      <div className="fixed inset-0 z-[-2] bg-[radial-gradient(#E4E2DD_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-80 pointer-events-none" />

      {/* EFEK SENTER */}
      {!shouldReduceMotion && (
        <div
          className="fixed inset-0 z-[-1] bg-[radial-gradient(#3B4A3F_2px,transparent_2px)] [background-size:24px_24px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            WebkitMaskImage: `radial-gradient(circle 450px at ${mousePosition.x}px ${mousePosition.y}px, black 15%, transparent 80%)`,
            maskImage: `radial-gradient(circle 450px at ${mousePosition.x}px ${mousePosition.y}px, black 15%, transparent 80%)`
          }}
        />
      )}

      {/* KONTEN UTAMA */}
      <div className="pt-24 pb-20 px-6 md:px-8 max-w-[1200px] mx-auto relative z-10">

        {/* HEADER HALAMAN */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
              {t.map}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-textPrimary mb-4">
            {t.title}
          </h1>
          <p className="text-textPrimary/70 max-w-2xl text-base md:text-lg leading-relaxed font-medium">
            {t.subtitle}
          </p>
        </motion.div>

        {/* BENTO GRID KREATIF */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >

          {/* 1. FULL-STACK WEB DEVELOPMENT */}
          <div className="md:col-span-3 py-8 rounded-2xl border border-borderLight bg-background hover:bg-accent overflow-hidden relative group/card transition-colors duration-500 cursor-default shadow-sm">
            <div className="px-8 mb-6 relative z-10">
              <h3 className="text-xl md:text-2xl font-bold text-textPrimary group-hover/card:text-background transition-colors duration-500 mb-2">
                {t.fullstack}
              </h3>
              <p className="text-sm text-textPrimary/60 group-hover/card:text-background/80 transition-colors duration-500">
                {t.fullstackDesc}
              </p>
            </div>

            <div className="relative flex flex-col gap-4 w-full">
              <MarqueeRow items={webTools1} duration={25} />
              <MarqueeRow items={webTools2} duration={28} reverse variant="accent" />
            </div>
          </div>

          {/* 2. BACKEND, API & DATABASE (Lebar 2 Kolom) */}
          <div className="md:col-span-2 p-6 md:p-8 rounded-2xl bg-background hover:bg-accent border border-borderLight transition-all duration-500 relative overflow-hidden group/card flex flex-col justify-between cursor-default shadow-sm">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/0 group-hover/card:bg-background/10 blur-[50px] rounded-full transition-colors duration-700"></div>

            <div className="relative z-10">
              <h3 className="text-lg md:text-xl font-bold mb-2 text-textPrimary group-hover/card:text-background transition-colors duration-500">
                {t.backend}
              </h3>
              <p className="text-xs md:text-sm text-textPrimary/60 group-hover/card:text-background/80 transition-colors duration-500 mb-6">
                {t.backendDesc}
              </p>

              <MarqueeRow items={backendTools} duration={22} />
            </div>
          </div>

          {/* 3. MOBILE DEVELOPMENT (Lebar 1 Kolom) */}
          <div className="md:col-span-1 p-6 md:p-8 rounded-2xl bg-background hover:bg-accent border border-borderLight transition-all duration-500 flex flex-col justify-between group/card cursor-default shadow-sm">
            <div className="relative z-10">
              <h3 className="text-lg md:text-xl font-bold text-textPrimary group-hover/card:text-background transition-colors duration-500 mb-2">
                {t.mobile}
              </h3>
              <p className="text-xs text-textPrimary/60 group-hover/card:text-background/80 transition-colors duration-500 mb-6">
                {t.mobileDesc}
              </p>
              <MarqueeRow items={mobileTools} duration={18} />
            </div>
          </div>

          {/* 4. NETWORKING & INFRASTRUCTURE (Lebar 2 Kolom) */}
          <div className="md:col-span-2 p-6 md:p-8 rounded-2xl bg-background hover:bg-accent border border-borderLight transition-all duration-500 relative overflow-hidden group/card flex flex-col justify-between cursor-default shadow-sm">
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/0 group-hover/card:bg-background/10 blur-[50px] rounded-full transition-colors duration-700"></div>

            <div className="relative z-10">
              <h3 className="text-lg md:text-xl font-bold text-textPrimary group-hover/card:text-background transition-colors duration-500 mb-2">
                {t.network}
              </h3>
              <p className="text-xs md:text-sm text-textPrimary/60 group-hover/card:text-background/80 transition-colors duration-500 mb-6">
                {t.networkDesc}
              </p>
              <MarqueeRow items={networkTools} duration={24} reverse variant="accent" />
            </div>
          </div>

          {/* 5. MACHINE LEARNING & AI (Lebar 1 Kolom) */}
          <div className="md:col-span-1 p-6 md:p-8 rounded-2xl bg-background hover:bg-accent border border-borderLight transition-all duration-500 flex flex-col justify-between group/card cursor-default shadow-sm">
            <div className="relative z-10">
              <h3 className="text-lg md:text-xl font-bold text-textPrimary group-hover/card:text-background transition-colors duration-500 mb-2">
                {t.ml}
              </h3>
              <p className="text-xs text-textPrimary/60 group-hover/card:text-background/80 transition-colors duration-500 mb-6">
                {t.mlDesc}
              </p>
              <MarqueeRow items={mlTools} duration={20} />
            </div>
          </div>

          {/* 6. PROJECT DELIVERY */}
          <div className="md:col-span-3 p-6 md:p-8 rounded-2xl bg-background hover:bg-accent border border-borderLight transition-all duration-500 group/card cursor-default shadow-sm">
            <div className="mb-6 relative z-10">
              <h3 className="text-xl md:text-2xl font-bold text-textPrimary group-hover/card:text-background transition-colors duration-500 mb-2">
                {t.delivery}
              </h3>
              <p className="text-sm text-textPrimary/60 group-hover/card:text-background/80 transition-colors duration-500">
                {t.deliveryDesc}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-textPrimary/50 group-hover/card:text-background/60 mb-3 border-b border-borderLight group-hover/card:border-background/30 transition-colors duration-500 pb-2">
                  {t.archPlan}
                </h4>
                <div className="mt-4">
                  <MarqueeRow items={archPlanTools} duration={20} variant="outline" />
                </div>
              </div>

              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-textPrimary/50 group-hover/card:text-background/60 mb-3 border-b border-borderLight group-hover/card:border-background/30 transition-colors duration-500 pb-2">
                  {t.visual}
                </h4>
                <div className="mt-4">
                  <MarqueeRow items={visualTools} duration={18} reverse variant="outline" />
                </div>
              </div>
            </div>
          </div>

        </motion.div>
      </div>
    </div>
  );
}