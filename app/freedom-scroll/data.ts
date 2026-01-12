import { GoogleGenerativeAI, Part } from "@google/generative-ai";

// 1. Initialize the SDK
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// Use 'gemini-1.5-flash' for speed and cost-efficiency
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export interface HistoricalFact {
  topic: string;
  era: string;
  title: string;
  content: string;
  keyPoints: string[];
  personalities: { name: string; role: string }[];
  significance: string;
  year?: number;
  places?: { name: string; latitude: number; longitude: number }[];
}

export interface FreedomScrollData {
  facts: HistoricalFact[];
  error?: string;
}

// Interface for Multimodal Input
export interface MediaAnalysisRequest {
  mediaData: string; // Base64 encoded string (no data:image/ prefix)
  mimeType: string;  // e.g. 'image/jpeg', 'application/pdf'
  userPrompt?: string; 
}

// --- TOPIC DATA ---
const historyTopics = {
  periods: [
    {
      era: "Ancient India",
      topics: ["Indus Valley", "Vedic Period", "Maurya Empire", "Gupta Empire"]
    },
    {
      era: "Medieval India",
      topics: ["Delhi Sultanate", "Mughal Empire", "Maratha Empire", "Bhakti Movement"]
    },
    {
      era: "Freedom Struggle",
      topics: ["1857 Revolt", "INC Formation", "Gandhi's Satyagraha", "Quit India", "INA"]
    },
    {
      era: "Modern India",
      topics: ["Constitution", "1971 War", "Green Revolution", "1991 Liberalization"]
    }
  ],
  keyPersonalities: [
    { name: "Mahatma Gandhi", contribution: "Father of the Nation" },
    { name: "Subhas Chandra Bose", contribution: "Azad Hind Fauj" }
  ]
};

// ---------------------------------------------------------
// FUNCTION 1: Get Text-Only Facts (Randomized)
// ---------------------------------------------------------
export async function getRandomHistoryFacts(): Promise<FreedomScrollData> {
  if (!GEMINI_API_KEY) {
    return { facts: getDefaultFacts(), error: 'API Key missing.' };
  }

  try {
    // Pick random topics
    const randomEra = historyTopics.periods[Math.floor(Math.random() * historyTopics.periods.length)];
    const randomTopics = randomEra.topics.sort(() => Math.random() - 0.5).slice(0, 3);

    const prompt = `
      Act as an Indian History expert. Generate 3 historical facts based on:
      Era: ${randomEra.era}, Topics: ${randomTopics.join(', ')}.
      
      Output ONLY a valid JSON array with objects containing:
      topic, era, title, content (2 sentences), keyPoints (array of strings), 
      personalities (array of {name, role}), significance, and year.
      Do not include markdown formatting like \`\`\`json.
    `;

    // SDK Call
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return parseGeminiResponse(text);

  } catch (err) {
    console.error('Gemini Text Request failed:', err);
    return { facts: getDefaultFacts(), error: 'Failed to fetch facts.' };
  }
}


// ---------------------------------------------------------
// HELPER: Parse JSON cleanly
// ---------------------------------------------------------
function parseGeminiResponse(text: string): FreedomScrollData {
  try {
    // 1. Remove Markdown code blocks if Gemini adds them
    const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    // 2. Find the array brackets to ensure valid JSON
    const jsonMatch = cleanText.match(/\[[\s\S]*\]/);
    
    if (jsonMatch) {
      const facts: HistoricalFact[] = JSON.parse(jsonMatch[0]);
      return { facts };
    } else {
      throw new Error("No JSON array found");
    }
  } catch (e) {
    console.error("JSON Parse Error:", e);
    return { facts: getDefaultFacts(), error: "Invalid data format received." };
  }
}

// ---------------------------------------------------------
// FALLBACK DATA
// ---------------------------------------------------------
export function getDefaultFacts(): HistoricalFact[] {
  return [
    {
      topic: "1857 Revolt",
      era: "Freedom Struggle",
      title: "The First War of Independence",
      content: "The revolt began in Meerut and spread across North India, marking the first major challenge to British rule.",
      keyPoints: ["Started May 10, 1857", "Mangal Pandey was a key figure", "Ended EIC rule"],
      personalities: [{ name: "Rani Lakshmibai", role: "Queen of Jhansi" }],
      significance: "Crucial turning point in colonial history",
      year: 1857,
      places: [
        { name: "Meerut", latitude: 28.9845, longitude: 77.7064 },
        { name: "Jhansi", latitude: 25.4484, longitude: 78.5685 },
        { name: "Delhi", latitude: 28.6139, longitude: 77.2090 }
      ]
    },
    {
      topic: "Non-Cooperation Movement",
      era: "Freedom Struggle",
      title: "Mass Boycott Against British Rule",
      content: "Launched by Mahatma Gandhi to encourage Indians to refuse cooperation with British institutions.",
      keyPoints: ["Started in 1920", "Boycott of schools and courts", "Promoted Swadeshi"],
      personalities: [{ name: "Mahatma Gandhi", role: "Leader of the movement" }],
      significance: "Marked the first nationwide mass movement",
      year: 1920,
      places: [
        { name: "Ahmedabad", latitude: 23.0225, longitude: 72.5714 },
        { name: "Chauri Chaura", latitude: 26.6483, longitude: 83.7654 }
      ]
    },
    {
      topic: "Civil Disobedience Movement",
      era: "Freedom Struggle",
      title: "Breaking Colonial Laws Peacefully",
      content: "This movement emphasized non-violent resistance against unjust British laws.",
      keyPoints: ["Dandi March", "Salt Law violation", "Nationwide participation"],
      personalities: [{ name: "Mahatma Gandhi", role: "Leader" }],
      significance: "Strengthened mass participation in freedom struggle",
      year: 1930,
      places: [
        { name: "Sabarmati Ashram", latitude: 23.0600, longitude: 72.5800 },
        { name: "Dandi", latitude: 20.9422, longitude: 72.9244 }
      ]
    },
    {
      topic: "Quit India Movement",
      era: "Freedom Struggle",
      title: "Do or Die Movement",
      content: "A call for immediate independence from British rule during World War II.",
      keyPoints: ["Launched in 1942", "Mass protests", "British crackdown"],
      personalities: [{ name: "Mahatma Gandhi", role: "National leader" }],
      significance: "Final mass uprising before independence",
      year: 1942,
      places: [
        { name: "Mumbai", latitude: 19.0760, longitude: 72.8777 },
        { name: "Delhi", latitude: 28.6139, longitude: 77.2090 }
      ]
    },
    {
      topic: "Indian National Congress Formation",
      era: "Freedom Struggle",
      title: "Birth of Organized Nationalism",
      content: "Founded to provide a platform for political dialogue and reform.",
      keyPoints: ["Founded in 1885", "Allan Octavian Hume played a key role", "Moderate phase"],
      personalities: [{ name: "A.O. Hume", role: "Founder" }],
      significance: "Laid foundation for India's freedom movement",
      year: 1885,
      places: [
        { name: "Bombay (Mumbai)", latitude: 19.0760, longitude: 72.8777 }
      ]
    },
    {
      topic: "Swadeshi Movement",
      era: "Freedom Struggle",
      title: "Economic Nationalism",
      content: "Encouraged the use of indigenous products and boycott of British goods.",
      keyPoints: ["Started after Bengal Partition", "Promoted Indian industries", "Public participation"],
      personalities: [{ name: "Bal Gangadhar Tilak", role: "Nationalist leader" }],
      significance: "Strengthened economic self-reliance",
      year: 1905,
      places: [
        { name: "Kolkata", latitude: 22.5726, longitude: 88.3639 }
      ]
    },
    {
      topic: "Bengal Partition",
      era: "Colonial Rule",
      title: "Divide and Rule Policy",
      content: "The British divided Bengal for administrative reasons, leading to widespread protests.",
      keyPoints: ["Announced in 1905", "Led to Swadeshi Movement", "Reversed in 1911"],
      personalities: [{ name: "Lord Curzon", role: "Viceroy of India" }],
      significance: "Triggered mass nationalist resistance",
      year: 1905,
      places: [
        { name: "Bengal Presidency", latitude: 22.9868, longitude: 87.8550 },
        { name: "Kolkata", latitude: 22.5726, longitude: 88.3639 }
      ]
    },
    {
      topic: "Indian Independence",
      era: "Freedom Struggle",
      title: "End of British Rule",
      content: "India gained independence after decades of struggle and sacrifice.",
      keyPoints: ["August 15, 1947", "End of colonial rule", "Partition of India"],
      personalities: [{ name: "Jawaharlal Nehru", role: "First Prime Minister of India" }],
      significance: "Birth of a sovereign nation",
      year: 1947,
      places: [
        { name: "New Delhi", latitude: 28.6139, longitude: 77.2090 },
        { name: "Red Fort", latitude: 28.6562, longitude: 77.2410 }
      ]
    }
  ];
}
