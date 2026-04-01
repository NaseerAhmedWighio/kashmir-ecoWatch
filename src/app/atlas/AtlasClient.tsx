'use client';

import React, { useState } from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { AtlasMap } from '@/components/maps/AtlasMap';
import { FeatureDrawer } from '@/components/maps/FeatureDrawer';
import {
  DistrictLayer,
  ProtectedAreaLayer,
  WaterBodyLayer,
  RiverLayer,
  WatershedLayer,
  TrailLayer,
  GlacierLayer,
  HazardLayer,
  SightingLayer,
} from '@/components/maps/layers';
import { TopCommandBar, LayerRail, FloatingChips, LegendCard } from '@/components/atlas';
import { MapControls, CoordinateDisplay, ScaleBar } from '@/components/maps/MapControls';

export default function AtlasClient() {
  const [selectedFeature, setSelectedFeature] = useState<any>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [layerRailOpen, setLayerRailOpen] = useState(true);
  const [showLegend, setShowLegend] = useState(true);
  const [mapInstance, setMapInstance] = useState<any>(null);

  const [layers, setLayers] = useState({
    districts: true,
    protectedAreas: true,
    lakes: true,
    wetlands: true,
    rivers: false,
    watersheds: false,
    trails: false,
    glaciers: false,
    hazards: false,
    sightings: false,
  });

  const handleFeatureClick = (feature: any) => {
    setSelectedFeature(feature);
    setDrawerOpen(true);
  };

  const handleSearchResultSelect = (result: any) => {
    // If the result has coordinates, fly to it
    if (result.coordinates) {
      mapInstance?.flyTo([result.coordinates.lat, result.coordinates.lng], 12, {
        duration: 1.5,
      });
    }

    // Open drawer with the result
    handleFeatureClick({
      type: result.type,
      name: result.name,
      slug: result.slug,
      description: result.description,
      district: result.district,
      category: result.category,
    });
  };

  const toggleLayer = (groupId: string, layerId: string) => {
    setLayers(prev => ({
      ...prev,
      [layerId]: !prev[layerId as keyof typeof prev],
    }));
  };

  const activeLayerCount = Object.values(layers).filter(Boolean).length;

  // Define layer groups for LayerRail
  const layerGroups = [
    {
      id: 'boundaries',
      label: 'Boundaries',
      icon: 'boundaries',
      layers: [
        { id: 'districts', label: 'Districts', color: 'bg-slate-500', count: 10, visible: layers.districts },
      ],
    },
    {
      id: 'water',
      label: 'Water Systems',
      icon: 'water',
      layers: [
        { id: 'lakes', label: 'Lakes', color: 'bg-blue-500', count: 13, visible: layers.lakes },
        { id: 'wetlands', label: 'Wetlands', color: 'bg-cyan-500', count: 8, visible: layers.wetlands },
        { id: 'rivers', label: 'Rivers & Streams', color: 'bg-blue-400', count: 15, visible: layers.rivers },
        { id: 'watersheds', label: 'Watersheds', color: 'bg-blue-300', count: 6, visible: layers.watersheds },
      ],
    },
    {
      id: 'cryosphere',
      label: 'Glaciers',
      icon: 'Mountain',
      layers: [
        { id: 'glaciers', label: 'Glaciers', color: 'bg-sky-200', count: 10, visible: layers.glaciers },
      ],
    },
    {
      id: 'biodiversity',
      label: 'Protected Areas',
      icon: 'biodiversity',
      layers: [
        { id: 'protectedAreas', label: 'All Protected Areas', color: 'bg-emerald-500', count: 14, visible: layers.protectedAreas },
      ],
    },
    {
      id: 'trails',
      label: 'Trails & Sightings',
      icon: 'trails',
      layers: [
        { id: 'trails', label: 'Trails', color: 'bg-amber-500', count: 12, visible: layers.trails },
        { id: 'sightings', label: 'Wildlife Sightings', color: 'bg-emerald-400', count: 4, visible: layers.sightings },
      ],
    },
    {
      id: 'risk',
      label: 'Hazards & Risk',
      icon: 'risk',
      layers: [
        { id: 'hazards', label: 'Active Hazards', color: 'bg-red-500', count: 3, visible: layers.hazards },
      ],
    },
  ];

  // Define legend items
  const legendItems = [
    { label: 'National Parks', color: 'bg-emerald-500', shape: 'circle' as const, count: 3 },
    { label: 'Wildlife Sanctuaries', color: 'bg-blue-500', shape: 'circle' as const, count: 7 },
    { label: 'Wetland Reserves', color: 'bg-cyan-500', shape: 'circle' as const, count: 4 },
    { label: 'Lakes', color: 'bg-blue-500/50', shape: 'circle' as const, count: 13 },
    { label: 'Wetlands', color: 'bg-cyan-500/50', shape: 'circle' as const, count: 8 },
    { label: 'Rivers & Streams', color: 'bg-blue-400', shape: 'circle' as const },
    { label: 'Watersheds', color: 'bg-blue-300', shape: 'polygon' as const },
    { label: 'Glaciers', color: 'bg-sky-200', shape: 'polygon' as const },
    { label: 'Trails', color: 'bg-amber-500', shape: 'line' as const },
    { label: 'Wildlife Sightings', color: 'bg-emerald-400', shape: 'circle' as const },
    { label: 'Hazards', color: 'bg-red-500', shape: 'circle' as const },
    { label: 'District Boundaries', color: 'border-white/40', shape: 'polygon' as const },
  ];

  // Define floating chips
  const chips = [
    { id: 'protected', label: 'Protected Areas', value: '14', removable: false },
    { id: 'water', label: 'Water Bodies', value: '21', removable: false },
  ];

  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />

      {/* Top Command Bar */}
      <TopCommandBar
        layerCount={activeLayerCount}
        onToggleLayers={() => setLayerRailOpen(!layerRailOpen)}
        onFeatureSelect={handleSearchResultSelect}
      />

      {/* Layer Rail */}
      <LayerRail
        isOpen={layerRailOpen}
        onClose={() => setLayerRailOpen(false)}
        layers={layerGroups}
        onToggleLayer={toggleLayer}
      />

      {/* Map container - Full screen */}
      <div className={`h-[calc(100vh-64px)] w-full transition-all duration-300 ${layerRailOpen ? 'md:ml-80' : ''}`}>
        <AtlasMap onMapReady={setMapInstance}>
          {/* GIS Layers */}
          <DistrictLayer
            visible={layers.districts}
            onFeatureClick={handleFeatureClick}
          />
          <ProtectedAreaLayer
            visible={layers.protectedAreas}
            onFeatureClick={handleFeatureClick}
          />
          <WaterBodyLayer
            visible={layers.lakes || layers.wetlands}
            onFeatureClick={handleFeatureClick}
          />
          <RiverLayer
            visible={layers.rivers}
            onFeatureClick={handleFeatureClick}
          />
          <WatershedLayer
            visible={layers.watersheds}
            onFeatureClick={handleFeatureClick}
          />
          <GlacierLayer
            visible={layers.glaciers}
            onFeatureClick={handleFeatureClick}
          />
          <TrailLayer
            visible={layers.trails}
            onFeatureClick={handleFeatureClick}
          />
          <SightingLayer
            visible={layers.sightings}
            onFeatureClick={handleFeatureClick}
          />
          <HazardLayer
            visible={layers.hazards}
            onFeatureClick={handleFeatureClick}
          />

          {/* Map Controls - Must be inside MapContainer */}
          <MapControls onToggleLayers={() => setLayerRailOpen(!layerRailOpen)} />
          <CoordinateDisplay />
          <ScaleBar />
        </AtlasMap>
      </div>

      {/* Floating Chips */}
      <FloatingChips chips={chips} position="bottom-left" />

      {/* Legend Card - Higher z-index on large screens */}
      <div className="fixed bottom-20 right-4 md:bottom-20 md:right-20 z-[350] md:z-[500]">
        <LegendCard items={legendItems} visible={showLegend} />
      </div>

      {/* Feature Drawer */}
      {selectedFeature && (
        <FeatureDrawer
          isOpen={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          feature={selectedFeature}
        />
      )}

      <AdvancedFooter />
    </main>
  );
}
