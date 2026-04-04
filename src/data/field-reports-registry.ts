// Field Intelligence Reports Registry
// Comprehensive field reports, surveys, technical assessments, and monitoring bulletins

import { FieldReport, ReportStatus, ReportType } from '@/types';

export const fieldReportsRegistry: FieldReport[] = [
  // 2026 Reports (Current Active)
  {
    id: 'fr-2026-001',
    title: 'Monthly Environmental Bulletin - March 2026',
    source: 'EcoWatch Research Team',
    date: '2026-03-15',
    reportType: 'monthly-bulletin',
    pages: 48,
    status: 'monthly-bulletin',
    visibility: 'public',
    confidence: 'high',
    summary: 'Comprehensive overview of environmental conditions across Kashmir for March 2026, including air quality trends, water quality assessments, and emerging risk indicators. Notable improvements in Srinagar AQI observed.',
    districts: ['Srinagar', 'Ganderbal', 'Budgam'],
    entities: ['Dal Lake', 'Jhelum River', 'Urban Airsheds'],
    modules: ['Air & Noise Monitoring', 'Water Systems', 'Risk & Monitoring'],
    methods: ['Satellite data analysis', 'Station data aggregation', 'Trend analysis'],
    relatedReports: ['fr-2025-012', 'fr-2025-011'],
    libraryTags: ['monthly-bulletin', 'environmental-conditions', 'quarterly-review'],
    downloadUrl: '/reports/fr-2026-001.pdf',
    previewAvailable: true,
    fileSize: '3.2 MB',
    methodology: 'Automated data aggregation from 12 monitoring stations, satellite imagery analysis (Sentinel-5P for air quality), and trend modeling using 3-year baselines.',
    lastUpdated: '2026-03-15',
    tags: ['monthly', 'bulletin', 'air-quality', 'water-quality', '2026'],
  },
  {
    id: 'fr-2026-002',
    title: 'Winter Bird Migration Survey - Hokarsara 2025-26',
    source: 'Wildlife Conservation Division',
    date: '2026-02-20',
    reportType: 'species-survey',
    pages: 64,
    status: 'field-verified',
    visibility: 'public',
    confidence: 'high',
    summary: 'Annual winter migratory bird census at Hokarsara Wetland. Recorded 187 species with population increases in Greylag Goose and Common Pochard. Wetland health indicators remain stable.',
    districts: ['Baramulla'],
    entities: ['Hokarsara Wetland', 'Migratory Bird Species', 'Greylag Goose', 'Common Pochard'],
    modules: ['Biodiversity', 'Water Systems', 'Protected Areas'],
    methods: ['Point count surveys', 'Transect sampling', 'Species identification', 'Population modeling'],
    relatedReports: ['fr-2025-008', 'fr-2024-003'],
    relatedAlerts: ['alert-wetland-2026-001'],
    libraryTags: ['wildlife', 'migration', 'wetland', 'biodiversity'],
    downloadUrl: '/reports/fr-2026-002.pdf',
    previewAvailable: true,
    fileSize: '5.1 MB',
    reviewedBy: 'Dr. Shahid Bhat, Chief Wildlife Warden',
    reviewDate: '2026-02-25',
    methodology: 'Standardized point count methodology across 24 survey points over 14 days. Species identification verified by ornithology team. Population estimates calculated using distance sampling.',
    lastUpdated: '2026-02-20',
    tags: ['wildlife', 'migration', 'wetland', 'hokarsara', 'birds', '2026'],
  },
  {
    id: 'fr-2026-003',
    title: 'Forest Fire Risk Assessment - Spring/Summer 2026',
    source: 'Forest Department Kashmir',
    date: '2026-03-01',
    reportType: 'risk-assessment',
    pages: 72,
    status: 'reviewed',
    visibility: 'public',
    confidence: 'high',
    summary: 'Pre-season fire risk assessment for Pir Panjal and Greater Himalayan forest ranges. Elevated risk predicted for May-June 2026 due to below-normal winter precipitation. Priority zones identified in Kupwara and Tangmarg.',
    districts: ['Kupwara', 'Baramulla', 'Anantnag', 'Pulwama'],
    entities: ['Pir Panjal Range', 'Tangmarg Forest Division', 'Kupwara Forest Division'],
    modules: ['Risk & Monitoring', 'Biodiversity', 'Alerts & Advisories'],
    methods: ['Fuel moisture analysis', 'Weather pattern analysis', 'Historical fire data review', 'Satellite thermal mapping'],
    relatedReports: ['fr-2025-004', 'fr-2024-004'],
    relatedAlerts: ['alert-fire-risk-2026-001'],
    libraryTags: ['fire-risk', 'forest', 'seasonal-assessment', 'risk-mitigation'],
    downloadUrl: '/reports/fr-2026-003.pdf',
    previewAvailable: true,
    fileSize: '4.8 MB',
    reviewedBy: 'Chief Conservator of Forests, Kashmir',
    reviewDate: '2026-03-05',
    methodology: 'Composite risk modeling using fuel moisture indices, precipitation deficit analysis, historical burn patterns (2010-2025), and satellite thermal anomaly detection. Risk zones mapped using GIS overlay analysis.',
    lastUpdated: '2026-03-01',
    tags: ['fire-risk', 'forest', 'seasonal', 'risk-assessment', '2026'],
  },

  // 2025 Reports (Recent Archive)
  {
    id: 'fr-2025-012',
    title: 'Annual Environmental Summary - 2025',
    source: 'EcoWatch Research Team',
    date: '2025-12-28',
    reportType: 'seasonal-report',
    pages: 124,
    status: 'reviewed',
    visibility: 'public',
    confidence: 'high',
    summary: 'Comprehensive annual synthesis of environmental indicators across all monitored domains. Key findings: 12% improvement in Srinagar AQI, stable wetland health in Dal-Nigeen system, and 23 new species records in biodiversity database.',
    districts: ['Srinagar', 'Baramulla', 'Anantnag', 'Kupwara', 'Ganderbal', 'Budgam'],
    entities: ['Dal Lake', 'Wular Lake', 'Jhelum Basin', 'Pir Panjal Ecosystem'],
    modules: ['Air & Noise Monitoring', 'Water Systems', 'Biodiversity', 'Risk & Monitoring', 'District Profiles'],
    methods: ['Multi-source data synthesis', 'Trend analysis', 'Comparative baseline assessment'],
    relatedReports: ['fr-2025-011', 'fr-2024-001'],
    libraryTags: ['annual-summary', 'environmental-conditions', 'comprehensive-review'],
    downloadUrl: '/reports/fr-2025-012.pdf',
    previewAvailable: true,
    fileSize: '8.4 MB',
    reviewedBy: 'EcoWatch Scientific Advisory Board',
    reviewDate: '2026-01-10',
    methodology: 'Aggregated analysis of 12 monthly bulletins, station data from 24 monitoring sites, satellite imagery time-series analysis, and cross-module intelligence synthesis.',
    lastUpdated: '2025-12-28',
    tags: ['annual', 'summary', 'comprehensive', '2025'],
  },
  {
    id: 'fr-2025-011',
    title: 'Monthly Environmental Bulletin - December 2025',
    source: 'EcoWatch Research Team',
    date: '2025-12-15',
    reportType: 'monthly-bulletin',
    pages: 44,
    status: 'reviewed',
    visibility: 'public',
    confidence: 'high',
    summary: 'December 2025 environmental conditions report. Winter air quality patterns show inversion layer impacts on valley airsheds. Water quality parameters in Dal Lake remain within acceptable ranges.',
    districts: ['Srinagar', 'Ganderbal', 'Budgam'],
    entities: ['Dal Lake', 'Jhelum River', 'Urban Airsheds'],
    modules: ['Air & Noise Monitoring', 'Water Systems'],
    methods: ['Station data aggregation', 'Satellite data analysis', 'Trend analysis'],
    relatedReports: ['fr-2025-010', 'fr-2025-012'],
    libraryTags: ['monthly-bulletin', 'environmental-conditions'],
    downloadUrl: '/reports/fr-2025-011.pdf',
    previewAvailable: true,
    fileSize: '3.0 MB',
    methodology: 'Standard monthly aggregation protocol using automated station data, satellite imagery (Sentinel-5P, Landsat-9), and comparative trend analysis.',
    lastUpdated: '2025-12-15',
    tags: ['monthly', 'bulletin', 'air-quality', 'water-quality', '2025'],
  },
  {
    id: 'fr-2025-010',
    title: 'Dal-Nigeen Wetland Health Assessment - Autumn 2025',
    source: 'LAWDA & EcoWatch Partnership',
    date: '2025-11-10',
    reportType: 'wetland-assessment',
    pages: 86,
    status: 'field-verified',
    visibility: 'public',
    confidence: 'high',
    summary: 'Comprehensive wetland health assessment covering water quality, macrophyte coverage, nutrient loading, and biodiversity indicators. Overall system health rated as moderate-improving. Notable reduction in nitrogen levels at 3 of 5 monitoring stations.',
    districts: ['Srinagar'],
    entities: ['Dal Lake', 'Nigeen Lake', 'Telbal Stream', 'Floating Gardens'],
    modules: ['Water Systems', 'Biodiversity', 'Risk & Monitoring'],
    methods: ['Water sampling (12 stations)', 'Macrophyte survey', 'Nutrient analysis', 'Secchi depth measurements', 'Benthic organism sampling'],
    relatedReports: ['fr-2025-003', 'fr-2024-003'],
    libraryTags: ['wetland', 'water-quality', 'dal-lake', 'assessment'],
    downloadUrl: '/reports/fr-2025-010.pdf',
    previewAvailable: true,
    fileSize: '6.2 MB',
    reviewedBy: 'Dr. Aasia Khurshid, Wetland Ecologist',
    reviewDate: '2025-11-18',
    methodology: 'Multi-parameter water quality analysis at 12 stations over 6-week period. Macrophyte coverage mapped using drone surveys and ground-truthing. Nutrient loading calculated from inflow/outflow measurements.',
    lastUpdated: '2025-11-10',
    tags: ['wetland', 'dal-lake', 'nigeen', 'water-quality', 'assessment', '2025'],
  },
  {
    id: 'fr-2025-009',
    title: 'Markhor Population Survey - Hirpora & Overa-Aru 2025',
    source: 'Wildlife Protection Department',
    date: '2025-09-15',
    reportType: 'species-survey',
    pages: 58,
    status: 'field-verified',
    visibility: 'public',
    confidence: 'moderate',
    summary: 'Biennial markhor (Capra falconeri) population census in Hirpora and Overa-Aru protected areas. Estimated population of 340-380 individuals, representing 8-10% growth since 2023 survey. Habitat conditions remain favorable.',
    districts: ['Shopian', 'Anantnag'],
    entities: ['Markhor', 'Hirpora Wildlife Sanctuary', 'Overa-Aru Wildlife Sanctuary'],
    modules: ['Biodiversity', 'Protected Areas'],
    methods: ['Direct observation counts', 'Camera trapping', 'Sign surveys (pellet groups)', 'Terrain-based population modeling'],
    relatedReports: ['fr-2023-002'],
    libraryTags: ['wildlife', 'markhor', 'endangered-species', 'population-survey'],
    downloadUrl: '/reports/fr-2025-009.pdf',
    previewAvailable: true,
    fileSize: '4.5 MB',
    reviewedBy: 'Dr. Khalid Shah, Wildlife Biologist',
    reviewDate: '2025-09-22',
    methodology: 'Combined direct observation surveys (14 field teams over 21 days), camera trapping (48 stations), and pellet group density analysis. Population estimates generated using CAPTURE and MARK software.',
    lastUpdated: '2025-09-15',
    tags: ['wildlife', 'markhor', 'endangered', 'population', 'protected-areas', '2025'],
  },
  {
    id: 'fr-2025-008',
    title: 'Glacial Retreat Assessment - Kolahoi Glacier 2025',
    source: 'Earth Sciences Department, University of Kashmir',
    date: '2025-08-20',
    reportType: 'technical-report',
    pages: 92,
    status: 'reviewed',
    visibility: 'public',
    confidence: 'high',
    summary: 'Multi-temporal analysis of Kolahoi Glacier retreat using satellite imagery and field measurements. Glacier has retreated 180 meters since 2000, with accelerated retreat observed in 2015-2025 period. Implications for Lidder River hydrology assessed.',
    districts: ['Anantnag'],
    entities: ['Kolahoi Glacier', 'Lidder River', 'Aru Valley'],
    modules: ['Water Systems', 'Risk & Monitoring', 'Climate Indicators'],
    methods: ['Satellite imagery time-series (2000-2025)', 'GPS field surveys', 'Mass balance modeling', 'Hydrological impact assessment'],
    relatedReports: ['fr-2023-005'],
    relatedAlerts: ['alert-glacier-2025-001'],
    libraryTags: ['glacier', 'climate-change', 'kolahoi', 'hydrology'],
    downloadUrl: '/reports/fr-2025-008.pdf',
    previewAvailable: true,
    fileSize: '7.8 MB',
    reviewedBy: 'Prof. Ghulam Jeelani, Hydrologist',
    reviewDate: '2025-08-28',
    methodology: 'Landsat and Sentinel-2 imagery analysis (82 scenes), GPS-based field validation of terminus position, mass balance modeling using accumulation-area ratio method, and downstream hydrological impact modeling.',
    lastUpdated: '2025-08-20',
    tags: ['glacier', 'kolahoi', 'climate-change', 'retreat', 'hydrology', '2025'],
  },

  // 2024 Reports (Archived/Sample Records)
  {
    id: 'fr-2024-004',
    title: 'Forest Fire Season Preview 2024',
    source: 'Forest Department Kashmir',
    date: '2024-03-01',
    reportType: 'risk-assessment',
    pages: 34,
    status: 'archived',
    visibility: 'public',
    confidence: 'high',
    summary: 'Pre-season fire risk forecast for 2024 fire season. Identified high-risk zones in Tangmarg, Kupwara, and Rajouri forest divisions. Recommended enhanced patrol schedules and early warning system activation by April 15.',
    districts: ['Kupwara', 'Baramulla', 'Rajouri'],
    entities: ['Tangmarg Forest Division', 'Kupwara Forest Division'],
    modules: ['Risk & Monitoring', 'Alerts & Advisories'],
    methods: ['Fuel moisture analysis', 'Weather pattern analysis', 'Historical fire data review'],
    relatedReports: ['fr-2023-004', 'fr-2025-004'],
    libraryTags: ['fire-risk', 'forest', 'seasonal-forecast', 'archived'],
    downloadUrl: '/reports/fr-2024-004.pdf',
    previewAvailable: true,
    fileSize: '2.1 MB',
    methodology: 'Risk modeling using fuel moisture indices, precipitation analysis, and historical burn pattern review (2010-2023). GIS-based risk zone mapping.',
    lastUpdated: '2024-03-01',
    tags: ['fire-risk', 'forest', 'seasonal', 'archived', '2024'],
  },
  {
    id: 'fr-2024-003',
    title: 'Wetland Health Assessment - Dal-Nigeen 2024',
    source: 'LAWDA',
    date: '2024-03-10',
    reportType: 'wetland-assessment',
    pages: 56,
    status: 'archived',
    visibility: 'public',
    confidence: 'moderate',
    summary: 'Annual wetland health assessment for Dal-Nigeen system. Water quality parameters show mixed trends - improvements in dissolved oxygen but persistent nutrient loading concerns at Telbal inlet. Macrophyte coverage stable.',
    districts: ['Srinagar'],
    entities: ['Dal Lake', 'Nigeen Lake', 'Telbal Stream'],
    modules: ['Water Systems', 'Biodiversity'],
    methods: ['Water sampling (10 stations)', 'Macrophyte survey', 'Nutrient analysis'],
    relatedReports: ['fr-2023-003', 'fr-2025-010'],
    libraryTags: ['wetland', 'water-quality', 'dal-lake', 'archived'],
    downloadUrl: '/reports/fr-2024-003.pdf',
    previewAvailable: true,
    fileSize: '3.8 MB',
    methodology: 'Water quality sampling at 10 stations over 4-week period. Macrophyte coverage assessed through boat surveys and aerial imagery.',
    lastUpdated: '2024-03-10',
    tags: ['wetland', 'dal-lake', 'water-quality', 'archived', '2024'],
  },
  {
    id: 'fr-2024-002',
    title: 'Winter Wildlife Survey 2023-24',
    source: 'Wildlife Dept',
    date: '2024-03-15',
    reportType: 'species-survey',
    pages: 78,
    status: 'archived',
    visibility: 'public',
    confidence: 'moderate',
    summary: 'Winter wildlife census covering protected areas and critical corridors across Kashmir. Recorded 142 species including 8 migratory waterfowl species new to the region. Population trends stable for key indicator species.',
    districts: ['Srinagar', 'Anantnag', 'Gulmarg'],
    entities: ['Hangul', 'Snow Leopard', 'Migratory Waterfowl', 'Dachigam NP'],
    modules: ['Biodiversity', 'Protected Areas'],
    methods: ['Transect surveys', 'Camera trapping', 'Point counts', 'Sign surveys'],
    relatedReports: ['fr-2023-002', 'fr-2025-009'],
    libraryTags: ['wildlife', 'winter-survey', 'biodiversity', 'archived'],
    downloadUrl: '/reports/fr-2024-002.pdf',
    previewAvailable: true,
    fileSize: '5.4 MB',
    methodology: 'Standardized winter survey protocol using transect surveys (45 transects), camera trapping (62 stations), and point counts for avian species.',
    lastUpdated: '2024-03-15',
    tags: ['wildlife', 'winter', 'survey', 'biodiversity', 'archived', '2024'],
  },
  {
    id: 'fr-2024-001',
    title: 'Monthly Environmental Bulletin - March 2024',
    source: 'EcoWatch Team',
    date: '2024-03-25',
    reportType: 'monthly-bulletin',
    pages: 42,
    status: 'archived',
    visibility: 'public',
    confidence: 'moderate',
    summary: 'March 2024 environmental conditions summary. Spring onset indicators observed in phenological records. Air quality showed seasonal improvement. Water quality in major lakes within normal parameters.',
    districts: ['Srinagar', 'Ganderbal'],
    entities: ['Dal Lake', 'Urban Airsheds'],
    modules: ['Air & Noise Monitoring', 'Water Systems'],
    methods: ['Station data aggregation', 'Satellite analysis', 'Phenological observation'],
    relatedReports: ['fr-2023-012', 'fr-2025-011'],
    libraryTags: ['monthly-bulletin', 'environmental-conditions', 'archived'],
    downloadUrl: '/reports/fr-2024-001.pdf',
    previewAvailable: true,
    fileSize: '2.8 MB',
    methodology: 'Monthly data aggregation from monitoring stations, satellite imagery analysis, and phenological record compilation.',
    lastUpdated: '2024-03-25',
    tags: ['monthly', 'bulletin', 'archived', '2024'],
  },

  // Additional 2025 Reports for Depth
  {
    id: 'fr-2025-004',
    title: 'Hangul Habitat Assessment - Dachigam 2025',
    source: 'Wildlife Conservation Division',
    date: '2025-06-15',
    reportType: 'field-survey',
    pages: 96,
    status: 'field-verified',
    visibility: 'public',
    confidence: 'high',
    summary: 'Comprehensive habitat assessment for endangered Hangul (Cervus hanglu) in Dachigam National Park. Population estimated at 280-310 individuals. Habitat quality rated good with concerns over grazing pressure in lower elevations.',
    districts: ['Srinagar'],
    entities: ['Hangul', 'Dachigam National Park', 'Tributary Streams'],
    modules: ['Biodiversity', 'Protected Areas', 'Water Systems'],
    methods: ['Direct counts', 'Habitat suitability indexing', 'Vegetation surveys', 'Camera trapping', 'Pellet group analysis'],
    relatedReports: ['fr-2024-002', 'fr-2025-009'],
    libraryTags: ['wildlife', 'hangul', 'endangered-species', 'habitat', 'dachigam'],
    downloadUrl: '/reports/fr-2025-004.pdf',
    previewAvailable: true,
    fileSize: '7.2 MB',
    reviewedBy: 'Dr. Muzaffar Kaul, Wildlife Ecologist',
    reviewDate: '2025-06-22',
    methodology: 'Intensive field surveys over 45 days using direct observation, camera trapping (84 stations), habitat suitability modeling, and vegetation plot analysis across elevation gradients.',
    lastUpdated: '2025-06-15',
    tags: ['wildlife', 'hangul', 'endangered', 'dachigam', 'habitat', '2025'],
  },
  {
    id: 'fr-2025-003',
    title: 'Sind River Water Quality Survey - Summer 2025',
    source: 'Water Resources Department',
    date: '2025-07-20',
    reportType: 'technical-report',
    pages: 54,
    status: 'reviewed',
    visibility: 'public',
    confidence: 'high',
    summary: 'Water quality assessment of Sind River from source to confluence with Jhelum. Parameters within acceptable ranges for most of the course. Elevated turbidity detected near Ganderbal town linked to construction activity.',
    districts: ['Ganderbal', 'Srinagar'],
    entities: ['Sind River', 'Jhelum River Confluence'],
    modules: ['Water Systems', 'Risk & Monitoring'],
    methods: ['Water sampling (15 stations)', 'Physico-chemical analysis', 'Heavy metal testing', 'Turbidity monitoring'],
    relatedReports: ['fr-2024-003', 'fr-2025-010'],
    libraryTags: ['water-quality', 'river', 'sind-river', 'assessment'],
    downloadUrl: '/reports/fr-2025-003.pdf',
    previewAvailable: true,
    fileSize: '3.9 MB',
    reviewedBy: 'Dr. Farooq Ahmad, Hydrologist',
    reviewDate: '2025-07-28',
    methodology: 'Grab sampling at 15 stations along river course, laboratory analysis for 28 physico-chemical parameters, heavy metal testing using AAS, and continuous turbidity monitoring at 5 stations.',
    lastUpdated: '2025-07-20',
    tags: ['water-quality', 'river', 'sind', 'assessment', '2025'],
  },
];

// Helper functions for filtering and aggregation
export function getReportsByYear(year: number): FieldReport[] {
  return fieldReportsRegistry.filter(r => new Date(r.date).getFullYear() === year);
}

export function getReportsByDistrict(district: string): FieldReport[] {
  return fieldReportsRegistry.filter(r => r.districts.includes(district));
}

export function getReportsByModule(module: string): FieldReport[] {
  return fieldReportsRegistry.filter(r => r.modules.includes(module));
}

export function getReportsByStatus(status: ReportStatus): FieldReport[] {
  return fieldReportsRegistry.filter(r => r.status === status);
}

export function getReportsByType(type: ReportType): FieldReport[] {
  return fieldReportsRegistry.filter(r => r.reportType === type);
}

export function getAllDistricts(): string[] {
  const districts = new Set<string>();
  fieldReportsRegistry.forEach(r => r.districts.forEach(d => districts.add(d)));
  return Array.from(districts).sort();
}

export function getAllModules(): string[] {
  const modules = new Set<string>();
  fieldReportsRegistry.forEach(r => r.modules.forEach(m => modules.add(m)));
  return Array.from(modules).sort();
}

export function getAllSources(): string[] {
  const sources = new Set<string>();
  fieldReportsRegistry.forEach(r => sources.add(r.source));
  return Array.from(sources).sort();
}

export function getAllYears(): number[] {
  const years = new Set<number>();
  fieldReportsRegistry.forEach(r => years.add(new Date(r.date).getFullYear()));
  return Array.from(years).sort((a, b) => b - a);
}

export function getReportById(id: string): FieldReport | undefined {
  return fieldReportsRegistry.find(r => r.id === id);
}

export function getRecentReports(limit: number = 3): FieldReport[] {
  return [...fieldReportsRegistry]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}

// Summary statistics
export function getFieldReportStats() {
  return {
    totalReports: fieldReportsRegistry.length,
    districtCoverage: getAllDistricts().length,
    districts: getAllDistricts(),
    moduleCoverage: getAllModules().length,
    modules: getAllModules(),
    recentAdditions: getRecentReports(3).map(r => ({ id: r.id, title: r.title, date: r.date })),
    yearRange: `${Math.min(...getAllYears())}-${Math.max(...getAllYears())}`,
    activeYear: Math.max(...getAllYears()),
    statusBreakdown: fieldReportsRegistry.reduce((acc, r) => {
      acc[r.status] = (acc[r.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
  };
}
