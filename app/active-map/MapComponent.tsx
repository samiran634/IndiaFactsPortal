"use client";

import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { useSearchParams } from "next/navigation";
import StateSidebar from './StateSidebar';
import { STATE_URLS, CenterForState, SHORT_NAMES, factsMap } from '../utils/data/state_data';
interface MarkerData {
  name: string;
  latitude: number;
  longitude: number;
}
const INDIA_GEO_URL = "/geojson/india.geojson"; 


export default function MapChart() {
  const searchParams = useSearchParams();
  // Support both 'state' (from GlobalEngine) and legacy 'place' param
  const stateParam: string | null = searchParams.get('state') || searchParams.get('place');
  const placesParam: string | null = searchParams.get('places'); // Array of places for markers

  const [geoUrl, setGeoUrl] = useState(INDIA_GEO_URL);
  const [currentPlace, setCurrentPlace] = useState("India");
  const [visibleMarkers, setVisibleMarkers] = useState<MarkerData[]>([]); 
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [tooltipContent, setTooltipContent] = useState<string>("");
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Handle Initial View (State Focus from URL param)
  useEffect(() => {
    if (stateParam && STATE_URLS[stateParam]) {
      setGeoUrl(STATE_URLS[stateParam]);
      setCurrentPlace(stateParam);
      setIsOpen(true); // Open sidebar when navigating via URL
    }
  }, [stateParam]);

  // 3. Handle Markers Animation (The Queue Logic)
  useEffect(() => {
    if (!placesParam) return;

    try {
      const placesData = JSON.parse(placesParam);
      if (Array.isArray(placesData) && placesData.length > 0) {
        let currentIndex = 0;
        
        // Clear existing to start fresh
        setVisibleMarkers([]);

        const intervalId = setInterval(() => {
          if (currentIndex >= placesData.length) {
            clearInterval(intervalId); // Stop when all are shown
            return;
          }

          const placeToAdd = placesData[currentIndex];
          
          // Only add if latitude/longitude exist
          if (placeToAdd.latitude && placeToAdd.longitude) {
            setVisibleMarkers((prev ) => [...prev, placeToAdd]);
          }
          
          currentIndex++;
        }, 1000); // 4. Delay: 1000ms (1 second) between each marker

        return () => clearInterval(intervalId); 
      }
    } catch (error) {
      console.error("Failed to parse 'places' URL parameter:", error);
    }
  }, [placesParam]);

  const handleStateClick = (geo: any) => {
    const stateName = geo.properties.st_nm; 
    // Logic to ensure we check both st_nm and name for compatibility
    
    if (STATE_URLS[stateName]) {
      setIsOpen(true);
      setGeoUrl(STATE_URLS[stateName]);
      setCurrentPlace(stateName);
      // Optional: Clear markers when zooming into a state? 
      // setVisibleMarkers([]); 
    } else {
      console.warn(`No GeoJSON found for: ${stateName}`);
      alert(`Map data for ${stateName} is not linked yet.`);
    }
  };

  const handleReset = () => {
    setGeoUrl(INDIA_GEO_URL);
    setCurrentPlace("India");
    setIsOpen(false);
    };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="mb-4 text-center">
        <h2 className="text-xl font-bold text-amber-50">Viewing: {currentPlace}</h2>
        {currentPlace !== "India" && (
          <button
            onClick={handleReset}
            className="mt-2 px-4 py-1 bg-zinc-500 text-white rounded hover:bg-blue-600 text-sm"
          >
            Back to All India
          </button>
        )}
          <StateSidebar 
            isOpen={isOpen} 
            onClose={() => setIsOpen(false)}
            stateName={currentPlace}
            data={factsMap[currentPlace]}
          />
      </div>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: currentPlace === "India" ? 800 : 3000,
          center: currentPlace === "India" ? [78.9629, 22.5937] : CenterForState[currentPlace] || [78.9629, 22.5937],
        }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }: { geographies: any[] }) =>
            geographies.map((geo: any) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                onMouseEnter={(e: React.MouseEvent) => {
                  const stateName = geo.properties.st_nm;
                  setTooltipContent(SHORT_NAMES[stateName] || stateName);
                }}
                onMouseLeave={() => {
                  setTooltipContent("");
                }}
                onMouseMove={(e: React.MouseEvent) => {
                  setTooltipPos({ x: e.clientX, y: e.clientY });
                }}
                onClick={() => handleStateClick(geo)}
                style={{
                  default: { fill: "#D6D6DA", outline: "none" },
                  hover: { fill: "#F53", outline: "none", cursor: "pointer" },
                  pressed: { fill: "#E42", outline: "none" },
                }}
              />
            ))
          }
        </Geographies> 
        
        {/* State Name Labels removed in favor of Tooltip */}
        
        {visibleMarkers.map((marker, index) => (
          <Marker 
            key={index} 
            coordinates={[marker.longitude, marker.latitude]}
          >
            <circle r={8} fill="#F00" stroke="#fff" strokeWidth={2} />
            <text
              textAnchor="middle"
              y={-15}
              style={{ fontFamily: "system-ui", fill: "#5D5A6D", fontSize: "12px", fontWeight: "bold" }}
            >
              {marker.name}
            </text>
          </Marker>
        ))}
      </ComposableMap>
      
      {/* Tooltip */}
      {tooltipContent && (
        <div 
          className="fixed bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg pointer-events-none z-50"
          style={{ 
            left: tooltipPos.x + 10, 
            top: tooltipPos.y - 20 
          }}
        >
          {tooltipContent}
        </div>
      )}
    </div>
  );
}