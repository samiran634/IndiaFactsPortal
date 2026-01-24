"use client";
import React, { useMemo } from "react";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { GlobalEngine } from "../utils/globalEngine";
import { GlobeIcon, FileTextIcon, RocketIcon, StarIcon, InfoCircledIcon } from "@radix-ui/react-icons";

// Helper to get random or relevant icon based on tags
const getIcon = (tags, index) => {
    if (tags?.includes('sports')) return RocketIcon;
    if (tags?.includes('current_affairs')) return StarIcon;
    if (tags?.includes('culture')) return GlobeIcon;
    if (tags?.includes('defense')) return InfoCircledIcon;
    const icons = [GlobeIcon, FileTextIcon, RocketIcon];
    return icons[index % icons.length];
};

const MiscellaneousMainContent = () => {
    // Get miscellaneous data from KNOWLEDGE_BASE
    const items = useMemo(() => {
        const entities = GlobalEngine.getEntitiesByTags([
            'current_affairs', 'culture', 'sports', 'defense', 
            'awards', 'misc', 'international_relations', 'geography'
        ]);
        // Map to BentoCard format
        return entities.slice(0, 9).map(entity => ({
            id: entity.id,
            name: entity.title,
            description: entity.shortDescription || entity.fullContent?.slice(0, 150) || '',
            imageURL: '',
            href: `/dynamic-vault?entity=${entity.id}`,
            tags: entity.tags
        }));
    }, []);

    if (items.length === 0) {
        return (
            <div className="text-white text-center mt-20">
                No miscellaneous data available.
            </div>
        );
    }

    return (
        <div className="w-full h-full min-h-150 p-8 overflow-y-auto custom-scrollbar">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-linear-to-tr from-cyan-200 to-blue-500 mb-8 text-center sticky top-0 z-50 backdrop-blur-md py-4">
                Knowledge Hub
            </h1>
            
            <BentoGrid className="max-w-7xl mx-auto">
                {items.map((item, index) => (
                    <BentoCard
                        key={item.id + index}
                        name={item.name}
                        className={index === 3 || index === 6 ? "col-span-3 md:col-span-2" : "col-span-3 md:col-span-1"}
                        background={
                            <div className="absolute inset-0 z-0">
                                <div className="h-full w-full bg-gradient-to-br from-slate-800 to-slate-900 opacity-80" />
                                <div className="absolute inset-0 bg-linear-to-t from-black/90 to-transparent" />
                            </div>
                        }
                        Icon={getIcon(item.tags, index)}
                        description={item.description}
                        href={item.href}
                        cta="Explore"
                    />
                ))}
            </BentoGrid>
        </div>
    );
};

export default MiscellaneousMainContent;
