"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Card } from "./utils/card";

export default function Home() {
  const [cnt, setCnt] = useState(1);
  const [showCard, setShowCard] = useState(false);

  // Framer Motion hooks
  const { scrollY } = useScroll();
  // Header fades out faster now (0 to 300px)
  const headerOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const headerScale = useTransform(scrollY, [0, 300], [1, 0.9]);
  const headerY = useTransform(scrollY, [0, 300], [0, -50]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      const startThreshold = 50;
      const scrollPerImage = 400; 
      const maxImages = 10;

      if (scrollPosition <= startThreshold) {
        setCnt(1);
        setShowCard(false);
      } else {
        let newIndex = Math.floor((scrollPosition - startThreshold) / scrollPerImage) + 1;

        if (newIndex >= maxImages) {
           setCnt(maxImages); // Lock at max
           setShowCard(true); 
        } else {
           setCnt(newIndex);
           setShowCard(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.main className="bg-black min-h-screen w-screen relative">

      {/* 1. FIXED HEADER 
        We use 'fixed' so it sits on top. 
        As you scroll, the opacity logic makes it disappear.
      */}
      <motion.div
        style={{ opacity: headerOpacity, y: headerY, scale: headerScale }}
        className="fixed top-0 left-0 h-screen w-screen flex justify-between px-4 z-20 pt-4 pointer-events-none"
      >
        <div className="flex flex-col justify-center">
          <div className="text-white text-6xl font-bold">
            India Facts Portal
          </div>
          <div className="flex text-2xl text-amber-50 mt-1.5">
            Visit every day<br /> to be aware of what is going on.
          </div>
        </div>
        <div className="flex align-baseline h-full pb-10 items-center">
          <img src="/images/india.jpg" className="h-[80%] object-cover rounded-md" alt="India" />
        </div>
      </motion.div>

      {/* 2. STICKY IMAGE CONTAINER 
        This sits behind the header initially.
        When header fades out, this stays visible in the center while you scroll.
      */}
      <div className="sticky top-0 h-screen w-screen flex items-center justify-center overflow-hidden z-10">
        
        <motion.div
           // FIX: Added shadow size (shadow-2xl) so the color works
           className="relative h-[75%] w-[85%] flex items-center justify-center overflow-hidden border border-zinc-800 rounded-2xl shadow-2xl shadow-amber-900/40 bg-zinc-900"
        >
            {/* Background Image */}
            <motion.img
              key={cnt}
              src={`/images/till_1889/today_${cnt}.jpg`}
              alt={`Fact ${cnt}`}
              // FIX: 'absolute inset-0' ensures image fills the rounded container
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-60"
            />
            
            {showCard && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="z-30"
              >
                <Card title="Freedom Scroll">
                    Welcome to Freedom scroll
                </Card>
              </motion.div>
            )}
        </motion.div>
      </div>

    </motion.main>
  );
}