import { ReactNode } from "react";

interface TagProps {
  children: ReactNode;
  className?: string;
}

export default function Tag({ children, className = "" }: TagProps) {
  return (
    <span className={`px-3 py-1 rounded-[4px] border border-borderLight bg-transparent text-sm transition-colors duration-150 hover:border-accent inline-flex items-center justify-center ${className}`}>
      {children}
    </span>
  );
}