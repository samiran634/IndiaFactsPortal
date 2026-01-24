"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Card } from "./utils/card";
import LeftScrollDown from "./utils/scrollDown/left";
import RightScrollUp from "./utils/scrollUp/right";
import RightScrollDown from "./utils/scrollDown/right";
import LeftScrollUp from "./utils/scrollUp/left";

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
    title: "Dynamic Vault",
    folder: "current",
    count: 6,
    description: "Current facts are displayed here daily. You must check in every day!",
    sympho: "photo",
    format: "png",
    link: "/dynamic-vault",
  },

  {
    id: "map",
    title: "Active Map",
    folder: "geography",
    count: 6,
    description: "Engaging the Active Map coordinates. Explore geographical facts interactively.",
    sympho: "download",
    format: "png",
    link: "/active-map",
  },
    {
    id: "freedom",
    title: "Freedom Scroll",
    folder: "till_1889", // Folder name in public/images
    count: 11,           // Number of images
    description: "Welcome to the Freedom Scroll phase. Discover historical facts leading up to 1889.",
    sympho: "today",  // Image prefix
    format: "jpg",  // Image format
    link: "/history", // Link for the card
  },
 
];

const SCROLL_PER_IMG = 0; // Trimmed as requested
const CARD_BUFFER = 800; // Reduced height 

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
      }, 200);
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
          {/* ----------------------------- */}
        <motion.div 
          style={{ opacity: headerOpacity, y: headerY }}
          className="fixed top-0 left-0 w-full flex flex-col md:flex-row justify-between px-4 z-20 pt-4 pointer-events-none"
        >
        <div className="flex flex-col justify-center">
            <div className="text-white text-3xl md:text-6xl font-bold">India Facts Portal</div>
            <div className="flex text-lg md:text-2xl text-amber-50 mt-1.5">
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

          </motion.div>
              {activeData.showCard && (
                <motion.div
                  initial={{ opacity: 0, x: isMobile ? 0 : 100, y: isMobile ? 100 : 0 }}
                  animate={{ opacity: 1, x: isMobile ? 0 : 500, y: isMobile ? 0 : 0 }} 
                  transition={{ delay: 0.5, duration: 1 }} 
                  className={`absolute z-100 shadow-2xl shadow-black/40 rounded-lg ${
                    isMobile 
                      ? "w-[90%] bottom-8" 
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

        <div style={{ height: `${totalPageHeight + 1000}px` }}></div>

      </motion.main>
    }
    
    
    </>
  );
}