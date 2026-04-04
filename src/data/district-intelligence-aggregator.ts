/**
 * District Intelligence - Enhanced Aggregation Layer
 * 
 * Aggregates district profiles with computed intelligence for the District Profiles page.
 */

import { getAllDistrictProfiles, getDistrictProfile } from './districts-intelligence';
import type { DistrictProfile } from '@/types/districts';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export type DistrictSortKey = 
  | 'name'
  | 'risk-high'
  | 'risk-low'
  | 'population'
  | 'area'
  | 'biodiversity'
  | 'water-security';

export type DistrictFilterRegion = 'all' | 'kashmir-valley' | 'jammu' | 'ladakh';

export type DistrictFilterRiskLevel = 'all' | 'critical' | 'high' | 'moderate' | 'low';

export interface DistrictIntelligenceSummary {
  profile: DistrictProfile;
  riskLevel: 'critical' | 'high' | 'moderate' | 'low';
  environmentalSummary: string;
  keyHighlights: string[];
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function getRiskLevel(score: number): 'critical' | 'high' | 'moderate' | 'low' {
  if (score >= 80) return 'critical';
  if (score >= 70) return 'high';
  if (score >= 60) return 'moderate';
  return 'low';
}

function generateEnvironmentalSummary(profile: DistrictProfile): string {
  const parts: string[] = [];
  
  // Biodiversity highlight
  if (profile.biodiversity.totalSpecies > 800) {
    parts.push(`Highly biodiverse with ${profile.biodiversity.totalSpecies}+ species`);
  } else if (profile.biodiversity.totalSpecies > 500) {
    parts.push(`Rich biodiversity with ${profile.biodiversity.totalSpecies} species`);
  }
  
  // Water systems
  const waterCount = profile.hydrological.waterBodies.total;
  if (waterCount > 15) {
    parts.push(`extensive water network (${waterCount} bodies)`);
  } else if (waterCount > 10) {
    parts.push(`significant water systems (${waterCount} bodies)`);
  }
  
  // Risk highlight
  const riskLevel = getRiskLevel(profile.scores.riskLevel);
  if (riskLevel === 'critical' || riskLevel === 'high') {
    parts.push(`elevated environmental risk`);
  }
  
  // Protected areas
  if (profile.ecological.protectedAreas.count > 2) {
    parts.push(`${profile.ecological.protectedAreas.count} protected areas`);
  }
  
  return parts.length > 0 
    ? parts[0].charAt(0).toUpperCase() + parts[0].slice(1) + parts.slice(1).map(p => `, ${p}`).join('') + '.'
    : `District with diverse environmental systems and monitoring coverage.`;
}

function getKeyHighlights(profile: DistrictProfile): string[] {
  const highlights: string[] = [];
  
  // Top strength
  if (profile.strengths && profile.strengths.length > 0) {
    highlights.push(profile.strengths[0]);
  }
  
  // Top pressure
  if (profile.pressures && profile.pressures.length > 0) {
    highlights.push(profile.pressures[0]);
  }
  
  return highlights.slice(0, 2);
}

export function getAllDistrictIntelligence(
  region: DistrictFilterRegion = 'kashmir-valley'
): DistrictIntelligenceSummary[] {
  const profiles = region === 'all' 
    ? getAllDistrictProfiles(false)
    : region === 'kashmir-valley'
    ? getAllDistrictProfiles(true)
    : getAllDistrictProfiles(false).filter(p => {
        if (region === 'jammu') return p.region === 'jammu';
        if (region === 'ladakh') return p.region === 'ladakh';
        return true;
      });
  
  return profiles.map(profile => {
    return {
      profile,
      riskLevel: getRiskLevel(profile.scores.riskLevel),
      environmentalSummary: generateEnvironmentalSummary(profile),
      keyHighlights: getKeyHighlights(profile),
    };
  });
}

export function getDistrictSummaryStats() {
  const allDistricts = getAllDistrictIntelligence('all');
  
  // Find highest risk district
  const highestRisk = allDistricts.reduce((max, d) => 
    d.profile.scores.riskLevel > max.profile.scores.riskLevel ? d : max
  , allDistricts[0]);
  
  // Find most biodiverse
  const mostBiodiverse = allDistricts.reduce((max, d) => 
    d.profile.biodiversity.totalSpecies > max.profile.biodiversity.totalSpecies ? d : max
  , allDistricts[0]);
  
  // Find most monitored (by water bodies + species)
  const mostMonitored = allDistricts.reduce((max, d) => 
    (d.profile.hydrological.waterBodies.total + d.profile.biodiversity.totalSpecies) > 
    (max.profile.hydrological.waterBodies.total + max.profile.biodiversity.totalSpecies) ? d : max
  , allDistricts[0]);
  
  return {
    totalDistricts: allDistricts.length,
    highestRiskDistrict: highestRisk.profile.name,
    mostBiodiverseDistrict: mostBiodiverse.profile.name,
    mostMonitoredDistrict: mostMonitored.profile.name,
    districtsActiveAlerts: allDistricts.filter(d => d.riskLevel === 'high' || d.riskLevel === 'critical').length,
  };
}

export function sortDistricts(
  districts: DistrictIntelligenceSummary[],
  sortBy: DistrictSortKey
): DistrictIntelligenceSummary[] {
  const sorted = [...districts];
  
  switch (sortBy) {
    case 'name':
      return sorted.sort((a, b) => a.profile.name.localeCompare(b.profile.name));
    case 'risk-high':
      return sorted.sort((a, b) => b.profile.scores.riskLevel - a.profile.scores.riskLevel);
    case 'risk-low':
      return sorted.sort((a, b) => a.profile.scores.riskLevel - b.profile.scores.riskLevel);
    case 'population':
      return sorted.sort((a, b) => b.profile.population.total - a.profile.population.total);
    case 'area':
      return sorted.sort((a, b) => b.profile.area.value - a.profile.area.value);
    case 'biodiversity':
      return sorted.sort((a, b) => b.profile.biodiversity.totalSpecies - a.profile.biodiversity.totalSpecies);
    case 'water-security':
      return sorted.sort((a, b) => b.profile.scores.waterSecurity - a.profile.scores.waterSecurity);
    case 'alerts':
      return sorted.sort((a, b) => b.activeAlerts - a.activeAlerts);
    case 'evidence':
      return sorted.sort((a, b) => b.evidenceCount - a.evidenceCount);
    default:
      return sorted;
  }
}
