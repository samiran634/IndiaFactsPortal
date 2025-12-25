// Server-side data fetching for Freedom Scroll with Gemini

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';

export interface HistoricalFact {
  topic: string;
  era: string;
  title: string;
  content: string;
  keyPoints: string[];
  personalities: { name: string; role: string }[];
  significance: string;
  year?: number;
}

export interface NewsItem {
  title: string;
  description: string;
  url: string;
  source: string;
  publishedAt: string;
}

export interface FreedomScrollData {
  facts: HistoricalFact[];
  error?: string;
}

// History topics embedded directly to avoid fs issues
const historyTopics = {
  periods: [
    {
      era: "Ancient India",
      topics: [
        "Indus Valley Civilization (3300-1300 BCE)",
        "Vedic Period and Aryan Migration",
        "Maurya Empire - Chandragupta, Ashoka",
        "Gupta Empire - Golden Age of India"
      ]
    },
    {
      era: "Medieval India",
      topics: [
        "Delhi Sultanate (1206-1526)",
        "Mughal Empire - Babur to Aurangzeb",
        "Maratha Empire - Shivaji",
        "Bhakti and Sufi Movements"
      ]
    },
    {
      era: "Freedom Struggle (1857-1947)",
      topics: [
        "1857 Revolt - Mangal Pandey, Rani Lakshmibai",
        "Indian National Congress Formation 1885",
        "Partition of Bengal 1905 and Swadeshi Movement",
        "Gandhi's Satyagraha - Non-Cooperation, Civil Disobedience",
        "Salt March 1930",
        "Quit India Movement 1942",
        "INA and Subhas Chandra Bose"
      ]
    },
    {
      era: "Modern India",
      topics: [
        "Constitution of India - Dr. B.R. Ambedkar",
        "Wars - 1962, 1965, 1971, Kargil 1999",
        "Green Revolution",
        "Economic Liberalization 1991"
      ]
    }
  ],
  keyPersonalities: [
    { name: "Mahatma Gandhi", contribution: "Father of the Nation" },
    { name: "Jawaharlal Nehru", contribution: "First Prime Minister" },
    { name: "Sardar Patel", contribution: "Iron Man of India" },
    { name: "Subhas Chandra Bose", contribution: "INA, Azad Hind" },
    { name: "Bhagat Singh", contribution: "Revolutionary" }
  ]
};

// Get random facts from Gemini based on history book reference
export async function getRandomHistoryFacts(): Promise<FreedomScrollData> {
  if (!GEMINI_API_KEY) {
    return { 
      facts: getDefaultFacts(),
      error: 'GEMINI_API_KEY not configured. Using default facts.'
    };
  }

  try {
    // Pick random era and topics
    const randomEra = historyTopics.periods[Math.floor(Math.random() * historyTopics.periods.length)];
    const randomTopics = randomEra.topics
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    const prompt = `You are an expert Indian history teacher preparing facts for competitive exam students (UPSC, SSC).

Based on this history reference:
Era: ${randomEra.era}
Topics: ${randomTopics.join(', ')}

Key Personalities Reference: ${JSON.stringify(historyTopics.keyPersonalities.slice(0, 5))}

Generate 3-4 detailed historical facts. For each fact provide:
- topic: the specific topic
- era: "${randomEra.era}"
- title: catchy title for the fact
- content: 2-3 sentences explaining the fact
- keyPoints: array of 3-4 bullet points for quick revision
- personalities: array of {name, role} for key people involved
- significance: why this is important for exams
- year: if applicable (number)

Return ONLY a valid JSON array, no markdown or explanation.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.7 }
        })
      }
    );

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    // Parse JSON from response
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      const facts: HistoricalFact[] = JSON.parse(jsonMatch[0]);
      return { facts };
    }
  } catch (err) {
    console.error('Gemini request failed:', err);
  }

  return { 
    facts: getDefaultFacts(),
    error: 'Failed to generate facts. Using defaults.'
  };
}

// Default facts as fallback
function getDefaultFacts(): HistoricalFact[] {
  return [
    {
      topic: "1857 Revolt",
      era: "Freedom Struggle (1857-1947)",
      title: "The Spark That Ignited a Nation",
      content: "The 1857 revolt began when sepoys refused to use cartridges greased with animal fat. Mangal Pandey's defiance at Barrackpore on March 29, 1857 marked the beginning of organized resistance against British rule.",
      keyPoints: [
        "Started at Meerut on May 10, 1857",
        "Spread across North and Central India",
        "Led to end of East India Company rule",
        "Bahadur Shah Zafar declared Emperor"
      ],
      personalities: [
        { name: "Mangal Pandey", role: "First martyr" },
        { name: "Rani Lakshmibai", role: "Queen of Jhansi" },
        { name: "Tantia Tope", role: "Military commander" }
      ],
      significance: "Frequently asked in UPSC about causes, leaders, and consequences",
      year: 1857
    },
    {
      topic: "Salt March",
      era: "Freedom Struggle (1857-1947)",
      title: "Gandhi's March to the Sea",
      content: "On March 12, 1930, Gandhi began a 240-mile march from Sabarmati Ashram to Dandi to make salt, defying British salt laws. This act of civil disobedience captured world attention.",
      keyPoints: [
        "March lasted 24 days",
        "78 volunteers started, thousands joined",
        "Broke British salt monopoly",
        "Led to mass civil disobedience"
      ],
      personalities: [
        { name: "Mahatma Gandhi", role: "Leader of the march" },
        { name: "Sarojini Naidu", role: "Led Dharasana raid" }
      ],
      significance: "Important for understanding Gandhian methods and civil disobedience",
      year: 1930
    },
    {
      topic: "Quit India Movement",
      era: "Freedom Struggle (1857-1947)",
      title: "Do or Die - The Final Push",
      content: "On August 8, 1942, Gandhi gave the call 'Do or Die' at Gowalia Tank, Mumbai. The Quit India Movement was the final mass struggle demanding immediate British withdrawal.",
      keyPoints: [
        "Largest mass movement of freedom struggle",
        "All major leaders arrested",
        "Underground movement continued",
        "Parallel governments formed in some areas"
      ],
      personalities: [
        { name: "Mahatma Gandhi", role: "Gave the call" },
        { name: "Aruna Asaf Ali", role: "Hoisted flag at Gowalia Tank" },
        { name: "Ram Manohar Lohia", role: "Underground leader" }
      ],
      significance: "Crucial for understanding the final phase of freedom struggle",
      year: 1942
    }
  ];
}
