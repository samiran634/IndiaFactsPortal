// Server-side data fetching functions for Dynamic Vault

const NEWS_API_KEY = process.env.NEWS_API_KEY || '';

export interface Article {
  title: string;
  description: string;
  url: string;
  source: { name: string };
  publishedAt: string;
  urlToImage?: string;
}

export interface NewsData {
  headlines: Article[];
  everything: Article[];
  error?: string;
}

// Fetch top headlines (for gist/summary with Gemini later)
export async function fetchGist(): Promise<Article[]> {
  if (!NEWS_API_KEY) {
    console.error('NEWS_API_KEY not configured');
    return [];
  }

  try {
    const uri = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${NEWS_API_KEY}`;
    const response = await fetch(uri, { next: { revalidate: 3600 } }); // Cache for 1 hour
    const data = await response.json();
    
    if (data.articles) {
      // TODO: Pass data.articles to Gemini for gist generation
      console.log('Headlines fetched for Gemini gist:', data.articles.length);
      console.log(data);
      return data.articles;
    }
    return [];
  } catch (err) {
    console.error('Error fetching headlines:', err);
    return [];
  }
}

// Fetch everything (detailed news about India)
export async function fetchHeadlines(): Promise<Article[]> {
  if (!NEWS_API_KEY) {
    console.error('NEWS_API_KEY not configured');
    return [];
  }

  try {
    const uri = `https://newsapi.org/v2/everything?q=india&sortBy=publishedAt&apiKey=${NEWS_API_KEY}`;
    const response = await fetch(uri, { next: { revalidate: 3600 } }); // Cache for 1 hour
    const data = await response.json();
    
    if (data.articles) {
      console.log('Everything data fetched:', data.articles.length);
      console.log(data);
      return data.articles;
    }
    return [];
  } catch (err) {
    console.error('Error fetching everything:', err);
    return [];
  }
}

// Combined fetch for all news data
export async function fetchAllNews(): Promise<NewsData> {
  if (!NEWS_API_KEY) {
    return {
      headlines: [],
      everything: [],
      error: 'API key not configured. Add NEWS_API_KEY to .env'
    };
  }

  const [headlines, everything] = await Promise.all([
    fetchGist(),
    fetchHeadlines()
  ]);

  return { headlines, everything };
}
