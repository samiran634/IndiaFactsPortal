"use client";
import React from "react";
import { motion } from "framer-motion";

export const SamuraiScroll = ({ fact,index, width = "max-w-3xl" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVissible, setIsVisible]= useState(true);

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
  const sendRequestToActiveMap =(places)  =>{
    return ()=>{
      if(places && places.length>0){
         location.href=`/active-map?places=${encodeURIComponent(JSON.stringify(places))}`;
      }else{
        alert("No place data available for this fact.");
      }
    }
  }

  return (
    <>
    
    {isVissible &&
    
    <div className="flex flex-col items-center justify-center py-10 absolute">
      
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
           style={{ left: -14 }} 
        >
           <div className="h-4 w-full bg-yellow-600 rounded-sm"></div>
           <div className="h-4 w-full bg-yellow-600 rounded-sm"></div>
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
             minHeight: "300px" 
          }}
        >
           <motion.div variants={contentVariants} className="p-8 text-center font-serif text-amber-900 w-full">
              <div key={index} className="relative pb-8 border-b border-dashed border-amber-900/30 last:border-0">
                    
                    {/* Header: Year & Title */}
                    <div className="flex items-baseline gap-3 mb-3">
                      <span className="text-3xl font-serif font-bold text-red-900/80">
                        {index + 1}.
                      </span>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-amber-950 font-serif">
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
                    <p className="text-amber-950/90 text-lg leading-relaxed font-serif mb-4 pl-8">
                      {fact.content}
                    </p>

                    {/* Key Points Grid */}
                    <div className="pl-8 mb-4">
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 list-disc list-inside text-amber-900/80 font-serif text-sm">
                        {fact.keyPoints.map((point, i) => (
                          <li key={i}>{point}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Personalities Tags */}
                    {fact.personalities && fact.personalities.length > 0 && (
                      <div className="pl-8 flex flex-wrap gap-2 mb-4">
                        {fact.personalities.map((p, i) => (
                          <span key={i} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-100 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider">
                            👤 {p.name} <span className="opacity-50">| {p.role}</span>
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Significance Note */}
                    <div className="pl-8 mt-4 bg-amber-50 p-3 rounded-r-lg border-l-4 border-amber-600">
                      <p className="text-sm text-amber-900 font-medium italic">
                        <span className="font-bold not-italic">💡 Why it matters:</span> {fact.significance}
                      </p>
                    </div>

                  </div>
           </motion.div>
        </motion.div>

        {/* RIGHT ROLLER */}
        <motion.div 
           className="absolute z-20 h-full w-8 bg-amber-900 rounded-full shadow-[-4px_0_10px_rgba(0,0,0,0.5)] flex flex-col justify-between py-2 border-l border-amber-950"
           style={{ right: -14 }} 
        >
            <div className="h-4 w-full bg-yellow-600 rounded-sm"></div>
            <div className="h-4 w-full bg-yellow-600 rounded-sm"></div>
        </motion.div>

      </div>
        {isOpen && (
        <button 
          onClick={() => {
            setIsOpen(false)
            setTimeout(()=>{
              setIsVisible(false)
            },1000)
          }}
          className="mb-8 px-6 py-3 bg-red-800 text-amber-100 font-bold tracking-widest uppercase border-2 border-amber-600 hover:bg-red-900 transition-colors"
        >
          close Decree
        </button>
      )}
    </div>}
    
    
    
    </>
    
  );
};