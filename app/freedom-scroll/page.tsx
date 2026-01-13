import Link from "next/link";
import { getDefaultFacts, getRandomHistoryFacts } from "./data";
import { ScrollStack } from "./ScrollStack";

/*
  what do i want here?
   some faacts from data is arriving 
   i shall add a new fied called relatedPlaces
   which will be an array of strings
   these will be place names related to the fact

   in the scroll stack component
   i will show these related places at the bottom of each scroll
   now the main challenge is to add some bottom chick event which on click will load the map and show the places
   and the remain functionality of the active map will be same as before



   secondary goal is to connect the componenets in such a wahy which genarate a greate user experience
   so that the user feels immersed in the experience of learning history


*/ 
export default async function FreedomScrollPage() {
  //const { facts, error } = await getRandomHistoryFacts();
  const facts= getDefaultFacts();
  const error=null;
  
  return (
    <main className="min-h-screen bg-black">
      {/* Header */}
      <header className="flex justify-between bg-zinc-900/50 backdrop-blur-sm shadow-sm sticky top-0 z-20 border-b border-zinc-800">
         <Link href="/" className="text-gray-400 hover:text-white flex items-center gap-0.5 font-medium p-4 transition-colors">
            ← Back to Home
          </Link>
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-100 flex items-center gap-2 justify-center">
            <span className="text-4xl">📜</span> Freedom Scroll
          </h1>
        </div>
        <div className="w-24"></div> 
      </header>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[80vh]">     
            {error && (
              <div className="text-red-800 font-bold p-4 border border-red-800/20 bg-red-50/50 rounded text-center">
                <p>The archives are temporarily closed.</p>
                <p className="text-sm mt-2 text-red-700">{error}</p>
              </div>
            )}

            {!error && facts && (
              <div className="flex justify-center text-left h-screen w-screen flex-col">
                <div className="flex text-center border-b-2 border-amber-900/20 pb-2 mb-4 px-1.5">
                  <p className="text-amber-800/70 font-serif italic mx-2">
                    era={facts[0]?.era || "Ancient Records"}
                  </p>
                </div>
              <div className="flex justify-center">
               
                   <ScrollStack facts={facts}></ScrollStack>
                 
              </div>

              </div>
            )}

       

      </div>
    </main>
  );
}