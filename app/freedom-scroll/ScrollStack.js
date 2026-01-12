"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SamuraiScroll } from "../utils/scroll"; 

export const ScrollStack = ({ facts  }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // If we run out of facts, we can show a completion message or loop
  if (!facts || facts.length === 0) return null;
  const isFinished = currentIndex >= facts.length;

  const handleNext = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  const handleReset = () => {
    setCurrentIndex(0);
  };

  return (
    <div className="flex flex-col items-center w-full min-h-150 relative">
      
      {/* AnimatePresence mode="wait" ensures the current scroll 
        finishes its "closing" animation before the next one starts.
      */}
      <div className="relative w-full flex justify-center items-center min-h-125">
        <AnimatePresence mode="wait">
          {!isFinished ? (
            <SamuraiScroll 
              key={currentIndex} // changing key triggers the animation
              fact={facts[currentIndex]} 
              index={currentIndex} 
              width="max-w-4xl"
            />
          ) : (
            // Optional: Message when all scrolls are finished
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="text-center text-amber-500 font-serif"
            >
              <h2 className="text-2xl mb-4">The Archives are closed.</h2>
              <button 
                 onClick={handleReset}
                 className="px-6 py-2 border border-amber-700 text-amber-600 rounded hover:bg-amber-900/20"
              >
                Read Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* THE CONTROL BUTTON */}
      {!isFinished && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNext}
          className="mt-8 px-8 py-3 bg-red-900/80 hover:bg-red-800 text-amber-50 border border-amber-600/50 
                     rounded-full font-serif text-lg tracking-widest shadow-[0_0_20px_rgba(180,83,9,0.2)]
                     backdrop-blur-sm z-30 transition-colors"
        >
          SEAL & NEXT SCROLL
        </motion.button>
      )}
    </div>
  );
};