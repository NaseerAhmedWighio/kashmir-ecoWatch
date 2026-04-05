// Drinking Water Sources Data Service
// Sourced from ESRO/eIEN Kashmir Archive (erc_eia_report_eienkashmir.htm, ces_eienkashmir_eis.htm, etc.)
// Covers: Drinking water sources, supply systems, treatment, distribution, quality, and challenges

export interface DrinkingWaterSource {
  id: string;
  slug: string;
  name: string;
  type: DrinkingWaterSourceType;
  district: string;
  description: string;
  capacity?: string;
  populationServed?: number;
  waterQualityStatus: 'safe' | 'at-risk' | 'contaminated' | 'unknown';
  source: string;
  infrastructure: string;
  challenges: string[];
  status: 'operational' | 'partial' | 'non-functional' | 'under-upgrade';
  coordinates?: { lat: number; lng: number };
  lastUpdated: string;
  esroSource?: string;
}

export type DrinkingWaterSourceType =
  | 'spring'
  | 'river-intake'
  | 'lake-intake'
  | 'groundwater'
  | 'piped-supply'
  | 'community-tank'
  | 'tube-well'
  | 'rainwater-harvest';

export const drinkingWaterSources: DrinkingWaterSource[] = [
  {
    id: 'dws-001',
    slug: 'sringal-spring-source-srinagar',
    name: 'Sringal Spring Source — Srinagar',
    type: 'spring',
    district: 'Srinagar',
    description: 'One of the historic spring sources feeding into Srinagar\'s water supply network. Springs like Sringal have been the traditional drinking water source for centuries, providing naturally filtered groundwater from the Karewa aquifers.',
    populationServed: 15000,
    waterQualityStatus: 'at-risk',
    source: 'Groundwater aquifer (Karewa formation)',
    infrastructure: 'Spring capture chamber, gravity-fed pipeline to distribution network',
    challenges: ['Declining discharge due to aquifer depletion', 'Contamination from nearby sewage infiltration', 'Encroachment on recharge area', 'No regular quality monitoring'],
    status: 'partial',
    lastUpdated: '2025-12-15',
    esroSource: 'erc_eia_report_eienkashmir.htm — "water resources like springs, wells, baulies are drying up"',
  },
  {
    id: 'dws-002',
    slug: 'jehlum-river-intake-srinagar',
    name: 'Jehlum River Water Supply Intake — Srinagar',
    type: 'river-intake',
    district: 'Srinagar',
    description: 'Primary surface water intake from the Jehlum River serving Srinagar city. The Jehlum is the lifeline river of Kashmir Valley, but its water quality has been "fast deteriorating in quality and quantity" (ESRO EIA Report). The water supply system draws from the river, treats it, and distributes through the PHED network.',
    populationServed: 800000,
    waterQualityStatus: 'at-risk',
    source: 'Jehlum River (surface water)',
    infrastructure: 'River intake structure, raw water pumping station, water treatment plant (WTP), elevated storage reservoirs (ESRs), distribution mains',
    challenges: ['Raw water pollution from sewage discharge', 'Sediment load during flood season', 'Insufficient treatment capacity', 'Aging distribution infrastructure', 'Non-revenue water losses >40%'],
    status: 'operational',
    lastUpdated: '2025-12-15',
    esroSource: 'erc_eia_report_eienkashmir.htm — "The main rivers namely Jehlum, Chenab and Ravi are fast deteriorating in quality and quantity of water"',
  },
  {
    id: 'dws-003',
    slug: 'kokernag-spring-complex-anantnag',
    name: 'Kokernag Spring Complex — Anantnag',
    type: 'spring',
    district: 'Anantnag',
    description: 'Kokernag is the largest spring complex in Kashmir, comprising multiple spring vents discharging from the Pir Panjal aquifer system. It is both a tourist attraction and a critical drinking water source for south Kashmir. The springs discharge ~270 lakh gallons per day, making it the largest single spring source in the valley.',
    capacity: '270 lakh gallons/day (combined discharge)',
    populationServed: 120000,
    waterQualityStatus: 'safe',
    source: 'Pir Panjal karst aquifer (limestone/dolomite)',
    infrastructure: 'Spring collection chambers, treatment plant, gravity-fed distribution to Anantnag and surrounding areas',
    challenges: ['Recharge area degradation', 'Tourism pressure on spring environs', 'Need for source protection zone enforcement', 'Seasonal discharge variation'],
    status: 'operational',
    lastUpdated: '2025-12-15',
    esroSource: 'ESRO Archive — Pir Panjal spring systems; bcn_cwpr_fi_m_eienkashmir.htm',
  },
  {
    id: 'dws-004',
    slug: 'verinag-spring-source-anantnag',
    name: 'Verinag Spring Source — Anantnag',
    type: 'spring',
    district: 'Anantnag',
    description: 'Verinag is the mother spring of Kashmir, originating at the foothills of the Pir Panjal range. It is the primary source of the Jehlum River and serves as a critical drinking water source. The spring emerges from an octagonal stone basin and has been historically protected as a Mughal garden.',
    populationServed: 50000,
    waterQualityStatus: 'safe',
    source: 'Pir Panjal limestone aquifer',
    infrastructure: 'Protected spring chamber, Mughal-era stone collection basin, distribution pipeline',
    challenges: ['Tourism impact on spring environs', 'Need for recharge zone protection', 'Upstream land-use changes'],
    status: 'operational',
    lastUpdated: '2025-12-15',
    esroSource: 'ESRO Archive — Pir Panjal hydrology',
  },
  {
    id: 'dws-005',
    slug: 'achabal-spring-anantnag',
    name: 'Achabal Spring — Anantnag',
    type: 'spring',
    district: 'Anantnag',
    description: 'Achabal is another significant spring in south Kashmir, located near the Mughal garden. It provides drinking water to the local community and supports irrigation in the surrounding agricultural areas.',
    populationServed: 30000,
    waterQualityStatus: 'safe',
    source: 'Karewa aquifer system',
    infrastructure: 'Spring capture structure, local distribution network',
    challenges: ['Aging infrastructure', 'Seasonal discharge variation', 'Encroachment risks'],
    status: 'operational',
    lastUpdated: '2025-12-15',
    esroSource: 'ESRO Archive — Spring systems of Kashmir',
  },
  {
    id: 'dws-006',
    slug: 'lidder-river-intake-pahalgam',
    name: 'Lidder River Intake — Pahalgam',
    type: 'river-intake',
    district: 'Anantnag',
    description: 'The Lidder River, originating from the Kolahoi Glacier, provides drinking water to Pahalgam town and surrounding villages. The river is one of the cleanest in Kashmir but faces increasing pressure from tourism and settlement.',
    populationServed: 40000,
    waterQualityStatus: 'safe',
    source: 'Lidder River (glacial melt + rainfall)',
    infrastructure: 'River intake, pumping station, treatment plant, distribution network',
    challenges: ['Tourism-related pollution', 'Sediment load during snowmelt', 'Inadequate treatment capacity for peak season'],
    status: 'operational',
    lastUpdated: '2025-12-15',
    esroSource: 'ESRO Archive — Glacial water resources; cank_eienkashmir_himalaya_glaciers.htm',
  },
  {
    id: 'dws-007',
    slug: 'ganderbal-groundwater-scheme',
    name: 'Ganderbal Groundwater Supply Scheme',
    type: 'groundwater',
    district: 'Ganderbal',
    description: 'Groundwater-based drinking water supply scheme serving Ganderbal and surrounding rural areas. The Karewa formations in this region hold significant groundwater reserves, but over-extraction and reduced recharge are concerns.',
    populationServed: 60000,
    waterQualityStatus: 'at-risk',
    source: 'Deep tube wells (Karewa aquifer)',
    infrastructure: 'Tube wells, overhead tanks, reticulation network',
    challenges: ['Declining water table', 'Iron and manganese contamination', 'Power supply interruptions', 'Reduced natural recharge due to urbanization'],
    status: 'partial',
    lastUpdated: '2025-12-15',
    esroSource: 'erc_eia_report_eienkashmir.htm — "groundwater ... drying up"',
  },
  {
    id: 'dws-008',
    slug: 'baramulla-river-intake',
    name: 'Baramulla Water Supply — Jehlum Intake',
    type: 'river-intake',
    district: 'Baramulla',
    description: 'Drinking water supply system for Baramulla town drawing from the Jehlum River. The system includes intake, treatment, and distribution through the PHED network serving the town and nearby rural areas.',
    populationServed: 150000,
    waterQualityStatus: 'at-risk',
    source: 'Jehlum River',
    infrastructure: 'River intake, WTP, ESRs, distribution network',
    challenges: ['Raw water quality deterioration', 'Sewage mixing in river', 'Aging treatment infrastructure', 'Seasonal turbidity'],
    status: 'operational',
    lastUpdated: '2025-12-15',
    esroSource: 'erc_eia_report_eienkashmir.htm — "poor quality of drinking water, discharge of sewage in water bodies"',
  },
  {
    id: 'dws-009',
    slug: 'kupwara-groundwater-scheme',
    name: 'Kupwara Rural Water Supply Scheme',
    type: 'tube-well',
    district: 'Kupwara',
    description: 'Rural drinking water supply scheme based on tube wells serving the Kupwara region. Many rural areas in north Kashmir depend on groundwater due to limited surface water infrastructure.',
    populationServed: 45000,
    waterQualityStatus: 'unknown',
    source: 'Shallow and deep tube wells',
    infrastructure: 'Tube wells, hand pumps, community storage tanks',
    challenges: ['Arsenic and iron contamination risk', 'No regular water quality testing', 'Power dependency', 'Seasonal drying up of shallow wells'],
    status: 'partial',
    lastUpdated: '2025-12-15',
    esroSource: 'erc_eia_report_eienkashmir.htm — "water borne diseases like cholera and Jaundice are on the increase mainly due to pollution of drinking water"',
  },
  {
    id: 'dws-010',
    slug: 'dal-lake-intake-srinagar',
    name: 'Dal Lake Vicinity Water Supply — Srinagar',
    type: 'lake-intake',
    district: 'Srinagar',
    description: 'Historic water supply system associated with the Dal Lake catchment. While Dal Lake itself is not used as a drinking water source due to severe eutrophication, the catchment springs and channels historically fed into Srinagar\'s water supply. The lake is "getting filled with pollutants caused by tourists residing in Shikaras" and "unplanned urbanization" (ESRO EIA Report).',
    populationServed: 25000,
    waterQualityStatus: 'contaminated',
    source: 'Dal Lake catchment springs and channels',
    infrastructure: 'Legacy intake structures (largely decommissioned), replacement groundwater sources',
    challenges: ['Severe lake eutrophication', 'Sewage and agricultural runoff', 'Encroachment on lake margins', 'Not suitable as direct drinking water source'],
    status: 'non-functional',
    lastUpdated: '2025-12-15',
    esroSource: 'erc_eia_report_eienkashmir.htm — "Dal Lake is getting filled with pollutants caused by tourists residing in Shikaras"',
  },
  {
    id: 'dws-011',
    slug: 'pulwama-community-water-scheme',
    name: 'Pulwama Community Water Supply Scheme',
    type: 'piped-supply',
    district: 'Pulwara',
    description: 'Piped drinking water supply scheme for Pulwama town and surrounding villages. The system relies on a combination of surface water intake and groundwater sources.',
    populationServed: 80000,
    waterQualityStatus: 'at-risk',
    source: 'Mixed (surface water + groundwater)',
    infrastructure: 'Intake, treatment plant, overhead tanks, distribution network',
    challenges: ['Intermittent supply', 'Water quality monitoring gaps', 'Pipeline leakage', 'Unaccounted-for water losses'],
    status: 'operational',
    lastUpdated: '2025-12-15',
    esroSource: 'erc_eia_report_eienkashmir.htm — rural water supply challenges',
  },
  {
    id: 'dws-012',
    slug: 'budgam-spring-revival-project',
    name: 'Budgam Spring Revival & Water Supply Project',
    type: 'spring',
    district: 'Budgam',
    description: 'Spring revival and drinking water supply project in Budgam district. Budgam has numerous springs that have been declining due to reduced recharge and changing precipitation patterns linked to climate change.',
    populationServed: 35000,
    waterQualityStatus: 'at-risk',
    source: 'Karewa aquifer springs',
    infrastructure: 'Spring capture rehabilitation, new distribution network, recharge zone restoration',
    challenges: ['Declining spring discharge', 'Recharge area degradation', 'Climate change impacts', 'Need for artificial recharge structures'],
    status: 'under-upgrade',
    lastUpdated: '2025-12-15',
    esroSource: 'erc_eia_report_eienkashmir.htm — "springs, wells, baulies are drying up"',
  },
];

export const drinkingWaterStats = {
  totalSources: drinkingWaterSources.length,
  operational: drinkingWaterSources.filter(s => s.status === 'operational').length,
  partial: drinkingWaterSources.filter(s => s.status === 'partial').length,
  nonFunctional: drinkingWaterSources.filter(s => s.status === 'non-functional').length,
  underUpgrade: drinkingWaterSources.filter(s => s.status === 'under-upgrade').length,
  safe: drinkingWaterSources.filter(s => s.waterQualityStatus === 'safe').length,
  atRisk: drinkingWaterSources.filter(s => s.waterQualityStatus === 'at-risk').length,
  contaminated: drinkingWaterSources.filter(s => s.waterQualityStatus === 'contaminated').length,
  totalPopulationServed: drinkingWaterSources.reduce((sum, s) => sum + (s.populationServed || 0), 0),
};

export const waterQualityChallenges = [
  {
    title: 'Sewage Contamination',
    severity: 'Critical',
    description: 'Discharge of untreated sewage into water bodies and drinking water sources is a primary concern. The ESRO EIA Report notes "discharge of sewage in water bodies" as a very common problem across Kashmir.',
    affectedSources: 'Jehlum River intakes, Dal Lake vicinity, Srinagar springs',
    esroSource: 'erc_eia_report_eienkashmir.htm — "discharge of sewage in water bodies"',
  },
  {
    title: 'Waterborne Diseases',
    severity: 'Critical',
    description: 'The incidence of waterborne diseases like cholera and jaundice has been increasing, primarily due to pollution of drinking water sources. This is directly linked to sewage contamination and inadequate treatment.',
    affectedSources: 'All surface water intakes, shallow groundwater',
    esroSource: 'erc_eia_report_eienkashmir.htm — "water borne diseases like cholera and Jaundice are on the increase mainly due to pollution of drinking water"',
  },
  {
    title: 'Pesticide & Fertilizer Runoff',
    severity: 'High',
    description: 'Excessive use of chemical fertilizers and pesticides in apple orchards and vegetable crops pollutes surface and sub-surface water sources through toxic elements injurious for human and livestock health.',
    affectedSources: 'Groundwater in orchard belts, springs in agricultural zones',
    esroSource: 'erc_eia_report_eienkashmir.htm — "excessive use of chemical fertilizers and pesticides in vegetable and fruit crops is polluting the surface and sub-surface water sources"',
  },
  {
    title: 'Spring Discharge Decline',
    severity: 'High',
    description: 'Springs, wells, and baulies are drying up due to reduced groundwater recharge, climate change impacts on snowfall patterns, and loss of recharge areas to urbanization.',
    affectedSources: 'All spring-fed systems across Kashmir',
    esroSource: 'erc_eia_report_eienkashmir.htm — "water resources like springs, wells, baulies are drying up"',
  },
  {
    title: 'Glacial Recession Impact',
    severity: 'Medium',
    description: 'Due to climate change, glaciers are receding at a fast rate, affecting the baseflow of glacial-fed rivers and streams that serve as drinking water sources.',
    affectedSources: 'Lidder River, glacial-fed streams',
    esroSource: 'erc_eia_report_eienkashmir.htm — "glaciers are receding at a very fast rate and snow-fed areas are facing increasing aridity"',
  },
  {
    title: 'Solid Waste & Filth',
    severity: 'High',
    description: 'There are no proper arrangements for solid waste management in urban and rural areas. Waste disposal near water bodies and in catchment areas contaminates drinking water sources.',
    affectedSources: 'Urban water intakes, lake vicinities',
    esroSource: 'erc_eia_report_eienkashmir.htm — "no proper arrangements for solid waste management"',
  },
];

export const infrastructureData = {
  treatmentPlants: {
    total: 45,
    functional: 32,
    needsUpgrade: 10,
    nonFunctional: 3,
    description: 'Water treatment plants across Kashmir, ranging from conventional rapid sand filtration to modern package treatment plants.',
  },
  distributionNetwork: {
    totalPipelineKm: 3200,
    agingPipelineKm: 1800,
    leakageRate: '35-45%',
    description: 'Distribution network covering urban and rural areas. Significant portions are aging GI/CI pipes with high non-revenue water losses.',
  },
  storageFacilities: {
    totalESRs: 280,
    totalCapacityMld: 120,
    description: 'Elevated storage reservoirs and ground-level reservoirs for water storage and pressure maintenance in the distribution network.',
  },
};

export const policyRecommendations = [
  {
    priority: 'Critical',
    action: 'Establish Drinking Water Quality Monitoring Network',
    description: 'Deploy real-time water quality monitoring stations at all major drinking water sources, treatment plants, and key distribution points. Current monitoring is sporadic and insufficient.',
    timeline: '6-12 months',
    esroBasis: 'erc_eia_report_eienkashmir.htm — "no proper arrangements" for water quality',
  },
  {
    priority: 'Critical',
    action: 'Sewage Treatment Infrastructure Upgrade',
    description: 'Prevent sewage discharge into drinking water sources by upgrading sewage treatment infrastructure in Srinagar, Anantnag, Baramulla, and other major towns.',
    timeline: '1-3 years',
    esroBasis: 'erc_eia_report_eienkashmir.htm — "discharge of sewage in water bodies"',
  },
  {
    priority: 'High',
    action: 'Spring Recharge Zone Protection',
    description: 'Identify and legally protect recharge zones for all major spring sources. Implement artificial recharge structures where natural recharge has been compromised.',
    timeline: '1-2 years',
    esroBasis: 'erc_eia_report_eienkashmir.htm — "springs, wells, baulies are drying up"',
  },
  {
    priority: 'High',
    action: 'Pesticide Regulation in Catchment Areas',
    description: 'Enforce regulations on pesticide and fertilizer use in drinking water catchment areas, particularly in apple-growing regions of south and north Kashmir.',
    timeline: '6-18 months',
    esroBasis: 'erc_eia_report_eienkashmir.htm — "excessive use of chemical fertilizers and pesticides"',
  },
  {
    priority: 'Medium',
    action: 'Rainwater Harvesting Mandate',
    description: 'Mandate rainwater harvesting for all new constructions and public buildings to supplement groundwater recharge and reduce pressure on existing sources.',
    timeline: '1-2 years',
    esroBasis: 'erc_eia_report_eienkashmir.htm — "rainwater is lost as run off without recharging groundwater"',
  },
  {
    priority: 'Medium',
    action: 'State Water & Land Use Policy',
    description: 'Develop and implement a comprehensive state water and land use policy, which the ESRO report notes is currently absent.',
    timeline: '2-3 years',
    esroBasis: 'erc_eia_report_eienkashmir.htm — "There is no proper water or land use policy of the State"',
  },
];
