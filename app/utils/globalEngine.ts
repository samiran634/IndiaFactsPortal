import { knowledgeService, KnowledgeEntity } from "./knowledgeService";
import { STATE_URLS } from "./data/state_data";

export type ViewAction = 
  | { type: 'navigate_map', label: string, url: string, stateName: string }
  | { type: 'navigate_timeline', label: string, url: string }
  | { type: 'navigate_vault', label: string, url: string };

// List of all valid Indian state names for detection
const ALL_STATE_NAMES = Object.keys(STATE_URLS);

/**
 * Detect state names mentioned in text content
 */
function detectStatesInContent(content: string): string[] {
  const detectedStates: string[] = [];
  const contentLower = content.toLowerCase();
  
  for (const stateName of ALL_STATE_NAMES) {
    // Check for exact state name (case insensitive)
    if (contentLower.includes(stateName.toLowerCase())) {
      detectedStates.push(stateName);
    }
  }
  
  // Also check for common aliases
  const stateAliases: Record<string, string> = {
    'lucknow': 'Uttar Pradesh',
    'mumbai': 'Maharashtra',
    'bengaluru': 'Karnataka',
    'bangalore': 'Karnataka',
    'chennai': 'Tamil Nadu',
    'kolkata': 'West Bengal',
    'calcutta': 'West Bengal',
    'ahmedabad': 'Gujarat',
    'jaipur': 'Rajasthan',
    'patna': 'Bihar',
    'hyderabad': 'Telangana',
    'bhubaneswar': 'Odisha',
    'chandigarh': 'Punjab',
    'dehradun': 'Uttarakhand',
    'shimla': 'Himachal Pradesh',
    'thiruvananthapuram': 'Kerala',
    'trivandrum': 'Kerala',
    'guwahati': 'Assam',
    'ranchi': 'Jharkhand',
    'raipur': 'Chhattisgarh',
    'panaji': 'Goa',
    'imphal': 'Manipur',
    'kohima': 'Nagaland',
    'shillong': 'Meghalaya',
    'agartala': 'Tripura',
    'aizawl': 'Mizoram',
    'gangtok': 'Sikkim',
    'itanagar': 'Arunachal Pradesh',
    'awadh': 'Uttar Pradesh',
    'mysore': 'Karnataka',
    'vizag': 'Andhra Pradesh',
    'visakhapatnam': 'Andhra Pradesh',
    'pune': 'Maharashtra',
    'nagpur': 'Maharashtra',
    'coimbatore': 'Tamil Nadu',
    'madurai': 'Tamil Nadu',
    'kochi': 'Kerala',
    'cochin': 'Kerala',
    'varanasi': 'Uttar Pradesh',
    'agra': 'Uttar Pradesh',
    'amritsar': 'Punjab',
    'jodhpur': 'Rajasthan',
    'udaipur': 'Rajasthan',
    'surat': 'Gujarat',
    'vadodara': 'Gujarat',
  };
  
  for (const [alias, stateName] of Object.entries(stateAliases)) {
    if (contentLower.includes(alias) && !detectedStates.includes(stateName)) {
      detectedStates.push(stateName);
    }
  }
  
  return detectedStates;
}

export const GlobalEngine = {
  /**
   * Get meaningful actions for a given entity based on available metadata
   */
  getActions: async (entityId: string): Promise<ViewAction[]> => {
    const entity = await knowledgeService.getKnowledgeById(entityId);
    if (!entity) return [];

    const actions: ViewAction[] = [];
    const addedStates = new Set<string>();

    // 1. Map Navigation - from explicit geoLocations
    if (entity.geoLocations && entity.geoLocations.length > 0) {
      for (const loc of entity.geoLocations) {
        if (!addedStates.has(loc.state) && STATE_URLS[loc.state]) {
          actions.push({
            type: 'navigate_map',
            label: `View ${loc.state}`,
            url: `/active-map?state=${encodeURIComponent(loc.state)}`,
            stateName: loc.state
          });
          addedStates.add(loc.state);
        }
      }
    }

    // 2. Smart State Detection - scan content for state/city mentions
    const contentToScan = [
      entity.title || '',
      entity.shortDescription || '',
      entity.fullContent || ''
    ].join(' ');
    
    const detectedStates = detectStatesInContent(contentToScan);
    for (const stateName of detectedStates) {
      if (!addedStates.has(stateName) && STATE_URLS[stateName]) {
        actions.push({
          type: 'navigate_map',
          label: `View ${stateName}`,
          url: `/active-map?state=${encodeURIComponent(stateName)}`,
          stateName: stateName
        });
        addedStates.add(stateName);
      }
    }

    // 3. Timeline Navigation (for history-related entities)
    if (entity.historicalContext || entity.tags?.includes('history') || entity.tags?.includes('mughal') || entity.tags?.includes('states')) {
      actions.push({
        type: 'navigate_timeline',
        label: 'View in History',
        url: `/history?entity=${entityId}`
      });
    }

    // 4. Vault Navigation (for deep study)
    if (entity.tags?.includes('science') || entity.tags?.includes('concept') || entity.tags?.includes('biology')) {
      actions.push({
        type: 'navigate_vault',
        label: 'Study in Vault',
        url: `/dynamic-vault?entity=${entityId}`
      });
    }

    return actions;
  },

  /**
   * Gets the primary destination URL
   */
  getPrimaryLink: async (entityId: string): Promise<string> => {
    const entity = await knowledgeService.getKnowledgeById(entityId);
    if (!entity) return '#';

    if (entity.primaryView === 'map' && entity.geoLocations?.[0]) {
      return `/active-map?state=${encodeURIComponent(entity.geoLocations[0].state)}`;
    }
    if (entity.primaryView === 'timeline') {
      return '/history';
    }
    
    return `/dynamic-vault?entity=${entityId}`;
  },

  /**
   * Get all entities matching any of the given tags
   */
  getEntitiesByTags: async (tags: string[]): Promise<KnowledgeEntity[]> => {
    const allKnowledge = await knowledgeService.getAllKnowledge();
    return Object.values(allKnowledge).filter(entity => 
      entity.tags?.some(t => tags.includes(t))
    );
  },

  /**
   * Get all entities (for browsing)
   */
  getAllEntities: async (): Promise<KnowledgeEntity[]> => {
    return knowledgeService.getAllEntitiesArray();
  },

  /**
   * Get a single entity by ID
   */
  getEntityById: async (entityId: string): Promise<KnowledgeEntity | null> => {
    return knowledgeService.getKnowledgeById(entityId);
  },

  /**
   * Detect states mentioned in any text
   */
  detectStates: detectStatesInContent
};
