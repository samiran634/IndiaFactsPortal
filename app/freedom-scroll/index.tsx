'use client';

import { useState } from 'react';
import { HistoricalFact, NewsItem } from './data';

interface FreedomScrollProps {
  facts: HistoricalFact[];
  error?: string;
}

// News Search Component
const NewsSearch = () => {
  const [date, setDate] = useState('');
  const [keywords, setKeywords] = useState('');
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!date) {
      setSearchError('Please select a date');
      return;
    }

    setLoading(true);
    setSearchError(null);

    try {
      const response = await fetch(`/api/news?date=${date}&keywords=${encodeURIComponent(keywords)}`);
      const data = await response.json();
      
      if (data.error) {
        setSearchError(data.error);
        setNews([]);
      } else {
        setNews(data.news || []);
      }
    } catch (err) {
      setSearchError('Failed to fetch news');
      setNews([]);
    } finally {
      setLoading(false);
    }
  };

  const keywordOptions = ['Sports', 'Defence', 'Politics', 'Economy', 'Technology', 'Education'];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        📰 Search News by Date
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* Date Picker */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Select Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        {/* Keywords */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Keywords (optional)</label>
          <input
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="e.g., sports, defence, india"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        {/* Search Button */}
        <div className="flex items-end">
          <button
            onClick={handleSearch}
            disabled={loading}
            className="w-full px-6 py-2 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 disabled:bg-orange-300 transition-colors"
          >
            {loading ? 'Searching...' : 'Search News'}
          </button>
        </div>
      </div>

      {/* Quick Keyword Buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        {keywordOptions.map((kw) => (
          <button
            key={kw}
            onClick={() => setKeywords(kw.toLowerCase())}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              keywords.toLowerCase() === kw.toLowerCase()
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {kw}
          </button>
        ))}
      </div>

      {searchError && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm mb-4">
          ⚠️ {searchError}
        </div>
      )}

      {/* News Results */}
      {news.length > 0 && (
        <div className="border-t pt-4">
          <h4 className="font-medium text-gray-700 mb-3">Found {news.length} articles</h4>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {news.map((item, idx) => (
              <a
                key={idx}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <h5 className="font-medium text-gray-800 hover:text-orange-600">{item.title}</h5>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{item.description}</p>
                <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                  <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded">{item.source}</span>
                  <span>{new Date(item.publishedAt).toLocaleDateString()}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Fact Card Component
const FactCard = ({ fact }: { fact: HistoricalFact }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-4">
        <span className="text-orange-100 text-sm">{fact.era}</span>
        <h3 className="text-xl font-bold text-white">{fact.title}</h3>
        {fact.year && (
          <span className="inline-block mt-1 px-2 py-0.5 bg-white/20 rounded text-white text-sm">
            {fact.year}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-gray-700 mb-4">{fact.content}</p>

        {/* Key Points */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-600 mb-2">📌 Key Points for Revision:</h4>
          <ul className="space-y-1">
            {fact.keyPoints.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-orange-500 mt-1">•</span>
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* Expandable Section */}
        {expanded && (
          <>
            {/* Personalities */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-600 mb-2">👤 Key Personalities:</h4>
              <div className="flex flex-wrap gap-2">
                {fact.personalities.map((person, idx) => (
                  <span key={idx} className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-sm">
                    {person.name} <span className="text-orange-400">({person.role})</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Significance */}
            <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
              <h4 className="text-sm font-semibold text-amber-700 mb-1">🎯 Exam Significance:</h4>
              <p className="text-sm text-amber-800">{fact.significance}</p>
            </div>
          </>
        )}

        {/* Toggle Button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 text-orange-500 hover:text-orange-600 text-sm font-medium"
        >
          {expanded ? '▲ Show Less' : '▼ Show More Details'}
        </button>
      </div>
    </div>
  );
};

// Main Component
export const FreedomScrollContent = ({ facts, error }: FreedomScrollProps) => {
  return (
    <div>
      {/* News Search Section */}
      <NewsSearch />

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800">
          ⚠️ {error}
        </div>
      )}

      {/* Random Facts Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
          📚 Today&apos;s Random History Facts
        </h2>
        <p className="text-gray-600 mb-6">
          Gemini picks random topics from Indian history for your daily revision
        </p>
      </div>

      {/* Facts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {facts.map((fact, idx) => (
          <FactCard key={idx} fact={fact} />
        ))}
      </div>

      {facts.length === 0 && !error && (
        <div className="text-center py-12 text-gray-500">
          <div className="text-6xl mb-4">📜</div>
          <p>No facts available. Check your API configuration.</p>
        </div>
      )}
    </div>
  );
};
