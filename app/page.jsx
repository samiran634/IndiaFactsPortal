"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Card } from "./utils/card";
 
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
    id: "freedom",
    title: "Freedom Scroll",
    folder: "till_1889", // Folder name in public/images
    count: 12,           // Number of images
    description: "Welcome to the Freedom Scroll phase. Discover historical facts leading up to 1889.",
    sympho: "today",  // Image prefix
    format: "jpg",  // Image format
    link: "/freedom-scroll", // Link for the card
  },
  {
    id: "map",
    title: "Active Map",
    folder: "geography",
    count: 6,
    description: "Engaging the Active Map coordinates. Explore geographical facts interactively.",
    sympho: "download",
    format: "jpeg",
    link: "/active-map",
  },
  {
    id: "vault",
    title: "Dynamic Vault",
    folder: "current",
    count: 5,
    description: "Current facts are displayed here daily. You must check in every day!",
    sympho: "photo",
    format: "png",
    link: "/dynamic-vault",
  }
];

const SCROLL_PER_IMG = 200;
const CARD_BUFFER = 1400; 

export default function Home() {
  // --- STATE ---
  const [activeData, setActiveData] = useState({
    sectionIndex: 0,
    imgIndex: 12,
    showCard: false,
    bgPosition: "left" 
  });

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

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      let accumulatedHeight = 0;

      for (let i = 0; i < SECTIONS.length; i++) {
        const section = SECTIONS[i];
        
        const imagePhaseHeight = section.count * SCROLL_PER_IMG;
        const totalSectionHeight = imagePhaseHeight + CARD_BUFFER;
        
        const sectionStart = accumulatedHeight;
        const sectionEnd = sectionStart + totalSectionHeight;
       
        if (scrollY >= sectionStart && scrollY <= sectionEnd) {
          const relativeScroll = scrollY - sectionStart;
          if (relativeScroll < imagePhaseHeight) {
             // --- IMAGE PHASE ---
             // Calculate countdown index (e.g. 12 -> 1)
             const rawIndex = Math.floor(relativeScroll / SCROLL_PER_IMG);
             const currentCount = section.count - rawIndex;
             const isHeadVisible = i===0 && relativeScroll <=300;
             setActiveData({
               sectionIndex: i,
               imgIndex: currentCount < 1 ? 1 : currentCount,
               showCard: false,
               bgPosition: isHeadVisible? "left" : "center"
             });
          } else {
             setActiveData({
               sectionIndex: i,
               imgIndex: 1, 
               showCard: true,
               bgPosition: "left"
             });
          }
          
          return;
        }

        accumulatedHeight += totalSectionHeight;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentSection = SECTIONS[activeData.sectionIndex];

  const totalPageHeight = SECTIONS.reduce((acc, sec) => {
    return acc + (sec.count * SCROLL_PER_IMG) + CARD_BUFFER;
  }, 0);


  return (
    <motion.main className="bg-black min-h-screen w-screen relative no-scrollbar">
      
      <motion.div 
        style={{ opacity: headerOpacity, y: headerY }}
        className="fixed top-0 left-0 w-full flex justify-between px-4 z-20 pt-4 pointer-events-none"
      >
       <div className="flex flex-col justify-center">
          <div className="text-white text-6xl font-bold">India Facts Portal</div>
          <div className="flex text-2xl text-amber-50 mt-1.5">
            Visit every day<br /> to be aware of what is going on.
          </div>
        </div>
        <div className="flex align-baseline h-full pb-10 items-center">
          <img src="/images/india.jpg" className="h-[80%] object-cover rounded-md" />
        </div>
      </motion.div>

      <div className="sticky top-0 h-screen w-screen flex items-center justify-center overflow-hidden z-10">
         
         <motion.div
           animate={{ 
             x: activeData.bgPosition === "left" ? "-35%" : "0%",
             scale: activeData.bgPosition === "left" ? 0.8 : 1
           }}
           transition={{ type: "spring", stiffness: 50, damping: 20 }}
           className="relative h-[75%] w-[85%] flex items-center justify-center overflow-hidden border border-zinc-800 rounded-2xl shadow-2xl shadow-amber-900/40 bg-zinc-900"
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
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 500 }} 
                transition={{ delay: 0.5, duration: 1 }} 
                className="absolute z-100 w-80 shadow-2xl shadow-black/40 rounded-lg"
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
  );
}