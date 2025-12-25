'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { mapLayers, layerColors, LayerType, TooltipData } from './MapComponent';

const MapChart = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-blue-600 font-medium">Loading India Map...</p>
      </div>
    </div>
  ),
});

const layerIcons: Record<LayerType, string> = {
  rivers: '🌊',
  mountainPasses: '⛰️',
  nationalParks: '🌲',
  airForceBases: '✈️',
  navalBases: '⚓',
};

const layerLabels: Record<LayerType, string> = {
  rivers: 'Rivers',
  mountainPasses: 'Mountain Passes',
  nationalParks: 'National Parks',
  airForceBases: 'Air Force Bases',
  navalBases: 'Naval Bases',
};

export function ActiveMapContent() {
  const [activeLayers, setActiveLayers] = useState<LayerType[]>(['nationalParks']);
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<TooltipData | null>(null);

  const toggleLayer = (layer: LayerType) => {
    setActiveLayers((prev) =>
      prev.includes(layer)
        ? prev.filter((l) => l !== layer)
        : [...prev, layer]
    );
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="flex-1 relative">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden" style={{ height: '600px' }}>
          <MapChart 
            activeLayers={activeLayers} 
            onMarkerHover={setTooltip}
            onMarkerClick={setSelectedLocation}
          />
          
          {tooltip && (
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-3 z-10">
              <h4 className="font-semibold text-gray-800">{tooltip.name}</h4>
              <p className="text-sm text-gray-500">{tooltip.state}</p>
              {tooltip.info && <p className="text-xs text-blue-600 mt-1">{tooltip.info}</p>}
            </div>
          )}
        </div>
        <p className="text-center text-gray-500 text-sm mt-2">
          🖱️ Scroll to zoom • Drag to pan • Click markers for details
        </p>
      </div>

      <div className="lg:w-80 space-y-4">
        <div className="bg-white rounded-xl shadow-lg p-5">
          <h3 className="text-lg font-bold text-gray-800 mb-4">🗺️ Map Layers</h3>
          <div className="space-y-2">
            {(Object.keys(mapLayers) as LayerType[]).map((layer) => (
              <button
                key={layer}
                onClick={() => toggleLayer(layer)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeLayers.includes(layer)
                    ? 'bg-blue-50 border-2 border-blue-500'
                    : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                }`}
              >
                <span className="text-xl">{layerIcons[layer]}</span>
                <span className="flex-1 text-left font-medium text-gray-700">{layerLabels[layer]}</span>
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: layerColors[layer] }} />
              </button>
            ))}
          </div>
        </div>

        {selectedLocation && (
          <div className="bg-white rounded-xl shadow-lg p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-gray-800">📍 Details</h3>
              <button onClick={() => setSelectedLocation(null)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <h4 className="text-xl font-semibold text-gray-800">{selectedLocation.name}</h4>
            <p className="text-gray-500">{selectedLocation.state}</p>
            {selectedLocation.info && (
              <div className="mt-2 p-2 bg-blue-50 rounded text-sm text-blue-700">{selectedLocation.info}</div>
            )}
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg p-5">
          <h3 className="text-lg font-bold text-gray-800 mb-3">📊 Legend</h3>
          {(Object.keys(mapLayers) as LayerType[]).map((layer) => (
            <div key={layer} className="flex items-center gap-2 text-sm mb-1">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: layerColors[layer] }} />
              <span className="text-gray-600">{layerLabels[layer]} ({mapLayers[layer].length})</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
