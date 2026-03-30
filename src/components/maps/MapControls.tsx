'use client';

import React from 'react';
import { useMap } from 'react-leaflet';
import * as L from 'leaflet';
import { Plus, Minus, Maximize2, RefreshCw, Crosshair, MapPin } from 'lucide-react';
import { KASHMIR_CENTER, KASHMIR_ZOOM } from './AtlasMap';

interface MapControlsProps {
  onFitToKashmir?: () => void;
}

function MapControlButtons({ onFitToKashmir }: MapControlsProps) {
  const map = useMap();

  const handleZoomIn = () => {
    map.zoomIn();
  };

  const handleZoomOut = () => {
    map.zoomOut();
  };

  const handleFitToKashmir = () => {
    map.flyTo(KASHMIR_CENTER, KASHMIR_ZOOM, {
      duration: 1.5,
    });
    onFitToKashmir?.();
  };

  const handleResetView = () => {
    map.flyTo(KASHMIR_CENTER, KASHMIR_ZOOM, {
      duration: 1,
    });
  };

  const handleLocate = () => {
    map.locate({ setView: true, maxZoom: 12 });
  };

  return (
    <div className="flex flex-col gap-1">
      <button
        onClick={handleZoomIn}
        className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800/90 text-white shadow-lg backdrop-blur-sm transition-all hover:bg-slate-700 hover:scale-105 active:scale-95 border border-white/10"
        title="Zoom In"
      >
        <Plus className="h-5 w-5" />
      </button>
      <button
        onClick={handleZoomOut}
        className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800/90 text-white shadow-lg backdrop-blur-sm transition-all hover:bg-slate-700 hover:scale-105 active:scale-95 border border-white/10"
        title="Zoom Out"
      >
        <Minus className="h-5 w-5" />
      </button>
      <div className="h-px bg-white/10 my-1" />
      <button
        onClick={handleFitToKashmir}
        className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800/90 text-white shadow-lg backdrop-blur-sm transition-all hover:bg-slate-700 hover:scale-105 active:scale-95 border border-white/10"
        title="Fit to Kashmir"
      >
        <Maximize2 className="h-4 w-4" />
      </button>
      <button
        onClick={handleResetView}
        className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800/90 text-white shadow-lg backdrop-blur-sm transition-all hover:bg-slate-700 hover:scale-105 active:scale-95 border border-white/10"
        title="Reset View"
      >
        <RefreshCw className="h-4 w-4" />
      </button>
      <button
        onClick={handleLocate}
        className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800/90 text-white shadow-lg backdrop-blur-sm transition-all hover:bg-slate-700 hover:scale-105 active:scale-95 border border-white/10"
        title="Locate Me"
      >
        <Crosshair className="h-4 w-4" />
      </button>
    </div>
  );
}

export function MapControls({ onFitToKashmir }: MapControlsProps) {
  return (
    <div className="absolute bottom-4 right-4 z-[400]">
      <MapControlButtons onFitToKashmir={onFitToKashmir} />
    </div>
  );
}

// Coordinate display component
export function CoordinateDisplay() {
  const map = useMap();
  const [coords, setCoords] = React.useState<[number, number]>(KASHMIR_CENTER);

  React.useEffect(() => {
    const handleMouseMove = (e: L.LeafletMouseEvent) => {
      setCoords([e.latlng.lat, e.latlng.lng]);
    };

    map.on('mousemove', handleMouseMove);
    return () => {
      map.off('mousemove', handleMouseMove);
    };
  }, [map]);

  return (
    <div className="absolute bottom-4 left-4 z-[400]">
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800/90 backdrop-blur-sm border border-white/10 shadow-lg">
        <MapPin className="h-3 w-3 text-slate-400" />
        <div className="text-xs font-mono text-white">
          <span className="text-slate-400">Lat: </span>
          <span>{coords[0].toFixed(4)}</span>
          <span className="text-slate-400 ml-2">Lng: </span>
          <span>{coords[1].toFixed(4)}</span>
        </div>
      </div>
    </div>
  );
}

// Scale bar component
export function ScaleBar() {
  const map = useMap();
  const [scale, setScale] = React.useState({ distance: 0, unit: 'km' });

  React.useEffect(() => {
    const updateScale = () => {
      const center = map.getCenter();
      const zoom = map.getZoom();
      
      // Calculate scale based on zoom level and latitude
      const metersPerPixel = (156543.03392 * Math.cos(center.lat * Math.PI / 180)) / Math.pow(2, zoom);
      const containerWidth = map.getSize().x;
      const metersInView = metersPerPixel * containerWidth;
      
      let distance: number;
      let unit: string;
      
      if (metersInView >= 1000) {
        distance = Math.round(metersInView / 1000 * 10) / 10;
        unit = 'km';
      } else {
        distance = Math.round(metersInView);
        unit = 'm';
      }
      
      setScale({ distance, unit });
    };

    map.on('moveend zoomend', updateScale);
    updateScale();

    return () => {
      map.off('moveend zoomend', updateScale);
    };
  }, [map]);

  return (
    <div className="absolute bottom-20 left-4 z-[400]">
      <div className="px-3 py-2 rounded-lg bg-slate-800/90 backdrop-blur-sm border border-white/10 shadow-lg">
        <div className="text-xs font-mono text-white">
          <span className="text-slate-400">Scale: </span>
          <span className="font-bold">{scale.distance}</span>
          <span className="text-slate-500 ml-1">{scale.unit}</span>
        </div>
      </div>
    </div>
  );
}
