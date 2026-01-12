'use client';

import { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import MapChart from './MapComponent';
const geoUrl = "/geojson/india.geojson";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
 
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Hide skeleton after 3 seconds
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="p-4 w-full h-screen flex flex-col items-center justify-center bg-black">
      {isLoading ? (
     <div className="w-full max-w-4xl h-150 animate-pulse bg-gray-200 rounded-lg flex items-center justify-center">
            
            <ComposableMap
              projection="geoAzimuthalEqualArea"
              projectionConfig={{
                rotate: [-10.0, -52.0, 0],
                center: [-5, -3],
                scale: 1100,
              }}
              width={800} 
              height={600}
            >
                <Geographies geography={geoUrl}>
                  {({ geographies }: { geographies: any[] }) =>
                    geographies.map((geo: any) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill="#F53E3E"
                        stroke="#9CA3AF"
                        style={{
                            default: { outline: "none" },
                            hover: { outline: "none" },
                            pressed: { outline: "none" },
                        }}
                      />
                    ))
                  }
                </Geographies>
            </ComposableMap>
        </div>
      ) : (
        
        <div className="w-full max-w-4xl animate-in fade-in duration-700">
          <MapChart />
        
        </div>
      )}
    </main>
  );
}