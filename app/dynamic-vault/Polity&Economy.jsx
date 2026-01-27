"use client";
import React, { useState, useEffect } from "react";
import { Card } from "../utils/ui/fileUi";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { GlobalEngine } from "../utils/globalEngine";

const PolityMainContent = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [combinedData, setCombinedData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Load data from API using GlobalEngine
    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            try {
                const entities = await GlobalEngine.getEntitiesByTags(['polity', 'economy', 'constitution', 'industry']);
                
                // Map to card-compatible format with async actions
                const mappedData = await Promise.all(
                    entities.map(async (entity) => ({
                        id: entity.id,
                        title: entity.title,
                        content: [entity.shortDescription || '', entity.fullContent || ''].filter(Boolean),
                        type: entity.tags?.includes('economy') || entity.tags?.includes('industry') ? 'economy' : 'politics',
                        actions: await GlobalEngine.getActions(entity.id)
                    }))
                );
                
                setCombinedData(mappedData);
            } catch (error) {
                console.error('Failed to load polity/economy data:', error);
            } finally {
                setIsLoading(false);
            }
        };
        
        loadData();
    }, []);

    const handleNext = () => {
        if (combinedData.length > 0) {
            setActiveIndex((prev) => (prev + 1) % combinedData.length);
        }
    };

    const handlePrev = () => {
        if (combinedData.length > 0) {
            setActiveIndex((prev) => (prev - 1 + combinedData.length) % combinedData.length);
        }
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center text-amber-400 mt-20 gap-4">
                <Loader2 className="w-8 h-8 animate-spin" />
                <p className="text-sm">Loading polity & economy data...</p>
            </div>
        );
    }

    if (combinedData.length === 0) {
        return <div className="text-white text-center mt-20">No polity/economy data available.</div>;
    }

    const getCardProps = (offset) => {
        const index = (activeIndex + offset + combinedData.length) % combinedData.length;
        const item = combinedData[index];
        return {
            title: item.title,
            content: item.content,
            type: item.type,
            key: item.id + index,
            actions: item.actions
        };
    };

    return (
        <div className="w-full h-full min-h-150 flex flex-col items-center justify-center relative perspective-1000 overflow-hidden">
            
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-linear-to-tr from-amber-200 to-yellow-500 mb-12 z-10">
                Polity & Economy
            </h1>

            <div className="relative w-full max-w-4xl h-112.5 flex items-center justify-center">
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