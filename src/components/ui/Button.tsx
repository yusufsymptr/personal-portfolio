"use client";

import { HTMLMotionProps, motion } from "framer-motion";
import { ReactNode } from "react";

interface ButtonProps extends HTMLMotionProps<"button"> {
  children: ReactNode;
  variant?: "primary" | "secondary";
}

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  // Styling dasar dan warna mengacu pada design.md
  const baseStyles = "px-6 py-3 rounded-[4px] text-base font-medium outline-none focus-visible:ring-2 focus-visible:ring-accent/30 inline-flex items-center justify-center";
  
  const variants = {
    primary: "bg-accent text-background",
    secondary: "bg-transparent text-textPrimary border border-textPrimary",
  };

  return (
    <motion.button
      whileHover={{ opacity: 0.85 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.15 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}