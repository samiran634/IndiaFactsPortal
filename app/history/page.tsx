import { Suspense } from "react";
import HistoryContent from "./HistoryContent";

export default function HistoryPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-amber-500 text-xl animate-pulse">Loading historical records...</div>
      </main>
    }>
      <HistoryContent />
    </Suspense>
  );
}