"use client";
import  TerminalDemo  from "../utils/ui/terminalUi";
import { useState } from "react";
import { Tech_data } from "../utils/data/tech";
import { motion, AnimatePresence } from "framer-motion";

function TechNewsCards() {
    const [newsIndex, setNewsIndex] = useState<number | null>(null);

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap justify-center gap-16 mt-10 perspective-1000"
        >
            {Tech_data.map((element, index) => {
                return (
                    <div 
                        key={index}
                        onMouseEnter={() => setNewsIndex(index)}
                        onMouseLeave={() => setNewsIndex(null)} 
                        className="relative cursor-pointer flex flex-col items-center gap-2 group z-10 hover:z-50"
                    >
                        <img 
                            src="/images/terminal.png" 
                            alt="terminal image" 
                            className="w-24 h-24 object-contain transition-transform duration-300 group-hover:scale-110"
                        />
                         <p className="text-cyan-400 font-mono text-sm max-w-50 text-center truncate bg-black/50 px-2 rounded-sm border border-transparent group-hover:border-cyan-500/30 transition-colors">
                            {element.headding[0]}
                        </p>

                        <AnimatePresence>
                            {newsIndex === index && (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.9, y: -10, rotateX: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: -10 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    className="absolute top-full mt-4 w-112.5 z-50"
                                >
                                    {/* Invisible bridge to prevent pointer-events gap */}
                                    <div className="absolute -top-4 inset-x-0 h-4 bg-transparent" />
                                    
                                    <div className="bg-black/95 backdrop-blur-xl border border-green-500/50 p-1 rounded-lg shadow-[0_0_50px_rgba(34,197,94,0.15)] overflow-hidden">
                                         <div className="bg-slate-950/50 rounded p-4">
                                            <TerminalDemo data={element} />
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                )
            })}
        </motion.div>
    )
}
export default TechNewsCards;