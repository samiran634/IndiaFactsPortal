"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Card } from "./utils/card";
import LeftScrollDown from "./utils/scrollDown/left";
import RightScrollUp from "./utils/scrollUp/right";
import RightScrollDown from "./utils/scrollDown/right";
import LeftScrollUp from "./utils/scrollUp/left";
import SectionTracker from "./components/SectionTracker";

// Hook to detect mobile (20:8 ratio screens)
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      const ratio = window.innerWidth / window.innerHeight;
      // 20:8 = 2.5, but we check for portrait/narrow screens
      setIsMobile(window.innerWidth < 768 || ratio < 1);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  
  return isMobile;
};
/*
  when the user starts to scroll downt at some certain distance appeart left and right scroll arroe accorgint to their direction will appear on the sides
  they will disappear instantly after inactivity

*/
 
/*
  the json data will contain 
  number of images it contains above the card itself
  folder name in public/images
  title
  description
  link to more details


*/
const SECTIONS = [
   {
    id: "vault",
    title: "Knowledge Vault",
    folder: "current",
    count: 6,
    description: "Your daily gateway to essential facts. Build knowledge that sets you apart from the crowd.",
    sympho: "photo",
    format: "png",
    link: "/dynamic-vault",
    tagline: "Knowledge is the compass that guides you beyond the ordinary.",
  },

  {
    id: "map",
    title: "Origin Explorer",
    folder: "geography",
    count: 6,
    description: "Trace the roots of every fact. Discover where knowledge was born through interactive maps.",
    sympho: "download",
    format: "png",
    link: "/active-map",
    tagline: "Every fact has an origin — discover where knowledge was born.",
  },
    {
    id: "freedom",
    title: "Timeline Chronicles",
    folder: "till_1889", // Folder name in public/images
    count: 11,           // Number of images
    description: "Journey through history's pivotal moments. Understand today by exploring echoes of the past.",
    sympho: "today",  // Image prefix
    format: "jpg",  // Image format
    link: "/history", // Link for the card
    tagline: "To understand today's events, look into the echoes of the past.",
  },
 
];

const SCROLL_PER_IMG = 50; // Trimmed as requested
const CARD_BUFFER = 300; // Reduced height 

export default function Home() {
  // --- STATE ---
  const [activeData, setActiveData] = useState({
    sectionIndex: 0,
    imgIndex: 6,
    showCard: false,
    bgPosition: "left" 
  });
  const [isSecletonVisible, setIsSkeletonVisible] = useState(true);
  const [scrollDir, setScrollDir] = useState(null); // "up" or "down"
  const [isScrolling, setIsScrolling] = useState(false);
  const isMobile = useIsMobile();
  
  // --- HEADER ANIMATION ---
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const headerY = useTransform(scrollY, [0, 300], [0, -100]);


  // --- THE MATH ENGINE ---
  /*
    each section has count number of images 
    each image should take less scroll as it is just to create a flash animation 
    after all images are shown, a buffer scroll to show the card
    
    so show much per section will consum is = (count * SCROLL_PER_IMG) + CARD_BUFFER

  */

  // --- ANIMATION EFFECT ---
  useEffect(() => {
    let intervalId = null;
    if (activeData.isPlaying) {
      intervalId = setInterval(() => {
        setActiveData(prev => {
          if (prev.imgIndex <= 1) {
            clearInterval(intervalId);
            return { ...prev, imgIndex: 1, showCard: true, bgPosition: "left", isPlaying: false };
          }
          return { ...prev, imgIndex: prev.imgIndex - 1, bgPosition: "center" };
        });
      }, 400);
    }
    return () => { if (intervalId) clearInterval(intervalId); };
  }, [activeData.isPlaying, activeData.sectionIndex]);

  useEffect(() => {
    // --- PRELOAD IMAGES ---
    SECTIONS.forEach((section) => {
      for (let i = 1; i <= section.count; i++) {
        const img = new Image();
        img.src = `/images/${section.folder}/${section.sympho}${i}.${section.format}`;
      }
    });

    let lastScrollY = window.scrollY;
    let timeoutId = null;
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Force reset at the very top (fix for "photo6.png should be displayed")
      if (scrollY < 50) {
        const isAtVeryTop = scrollY <= 10;
        setActiveData(prev => {
           const desiredPos = isAtVeryTop ? "left" : "center";
           
           if (prev.imgIndex !== SECTIONS[0].count || prev.showCard || prev.bgPosition !== desiredPos) {
               return {
                   sectionIndex: 0,
                   imgIndex: SECTIONS[0].count, 
                   showCard: false,
                   bgPosition: desiredPos,
                   isPlaying: false
               };
           }
           return prev;
        });
      }

      if (Math.abs(scrollY - lastScrollY) > 5) {
        if (scrollY > lastScrollY) {
          setScrollDir("down");
        } else {
          setScrollDir("up");
        }
      }
      lastScrollY = scrollY;
      
      if (scrollY > 100) { 
        setIsScrolling(true);
      } else {
        setIsScrolling(false); 
      }

      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsScrolling(false);
      }, 800);

      let accumulatedHeight = 0;
      for (let i = 0; i < SECTIONS.length; i++) {
        const section = SECTIONS[i];
        
        const imagePhaseHeight = section.count * SCROLL_PER_IMG;
        const totalSectionHeight = imagePhaseHeight + CARD_BUFFER;
        
        const sectionStart = accumulatedHeight;
        const sectionEnd = sectionStart + totalSectionHeight;
       
        if (scrollY >= sectionStart && scrollY < sectionEnd) {
          setActiveData(prev => {
             // 1. Enter new section -> Reset
             if (prev.sectionIndex !== i) {
                 return {
                     ...prev,
                     sectionIndex: i,
                     imgIndex: section.count, 
                     showCard: false,
                     bgPosition: "center",
                     isPlaying: false
                 };
             }
             // 2. Trigger play if scrolling within section (implied by this function running)
             // only if we haven't shown card yet and aren't already playing.
             // Avoid trigger if strictly at top < 50 (handled above)
             if (scrollY >= 50 && !prev.isPlaying && !prev.showCard && prev.imgIndex > 1) {
                 return { ...prev, isPlaying: true };
             }
             return prev;
          });
          return;
        }

        accumulatedHeight += totalSectionHeight;
      }
    };
    
    setTimeout(() => { setIsSkeletonVisible(false); }, 3000);
    window.addEventListener("scroll", handleScroll);
    return () => { window.removeEventListener("scroll", handleScroll); };
  }, []);

  const currentSection = SECTIONS[activeData.sectionIndex];

  const totalPageHeight = SECTIONS.reduce((acc, sec) => {
    return acc + (sec.count * SCROLL_PER_IMG) + CARD_BUFFER;
  }, 0);


  return (
    <>
    
    {isSecletonVisible === true ? (
      <motion.div className="bg-black  h-screen w-screen flex items-center justify-center"
       
      >
      <div className="flex flex-col items-center justify-center w-40 gap-2 animate-pulse">
  
  <div className="flex w-full justify-between">
     <div className="h-12 w-12 bg-gray-300 rounded-full"></div>
     <div className="h-12 w-12 bg-gray-300 rounded-full"></div>
  </div>

  <div className="
      w-3/4          /* Width of the mouth relative to container */
      h-6            /* Height determines how 'deep' the curve is */
      border-b-4     /* Thickness of the smile */
      border-gray-300 
      rounded-b-full /* This creates the perfect U-shape arc */
  "></div>

</div>
      </motion.div>
    ): 
      <motion.main className="bg-black min-h-screen w-screen relative no-scrollbar">
        <AnimatePresence>
            {!isMobile && isScrolling && scrollDir === "down" && (
              <>
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="fixed left-4 top-1/2 z-50 pointer-events-none"
                >
                  <LeftScrollDown />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="fixed right-4 top-1/2 z-50 pointer-events-none"
                >
                  <RightScrollDown />
                </motion.div>
              </>
            )}

            {!isMobile && isScrolling && scrollDir === "up" && (
              <>
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="fixed left-4 top-1/2 z-50 pointer-events-none"
                >
                  <LeftScrollUp />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="fixed right-4 top-1/2 z-50 pointer-events-none"
                >
                  <RightScrollUp />
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Section Tracker - Floating Navigation */}
          <SectionTracker activeSection={activeData.sectionIndex} />
          
          {/* ----------------------------- */}
        <motion.div 
          style={{ opacity: headerOpacity, y: headerY }}
          className="fixed inset-0 md:top-0 md:left-0 md:right-auto md:bottom-auto w-full h-screen md:h-auto flex flex-col md:flex-row justify-center md:justify-between items-center md:items-start px-4 z-30 pt-0 md:pt-4 pointer-events-none"
        >
        <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left">
            <div className="text-white text-3xl md:text-6xl font-bold drop-shadow-lg">India Facts Portal</div>
            <div className="flex text-lg md:text-2xl text-amber-50 mt-1.5 drop-shadow-md">
              Visit every day<br /> to be aware of what is going on.
            </div>
          </div>
          <div className="hidden md:flex align-baseline h-screen pb-10 items-center justify-center">
            <img src="/images/india.jpg" className="h-[80%] flex justify-center object-cover rounded-md" />
          </div>
        </motion.div>

        <div className="sticky top-0 h-screen w-screen flex items-center justify-center overflow-hidden z-10">
          
          <motion.div
            animate={isMobile ? {
              // Mobile: Don't move, just change opacity based on card visibility
              opacity: activeData.showCard ? 0.4 : 1,
              scale: 1
            } : { 
              // Desktop: Original behavior with position movement
              x: activeData.bgPosition === "left" ? "-35%" : "0%",
              scale: activeData.bgPosition === "left" ? 0.8 : 1
            }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
            className="relative h-[85%] md:h-[75%] w-[95%] md:w-[85%] flex items-center justify-center overflow-hidden border border-zinc-800 rounded-2xl shadow-2xl shadow-amber-900/40 bg-zinc-900"
          >
              <motion.img
                key={`${currentSection.id}-${activeData.imgIndex}`} // Unique key forces re-render/fade
                src={`/images/${currentSection.folder}/${currentSection.sympho+activeData.imgIndex}.${currentSection.format}`} 
                alt="Fact"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Animated Tagline Overlay - Shows during image animation */}
              <AnimatePresence>
                {activeData.isPlaying && !activeData.showCard && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="absolute inset-0 flex items-center justify-center z-20 p-4 md:p-12"
                  >
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="w-full h-full flex items-center justify-center"
                    >
                      <p 
                        className="text-white text-xl sm:text-2xl md:text-4xl lg:text-5xl text-center leading-snug sm:leading-relaxed px-2 sm:px-4 md:px-8"
                        style={{ 
                          fontFamily: "'Playfair Display', 'Georgia', 'Times New Roman', serif",
                          fontStyle: "italic",
                          fontWeight: 400,
                          textShadow: "2px 2px 8px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.6)",
                          letterSpacing: "0.02em"
                        }}
                      >
                        "{currentSection.tagline}"
                      </p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

          </motion.div>
              {activeData.showCard && (
                <motion.div
                  initial={{ opacity: 0, x: isMobile ? 0 : 100, y: isMobile ? 100 : 0 }}
                  animate={{ opacity: 1, x: isMobile ? 0 : 500, y: isMobile ? 0 : 0 }} 
                  transition={{ delay: 0.5, duration: 1 }} 
                  className={`absolute z-100 shadow-2xl shadow-black/40 rounded-lg ${
                    isMobile 
                      ? "w-[90%] bottom-[10%]" 
                      : "w-80"
                  }`}
                >
                  <Card title={currentSection.title}
                        description={currentSection.description}
                        link={currentSection.link}
      
                  />
                </motion.div>
              )}
        </div>

        <div style={{ height: `${totalPageHeight + 100}px` }}></div>

        {/* Footer Section */}
        <footer className="relative z-20 mt-20 py-12 px-6 border-t border-zinc-800/50 
                          bg-gradient-to-r from-transparent via-zinc-900/50 to-black">
          <div className="max-w-4xl mx-auto">
            {/* Share Section */}
            <div className="text-center mb-10">
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-4">
                Share India Facts Portal
              </h3>
              <p className="text-zinc-400 mb-6 text-sm md:text-base">
                Help others discover fascinating facts about India!
              </p>
              
              {/* Social Share Buttons */}
              <div className="flex flex-wrap justify-center gap-4">
                {/* Twitter/X Share */}
                <motion.a
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  href={`https://twitter.com/intent/tweet?text=Check out India Facts Portal - Your daily dose of amazing facts about India!&url=${typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : ''}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-3 rounded-xl 
                           bg-zinc-800/80 hover:bg-zinc-700/80 border border-zinc-700/50
                           text-white transition-all duration-300 shadow-lg hover:shadow-sky-500/20"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  <span className="text-sm font-medium">Twitter</span>
                </motion.a>

                {/* WhatsApp Share */}
                <motion.a
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  href={`https://wa.me/?text=Check out India Facts Portal - Your daily dose of amazing facts about India! ${typeof window !== 'undefined' ? window.location.href : ''}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-3 rounded-xl 
                           bg-zinc-800/80 hover:bg-green-600/30 border border-zinc-700/50
                           text-white transition-all duration-300 shadow-lg hover:shadow-green-500/20"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span className="text-sm font-medium">WhatsApp</span>
                </motion.a>

                {/* Facebook Share */}
                <motion.a
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  href={`https://www.facebook.com/sharer/sharer.php?u=${typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : ''}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-3 rounded-xl 
                           bg-zinc-800/80 hover:bg-blue-600/30 border border-zinc-700/50
                           text-white transition-all duration-300 shadow-lg hover:shadow-blue-500/20"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span className="text-sm font-medium">Facebook</span>
                </motion.a>

                {/* LinkedIn Share */}
                <motion.a
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : ''}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-3 rounded-xl 
                           bg-zinc-800/80 hover:bg-blue-700/30 border border-zinc-700/50
                           text-white transition-all duration-300 shadow-lg hover:shadow-blue-600/20"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <span className="text-sm font-medium">LinkedIn</span>
                </motion.a>

                {/* Copy Link Button */}
                <motion.button
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      navigator.clipboard.writeText(window.location.href);
                      alert('Link copied to clipboard!');
                    }
                  }}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl 
                           bg-zinc-800/80 hover:bg-amber-500/30 border border-zinc-700/50
                           text-white transition-all duration-300 shadow-lg hover:shadow-amber-500/20"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm font-medium">Copy Link</span>
                </motion.button>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent mb-8" />

            {/* Open Source & GitHub Section */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <p className="text-zinc-400 text-sm">
                  This project is <span className="text-amber-400 font-medium">open source</span> and we welcome contributions!
                </p>
              </div>
              
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://github.com/samiran634/cds_study"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 rounded-xl 
                         bg-gradient-to-r from-zinc-800 to-zinc-900 
                         border border-zinc-700/50 hover:border-zinc-500/50
                         text-white transition-all duration-300 
                         shadow-lg hover:shadow-xl hover:shadow-purple-500/10"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">Contribute on GitHub</span>
                  <span className="text-xs text-zinc-400">Star ⭐ • Fork • Pull Request</span>
                </div>
              </motion.a>
            </div>

            {/* Copyright */}
            <div className="text-center mt-8 pt-6 border-t border-zinc-800/50">
              <p className="text-zinc-500 text-sm">
                Made with <span className="text-red-500">❤️</span> for India
              </p>
              <p className="text-zinc-600 text-xs mt-1">
                © {new Date().getFullYear()} India Facts Portal. All rights reserved.
              </p>
            </div>
          </div>
        </footer>

      </motion.main>
    }
    
    
    </>
  );
}