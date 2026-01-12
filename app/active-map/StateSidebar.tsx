"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lightbulb, BookOpen, Newspaper, Loader2 } from "lucide-react";

interface StateData {
    facts: string[];
    concepts: string[];
}

interface StateSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    stateName: string | null;
    data: StateData | null;
}
/*
    usage:
    it is a sidebar ment to provide information about a selected state on the map.
    it shows special facts, important concepts, and recent news headlines for the selected state.
    it takes four props:
    - isOpen: a boolean to control the visibility of the sidebar.
    - onClose: a function to close the sidebar.
    - stateName: the name of the selected state.
    - data: an object containing facts and concepts about the state.


*/

const StateSidebar: React.FC<StateSidebarProps> = ({ isOpen, onClose, stateName, data }) => {
    const [news, setNews] = useState<string[]>([]);
    const [loadingNews, setLoadingNews] = useState(false);

    useEffect(() => {
        if (isOpen && stateName) {
            setLoadingNews(true);
            setNews([]);

            // Simulate API call with sample data
            setTimeout(() => {
                setNews([
                    `${stateName} achieves record agricultural output this season.`,
                    `New tech park inaugurated in the capital region of ${stateName}.`,
                    `tourism department launches new heritage walk initiative for visitors.`
                ]);
                setLoadingNews(false);
            }, 800);

            
        }
    }, [isOpen, stateName]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
                    />

                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full md:w-112.5 bg-white shadow-2xl z-50 overflow-y-auto border-l border-gray-100"
                    >
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-bold text-gray-800">{stateName}</h2>
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                                >
                                    <X className="w-6 h-6 text-gray-500" />
                                </button>
                            </div>

                            {data ? (
                                <div className="space-y-8">
                                    {/* News Section (New) */}
                                    <div className="bg-linear-to-br from-indigo-50 to-violet-50 rounded-xl p-5 border border-indigo-100">
                                        <div className="flex items-center gap-2 mb-4 text-indigo-700">
                                            <Newspaper className="w-5 h-5" />
                                            <h3 className="font-semibold text-lg">Today's Headlines</h3>
                                        </div>

                                        {loadingNews ? (
                                            <div className="flex items-center justify-center py-6 text-indigo-400 gap-2">
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                <span className="text-sm">Fetching news from Gemini...</span>
                                            </div>
                                        ) : news.length > 0 ? (
                                            <ul className="space-y-3">
                                                {news.map((item, index) => (
                                                    <li key={index} className="flex gap-3 text-gray-700 leading-relaxed text-sm">
                                                        <span className="text-indigo-400 mt-1">•</span>
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="text-sm text-gray-500 italic text-center">No recent news found.</p>
                                        )}
                                        <p className="text-xs text-indigo-300 mt-4 text-right">Updated daily • Powered by Gemini</p>
                                    </div>

                                    {/* Special Facts Section */}
                                    <div className="bg-amber-50 rounded-xl p-5 border border-amber-100">
                                        <div className="flex items-center gap-2 mb-4 text-amber-600">
                                            <Lightbulb className="w-5 h-5" />
                                            <h3 className="font-semibold text-lg">Special Facts</h3>
                                        </div>
                                        <ul className="space-y-3">
                                            {data.facts.map((fact, index) => (
                                                <li key={index} className="flex gap-3 text-gray-700 leading-relaxed">
                                                    <span className="text-amber-400 mt-1.5">•</span>
                                                    <span>{fact}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Important Concepts Section */}
                                    <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
                                        <div className="flex items-center gap-2 mb-4 text-blue-600">
                                            <BookOpen className="w-5 h-5" />
                                            <h3 className="font-semibold text-lg">Important Concepts</h3>
                                        </div>
                                        <ul className="space-y-3">
                                            {data.concepts.map((concept, index) => (
                                                <li key={index} className="flex gap-3 text-gray-700 leading-relaxed">
                                                    <span className="text-blue-400 mt-1.5">•</span>
                                                    <span>{concept}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                                    <p>No data available for this region.</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default StateSidebar;
