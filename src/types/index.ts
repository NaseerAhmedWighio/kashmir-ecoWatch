export interface Metric {
  label: string;
  value: number;
  unit?: string;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: number;
}

export interface IntelligenceCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  metrics: Metric[];
  link: string;
  color: string;
}

export interface InsightPanel {
  id: string;
  title: string;
  status: 'critical' | 'warning' | 'normal' | 'info';
  description: string;
  items: InsightItem[];
}

export interface InsightItem {
  id: string;
  title: string;
  location?: string;
  timestamp: Date;
  severity?: 'high' | 'medium' | 'low';
}

export interface FeaturedEntity {
  id: string;
  type: 'protected_area' | 'lake' | 'species' | 'bloom' | 'trail' | 'district';
  name: string;
  description: string;
  image: string;
  metrics: Metric[];
  link: string;
}

export interface Alert {
  id: string;
  type: 'hazard' | 'trail_closure' | 'wetland_alert' | 'air_quality' | 'monitoring';
  title: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
  location?: string;
  timestamp: Date;
}

export interface ChartData {
  label: string;
  value: number;
  timestamp?: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  icon?: string;
}

// Field Intelligence Reports Types
export type ReportStatus = 'reviewed' | 'field-verified' | 'preliminary' | 'technical-assessment' | 'monthly-bulletin' | 'archived' | 'restricted';
export type ReportType = 'field-survey' | 'technical-report' | 'monthly-bulletin' | 'risk-assessment' | 'environmental-impact' | 'species-survey' | 'wetland-assessment' | 'seasonal-report';
export type ConfidenceLevel = 'high' | 'moderate' | 'low' | 'pending-review';
export type ReportVisibility = 'public' | 'restricted' | 'institutional';

export interface FieldReport {
  // Core Metadata
  id: string;
  title: string;
  source: string; // Authoring organization
  date: string; // ISO date string
  reportType: ReportType;
  pages: number;
  status: ReportStatus;
  visibility: ReportVisibility;
  confidence: ConfidenceLevel;

  // Intelligence Data
  summary: string; // 2-3 sentence abstract
  districts: string[]; // Districts covered
  entities: string[]; // Entities studied (species, ecosystems, etc.)
  modules: string[]; // Related platform modules
  methods: string[]; // Field methods used

  // Evidence & Relationships
  relatedReports?: string[]; // IDs of related reports
  relatedAlerts?: string[]; // IDs of related alerts
  libraryTags?: string[]; // Tags for library categorization

  // Download & Access
  downloadUrl?: string; // PDF download link
  previewAvailable: boolean; // Whether preview/summary is public
  fileSize?: string; // e.g., "2.4 MB"

  // Provenance & Quality
  reviewedBy?: string; // Who reviewed (if applicable)
  reviewDate?: string; // When reviewed
  methodology: string; // Brief methodology description

  // Metadata
  lastUpdated: string;
  tags: string[];
}
