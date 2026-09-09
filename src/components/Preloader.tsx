"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const greetings = [
  "Hello", 
  "Hola", 
  "Bonjour", 
  "Ciao", 
  "こんにちは", 
  "안녕하세요", 
  "Halo"
];

export default function Preloader() {
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // 1. Cek apakah preloader sudah pernah jalan di sesi ini
  useEffect(() => {
    setIsMounted(true);
    const hasPlayed = sessionStorage.getItem("preloaderPlayed");
    if (!hasPlayed) {
      setShow(true); // Putar jika belum pernah
    }
  }, []);

  // 2. Logika animasi pemutaran
  useEffect(() => {
    if (!show) return;

    if (index === greetings.length - 1) {
      const finishTimer = setTimeout(() => {
        setShow(false);
        // 3. Simpan memori ke browser bahwa animasi sudah selesai
        sessionStorage.setItem("preloaderPlayed", "true");
      }, 800);
      return () => clearTimeout(finishTimer);
    }
    
    const timer = setTimeout(() => {
      setIndex(index + 1);
    }, 180);
    
    return () => clearTimeout(timer);
  }, [index, show]);

  // Mencegah error hydration di Next.js saat merender sessionStorage
  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-accent pointer-events-none"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex items-center gap-4 text-background">
            <span className="w-2 h-2 rounded-full bg-background" />
            <h1 className="text-3xl md:text-5xl font-bold tracking-widest uppercase">
              {greetings[index]}
            </h1>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}