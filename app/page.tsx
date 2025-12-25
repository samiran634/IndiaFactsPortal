"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ScrollText, MapPinned, DatabaseZap, Bookmark, ArrowRight, Sparkles } from "lucide-react";

// --- Components ---

// 1. The Particle "Spark" Component
// This generates a single floating spark with randomized movement.
const Spark = ({ side, color }: { side: "left" | "right"; color: string }) => {
  // Randomize starting position along the height and animation timing
  const randomYStart = Math.random() * 80 + 10; // Start between 10% and 90% height
  const randomDelay = Math.random() * 4;
  const randomDuration = Math.random() * 4 + 3;
  const randomScale = Math.random() * 0.5 + 0.5;

  const initialX = side === "left" ? "-10vw" : "110vw";
  const finalX = side === "left" ? "40vw" : "60vw"; // They drift towards the center

  return (
    <motion.div
      initial={{ x: initialX, y: `${randomYStart}vh`, opacity: 0, scale: 0 }}
      animate={{
        x: finalX,
        y: [`${randomYStart}vh`, `${randomYStart - 20}vh`], // Drift upwards slightly
        opacity: [0, 1, 0], // Fade in then out
        scale: [0, randomScale, 0],
      }}
      transition={{
        duration: randomDuration,
        repeat: Infinity,
        delay: randomDelay,
        ease: "easeInOut",
      }}
      style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}, 0 0 20px ${color}` }}
      className="absolute w-1 h-1 md:w-1.5 md:h-1.5 rounded-full blur-[1px] pointer-events-none z-0"
    />
  );
};

// 2. The Card Component for consistency
const FeatureCard = ({ href, colorTheme, icon: Icon, title, description }: any) => {
    const themeClasses = {
        orange: "border-orange-500/30 hover:border-orange-400 text-orange-400 group-hover:text-orange-300 hover:shadow-[0_0_30px_rgba(249,115,22,0.3)]",
        blue: "border-blue-500/30 hover:border-blue-400 text-blue-400 group-hover:text-blue-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]",
        green: "border-green-500/30 hover:border-green-400 text-green-400 group-hover:text-green-300 hover:shadow-[0_0_30px_rgba(34,197,94,0.3)]",
    };

    const currentTheme = themeClasses[colorTheme as keyof typeof themeClasses];

  return (
    <Link href={href}>
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        className={`group relative h-full p-8 bg-slate-900/60 backdrop-blur-md rounded-2xl border ${currentTheme} transition-all duration-500 overflow-hidden`}
      >
        {/* Subtle background gradient inside card */}
        <div className={`absolute inset-0 bg-gradient-to-br ${colorTheme === 'orange' ? 'from-orange-900/20' : colorTheme === 'blue' ? 'from-blue-900/20' : 'from-green-900/20'} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
        
        <div className="relative z-10">
            <Icon className={`w-12 h-12 mb-6 ${currentTheme.split(' ')[2]}`} />
            <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-white/90 transition-colors">
            {title}
            </h2>
            <p className="text-slate-400 mb-8 leading-relaxed">
            {description}
            </p>
            <div className={`flex items-center font-medium ${currentTheme.split(' ')[2]}`}>
                Explore
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </div>
        </div>
      </motion.div>
    </Link>
  );
};


export default function Home() {
  // Generate arrays for sparks
  const leftSparks = Array.from({ length: 15 }); // Orange/Saffron sparks
  const rightSparks = Array.from({ length: 15 }); // Green sparks

  // Animation variants for staggering children elements
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
  };

  return (
    // Changed base to dark slate for contrast with sparks
    <main className="min-h-screen bg-slate-950 relative overflow-hidden flex flex-col justify-center">
      
      {/* --- Background Animation Layer --- */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle central glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-slate-900/50 rounded-full blur-3xl opacity-40"></div>
        {/* Saffron Sparks from Left */}
        {leftSparks.map((_, i) => (
            <Spark key={`left-${i}`} side="left" color="#da5e00ff" /> // Tailwind orange-500
        ))}
        {/* Green Sparks from Right */}
        {rightSparks.map((_, i) => (
            <Spark key={`right-${i}`} side="right" color="#22c55e" /> // Tailwind green-500
        ))}
      </div>


      {/* --- Main Content --- */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col items-center justify-center px-6 py-16 md:py-24"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-800 backdrop-blur-sm mb-6 text-sm text-slate-300">
            <Sparkles className="w-4 h-4 text-yellow-500" />
            <span>The ultimate companion for aspirants</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-orange-500 via-white to-green-500 bg-clip-text text-transparent drop-shadow-sm">
              India Facts Portal
            </span>
          </h1>
          <div className="h-1.5 w-40 mx-auto bg-gradient-to-r from-orange-600 via-slate-200 to-green-600 rounded-full blur-[2px] mb-8"></div>

          <p className="text-lg md:text-xl text-slate-300 text-center max-w-2xl mx-auto leading-relaxed">
            Your interactive gateway to History, Geography, and Defence.
            Master competitive exams with visual timelines and dynamic data.
          </p>
        </motion.div>

        {/* Navigation Cards Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full px-4">
          
          <FeatureCard 
            href="/freedom-scroll"
            colorTheme="orange"
            icon={ScrollText}
            title="Freedom Scroll"
            description="Journey through India's freedom struggle from 1857 to 1947 on an immersive interactive timeline."
          />

          <FeatureCard 
            href="/active-map"
            colorTheme="blue"
            icon={MapPinned}
            title="Active Map"
            description="Interactive multi-layered map visualizing rivers, mountain passes, national parks, and defence bases."
          />

           <FeatureCard 
            href="/dynamic-vault"
            colorTheme="green"
            icon={DatabaseZap}
            title="Dynamic Vault"
            description="Access crucial current affairs data from the past 5 years: defence deals, summits, and major awards."
          />

        </motion.div>

        {/* Quick Links */}
        <motion.div variants={itemVariants} className="mt-16 flex gap-6">
          <Link
            href="/bookmarks"
            className="group flex items-center gap-3 px-8 py-4 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-full text-slate-200 font-medium transition-all duration-300 hover:shadow-lg hover:shadow-slate-900/50"
          >
            <Bookmark className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform" />
            <span>My Bookmarks</span>
          </Link>
        </motion.div>
      </motion.div>

      {/* Footer */}
      <motion.footer initial={{opacity: 0}} animate={{opacity: 1, transition:{delay: 1.5}}} className="absolute bottom-6 w-full text-center text-slate-500 text-sm z-10">
        <p>Designed & Built for India's Future Leaders 🇮🇳</p>
      </motion.footer>
    </main>
  );
}