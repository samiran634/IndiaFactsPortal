import { GoogleGenerativeAI, Part } from "@google/generative-ai";

// 1. Initialize the SDK
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
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
// export interface MediaAnalysisRequest {
//   mediaData: string; // Base64 encoded string (no data:image/ prefix)
//   mimeType: string;  // e.g. 'image/jpeg', 'application/pdf'
//   userPrompt?: string; 
// }

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
    const response =await result.response;
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
      year: 1857
    },
      {
      topic: "Pulwama Attack",
      era: "Modern day terror",
      title: "Patriosim for country",
      content: "February 14 is widely observed as a Black Day to honor the 40 Central Reserve Police Force (CRPF) personnel martyred in the 2019 Pulwama terror attack.",
      keyPoints: ["Started May 10, 1857", "Mangal Pandey was a key figure", "Ended EIC rule"],
      personalities: [{ name: "Rani Lakshmibai", role: "Queen of Jhansi" }],
      significance: "Crucial turning point in colonial history",
      year: 2019
    }
  ];
}
