export interface KnowledgeEntity {
  id: string;
  title: string;
  shortDescription?: string;
  fullContent?: string;
  relatedIds?: string[];
  tags?: string[];
  metadata?: Record<string, any>;
  
  // Global Engine Metadata
  primaryView?: 'map' | 'timeline' | 'vault';
  geoLocations?: { state: string; lat?: number; lng?: number }[]; 
  historicalContext?: { year?: number; era?: string };
}

import { MODERN_HISTORY_DATA } from './modern_history';
import { GENERAL_SCIENCE_DATA } from './general_science';

export const KNOWLEDGE_BASE: Record<string, KnowledgeEntity> = {
  ...MODERN_HISTORY_DATA,
  ...GENERAL_SCIENCE_DATA,

  // --- Steel Plants ---
  "second_five_year_plan": {
    id: "second_five_year_plan",
    title: "Second Five-Year Plan",
    shortDescription: "India's industrial plan (1956-1961).",
    fullContent: "The Second Five-Year Plan (1956-1961) focused on rapid industrialization. It saw the establishment of three new steel plants: **Rourkela** (Odisha) with Germany, **Bhilai** with Russia, and **Durgapur** with the UK.",
    tags: ["economy", "history"]
  },
  "rourkela_steel_plant": {
    id: "rourkela_steel_plant",
    title: "Rourkela Steel Plant",
    shortDescription: "Steel plant in Odisha set up with German collaboration.",
    fullContent: "Established during the Second Five-Year Plan in Rourkela, Odisha, with the assistance of West Germany.",
    tags: ["industry", "geography", "odisha"]
  },
  "bhilai_steel_plant": {
    id: "bhilai_steel_plant",
    title: "Bhilai Steel Plant",
    shortDescription: "Steel plant set up with Russian collaboration.",
    fullContent: "Established during the Second Five-Year Plan with the assistance of the USSR (Russia).",
    tags: ["industry", "geography"]
  },
  "durgapur_steel_plant": {
    id: "durgapur_steel_plant",
    title: "Durgapur Steel Plant",
    shortDescription: "Steel plant set up with UK collaboration.",
    fullContent: "Established during the Second Five-Year Plan with the assistance of the United Kingdom.",
    tags: ["industry", "geography"]
  },
  "bokaro_steel_plant": {
    id: "bokaro_steel_plant",
    title: "Bokaro Steel Plant",
    shortDescription: "Steel plant set up with Russian collaboration.",
    fullContent: "The Bokaro Steel Plant was established with the assistance of the Soviet Union (Russia). Unlike the others, it was built after the Second Five-Year Plan.",
    tags: ["industry", "geography"]
  },

  // --- Constitution ---
  "borrowed_features_constitution": {
    id: "borrowed_features_constitution",
    title: "Borrowed Features of Indian Constitution",
    shortDescription: "Features adopted from other countries' constitutions.",
    fullContent: `
- **Germany (Weimar Constitution)**: Suspension of Fundamental Rights during Emergency.
- **USSR (Russia)**: Justice in the Preamble, Fundamental Duties.
- **UK**: Bicameralism, Rule of Law, Parliamentary System, Single Citizenship.
    `,
    tags: ["polity", "constitution"]
  },

  // --- Defense ---
  "pechora_missile": {
    id: "pechora_missile",
    title: "Pechora Missile System",
    shortDescription: "Russian origin Surface-to-Air Missile.",
    fullContent: "The Pechora missile system is of Russian origin. It is a medium-range Surface-to-Air Missile (SAM) system.",
    tags: ["defense", "military"]
  },
  "ashok_chakra": {
    id: "ashok_chakra",
    title: "Ashok Chakra",
    shortDescription: "Highest Peace Time Gallantry Award.",
    fullContent: "The Ashok Chakra is India's highest springtime military decoration awarded for valor, courageous action, or self-sacrifice away from the battlefield.",
    tags: ["defense", "awards"]
  },

  // --- Transport ---
  "world_longest_transport": {
    id: "world_longest_transport",
    title: "World's Longest Transport Routes",
    shortDescription: "Record-holding transport infrastructure.",
    fullContent: `
- **Longest Road**: Pan-American Highway.
- **Longest Railway Line**: Trans-Siberian Line.
- **Longest Railway Platform**: Hubli (Karnataka, India).
    `,
    tags: ["geography", "transport"]
  },

  // --- Geography & Time ---
  "time_zones_and_meridians": {
    id: "time_zones_and_meridians",
    title: "Time Zones & Meridians",
    shortDescription: "Facts about IST and Global Time Zones.",
    fullContent: `
- **Indian Standard Meridian**: 82.5° East longitude.
- **Maximum Time Zones**: France (12 zones), followed by Russia (11 zones).
- **International Date Line**: Located in the Pacific Ocean.
    `,
    tags: ["geography"]
  },
  "world_geographic_extremes": {
    id: "world_geographic_extremes",
    title: "World Geographic Extremes",
    shortDescription: "Largest, longest, and deepest geographic features.",
    fullContent: `
- **Longest International Border**: Between Canada and USA.
- **Longest Coastline**: Canada.
- **Largest Volcano**: Mauna Loa (Hawaii, Pacific Ocean).
- **Deepest Point**: Challenger Deep in the Mariana Trench (Pacific Ocean).
- **Smallest Mountain Peak**: Located in Australia (Mount Wycheproof is often cited).
- **Longest Mountain Range**: Andes (South America).
    `,
    tags: ["geography"]
  },
  "pacific_ocean_features": {
    id: "pacific_ocean_features",
    title: "Pacific Ocean Features",
    shortDescription: "Major features of the Pacific Ocean.",
    fullContent: "Contains the **Ring of Fire**, **International Date Line**, and the **Mariana Trench** (Challenger Deep). It is home to Mauna Loa, the largest volcano.",
    tags: ["geography", "ocean"]
  },
  "equinox_and_solstice": {
    id: "equinox_and_solstice",
    title: "Equinox and Solstice",
    shortDescription: "Astronomical events affecting day length.",
    fullContent: `
- **Equinox**: Day and night are equal. Occurs on March 21st and September 23rd.
- **Summer Solstice (June 21)**: Sun overhead Tropic of Cancer. Longest day in Northern Hemisphere.
- **Winter Solstice (Dec 21/22)**: Sun overhead Tropic of Capricorn. Shortest day in Northern Hemisphere.
- **Eclipse Shadow**: The innermost, darkest part is called the **Umbra**.
    `,
    tags: ["geography", "astronomy"]
  },

  // --- Andaman & Nicobar ---
  "andaman_nicobar_islands": {
    id: "andaman_nicobar_islands",
    title: "Andaman & Nicobar Islands",
    shortDescription: "Union Territory in the Bay of Bengal.",
    fullContent: `
- **Jurisdiction**: Comes under Kolkata High Court.
- **Capital**: Port Blair (South Andaman), renamed to **Shri Vijaypuram**.
- **Strategic**: Houses India's only Tri-Service Command.
- **Channels**:
    - **10° Channel**: Separates Little Andaman and Car Nicobar.
    - **Duncan Passage**: Between South Andaman and Little Andaman.
- **Volcanoes**: 
    - **Barren Island**: Only active volcano in India.
    - **Narcondam**: Dormant volcano.
- **Peaks**:
    - North Andaman: Saddle Peak
    - Middle Andaman: Mount Diavolo
    - South Andaman: Mount Koyob
    - Great Nicobar: Mount Thullier
    `,
    tags: ["geography", "india", "islands"]
  },

  // --- History/Culture ---
  "jainism": {
    id: "jainism",
    title: "Jainism",
    shortDescription: "Ancient Indian religion.",
    fullContent: `
- **Tirthankara**: The 24th was **Mahavir**.
- **Sects**: 
    - **Shwetambar**: White-clad, believe women can attain liberation.
    - **Digambar**: Sky-clad (naked), believe women cannot attain liberation.
- **Philosophy**:
    - **Five Mahavratas**: Ahimsa (Non-violence), Satya (Truth), Asteya (Non-stealing), Brahmacharya (Celibacy), Aparigraha (Non-possession).
    - **Triratna (Three Jewels)**: Right Faith, Right Knowledge, Right Conduct.
    - **Terms**: Nirvana (Liberation), Jina (Conqueror).
- **Language**: Texts are in Prakrit.
    `,
    tags: ["history", "culture", "religion"]
  },
  "mughal_maratha_history": {
    id: "mughal_maratha_history",
    title: "Mughal and Maratha History",
    shortDescription: "Key facts from the Mughal and Maratha periods.",
    fullContent: `
- **Ramcharitmanas**: Written by Tulsidas during Emperor Akbar's reign.
- **Shivaji Maharaj**: Founded Maratha Empire when Aurangzeb was Mughal Emperor. His Council of Ministers was called **Ashta Pradhan**.
- **Books**:
    - *Humayun Nama* by Gulbadan Begum.
    - *Ain-i-Akbari* by Abul Fazl.
    - *Sakinatul Auliya* by Dara Shikoh.
- **Monuments**: Jama Masjid built by Shah Jahan.
    `,
    tags: ["history"]
  },
  


  // --- Polity ---
  "indian_polity_officials": {
    id: "indian_polity_officials",
    title: "Key Constitutional Officials",
    shortDescription: "CAG and Attorney General.",
    fullContent: `
- **CAG (Comptroller and Auditor General)**: Article 148.
- **Attorney General (AG)**: Article 76. First law officer. Can attend parliament but cannot vote.
    `,
    tags: ["polity"]
  },
  "women_in_politics": {
    id: "women_in_politics",
    title: "Notable Women in Indian Politics",
    shortDescription: "pathbreaking women leaders.",
    fullContent: `
- **First Woman CM**: Sucheta Kriplani (Uttar Pradesh).
- **First Woman Governor**: Sarojini Naidu (Uttar Pradesh).
- **First Woman Congress President**: Sarojini Naidu (Kanpur Session, 1925).
    `,
    tags: ["polity", "history"]
  },
  "mandal_commission": {
    id: "mandal_commission",
    title: "Mandal Commission",
    shortDescription: "Commission related to reservations.",
    fullContent: "Established by Prime Minister Morarji Desai to identify the socially or educationally backward classes of India.",
    tags: ["polity", "history"]
  },

  // --- Economy ---
  "monetary_policy_rates": {
    id: "monetary_policy_rates",
    title: "Monetary Policy Rates",
    shortDescription: "Key RBI interest rates.",
    fullContent: `
- **Repo Rate**: Rate at which RBI lends short-term to banks (with collateral). Also called Policy Rate.
- **Reverse Repo Rate**: Rate at which banks lend to RBI.
- **Bank Rate**: RBI lending to banks for long-term (no collateral).
- **MSF (Marginal Standing Facility)**: Overnight urgent loans at higher interest.
    `,
    tags: ["economy"]
  },

  // --- Sports ---
  "general_sports_trivia": {
    id: "general_sports_trivia",
    title: "General Sports Trivia",
    shortDescription: "Key milestones in sports.",
    fullContent: `
- **Olympics**: First modern games in Athens (1896).
- **Badminton**: Saina Nehwal was the first Indian to win an Olympic medal in Badminton.
- **Football**: Santosh Trophy is a football tournament.
- **Volleyball**: The term "Joust" is used.
- **Cricket**: First Day-Night Test was Australia vs New Zealand (2015, Adelaide).
    `,
    tags: ["sports"]
  },




  // --- Art & Culture (Data Set 2) ---
  "virupaksha_temple": {
    id: "virupaksha_temple",
    title: "Virupaksha Temple (Hampi)",
    shortDescription: "UNESCO site in Hampi dedicated to Lord Shiva.",
    fullContent: `
- **Location**: Hampi, near **Tungabhadra River**.
- **Style**: Dravidian (built ~7th century CE).
- **Deity**: Lord Shiva.
- **Hampi Geography**: 
    - Confluence of **Krishna** and **Tungabhadra** rivers (Raichur Doab).
    - Krishna river originates near Mahabaleshwar.
- **Temple Trend**: Mainland South India = Shiva; Coastal = Vishnu.
    `,
    tags: ["culture", "history", "art"]
  },
  "important_indian_temples": {
    id: "important_indian_temples",
    title: "Important Indian Temples",
    shortDescription: "List of major temples and their deities.",
    fullContent: `
- **Vitthala Temple**: Hampi (Vishnu, UNESCO).
- **Brihadeeswara**: Thanjavur (Shiva, Raja Chola).
- **Meenakshi**: Madurai (Shiva & Parvati).
- **Lingaraja**: Odisha (Shiva).
- **Sun Temple**: Konark, Odisha (Sun God, UNESCO).
- **Jagannath**: Odisha (Krishna/Vishnu).
- **Kedarnath**: Uttarakhand (Shiva, Jyotirlinga).
- **Badrinath**: Uttarakhand (Vishnu).
- **Ramanathaswamy**: Rameswaram (Shiva).
- **Somnath**: Gujarat (Shiva).
- **Kamakhya**: Assam (Ambubachi Mela).
- **Padmanabhaswamy**: Kerala (Vishnu, Richest temple).
    `,
    tags: ["culture", "art", "religion"]
  },

  // --- Geography (Data Set 2) ---
  "mountain_ranges_glaciers": {
    id: "mountain_ranges_glaciers",
    title: "Mountain Ranges & Glaciers",
    shortDescription: "Himalayas, Siachen, and other ranges.",
    fullContent: `
- **Siachen Glacier**: Located in **Karakoram Range**.
- **Himalayan Order (N to S)**: Trans-Himalaya -> Great Himalaya -> Lesser Himalaya -> Siwalik.
- **Ranges (N to S)**: Karakoram (Siachen, Biafo, Hispar) -> Ladakh -> Zanskar -> Pir Panjal -> Dhauladhar.
- **Plains (N to S)**: Bhabbar -> Terai -> Bhangar -> Khadra (Most fertile).
- **Other Ranges**: Aravalli (Gujarat-Delhi), Satpura, Vindhyan.
- **Ghats**: Western (Continuous), Eastern (Mutilated).
    `,
    tags: ["geography"]
  },
  "northeast_india_hills": {
    id: "northeast_india_hills",
    title: "North-East India Geography",
    shortDescription: "Hills and features of the Seven Sisters.",
    fullContent: `
- **Arunachal Pradesh**: Dapha, Miri, Abor, Mishmi, Patkai Bum (West to East).
- **Nagaland**: Naga Hills.
- **Manipur**: Manipur Hills. **Loktak Lake** (Phumdis/Floating islands), **Keibul Lamjao** NP.
- **Mizoram**: Lushai Hills.
- **Meghalaya**: Garo, Khasi, Jaintia (Part of Peninsular India, NOT Himalayas).
    `,
    tags: ["geography", "northeast"]
  },

  // --- History & Polity (Data Set 2) ---
  "arthashastra": {
    id: "arthashastra",
    title: "Arthashastra",
    shortDescription: "Political treatise by Kautilya.",
    fullContent: `
- **Author**: Kautilya (Chanakya/Vishnugupta), Mauryan Era (~3rd Century BCE).
- **Saptanga Theory (7 Limbs)**: 
    1. Swami (Ruler)
    2. Amatya (Ministers)
    3. Janapada (People/Territory)
    4. Durga (Fort)
    5. Kosha (Treasury)
    6. Danda (Army)
    7. Mitra (Allies)
- **6 Pillars**: Rajdharma, Rajneeti, Economic Policy, Military Strategy, Foreign Policy, Law & Order.
    `,
    tags: ["history", "polity"]
  },
  "constitutional_amendment": {
    id: "constitutional_amendment",
    title: "Constitutional Amendment Bill",
    shortDescription: "Process under Article 368.",
    fullContent: `
- **Article 368**: Process to amend (Addition, Variation, Repeal).
- **Introduction**: Either House (Lok Sabha or Rajya Sabha).
- **Joint Sitting**: **NO** provision.
- **President's Assent**: Mandatory (24th Amendment Act).
- **Methods**:
    1. **Special Majority**.
    2. **Special Majority + Ratification** (for federal changes).
    3. **Simple Majority** (Outside Art 368).
    `,
    tags: ["polity", "constitution"]
  },

  // --- Defense (Data Set 3) ---
  "defense_teams": {
    id: "defense_teams",
    title: "Defense Display Teams",
    shortDescription: "Sarang and Surya Kiran teams.",
    fullContent: `
- **Sarang Team**: Helicopter display team (est. 2003, Singapore 2004 debut). Uses 5 **ALH Dhruv** helicopters.
- **Surya Kiran Aerobatic Team (SKAT)**: Est. 1996, Bidar AF Station. Aerial displays.
    `,
    tags: ["defense", "air_force"]
  },
  "missile_systems": {
    id: "missile_systems",
    title: "Missiles & Defense Systems",
    shortDescription: "Indian and Foreign missile systems.",
    fullContent: `
- **Invar Anti-Tank Missile**: Used with T-90 Bhishma tanks.
- **Foreign Systems**:
    - **Israel**: David's Sling, Arrow, Barak, Iron Dome.
    - **USA**: THAAD, Shorad, Patriot.
- **Pinaka**: Multi-barrel rocket launcher (DRDO). "Bow of Shiva".
    - MK1 (40km), MK2 (60km), Extended (75km).
    - Long Range Guided Rocket (120km) tested in Chandipur.
- **Akash Prime**: Surface-to-Air Missile.
- **Astra BVR**: Beyond Visual Range Air-to-Air (100km+). Tested from Su-30MKI.
    `,
    tags: ["defense", "missiles"]
  },
  "tejas_aircraft": {
    id: "tejas_aircraft",
    title: "Tejas Aircraft",
    shortDescription: "Indigenously designed multi-role fighter.",
    fullContent: `
- **Overview**: Completed 25 years. First flight 2001 (pilot R. Rajkumar).
- **Design/Make**: ADA (Design) + HAL (Manufacture).
- **Variants**: MK1, MK1A, Naval LCA.
- **Engine Deal**: HAL signed $1B deal with **GE Aerospace** for 113 jet engines (2027-2032).
    `,
    tags: ["defense", "air_force"]
  },

  // --- Military Exercises (Data Set 3) ---
  "military_exercises": { // Consider breaking this down if too large, but modifying schema to support list items is complex. keeping as text for now.
    id: "military_exercises",
    title: "Military Exercises",
    shortDescription: "Joint exercises with other nations.",
    fullContent: `
- **Garud (France)**: in Mont-de-Marsan. Su-30MKI, IL-78, C-17.
- **Garud Shakti (Indonesia)**: Special Forces (Bakloh, HP).
- **Harimau Shakti (Malaysia)**: in Meghalaya.
- **Sampriti (Bangladesh)**: Rajput Regt (Meghalaya).
- **Mitra Shakti (Sri Lanka)**: Rajput Regt (Drones/UAV focus).
- **Ajeya Warrior (UK)**: Sikh Regt (Rajasthan).
- **Surya Kiran (Nepal)**: Assam Regt.
- **Desert Cyclone (UAE)**: Mechanized Infantry (Abu Dhabi).
- **Konkan (UK Navy)**: Western Coast.
- **SLINEX (Sri Lanka)**: Navy (INS Rana, INS Jyoti).
- **Yudh Abhyas (USA)**: Madras Regt.
- **Vinbax (Vietnam)**: Hanoi.
- **Astra Shakti**: Northern Command (Indian Army).
    `,
    tags: ["defense", "exercises"]
  },

  // --- Geopolitics & Geography (Data Set 3) ---
  "southeast_asia_geopolitics": {
    id: "southeast_asia_geopolitics",
    title: "SE Asia Geopolitics & Geography",
    shortDescription: "Thailand, Cambodia, Vietnam, Indonesia.",
    fullContent: `
- **Thailand vs Cambodia**: Conflict over **Preah Vihear Temple** (Dangrek Mts).
- **Thailand**: "Land of the Free" (Siam). Cap: Bangkok (Venice of East). Currency: Baht. Mekong flows through.
- **Vietnam**: Cap: Hanoi. Mekong flows through. High density.
- **Indonesia**: Largest archipelago (17,000+ islands). Cap: Jakarta. Equator passes through. Malacca Strait nearby.
    - **Java, Bali**.
    - Largest producer of **Palm Oil**.
    - **Rafflesia**: Largest flower found here.
    `,
    tags: ["geography", "geopolitics"]
  },

  // --- General Info (Data Set 3) ---
  "general_defense_info": {
    id: "general_defense_info",
    title: "General Defense Info",
    shortDescription: "Navy Day, Deployments.",
    fullContent: `
- **Navy Day**: Dec 4th (Sanghumugham Beach, Thiruvananthapuram).
- **ICGS Vigraha**: Visited Indonesia (ASEAN deployment).
    `,
    tags: ["defense", "misc"]
  },

  // --- Current Affairs 2025-26 & Misc (Data Set 4) ---
  "awards_2025": {
    id: "awards_2025",
    title: "Major Awards 2025",
    shortDescription: "Mrs. Universe, Nobel Prizes, etc.",
    fullContent: `
- **Mrs. Universe 2025**: **Sheri Singh** (First Indian).
- **Miss Universe 2025**: **Fatima Bosch** (Mexico). Venue: Thailand.
- **Nobel Peace Prize**: Maria Corina.
- **Nobel Facts**: 
    - Fields: Physics, Chemistry, Medicine, Literature, Peace (Economics added later).
    - Youngest: Malala Yousafzai (17).
    - Oldest: John B. Goodenough (97, Chemistry).
    `,
    tags: ["current_affairs", "awards"]
  },
  "science_tech_innovations": {
    id: "science_tech_innovations",
    title: "Science & Tech Innovations",
    shortDescription: "Solar plants, satellites, and discoveries.",
    fullContent: `
- **World's First Solar Thermal Power Plant**: China (Gobi Desert).
- **India's First Integrated Mobility App**: "Mumbai One".
- **India's First Fully Solar-Powered Zoo**: Karnataka.
- **Launch Vehicle for NISAR**: GSLV F16 (ISRO-NASA).
- **Astrosat**: Launched with PSLV C30.
- **Extended Range Drone Missile**: ULPGA M V3 (DRDO).
- **Natural Gas Discovery**: Andaman Sea.
    `,
    tags: ["science", "technology"]
  },
  "environment_wildlife": {
    id: "environment_wildlife",
    title: "Environment & Wildlife",
    shortDescription: "Conservation, Tiger initiatives, and Disasters.",
    fullContent: `
- **TOTR (Tigers Outside Tiger Reserves)**: Ministry of Environment initiative.
- **India's First Cheetah Safari**: Kuno National Park.
- **IUCN Congress**: Abu Dhabi. India launching Red List.
- **Mud Volcano**: Exploded on Baratang Island (Andaman).
- **Typhoon Matmo**: Pacific Ocean.
- **Cyclone Shakti**: Arabian Sea (Named by Sri Lanka).
- **Biosphere Reserve**: Cold Desert (HP) included in UNESCO network.
- **Hornbill Conservation Center**: Anamalai, TN.
    `,
    tags: ["environment", "geography"]
  },
  "international_affairs_miscellaneous": {
    id: "international_affairs_miscellaneous",
    title: "International Affairs & Misc",
    shortDescription: "Summits, New Appointments, and Global Events.",
    fullContent: `
- **OPEC**: Est 1960, Vienna. (Iraq, Saudi, UAE major suppliers to India).
- **BRICS 17th Summit 2025**: Brazil.
- **New Development Bank**: New members Colombia & Uzbekistan.
- **UNESCO**: First Arab DG (Khalid El Irani). USA withdrew.
- **Diwali**: California recognized as state holiday.
- **New START Treaty**: USA-Russia (Nuclear forces).
- **Operation Cactus**: Maldives.
- **Operation Mahadev**: Counter-terror in J&K (Dachigam NP).
- **World's Highest Motorable Road**: Ladakh (19,400 ft) by BRO.
    `,
    tags: ["international_relations", "current_affairs"]
  },
  "sports_updates_2025": {
    id: "sports_updates_2025",
    title: "Sports Updates 2025",
    shortDescription: "Cricket, Olympics, and Championships.",
    fullContent: `
- **Cricket**: 
    - T20 WC 2026 Qualification: **Italy** (First time).
    - First Male 5 Wickets in 5 Balls: **Curtis Campher**.
    - New ODI Captain: **Shubman Gill**.
- **Badminton**: BWF World Junior (Assam). Japan Open Winner: Shiyuki.
- **Chess**: FIDE Women's World Cup: **Divya Deshmukh**.
- **Football**: UEFA Women's Euro 2025 Winner: **England**.
- **Shooting**: World Cup 2027 & Junior 2028 in India.
- **Weightlifting**: Mirabai Chanu (Silver, World Champ Norway).
- **Para Athletics**: World Championship Delhi (India 10th).
    `,
    tags: ["sports", "current_affairs"]
  }
};

export const addKnowledge = (data: KnowledgeEntity[]) => {
  data.forEach(item => {
    KNOWLEDGE_BASE[item.id] = item;
  });
};
