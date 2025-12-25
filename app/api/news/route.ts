import { NextRequest, NextResponse } from 'next/server';

const NEWS_API_KEY = process.env.NEWS_API_KEY || '';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const date = searchParams.get('date');
  const keywords = searchParams.get('keywords') || 'india';

  if (!NEWS_API_KEY) {
    return NextResponse.json({ 
      news: [], 
      error: 'NEWS_API_KEY not configured' 
    });
  }

  if (!date) {
    return NextResponse.json({ 
      news: [], 
      error: 'Date is required' 
    });
  }

  try {
    const uri = `https://newsapi.org/v2/everything?q=${encodeURIComponent(keywords)}&from=${date}&to=${date}&sortBy=relevancy&language=en&apiKey=${NEWS_API_KEY}`;
    
    const response = await fetch(uri);
    const data = await response.json();
    
    if (data.status === 'error') {
      return NextResponse.json({ 
        news: [], 
        error: data.message || 'API error' 
      });
    }

    if (data.articles) {
      const news = data.articles.slice(0, 10).map((article: any) => ({
        title: article.title,
        description: article.description,
        url: article.url,
        source: article.source?.name || 'Unknown',
        publishedAt: article.publishedAt
      }));
      return NextResponse.json({ news });
    }
    
    return NextResponse.json({ news: [], error: 'No articles found' });
  } catch (err) {
    console.error('News fetch failed:', err);
    return NextResponse.json({ 
      news: [], 
      error: 'Failed to fetch news' 
    });
  }
}
