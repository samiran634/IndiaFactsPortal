import { knowledgeService, KnowledgeEntity } from './knowledgeService';

export interface LinkedSegment {
  text: string;
  linkId?: string; // If present, this segment is a link
}

/**
 * Scans the provided text and identifies substrings that match titles in the Knowledge Base.
 * Returns an array of segments (text + optional link).
 * Note: This is now an async function since it fetches from API.
 */
export async function parseContentWithLinks(text: string): Promise<LinkedSegment[]> {
  if (!text) return [];

  // Fetch knowledge base from API
  const knowledgeBase = await knowledgeService.getAllKnowledge();

  // 1. Build a map of potential keywords (titles) -> IDs
  const keywordMap: Record<string, string> = {};
  
  Object.values(knowledgeBase).forEach(entity => {
    // Normalize keys: lowercase for case-insensitive matching
    keywordMap[entity.title.toLowerCase()] = entity.id;
  });

  // 2. Sort keywords by length (descending) to match longest phrases first
  const keywords = Object.keys(keywordMap).sort((a, b) => b.length - a.length);

  // 3. Simple replacement strategy
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
 * Sync version that works with pre-fetched data (for use in components that already have data)
 */
export function parseContentWithLinksSync(text: string, knowledgeBase: Record<string, KnowledgeEntity>): LinkedSegment[] {
  if (!text) return [];

  const keywordMap: Record<string, string> = {};
  
  Object.values(knowledgeBase).forEach(entity => {
    keywordMap[entity.title.toLowerCase()] = entity.id;
  });

  const keywords = Object.keys(keywordMap).sort((a, b) => b.length - a.length);
  const escapeRegExp = (string: string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(`(${keywords.map(escapeRegExp).join('|')})`, 'gi');
  
  const parts = text.split(pattern);
  const result: LinkedSegment[] = [];

  parts.forEach(part => {
    if (!part) return;
    
    const lowerPart = part.toLowerCase();
    if (keywordMap[lowerPart]) {
      result.push({
        text: part,
        linkId: keywordMap[lowerPart]
      });
    } else {
      result.push({ text: part });
    }
  });

  return result;
}

/**
 * Explicitly formatted links like [[Concept Name]] or [[id:concept_id]]
 */
export function parseWikiLinks(text: string): LinkedSegment[] {
    return []; 
}
