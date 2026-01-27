"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import { getDefaultFacts, HistoricalFact } from "./data";
import { ScrollStack } from "./ScrollStack";
import { knowledgeService, KnowledgeEntity } from "../utils/knowledgeService";
import { GlobalEngine } from "../utils/globalEngine";
import { Loader2 } from "lucide-react";

export default function HistoryContent() {
  const searchParams = useSearchParams();
  const entityId = searchParams.get('entity');
  const tagFilter = searchParams.get('tag');
  
  const [facts, setFacts] = useState<HistoricalFact[]>([]);
  const [source, setSource] = useState<'linked' | 'filtered' | 'default'>('default');
  const [focusedEntity, setFocusedEntity] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Convert KB entity to HistoricalFact format
  const entityToFact = (entity: KnowledgeEntity): HistoricalFact => {
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

  // Load facts based on linking logic
  useEffect(() => {
    const loadFacts = async () => {
      setIsLoading(true);
      
      try {
        // Priority 1: Specific entity requested
        if (entityId) {
          const entity = await knowledgeService.getKnowledgeById(entityId);
          if (entity) {
            const mainFact = entityToFact(entity);
            
            // Get related history entities
            const relatedEntities = await GlobalEngine.getEntitiesByTags(['history', 'mughal', 'states']);
            const relatedFacts = relatedEntities
              .filter(e => e.id !== entityId)
              .slice(0, 6)
              .map(entityToFact);
            
            setFacts([mainFact, ...relatedFacts]);
            setSource('linked');
            setFocusedEntity(entity.title);
            setIsLoading(false);
            return;
          }
        }

        // Priority 2: Tag-based filtering
        if (tagFilter) {
          const taggedEntities = await GlobalEngine.getEntitiesByTags([tagFilter]);
          const filtered = taggedEntities
            .filter(e => e.tags?.includes('history') || e.tags?.includes('mughal') || e.tags?.includes('states'))
            .slice(0, 10)
            .map(entityToFact);
          
          if (filtered.length > 0) {
            setFacts(filtered);
            setSource('filtered');
            setFocusedEntity(null);
            setIsLoading(false);
            return;
          }
        }

        // Default: Combine KB history entries with default facts
        const historyEntities = await GlobalEngine.getEntitiesByTags(['history', 'mughal', 'states']);
        const historyFacts = historyEntities
          .slice(0, 6)
          .map(entityToFact);
        
        const defaultFacts = getDefaultFacts();
        setFacts([...historyFacts, ...defaultFacts]);
        setSource('default');
        setFocusedEntity(null);
      } catch (error) {
        console.error('Failed to load facts:', error);
        // Fallback to default facts
        setFacts(getDefaultFacts());
        setSource('default');
      } finally {
        setIsLoading(false);
      }
    };

    loadFacts();
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
        {isLoading ? (
          <div className="flex flex-col items-center justify-center text-gray-400 gap-4">
            <Loader2 className="w-8 h-8 animate-spin" />
            <p>Loading historical records...</p>
          </div>
        ) : facts && facts.length > 0 ? (
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
