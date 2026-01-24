import { KNOWLEDGE_BASE, KnowledgeEntity } from './data/knowledge_base';

export interface LinkedSegment {
  text: string;
  linkId?: string; // If present, this segment is a link
}

/**
 * Scans the provided text and identifies substrings that match titles in the Knowledge Base.
 * Returns an array of segments (text + optional link).
 */
export function parseContentWithLinks(text: string): LinkedSegment[] {
  if (!text) return [];

  // 1. Build a map of potential keywords (titles) -> IDs
  // To avoid matching common words, we could filter by length or explicit list.
  // For now, let's match all Titles.
  const keywordMap: Record<string, string> = {};
  
  Object.values(KNOWLEDGE_BASE).forEach(entity => {
    // Normalize keys: lowercase for case-insensitive matching
    keywordMap[entity.title.toLowerCase()] = entity.id;
    
    // We could add entity.tags or aliases here if we wanted "Steal Plant" to link to "Rourkela" etc.
  });

  // 2. Sort keywords by length (descending) to match longest phrases first
  // e.g. match "Second Five Year Plan" before "Plan"
  const keywords = Object.keys(keywordMap).sort((a, b) => b.length - a.length);

  // 3. Simple replacement strategy
  // We'll use a regex to find matches. 
  // Escaping regex special chars is important if titles have them.
  const escapeRegExp = (string: string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  
  const pattern = new RegExp(`(${keywords.map(escapeRegExp).join('|')})`, 'gi');
  
  const parts = text.split(pattern);
  const result: LinkedSegment[] = [];

  parts.forEach(part => {
    if (!part) return;
    
    const lowerPart = part.toLowerCase();
    if (keywordMap[lowerPart]) {
      result.push({
        text: part, // Keep original case for display
        linkId: keywordMap[lowerPart]
      });
    } else {
      result.push({ text: part });
    }
  });

  return result;
}

/**
 * explicitly formatted links like [[Concept Name]] or [[id:concept_id]]
 * This function can handle those if we decide to use that format.
 */
export function parseWikiLinks(text: string): LinkedSegment[] {
    // Basic implementation for [[ ... ]] style if needed later
    return []; 
}
