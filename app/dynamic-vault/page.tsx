import Link from "next/link";
import { Vault } from ".";
import { fetchAllNews } from "./data";

// Server Component - fetches data on server
export default async function DynamicVaultPage() {
  const { headlines, everything, error } = await fetchAllNews();

  return (
    <main className="min-h-screen bg-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-gray-600 hover:text-gray-900 flex items-center gap-2">
            ← Back to Home
          </Link>
          <h1 className="text-xl font-bold text-green-600">📊 Dynamic Vault</h1>
          <div className="w-24"></div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Vault headlines={headlines} everything={everything} error={error} />
      </div>
    </main>
  );
}
