"use client";

import { use, useState, useEffect } from "react";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { getDictionary, Locale } from "@/lib/i18n/dictionaries";

const TypewriterText = ({ text, speed = 0.03, className = "" }: { text: string, speed?: number, className?: string }) => {
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
    </motion.div>
  );
};

export default function Contact({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = use(params);
  const shouldReduceMotion = useReducedMotion();
  const dict = getDictionary(locale);
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent">("idle");

  useEffect(() => {
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
    visible: { transition: { staggerChildren: shouldReduceMotion ? 0 : 0.1 } }
  };

  const itemVariant: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("sending");
    // Simulasi pengiriman pesan selama 1.5 detik
    setTimeout(() => {
      setFormStatus("sent");
      // Reset form status setelah 3 detik
      setTimeout(() => setFormStatus("idle"), 3000);
    }, 1500);
  };

  return (
    <main className="relative min-h-screen pt-24 pb-24 px-6 md:px-8 overflow-hidden group">
      
      {/* Background Grid */}
      <div className="fixed inset-0 z-[-3] bg-[radial-gradient(#E4E2DD_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-80 pointer-events-none" />
      
      {/* Mouse Spotlight (Desktop only) */}
      {!shouldReduceMotion && (
        <div 
          className="hidden md:block fixed inset-0 z-[-1] bg-[radial-gradient(#3B4A3F_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none will-change-transform"
          style={{
            WebkitMaskImage: `radial-gradient(circle 400px at ${mousePosition.x}px ${mousePosition.y}px, black, transparent)`,
            maskImage: `radial-gradient(circle 400px at ${mousePosition.x}px ${mousePosition.y}px, black, transparent)`
          }}
        />
      )}

      <div className="w-full max-w-[1000px] mx-auto relative z-10">
        
        {/* Header */}
        <div className="mb-14 min-h-[100px] max-w-2xl">
          <TypewriterText 
            text={dict.contact.title} 
            speed={0.05} 
            className="text-4xl md:text-5xl font-semibold mb-4 tracking-tight" 
          />
          <TypewriterText 
            text={dict.contact.subtitle} 
            speed={0.015} 
            className="text-base md:text-lg text-textPrimary/70 leading-relaxed" 
          />
        </div>

        <motion.div 
          variants={container} 
          initial="hidden" 
          animate="visible" 
          className="flex flex-col lg:flex-row gap-12 lg:gap-20"
        >
          {/* Kolom Kiri: Informasi Kontak & Ketersediaan */}
          <motion.div variants={itemVariant} className="flex-1 space-y-10">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-textPrimary/50 mb-4">
                {dict.contact.availability}
              </h3>
              <p className="text-lg font-medium text-textPrimary">
                {dict.contact.availabilityValue}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-textPrimary/50 mb-4">
                {dict.contact.socials}
              </h3>
              <ul className="space-y-4">
                <li>
                  {/* Ganti dengan alamat email Anda nanti */}
                  <a href="mailto:emailanda@gmail.com" className="text-lg font-medium text-textPrimary hover:text-accent transition-colors duration-300 inline-flex items-center gap-2 group/link">
                    Email
                    <span className="opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-300">→</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.linkedin.com/in/yusuf-syamputra-6b66a5428/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-lg font-medium text-textPrimary hover:text-accent transition-colors duration-300 inline-flex items-center gap-2 group/link"
                  >
                    LinkedIn
                    <span className="opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-300">→</span>
                  </a>
                </li>
                <li>
                  {/* Ganti dengan link GitHub Anda nanti */}
                  <a href="#" target="_blank" rel="noopener noreferrer" className="text-lg font-medium text-textPrimary hover:text-accent transition-colors duration-300 inline-flex items-center gap-2 group/link">
                    GitHub
                    <span className="opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-300">→</span>
                  </a>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Kolom Kanan: Formulir Standar yang Dipercantik */}
          <motion.div variants={itemVariant} className="flex-[1.5]">
            <form onSubmit={handleFormSubmit} className="bg-background/40 p-6 md:p-8 rounded-2xl border border-borderLight backdrop-blur-sm shadow-sm space-y-6">
              
              {/* Field: Nama */}
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-textPrimary/80">
                  {dict.contact.form.name}
                </label>
                <input 
                  type="text" 
                  id="name" 
                  required
                  className="w-full px-4 py-3 bg-background/50 border border-borderLight rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all duration-300 placeholder:text-textPrimary/30"
                  placeholder="John Doe"
                />
              </div>

              {/* Field: Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-textPrimary/80">
                  {dict.contact.form.email}
                </label>
                <input 
                  type="email" 
                  id="email" 
                  required
                  className="w-full px-4 py-3 bg-background/50 border border-borderLight rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all duration-300 placeholder:text-textPrimary/30"
                  placeholder="john@example.com"
                />
              </div>

              {/* Field: Pesan */}
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-textPrimary/80">
                  {dict.contact.form.message}
                </label>
                <textarea 
                  id="message" 
                  rows={4}
                  required
                  className="w-full px-4 py-3 bg-background/50 border border-borderLight rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all duration-300 resize-none placeholder:text-textPrimary/30"
                  placeholder="..."
                />
              </div>

              {/* Tombol Submit Dinamis */}
              <button 
                type="submit" 
                disabled={formStatus !== "idle"}
                className="w-full md:w-auto px-8 py-3 bg-accent text-background font-medium rounded-lg hover:bg-textPrimary hover:shadow-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
              >
                {formStatus === "idle" && dict.contact.form.send}
                {formStatus === "sending" && dict.contact.form.sending}
                {formStatus === "sent" && dict.contact.form.sent}
              </button>
            </form>
          </motion.div>

        </motion.div>
      </div>
    </main>
  );
}