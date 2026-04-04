// Monitoring Intelligence Registry
// Comprehensive monitoring network data for Kashmir EcoWatch

export type MonitoringStatus = 'active-network' | 'periodic-monitoring' | 'seasonal-coverage' | 'under-expansion' | 'reference-monitoring';
export type MonitoringCadence = 'live' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'seasonal' | 'event-driven';
export type MonitoringSource = 'institutional' | 'field-based' | 'community-supported' | 'satellite-derived' | 'hybrid';
export type MonitoringCategory = 'air-quality' | 'water-quality' | 'seismic' | 'weather' | 'wildlife' | 'glacier';

export interface ModuleLink {
  moduleId: string;
  moduleName: string;
  modulePath: string;
  contributionType: string; // e.g., "Primary data source", "Alert generation", "Trend analysis"
}

export interface DashboardLink {
  name: string;
  path: string;
  description: string;
}

export interface AlertLink {
  type: string;
  description: string;
  severity: 'low' | 'moderate' | 'high' | 'critical';
}

export interface MonitoringNetwork {
  id: string;
  category: MonitoringCategory;
  name: string;
  
  // Status & Mode
  status: MonitoringStatus;
  cadence: MonitoringCadence;
  source: MonitoringSource;
  
  // Infrastructure
  stationCount: number;
  coverage: string;
  coverageDetails: {
    districts?: string[];
    basins?: string[];
    protectedAreas?: string[];
    altitudeRange?: string;
    urbanCoverage?: string;
  };
  
  // Monitoring Scope
  parametersTracked: string[];
  whatIsMonitored: string;
  
  // Module & Dashboard Links
  feedsModules: ModuleLink[];
  feedsDashboards: DashboardLink[];
  generatesAlerts: AlertLink[];
  
  // Data & Quality
  dataAvailability: 'live-stream' | 'near-real-time' | 'daily-batch' | 'periodic-updates' | 'reference-archive';
  historicalDataFrom: string; // year
  qualityAssurance: string;
  
  // Operator & Source
  operatedBy: string;
  description: string;
  
  // Limitations
  limitations?: string;
  
  // Metadata
  lastUpdated: string;
  tags: string[];
}

export const monitoringRegistry: MonitoringNetwork[] = [
  {
    id: 'monitor-air-quality',
    category: 'air-quality',
    name: 'Air Quality Monitoring',
    status: 'active-network',
    cadence: 'hourly',
    source: 'institutional',
    stationCount: 12,
    coverage: 'Urban & Valley-wide',
    coverageDetails: {
      districts: ['Srinagar', 'Anantnag', 'Baramulla', 'Ganderbal'],
      urbanCoverage: 'Major urban centers and sensitive ecological zones'
    },
    parametersTracked: ['PM2.5', 'PM10', 'NO2', 'SO2', 'CO', 'O3', 'AQI'],
    whatIsMonitored: 'Atmospheric particulate matter, gaseous pollutants, and composite Air Quality Index across urban centers and ecologically sensitive zones.',
    feedsModules: [
      { moduleId: 'air-noise-monitoring', moduleName: 'Air & Noise Monitoring', modulePath: '/risk-monitoring', contributionType: 'Primary data source' },
      { moduleId: 'risk-monitoring', moduleName: 'Risk & Monitoring', modulePath: '/risk-monitoring', contributionType: 'Alert generation' },
    ],
    feedsDashboards: [
      { name: 'Air Quality Dashboard', path: '/dashboards/air-quality', description: 'Real-time AQI and pollutant trends' },
    ],
    generatesAlerts: [
      { type: 'Air Quality Alert', description: 'Triggered when AQI exceeds upper-moderate threshold', severity: 'moderate' },
    ],
    dataAvailability: 'near-real-time',
    historicalDataFrom: '2020',
    qualityAssurance: 'CPCB-standard calibration with quarterly maintenance',
    operatedBy: 'J&K State Pollution Control Board',
    description: 'Network of continuous ambient air quality monitoring stations (CAAQMS) tracking particulate matter and gaseous pollutants across Kashmir Valley.',
    limitations: 'Limited coverage in higher-altitude towns. Winter snow can delay maintenance access to some stations.',
    lastUpdated: '2026-04-04',
    tags: ['air-quality', 'pollution', 'urban', 'health', 'AQI', 'CAAQMS']
  },
  {
    id: 'monitor-water-quality',
    category: 'water-quality',
    name: 'Water Quality Network',
    status: 'active-network',
    cadence: 'daily',
    source: 'hybrid',
    stationCount: 34,
    coverage: 'All Major Basins',
    coverageDetails: {
      basins: ['Jhelum', 'Indus', 'Chenab'],
      districts: ['Srinagar', 'Anantnag', 'Ganderbal', 'Baramulla', 'Kulgam'],
    },
    parametersTracked: ['pH', 'DO', 'BOD', 'COD', 'Turbidity', 'Temperature', 'Nitrates', 'Phosphates', 'Heavy Metals'],
    whatIsMonitored: 'Physicochemical parameters, nutrient loading, and contamination indicators across major waterbodies, rivers, and wetland systems.',
    feedsModules: [
      { moduleId: 'water-systems', moduleName: 'Water Systems', modulePath: '/water-systems', contributionType: 'Primary water quality data' },
      { moduleId: 'environmental-monitoring', moduleName: 'Environmental Monitoring', modulePath: '/environmental-monitoring', contributionType: 'Basin-level trends' },
    ],
    feedsDashboards: [
      { name: 'Water Quality Dashboard', path: '/dashboards/water-quality', description: 'Waterbody health indicators and parameter trends' },
    ],
    generatesAlerts: [
      { type: 'Water Quality Alert', description: 'Triggered by sudden parameter shifts or contamination events', severity: 'high' },
    ],
    dataAvailability: 'daily-batch',
    historicalDataFrom: '2018',
    qualityAssurance: 'Standard methods (APHA) with inter-laboratory validation',
    operatedBy: 'J&K Pollution Control Board / University of Kashmir Limnology Lab',
    description: 'Comprehensive water quality monitoring network covering lakes, wetlands, rivers, and spring systems across Kashmir\'s major drainage basins.',
    limitations: 'Some remote wetland sites sampled periodically rather than continuously. Winter ice cover affects sampling frequency.',
    lastUpdated: '2026-04-03',
    tags: ['water-quality', 'lakes', 'wetlands', 'rivers', 'springs', 'basin-monitoring']
  },
  {
    id: 'monitor-seismic',
    category: 'seismic',
    name: 'Seismic Monitoring',
    status: 'active-network',
    cadence: 'live',
    source: 'institutional',
    stationCount: 8,
    coverage: 'Statewide (Seismic Zones IV-V)',
    coverageDetails: {
      districts: ['Srinagar', 'Anantnag', 'Baramulla', 'Ganderbal', 'Kupwara', 'Doda', 'Kishtwar'],
    },
    parametersTracked: ['Magnitude', 'Depth', 'Epicenter Location', 'Peak Ground Acceleration', 'Seismic Intensity'],
    whatIsMonitored: 'Seismic activity, earthquake events, and ground motion indicators across high-risk Himalayan seismic zones.',
    feedsModules: [
      { moduleId: 'risk-monitoring', moduleName: 'Risk & Monitoring', modulePath: '/risk-monitoring', contributionType: 'Seismic risk assessment' },
      { moduleId: 'districts', moduleName: 'District Profiles', modulePath: '/districts', contributionType: 'Seismic hazard mapping' },
    ],
    feedsDashboards: [
      { name: 'Seismic Activity Dashboard', path: '/dashboards/seismic', description: 'Recent earthquakes and seismic hazard maps' },
    ],
    generatesAlerts: [
      { type: 'Seismic Event Alert', description: 'Triggered by earthquakes above magnitude threshold', severity: 'critical' },
    ],
    dataAvailability: 'live-stream',
    historicalDataFrom: '2015',
    qualityAssurance: 'National Seismological Network standards with IMD validation',
    operatedBy: 'India Meteorological Department / National Center for Seismology',
    description: 'Seismic station network monitoring earthquake activity across Kashmir\'s high-risk Himalayan terrain, providing real-time event detection.',
    limitations: 'Sparse station density in remote high-altitude zones. Detection threshold varies by region.',
    lastUpdated: '2026-04-04',
    tags: ['seismic', 'earthquake', 'hazard', 'risk', 'Himalaya', 'tectonic']
  },
  {
    id: 'monitor-weather',
    category: 'weather',
    name: 'Weather Stations',
    status: 'active-network',
    cadence: 'hourly',
    source: 'institutional',
    stationCount: 47,
    coverage: 'All Districts (Multiple Altitudes)',
    coverageDetails: {
      districts: ['All 10 districts'],
      altitudeRange: '200m (plains) to 4,000m+ (high-altitude stations)',
    },
    parametersTracked: ['Temperature', 'Precipitation', 'Humidity', 'Wind Speed/Direction', 'Atmospheric Pressure', 'Solar Radiation', 'Snowfall'],
    whatIsMonitored: 'Surface meteorological conditions across altitudinal gradients, supporting weather forecasting, climate analysis, and hazard preparedness.',
    feedsModules: [
      { moduleId: 'risk-monitoring', moduleName: 'Risk & Monitoring', modulePath: '/risk-monitoring', contributionType: 'Weather-based hazard forecasting' },
      { moduleId: 'districts', moduleName: 'District Profiles', modulePath: '/districts', contributionType: 'District-level climate data' },
      { moduleId: 'environmental-monitoring', moduleName: 'Environmental Monitoring', modulePath: '/environmental-monitoring', contributionType: 'Climate trend analysis' },
    ],
    feedsDashboards: [
      { name: 'Weather Dashboard', path: '/dashboards/weather', description: 'Current conditions and forecasts' },
      { name: 'Climate Trends', path: '/dashboards/climate', description: 'Long-term temperature and precipitation patterns' },
    ],
    generatesAlerts: [
      { type: 'Weather Advisory', description: 'Heatwave, cold wave, or extreme precipitation warnings', severity: 'moderate' },
      { type: 'Flood Advisory', description: 'Based on rainfall intensity and river level correlation', severity: 'high' },
    ],
    dataAvailability: 'near-real-time',
    historicalDataFrom: '2010',
    qualityAssurance: 'IMD-standard instrumentation with regular calibration',
    operatedBy: 'India Meteorological Department / J&K Meteorological Department',
    description: 'Dense network of automatic and manual weather stations providing meteorological observations across Kashmir\'s varied topography.',
    limitations: 'High-altitude stations subject to winter inaccessibility. Some manual stations report with delay.',
    lastUpdated: '2026-04-04',
    tags: ['weather', 'meteorology', 'climate', 'forecasting', 'stations', 'IMD']
  },
  {
    id: 'monitor-wildlife',
    category: 'wildlife',
    name: 'Wildlife Camera Traps',
    status: 'periodic-monitoring',
    cadence: 'seasonal',
    source: 'field-based',
    stationCount: 156,
    coverage: 'Protected Areas & Critical Corridors',
    coverageDetails: {
      protectedAreas: ['Dachigam NP', 'Overa-Aru WLS', 'Hirpora WLS', 'Gulmarg WLS', 'Kishtwar NP'],
    },
    parametersTracked: ['Species Presence/Absence', 'Relative Abundance', 'Activity Patterns', 'Human-Wildlife Conflict Events', 'Habitat Use'],
    whatIsMonitored: 'Terrestrial wildlife activity, species distribution, and human-wildlife interaction indicators across protected areas and ecological corridors.',
    feedsModules: [
      { moduleId: 'biodiversity', moduleName: 'Biodiversity', modulePath: '/biodiversity', contributionType: 'Species detection and monitoring' },
      { moduleId: 'protected-areas', moduleName: 'Protected Areas', modulePath: '/protected-network', contributionType: 'PA-level biodiversity tracking' },
    ],
    feedsDashboards: [
      { name: 'Species Intelligence Dashboard', path: '/dashboards/species', description: 'Species detection trends and distribution maps' },
    ],
    generatesAlerts: [
      { type: 'Human-Wildlife Conflict Alert', description: 'Triggered by conflict event reports near settlements', severity: 'high' },
      { type: 'Endangered Species Sighting', description: 'Rare species detection flagged for verification', severity: 'low' },
    ],
    dataAvailability: 'periodic-updates',
    historicalDataFrom: '2019',
    qualityAssurance: 'Systematic deployment protocol with expert species identification review',
    operatedBy: 'J&K Wildlife Department / Research Partners',
    description: 'Camera trap network deployed across protected areas and wildlife corridors for species monitoring and conflict tracking.',
    limitations: 'Seasonal deployment cycles. Data retrieval delayed during heavy snow. Species identification requires expert review.',
    lastUpdated: '2026-04-01',
    tags: ['wildlife', 'camera-trap', 'species', 'protected-areas', 'biodiversity', 'conflict']
  },
  {
    id: 'monitor-glacier',
    category: 'glacier',
    name: 'Glacier Monitoring',
    status: 'seasonal-coverage',
    cadence: 'seasonal',
    source: 'hybrid',
    stationCount: 6,
    coverage: 'High-Altitude Cryosphere Zones',
    coverageDetails: {
      altitudeRange: '3,500m to 5,500m',
      protectedAreas: ['Kolahoi Glacier Zone', 'Machoi Glacier Zone', 'Haramukh Region'],
    },
    parametersTracked: ['Glacier Mass Balance', 'Snow Line Elevation', 'Meltwater Discharge', 'Glacial Lake Extent', 'Equilibrium Line Altitude'],
    whatIsMonitored: 'Glacier health indicators, mass balance, and cryosphere changes across major Kashmir glaciers.',
    feedsModules: [
      { moduleId: 'water-systems', moduleName: 'Water Systems', modulePath: '/water-systems', contributionType: 'Upstream water source monitoring' },
      { moduleId: 'risk-monitoring', moduleName: 'Risk & Monitoring', modulePath: '/risk-monitoring', contributionType: 'GLOF risk assessment' },
    ],
    feedsDashboards: [
      { name: 'Cryosphere Dashboard', path: '/dashboards/cryosphere', description: 'Glacier health and snow cover trends' },
    ],
    generatesAlerts: [
      { type: 'GLOF Risk Alert', description: 'Glacial lake outburst flood risk from expanding proglacial lakes', severity: 'critical' },
    ],
    dataAvailability: 'periodic-updates',
    historicalDataFrom: '2016',
    qualityAssurance: 'Field surveys combined with satellite remote sensing validation',
    operatedBy: 'University of Kashmir / Wadia Institute of Himalayan Geology',
    description: 'High-altitude glacier monitoring combining field observations with satellite-derived glacier change analysis.',
    limitations: 'Extreme altitude limits field access. Most observations seasonal (summer only). Remote sensing data gap during cloud cover.',
    lastUpdated: '2026-03-28',
    tags: ['glacier', 'cryosphere', 'mass-balance', 'GLOF', 'high-altitude', 'climate-impact']
  },
];

// Computed properties
export const getActiveNetworks = () => monitoringRegistry.filter(n => n.status === 'active-network');
export const getNetworksFeedingAlerts = () => monitoringRegistry.filter(n => n.generatesAlerts.length > 0);
export const getNetworksFeedingDashboards = () => monitoringRegistry.filter(n => n.feedsDashboards.length > 0);
export const getNetworkByCategory = (category: MonitoringCategory) => monitoringRegistry.filter(n => n.category === category);
export const getNetworkById = (id: string) => monitoringRegistry.find(n => n.id === id);

export const getMonitoringStats = () => ({
  activeNetworks: getActiveNetworks().length,
  totalStations: monitoringRegistry.reduce((sum, n) => sum + n.stationCount, 0),
  districtCoverage: new Set(monitoringRegistry.flatMap(n => n.coverageDetails.districts || [])).size,
  alertLinkedNetworks: getNetworksFeedingAlerts().length,
  dashboardLinkedNetworks: getNetworksFeedingDashboards().length,
});

export const statusDisplayLabels: Record<MonitoringStatus, string> = {
  'active-network': 'Active Network',
  'periodic-monitoring': 'Periodic Monitoring',
  'seasonal-coverage': 'Seasonal Coverage',
  'under-expansion': 'Under Expansion',
  'reference-monitoring': 'Reference Monitoring',
};

export const statusColors: Record<MonitoringStatus, string> = {
  'active-network': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  'periodic-monitoring': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'seasonal-coverage': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  'under-expansion': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  'reference-monitoring': 'bg-slate-500/20 text-slate-400 border-slate-500/30',
};

export const categoryLabels: Record<MonitoringCategory, string> = {
  'air-quality': 'Air Quality',
  'water-quality': 'Water Quality',
  'seismic': 'Seismic',
  'weather': 'Weather',
  'wildlife': 'Wildlife',
  'glacier': 'Glacier / Cryosphere',
};

export const categoryGradients: Record<MonitoringCategory, string> = {
  'air-quality': 'from-purple-500 to-pink-500',
  'water-quality': 'from-blue-500 to-cyan-500',
  'seismic': 'from-orange-500 to-red-500',
  'weather': 'from-sky-500 to-blue-500',
  'wildlife': 'from-emerald-500 to-green-500',
  'glacier': 'from-slate-400 to-blue-400',
};

export const cadenceLabels: Record<MonitoringCadence, string> = {
  live: 'Live Stream',
  hourly: 'Hourly Updates',
  daily: 'Daily Batch',
  weekly: 'Weekly Updates',
  monthly: 'Monthly Reports',
  seasonal: 'Seasonal Campaigns',
  'event-driven': 'Event-Triggered',
};

export const sourceLabels: Record<MonitoringSource, string> = {
  institutional: 'Institutional Network',
  'field-based': 'Field-Based Monitoring',
  'community-supported': 'Community-Supported',
  'satellite-derived': 'Satellite-Derived Data',
  hybrid: 'Hybrid (Institutional + Field)',
};

export const dataAvailabilityLabels: Record<MonitoringNetwork['dataAvailability'], string> = {
  'live-stream': 'Live Data Stream',
  'near-real-time': 'Near Real-Time',
  'daily-batch': 'Daily Batch Updates',
  'periodic-updates': 'Periodic Updates',
  'reference-archive': 'Reference Archive',
};
