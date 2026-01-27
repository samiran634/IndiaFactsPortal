"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigation, Plus, X, ChevronUp } from 'lucide-react';
import Link from 'next/link';

// Section definitions - matches SECTIONS in page.jsx  
const SECTIONS = [
  { id: "vault", title: "Knowledge Vault", scrollTarget: 0 },
  { id: "map", title: "Origin Explorer", scrollTarget: 1 },
  { id: "freedom", title: "Timeline Chronicles", scrollTarget: 2 },
];

const SCROLL_PER_IMG = 50;
const CARD_BUFFER = 300;
const SECTION_HEIGHTS = [6, 6, 11]; // Image counts per section

interface SectionTrackerProps {
  activeSection?: number;
}

const SectionTracker: React.FC<SectionTrackerProps> = ({ activeSection = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Calculate scroll position for a section
  const scrollToSection = (sectionIndex: number) => {
    let scrollTarget = 0;
    for (let i = 0; i < sectionIndex; i++) {
      scrollTarget += (SECTION_HEIGHTS[i] * SCROLL_PER_IMG) + CARD_BUFFER;
    }
    window.scrollTo({ top: scrollTarget + 100, behavior: 'smooth' });
    setIsOpen(false);
  };

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          /* COLLAPSED STATE - Floating Button */
          <motion.button
            key="collapsed"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 rounded-full bg-slate-900 border border-amber-500/50 
                       flex items-center justify-center shadow-[0_0_30px_rgba(251,191,36,0.3)] 
                       group cursor-pointer backdrop-blur-sm"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute inset-2 rounded-full border border-dashed border-amber-400/30"
            />
            <Navigation className="w-6 h-6 text-amber-400 group-hover:text-amber-300 transition-colors" />
          </motion.button>
        ) : (
          /* EXPANDED STATE - Panel */
          <motion.div
            key="expanded"
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="bg-slate-900/95 backdrop-blur-xl border border-zinc-700/50 rounded-2xl 
                       shadow-[0_0_60px_rgba(0,0,0,0.5)] overflow-hidden w-72"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
              <h3 className="text-white font-semibold text-sm flex items-center gap-2">
                <Navigation className="w-4 h-4 text-amber-400" />
                Navigation
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Section List */}
            <div className="p-3 space-y-2">
              {/* Go to Top */}
              <motion.button
                whileHover={{ x: 4 }}
                onClick={scrollToTop}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left
                           bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-300 hover:text-white
                           transition-all border border-transparent hover:border-zinc-600"
              >
                <ChevronUp className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-medium">Back to Top</span>
              </motion.button>

              {/* Section Links */}
              {SECTIONS.map((section, index) => (
                <motion.button
                  key={section.id}
                  whileHover={{ x: 4 }}
                  onClick={() => scrollToSection(index)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left
                              transition-all border ${
                                activeSection === index
                                  ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                                  : 'bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-300 hover:text-white border-transparent hover:border-zinc-600'
                              }`}
                >
                  <div className={`w-2 h-2 rounded-full ${
                    activeSection === index ? 'bg-amber-400' : 'bg-zinc-600'
                  }`} />
                  <span className="text-sm font-medium">{section.title}</span>
                </motion.button>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px bg-zinc-800 mx-3" />

            {/* Add Data Button - Redirects to Admin */}
            <div className="p-3">
              <Link href="/admin">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl
                             bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold
                             shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  Add Knowledge
                </motion.div>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SectionTracker;
