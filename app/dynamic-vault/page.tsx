import Link from "next/link";
import MainContent from ".";
 
// import { Vault } from ".";
// import { fetchAllNews } from "./data";
/*
  for development perpous i shall use dummy data which will contains news sorted in types.
  e.g.  just keep polity & economy(folder ui) , tech(terminal ui) and miselanious topic(bento ui) creating three separete pages 
and i will create the radial ui to navigate those three pages 

*/

// Server Component - fetches data on server
export default async function DynamicVaultPage() {
  // const { headlines, everything, error } = await fetchAllNews();


  return (
    <main className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-transparent shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          < Link href="/"  className="text-gray-300 hover:text-gray-100 flex items-center gap-2">
            ← Back to Home
          </Link>
          <h1 className="text-xl font-bold text-gray-400"> Knowledge Vault</h1>
          <div className="w-24"></div>
        </div>
      </header>
    <div>
      <MainContent/>
    </div>
       
    </main>
  );
}
