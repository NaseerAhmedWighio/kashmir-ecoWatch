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
