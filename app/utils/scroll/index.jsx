"use client";
import React from "react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

import { KNOWLEDGE_BASE } from "../data/knowledge_base";
import { GlobalEngine } from "../globalEngine";
import Link from "next/link";
import { Globe, BookOpen, History } from "lucide-react";

export const SamuraiScroll = ({ fact, index, width = "max-w-3xl" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVissible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Engine Lookup
  const entityId = Object.keys(KNOWLEDGE_BASE).find(key => 
    KNOWLEDGE_BASE[key].title.toLowerCase() === fact.title.toLowerCase()
  );
  const actions = entityId ? GlobalEngine.getActions(entityId) : [];

  // Fallback map action if places exist but no entity found
  if (actions.length === 0 && fact.places && fact.places.length > 0) {
      // Just take the first place for the main action
      const firstPlace = fact.places[0];
       actions.push({
        type: 'navigate_map',
        label: `View ${firstPlace.name}`,
        url: `/active-map?state=${encodeURIComponent(firstPlace.name)}`,
        stateName: firstPlace.name
      });
  }

  useEffect(() => {
    // Check for mobile screen
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    // Open the scroll after a short delay to trigger the animation
    const openTimeout = setTimeout(() => {
      setIsOpen(true);
    }, 100);

    return () => {
      clearTimeout(openTimeout);
      window.removeEventListener("resize", checkMobile);
    };
  }, [index]);

  // VARIANTS: This defines the animation states
  const containerVariants = {
    closed: { width: "0px", opacity: 0 },
    open: { 
      width: "100%", 
      opacity: 1,
      transition: { 
        duration: 1.2, 
        ease: "easeInOut",
        when: "beforeChildren" // Open scroll, then show text
      }
    },
    exit: { 
      width: "0px", 
      opacity: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeInOut",
        when: "afterChildren" // Hide text, then close scroll
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, delay: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.2 } }
  };

  return (
    <>
    
    {isVissible &&
    
    <div className="flex flex-col items-center justify-center py-4 md:py-10 absolute w-full px-2 md:px-0">
      
   

      {/* --- THE SCROLL CONTAINER --- */}
      <div className={`relative h-auto md:h-100 flex items-center justify-center w-full ${isMobile ? 'max-w-[95vw]' : width}`}>
        <motion.div 
           className="absolute z-20 h-full w-4 md:w-8 bg-amber-900 rounded-full shadow-[4px_0_10px_rgba(0,0,0,0.5)] flex flex-col justify-between py-2 border-r border-amber-950"
           style={{ left: isMobile ? -8 : -14 }} 
        >
           <div className="h-2 md:h-4 w-full bg-yellow-600 rounded-sm"></div>
           <div className="h-2 md:h-4 w-full bg-yellow-600 rounded-sm"></div>
        </motion.div>

        {/* MIDDLE PAPER */}
        <motion.div
          variants={containerVariants}
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          className="relative h-[90%] bg-[#f2eecb] overflow-auto shadow-2xl flex items-center justify-center"
          style={{
             backgroundImage: "url('https://www.transparenttextures.com/patterns/aged-paper.png')",
             borderTop: "2px solid #5c4033",
             borderBottom: "2px solid #5c4033",
             minHeight: isMobile ? "250px" : "300px" 
          }}
        >
           <motion.div variants={contentVariants} className="p-4 md:p-8 text-center font-serif text-amber-900 w-full">
              <div key={index} className="relative pb-4 md:pb-8 border-b border-dashed border-amber-900/30 last:border-0">
                    
                    {/* Header: Year & Title */}
                    <div className="flex flex-col md:flex-row items-start md:items-baseline gap-2 md:gap-3 mb-3">
                      <span className="text-xl md:text-3xl font-serif font-bold text-red-900/80">
                        {index + 1}.
                      </span>
                      <div className="flex-1">
                        <h3 className="text-lg md:text-2xl font-bold text-amber-950 font-serif text-left">
                          {fact.title}
                        </h3>
                        {fact.year && (
                          <span className="inline-block bg-amber-900/10 text-amber-900 text-xs font-bold px-2 py-1 rounded mt-1">
                            Year: {fact.year}
                          </span>
                        )}
                      </div>
                      
                    </div>

                    {/* Main Content */}
                    <p className="text-amber-950/90 text-sm md:text-lg leading-relaxed font-serif mb-4 pl-0 md:pl-8 text-left">
                      {fact.content}
                    </p>

                    {/* Key Points Grid */}
                    <div className="pl-0 md:pl-8 mb-4">
                      <ul className="grid grid-cols-1 gap-2 list-disc list-inside text-amber-900/80 font-serif text-xs md:text-sm text-left">
                        {fact.keyPoints.map((point, i) => (
                          <li key={i}>{point}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Personalities Tags */}
                    {fact.personalities && fact.personalities.length > 0 && (
                      <div className="pl-0 md:pl-8 flex flex-wrap gap-1 md:gap-2 mb-4">
                        {fact.personalities.map((p, i) => (
                          <span key={i} className="inline-flex items-center gap-1 px-2 md:px-3 py-1 rounded-full bg-amber-100 border border-amber-200 text-amber-800 text-[10px] md:text-xs font-bold uppercase tracking-wider">
                            👤 {p.name} <span className="opacity-50 hidden md:inline">| {p.role}</span>
                          </span>
                        ))}
                      </div>
                    )}
                    {fact.places && fact.places.length > 0 && (
                      <div className="pl-0 md:pl-8 flex flex-wrap gap-1 md:gap-2 mb-4 cursor-pointer">
                        {fact.places.map((place, i) => (
                          <span key={i} className="inline-flex items-center gap-1 px-2 md:px-3 py-1 rounded-full bg-amber-100 border border-amber-200 text-amber-800 text-[10px] md:text-xs font-bold uppercase tracking-wider">
                            📍 {place.name}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* ACTIONS BAR - Global Engine Integration */}
                    {actions.length > 0 && (
                        <div className="pl-0 md:pl-8 mt-4 mb-4 flex flex-wrap gap-2">
                             {actions.map((action, idx) => (
                                <Link
                                    key={idx}
                                    href={action.url}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors uppercase tracking-wide no-underline ${
                                        action.type === 'navigate_map' ? 'bg-amber-100 border-amber-300 text-amber-800 hover:bg-amber-200' :
                                        action.type === 'navigate_vault' ? 'bg-indigo-100 border-indigo-300 text-indigo-800 hover:bg-indigo-200' :
                                        'bg-gray-100 border-gray-300 text-gray-800'
                                    }`}
                                >
                                    {action.type === 'navigate_map' && <Globe className="w-3 h-3" />}
                                    {action.type === 'navigate_vault' && <BookOpen className="w-3 h-3" />}
                                    {action.label}
                                </Link>
                            ))}
                        </div>
                    )}

                    {/* Significance Note */}
                    <div className="pl-0 md:pl-8 mt-4 bg-amber-50 p-2 md:p-3 rounded-r-lg border-l-4 border-amber-600">
                      <p className="text-xs md:text-sm text-amber-900 font-medium italic text-left">
                        <span className="font-bold not-italic">💡 Why it matters:</span> {fact.significance}
                      </p>
                    </div>

                  </div>
           </motion.div>
        </motion.div>

        {/* RIGHT ROLLER */}
        <motion.div 
           className="absolute z-20 h-full w-4 md:w-8 bg-amber-900 rounded-full shadow-[-4px_0_10px_rgba(0,0,0,0.5)] flex flex-col justify-between py-2 border-l border-amber-950"
           style={{ right: isMobile ? -8 : -14 }} 
        >
            <div className="h-2 md:h-4 w-full bg-yellow-600 rounded-sm"></div>
            <div className="h-2 md:h-4 w-full bg-yellow-600 rounded-sm"></div>
        </motion.div>

      </div>
        
    </div>}
    
    
    
    </>
    
  );
};