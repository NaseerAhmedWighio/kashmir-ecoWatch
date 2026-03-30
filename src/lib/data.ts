import { Metric, IntelligenceCard, InsightPanel, FeaturedEntity, Alert, ChartData } from '@/types';

export const liveMetrics: Metric[] = [
  { label: 'Protected Areas', value: 47, trend: 'up', trendValue: 2 },
  { label: 'Species Indexed', value: 2847, trend: 'up', trendValue: 156 },
  { label: 'Lakes & Wetlands', value: 1253, trend: 'stable', trendValue: 0 },
  { label: 'Springs', value: 892, trend: 'down', trendValue: -12 },
  { label: 'Glaciers', value: 148, trend: 'down', trendValue: -3 },
  { label: 'Monitoring Stations', value: 234, trend: 'up', trendValue: 8 },
  { label: 'Active Alerts', value: 17, trend: 'up', trendValue: 3 },
  { label: 'Trails', value: 156, trend: 'up', trendValue: 12 },
  { label: 'Sightings', value: 4521, trend: 'up', trendValue: 287 },
  { label: 'Research Reports', value: 1893, trend: 'up', trendValue: 45 },
];

export const intelligenceCards: IntelligenceCard[] = [
  {
    id: 'atlas',
    title: 'Ecological Atlas',
    description: 'Interactive GIS mapping of ecosystems, watersheds, and biodiversity hotspots',
    icon: 'map',
    metrics: [
      { label: 'Layers', value: 42 },
      { label: 'Coverage', value: 100, unit: '%' },
    ],
    link: '/atlas',
    color: 'forest',
  },
  {
    id: 'biodiversity',
    title: 'Biodiversity Intelligence',
    description: 'Comprehensive species database with distribution, habitat, and conservation status',
    icon: 'leaf',
    metrics: [
      { label: 'Species', value: 2847 },
      { label: 'Threatened', value: 127 },
    ],
    link: '/biodiversity',
    color: 'glacier',
  },
  {
    id: 'protected-areas',
    title: 'Protected Areas',
    description: 'National parks, sanctuaries, reserves with ecological monitoring',
    icon: 'shield',
    metrics: [
      { label: 'Areas', value: 47 },
      { label: 'Coverage', value: 12.8, unit: '%' },
    ],
    link: '/protected-areas',
    color: 'earth',
  },
  {
    id: 'water',
    title: 'Water Systems',
    description: 'Lakes, wetlands, rivers, springs with hydrological intelligence',
    icon: 'droplet',
    metrics: [
      { label: 'Water Bodies', value: 1253 },
      { label: 'Watersheds', value: 89 },
    ],
    link: '/water-systems',
    color: 'glacier',
  },
  {
    id: 'pollution',
    title: 'Pollution & Environmental Stress',
    description: 'Air, water, soil, noise pollution monitoring and environmental stress assessment',
    icon: 'cloud',
    metrics: [
      { label: 'Monitoring Stations', value: 234 },
      { label: 'Pollution Hotspots', value: 23 },
    ],
    link: '/risk-monitoring',
    color: 'slate',
  },
  {
    id: 'seasonal',
    title: 'Seasonal Ecology',
    description: 'Bloom mapping, migration patterns, and seasonal ecological windows',
    icon: 'sun',
    metrics: [
      { label: 'Bloom Zones', value: 78 },
      { label: 'Active Now', value: 12 },
    ],
    link: '/seasonal-ecology',
    color: 'alert',
  },
  {
    id: 'trails',
    title: 'Trails & Sightings',
    description: 'Hiking trails, birding routes, wildlife observation hotspots',
    icon: 'footprints',
    metrics: [
      { label: 'Trails', value: 156 },
      { label: 'Sightings', value: 4521 },
    ],
    link: '/trails',
    color: 'forest',
  },
  {
    id: 'research',
    title: 'Research Library',
    description: 'Scientific reports, datasets, management plans, and evidence archive',
    icon: 'book',
    metrics: [
      { label: 'Reports', value: 1893 },
      { label: 'Datasets', value: 456 },
    ],
    link: '/research',
    color: 'glacier',
  },
];

export const insightPanels: InsightPanel[] = [
  {
    id: 'wetland-stress',
    title: 'Wetland Stress Watch',
    status: 'warning',
    description: 'Critical wetland ecosystems showing environmental pressure indicators',
    items: [
      {
        id: '1',
        title: 'Hokersar Wetland - Eutrophication Risk',
        location: 'Srinagar District',
        timestamp: new Date('2024-03-25'),
        severity: 'high',
      },
      {
        id: '2',
        title: 'Shallabugh Wetland - Encroachment Detected',
        location: 'Ganderbal District',
        timestamp: new Date('2024-03-24'),
        severity: 'medium',
      },
      {
        id: '3',
        title: 'Mirgund Wetland - Water Quality Decline',
        location: 'Kulgam District',
        timestamp: new Date('2024-03-23'),
        severity: 'medium',
      },
    ],
  },
  {
    id: 'bloom-activity',
    title: 'Algal Bloom Activity',
    status: 'warning',
    description: 'Seasonal algal bloom patterns across Kashmir\'s five major lakes',
    items: [
      {
        id: '1',
        title: 'Dal Lake - Moderate Bloom',
        location: 'Srinagar',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
      },
      {
        id: '2',
        title: 'Anchar Lake - High Bloom Activity',
        location: 'Srinagar',
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
      },
      {
        id: '3',
        title: 'Manasbal Lake - Developing Bloom',
        location: 'Ganderbal',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      },
    ],
  },
  {
    id: 'wildlife-sightings',
    title: 'Recent Wildlife Sightings',
    status: 'normal',
    description: 'Verified wildlife observations from protected areas and trails',
    items: [
      {
        id: '1',
        title: 'Hangul Deer Sighting - Group of 5',
        location: 'Dachigam National Park',
        timestamp: new Date('2024-03-26'),
        severity: 'low',
      },
      {
        id: '2',
        title: 'Snow Leopard Camera Trap',
        location: 'Hemis-Kishtwar Corridor',
        timestamp: new Date('2024-03-25'),
        severity: 'low',
      },
      {
        id: '3',
        title: 'Himalayan Brown Bear',
        location: 'Overa-Aru Wildlife Sanctuary',
        timestamp: new Date('2024-03-24'),
        severity: 'low',
      },
    ],
  },
  {
    id: 'air-quality',
    title: 'Air Quality Signals',
    status: 'warning',
    description: 'Real-time air quality monitoring across urban and industrial zones',
    items: [
      {
        id: '1',
        title: 'Srinagar - Moderate AQI (156)',
        location: 'Srinagar Urban',
        timestamp: new Date('2024-03-26'),
        severity: 'medium',
      },
      {
        id: '2',
        title: 'Anantnag - Good AQI (78)',
        location: 'Anantnag',
        timestamp: new Date('2024-03-26'),
        severity: 'low',
      },
      {
        id: '3',
        title: 'Baramulla - Moderate AQI (134)',
        location: 'Baramulla',
        timestamp: new Date('2024-03-26'),
        severity: 'medium',
      },
    ],
  },
  {
    id: 'spring-vulnerability',
    title: 'Spring Vulnerability',
    status: 'critical',
    description: 'Springs showing seasonal stress or discharge decline',
    items: [
      {
        id: '1',
        title: 'Kokernag Spring - Discharge Down 18%',
        location: 'Anantnag District',
        timestamp: new Date('2024-03-25'),
        severity: 'high',
      },
      {
        id: '2',
        title: 'Verinag Spring - Flow Reduction',
        location: 'Anantnag District',
        timestamp: new Date('2024-03-24'),
        severity: 'high',
      },
      {
        id: '3',
        title: 'Achabal Spring - Seasonal Low',
        location: 'Anantnag District',
        timestamp: new Date('2024-03-23'),
        severity: 'medium',
      },
    ],
  },
];

export const featuredEntities: FeaturedEntity[] = [
  {
    id: 'dachigam',
    type: 'protected_area',
    name: 'Dachigam National Park',
    description: 'Critical habitat for endangered Hangul deer and diverse Himalayan ecosystems',
    image: '/images/dachigam.jpg',
    metrics: [
      { label: 'Area', value: 141, unit: 'km²' },
      { label: 'Species', value: 267 },
      { label: 'Elevation', value: 3350, unit: 'm' },
    ],
    link: '/protected-areas/dachigam',
  },
  {
    id: 'dal-lake',
    type: 'lake',
    name: 'Dal Lake',
    description: 'Iconic urban wetland with unique floating gardens and biodiversity',
    image: '/images/dal-lake.jpg',
    metrics: [
      { label: 'Area', value: 18, unit: 'km²' },
      { label: 'Depth (max)', value: 6, unit: 'm' },
      { label: 'Fish Species', value: 12 },
    ],
    link: '/water-systems/lakes/dal-lake',
  },
  {
    id: 'hangul',
    type: 'species',
    name: 'Hangul (Kashmir Stag)',
    description: 'Endangered subspecies of elk, state animal of Jammu and Kashmir',
    image: '/images/hangul.jpg',
    metrics: [
      { label: 'Population', value: 261 },
      { label: 'Status', value: 1, unit: 'CR' },
      { label: 'Range', value: 141, unit: 'km²' },
    ],
    link: '/biodiversity/mammals/hangul',
  },
  {
    id: 'tulip-bloom',
    type: 'bloom',
    name: 'Wild Tulip Meadows',
    description: 'Seasonal alpine bloom zones with endemic Himalayan flora',
    image: '/images/tulip-bloom.jpg',
    metrics: [
      { label: 'Peak Season', value: 3, unit: 'Apr-May' },
      { label: 'Zones', value: 12 },
      { label: 'Species', value: 28 },
    ],
    link: '/seasonal-ecology/bloom/tulip-meadows',
  },
  {
    id: 'tarsar-marsar',
    type: 'trail',
    name: 'Tarsar Marsar Trek',
    description: 'High-altitude alpine trail connecting pristine glacial lakes',
    image: '/images/tarsar-marsar.jpg',
    metrics: [
      { label: 'Distance', value: 32, unit: 'km' },
      { label: 'Duration', value: 5, unit: 'days' },
      { label: 'Difficulty', value: 3, unit: 'Moderate' },
    ],
    link: '/trails/tarsar-marsar',
  },
  {
    id: 'srinagar',
    type: 'district',
    name: 'Srinagar District',
    description: 'Urban ecological profile with wetlands, urban forests, and environmental monitoring',
    image: '/images/srinagar.jpg',
    metrics: [
      { label: 'Area', value: 2228, unit: 'km²' },
      { label: 'Wetlands', value: 47 },
      { label: 'Green Cover', value: 23, unit: '%' },
    ],
    link: '/districts/srinagar',
  },
];

export const alerts: Alert[] = [
  {
    id: '1',
    type: 'wetland_alert',
    title: 'Wetland Encroachment Alert',
    description: 'Illegal construction detected near protected wetland boundary',
    severity: 'high',
    location: 'Hokersar Wetland, Srinagar',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  },
  {
    id: '2',
    type: 'air_quality',
    title: 'Air Quality Advisory',
    description: 'Moderate AQI levels expected due to temperature inversion',
    severity: 'medium',
    location: 'Srinagar Urban Area',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
  },
  {
    id: '3',
    type: 'trail_closure',
    title: 'Trail Closure - Landslide Risk',
    description: 'Temporary closure due to unstable terrain after rainfall',
    severity: 'high',
    location: 'Kolahoi Base Camp Trail',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
  },
  {
    id: '4',
    type: 'monitoring',
    title: 'Water Quality Anomaly',
    description: 'Elevated turbidity levels detected at monitoring station',
    severity: 'medium',
    location: 'Jhelum River, Sangam',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
  },
  {
    id: '5',
    type: 'hazard',
    title: 'Avalanche Risk Warning',
    description: 'High avalanche risk in higher altitude zones',
    severity: 'high',
    location: 'Gulmarg High Range',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
  },
];

export const airQualityData: ChartData[] = [
  { label: 'Jan', value: 142 },
  { label: 'Feb', value: 128 },
  { label: 'Mar', value: 156 },
  { label: 'Apr', value: 98 },
  { label: 'May', value: 76 },
  { label: 'Jun', value: 68 },
];

export const waterQualityData: ChartData[] = [
  { label: 'Jan', value: 7.2 },
  { label: 'Feb', value: 7.4 },
  { label: 'Mar', value: 6.8 },
  { label: 'Apr', value: 7.1 },
  { label: 'May', value: 7.3 },
  { label: 'Jun', value: 7.0 },
];

export const bloomActivityData: ChartData[] = [
  { label: 'Jan', value: 12 },
  { label: 'Feb', value: 28 },
  { label: 'Mar', value: 67 },
  { label: 'Apr', value: 89 },
  { label: 'May', value: 54 },
  { label: 'Jun', value: 32 },
];

export const sightingActivityData: ChartData[] = [
  { label: 'Jan', value: 234 },
  { label: 'Feb', value: 312 },
  { label: 'Mar', value: 487 },
  { label: 'Apr', value: 623 },
  { label: 'May', value: 712 },
  { label: 'Jun', value: 589 },
];

export const districtComparisonData: ChartData[] = [
  { label: 'Srinagar', value: 72 },
  { label: 'Anantnag', value: 84 },
  { label: 'Baramulla', value: 68 },
  { label: 'Kulgam', value: 79 },
  { label: 'Pulwama', value: 75 },
  { label: 'Ganderbal', value: 88 },
];
