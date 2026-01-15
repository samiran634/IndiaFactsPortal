import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

// --- Types ---
type VaultStage = 'idle' | 'focus' | 'minimized';

interface Topic {
  id: number;
  label: string;
}

interface RadialComponentProps {
  selected: number | null;
  setSelected: (id: number | null) => void;
  isButtonVisible:boolean,
    setIsButtonVisible:(flag:boolean)=>void;
}

const TOPICS: Topic[] = [
  { id: 0, label: "Polity & Economy" },
  { id: 1, label: "Technology" },
  { id: 2, label: "Miscellaneous" },
];

const RadialComponent: React.FC<RadialComponentProps> = ({ selected, setSelected,isButtonVisible,setIsButtonVisible }) => {
  const [stage, setStage] = useState<VaultStage>('idle');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleSelect = (id: number) => {
    setSelected(id);
    setStage('focus');
    setTimeout(() => setStage('minimized'), 3000);
    setIsButtonVisible(true);
  };

  // Logic for the Hand Rotation
  // -90deg is left (start), 0deg is center, 90deg is right (end)
  const getHandRotation = () => {
    if (selected !== null) return (selected - 1) * 45; // Lock on selection
    if (hoveredIndex !== null) return (hoveredIndex - 1) * 45; // Follow hover
    return -90; // Default position
  };

  const containerVariants: Variants = {
    idle: { scale: 1, x: "-50%", y: "-50%", left: "50%", top: "50%" },
    focus: { scale: 1.1, x: "-50%", y: "-50%", left: "50%", top: "50%" },
    minimized: { 
      scale: 0.4, 
      left: "calc(100% - 80px)", 
      top: "calc(100% - 80px)",
      x: "-50%",
      y: "-50%",
      transition: { duration: 1, ease: [0.4, 0, 0.2, 1] }
    }
  };

  return (
    /* THE WHOLE COMPONENT WRAPPER */
    <div className="fixed inset-0 z-50 pointer-events-none">
      
      <motion.div
        variants={containerVariants}
        animate={stage}
        className="absolute pointer-events-auto flex flex-col items-center justify-center p-8 origin-center"
      >
        <AnimatePresence mode="wait">
          {stage !== 'minimized' ? (
            <div className="flex flex-col items-center">
              
              {/* 1. THE CLOCK HAND (Indicator) */}
              <motion.div
                initial={false}
                animate={{ 
                  rotate: getHandRotation(),
                  opacity: stage === 'focus' ? 0 : 1,
                  height: selected !== null ? "120px" : "80px"
                }}
                transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                className="w-1 bg-linear-to-t from-cyan-400 to-transparent origin-bottom mb-8 shadow-[0_0_15px_#22d3ee] rounded-full hidden md:block"
              />

              {/* 2. THE TOPIC STRIP (Vertical on Mobile, Horizontal on Laptop) */}
              <div className="flex flex-col md:flex-row gap-4 md:gap-12 items-center">
                {TOPICS.map((topic) => {
                  const isSelected = selected === topic.id;
                  const isIdle = selected === null;

                  return (
                    <motion.div
                      key={topic.id}
                      onMouseEnter={() => isIdle && setHoveredIndex(topic.id)}
                      onMouseLeave={() => isIdle && setHoveredIndex(null)}
                      onClick={() => isIdle && handleSelect(topic.id)}
                      animate={{
                        scale: isSelected && stage === 'focus' ? 1.2 : 1,
                        opacity: isSelected || isIdle ? 1 : 0.2,
                        y: isSelected && stage === 'focus' ? -10 : 0
                      }}
                      className={`
                        relative cursor-pointer px-6 py-4 md:px-10 md:py-6 rounded-2xl border transition-all duration-300
                        ${isSelected && stage === 'focus' 
                          ? 'bg-white/5 backdrop-blur-3xl border-cyan-500/50 shadow-[0_0_50px_rgba(6,182,212,0.3)]' 
                          : 'border-transparent hover:border-white/10 hover:bg-white/5'
                        }
                      `}
                    >
                      <h2 className={`text-xl md:text-3xl font-black tracking-tighter uppercase italic
                        ${isSelected ? 'text-white' : 'text-slate-500'}`}>
                        {topic.label}
                      </h2>
                      
                      {/* Selection Progress Bar */}
                      {isSelected && stage === 'focus' && (
                        <motion.div 
                          layoutId="underline"
                          className="absolute bottom-0 left-0 h-1 bg-cyan-500 w-full rounded-full"
                        />
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* 3. MINIMIZED TRIGGER */
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 2.5 }} // Scale up to compensate for container scale 0.4
              onClick={() => { setStage('idle'); setSelected(null);setIsButtonVisible(false) }}
              className="w-16 h-16 rounded-full bg-slate-900 border border-cyan-500/50 flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.4)] group cursor-pointer"
            >
              <div className="w-5 h-5 border-2 border-cyan-400 rounded-sm rotate-45 group-hover:rotate-180 transition-transform duration-700" />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Background Ambience Lines */}
      <div className="absolute inset-0 z-[-1] opacity-30 pointer-events-none">
         <div className="absolute top-1/2 w-full h-px bg-slate-800" />
         <div className="absolute left-1/2 h-full w-px bg-slate-800" />
      </div>
    </div>
  );
};

export default RadialComponent;