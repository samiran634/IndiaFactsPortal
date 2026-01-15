"use client";
import React from "react";
import { motion } from "framer-motion";

interface CardProps {
  title: string;
  content?: string[];
  isActive: boolean;
  position: "left" | "center" | "right";
  onClick?: () => void;
  type?: "politics" | "economy";
}

export const Card: React.FC<CardProps> = ({ title, content, isActive, position, onClick, type = "politics" }) => {
  const isCenter = position === "center";
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); // Check on mount
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Visual variants based on position
  const variants = {
    center: {
      x: 0,
      scale: 1,
      zIndex: 50,
      rotateY: 0,
      opacity: 1,
      boxShadow: "0px 0px 30px rgba(0,0,0,0.5)"
    },
    left: {
      x: isMobile ? -60 : -300,
      scale: 0.8,
      zIndex: 10,
      rotateY: isMobile ? 65 : 45,
      opacity: 0.6,
      boxShadow: "0px 0px 10px rgba(0,0,0,0.2)"
    },
    right: {
      x: isMobile ? 60 : 300,
      scale: 0.8,
      zIndex: 10,
      rotateY: isMobile ? -65 : -45,
      opacity: 0.6,
      boxShadow: "0px 0px 10px rgba(0,0,0,0.2)"
    }
  };

  const themeColors = type === "politics" 
    ? "from-orange-900/80 to-red-900/80 border-orange-500/30 text-orange-100" 
    : "from-emerald-900/80 to-teal-900/80 border-emerald-500/30 text-emerald-100";

  return (
    <motion.div
      className={`absolute w-80 h-96 rounded-xl border bg-gradient-to-br backdrop-blur-md p-6 cursor-pointer flex flex-col items-center shadow-xl ${themeColors}`}
      animate={position}
      variants={variants}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      onClick={onClick}
    >
      <h3 className="text-2xl font-serif font-bold mb-4 border-b border-white/20 pb-2 w-full text-center">
        {title}
      </h3>
      
      <div className="flex-1 overflow-y-auto w-full custom-scrollbar">
        {content && content.length > 0 ? (
          <ul className="space-y-3 text-sm leading-relaxed">
            {content.map((point, i) => (
              <li key={i} className="flex gap-2">
                <span className="opacity-50 mt-1">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex items-center justify-center h-full opacity-50 italic">
            Select to view details
          </div>
        )}
      </div>
    </motion.div>
  );
};
