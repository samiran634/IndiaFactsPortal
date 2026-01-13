'use client';

import { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import MapChart from './MapComponent';
const geoUrl = "/geojson/india.geojson";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
 const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Hide skeleton after 3 seconds
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="p-4 w-full h-screen flex flex-col items-center justify-center bg-black">
      {isLoading ? (
     <div className="w-full max-w-4xl h-150 animate-pulse bg-gray-500 rounded-lg flex items-center justify-center">
        
        </div>
      ) : (
    
          <div className="w-full max-w-4xl animate-in fade-in duration-700">
            <MapChart />
            <button className='absolute top-0 text-2xl rounded-4xl shadow-amber-200 text-white bg-black cursor-pointer ' onClick={()=>location.href='/'}>Back to Home</button>
          </div>
       
      )}
    </main>
  );
}