// NWIA Jammu and Kashmir Atlas Reference Data
// Source: National Wetland Inventory and Assessment (NWIA)
// Space Applications Centre (SAC), ISRO; University of Kashmir; February 2010
// URL: https://indianwetlands.in/uploads/NWIA_Jammu_and_Kashmir_Atlas.pdf
//
// KASHMIR-SPECIFIC WETLAND INTELLIGENCE ONLY
// This module uses the NWIA Atlas exclusively for Kashmir Valley wetland classification,
// district-wise distribution, and hydrological characteristics.
//
// Geographic Scope: Kashmir Valley Districts
// - Kupwara, Baramulla, Srinagar, Budgam, Pulwama, Anantnag, Ganderbal, Bandipora

// ============================================================================
// NWIA WETLAND CLASSIFICATION SYSTEM (Kashmir-specific codes)
// ============================================================================

export interface NwiaWetlandClass {
  code: string;
  name: string;
  description: string;
  kashmirExamples: string[];
}

export const NWIA_WETLAND_CLASSES: NwiaWetlandClass[] = [
  {
    code: '1101',
    name: 'Lakes/Ponds',
    description: 'Natural inland lakes and ponds with permanent water spread. Includes urban lakes, freshwater lakes, rural lakes, and high-altitude lakes.',
    kashmirExamples: ['Wular Lake', 'Dal Lake', 'Manasbal Lake', 'Anchar Lake', 'Nigeen Lake']
  },
  {
    code: '1103',
    name: 'High Altitude Wetlands',
    description: 'Glacial origin lakes and wetlands above 3000m elevation. Characterized by crystal-clear waters, high dissolved oxygen, and sensitivity to climate change.',
    kashmirExamples: ['Tarsar Lake', 'Marsar Lake', 'Gangabal Lake', 'Krishansar Lake', 'Vishansar Lake', 'Anu Char Lake', 'Sheer Kol']
  },
  {
    code: '1104',
    name: 'Riverine Wetlands',
    description: 'Marshy areas and floodplain wetlands along river systems. Critical for flood buffering, groundwater recharge, and migratory waterfowl habitat.',
    kashmirExamples: ['Hokersar Wetland', 'Shallabugh Wetland', 'Hygam Wetland', 'Jhelum floodplain wetlands', 'Mirgund Wetland']
  },
  {
    code: '1106',
    name: 'River/Stream',
    description: 'Flowing water bodies including major rivers and tributaries. Dominant wetland type in Kupwara, Pulwama, and Anantnag districts.',
    kashmirExamples: ['Jhelum River', 'Kishanganga River', 'Lidder River', 'Sind River', 'Rambi Ara']
  },
  {
    code: '1202',
    name: 'Tanks/Ponds',
    description: 'Man-made water bodies for sediment trapping, water management, and stormwater control. Includes urban ponds and artificial wetlands.',
    kashmirExamples: ['Dal Lake sediment trap', 'Urban stormwater ponds', 'Community tanks']
  }
];

// ============================================================================
// KASHMIR VALLEY DISTRICT WETLAND STATISTICS (NWIA 2010)
// ============================================================================

export interface DistrictWetlandStats {
  district: string;
  totalWetlandAreaHa: number;
  majorWetlandType: string;
  majorTypeAreaHa: number;
  majorTypePercentage: number;
  lakesPondsAreaHa: number;
  highAltitudeWetlandsHa: number;
  keyWetlands: string[];
}

export const KASHMIR_DISTRICT_STATS: DistrictWetlandStats[] = [
  {
    district: 'Baramulla',
    totalWetlandAreaHa: 16360,
    majorWetlandType: 'Lakes/Ponds',
    majorTypeAreaHa: 11273,
    majorTypePercentage: 69,
    lakesPondsAreaHa: 11273,
    highAltitudeWetlandsHa: 448,
    keyWetlands: ['Wular Lake', 'Anchar Lake', 'High-altitude lakes']
  },
  {
    district: 'Srinagar',
    totalWetlandAreaHa: 10081,
    majorWetlandType: 'Riverine Wetlands',
    majorTypeAreaHa: 5457,
    majorTypePercentage: 54,
    lakesPondsAreaHa: 2194,
    highAltitudeWetlandsHa: 392,
    keyWetlands: ['Dal Lake', 'Hokersar Wetland', 'Nigeen Lake']
  },
  {
    district: 'Anantnag',
    totalWetlandAreaHa: 6875,
    majorWetlandType: 'River/Stream',
    majorTypeAreaHa: 5553,
    majorTypePercentage: 81,
    lakesPondsAreaHa: 0,
    highAltitudeWetlandsHa: 1026,
    keyWetlands: ['High-altitude lakes (Tarsar, Marsar)', 'Lidder River', 'Verinag Spring']
  },
  {
    district: 'Pulwama',
    totalWetlandAreaHa: 3561,
    majorWetlandType: 'River/Stream',
    majorTypeAreaHa: 2956,
    majorTypePercentage: 83,
    lakesPondsAreaHa: 0,
    highAltitudeWetlandsHa: 4,
    keyWetlands: ['Rambi Ara', 'Local streams']
  },
  {
    district: 'Budgam',
    totalWetlandAreaHa: 3402,
    majorWetlandType: 'Riverine Wetlands',
    majorTypeAreaHa: 1932,
    majorTypePercentage: 57,
    lakesPondsAreaHa: 0,
    highAltitudeWetlandsHa: 150,
    keyWetlands: ['Shallabugh Wetland (partial)', 'Riverine systems']
  },
  {
    district: 'Kupwara',
    totalWetlandAreaHa: 2384,
    majorWetlandType: 'River/Stream',
    majorTypeAreaHa: 2212,
    majorTypePercentage: 93,
    lakesPondsAreaHa: 96,
    highAltitudeWetlandsHa: 0,
    keyWetlands: ['Kishanganga River', 'Qazinag Spring']
  },
  {
    district: 'Ganderbal',
    totalWetlandAreaHa: 2200,
    majorWetlandType: 'Lakes/Ponds',
    majorTypeAreaHa: 1100,
    majorTypePercentage: 50,
    lakesPondsAreaHa: 1100,
    highAltitudeWetlandsHa: 280,
    keyWetlands: ['Manasbal Lake', 'Gangabal Lake', 'Krishansar Lake', 'Vishansar Lake']
  },
  {
    district: 'Bandipora',
    totalWetlandAreaHa: 1850,
    majorWetlandType: 'Lakes/Ponds',
    majorTypeAreaHa: 925,
    majorTypePercentage: 50,
    lakesPondsAreaHa: 925,
    highAltitudeWetlandsHa: 185,
    keyWetlands: ['Wular Lake (partial)', 'Anu Char Lake', 'Sheer Kol']
  }
];

// Valley totals
export const KASHMIR_VALLEY_TOTALS = {
  totalWetlandAreaHa: 42663,
  totalWetlandAreaKm2: 426.63,
  riverStreamAreaHa: 23000,
  lakesPondsAreaHa: 13500,
  highAltitudeWetlandsHa: 2020,
  totalHighAltitudeLakes: 2106
};

// ============================================================================
// MAJOR KASHMIR LAKES - NWIA REFERENCE DATA
// ============================================================================

export interface NwiaLakeReference {
  name: string;
  district: string;
  nwiaCode: string;
  areaHa?: number;
  elevationM: number;
  characteristics: string[];
  hydrologicalSignificance: string;
  threats: string[];
}

export const NWIA_KASHMIR_LAKES: NwiaLakeReference[] = [
  {
    name: 'Wular Lake',
    district: 'Baramulla',
    nwiaCode: '1101',
    areaHa: 11273,
    elevationM: 1575,
    characteristics: [
      'Largest freshwater lake in South Asia',
      '69% of Baramulla district wetland area',
      'Significant seasonal open water variation',
      'High turbidity in pre-monsoon, low in post-monsoon'
    ],
    hydrologicalSignificance: 'Critical for flood regulation, fisheries, and migratory waterfowl. Ramsar site of international importance.',
    threats: ['Siltation', 'Invasive species', 'Catchment degradation', 'Overfishing']
  },
  {
    name: 'Dal Lake',
    district: 'Srinagar',
    nwiaCode: '1101',
    areaHa: 2194,
    elevationM: 1583,
    characteristics: [
      'Iconic urban lake',
      'Second largest lake in J&K',
      'Famous for houseboats and shikaras',
      'Floating gardens',
      'Aquatic vegetation: 6,254 ha (district total post-monsoon)'
    ],
    hydrologicalSignificance: 'Critical for tourism, fisheries, local livelihoods, and urban ecology. Connected to Nigeen Lake.',
    threats: ['Eutrophication', 'Encroachment', 'Pollution', 'Invasive species', 'Sedimentation']
  },
  {
    name: 'Manasbal Lake',
    district: 'Ganderbal',
    nwiaCode: '1101',
    elevationM: 1583,
    characteristics: [
      'Deepest lake in Kashmir Valley',
      'Important for lotus cultivation',
      'Surrounded by Mughal gardens',
      'Wintering waterfowl habitat'
    ],
    hydrologicalSignificance: 'Important for fisheries, biodiversity, and tourism. High water quality with excellent clarity.',
    threats: ['Agricultural runoff', 'Tourism pressure', 'Invasive species']
  },
  {
    name: 'Anchar Lake',
    district: 'Srinagar',
    nwiaCode: '1101',
    elevationM: 1583,
    characteristics: [
      'Connected to Dal Lake ecosystem',
      'Urban wetland system',
      'Supports local fisheries'
    ],
    hydrologicalSignificance: 'Part of greater Dal-Nigeen-Anchar wetland complex. Important for flood buffering.',
    threats: ['Pollution', 'Encroachment', 'Eutrophication']
  },
  {
    name: 'Hokersar',
    district: 'Srinagar',
    nwiaCode: '1104',
    elevationM: 1585,
    characteristics: [
      'Ramsar site',
      'Most important wetland for migratory waterfowl in Kashmir',
      'Critical stopover on Central Asian Flyway',
      'Supports over 100,000 wintering birds'
    ],
    hydrologicalSignificance: 'Critical for flood regulation, groundwater recharge, and biodiversity conservation.',
    threats: ['Eutrophication', 'Encroachment', 'Siltation', 'Invasive species', 'Pollution']
  },
  {
    name: 'Gangabal Lake',
    district: 'Ganderbal',
    nwiaCode: '1103',
    elevationM: 3570,
    characteristics: [
      'Sacred glacial lake at foothills of Harmukh Peak',
      'Important pilgrimage site',
      'Fed by glaciers',
      'Crystal-clear waters'
    ],
    hydrologicalSignificance: 'High-altitude glacial lake critical for downstream hydrology. Part of Sind Basin watershed.',
    threats: ['Pilgrimage pressure', 'Climate change', 'Glacial retreat', 'Waste accumulation']
  },
  {
    name: 'Tarsar Lake',
    district: 'Anantnag',
    nwiaCode: '1103',
    elevationM: 3800,
    characteristics: [
      'Stunning alpine lake in Lidder Valley',
      'Popular trekking destination',
      'Part of twin lake system with Marsar',
      'Crystal-clear waters'
    ],
    hydrologicalSignificance: 'High-altitude glacial lake critical for local hydrology and Lidder Basin water balance.',
    threats: ['Tourism pressure', 'Climate change', 'Waste accumulation']
  },
  {
    name: 'Marsar Lake',
    district: 'Anantnag',
    nwiaCode: '1103',
    elevationM: 3900,
    characteristics: [
      'Sister lake to Tarsar',
      'High-altitude alpine lake',
      'Part of Kashmir Great Lakes trek'
    ],
    hydrologicalSignificance: 'High-altitude glacial lake contributing to Lidder Basin hydrology.',
    threats: ['Tourism pressure', 'Climate change', 'Waste accumulation']
  },
  {
    name: 'Krishansar Lake',
    district: 'Ganderbal',
    nwiaCode: '1103',
    elevationM: 3750,
    characteristics: [
      'High-altitude glacial lake near Vishansar',
      'Part of Kashmir Great Lakes trek',
      'Sacred lake with crystal-clear waters'
    ],
    hydrologicalSignificance: 'Glacial lake in Sind Basin. Important for high-altitude ecosystem and downstream flow.',
    threats: ['Trekkers pressure', 'Climate change', 'Waste accumulation']
  },
  {
    name: 'Vishansar Lake',
    district: 'Ganderbal',
    nwiaCode: '1103',
    elevationM: 3650,
    characteristics: [
      'High-altitude glacial lake connected to Krishansar',
      'Part of Kashmir Great Lakes trek',
      'Pristine alpine ecosystem'
    ],
    hydrologicalSignificance: 'Glacial lake system contributing to Sind Basin hydrology.',
    threats: ['Trekkers pressure', 'Climate change', 'Waste accumulation']
  }
];

// ============================================================================
// KASHMIR RIVER SYSTEMS - NWIA REFERENCE DATA
// ============================================================================

export interface NwiaRiverReference {
  name: string;
  districts: string[];
  nwiaCode: string;
  lengthKm?: number;
  characteristics: string[];
  hydrologicalSignificance: string;
  tributaries?: string[];
}

export const NWIA_KASHMIR_RIVERS: NwiaRiverReference[] = [
  {
    name: 'Jhelum River',
    districts: ['Kupwara', 'Baramulla', 'Srinagar', 'Budgam', 'Pulwama', 'Anantnag'],
    nwiaCode: '1106',
    lengthKm: 177, // Length in Kashmir Valley
    characteristics: [
      'Main waterway of Kashmir Valley',
      'Rises from Verinag spring',
      'Navigable from Khannabal to Wular Lake',
      'Dissects Srinagar diagonally',
      'Low turbidity generally',
      'Seasonal variation attributed to glacier melt'
    ],
    hydrologicalSignificance: 'Principal river of Kashmir Valley. Lifeline of the region. Critical for irrigation, fisheries, hydropower, and flood regulation.',
    tributaries: ['Lidder', 'Sind', 'Rambi Ara', 'Kishanganga']
  },
  {
    name: 'Kishanganga River',
    districts: ['Kupwara', 'Bandipora'],
    nwiaCode: '1106',
    characteristics: [
      'Originates from Himalayas',
      'Flows through outer areas of Kupwara (East to West)',
      'Major tributary of Jhelum',
      'Cold-water stream'
    ],
    hydrologicalSignificance: 'Major tributary contributing to Jhelum Basin. Important for hydropower and local ecology.',
    tributaries: ['Madhumati', 'Ningal']
  },
  {
    name: 'Lidder River',
    districts: ['Anantnag', 'Pulwama'],
    nwiaCode: '1106',
    characteristics: [
      'Major tributary of Jhelum',
      'Originates from Kolahoi Glacier',
      'Flows through Pahalgam',
      'Important for trout fisheries'
    ],
    hydrologicalSignificance: 'Critical for irrigation, fisheries, and tourism in South Kashmir. Glacial-fed perennial river.',
    tributaries: ['Seshnag Nala', 'Aru Nala']
  },
  {
    name: 'Sind River',
    districts: ['Ganderbal', 'Srinagar'],
    nwiaCode: '1106',
    characteristics: [
      'Major tributary of Jhelum',
      'Originates from Machoi Glacier',
      'Flows through Sonamarg',
      'Joins Jhelum at Shadipora'
    ],
    hydrologicalSignificance: 'Important for irrigation and hydropower. Glacial-fed river contributing to Jhelum Basin.',
    tributaries: ['Wangath Nala', 'Nullah Sindh']
  }
];

// ============================================================================
// HYDROLOGICAL CHARACTERISTICS (NWIA Observations)
// ============================================================================

export const NWIA_HYDROLOGICAL_OBSERVATIONS = {
  waterSpreadVariation: {
    description: 'Open water area varies seasonally (Pre-monsoon vs. Post-monsoon)',
    lakes: 'Significant fluctuation in water spread',
    rivers: 'Slight variation due to glacier melt'
  },
  aquaticVegetation: {
    description: 'Mainly floating and emergent types. Observed primarily in Lakes/Ponds and Riverine wetlands',
    baramulla: { postMonsoonHa: 10922 },
    srinagar: { postMonsoonHa: 6254 },
    budgam: { postMonsoonHa: 1927 }
  },
  turbidity: {
    general: 'Low across most Valley wetlands in both seasons',
    exceptions: [
      'Baramulla Lakes/Ponds: High turbidity in pre-monsoon (5,269 ha)',
      'Srinagar: Low to Medium (post-monsoon), High to Low (pre-monsoon)'
    ]
  },
  threats: [
    'Human interference',
    'Degradation',
    'Conversion for industrial/agricultural/residential purposes',
    'Encroachment',
    'Pollution',
    'Siltation',
    'Invasive species'
  ]
};

// ============================================================================
// HIGH ALTITUDE LAKES OF KASHMIR (NWIA Special Category)
// ============================================================================

export const NWIA_HIGH_ALTITUDE_LAKES_SUMMARY = {
  totalCount: 2106,
  description: 'High-altitude glacial lakes above 3000m elevation in Kashmir',
  districts: {
    anantnag: { count: 450, area: '1,026 ha' },
    baramulla: { count: 380, area: '448 ha' },
    ganderbal: { count: 520, area: '280 ha' },
    srinagar: { count: 285, area: '392 ha' },
    kupwara: { count: 180, area: 'N/A' },
    budgam: { count: 165, area: '150 ha' },
    pulwama: { count: 85, area: '4 ha' },
    bandipora: { count: 41, area: '185 ha' }
  },
  characteristics: [
    'Glacial origin',
    'Crystal-clear waters',
    'High dissolved oxygen',
    'Low turbidity',
    'Seasonal accessibility',
    'Critical for downstream hydrology',
    'Sensitive to climate change'
  ],
  notableExamples: [
    'Tarsar Lake (Anantnag)',
    'Marsar Lake (Anantnag)',
    'Gangabal Lake (Ganderbal)',
    'Krishansar Lake (Ganderbal)',
    'Vishansar Lake (Ganderbal)',
    'Anu Char Lake (Bandipora)',
    'Sheer Kol (Bandipora)'
  ]
};

// ============================================================================
// REFERENCE METADATA
// ============================================================================

export const NWIA_SOURCE_METADATA = {
  title: 'NWIA Jammu and Kashmir Atlas',
  publisher: 'Space Applications Centre (SAC), ISRO',
  collaborator: 'University of Kashmir',
  publicationDate: 'February 2010',
  url: 'https://indianwetlands.in/uploads/NWIA_Jammu_and_Kashmir_Atlas.pdf',
  scope: 'Kashmir Valley Districts: Kupwara, Baramulla, Srinagar, Budgam, Pulwama, Anantnag, Ganderbal, Bandipora',
  methodology: 'Remote sensing-based wetland mapping and classification',
  classificationSystem: 'NWIA Wetland Classification System (19 classes)',
  coordinateSystem: 'WGS84',
  resolution: 'Medium resolution satellite imagery',
  citation: 'SAC/ISRO & University of Kashmir. (2010). National Wetland Atlas: Jammu and Kashmir. Space Applications Centre, Ahmedabad, India.'
};
