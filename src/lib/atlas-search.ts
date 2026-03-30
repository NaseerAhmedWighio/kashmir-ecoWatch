// Atlas search utility
// Searches across all entity types in the Kashmir EcoWatch atlas

import { speciesData, protectedAreasData, waterBodiesData, trailsData, districtsData } from '@/data';

export interface SearchResult {
  type: 'species' | 'protected_area' | 'lake' | 'wetland' | 'trail' | 'district';
  id: string;
  slug: string;
  name: string;
  description: string;
  district?: string;
  category?: string;
  coordinates?: { lat: number; lng: number };
}

export function searchAtlas(query: string): Record<string, SearchResult[]> {
  const lowerQuery = query.toLowerCase().trim();
  
  if (!lowerQuery || lowerQuery.length < 2) {
    return {
      species: [],
      protectedAreas: [],
      waterBodies: [],
      trails: [],
      districts: [],
    };
  }

  return {
    species: speciesData
      .filter(s => 
        s.name.toLowerCase().includes(lowerQuery) ||
        s.scientificName.toLowerCase().includes(lowerQuery) ||
        s.commonName.toLowerCase().includes(lowerQuery) ||
        s.localName?.toLowerCase().includes(lowerQuery)
      )
      .slice(0, 5)
      .map(s => ({
        type: 'species' as const,
        id: s.id,
        slug: s.slug,
        name: s.name,
        description: s.description,
        district: s.districts.join(', '),
        coordinates: undefined, // Species don't have fixed coordinates
      })),

    protectedAreas: protectedAreasData
      .filter(pa =>
        pa.name.toLowerCase().includes(lowerQuery) ||
        pa.district.toLowerCase().includes(lowerQuery) ||
        pa.keySpecies.some(s => s.toLowerCase().includes(lowerQuery))
      )
      .slice(0, 5)
      .map(pa => ({
        type: 'protected_area' as const,
        id: pa.id,
        slug: pa.slug,
        name: pa.name,
        description: pa.description,
        district: pa.district,
        category: pa.category,
        coordinates: undefined, // ProtectedArea doesn't have coordinates
      })),

    waterBodies: waterBodiesData
      .filter(wb =>
        wb.name.toLowerCase().includes(lowerQuery) ||
        wb.district.toLowerCase().includes(lowerQuery)
      )
      .slice(0, 5)
      .map(wb => ({
        type: wb.type as 'lake' | 'wetland',
        id: wb.id,
        slug: wb.slug,
        name: wb.name,
        description: wb.description,
        district: wb.district,
        category: wb.category,
        coordinates: undefined, // WaterBody doesn't have coordinates in current type
      })),

    trails: trailsData
      .filter(t => 
        t.name.toLowerCase().includes(lowerQuery) ||
        t.district.toLowerCase().includes(lowerQuery)
      )
      .slice(0, 5)
      .map(t => ({
        type: 'trail' as const,
        id: t.id,
        slug: t.slug,
        name: t.name,
        description: t.description,
        district: t.district,
      })),

    districts: districtsData
      .filter(d => 
        d.name.toLowerCase().includes(lowerQuery) ||
        d.headquarters.toLowerCase().includes(lowerQuery)
      )
      .slice(0, 5)
      .map(d => ({
        type: 'district' as const,
        id: d.id,
        slug: d.slug,
        name: d.name,
        description: `${d.area} km² • ${d.population.toLocaleString()} people`,
        district: d.name,
      })),
  };
}

// Get total result count
export function getTotalResults(results: Record<string, SearchResult[]>): number {
  return Object.values(results).reduce((sum, arr) => sum + arr.length, 0);
}
