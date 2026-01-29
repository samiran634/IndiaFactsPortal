/**
 * Knowledge Service - Simple API Fetcher (No localStorage caching)
 * 
 * This service fetches data directly from the API each time.
 * Uses in-memory cache only for the current session to avoid duplicate requests.
 */

import { DUMMY_KNOWLEDGE } from "./data/dummyKnowledge";

export interface KnowledgeEntity {
  id: string;
  title: string;
  shortDescription?: string;
  fullContent?: string;
  relatedIds?: string[];
  tags?: string[];
  metadata?: Record<string, any>;
  primaryView?: 'map' | 'timeline' | 'vault';
  geoLocations?: { state: string; lat?: number; lng?: number }[];
  historicalContext?: { year?: number; era?: string };
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL  ;

class KnowledgeService {
  // Simple in-memory cache for the current page session only
  private memoryCache: Record<string, KnowledgeEntity> | null = null;
  private fetchPromise: Promise<Record<string, KnowledgeEntity>> | null = null;

  /**
   * Get all knowledge entries (fetches from API)
   */
  async getAllKnowledge(): Promise<Record<string, KnowledgeEntity>> {
    // If already fetching, return the same promise to avoid duplicate requests
    if (this.fetchPromise) {
      return this.fetchPromise;
    }

    // If we have in-memory cache, return it (valid for current page session)
    if (this.memoryCache) {
      return this.memoryCache;
    }

    // Fetch from API
    this.fetchPromise = this.fetchFromAPI();
    
    try {
      this.memoryCache = await this.fetchPromise;
      return this.memoryCache;
    } finally {
      this.fetchPromise = null;
    }
  }

  private async fetchFromAPI(): Promise<Record<string, KnowledgeEntity>> {
    console.log('🌐 Fetching knowledge from API...');
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/knowledge`);
      if (!response.ok) {
        throw new Error('Failed to fetch knowledge');
      }

      const responseData = await response.json();
      
      // API returns { success, count, data } - extract the data array
      const entries = responseData.data || responseData;
      
      // Convert array to record if needed
      const knowledgeRecord: Record<string, KnowledgeEntity> = {};
      if (Array.isArray(entries)) {
        entries.forEach((item: KnowledgeEntity) => {
          if (item.id) {
            knowledgeRecord[item.id] = item;
          }
        });
      } else if (entries && typeof entries === 'object') {
        Object.assign(knowledgeRecord, entries);
      }

      console.log(`✅ Loaded ${Object.keys(knowledgeRecord).length} knowledge entries`);
      return knowledgeRecord;
    } catch (error) {
      console.error('❌ Failed to fetch knowledge, using dummy data fallback:', error);
      return DUMMY_KNOWLEDGE;
    }
  }

  /**
   * Get a single knowledge entry by ID
   */
  async getKnowledgeById(id: string): Promise<KnowledgeEntity | null> {
    const all = await this.getAllKnowledge();
    return all[id] || null;
  }

  /**
   * Get knowledge entries by tag
   */
  async getKnowledgeByTag(tag: string): Promise<KnowledgeEntity[]> {
    const all = await this.getAllKnowledge();
    return Object.values(all).filter(
      (entity) => entity.tags?.includes(tag)
    );
  }

  /**
   * Search knowledge entries
   */
  async searchKnowledge(query: string): Promise<KnowledgeEntity[]> {
    const all = await this.getAllKnowledge();
    const lowerQuery = query.toLowerCase();
    
    return Object.values(all).filter((entity) => {
      return (
        entity.title.toLowerCase().includes(lowerQuery) ||
        entity.shortDescription?.toLowerCase().includes(lowerQuery) ||
        entity.fullContent?.toLowerCase().includes(lowerQuery) ||
        entity.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery))
      );
    });
  }

  /**
   * Get all entities as an array
   */
  async getAllEntitiesArray(): Promise<KnowledgeEntity[]> {
    const all = await this.getAllKnowledge();
    return Object.values(all);
  }

  /**
   * Clear in-memory cache (call this after adding new knowledge)
   */
  clearCache(): void {
    this.memoryCache = null;
    this.fetchPromise = null;
  }

  /**
   * Force refresh from API
   */
  async refresh(): Promise<Record<string, KnowledgeEntity>> {
    this.clearCache();
    return this.getAllKnowledge();
  }
}

// Export singleton instance
export const knowledgeService = new KnowledgeService();

// Export for direct use
export default knowledgeService;
