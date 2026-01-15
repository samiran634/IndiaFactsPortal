'use client';

import { useState, useEffect } from 'react';
import React from 'react';
import MapChart from './MapComponent';

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="p-4 w-full h-screen flex flex-col items-center justify-center bg-black">
      {isLoading ? (
     <div className="max-w-2xl h-150 animate-pulse bg-gray-500 rounded-lg flex items-center justify-center">
        
        </div>
      ) : (

          <div className="w-[80%] h-[80vh] animate-in fade-in duration-700">
            <button className='absolute top-0 text-2xl rounded-4xl shadow-amber-200 text-white bg-black cursor-pointer ' onClick={()=>location.href='/'}>Back to Home</button>
            <React.Suspense fallback={<div className="text-white">Loading map data...</div>}>
              <MapChart />
            </React.Suspense>
          </div>
       
      )}
    </main>
  );
}