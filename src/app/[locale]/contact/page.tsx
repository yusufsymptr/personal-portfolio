"use client";

import { use, useState, useEffect } from "react";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { getDictionary, Locale } from "@/lib/i18n/dictionaries";

// Efek Typewriter (Diperbarui agar memecah per kata sehingga teks tidak patah di tengah kata pada layar HP)
const TypewriterText = ({ text, speed = 0.03, className = "" }: { text: string, speed?: number, className?: string }) => {
  const words = text.split(" ");
  
  return (
    <motion.div 
      initial="hidden" animate="visible" 
      variants={{ visible: { transition: { staggerChildren: speed } } }}
      className={className}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {Array.from(word).map((char, charIndex) => (
            <motion.span 
              key={charIndex} 
              variants={{ hidden: { opacity: 0, y: 5 }, visible: { opacity: 1, y: 0 } }} 
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
          {/* Tambahkan spasi setelah setiap kata, kecuali kata terakhir */}
          {wordIndex !== words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </motion.div>
  );
};

export default function Contact({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = use(params);
  const shouldReduceMotion = useReducedMotion();
  const dict = getDictionary(locale);
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

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

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("sending");

    const form = e.currentTarget; 
    const formData = new FormData(form);
    formData.append("access_key", "5f894a60-e388-445d-b79e-ee41048bde32");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      const data = await response.json();

      if (data.success) {
        setFormStatus("sent");
        form.reset(); 
        setTimeout(() => setFormStatus("idle"), 3000);
      } else {
        console.error("Form submission failed", data);
        setFormStatus("error");
        setTimeout(() => setFormStatus("idle"), 3000);
      }
    } catch (error) {
      console.error("Error submitting form", error);
      setFormStatus("error");
      setTimeout(() => setFormStatus("idle"), 3000);
    }
  };

  const socialLinks = [
    {
      name: "Email",
      value: "yusufsymptr03@gmail.com",
      url: "mailto:yusufsymptr03@gmail.com",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
      )
    },
    {
      name: "LinkedIn",
      value: "Yusuf Syam Putra",
      url: "https://www.linkedin.com/in/yusuf-syamputra-6b66a5428/",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
      )
    },
    {
      name: "GitHub",
      value: "@yusufsymptr",
      url: "https://github.com/yusufsymptr",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.26c3-.3 6-2 6-7a5.2 5.2 0 0 0-1.38-3.41 5.2 5.2 0 0 0-.12-3.41s-1.11-.36-3.6 1.34a12.8 12.8 0 0 0-7 0C5.3 1.25 4.2 1.6 4.2 1.6a5.2 5.2 0 0 0-.12 3.41A5.2 5.2 0 0 0 2.7 8.44c0 4.9 3 6.7 6 7A4.8 4.8 0 0 0 8 18.6V22"></path></svg>
      )
    }
  ];

  return (
    <main className="relative min-h-screen pt-24 pb-24 px-6 md:px-8 group">
      
      <div className="fixed inset-0 z-[-3] bg-[radial-gradient(#E4E2DD_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-80 pointer-events-none" />
      
      {!shouldReduceMotion && (
        <div 
          className="hidden md:block fixed inset-0 z-[-1] bg-[radial-gradient(#3B4A3F_2px,transparent_2px)] [background-size:24px_24px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none will-change-transform"
          style={{
            WebkitMaskImage: `radial-gradient(circle 450px at ${mousePosition.x}px ${mousePosition.y}px, black 15%, transparent 80%)`,
            maskImage: `radial-gradient(circle 450px at ${mousePosition.x}px ${mousePosition.y}px, black 15%, transparent 80%)`
          }}
        />
      )}

      <div className="w-full max-w-[1100px] mx-auto relative z-10 pt-8">
        
        <div className="mb-14 min-h-[100px] max-w-2xl">
          <TypewriterText 
            text={dict.contact.title} 
            speed={0.05} 
            className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 tracking-tighter text-pretty" 
          />
          <TypewriterText 
            text={dict.contact.subtitle} 
            speed={0.015} 
            className="text-base md:text-lg text-textPrimary/70 leading-relaxed font-medium text-pretty break-words" 
          />
        </div>

        <motion.div 
          variants={container} 
          initial="hidden" 
          animate="visible" 
          className="flex flex-col lg:flex-row gap-8 lg:gap-16"
        >
          {/* KOLOM KIRI: STATUS DASHBOARD & SOCIALS */}
          <motion.div variants={itemVariant} className="flex-1 space-y-6">
            
            <div className="p-6 rounded-2xl bg-background border border-borderLight shadow-sm flex items-start gap-4 hover:border-accent/30 transition-colors duration-300">
              <div className="mt-1 relative flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-50"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-accent"></span>
              </div>
              <div>
                <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-textPrimary/50 mb-1">
                  {dict.contact.availability}
                </h3>
                <p className="text-lg font-bold text-textPrimary">
                  {dict.contact.availabilityValue}
                </p>
                <p className="text-xs text-textPrimary/50 mt-2">
                  Currently open for collaboration and new projects.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-background border border-borderLight shadow-sm">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-textPrimary/50 mb-6 border-b border-borderLight pb-3">
                {dict.contact.socials} / Direct Links
              </h3>
              <div className="space-y-4">
                {socialLinks.map((social) => (
                  <a 
                    key={social.name}
                    href={social.url}
                    target={social.name === "Email" ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-textPrimary/[0.03] transition-colors duration-300 group/link"
                  >
                    <div className="w-10 h-10 rounded bg-background border border-borderLight flex items-center justify-center text-textPrimary/70 group-hover/link:text-accent group-hover/link:border-accent/50 transition-all duration-300">
                      {social.icon}
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-textPrimary/50 mb-0.5">{social.name}</p>
                      <p className="text-sm font-semibold text-textPrimary group-hover/link:text-accent transition-colors duration-300">{social.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* KOLOM KANAN: BENTO FORM */}
          <motion.div variants={itemVariant} className="flex-[1.5]">
            <form onSubmit={handleFormSubmit} className="bg-background/80 p-8 md:p-10 rounded-2xl border border-borderLight backdrop-blur-md shadow-sm hover:border-accent/40 transition-colors duration-500 flex flex-col h-full">
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-textPrimary flex items-center gap-2">
                  Send a Message
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent ml-1"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                </h3>
                <p className="text-sm text-textPrimary/50 mt-1">Fill out the form below and I'll get back to you shortly.</p>
              </div>

              <div className="space-y-5 flex-grow">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-textPrimary/60">
                    {dict.contact.form.name}
                  </label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name"
                    required
                    className="w-full px-4 py-3.5 bg-textPrimary/[0.02] border border-borderLight rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all duration-300 text-sm font-medium placeholder:text-textPrimary/30 hover:bg-textPrimary/[0.04]"
                    placeholder="John Doe"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-textPrimary/60">
                    {dict.contact.form.email}
                  </label>
                  <input 
                    type="email" 
                    id="email"
                    name="email" 
                    required
                    className="w-full px-4 py-3.5 bg-textPrimary/[0.02] border border-borderLight rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all duration-300 text-sm font-medium placeholder:text-textPrimary/30 hover:bg-textPrimary/[0.04]"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-textPrimary/60">
                    {dict.contact.form.message}
                  </label>
                  <textarea 
                    id="message"
                    name="message" 
                    rows={5}
                    required
                    className="w-full px-4 py-3.5 bg-textPrimary/[0.02] border border-borderLight rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all duration-300 resize-none text-sm font-medium placeholder:text-textPrimary/30 hover:bg-textPrimary/[0.04]"
                    placeholder="Hello, I'd like to discuss a project..."
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={formStatus === "sending" || formStatus === "sent"}
                className={`mt-8 w-full px-8 py-4 text-sm font-bold tracking-widest uppercase rounded-xl transition-all duration-300 flex justify-center items-center gap-3 ${
                  formStatus === "error" 
                    ? "bg-red-500 text-white" 
                    : "bg-textPrimary text-background hover:bg-accent hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                }`}
              >
                {formStatus === "idle" && (
                  <>
                    {dict.contact.form.send}
                  </>
                )}
                {formStatus === "sending" && dict.contact.form.sending}
                {formStatus === "sent" && dict.contact.form.sent}
                {formStatus === "error" && "Failed to Send"}
              </button>
            </form>
          </motion.div>

        </motion.div>
      </div>
    </main>
  );
}