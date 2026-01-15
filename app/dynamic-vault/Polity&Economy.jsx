"use client";
import React, { useState, useEffect } from "react";
import { Card } from "../utils/ui/fileUi";
import { Polity_data } from "../utils/data/Politics";
import { Economy_data } from "../utils/data/Economy";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const PolityMainContent = () => {
    // Merge data from both sources
    const [combinedData, setCombinedData] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        // Interleave or merge the data
        const merged = [...Polity_data, ...Economy_data];
        // Optional: Shuffle or sort by date if needed
        setCombinedData(merged);
    }, []);

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % combinedData.length);
    };

    const handlePrev = () => {
        setActiveIndex((prev) => (prev - 1 + combinedData.length) % combinedData.length);
    };

    if (combinedData.length === 0) {
        return <div className="text-white text-center mt-20">Loading data...</div>;
    }

    const getCardProps = (offset) => {
        const index = (activeIndex + offset + combinedData.length) % combinedData.length;
        const item = combinedData[index];
        return {
            title: item.headding[0],
            content: [item.description, item.content], // Using description and content as list items
            type: item.type.toLowerCase(), // "politics" or "economy"
            key: item.publishAT + index, // unique key
        };
    };

    return (
        <div className="w-full h-full min-h-[600px] flex flex-col items-center justify-center relative perspective-1000 overflow-hidden">
            
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-amber-200 to-yellow-500 mb-12 z-10">
                Polity & Economy
            </h1>

            <div className="relative w-full max-w-4xl h-[450px] flex items-center justify-center">
                {/* Left Card */}
                <Card 
                    {...getCardProps(-1)} 
                    isActive={false} 
                    position="left" 
                    onClick={handlePrev}
                />

                {/* Center Card */}
                <Card 
                    {...getCardProps(0)} 
                    isActive={true} 
                    position="center" 
                />

                {/* Right Card */}
                <Card 
                    {...getCardProps(1)} 
                    isActive={false} 
                    position="right" 
                    onClick={handleNext} 
                />
            </div>

            {/* Controls */}
            <div className="flex gap-8 mt-8 z-50">
                <button 
                    onClick={handlePrev}
                    className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all border border-white/10 hover:border-amber-500/50"
                >
                    <ChevronLeft size={32} />
                </button>
                <button 
                    onClick={handleNext}
                    className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all border border-white/10 hover:border-amber-500/50"
                >
                    <ChevronRight size={32} />
                </button>
            </div>
            
            <div className="absolute bottom-4 text-xs text-gray-500">
                Showing {activeIndex + 1} of {combinedData.length}
            </div>
        </div>
    );
};

export default PolityMainContent;