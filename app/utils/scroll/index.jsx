"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export const SamuraiScroll = ({ children, width = "max-w-3xl" }) => {
  const [isOpen, setIsOpen] = useState(false);

  // VARIANTS: This defines the animation states
  const containerVariants = {
    closed: { width: "0px", opacity: 0 },
    open: { 
      width: "100%", 
      opacity: 1,
      transition: { 
        duration: 1.5, 
        ease: "easeInOut", // Slow ease matches the heavy feeling of a scroll
        when: "beforeChildren" // Wait for scroll to open before showing text
      }
    }
  };

  const contentVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1, transition: { duration: 0.5, delay: 0.2 } }
  };

  return (
    <div className="flex flex-col items-center justify-center py-10 overflow-hidden">
      
      {/* TRIGGER BUTTON (For demo purposes) */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="mb-8 px-6 py-3 bg-red-800 text-amber-100 font-bold tracking-widest uppercase border-2 border-amber-600 hover:bg-red-900 transition-colors"
        >
          Open Decree
        </button>
      )}

      {/* --- THE SCROLL CONTAINER --- */}
      <div className={`relative h-100 flex items-center justify-center ${width}`}>
        
        {/* 1. LEFT HANDLE (Roller) */}
        {/* Moves left as the center grows. We attach it to the left side of the relative container. */}
        <motion.div 
           className="absolute z-20 h-full w-8 bg-amber-900 rounded-full shadow-[4px_0_10px_rgba(0,0,0,0.5)] flex flex-col justify-between py-2 border-r border-amber-950"
           initial={{ x: 0 }}
           animate={isOpen ? { x: 0 } : { x: 16 }} // Small nudge for closed state
           // It stays stuck to the side of the expanding middle div automatically via Flexbox logic below, 
           // OR we can absolute position it. 
           // Better approach: Absolute Left of the container.
           style={{ left: -16 }} 
        >
            {/* Decorative Gold Caps on Roller */}
            <div className="h-4 w-full bg-yellow-600 rounded-sm"></div>
            <div className="h-4 w-full bg-yellow-600 rounded-sm"></div>
        </motion.div>


        {/* 2. THE PAPER (Middle Content) */}
        <motion.div
          variants={containerVariants}
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          className="relative h-[90%] bg-[#f2eecb] overflow-hidden shadow-2xl flex items-center justify-center"
          style={{
             // OPTIONAL: Add a subtle paper texture pattern here
             backgroundImage: "url('https://www.transparenttextures.com/patterns/aged-paper.png')",
             borderTop: "2px solid #5c4033",
             borderBottom: "2px solid #5c4033"
          }}
        >
           {/* Inner Content */}
           <motion.div variants={contentVariants} className="p-8 text-center font-serif text-amber-900 w-full">
              {children}
           </motion.div>
        </motion.div>


        {/* 3. RIGHT HANDLE (Roller) */}
        <motion.div 
           className="absolute z-20 h-full w-8 bg-amber-900 rounded-full shadow-[-4px_0_10px_rgba(0,0,0,0.5)] flex flex-col justify-between py-2 border-l border-amber-950"
           initial={{ x: 0 }}
           animate={isOpen ? { x: 0 } : { x: -16 }}
           style={{ right: -16 }} 
        >
            <div className="h-4 w-full bg-yellow-600 rounded-sm"></div>
            <div className="h-4 w-full bg-yellow-600 rounded-sm"></div>
        </motion.div>

      </div>
    </div>
  );
};