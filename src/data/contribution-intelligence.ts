// Contribution Intelligence Data Layer
// Live participation tracking across the Kashmir Environmental Intelligence Platform

export type ContributionType = 'issue' | 'sighting' | 'dataset' | 'citizen-science';
export type IssueStatus = 'pending' | 'under-review' | 'verified' | 'in-progress' | 'resolved' | 'closed';
export type SightingStatus = 'pending' | 'verified' | 'rejected' | 'featured';
export type DatasetStatus = 'pending' | 'approved' | 'published';
export type VolunteerStatus = 'active' | 'inactive' | 'pending';

export interface ReportedIssue {
  id: string;
  type: string; // wildfire, landslide, flood, pollution, wildlife, etc.
  title: string;
  description: string;
  location: {
    district: string;
    area: string;
    lat?: number;
    lng?: number;
  };
  status: IssueStatus;
  reportedBy: string;
  reportedDate: string;
  reviewedBy?: string;
  reviewedDate?: string;
  resolvedDate?: string;
  images?: string[];
  upvotes: number;
  comments: number;
  tags: string[];
}

export interface SubmittedSighting {
  id: string;
  speciesName: string;
  speciesCategory: 'mammal' | 'bird' | 'reptile' | 'fish' | 'plant' | 'other';
  scientificName?: string;
  location: {
    district: string;
    area: string;
    habitat?: string;
    lat?: number;
    lng?: number;
  };
  observedDate: string;
  submittedDate: string;
  submittedBy: string;
  status: SightingStatus;
  verifiedBy?: string;
  verifiedDate?: string;
  description: string;
  count?: number;
  images?: string[];
  tags: string[];
}

export interface ContributedDataset {
  id: string;
  title: string;
  description: string;
  type: 'research' | 'monitoring' | 'survey' | 'observation' | 'gis';
  category: string;
  district: string;
  submittedBy: string;
  organization?: string;
  submittedDate: string;
  status: DatasetStatus;
  approvedBy?: string;
  publishedDate?: string;
  downloadCount: number;
  citationCount: number;
  tags: string[];
  url?: string;
  doi?: string;
}

export interface CitizenScienceMember {
  id: string;
  name: string;
  district: string;
  joinedDate: string;
  status: VolunteerStatus;
  contributions: {
    issues: number;
    sightings: number;
    datasets: number;
  };
  badges: string[];
  expertise: string[];
  lastActive: string;
}

export interface DistrictParticipation {
  district: string;
  totalContributions: number;
  issues: number;
  sightings: number;
  datasets: number;
  members: number;
  activeMembers: number;
  verifiedContributions: number;
  pendingContributions: number;
  resolutionRate: number;
  trend: 'increasing' | 'stable' | 'decreasing';
}

export interface ParticipationMetrics {
  totalIssues: number;
  totalSightings: number;
  totalDatasets: number;
  totalMembers: number;
  pendingIssues: number;
  verifiedIssues: number;
  resolvedIssues: number;
  pendingSightings: number;
  verifiedSightings: number;
  newThisWeek: number;
  newThisMonth: number;
  activeDistricts: number;
  topContributors: string[];
}

export interface ContributionActivity {
  id: string;
  type: ContributionType;
  title: string;
  district: string;
  timestamp: string;
  status: string;
  contributor: string;
}

// ============================================================================
// MOCK DATA
// ============================================================================

export const reportedIssues: ReportedIssue[] = [
  {
    id: 'issue-001',
    type: 'pollution',
    title: 'Wetland pollution from agricultural runoff',
    description: 'Significant algal bloom observed due to fertilizer runoff from nearby fields',
    location: { district: 'Srinagar', area: 'Hokersar Wetland', lat: 34.1526, lng: 74.8462 },
    status: 'verified',
    reportedBy: 'Mohammad Yaseen',
    reportedDate: '2024-03-15',
    reviewedBy: 'Dr. Ayesha Hassan',
    reviewedDate: '2024-03-16',
    images: ['hokersar-pollution-001.jpg'],
    upvotes: 23,
    comments: 8,
    tags: ['wetland', 'pollution', 'agricultural-runoff', 'algal-bloom'],
  },
  {
    id: 'issue-002',
    type: 'wildlife',
    title: 'Injured Hangul spotted near Dachigam boundary',
    description: 'Adult male Hangul with visible leg injury, requires immediate veterinary attention',
    location: { district: 'Srinagar', area: 'Dachigam National Park', lat: 34.1667, lng: 75.0333 },
    status: 'in-progress',
    reportedBy: 'Forest Guard Ahmed',
    reportedDate: '2024-03-18',
    reviewedBy: 'Dr. S. Sathyakumar',
    reviewedDate: '2024-03-18',
    images: ['hangul-injury-002.jpg'],
    upvotes: 45,
    comments: 12,
    tags: ['hangul', 'endangered', 'wildlife-rescue', 'dachigam'],
  },
  {
    id: 'issue-003',
    type: 'landslide',
    title: 'Road blocked due to landslide on Srinagar-Leh Highway',
    description: 'Major landslide has blocked traffic, alternative route needed',
    location: { district: 'Ganderbal', area: 'Zojila Pass', lat: 34.4333, lng: 75.1667 },
    status: 'resolved',
    reportedBy: 'Traveler John',
    reportedDate: '2024-03-10',
    reviewedBy: 'NHAI Official',
    reviewedDate: '2024-03-10',
    resolvedDate: '2024-03-12',
    upvotes: 67,
    comments: 24,
    tags: ['landslide', 'highway', 'traffic', 'zojila'],
  },
  {
    id: 'issue-004',
    type: 'flood',
    title: 'Flash flooding in low-lying areas after heavy rainfall',
    description: 'Multiple areas experiencing waterlogging due to inadequate drainage',
    location: { district: 'Anantnag', area: 'Kokernag', lat: 33.5400, lng: 75.1100 },
    status: 'pending',
    reportedBy: 'Local Resident',
    reportedDate: '2024-03-20',
    upvotes: 34,
    comments: 15,
    tags: ['flood', 'rainfall', 'drainage', 'kokernag'],
  },
  {
    id: 'issue-005',
    type: 'wildfire',
    title: 'Forest fire threat in dry pine forest area',
    description: 'High fire risk due to accumulated dry biomass and hot weather',
    location: { district: 'Kupwara', area: 'Kerun Forest Range', lat: 34.5333, lng: 74.2667 },
    status: 'under-review',
    reportedBy: 'Forest Department',
    reportedDate: '2024-03-19',
    upvotes: 56,
    comments: 18,
    tags: ['wildfire', 'forest', 'fire-risk', 'pine-forest'],
  },
];

export const submittedSightings: SubmittedSighting[] = [
  {
    id: 'sighting-001',
    speciesName: 'Hangul',
    speciesCategory: 'mammal',
    scientificName: 'Cervus hanglu',
    location: { district: 'Srinagar', area: 'Dachigam National Park', habitat: 'Temperate forest' },
    observedDate: '2024-03-17',
    submittedDate: '2024-03-18',
    submittedBy: 'Dr. Bilal Habib',
    status: 'verified',
    verifiedBy: 'Wildlife Department',
    verifiedDate: '2024-03-18',
    description: 'Adult male with impressive antlers spotted near stream',
    count: 1,
    images: ['hangul-sighting-001.jpg'],
    tags: ['hangul', 'endangered', 'mammal', 'dachigam'],
  },
  {
    id: 'sighting-002',
    speciesName: 'Black Bear',
    speciesCategory: 'mammal',
    scientificName: 'Ursus thibetanus',
    location: { district: 'Ganderbal', area: 'Sonamarg', habitat: 'Alpine meadow' },
    observedDate: '2024-03-15',
    submittedDate: '2024-03-16',
    submittedBy: 'Trekker Sarah',
    status: 'verified',
    verifiedBy: 'Forest Department',
    verifiedDate: '2024-03-17',
    description: 'Himalayan Black Bear foraging in alpine meadow',
    count: 1,
    images: ['black-bear-002.jpg'],
    tags: ['black-bear', 'mammal', 'sonamarg', 'alpine'],
  },
  {
    id: 'sighting-003',
    speciesName: 'Common Teal',
    speciesCategory: 'bird',
    scientificName: 'Anas crecca',
    location: { district: 'Srinagar', area: 'Hokersar Wetland', habitat: 'Wetland' },
    observedDate: '2024-03-19',
    submittedDate: '2024-03-19',
    submittedBy: 'Bird Watcher Ali',
    status: 'pending',
    description: 'Flock of 50+ Common Teal observed during migration',
    count: 52,
    images: ['common-teal-003.jpg'],
    tags: ['bird', 'waterbird', 'migration', 'hokersar'],
  },
  {
    id: 'sighting-004',
    speciesName: 'Snow Leopard',
    speciesCategory: 'mammal',
    scientificName: 'Panthera uncia',
    location: { district: 'Kupwara', area: 'Machil Sector', habitat: 'High altitude' },
    observedDate: '2024-03-12',
    submittedDate: '2024-03-14',
    submittedBy: 'Army Patrol',
    status: 'featured',
    verifiedBy: 'Wildlife Department',
    verifiedDate: '2024-03-15',
    description: 'Rare snow leopard sighting captured on camera trap',
    count: 1,
    images: ['snow-leopard-004.jpg'],
    tags: ['snow-leopard', 'endangered', 'high-altitude', 'kupwara'],
  },
];

export const contributedDatasets: ContributedDataset[] = [
  {
    id: 'dataset-001',
    title: 'Dal Lake Water Quality Monitoring Dataset 2020-2024',
    description: 'Four-year longitudinal water quality dataset from 12 monitoring stations',
    type: 'monitoring',
    category: 'Water Quality',
    district: 'Srinagar',
    submittedBy: 'Dr. Kumar et al.',
    organization: 'University of Kashmir',
    submittedDate: '2024-01-10',
    status: 'published',
    publishedDate: '2024-01-15',
    downloadCount: 567,
    citationCount: 45,
    tags: ['water-quality', 'dal-lake', 'monitoring', 'time-series'],
    doi: '10.1234/dal-wq-2024',
  },
  {
    id: 'dataset-002',
    title: 'Bird Migration Patterns - Kashmir Wetlands 2023',
    description: 'Comprehensive dataset of migratory bird arrivals and departures',
    type: 'observation',
    category: 'Biodiversity',
    district: 'Srinagar',
    submittedBy: 'BNHS Team',
    organization: 'Bombay Natural History Society',
    submittedDate: '2023-12-01',
    status: 'published',
    publishedDate: '2023-12-10',
    downloadCount: 342,
    citationCount: 28,
    tags: ['birds', 'migration', 'wetlands', 'observation'],
  },
  {
    id: 'dataset-003',
    title: 'Forest Cover Change Analysis 2000-2024',
    description: 'Satellite-based forest cover change detection dataset',
    type: 'gis',
    category: 'Forestry',
    district: 'All',
    submittedBy: 'FSI Team',
    organization: 'Forest Survey of India',
    submittedDate: '2024-02-01',
    status: 'approved',
    approvedBy: 'MoEFCC',
    downloadCount: 423,
    citationCount: 38,
    tags: ['forest-cover', 'remote-sensing', 'gis', 'change-detection'],
  },
];

export const citizenScienceMembers: CitizenScienceMember[] = [
  {
    id: 'member-001',
    name: 'Dr. Bilal Habib',
    district: 'Srinagar',
    joinedDate: '2023-06-15',
    status: 'active',
    contributions: { issues: 12, sightings: 89, datasets: 5 },
    badges: ['Expert Contributor', 'Bird Specialist', 'Top 10 2024'],
    expertise: ['Ornithology', 'Wetland Ecology'],
    lastActive: '2024-03-19',
  },
  {
    id: 'member-002',
    name: 'Mohammad Yaseen',
    district: 'Anantnag',
    joinedDate: '2023-08-20',
    status: 'active',
    contributions: { issues: 34, sightings: 45, datasets: 2 },
    badges: ['Community Guardian', 'Issue Reporter'],
    expertise: ['Water Quality', 'Community Monitoring'],
    lastActive: '2024-03-20',
  },
  {
    id: 'member-003',
    name: 'Sarah Thompson',
    district: 'Ganderbal',
    joinedDate: '2024-01-10',
    status: 'active',
    contributions: { issues: 5, sightings: 23, datasets: 0 },
    badges: ['Newcomer', 'Wildlife Photographer'],
    expertise: ['Wildlife Photography', 'Trekking'],
    lastActive: '2024-03-18',
  },
];

export const districtParticipation: DistrictParticipation[] = [
  { district: 'Srinagar', totalContributions: 456, issues: 89, sightings: 312, datasets: 55, members: 234, activeMembers: 189, verifiedContributions: 398, pendingContributions: 58, resolutionRate: 87, trend: 'increasing' },
  { district: 'Anantnag', totalContributions: 234, issues: 56, sightings: 145, datasets: 33, members: 145, activeMembers: 112, verifiedContributions: 198, pendingContributions: 36, resolutionRate: 78, trend: 'increasing' },
  { district: 'Baramulla', totalContributions: 198, issues: 45, sightings: 123, datasets: 30, members: 123, activeMembers: 98, verifiedContributions: 167, pendingContributions: 31, resolutionRate: 75, trend: 'stable' },
  { district: 'Ganderbal', totalContributions: 187, issues: 38, sightings: 128, datasets: 21, members: 134, activeMembers: 105, verifiedContributions: 156, pendingContributions: 31, resolutionRate: 82, trend: 'increasing' },
  { district: 'Pulwama', totalContributions: 156, issues: 34, sightings: 98, datasets: 24, members: 98, activeMembers: 76, verifiedContributions: 132, pendingContributions: 24, resolutionRate: 73, trend: 'stable' },
  { district: 'Kupwara', totalContributions: 145, issues: 42, sightings: 87, datasets: 16, members: 87, activeMembers: 65, verifiedContributions: 118, pendingContributions: 27, resolutionRate: 69, trend: 'stable' },
  { district: 'Budgam', totalContributions: 134, issues: 29, sightings: 89, datasets: 16, members: 78, activeMembers: 58, verifiedContributions: 112, pendingContributions: 22, resolutionRate: 76, trend: 'stable' },
  { district: 'Kulgam', totalContributions: 98, issues: 23, sightings: 62, datasets: 13, members: 67, activeMembers: 48, verifiedContributions: 82, pendingContributions: 16, resolutionRate: 71, trend: 'decreasing' },
];

export const recentActivity: ContributionActivity[] = [
  { id: 'act-001', type: 'issue', title: 'Wetland pollution reported in Hokersar', district: 'Srinagar', timestamp: '2h ago', status: 'pending', contributor: 'Mohammad Yaseen' },
  { id: 'act-002', type: 'sighting', title: 'Black Bear sighting in Sonamarg', district: 'Ganderbal', timestamp: '5h ago', status: 'verified', contributor: 'Sarah Thompson' },
  { id: 'act-003', type: 'dataset', title: 'Water quality data for Dal Lake', district: 'Srinagar', timestamp: '1d ago', status: 'published', contributor: 'Dr. Kumar et al.' },
  { id: 'act-004', type: 'citizen-science', title: 'New volunteer enrolled', district: 'Anantnag', timestamp: '1d ago', status: 'active', contributor: 'Ahmad Hassan' },
  { id: 'act-005', type: 'sighting', title: 'Common Teal migration flock', district: 'Srinagar', timestamp: '2d ago', status: 'pending', contributor: 'Ali Bird Watcher' },
  { id: 'act-006', type: 'issue', title: 'Forest fire risk alert', district: 'Kupwara', timestamp: '2d ago', status: 'under-review', contributor: 'Forest Department' },
];

export const participationMetrics: ParticipationMetrics = {
  totalIssues: 342,
  totalSightings: 1256,
  totalDatasets: 89,
  totalMembers: 2847,
  pendingIssues: 45,
  verifiedIssues: 267,
  resolvedIssues: 230,
  pendingSightings: 123,
  verifiedSightings: 987,
  newThisWeek: 23,
  newThisMonth: 156,
  activeDistricts: 18,
  topContributors: ['Dr. Bilal Habib', 'Mohammad Yaseen', 'Sarah Thompson', 'BNHS Team', 'Forest Department'],
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getIssuesByStatus(status: IssueStatus): ReportedIssue[] {
  return reportedIssues.filter(issue => issue.status === status);
}

export function getSightingsByStatus(status: SightingStatus): SubmittedSighting[] {
  return submittedSightings.filter(sighting => sighting.status === status);
}

export function getDatasetsByStatus(status: DatasetStatus): ContributedDataset[] {
  return contributedDatasets.filter(dataset => dataset.status === status);
}

export function getContributionsByDistrict(district: string): {
  issues: ReportedIssue[];
  sightings: SubmittedSighting[];
  datasets: ContributedDataset[];
} {
  return {
    issues: reportedIssues.filter(i => i.location.district === district),
    sightings: submittedSightings.filter(s => s.location.district === district),
    datasets: contributedDatasets.filter(d => d.district === district || d.district === 'All'),
  };
}

export function getParticipationByDistrict(districtId: string): DistrictParticipation | undefined {
  return districtParticipation.find(d => d.district.toLowerCase() === districtId.toLowerCase());
}

export function calculateVerificationRate(): number {
  const total = participationMetrics.totalIssues + participationMetrics.totalSightings;
  const verified = participationMetrics.verifiedIssues + participationMetrics.verifiedSightings;
  return Math.round((verified / total) * 100);
}

export function calculateResolutionRate(): number {
  return Math.round((participationMetrics.resolvedIssues / participationMetrics.totalIssues) * 100);
}

export function getTopContributingDistricts(): DistrictParticipation[] {
  return [...districtParticipation].sort((a, b) => b.totalContributions - a.totalContributions).slice(0, 5);
}

export function getActivityByType(type: ContributionType): ContributionActivity[] {
  return recentActivity.filter(activity => activity.type === type);
}
