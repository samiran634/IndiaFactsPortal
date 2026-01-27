"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Search, Book, FlaskConical, History, GraduationCap, Loader2 } from "lucide-react";
import { knowledgeService, KnowledgeEntity } from "../utils/knowledgeService";

interface GlobalKnowledgeModalProps {
    onClose: () => void;
    onSelectEntity: (id: string) => void;
}

const GlobalKnowledgeModal: React.FC<GlobalKnowledgeModalProps> = ({ onClose, onSelectEntity }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filtertag, setFilterTag] = useState<string | null>(null);
    const [knowledgeData, setKnowledgeData] = useState<KnowledgeEntity[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Load knowledge data from API
    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            try {
                const data = await knowledgeService.getAllKnowledge();
                setKnowledgeData(Object.values(data));
            } catch (error) {
                console.error('Failed to load knowledge:', error);
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, []);

    const filteredData = useMemo(() => {
        return knowledgeData.filter(entity => {
            const matchesSearch = 
                entity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                entity.shortDescription?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                entity.tags?.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
            
            const matchesTag = filtertag ? entity.tags?.includes(filtertag) : true;

            return matchesSearch && matchesTag;
        });
    }, [searchQuery, filtertag, knowledgeData]);

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
            
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col relative z-10 overflow-hidden"
            >
                {/* Header */}
                <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                            <Book className="w-6 h-6 text-indigo-600" />
                            Global Knowledge Base
                        </h2>
                        <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 transition-colors">
                            <X className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>

                    {/* Search Bar */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input 
                            type="text"
                            placeholder="Search History, Science, Economy..."
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-white"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            autoFocus
                        />
                    </div>

                    {/* Quick Filters */}
                    <div className="flex gap-2 mt-4 overflow-x-auto pb-1 noscrollbar">
                        <button 
                            onClick={() => setFilterTag(null)}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${!filtertag ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
                        >
                            All
                        </button>
                        <button 
                            onClick={() => setFilterTag('history')}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border flex items-center gap-1 ${filtertag === 'history' ? 'bg-amber-100 text-amber-800 border-amber-200' : 'bg-white text-gray-600 border-gray-200 hover:bg-amber-50'}`}
                        >
                            <History className="w-3 h-3" /> History
                        </button>
                        <button 
                            onClick={() => setFilterTag('science')}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border flex items-center gap-1 ${filtertag === 'science' ? 'bg-violet-100 text-violet-800 border-violet-200' : 'bg-white text-gray-600 border-gray-200 hover:bg-violet-50'}`}
                        >
                            <FlaskConical className="w-3 h-3" /> Science
                        </button>
                         <button 
                            onClick={() => setFilterTag('bio')}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border flex items-center gap-1 ${filtertag === 'bio' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-white text-gray-600 border-gray-200 hover:bg-emerald-50'}`}
                        >
                            <GraduationCap className="w-3 h-3" /> Biology
                        </button>
                    </div>
                </div>

                {/* Results List */}
                <div className="flex-1 overflow-y-auto p-6 space-y-3 bg-gray-50/30">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                            <Loader2 className="w-8 h-8 animate-spin mb-3" />
                            <p>Loading knowledge base...</p>
                        </div>
                    ) : filteredData.length > 0 ? (
                        filteredData.map((entity) => (
                            <button
                                key={entity.id}
                                onClick={() => {
                                    onSelectEntity(entity.id);
                                    onClose(); 
                                }}
                                className="w-full text-left bg-white p-4 rounded-xl border border-gray-100 hover:border-indigo-300 hover:shadow-md transition-all group"
                            >
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className="font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
                                        {entity.title}
                                    </h3>
                                    {entity.tags && (
                                        <div className="flex gap-1">
                                            {entity.tags.slice(0, 2).map((t, i) => (
                                                <span key={i} className="text-[10px] uppercase font-bold text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-md">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <p className="text-sm text-gray-500 line-clamp-2">
                                    {entity.shortDescription || "No description available."}
                                </p>
                            </button>
                        ))
                    ) : (
                        <div className="text-center py-20 text-gray-400">
                            <Search className="w-12 h-12 mx-auto mb-3 opacity-20" />
                            <p>No results found for "{searchQuery}"</p>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default GlobalKnowledgeModal;
