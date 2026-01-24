// Module Types
export type Module = 'history' | 'active-map' | 'dynamic-vault';

// Category Types
export type Category = 
  | 'History' 
  | 'Geography' 
  | 'Defence' 
  | 'Polity' 
  | 'CurrentAffairs';

// Event Types for Freedom Scroll
export type EventType = 'Revolt' | 'CongressSession' | 'GovernorGeneral' | 'Movement' | 'Other';

// Map Element Types for Active Map
export type MapElementType = 'River' | 'MountainPass' | 'NationalPark' | 'AirForceBase' | 'NavalBase';

// Vault Category Types for Dynamic Vault
export type VaultCategory = 
  | 'DefenceDeals' 
  | 'InternationalSummits' 
  | 'Awards' 
  | 'GovernmentSchemes' 
  | 'EconomicDevelopments';

// Base Fact Interface
export interface Fact {
  id: string;
  title: string;
  content: string;
  category: Category;
  subcategory: string;
  module: Module;
  source: string;
  relatedFacts: string[];
  lastUpdated: string; // ISO date string
}

// Personality for Timeline Events
export interface Personality {
  name: string;
  role: string;
  description: string;
}

// Timeline Event (Freedom Scroll)
export interface TimelineEvent extends Fact {
  year: number;
  eventName: string;
  personalities: Personality[];
  impact: string;
  eventType: EventType;
}

// Coordinates for Map Elements
export interface Coordinates {
  lat: number;
  lng: number;
}

// Map Element (Active Map)
export interface MapElement extends Fact {
  coordinates: Coordinates;
  elementType: MapElementType;
  state: string;
  connections?: string[];
  recentFacts?: string[]; // IDs of related facts from past 5 years
}


// Current Affairs Entry (Dynamic Vault)
export interface CurrentAffairsEntry extends Fact {
  year: number;
  vaultCategory: VaultCategory;
}

// Defence Deal specific
export interface DefenceDeal extends CurrentAffairsEntry {
  vaultCategory: 'DefenceDeals';
  countriesInvolved: string[];
  equipmentDetails: string;
  strategicSignificance: string;
}

// Summit specific
export interface InternationalSummit extends CurrentAffairsEntry {
  vaultCategory: 'InternationalSummits';
  hostCountry: string;
  keyOutcomes: string[];
  indiaRole: string;
}

// Award specific
export interface Award extends CurrentAffairsEntry {
  vaultCategory: 'Awards';
  recipient: string;
  achievementDescription: string;
}

// Bookmark
export interface Bookmark {
  factId: string;
  module: Module;
  category: Category;
  addedAt: string; // ISO date string
}

// Search Result
export interface SearchResult {
  fact: Fact;
  module: Module;
  matchedTerms: string[];
  relevanceScore: number;
}

// Filter State
export interface FilterState {
  module: Module;
  categories: Category[];
  subcategories: string[];
  eventTypes?: EventType[];
  yearRange?: { start: number; end: number };
  mapLayers?: MapElementType[];
}

// Local Storage Schemas
export interface BookmarkStorage {
  version: number;
  bookmarks: Bookmark[];
}

export interface FilterStorage {
  version: number;
  filters: {
    [module: string]: FilterState;
  };
}
