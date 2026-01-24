"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { getDefaultFacts, HistoricalFact } from "./data";
import { ScrollStack } from "./ScrollStack";
import { KNOWLEDGE_BASE } from "../utils/data/knowledge_base";
import { GlobalEngine } from "../utils/globalEngine";

export default function HistoryContent() {
  const searchParams = useSearchParams();
  const entityId = searchParams.get('entity');
  const tagFilter = searchParams.get('tag');

  // Convert KB entity to HistoricalFact format
  const entityToFact = (entity: typeof KNOWLEDGE_BASE[string]): HistoricalFact => {
    // Extract key points from fullContent (lines starting with -)
    const keyPoints = entity.fullContent
      ?.split('\n')
      .filter(line => line.trim().startsWith('-'))
      .map(line => line.replace(/^-\s*\**/, '').replace(/\*+$/, '').trim())
      .slice(0, 5) || [];

    return {
      topic: entity.tags?.[0] || 'History',
      era: entity.historicalContext?.era || 'Historical Era',
      title: entity.title,
      content: entity.shortDescription || entity.fullContent?.slice(0, 200) || '',
      keyPoints,
      personalities: [],
      significance: entity.shortDescription || '',
      year: entity.historicalContext?.year,
      places: entity.geoLocations?.map(loc => ({
        name: loc.state,
        latitude: loc.lat || 0,
        longitude: loc.lng || 0
      }))
    };
  };

  // Get facts based on linking logic
  const { facts, source, focusedEntity } = useMemo(() => {
    // Priority 1: Specific entity requested
    if (entityId && KNOWLEDGE_BASE[entityId]) {
      const entity = KNOWLEDGE_BASE[entityId];
      const mainFact = entityToFact(entity);
      
      // Get related history entities
      const relatedEntities = GlobalEngine.getEntitiesByTags(['history', 'mughal', 'states'])
        .filter(e => e.id !== entityId)
        .slice(0, 6)
        .map(entityToFact);
      
      return { 
        facts: [mainFact, ...relatedEntities], 
        source: 'linked',
        focusedEntity: entity.title
      };
    }

    // Priority 2: Tag-based filtering
    if (tagFilter) {
      const taggedEntities = GlobalEngine.getEntitiesByTags([tagFilter])
        .filter(e => e.tags?.includes('history') || e.tags?.includes('mughal') || e.tags?.includes('states'))
        .slice(0, 10)
        .map(entityToFact);
      
      if (taggedEntities.length > 0) {
        return { facts: taggedEntities, source: 'filtered', focusedEntity: null };
      }
    }

    // Default: Combine KB history entries with default facts
    const historyEntities = GlobalEngine.getEntitiesByTags(['history', 'mughal', 'states'])
      .slice(0, 6)
      .map(entityToFact);
    
    const defaultFacts = getDefaultFacts();
    return { 
      facts: [...historyEntities, ...defaultFacts], 
      source: 'default',
      focusedEntity: null
    };
  }, [entityId, tagFilter]);

  const displayEra = facts[0]?.era || "Historical Records";

  return (
    <main className="min-h-screen bg-black">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between bg-zinc-900/50 backdrop-blur-sm shadow-sm sticky top-0 z-20 border-b border-zinc-800">
         <Link href="/" className="text-gray-400 hover:text-white flex items-center gap-0.5 font-medium p-2 md:p-4 transition-colors text-sm md:text-base">
            ← Back to Home
          </Link>
        <div className="max-w-7xl mx-auto px-4 py-2 md:py-4 flex items-center justify-between">
          <h1 className="text-xl md:text-3xl font-bold text-gray-100 flex items-center gap-2 justify-center">
            <span className="text-2xl md:text-4xl">📜</span> History
            {source === 'linked' && focusedEntity && (
              <span className="text-xs bg-amber-800/50 text-amber-300 px-2 py-0.5 rounded-full ml-2 max-w-40 truncate">
                {focusedEntity}
              </span>
            )}
            {source === 'filtered' && tagFilter && (
              <span className="text-xs bg-violet-800/50 text-violet-300 px-2 py-0.5 rounded-full ml-2 uppercase">
                #{tagFilter}
              </span>
            )}
          </h1>
        </div>
        <div className="hidden md:flex items-center gap-2 p-4">
          <Link 
            href="/history" 
            className="text-xs px-3 py-1.5 bg-amber-900/50 text-amber-300 rounded-full hover:bg-amber-800/50 transition-colors"
          >
            All History
          </Link>
          <Link 
            href="/history?tag=mughal" 
            className="text-xs px-3 py-1.5 bg-zinc-800 text-zinc-300 rounded-full hover:bg-zinc-700 transition-colors"
          >
            Mughal Era
          </Link>
          <Link 
            href="/history?tag=states" 
            className="text-xs px-3 py-1.5 bg-zinc-800 text-zinc-300 rounded-full hover:bg-zinc-700 transition-colors"
          >
            States
          </Link>
        </div>
      </header>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-2 md:px-4 py-6 md:py-12 flex flex-col items-center justify-center min-h-[80vh]">     
        {facts && facts.length > 0 ? (
          <div className="flex justify-center text-left h-screen w-screen flex-col">
            <div className="flex text-center border-b-2 border-amber-900/20 pb-2 mb-4 px-1.5">
              <p className="text-amber-800/70 font-serif italic mx-2 text-sm md:text-base">
                {displayEra}
              </p>
              <span className="text-amber-700/50 text-xs">
                ({facts.length} records)
              </span>
            </div>
            <div className="flex justify-center px-2 md:px-0">
              <ScrollStack facts={facts}></ScrollStack>
            </div>
          </div>
        ) : (
          <div className="text-gray-500 text-center">
            No historical records found.
          </div>
        )}
      </div>
    </main>
  );
}
