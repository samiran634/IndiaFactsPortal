"use client";

import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { useSearchParams } from "next/navigation";
import StateSidebar from './StateSidebar';

interface MarkerData {
  name: string;
  latitude: number;
  longitude: number;
}
const INDIA_GEO_URL = "/geojson/india.geojson"; 

// ... (Keeping your existing State URLs and Coordinates maps for brevity) ...
const STATE_URLS: { [key: string]: string } = {
  "Uttar Pradesh": "/geojson/states/uttar-pradesh.geojson",
  "Maharashtra": "/geojson/states/maharashtra.geojson",
  "Karnataka": "/geojson/states/karnataka.geojson",
  // ... (Your other states here - keeping the logic intact)
  "Tamil Nadu": "/geojson/states/tamil-nadu.geojson",
  "West Bengal": "/geojson/states/west-bengal.geojson",
  "Gujarat": "/geojson/states/gujarat.geojson",
  "Rajasthan": "/geojson/states/rajasthan.geojson",
  "Bihar": "/geojson/states/bihar.geojson",
  "Andhra Pradesh": "/geojson/states/andhra-pradesh.geojson",
  "Odisha": "/geojson/states/odisha.geojson",
  "Telangana": "/geojson/states/telangana.geojson",
  "Punjab": "/geojson/states/punjab.geojson",
  "Haryana": "/geojson/states/haryana.geojson",
  "Chhattisgarh": "/geojson/states/chhattisgarh.geojson",
  "Jharkhand": "/geojson/states/jharkhand.geojson",
  "Assam": "/geojson/states/assam.geojson",
  "Kerala": "/geojson/states/kerala.geojson",
  "Uttarakhand": "/geojson/states/uttarakhand.geojson",
  "Himachal Pradesh": "/geojson/states/himachal-pradesh.geojson",
  "Tripura": "/geojson/states/tripura.geojson",
  "Meghalaya": "/geojson/states/meghalaya.geojson",
  "Manipur": "/geojson/states/manipur.geojson",
  "Nagaland": "/geojson/states/nagaland.geojson",
  "Goa": "/geojson/states/goa.geojson",
  "Arunachal Pradesh": "/geojson/states/arunachal-pradesh.geojson",
  "Mizoram": "/geojson/states/mizoram.geojson",
  "Sikkim": "/geojson/states/sikkim.geojson",
  "Dadra and Nagar Haveli and Daman and Diu": "/geojson/states/dadra-daman-diu.geojson",
  "Chandigarh": "/geojson/states/chandigarh.geojson",
  "Puducherry": "/geojson/states/puducherry.geojson",
  "Andaman and Nicobar Islands": "/geojson/states/andaman-and-nicobar-islands.geojson",
  "Lakshadweep": "/geojson/states/lakshadweep.geojson",
};

const CenterForState: { [key: string]: [number, number] } = {
    "Uttar Pradesh": [80.9462, 26.8467],
    "Maharashtra": [75.7139, 19.7515],
    "Karnataka": [76.6394, 15.3173],
    "Tamil Nadu": [78.6569, 11.1271],
    "West Bengal": [87.8550, 22.9868],
    "Gujarat": [71.1924, 22.2587],
    "Rajasthan": [73.5714, 27.0238],
    "Bihar": [85.3131, 25.0961],
    "Andhra Pradesh": [79.0193, 15.9129],
    "Odisha": [85.0985, 20.9517],
    "Telangana": [78.4744, 17.3850],
    "Punjab": [75.3412, 30.9010],
    "Haryana": [76.7794, 29.0588],
    "Chhattisgarh": [81.8661, 21.2787],
    "Jharkhand": [85.2799, 23.6102],
    "Assam": [91.3662, 26.2006],
    "Kerala": [76.2711, 10.8505],
    "Uttarakhand": [79.0193, 30.0668],
    "Himachal Pradesh": [77.1650, 31.1048],
    "Tripura": [91.9882, 23.9408],
    "Meghalaya": [91.3662, 25.4670],
    "Manipur": [93.9063, 24.6637],
    "Nagaland": [94.5624, 26.1584],
    "Goa": [74.1240, 15.2993],
    "Arunachal Pradesh": [94.7278, 28.2180],
    "Mizoram": [92.9376, 23.1645],
    "Sikkim": [88.5122, 27.5330],
    "Dadra and Nagar Haveli and Daman and Diu": [72.8397, 20.1809],
    "Chandigarh": [76.7794, 30.7333],
    "Puducherry": [79.8083, 11.9416],
    "Andaman and Nicobar Islands": [92.6586, 11.7401],
    "Lakshadweep": [72.6369, 10.3280],
    "Delhi": [77.1025, 28.7041],
    "Jammu and Kashmir": [74.7973, 33.7782],
    "Ladakh": [77.5619, 34.1526]
};

const SHORT_NAMES: { [key: string]: string } = {
  "Dadra and Nagar Haveli and Daman and Diu": "DNH & DD",
  "Andaman and Nicobar Islands": "Andaman & Nicobar",
  "Jammu and Kashmir": "J&K",
  "Arunachal Pradesh": "Arunachal",
  "Himachal Pradesh": "Himachal",
  "Uttar Pradesh": "U.P.",
  "Madhya Pradesh": "M.P.",
  "Andhra Pradesh": "Andhra",
};


export default function MapChart() {
  const searchParams = useSearchParams();
  const initialPlace: string | null = searchParams.get('place');
  const placesParam: string | null = searchParams.get('places'); // 1. Get the places param

  const [geoUrl, setGeoUrl] = useState(INDIA_GEO_URL);
  const [currentPlace, setCurrentPlace] = useState("India");
  const [visibleMarkers, setVisibleMarkers] = useState<MarkerData[]>([]); 
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  // Handle Initial View (State Focus)
  useEffect(() => {
    if (initialPlace && STATE_URLS[initialPlace]) {
      setGeoUrl(STATE_URLS[initialPlace]);
      setCurrentPlace(initialPlace);
    }
  }, [initialPlace]);

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
    const stateName = geo.properties.st_nm || geo.properties.name; 
    // Logic to ensure we check both st_nm and name for compatibility
    
    if (STATE_URLS[stateName]) {
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
  };

  return (
    <div className="flex flex-col items-center relative">
      <div className="mb-4 text-center">
        <h2 className="text-xl font-bold">Viewing: {currentPlace}</h2>
        {currentPlace !== "India" && (
          <button
            onClick={handleReset}
            className="mt-2 px-4 py-1 bg-zinc-500 text-white rounded hover:bg-blue-600 text-sm"
          >
            Back to All India
          </button>
        )}
      </div>
          <StateSidebar 
            isOpen={isOpen} 
            onClose={() => setIsOpen(false)}
            stateName={"State Name"}
            data={{
              facts: ["it is the 10th largest state by area", "has a population of over 20 million"],
              concepts: ["it is made of diverse cultures", "known for its historical landmarks"],
            }}
          />
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: currentPlace === "India" ? 1000 : 4000,
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
                  const stateName = geo.properties.st_nm || geo.properties.name;
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