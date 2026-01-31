"use client";

import React from "react";
import { motion } from "framer-motion";

interface NavigationButtonProps {
  text: string;
  onClick: () => void;
  direction: "up" | "down";
  disabled?: boolean;
  variant?: "primary" | "transition"; // transition = special button for section transitions
}

const NavigationButton: React.FC<NavigationButtonProps> = ({
  text,
  onClick,
  direction,
  disabled = false,
  variant = "primary",
}) => {
  const isTransition = variant === "transition";

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.05, y: direction === "up" ? -3 : 3 }}
      whileTap={disabled ? {} : { scale: 0.95 }}
      className={`
        flex items-center justify-center gap-2
        px-6 py-3 rounded-xl
        font-medium text-sm md:text-base
        transition-all duration-300
        backdrop-blur-md
        border border-zinc-700/50
        shadow-lg
        ${disabled 
          ? "opacity-50 cursor-not-allowed bg-zinc-800/50 text-zinc-500" 
          : isTransition
            ? "bg-gradient-to-r from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30 text-amber-100 hover:shadow-amber-500/20 border-amber-500/30"
            : "bg-zinc-800/70 hover:bg-zinc-700/70 text-white hover:shadow-zinc-500/10"
        }
      `}
    >
      {/* Up arrow for "previous" direction */}
      {direction === "up" && (
        <motion.svg
          animate={disabled ? {} : { y: [0, -3, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </motion.svg>
      )}

      <span>{text}</span>

      {/* Down arrow for "next" direction */}
      {direction === "down" && (
        <motion.svg
          animate={disabled ? {} : { y: [0, 3, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      )}

      {/* Loading spinner when disabled (during animation) */}
      {disabled && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-4 h-4 border-2 border-zinc-500 border-t-transparent rounded-full"
        />
      )}
    </motion.button>
  );
};

export default NavigationButton;