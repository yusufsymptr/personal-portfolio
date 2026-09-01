import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`p-6 rounded-lg border border-borderLight bg-transparent ${className}`}>
      {children}
    </div>
  );
}