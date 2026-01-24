import { KnowledgeEntity } from './knowledge_base';

export const MODERN_HISTORY_DATA: Record<string, KnowledgeEntity> = {
  // --- Later Mughals ---
  "later_mughals_period": {
    id: "later_mughals_period",
    title: "Later Mughal Period",
    shortDescription: "1707 onwards: Decline of the Empire.",
    fullContent: `
- **Start**: After Aurangzeb's death (1707).
- **Trend**: Weak rulers, disintegration.
- **Rulers Order**: Bahadur Shah I -> Jahandar Shah -> Farrukhsiyar -> Muhammad Shah Rangila -> Ahmad Shah -> Alamgir II -> Shah Alam II -> Akbar Shah II -> Bahadur Shah II (Zafar).
    `,
    tags: ["history", "mughal"]
  },
  "bahadur_shah_i": {
    id: "bahadur_shah_i",
    title: "Bahadur Shah I (Muazzam)",
    shortDescription: "First of the Later Mughals.",
    fullContent: `
- **Policies**: Attempted to improve relations with Rajputs and Marathas.
- **Marathas**: Released **Sahuji Maharaj**. Granted **Sardeshmukhi** (1/10th tax) but NOT **Chauth** (1/4th tax).
    `,
    tags: ["history", "mughal"]
  },
  "jahandar_shah": {
    id: "jahandar_shah",
    title: "Jahandar Shah",
    shortDescription: "Abolished Jaziya tax.",
    fullContent: `
- **Reforms**: Abolished **Jaziya** (tax on non-Muslims).
- **Titles**: Granted "Mirza Raja Sawai" to Jai Singh of Amber.
- **End**: First ruler to be killed while on the throne (by Farrukhsiyar).
    `,
    tags: ["history", "mughal"]
  },
  "farrukhsiyar": {
    id: "farrukhsiyar",
    title: "Farrukhsiyar",
    shortDescription: "Puppet of Sayyid Brothers.",
    fullContent: `
- **Rise**: Came to power with help of **Sayyid Brothers** (Abdullah Khan & Husain Ali).
- **Conflict**: Tried to kill the brothers but was killed by them instead.
    `,
    tags: ["history", "mughal"]
  },
  "muhammad_shah_rangila": {
    id: "muhammad_shah_rangila",
    title: "Muhammad Shah Rangila",
    shortDescription: "End of Sayyid Brothers & Nadir Shah's Invasion.",
    fullContent: `
- **Sayyid Brothers**: Their dominance ended during his reign.
- **Nizam-ul-Mulk**: Served as Wazir but left in 1724 to found **Hyderabad**.
- **Invasion**: **Nadir Shah** (Afghanistan) invaded.
    - Battle of **Karnal**.
    - Looted **Peacock Throne** (Takht-e-Taus) and treasures.
    `,
    tags: ["history", "mughal"]
  },

  // --- Decline Factors ---
  "decline_of_mughals": {
    id: "decline_of_mughals",
    title: "Decline of Mughal Empire",
    shortDescription: "Causes for the fall of the empire.",
    fullContent: `
- **Factors**:
    - Weak successors.
    - Internal struggles (Iranians, Turanis, Afghans, Hindustan factions).
    - Invasions (Nadir Shah).
    - Aurangzeb's divisive policies.
    - Financial depletion.
    - Weakening of **Jagirdari** and **Mansabdari** systems.
    `,
    tags: ["history", "mughal"]
  },

  // --- Independent States ---
  "rise_of_independent_states": {
    id: "rise_of_independent_states",
    title: "Rise of Independent States",
    shortDescription: "Types: Successor, Independent, Rebel.",
    fullContent: `
- **Successor States**: Part of empire but became de facto independent (Awadh, Bengal, Hyderabad).
- **Independent States**: Broke away fully (Rajputs, Mysore, Kerala).
- **Rebel States**: New empires by rebels (Jats, Sikhs, Marathas).
    `,
    tags: ["history", "states"]
  },
  "hyderabad_state": {
    id: "hyderabad_state",
    title: "Hyderabad State",
    shortDescription: "Founded by Nizam-ul-Mulk.",
    fullContent: `
- **Founder**: **Nizam-ul-Mulk** (Kilij Khan / Asaf Jah).
- **History**: Defeated Sayyid Brothers (1722), became Wazir, then left.
- **Establishment**: Defeated Mughal Viceroy Mubariz Khan in **Battle of Shakarkheda** (1724).
- **Dynasty**: Nizams of Hyderabad.
    `,
    tags: ["history", "states", "hyderabad"],
    primaryView: "map",
    geoLocations: [{ state: "Telangana" }]
  },
  "awadh_state": {
    id: "awadh_state",
    title: "Awadh State",
    shortDescription: "Founded by Saadat Khan.",
    fullContent: `
- **Founder**: **Saadat Khan** (Burhan-ul-Mulk). Committed suicide in 1739.
- **Successors**:
    - **Safdar Jang** (Son-in-law).
    - **Shuja-ud-Daula**: Promoted Lucknow culture.
    - **Asaf-ud-Daula**: Known for generosity ("God may not give, but Asaf-ud-Daula will").
    `,
    tags: ["history", "states", "awadh"],
    primaryView: "map",
    geoLocations: [{ state: "Uttar Pradesh" }]
  }
};
