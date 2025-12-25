import { Article } from './data';

interface VaultProps {
  headlines: Article[];
  everything: Article[];
  error?: string;
}

export const Vault = ({ headlines, everything, error }: VaultProps) => {
  return (
    <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow bg-white">
      <h2 className="text-xl font-semibold text-green-700">Dynamic Vault</h2>
      <p className="text-gray-500 mt-2">Current Affairs</p>
      
      {error && <p className="text-red-500 mt-4">{error}</p>}
      
      {!error && (
        <div className="mt-4 space-y-4">
          {/* Top Headlines Section - Ready for Gemini Gist */}
          <div className="border-b pb-4">
            <h3 className="font-medium text-gray-700 mb-2">📰 Top Headlines ({headlines.length})</h3>
            <p className="text-xs text-gray-400 mb-2">Ready for Gemini gist generation</p>
            <div className="max-h-48 overflow-y-auto space-y-2">
              {headlines.slice(0, 5).map((article, idx) => (
                <div key={idx} className="text-sm p-2 bg-gray-50 rounded">
                  <a href={article.url} target="_blank" rel="noopener noreferrer" 
                     className="text-blue-600 hover:underline font-medium">
                    {article.title}
                  </a>
                  <p className="text-gray-500 text-xs mt-1">{article.source?.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Everything Section */}
          <div>
            <h3 className="font-medium text-gray-700 mb-2">🌐 All India News ({everything.length})</h3>
            <div className="max-h-48 overflow-y-auto space-y-2">
              {everything.slice(0, 5).map((article, idx) => (
                <div key={idx} className="text-sm p-2 bg-gray-50 rounded">
                  <a href={article.url} target="_blank" rel="noopener noreferrer"
                     className="text-blue-600 hover:underline font-medium">
                    {article.title}
                  </a>
                  <p className="text-gray-500 text-xs mt-1 line-clamp-2">{article.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {!error && headlines.length === 0 && everything.length === 0 && (
        <p className="text-gray-400 mt-4">No news available</p>
      )}
    </div>
  );
};
