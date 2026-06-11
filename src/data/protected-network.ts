// Protected Network Data Service

export interface ProtectedArea {
  id: string;
  slug: string;
  name: string;
  category: 'national_park' | 'wildlife_sanctuary' | 'wetland_reserve' | 'conservation_reserve' | 'iba';
  description: string;
  area: number; // km²
  district: string;
  established: number;
  ecosystems: string[];
  keySpecies: string[];
  imageUrl?: string;
  latitude?: number;
  longitude?: number;
  scope?: 'Kashmir Core' | 'Trans-Divisional' | 'Transboundary / Extended';
  legalStatus?: 'Verified' | 'Historical' | 'Under Review' | 'Extended Scope';
  altitudeRange?: string;
  flagshipSpecies?: string;
  dataStatus?: string;
}

export interface Corridor {
  id: string;
  slug: string;
  name: string;
  type: string;
  length: string;
  status: 'Active' | 'Degraded' | 'Threatened';
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  description: string;
  connectedAreas: string[];
  districts: string[];
  keySpecies: string[];
  threats: string[];
  conservationMeasures: string[];
}

export interface Trail {
  id: string;
  slug: string;
  name: string;
  type: 'Eco-Trail' | 'Birding Trail' | 'Interpretation Trail' | 'Trekking Route';
  protectedArea: string;
  length: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  description: string;
  elevation: { min: number; max: number };
  bestSeason: string;
  highlights: string[];
  wildlife: string[];
  safetyNotes: string[];
}

export interface Threat {
  id: string;
  slug: string;
  name: string;
  type: 'Fragmentation' | 'Wetland Stress' | 'Visitor Pressure' | 'Habitat Degradation' | 'Fire' | 'Poaching' | 'Climate';
  severity: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  affectedAreas: string[];
  indicators: string[];
  impactedSpecies: string[];
  mitigationStrategies: string[];
}

export interface Report {
  id: string;
  slug: string;
  title: string;
  type: 'Management Plan' | 'Scientific Report' | 'Monitoring Data' | 'Assessment' | 'Atlas';
  year: number;
  description: string;
  authors: string[];
  linkedAreas: string[];
  linkedSpecies: string[];
  themes: string[];
}

export interface SpeciesProfile {
  id: string;
  slug: string;
  name: string;
  scientificName: string;
  conservationStatus: string;
  description: string;
  distribution: string;
  ecology: string;
  seasonality: string;
  threats: string[];
  conservationMeasures: string[];
  protectedAreas: string[];
}

export const nationalParksData: ProtectedArea[] = [

  // ── NP-JK-001 · KASHMIR CORE ──
  {
    id: 'dachigam',
    slug: 'dachigam-national-park',
    name: 'Dachigam National Park',
    category: 'national_park',
    description: 'Temperate forest and montane conservation landscape near Srinagar, known as the critical habitat of the endangered Hangul. Supports watershed protection, forest biodiversity, upper-lower elevation gradients, and long-term conservation monitoring.',
    area: 141,
    district: 'Srinagar',
    established: 1981,
    ecosystems: ['Temperate forest', 'Montane scrub', 'Alpine edge', 'Riverine forest'],
    keySpecies: ['Hangul (Kashmir Stag)', 'Himalayan black bear', 'Leopard', 'Musk deer'],
    scope: 'Kashmir Core',
    legalStatus: 'Verified',
    altitudeRange: '1,700 to 4,300 m',
    flagshipSpecies: 'Hangul',
    dataStatus: 'Official Verified',
    latitude: 34.15,
    longitude: 75.05,
  },

  // ── NP-JK-002 · KASHMIR CORE / TRANSBOUNDARY RELEVANCE ──
  {
    id: 'kazinag',
    slug: 'kazinag-national-park',
    name: 'Kazinag National Park',
    category: 'national_park',
    description: 'Pir Panjal and transboundary conservation landscape in Baramulla, supporting Markhor habitat, conifer forests, alpine meadows, cliff ecosystems, and high-altitude biodiversity corridors near the Line of Control.',
    area: 160,
    district: 'Baramulla',
    established: 1992,
    ecosystems: ['Conifer forest', 'Alpine pasture', 'Cliff habitat', 'Subalpine scrub'],
    keySpecies: ['Markhor', 'Musk deer', 'Himalayan black bear', 'Leopard', 'Pheasants'],
    scope: 'Kashmir Core',
    legalStatus: 'Verified',
    altitudeRange: 'approx. 1,800 to 4,300 m',
    flagshipSpecies: 'Markhor',
    dataStatus: 'Boundary Pending',
    latitude: 34.25,
    longitude: 73.85,
  },

  // ── NP-JK-003 · KASHMIR CORE ──
  {
    id: 'salim-ali',
    slug: 'salim-ali-national-park',
    name: 'Salim Ali / City Forest National Park',
    category: 'national_park',
    description: 'Small urban-edge protected landscape in Srinagar with historical national park status. Important for urban biodiversity, bird habitat, woodland patches, and protected-area history, but current legal and spatial status should be reviewed.',
    area: 9.07,
    district: 'Srinagar',
    established: 1986,
    ecosystems: ['Urban forest', 'Woodland patches', 'Wetland-edge habitat'],
    keySpecies: ['Birds', 'Small mammals', 'Urban forest biodiversity'],
    scope: 'Kashmir Core',
    legalStatus: 'Under Review',
    flagshipSpecies: 'Resident birds',
    dataStatus: 'Legal Status Under Review',
    latitude: 34.08,
    longitude: 74.82,
  },

  // ── NP-JK-004 · TRANS-DIVISIONAL ──
  {
    id: 'kishtwar',
    slug: 'kishtwar-national-park',
    name: 'Kishtwar High Altitude National Park',
    category: 'national_park',
    description: 'Large high-altitude conservation landscape in the Chenab region, covering alpine meadows, glacial valleys, conifer forests, river catchments, snow-bound habitats, and high-mountain wildlife zones.',
    area: 2190.50,
    district: 'Kishtwar',
    established: 1981,
    ecosystems: ['Alpine meadow', 'Glacial valley', 'Temperate forest', 'River catchment'],
    keySpecies: ['Snow leopard', 'Himalayan brown bear', 'Musk deer', 'Himalayan tahr', 'Serow'],
    scope: 'Trans-Divisional',
    legalStatus: 'Verified',
    altitudeRange: '1,700 to 4,800 m',
    flagshipSpecies: 'Snow leopard',
    dataStatus: 'Official Verified',
    latitude: 33.35,
    longitude: 75.75,
  },

  // ── NP-LD-001 · TRANSBOUNDARY / EXTENDED ──
  {
    id: 'hemis',
    slug: 'hemis-national-park',
    name: 'Hemis National Park',
    category: 'national_park',
    description: 'High-altitude trans-Himalayan protected landscape in Ladakh, globally important for snow leopard conservation, cold desert biodiversity, alpine wildlife, and Himalayan ecological connectivity. Not part of J&K UT official PAN.',
    area: 4400,
    district: 'Leh',
    established: 1981,
    ecosystems: ['Cold desert', 'Alpine steppe', 'High mountain valleys', 'River gorges'],
    keySpecies: ['Snow leopard', 'Tibetan wolf', 'Eurasian brown bear', 'Bharal', 'Asiatic ibex'],
    scope: 'Transboundary / Extended',
    legalStatus: 'Extended Scope',
    flagshipSpecies: 'Snow leopard',
    dataStatus: 'Extended Scope',
    latitude: 33.75,
    longitude: 77.65,
  },

  // ── NP-GB-001 · TRANSBOUNDARY / EXTENDED ──
  {
    id: 'deosai',
    slug: 'deosai-national-park',
    name: 'Deosai National Park',
    category: 'national_park',
    description: 'High-altitude alpine plateau conservation landscape in Gilgit-Baltistan, important for Himalayan brown bear habitat, alpine wetlands, grasslands, migratory birds, and western Himalayan biodiversity.',
    area: 3584,
    district: 'Skardu / Astore',
    established: 1993,
    ecosystems: ['Alpine plateau', 'Wetland', 'Grassland', 'High-altitude lake system'],
    keySpecies: ['Himalayan brown bear', 'Himalayan ibex', 'Golden marmot', 'Migratory birds'],
    scope: 'Transboundary / Extended',
    legalStatus: 'Extended Scope',
    altitudeRange: '3,500 to 5,200 m',
    flagshipSpecies: 'Himalayan brown bear',
    dataStatus: 'Extended Scope',
    latitude: 35.08,
    longitude: 75.55,
  },

  // ── NP-GB-002 · TRANSBOUNDARY / EXTENDED ──
  {
    id: 'khunjerab',
    slug: 'khunjerab-national-park',
    name: 'Khunjerab National Park',
    category: 'national_park',
    description: 'High Karakoram borderland national park in Gilgit-Baltistan, established for high-mountain wildlife conservation and important for Marco Polo sheep, snow leopard, ibex, blue sheep, and alpine biodiversity.',
    area: 2269.13,
    district: 'Hunza',
    established: 1975,
    ecosystems: ['Alpine desert', 'High mountain pasture', 'Karakoram border habitat'],
    keySpecies: ['Marco Polo sheep', 'Snow leopard', 'Himalayan ibex', 'Blue sheep', 'Brown bear'],
    scope: 'Transboundary / Extended',
    legalStatus: 'Extended Scope',
    flagshipSpecies: 'Marco Polo sheep',
    dataStatus: 'Literature Supported',
    latitude: 36.85,
    longitude: 75.45,
  },

  // ── NP-GB-003 · TRANSBOUNDARY / EXTENDED ──
  {
    id: 'cknp',
    slug: 'central-karakoram-national-park',
    name: 'Central Karakoram National Park',
    category: 'national_park',
    description: 'Large high-mountain protected landscape covering glaciers, major Karakoram peaks, alpine valleys, and extreme elevation ecosystems across multiple Gilgit-Baltistan districts.',
    area: 10000, // area range 10,000–10,557.73 km²; single authority figure pending
    district: 'Gilgit / Hunza / Ghanche',
    established: 1993,
    ecosystems: ['Glaciers', 'Alpine valleys', 'Rock desert', 'High mountain systems'],
    keySpecies: ['Snow leopard', 'Himalayan ibex', 'Brown bear', 'Blue sheep', 'High-altitude birds'],
    scope: 'Transboundary / Extended',
    legalStatus: 'Extended Scope',
    altitudeRange: 'High Karakoram',
    flagshipSpecies: 'Snow leopard',
    dataStatus: 'Boundary Pending',
    latitude: 36.05,
    longitude: 75.85,
  },

  // ── NP-AJK-001 · TRANSBOUNDARY / EXTENDED ──
  {
    id: 'machiara',
    slug: 'machiara-national-park',
    name: 'Machiara National Park',
    category: 'national_park',
    description: 'Western Himalayan forest national park near Muzaffarabad, important for Himalayan musk deer, western tragopan, pheasants, broadleaf forest biodiversity, and community-linked conservation.',
    area: 135.32,
    district: 'Muzaffarabad',
    established: 1996,
    ecosystems: ['Western Himalayan broadleaf forest', 'Temperate forest', 'Subalpine habitat'],
    keySpecies: ['Himalayan musk deer', 'Snow leopard', 'Western tragopan', 'Cheer pheasant', 'Himalayan vulture'],
    scope: 'Transboundary / Extended',
    legalStatus: 'Extended Scope',
    flagshipSpecies: 'Western tragopan',
    dataStatus: 'Literature Supported',
    latitude: 34.45,
    longitude: 73.65,
  },

  // ── NP-AJK-002 · TRANSBOUNDARY / EXTENDED ──
  {
    id: 'pir-lasura',
    slug: 'pir-lasura-national-park',
    name: 'Pir Lasura National Park',
    category: 'national_park',
    description: 'Mountain forest and ridge landscape in AJK, important for biodiversity baseline assessment, resident wildlife, subtropical pine systems, and community-linked conservation monitoring.',
    area: 0, // area TBD — needs official verification
    district: 'Kotli / Pir Panjal zone',
    established: 2005,
    ecosystems: ['Pine forest', 'Broadleaf forest', 'Rocky ridges', 'Grassland patches'],
    keySpecies: ['Leopard', 'Goral', 'Pheasants', 'Small mammals', 'Migratory birds'],
    scope: 'Transboundary / Extended',
    legalStatus: 'Extended Scope',
    flagshipSpecies: 'Goral',
    dataStatus: 'Species Data Pending',
    latitude: 33.95,
    longitude: 73.75,
  },
];




export const wildlifeSanctuariesData: ProtectedArea[] = [
  {
    id: 'overa-aru',
    slug: 'overa-aru-wildlife-sanctuary',
    name: 'Overa-Aru Wildlife Sanctuary',
    category: 'wildlife_sanctuary',
    description: 'Important bird area and habitat for Hangul outside Dachigam. Alpine meadows and temperate forests.',
    area: 511,
    district: 'Anantnag',
    established: 1981,
    ecosystems: ['Alpine meadows', 'Temperate forests', 'Wetlands'],
    keySpecies: ['hangul', 'kashmir-flycatcher', 'western-tragopan'],
    latitude: 33.95,
    longitude: 75.15,
  },
  {
    id: 'hirpora',
    slug: 'hirpora-wildlife-sanctuary',
    name: 'Hirpora Wildlife Sanctuary',
    category: 'wildlife_sanctuary',
    description: 'Protected landscape in southern Kashmir with diverse mammal and bird species.',
    area: 341,
    district: 'Kulgam',
    established: 1987,
    ecosystems: ['Temperate forests', 'Alpine zones', 'Grasslands'],
    keySpecies: ['markhor', 'musk-deer', 'leopard'],
    latitude: 33.65,
    longitude: 75.05,
  },
  {
    id: 'gulmarg',
    slug: 'gulmarg-wildlife-sanctuary',
    name: 'Gulmarg Wildlife Sanctuary',
    category: 'wildlife_sanctuary',
    description: 'Tourist destination and protected area known for alpine flora and fauna.',
    area: 180,
    district: 'Baramulla',
    established: 1987,
    ecosystems: ['Alpine meadows', 'Coniferous forests'],
    keySpecies: ['himlayan-monals', 'musk-deer', 'brown-bear'],
    latitude: 34.05,
    longitude: 74.38,
  },
  {
    id: 'limber',
    slug: 'limber-wildlife-sanctuary',
    name: 'Limber Wildlife Sanctuary',
    category: 'wildlife_sanctuary',
    description: 'Temperate forest sanctuary in northern Kashmir supporting diverse wildlife and bird species.',
    area: 125,
    district: 'Baramulla',
    established: 1987,
    ecosystems: ['Temperate forests', 'Oak forests', 'Coniferous zones'],
    keySpecies: ['black-bear', 'leopard', 'himlayan-monals'],
    latitude: 34.15,
    longitude: 74.45,
  },
  {
    id: 'lachipora',
    slug: 'lachipora-wildlife-sanctuary',
    name: 'Lachipora Wildlife Sanctuary',
    category: 'wildlife_sanctuary',
    description: 'Remote sanctuary in western Kashmir with pristine forests and high biodiversity value.',
    area: 234,
    district: 'Kupwara',
    established: 1987,
    ecosystems: ['Temperate forests', 'Alpine meadows', 'Riverine forests'],
    keySpecies: ['markhor', 'musk-deer', 'brown-bear'],
    latitude: 34.35,
    longitude: 74.25,
  },
  {
    id: 'rajparian',
    slug: 'rajparian-wildlife-sanctuary',
    name: 'Rajparian Wildlife Sanctuary',
    category: 'wildlife_sanctuary',
    description: 'Mountain sanctuary in southern Kashmir known for Hangul habitat and scenic landscapes.',
    area: 167,
    district: 'Anantnag',
    established: 1981,
    ecosystems: ['Temperate forests', 'Alpine meadows', 'Rocky terrain'],
    keySpecies: ['hangul', 'musk-deer', 'leopard'],
    latitude: 33.85,
    longitude: 75.25,
  },
  {
    id: 'hokersar-wls',
    slug: 'hokersar-wildlife-sanctuary',
    name: 'Hokersar Wildlife Sanctuary',
    category: 'wildlife_sanctuary',
    description: 'Wetland sanctuary adjacent to Hokersar Wetland Reserve, supporting waterfowl and wetland species.',
    area: 18.5,
    district: 'Srinagar',
    established: 1986,
    ecosystems: ['Wetlands', 'Marsh', 'Reedbeds'],
    keySpecies: ['migratory-waterfowl', 'wetland-birds'],
    latitude: 34.26,
    longitude: 74.86,
  },
];

export const wetlandReservesData: ProtectedArea[] = [
  {
    id: 'hokersar',
    slug: 'hokersar-wetland',
    name: 'Hokersar Wetland Reserve',
    category: 'wetland_reserve',
    description: 'Ramsar site and critical wetland for migratory birds. One of the most important wetlands in Kashmir.',
    area: 13.75,
    district: 'Srinagar',
    established: 1986,
    ecosystems: ['Marsh', 'Reedbeds', 'Open water', 'Wet meadows'],
    keySpecies: ['migratory-waterfowl', 'wetland-birds'],
    latitude: 34.25,
    longitude: 74.85,
  },
  {
    id: 'shallabugh',
    slug: 'shallabugh-wetland',
    name: 'Shallabugh Wetland Reserve',
    category: 'wetland_reserve',
    description: 'Important wetland for wintering waterfowl and resident bird species.',
    area: 7.5,
    district: 'Ganderbal',
    established: 1986,
    ecosystems: ['Marsh', 'Open water', 'Aquatic vegetation'],
    keySpecies: ['migratory-waterfowl', 'wetland-birds'],
    latitude: 34.35,
    longitude: 74.75,
  },
  {
    id: 'hygam',
    slug: 'hygam-wetland',
    name: 'Hygam Wetland Reserve',
    category: 'wetland_reserve',
    description: 'Wetland reserve in northern Kashmir supporting diverse bird life.',
    area: 5.2,
    district: 'Baramulla',
    established: 1986,
    ecosystems: ['Marsh', 'Open water'],
    keySpecies: ['wetland-birds', 'migratory-species'],
    latitude: 34.35,
    longitude: 74.55,
  },
  {
    id: 'wular',
    slug: 'wular-wetland-system',
    name: 'Wular Wetland System',
    category: 'wetland_reserve',
    description: 'Largest freshwater wetland in South Asia, Ramsar site of international importance supporting massive waterfowl populations.',
    area: 189,
    district: 'Bandipora',
    established: 1990,
    ecosystems: ['Large lake', 'Marsh', 'Reedbeds', 'Floating vegetation'],
    keySpecies: ['migratory-waterfowl', 'wetland-birds', 'bar-headed-goose'],
    latitude: 34.45,
    longitude: 74.65,
  },
];

export const conservationReservesData: ProtectedArea[] = [
  {
    id: 'lish-loopter',
    slug: 'lish-loopter-conservation-reserve',
    name: 'Lish Loopter Conservation Reserve',
    category: 'conservation_reserve',
    description: 'Community-involved conservation landscape in northern Kashmir.',
    area: 25,
    district: 'Kupwara',
    established: 2010,
    ecosystems: ['Temperate forests', 'Community lands'],
    keySpecies: ['common-leopard', 'jungle-cat'],
    latitude: 34.55,
    longitude: 74.25,
  },
];

export const birdHabitatAreasData: ProtectedArea[] = [
  {
    id: 'hokersar-bird',
    slug: 'hokersar-bird-area',
    name: 'Hokersar Bird Area',
    category: 'iba',
    description: 'Important Bird Area centered on Hokersar wetland, critical for migratory waterfowl and resident wetland birds.',
    area: 15.5,
    district: 'Srinagar',
    established: 2005,
    ecosystems: ['Wetland', 'Marsh', 'Reedbeds', 'Agricultural edges'],
    keySpecies: ['migratory-waterfowl', 'wetland-birds', 'bar-headed-goose'],
    latitude: 34.25,
    longitude: 74.85,
  },
  {
    id: 'hygam-bird',
    slug: 'hygam-bird-area',
    name: 'Hygam Bird Area',
    category: 'iba',
    description: 'Important Bird Area in northern Kashmir supporting wintering waterfowl and resident species.',
    area: 8.2,
    district: 'Baramulla',
    established: 2005,
    ecosystems: ['Wetland', 'Marsh', 'Open water'],
    keySpecies: ['wetland-birds', 'migratory-species'],
    latitude: 34.35,
    longitude: 74.55,
  },
  {
    id: 'shallabugh-bird',
    slug: 'shallabugh-bird-area',
    name: 'Shallabugh Bird Area',
    category: 'iba',
    description: 'Important Bird Area known for wintering waterfowl concentrations and breeding marsh birds.',
    area: 9.5,
    district: 'Ganderbal',
    established: 2005,
    ecosystems: ['Wetland', 'Marsh', 'Aquatic vegetation'],
    keySpecies: ['migratory-waterfowl', 'wetland-birds'],
    latitude: 34.35,
    longitude: 74.75,
  },
  {
    id: 'overa-aru-bird',
    slug: 'overa-aru-bird-habitat',
    name: 'Overa-Aru Bird Habitat',
    category: 'iba',
    description: 'High-altitude Important Bird Area supporting Himalayan species including Kashmir Flycatcher and Western Tragopan.',
    area: 511,
    district: 'Anantnag',
    established: 2005,
    ecosystems: ['Alpine meadows', 'Temperate forests', 'Wetlands'],
    keySpecies: ['kashmir-flycatcher', 'western-tragopan', 'himlayan-monals'],
    latitude: 33.95,
    longitude: 75.15,
  },
];

// Data access functions
export const getProtectedAreas = {
  all: (): ProtectedArea[] => [
    ...nationalParksData,
    ...wildlifeSanctuariesData,
    ...wetlandReservesData,
    ...conservationReservesData,
    ...birdHabitatAreasData,
  ],
  bySlug: (slug: string): ProtectedArea | undefined => {
    const all = [
      ...nationalParksData,
      ...wildlifeSanctuariesData,
      ...wetlandReservesData,
      ...conservationReservesData,
      ...birdHabitatAreasData,
    ];
    return all.find(pa => pa.slug === slug);
  },
  nationalParks: () => nationalParksData,
  wildlifeSanctuaries: () => wildlifeSanctuariesData,
  wetlandReserves: () => wetlandReservesData,
  conservationReserves: () => conservationReservesData,
  birdHabitatAreas: () => birdHabitatAreasData,
  byCategory: (category: string): ProtectedArea[] => {
    switch (category) {
      case 'national_park':
        return nationalParksData;
      case 'wildlife_sanctuary':
        return wildlifeSanctuariesData;
      case 'wetland_reserve':
        return wetlandReservesData;
      case 'conservation_reserve':
        return conservationReservesData;
      case 'iba':
        return birdHabitatAreasData;
      default:
        return [];
    }
  },
  byDistrict: (district: string): ProtectedArea[] => {
    return getProtectedAreas.all().filter(pa => pa.district === district);
  },
};

// Metrics
export const protectedNetworkMetrics = {
  totalProtectedAreas: 47,
  totalArea: 5847, // km²
  nationalParks: 3,
  wildlifeSanctuaries: 15,
  wetlandReserves: 5,
  conservationReserves: 8,
  importantBirdAreas: 16,
  coveragePercentage: 12.8,
};

// ============================================================================
// CORRIDORS & CONNECTIVITY DATA
// ============================================================================

export const corridorsData: Corridor[] = [
  {
    id: 'dachigam-forest-linkages',
    slug: 'dachigam-forest-linkages',
    name: 'Dachigam Forest Linkages',
    type: 'Ungulate Movement',
    length: '12 km',
    status: 'Active',
    priority: 'High',
    description: 'Critical forest connectivity linking Dachigam National Park with surrounding forest patches, enabling Hangul movement and genetic exchange.',
    connectedAreas: ['dachigam-national-park', 'overa-aru-wildlife-sanctuary'],
    districts: ['Srinagar', 'Ganderbal'],
    keySpecies: ['hangul', 'leopard', 'black-bear'],
    threats: ['Road fragmentation', 'Settlement expansion', 'Livestock grazing'],
    conservationMeasures: ['Corridor protection', 'Community engagement', 'Underpass construction'],
  },
  {
    id: 'north-kashmir-mountain-linkages',
    slug: 'north-kashmir-mountain-linkages',
    name: 'North Kashmir Mountain Linkages',
    type: 'Mountain Wildlife Corridor',
    length: '45 km',
    status: 'Active',
    priority: 'High',
    description: 'Extensive mountain corridor system connecting northern protected areas, facilitating movement of large mammals including Markhor and Brown Bear.',
    connectedAreas: ['hirpora-wildlife-sanctuary', 'gulmarg-wildlife-sanctuary'],
    districts: ['Kupwara', 'Baramulla'],
    keySpecies: ['markhor', 'brown-bear', 'musk-deer'],
    threats: ['Poaching', 'Habitat degradation', 'Climate change'],
    conservationMeasures: ['Anti-poaching patrols', 'Habitat restoration', 'Community conservation'],
  },
  {
    id: 'wetland-bird-movement-systems',
    slug: 'wetland-bird-movement-systems',
    name: 'Wetland Bird Movement Systems',
    type: 'Avian Movement Corridor',
    length: '28 km',
    status: 'Degraded',
    priority: 'Critical',
    description: 'Network of wetland stepping stones enabling migratory bird movement across the Kashmir Valley. Critical for waterfowl conservation.',
    connectedAreas: ['hokersar-wetland', 'shallabugh-wetland', 'hygam-wetland'],
    districts: ['Srinagar', 'Ganderbal', 'Baramulla'],
    keySpecies: ['migratory-waterfowl', 'wetland-birds', 'bar-headed-goose'],
    threats: ['Wetland encroachment', 'Pollution', 'Water diversion'],
    conservationMeasures: ['Wetland restoration', 'Ramsar management', 'Pollution control'],
  },
  {
    id: 'south-kashmir-mountain-continuity',
    slug: 'south-kashmir-mountain-continuity',
    name: 'South Kashmir Mountain Continuity',
    type: 'Mountain Range Corridor',
    length: '67 km',
    status: 'Active',
    priority: 'High',
    description: 'Mountain range connectivity linking southern protected areas, supporting Hangul dispersal and high-altitude species movement.',
    connectedAreas: ['overa-aru-wildlife-sanctuary', 'hirpora-wildlife-sanctuary'],
    districts: ['Anantnag', 'Kulgam', 'Kishtwar'],
    keySpecies: ['hangul', 'snow-leopard', 'musk-deer'],
    threats: ['Infrastructure development', 'Grazing pressure', 'Human disturbance'],
    conservationMeasures: ['Corridor designation', 'Grazing management', 'Infrastructure planning'],
  },
];

// ============================================================================
// TRAILS & SIGHTINGS DATA
// ============================================================================

export const trailsData: Trail[] = [
  {
    id: 'dachigam-landscape-interpretation-trail',
    slug: 'dachigam-landscape-interpretation-trail',
    name: 'Dachigam Landscape Interpretation Trail',
    type: 'Interpretation Trail',
    protectedArea: 'Dachigam National Park',
    length: '8 km',
    difficulty: 'Moderate',
    description: 'Scenic interpretation trail showcasing the diverse landscapes of Dachigam, from riverine forests to alpine meadows. Excellent for Hangul spotting.',
    elevation: { min: 1800, max: 2800 },
    bestSeason: 'April to October',
    highlights: ['Hangul habitat', 'Temperate forests', 'Mountain streams', 'Panoramic views'],
    wildlife: ['hangul', 'brown-bear', 'leopard', 'himlayan-monals'],
    safetyNotes: ['Stay on marked trails', 'Carry bear spray', 'Inform park authorities', 'Avoid dawn/dusk alone'],
  },
  {
    id: 'hokersar-wetland-birding-route',
    slug: 'hokersar-wetland-birding-route',
    name: 'Hokersar Wetland Birding Route',
    type: 'Birding Trail',
    protectedArea: 'Hokersar Wetland Reserve',
    length: '3 km',
    difficulty: 'Easy',
    description: 'Circular birding route around Hokersar wetland, offering exceptional views of migratory waterfowl and resident wetland species.',
    elevation: { min: 1585, max: 1590 },
    bestSeason: 'October to March (migration), Year-round for residents',
    highlights: ['Migratory waterfowl', 'Reedbed ecosystems', 'Photography hides', 'Interpretation center'],
    wildlife: ['bar-headed-goose', 'brahminy-duck', 'wetland-birds', 'marsh-harrier'],
    safetyNotes: ['Respect bird distances', 'No loud noises', 'Stay on boardwalks', 'No littering'],
  },
  {
    id: 'gulmarg-forest-birding-route',
    slug: 'gulmarg-forest-birding-route',
    name: 'Gulmarg Forest Birding Route',
    type: 'Birding Trail',
    protectedArea: 'Gulmarg Wildlife Sanctuary',
    length: '5 km',
    difficulty: 'Moderate',
    description: 'Forest trail through coniferous and mixed forests of Gulmarg, excellent for pheasant and high-altitude bird species.',
    elevation: { min: 2600, max: 3200 },
    bestSeason: 'May to September',
    highlights: ['Himalayan Monal', 'Temperate forests', 'Alpine meadows', 'Mountain views'],
    wildlife: ['himlayan-monals', 'western-tragopan', 'musk-deer', 'brown-bear'],
    safetyNotes: ['Weather can change rapidly', 'Carry warm clothing', 'Stay on trail', 'Beware of bears'],
  },
  {
    id: 'overa-aru-meadow-ecology-trail',
    slug: 'overa-aru-meadow-ecology-trail',
    name: 'Overa-Aru Meadow Ecology Trail',
    type: 'Eco-Trail',
    protectedArea: 'Overa-Aru Wildlife Sanctuary',
    length: '6 km',
    difficulty: 'Moderate',
    description: 'Ecological trail through alpine meadows and temperate forests, showcasing the biodiversity of Overa-Aru sanctuary.',
    elevation: { min: 2400, max: 3400 },
    bestSeason: 'June to September',
    highlights: ['Alpine flowers', 'Hangul habitat', 'Meadow ecosystems', 'Mountain streams'],
    wildlife: ['hangul', 'kashmir-flycatcher', 'western-tragopan', 'musk-deer'],
    safetyNotes: ['Leeches in monsoon', 'Carry first aid', 'Inform sanctuary office', 'No camping without permit'],
  },
];

// ============================================================================
// MONITORING & THREATS DATA
// ============================================================================

export const threatsData: Threat[] = [
  {
    id: 'fragmentation-pressure',
    slug: 'fragmentation-pressure',
    name: 'Habitat Fragmentation Pressure',
    type: 'Fragmentation',
    severity: 'high',
    description: 'Increasing fragmentation of protected area landscapes due to infrastructure development, settlements, and land-use change.',
    affectedAreas: ['dachigam-national-park', 'overa-aru-wildlife-sanctuary', 'gulmarg-wildlife-sanctuary'],
    indicators: ['Road density increase', 'Settlement expansion', 'Forest edge degradation', 'Corridor disruption'],
    impactedSpecies: ['hangul', 'leopard', 'black-bear', 'musk-deer'],
    mitigationStrategies: ['Corridor protection', 'Land-use planning', 'Community engagement', 'Infrastructure mitigation'],
  },
  {
    id: 'wetland-stress',
    slug: 'wetland-stress',
    name: 'Wetland Ecosystem Stress',
    type: 'Wetland Stress',
    severity: 'critical',
    description: 'Multiple stressors affecting wetland health including pollution, encroachment, water diversion, and invasive species.',
    affectedAreas: ['hokersar-wetland', 'shallabugh-wetland', 'hygam-wetland'],
    indicators: ['Water quality decline', 'Reedbed loss', 'Encroachment', 'Invasive species spread'],
    impactedSpecies: ['migratory-waterfowl', 'wetland-birds', 'bar-headed-goose'],
    mitigationStrategies: ['Wetland restoration', 'Pollution control', 'Ramsar management', 'Community stewardship'],
  },
  {
    id: 'visitor-pressure',
    slug: 'visitor-pressure',
    name: 'Tourism & Visitor Pressure',
    type: 'Visitor Pressure',
    severity: 'medium',
    description: 'Increasing tourism pressure in protected areas leading to disturbance, litter, trail erosion, and wildlife stress.',
    affectedAreas: ['gulmarg-wildlife-sanctuary', 'dachigam-national-park', 'hokersar-wetland'],
    indicators: ['Trail erosion', 'Litter accumulation', 'Wildlife disturbance', 'Vegetation damage'],
    impactedSpecies: ['himlayan-monals', 'hangul', 'wetland-birds'],
    mitigationStrategies: ['Visitor management', 'Carrying capacity limits', 'Eco-tourism guidelines', 'Waste management'],
  },
  {
    id: 'habitat-degradation',
    slug: 'habitat-degradation',
    name: 'Habitat Quality Degradation',
    type: 'Habitat Degradation',
    severity: 'high',
    description: 'Gradual degradation of habitat quality due to grazing pressure, invasive species, and climate change impacts.',
    affectedAreas: ['overa-aru-wildlife-sanctuary', 'hirpora-wildlife-sanctuary', 'kishtwar-national-park'],
    indicators: ['Grazing intensity', 'Invasive species cover', 'Native vegetation decline', 'Soil erosion'],
    impactedSpecies: ['hangul', 'markhor', 'musk-deer', 'western-tragopan'],
    mitigationStrategies: ['Grazing management', 'Invasive removal', 'Habitat restoration', 'Climate adaptation'],
  },
  {
    id: 'fire-sensitivity',
    slug: 'fire-sensitivity',
    name: 'Forest Fire Sensitivity',
    type: 'Fire',
    severity: 'medium',
    description: 'Increasing frequency and intensity of forest fires due to climate change and human activities, threatening forest ecosystems.',
    affectedAreas: ['dachigam-national-park', 'overa-aru-wildlife-sanctuary', 'hirpora-wildlife-sanctuary'],
    indicators: ['Fire frequency', 'Burn area', 'Dry season severity', 'Human ignition sources'],
    impactedSpecies: ['black-bear', 'himlayan-monals', 'kashmir-flycatcher'],
    mitigationStrategies: ['Fire management', 'Early warning systems', 'Community fire brigades', 'Fire breaks'],
  },
];

// ============================================================================
// REPORTS & PLANS DATA
// ============================================================================

export const reportsData: Report[] = [
  {
    id: 'dachigam-management-context',
    slug: 'dachigam-management-context',
    title: 'Dachigam National Park Management Plan 2024-2029',
    type: 'Management Plan',
    year: 2024,
    description: 'Comprehensive management plan for Dachigam National Park focusing on Hangul conservation, habitat management, and sustainable tourism.',
    authors: ['J&K Wildlife Protection Department', 'WII Dehradun'],
    linkedAreas: ['dachigam-national-park'],
    linkedSpecies: ['hangul', 'brown-bear', 'leopard'],
    themes: ['Protected Area Management', 'Species Conservation', 'Community Engagement', 'Tourism Management'],
  },
  {
    id: 'wetland-conservation-context',
    slug: 'wetland-conservation-context',
    title: 'Kashmir Wetlands Conservation Strategy 2023-2030',
    type: 'Management Plan',
    year: 2023,
    description: 'Strategic framework for conservation and management of Kashmir wetlands including Ramsar sites and important bird areas.',
    authors: ['Wetland International', 'J&K Lake Conservation Authority'],
    linkedAreas: ['hokersar-wetland', 'shallabugh-wetland', 'hygam-wetland'],
    linkedSpecies: ['migratory-waterfowl', 'wetland-birds'],
    themes: ['Wetland Conservation', 'Ramsar Management', 'Community Stewardship', 'Water Quality'],
  },
  {
    id: 'species-conservation-references',
    slug: 'species-conservation-references',
    title: 'Endangered Species Conservation Framework for Kashmir',
    type: 'Scientific Report',
    year: 2024,
    description: 'Scientific assessment and conservation framework for endangered species including Hangul, Markhor, and Kashmir Flycatcher.',
    authors: ['Wildlife Institute of India', 'J&K Wildlife Department'],
    linkedAreas: ['dachigam-national-park', 'overa-aru-wildlife-sanctuary', 'hirpora-wildlife-sanctuary'],
    linkedSpecies: ['hangul', 'markhor', 'kashmir-flycatcher', 'western-tragopan'],
    themes: ['Species Conservation', 'Population Monitoring', 'Habitat Management', 'Threat Mitigation'],
  },
  {
    id: 'protected-area-atlas-context',
    slug: 'protected-area-atlas-context',
    title: 'Kashmir Protected Area Atlas 2024',
    type: 'Atlas',
    year: 2024,
    description: 'Comprehensive GIS-based atlas of all protected areas in Kashmir with spatial data, boundaries, and ecological features.',
    authors: ['J&K Remote Sensing Department', 'ISRO'],
    linkedAreas: ['dachigam-national-park', 'hemis-national-park', 'hokersar-wetland'],
    linkedSpecies: [],
    themes: ['Spatial Planning', 'GIS Mapping', 'Protected Area Boundaries', 'Land Use'],
  },
];

// ============================================================================
// SPECIES INTELLIGENCE DATA (Protected Network Specific)
// ============================================================================

export const speciesProfilesData: SpeciesProfile[] = [
  {
    id: 'hangul',
    slug: 'hangul',
    name: 'Hangul (Kashmir Stag)',
    scientificName: 'Cervus hanglu hanglu',
    conservationStatus: 'CR - Critically Endangered',
    description: 'The Hangul is the state animal of Jammu and Kashmir and one of the most endangered deer species in the world. Endemic to the Kashmir Valley.',
    distribution: 'Restricted to Dachigam NP and surrounding forests in Srinagar and Ganderbal districts',
    ecology: 'Browser and grazer inhabiting temperate forests and alpine meadows. Forms small herds outside rutting season.',
    seasonality: 'Year-round resident; rutting season September-October with dramatic stag displays',
    threats: ['Habitat fragmentation', 'Poaching', 'Predation by feral dogs', 'Disease from livestock', 'Small population size'],
    conservationMeasures: ['Protected area management', 'Anti-poaching patrols', 'Habitat restoration', 'Captive breeding research'],
    protectedAreas: ['dachigam-national-park', 'overa-aru-wildlife-sanctuary'],
  },
  {
    id: 'markhor',
    slug: 'markhor',
    name: 'Markhor',
    scientificName: 'Capra falconeri',
    conservationStatus: 'NT - Near Threatened',
    description: 'The largest wild goat species, known for its spectacular corkscrew horns. Symbol of mountain wilderness.',
    distribution: 'Northern Kashmir mountains in Kupwara and Baramulla districts',
    ecology: 'Browser on steep rocky slopes. Excellent climber. Forms bachelor herds and mixed groups.',
    seasonality: 'Year-round resident; breeding season November-December with spectacular male fights',
    threats: ['Poaching for meat and trophies', 'Habitat degradation', 'Competition with livestock'],
    conservationMeasures: ['Community-based conservation', 'Regulated trophy hunting', 'Habitat protection'],
    protectedAreas: ['hirpora-wildlife-sanctuary'],
  },
  {
    id: 'kashmir-flycatcher',
    slug: 'kashmir-flycatcher',
    name: 'Kashmir Flycatcher',
    scientificName: 'Ficedula subrubra',
    conservationStatus: 'VU - Vulnerable',
    description: 'A rare and little-known flycatcher endemic to the Western Himalayas. Breeds only in Kashmir.',
    distribution: 'Temperate oak forests of Srinagar, Anantnag, and Pulwama districts',
    ecology: 'Insectivorous; forages in forest understory and canopy. Long-distance migrant wintering in southern India.',
    seasonality: 'Summer breeder (April-August); migratory',
    threats: ['Habitat loss', 'Forest degradation', 'Climate change', 'Nest predation'],
    conservationMeasures: ['Habitat protection', 'Nest monitoring', 'Research', 'Migration corridor protection'],
    protectedAreas: ['overa-aru-wildlife-sanctuary', 'dachigam-national-park'],
  },
  {
    id: 'himalayan-monals',
    slug: 'himalayan-monals',
    name: 'Himalayan Monal',
    scientificName: 'Lophophorus impejanus',
    conservationStatus: 'LC - Least Concern',
    description: 'Spectacularly colorful pheasant species. State bird of Himachal Pradesh and iconic mountain bird.',
    distribution: 'Alpine and subalpine zones across Kashmir mountains',
    ecology: 'Omnivorous; feeds on plants, insects, and small animals. Excellent camouflage in alpine meadows.',
    seasonality: 'Year-round resident with altitudinal migration',
    threats: ['Habitat degradation', 'Hunting', 'Livestock grazing', 'Collection for feathers'],
    conservationMeasures: ['Protected areas', 'Community awareness', 'Anti-poaching'],
    protectedAreas: ['dachigam-national-park', 'overa-aru-wildlife-sanctuary', 'gulmarg-wildlife-sanctuary'],
  },
  {
    id: 'wetland-birds',
    slug: 'wetland-birds',
    name: 'Wetland Birds (Assemblage)',
    scientificName: 'Various species',
    conservationStatus: 'Mixed (LC to EN)',
    description: 'Diverse assemblage of resident and migratory waterbirds dependent on Kashmir wetlands.',
    distribution: 'All major wetlands including Hokersar, Shallabugh, Hygam, and Wular',
    ecology: 'Includes ducks, geese, waders, and marsh birds. Critical for aquatic ecosystem health.',
    seasonality: 'Migratory species October-March; residents year-round',
    threats: ['Wetland degradation', 'Pollution', 'Encroachment', 'Disturbance', 'Climate change'],
    conservationMeasures: ['Wetland conservation', 'Ramsar site management', 'Community stewardship', 'Pollution control'],
    protectedAreas: ['hokersar-wetland', 'shallabugh-wetland', 'hygam-wetland'],
  },
];

// ============================================================================
// DATA ACCESS FUNCTIONS FOR NEW ENTITIES
// ============================================================================

export const getCorridors = {
  all: () => corridorsData,
  bySlug: (slug: string) => corridorsData.find(c => c.slug === slug),
  byPriority: (priority: string) => corridorsData.filter(c => c.priority === priority),
  byStatus: (status: string) => corridorsData.filter(c => c.status === status),
};

export const getTrails = {
  all: () => trailsData,
  bySlug: (slug: string) => trailsData.find(t => t.slug === slug),
  byProtectedArea: (pa: string) => trailsData.filter(t => t.protectedArea.toLowerCase().includes(pa.toLowerCase())),
  byType: (type: string) => trailsData.filter(t => t.type === type),
};

export const getThreats = {
  all: () => threatsData,
  bySlug: (slug: string) => threatsData.find(t => t.slug === slug),
  bySeverity: (severity: string) => threatsData.filter(t => t.severity === severity),
  byType: (type: string) => threatsData.filter(t => t.type === type),
};

export const getReports = {
  all: () => reportsData,
  bySlug: (slug: string) => reportsData.find(r => r.slug === slug),
  byType: (type: string) => reportsData.filter(r => r.type === type),
  byLinkedArea: (areaSlug: string) => reportsData.filter(r => r.linkedAreas.includes(areaSlug)),
};

export const getSpeciesProfiles = {
  all: () => speciesProfilesData,
  bySlug: (slug: string) => speciesProfilesData.find(s => s.slug === slug),
  byConservationStatus: (status: string) => speciesProfilesData.filter(s => s.conservationStatus.includes(status)),
};
