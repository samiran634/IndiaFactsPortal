import { NextRequest, NextResponse } from 'next/server';
import { unstable_cache } from 'next/cache';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';

// Cached function to fetch news from Gemini
// The keyParts ['state-news', state] ensure valid cache isolation per state
const getCachedNews = async (state: string) => {
    if (!GEMINI_API_KEY) return null;

    const prompt = `Find and summarize 3 recent and important news headlines specifically for the Indian state of "${state}" from the last week. 
    Focus on development, culture, or major events. 
    Return ONLY a JSON array of strings, e.g., ["Headline 1", "Headline 2", "Headline 3"]. 
    Do not keep any markdown formatting.`;

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${GEMINI_API_KEY}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }]
                }),
            }
        );

        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '[]';

        // Clean up markdown code blocks if Gemini returns them
        const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();

        return JSON.parse(jsonStr);
    } catch (err) {
        console.error(`Gemini fetch failed for ${state}:`, err);
        return null;
    }
};

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const state = searchParams.get('state');

    if (!state) {
        return NextResponse.json({ news: [], error: 'State is required' }, { status: 400 });
    }

    if (!GEMINI_API_KEY) {
        return NextResponse.json({
            news: [
                "Gemini API Key not configured.",
                "Unable to fetch real-time news."
            ],
            error: 'API Key missing'
        });
    }

    try {
        // unstable_cache wraps the data fetching function
        // 1st arg: Data fetch function
        // 2nd arg: Key parts (must be unique per state) -> ['state-news', state]
        // 3rd arg: Options (revalidate: 86400 seconds = 24 hours)
        const cachedFetch = unstable_cache(
            async () => getCachedNews(state),
            ['state-news-v2', state],
            { revalidate: 86400 }
        );

        let newsItems = await cachedFetch();

        if (!newsItems || !Array.isArray(newsItems)) {
            newsItems = ["Failed to fetch updated news."];
        }

        return NextResponse.json({ news: newsItems });

    } catch (err) {
        console.error('State news API error:', err);
        return NextResponse.json({
            news: ["Error processing news request."],
            error: 'Internal Server Error'
        }, { status: 500 });
    }
}
