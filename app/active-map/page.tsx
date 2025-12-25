import Link from "next/link";
import { ActiveMapContent } from "./index";

export default function ActiveMapPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-cyan-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-gray-600 hover:text-gray-900 flex items-center gap-2 font-medium">
            ← Back to Home
          </Link>
          <h1 className="text-xl font-bold text-blue-600 flex items-center gap-2">
            🗺️ Active Map
          </h1>
          <div className="w-24"></div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-10 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Interactive India Map
          </h2>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Explore rivers, mountain passes, national parks, and defence bases with toggleable layers
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <ActiveMapContent />
      </div>
    </main>
  );
}
