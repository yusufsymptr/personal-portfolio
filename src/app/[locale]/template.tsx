"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Memori global untuk mengingat halaman terakhir yang dikunjungi
let lastVisitedPage = "";

// Kamus statis untuk animasi transisi agar super cepat (tidak perlu load file eksternal)
const pageTranslations: Record<string, Record<string, string>> = {
  en: {
    home: "HOME",
    about: "ABOUT",
    projects: "PROJECTS",
    skills: "SKILLS",
    contact: "CONTACT",
  },
  id: {
    home: "BERANDA",
    about: "TENTANG",
    projects: "PROYEK",
    skills: "KEAHLIAN",
    contact: "KONTAK",
  },
};

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Memecah URL (/en/about)
  const pathSegments = pathname.split('/').filter(Boolean);
  
  // Ambil bahasa dari URL (misal 'en' atau 'id')
  const locale = pathSegments[0] || 'en';
  const routeKey = pathSegments.slice(1).join('/') || 'home';
  
  // Ambil nama rute mentah (misal 'about')
  const rawPageName = pathSegments.length > 1 ? pathSegments[1] : "home";
  
  // Terjemahkan nama halaman berdasarkan bahasa yang aktif
  const translatedPageName = pageTranslations[locale]?.[rawPageName] || rawPageName.toUpperCase();

  // Jika halaman saat ini SAMA dengan halaman terakhir, berarti kita cuma ganti bahasa
  const isLanguageSwitch = lastVisitedPage === routeKey;

  useEffect(() => {
    // Simpan halaman saat ini ke dalam memori
    lastVisitedPage = routeKey;
  }, [routeKey]);

  // Jika benar cuma ganti bahasa, tampilkan halamannya tanpa animasi tirai
  if (isLanguageSwitch) {
    return <div key="static">{children}</div>;
  }

  // Jika benar-benar pindah halaman, jalankan animasi sapuan mahalnya
  return (
    <div key={pathname}>
      {/* LAPISAN 2: Warna Gelap (Bayangan) */}
      <motion.div
        className="fixed inset-0 z-[100] bg-textPrimary pointer-events-none"
        initial={{ x: "0%" }}
        animate={{ x: "-100%" }}
        transition={{ duration: 0.9, delay: 0.65, ease: [0.76, 0, 0.24, 1] }}
      />

      {/* LAPISAN 1: Warna Hijau Utama */}
      <motion.div
        className="fixed inset-0 z-[101] flex items-center justify-center bg-accent pointer-events-none"
        initial={{ x: "0%" }}
        animate={{ x: "-100%" }}
        transition={{ duration: 0.9, delay: 0.5, ease: [0.76, 0, 0.24, 1] }}
      >
        <motion.h1
          className="text-4xl md:text-6xl font-black uppercase tracking-[0.2em] text-background whitespace-nowrap"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: [0, 1, 0], x: [60, 0, -60] }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {translatedPageName}
        </motion.h1>
      </motion.div>

      {/* KONTEN HALAMAN UTAMA */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.8, ease: [0.76, 0, 0.24, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}