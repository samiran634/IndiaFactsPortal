import Link from "next/link"

export default function BookmarksPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-gray-600 hover:text-gray-900 flex items-center gap-2">
            ← Back to Home
          </Link>
          <h1 className="text-xl font-bold text-gray-700">🔖 My Bookmarks</h1>
          <div className="w-24"></div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-700 mb-4">
            Your Saved Facts
          </h2>
          <p className="text-gray-600 mb-6">
            Access your bookmarked facts organized by module and category
          </p>
          <div className="text-6xl mb-4">📚</div>
          <p className="text-gray-500">No bookmarks yet. Start exploring!</p>
        </div>
      </div>
    </main>
  )
}
