"use client";
import TerminalDemo from "../utils/ui/terminalUi";
import { useState, useEffect } from "react";
import { GlobalEngine } from "../utils/globalEngine";
import { KnowledgeEntity } from "../utils/knowledgeService";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2 } from "lucide-react";

interface TechDataItem {
    type: string;
    headding: string[];
    description: string;
    url: string;
    content: string;
    tags: string[];
    actions: any[];
}

function TechNewsCards() {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [techData, setTechData] = useState<TechDataItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Load science/tech data from API
    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            try {
                const entities = await GlobalEngine.getEntitiesByTags([
                    'science', 'technology', 'bio', 'physics', 'chemistry', 
                    'environment', 'ecology', 'botany', 'genetics', 'health'
                ]);
                
                // Map KB entities to TerminalInterface format with tags and actions
                const mappedData = await Promise.all(
                    entities.map(async (entity: KnowledgeEntity) => ({
                        type: 'science',
                        headding: [entity.title],
                        description: entity.shortDescription || '',
                        url: `/dynamic-vault?entity=${entity.id}`,
                        content: entity.fullContent || '',
                        tags: entity.tags || [],
                        actions: await GlobalEngine.getActions(entity.id)
                    }))
                );
                
                setTechData(mappedData);
            } catch (error) {
                console.error('Failed to load tech data:', error);
            } finally {
                setIsLoading(false);
            }
        };
        
        loadData();
    }, []);

    const handleCardClick = (index: number) => {
        setSelectedIndex(index);
    };

    const handleClose = () => {
        setSelectedIndex(null);
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center text-green-400 mt-20 gap-4">
                <Loader2 className="w-8 h-8 animate-spin" />
                <p className="font-mono text-sm">Loading knowledge base...</p>
            </div>
        );
    }

    if (techData.length === 0) {
        return (
            <div className="text-white text-center mt-20">
                No science/tech data available.
            </div>
        );
    }

    const selectedData = selectedIndex !== null ? techData[selectedIndex] : null;

    return (
        <>
            {/* Card Grid */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-wrap justify-center gap-8 mt-10 px-4"
            >
                {techData.map((element: TechDataItem, index: number) => (
                    <div 
                        key={index}
                        onClick={() => handleCardClick(index)}
                        className="cursor-pointer flex flex-col items-center gap-2 group transition-all duration-300 hover:scale-105"
                    >
                        <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-green-900/50 to-cyan-900/50 rounded-xl border border-green-500/30 flex items-center justify-center group-hover:border-green-400 group-hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all">
                            <img 
                                src="/images/terminal.png" 
                                alt="terminal" 
                                className="w-12 h-12 md:w-16 md:h-16 object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                            />
                        </div>
                        <p className="text-cyan-400 font-mono text-xs md:text-sm max-w-24 md:max-w-32 text-center line-clamp-2 group-hover:text-cyan-300 transition-colors">
                            {element.headding[0]}
                        </p>
                    </div>
                ))}
            </motion.div>

            {/* Modal Popup */}
            <AnimatePresence>
                {selectedData && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={handleClose}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
                        />
                        
                        {/* Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] md:w-[80vw] lg:w-[60vw] max-w-3xl max-h-[85vh] z-[101]"
                        >
                            <div className="bg-slate-950 border border-green-500/50 rounded-xl shadow-[0_0_60px_rgba(34,197,94,0.2)] overflow-hidden">
                                {/* Header with Close Button */}
                                <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-green-900/30 to-cyan-900/30 border-b border-green-500/30">
                                    <h3 className="text-green-400 font-mono text-sm font-semibold truncate pr-4">
                                        📚 {selectedData.headding[0]}
                                    </h3>
                                    <button
                                        onClick={handleClose}
                                        className="p-1.5 rounded-lg bg-red-900/50 hover:bg-red-700 text-red-300 hover:text-white transition-colors border border-red-500/30 hover:border-red-400"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>
                                
                                {/* Content */}
                                <div className="p-4 max-h-[70vh] overflow-y-auto custom-scrollbar">
                                    <TerminalDemo data={selectedData} />
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
export default TechNewsCards;