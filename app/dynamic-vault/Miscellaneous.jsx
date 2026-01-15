"use client";
import React from "react";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { Miscellaneous_data } from "../utils/data/Miscellaneous";
import { GlobeIcon, FileTextIcon, RocketIcon } from "@radix-ui/react-icons";

// Helper to get random or relevant icon
const getIcon = (index) => {
    const icons = [GlobeIcon, FileTextIcon, RocketIcon];
    return icons[index % icons.length];
};

const MiscellaneousMainContent = () => {
    // Take first 9 items to fit grid nicely
    const items = Miscellaneous_data.slice(0, 9);

    return (
        <div className="w-full h-full min-h-[600px] p-8 overflow-y-auto custom-scrollbar">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-cyan-200 to-blue-500 mb-8 text-center sticky top-0 z-50 backdrop-blur-md py-4">
                Miscellaneous Updates
            </h1>
            
            <BentoGrid className="max-w-7xl mx-auto">
                {items.map((item, index) => (
                    <BentoCard
                        key={item.publishAT + index}
                        name={item.headding[0]}
                        className={index === 3 || index === 6 ? "col-span-3 md:col-span-2" : "col-span-3 md:col-span-1"}
                        background={
                            <div className="absolute inset-0 z-0">
                                <img 
                                    src={item.imageURL || "/images/placeholder.jpg"} 
                                    alt={item.headding[0]}
                                    className="h-full w-full object-cover opacity-40 transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
                            </div>
                        }
                        Icon={getIcon(index)}
                        description={item.description}
                        href={item.url}
                        cta="Read More"
                    />
                ))}
            </BentoGrid>
        </div>
    );
};

export default MiscellaneousMainContent;
