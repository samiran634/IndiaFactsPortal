import Link from "next/link";
import { FreedomScrollContent } from "./index";
import { getRandomHistoryFacts } from "./data";

// Force dynamic rendering to get fresh random facts each time
export const dynamic = 'force-dynamic';

// Server Component - fetches random facts on each page load
export default async function FreedomScrollPage() {
  const { facts, error } = await getRandomHistoryFacts();

  return (
    <main className="min-h-screen bg-linear-to-b from-orange-50 to-amber-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-gray-600 hover:text-gray-900 flex items-center gap-2 font-medium">
            ← Back to Home
          </Link>
          <h1 className="text-xl font-bold text-orange-600 flex items-center gap-2">
            📜 Freedom Scroll
          </h1>
          <div className="w-24"></div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-linear-to-r from-orange-600 to-amber-500 text-white py-10 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Indian History & Current Affairs
          </h2>
          <p className="text-orange-100 text-lg max-w-2xl mx-auto">
            Random history facts powered by Gemini AI + Search news by date
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <FreedomScrollContent facts={facts} error={error} />
      </div>
    </main>
  );
}