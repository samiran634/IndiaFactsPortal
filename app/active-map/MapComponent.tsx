'use client';

import { useState, memo } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker,
} from 'react-simple-maps';

// Map layers data
export const mapLayers = {
  rivers: [
    { name: 'Ganga', coordinates: [81.8463, 25.4358], state: 'Uttar Pradesh', info: 'Holiest river, 2525 km' },
    { name: 'Yamuna', coordinates: [77.2090, 28.6139], state: 'Delhi', info: 'Tributary of Ganga, 1376 km' },
    { name: 'Brahmaputra', coordinates: [91.7362, 26.1445], state: 'Assam', info: 'Trans-boundary river, 2900 km' },
    { name: 'Godavari', coordinates: [81.7787, 16.5062], state: 'Andhra Pradesh', info: 'Dakshin Ganga, 1465 km' },
    { name: 'Krishna', coordinates: [80.6480, 16.1740], state: 'Andhra Pradesh', info: 'East flowing, 1400 km' },
    { name: 'Narmada', coordinates: [73.0169, 21.6417], state: 'Gujarat', info: 'West flowing, 1312 km' },
  ],
  mountainPasses: [
    { name: 'Nathu La', coordinates: [88.8308, 27.3864], state: 'Sikkim', info: 'India-China border, 4310m' },
    { name: 'Rohtang Pass', coordinates: [77.2490, 32.3725], state: 'Himachal Pradesh', info: 'Manali-Leh route, 3978m' },
    { name: 'Zoji La', coordinates: [75.4833, 34.2833], state: 'J&K', info: 'Srinagar-Leh, 3528m' },
    { name: 'Khardung La', coordinates: [77.6025, 34.2819], state: 'Ladakh', info: 'Highest motorable, 5359m' },
    { name: 'Bum La', coordinates: [91.9167, 27.7167], state: 'Arunachal', info: 'India-China border' },
  ],
  nationalParks: [
    { name: 'Jim Corbett', coordinates: [78.7747, 29.5300], state: 'Uttarakhand', info: 'First national park, Tigers' },
    { name: 'Kaziranga', coordinates: [93.1711, 26.5775], state: 'Assam', info: 'One-horned Rhino, UNESCO' },
    { name: 'Ranthambore', coordinates: [76.5026, 26.0173], state: 'Rajasthan', info: 'Tiger Reserve' },
    { name: 'Sundarbans', coordinates: [88.8989, 21.9497], state: 'West Bengal', info: 'Mangrove, Royal Bengal Tiger' },
    { name: 'Gir', coordinates: [70.7936, 21.1243], state: 'Gujarat', info: 'Asiatic Lions' },
    { name: 'Periyar', coordinates: [77.1667, 9.4667], state: 'Kerala', info: 'Elephants, Boat safari' },
  ],
  airForceBases: [
    { name: 'Hindon AFB', coordinates: [77.3640, 28.7041], state: 'Uttar Pradesh', info: 'Largest IAF base' },
    { name: 'Ambala AFB', coordinates: [76.7794, 30.3752], state: 'Haryana', info: 'Rafale jets stationed' },
    { name: 'Jodhpur AFB', coordinates: [73.0243, 26.2389], state: 'Rajasthan', info: 'Western Air Command' },
    { name: 'Pune AFB', coordinates: [73.9190, 18.5821], state: 'Maharashtra', info: 'Lohegaon' },
    { name: 'Thanjavur AFB', coordinates: [79.1378, 10.7905], state: 'Tamil Nadu', info: 'SU-30MKI base' },
  ],
  navalBases: [
    { name: 'INS Kadamba', coordinates: [74.0855, 14.8083], state: 'Karnataka', info: 'Largest naval base' },
    { name: 'Mumbai Naval', coordinates: [72.8777, 18.9388], state: 'Maharashtra', info: 'Western Naval Command' },
    { name: 'Visakhapatnam', coordinates: [83.2185, 17.6868], state: 'Andhra Pradesh', info: 'Eastern Naval Command' },
    { name: 'Kochi Naval', coordinates: [76.2673, 9.9312], state: 'Kerala', info: 'Southern Naval Command' },
    { name: 'Port Blair', coordinates: [92.7265, 11.6234], state: 'Andaman', info: 'Andaman & Nicobar Command' },
  ],
};

export type LayerType = keyof typeof mapLayers;

export const layerColors: Record<LayerType, string> = {
  rivers: '#3b82f6',
  mountainPasses: '#8b5cf6',
  nationalParks: '#22c55e',
  airForceBases: '#ef4444',
  navalBases: '#06b6d4',
};

export interface TooltipData {
  name: string;
  state: string;
  type: string;
  info?: string;
}

interface MapChartProps {
  activeLayers: LayerType[];
  onMarkerHover: (data: TooltipData | null) => void;
  onMarkerClick: (data: TooltipData) => void;
}

function MapChart({ activeLayers, onMarkerHover, onMarkerClick }: MapChartProps) {
  return (
    <ComposableMap
      projection="geoMercator"
      projectionConfig={{
        scale: 1000,
        center: [82, 22],
      }}
      style={{ width: '100%', height: '100%' }}
    >
      <ZoomableGroup zoom={1} minZoom={0.5} maxZoom={4}>
        <Geographies geography="/topojson/india.json">
          {({ geographies }: { geographies: any[] }) =>
            geographies.map((geo: any) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#e5e7eb"
                stroke="#9ca3af"
                strokeWidth={0.5}
                style={{
                  default: { outline: 'none' },
                  hover: { fill: '#bfdbfe', outline: 'none' },
                  pressed: { outline: 'none' },
                }}
              />
            ))
          }
        </Geographies>

        {activeLayers.map((layer) =>
          mapLayers[layer].map((location) => (
            <Marker
              key={`${layer}-${location.name}`}
              coordinates={location.coordinates as [number, number]}
              onMouseEnter={() => onMarkerHover({ 
                name: location.name, 
                state: location.state,
                type: layer,
                info: location.info
              })}
              onMouseLeave={() => onMarkerHover(null)}
              onClick={() => onMarkerClick({ 
                name: location.name, 
                state: location.state,
                type: layer,
                info: location.info
              })}
            >
              <circle
                r={6}
                fill={layerColors[layer]}
                stroke="#fff"
                strokeWidth={2}
                style={{ cursor: 'pointer' }}
              />
            </Marker>
          ))
        )}
      </ZoomableGroup>
    </ComposableMap>
  );
}

export default MapChart;
