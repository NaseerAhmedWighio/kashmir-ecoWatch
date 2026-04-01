# Risk & Monitoring: Operational Command Center - Specification

## Overview

Transform the Risk & Monitoring module from a category gateway into a **real operational command center** with live risk snapshots, district watch leaderboards, hotspot corridors, live incident feeds, escalation logic, response readiness tracking, and emergency playbooks.

---

## 1. Scope and Dependencies

### 1.1 In Scope

#### Active Risk Snapshot
- Unified risk dashboard showing all active risks
- Risk score by category (Hazard, Pollution, Biodiversity, Response)
- Trend indicators (increasing/stable/decreasing)
- 24-hour change summary
- Critical incidents count
- Districts under watch count
- Alert age distribution

#### District Watch Leaderboard
- Ranked district list by overall risk score
- Category-specific rankings (pollution, biodiversity, hazards)
- Week-over-week change
- Hotspot identification
- Watch list status (Normal/Elevated/High/Critical)
- Response capacity indicator

#### Hotspot Corridors
- Wildlife conflict corridors
- Pollution concentration zones
- Mortality clustering areas
- Multi-hazard overlap zones
- Critical infrastructure exposure
- Evacuation route vulnerability

#### Live Incident Feed
- Real-time incident stream
- Incident categorization (Hazard/Pollution/Biodiversity/Response)
- Severity-coded display
- Time-ago updates
- Auto-refresh capability
- Filter by district/category/severity
- Incident timeline view

#### Alert Severity / Status / Update Age
- Enhanced alert classification
- Severity levels: Critical/High/Moderate/Low
- Status tracking: Active/Monitoring/Resolved/Closed
- Update age tracking (last updated X hours ago)
- Stale alert flagging (>7 days without update)
- Auto-resolution rules

#### Watch Lists (Lake/Wetland/District)
- Lake watch status (Normal/Elevated/Critical)
- Wetland watch status
- District watch status
- Watch criteria definition
- Watch list history
- Escalation triggers

#### Escalation Logic
- Automated escalation rules
- Severity-based escalation
- Age-based escalation (stale incidents)
- Multi-incident escalation
- Cross-category escalation
- Notification triggers
- Escalation history tracking

#### Response Readiness Layer
- Infrastructure readiness scoring
- Shelter capacity tracking
- Emergency route status
- Response team availability
- Equipment readiness
- Communication system status
- Readiness trends

#### Response Playbooks / Emergency Intelligence
- Standard Operating Procedures (SOPs)
- Category-specific playbooks
- Escalation matrices
- Contact directories
- Resource allocation guides
- Decision trees
- Post-incident review templates

#### Expanded Monitoring Coverage
All existing modules enhanced with:
- Air Pollution (AQI, PM2.5, PM10, trends)
- Water Pollution (WQI, contamination, sources)
- Noise Pollution (dB levels, hotspots, trends)
- Soil Pollution (contamination, land use impact)
- Climate Change (temperature, precipitation, extremes)
- Global Warming Impacts (ecosystem response, glaciers)
- Algal Bloom Monitoring (bloom status, coverage, toxicity)
- Red Data Species Vulnerability (population trends, threats)
- Human-Wildlife Conflict (incidents, depredation, compensation)
- Wildlife Mortality (causes, locations, trends)
- Fish Kill Monitoring (oxygen, temperature, causes)
- Bird Migration (counts, timing, anomalies)
- Bird Mortality (causes, clustering, disease)
- Ecosystem Stress (multi-system indicators)

### 1.2 Out of Scope

- Emergency dispatch system
- First responder coordination
- Real-time sensor integration (Phase 2)
- Public warning system (sirens, SMS)
- Resource procurement system

### 1.3 External Dependencies

| Dependency | Owner | Status |
|------------|-------|--------|
| IMD Weather Data | India Meteorological Dept | API available |
| CPCB Air Quality | Central Pollution Control Board | API available |
| JK Pollution Control Board | State Agency | Data sharing MOU needed |
| Wildlife Incident Reports | J&K Wildlife Dept | Manual reporting |
| Hospital Admission Data | Health Dept | Future integration |
| Traffic Incident Data | Traffic Police | Future integration |

---

## 2. Key Decisions and Rationale

### 2.1 Risk Scoring Framework

**Decision:** Use 0-100 composite risk score with 4 categories.

**Formula:**
```
Overall Risk = (
  Hazard Risk × 0.30 +
  Pollution Risk × 0.25 +
  Biodiversity Risk × 0.25 +
  Response Readiness × 0.20 [inverted]
)

Category Risk = Weighted average of sub-category scores
```

**Rationale:**
- Balanced weighting across risk types
- Response readiness as mitigating factor
- Comparable to international risk indices
- Easy to communicate to stakeholders

### 2.2 Escalation Matrix

**Decision:** 4-tier escalation with time-based and severity-based triggers.

**Levels:**
1. **Level 1 (Monitoring)** - Routine monitoring, no action required
2. **Level 2 (Elevated)** - Increased monitoring, prepare response
3. **Level 3 (High)** - Active response, notify stakeholders
4. **Level 4 (Critical)** - Emergency response, full activation

**Triggers:**
- Severity: Critical incidents auto-escalate to Level 3+
- Age: Incidents >7 days without update escalate one level
- Multiplicity: 3+ incidents in same category escalate one level
- Cross-category: Incidents in 3+ categories trigger coordination

### 2.3 Watch List Criteria

**Decision:** Clear criteria for watch list placement.

**Lake Watch Criteria:**
- Normal: WQI >70, no blooms, normal levels
- Elevated: WQI 50-70, minor blooms, slight level changes
- Critical: WQI <50, active bloom, flooding/drought

**District Watch Criteria:**
- Normal: Overall risk <40, no critical incidents
- Elevated: Overall risk 40-60, 1-2 high severity incidents
- High: Overall risk 60-80, 3+ high severity incidents
- Critical: Overall risk >80, any critical incident

### 2.4 Response Readiness Scoring

**Decision:** Measure readiness across 6 dimensions.

**Dimensions:**
1. Infrastructure (hospitals, shelters, facilities)
2. Personnel (response teams, training levels)
3. Equipment (vehicles, communications, PPE)
4. Supplies (medical, food, water, fuel)
5. Communication (systems, redundancy)
6. Coordination (inter-agency, protocols)

### 2.5 Playbook Structure

**Decision:** Standardized playbook format for all incident types.

**Sections:**
1. Incident classification
2. Initial assessment checklist
3. Notification matrix (who to call)
4. Response actions (step-by-step)
5. Resource requirements
6. Escalation criteria
7. De-escalation criteria
8. Post-incident review

---

## 3. Interfaces and API Contracts

### 3.1 New Data Models

#### Active Risk Snapshot
```typescript
interface ActiveRiskSnapshot {
  timestamp: string;
  overallRiskScore: number;     // 0-100
  riskByCategory: {
    hazard: number;
    pollution: number;
    biodiversity: number;
    response: number;           // Inverted (higher = better readiness)
  };
  trend: {
    overall: 'increasing' | 'stable' | 'decreasing';
    hazard: 'increasing' | 'stable' | 'decreasing';
    pollution: 'increasing' | 'stable' | 'decreasing';
    biodiversity: 'increasing' | 'stable' | 'decreasing';
  };
  last24Hours: {
    newIncidents: number;
    resolvedIncidents: number;
    escalatedIncidents: number;
    criticalIncidents: number;
  };
  districtsUnderWatch: number;
  alertAgeDistribution: {
    <1day: number;
    1-3days: number;
    3-7days: number;
    >7days: number;
  };
}
```

#### District Watch Entry
```typescript
interface DistrictWatchEntry {
  district: string;
  rank: number;                 // 1-16
  overallRiskScore: number;
  watchStatus: 'normal' | 'elevated' | 'high' | 'critical';
  weekOverWeekChange: number;   // Score change
  categoryScores: {
    hazard: number;
    pollution: number;
    biodiversity: number;
  };
  activeIncidents: number;
  criticalIncidents: string[];  // Incident slugs
  hotspotCorridors: string[];   // Corridor names
  responseCapacity: 'adequate' | 'stretched' | 'overwhelmed';
  lastUpdated: string;
}
```

#### Hotspot Corridor
```typescript
interface HotspotCorridor {
  id: string;
  name: string;
  type: 'wildlife-conflict' | 'pollution' | 'mortality' | 'multi-hazard';
  severity: 'moderate' | 'high' | 'critical';
  location: {
    districts: string[];
    coordinates: { lat: number; lng: number }[];
  };
  characteristics: {
    length: number;             // km
    width: number;              // km
    area: number;               // km²
  };
  riskFactors: string[];
  affectedEntities: {
    species?: string[];
    infrastructure?: string[];
    communities?: string[];
  };
  incidents: {
    last30Days: number;
    last90Days: number;
    lastYear: number;
  };
  mitigationMeasures: string[];
  monitoringStatus: 'active' | 'periodic' | 'inactive';
}
```

#### Live Incident
```typescript
interface LiveIncident {
  id: string;
  slug: string;
  category: 'hazard' | 'pollution' | 'biodiversity' | 'response';
  subcategory: string;          // e.g., 'flood', 'air-quality', 'hwc'
  severity: 'critical' | 'high' | 'moderate' | 'low';
  status: 'active' | 'monitoring' | 'resolved' | 'closed';
  escalationLevel: 1 | 2 | 3 | 4;
  
  title: string;
  description: string;
  location: {
    district: string;
    specificLocation: string;
    coordinates?: { lat: number; lng: number };
  };
  
  timeline: {
    reported: string;           // ISO timestamp
    verified: string;
    lastUpdated: string;
    resolved?: string;
  };
  
  impact: {
    affectedArea?: string;      // km²
    affectedPopulation?: number;
    casualties?: number;
    economicLoss?: number;      // INR
  };
  
  response: {
    teamsDeployed: number;
    resourcesAllocated: string[];
    actionsTaken: string[];
    nextSteps: string[];
  };
  
  alerts: {
    sent: boolean;
    recipients: string[];
    channels: string[];
  };
  
  relatedEntities: {
    waterBody?: string;
    protectedArea?: string;
    trail?: string;
    species?: string;
  };
}
```

#### Escalation Rule
```typescript
interface EscalationRule {
  id: string;
  name: string;
  trigger: {
    type: 'severity' | 'age' | 'multiplicity' | 'cross-category';
    condition: string;          // e.g., 'severity == critical'
    threshold?: number;
  };
  action: {
    escalateTo: 1 | 2 | 3 | 4;
    notify: string[];           // Roles to notify
    actions: string[];          // Automated actions
  };
  active: boolean;
}
```

#### Response Playbook
```typescript
interface ResponsePlaybook {
  id: string;
  incidentType: string;         // Matches incident subcategory
  version: string;
  lastUpdated: string;
  
  classification: {
    categories: string[];
    severityLevels: ('low' | 'moderate' | 'high' | 'critical')[];
  };
  
  initialAssessment: {
    checklist: string[];
    requiredInformation: string[];
    timeLimit: number;          // minutes
  };
  
  notificationMatrix: {
    level1: string[];           // Roles for Level 1
    level2: string[];
    level3: string[];
    level4: string[];
  };
  
  responseActions: {
    immediate: string[];        // First 2 hours
    shortTerm: string[];        // 2-24 hours
    mediumTerm: string[];       // 1-7 days
    longTerm: string[];         // 7+ days
  };
  
  resources: {
    teams: string[];
    equipment: string[];
    facilities: string[];
  };
  
  escalationCriteria: string[];
  deEscalationCriteria: string[];
  
  postIncident: {
    reviewRequired: boolean;
    reportingRequirements: string[];
    lessonsLearned: boolean;
  };
}
```

### 3.2 Data Access Functions

```typescript
// Risk Snapshot
getActiveRiskSnapshot(): ActiveRiskSnapshot
getRiskTrend(days: number): { date: string; score: number }[]

// District Watch
getDistrictWatchLeaderboard(): DistrictWatchEntry[]
getDistrictWatchStatus(district: string): DistrictWatchEntry
getWatchListChanges(lastDays: number): DistrictWatchEntry[]

// Hotspot Corridors
getHotspotCorridors(type?: string): HotspotCorridor[]
getCorridorIncidents(corridorId: string): LiveIncident[]
getCorridorMitigationStatus(corridorId: string): string

// Live Incidents
getLiveIncidents(filters?: IncidentFilters): LiveIncident[]
getIncidentBySlug(slug: string): LiveIncident
submitIncident(incident: Partial<LiveIncident>): string
updateIncidentStatus(slug: string, status: string): void
escalateIncident(slug: string, level: number): void

// Watch Lists
getLakeWatchList(): WatchEntry[]
getWetlandWatchList(): WatchEntry[]
getWatchCriteria(entityType: string): WatchCriteria

// Escalation
getEscalationRules(): EscalationRule[]
evaluateEscalation(incident: LiveIncident): EscalationRule[]
getEscalationHistory(incidentSlug: string): EscalationEntry[]

// Response Readiness
getResponseReadinessScore(district?: string): number
getReadinessByCategory(): ReadinessCategory[]
getReadinessTrend(days: number): { date: string; score: number }[]

// Playbooks
getResponsePlaybook(incidentType: string): ResponsePlaybook
getAllPlaybooks(): ResponsePlaybook[]
getPlaybookSections(playbookId: string): PlaybookSection[]
```

---

## 4. Implementation Phases

### Phase 1: Active Risk Snapshot (Week 1)
- Unified risk dashboard component
- Risk score calculation engine
- Trend analysis functions
- 24-hour summary display
- Alert age distribution

### Phase 2: District Watch Leaderboard (Week 2)
- District risk scoring
- Ranking algorithm
- Watch status assignment
- Week-over-week comparison
- Response capacity indicator

### Phase 3: Hotspot Corridors (Week 3)
- Corridor identification logic
- Multi-hazard overlap analysis
- Corridor risk scoring
- Mitigation tracking
- Map visualization

### Phase 4: Live Incident Feed (Week 4)
- Real-time incident stream
- Incident CRUD operations
- Filtering and search
- Timeline view
- Auto-refresh

### Phase 5: Escalation Logic (Week 5)
- Rule engine implementation
- Automated escalation
- Notification triggers
- Escalation history
- Override capability

### Phase 6: Response Readiness (Week 6)
- Readiness scoring system
- Infrastructure tracking
- Resource availability
- Team readiness
- Trend analysis

### Phase 7: Response Playbooks (Week 7)
- Playbook authoring
- SOP templates
- Notification matrices
- Decision trees
- Post-incident reviews

---

## 5. Acceptance Criteria

### Active Risk Snapshot
- [ ] Overall risk score updates in real-time
- [ ] Category breakdown visible
- [ ] Trends display correctly
- [ ] 24-hour summary accurate
- [ ] Alert age distribution correct

### District Watch Leaderboard
- [ ] All 16 districts ranked
- [ ] Watch status assigned correctly
- [ ] Week-over-week change calculated
- [ ] Response capacity accurate
- [ ] Filtering by status works

### Hotspot Corridors
- [ ] All corridor types identified
- [ ] Risk factors documented
- [ ] Incident counts accurate
- [ ] Mitigation measures tracked
- [ ] Map display functional

### Live Incident Feed
- [ ] Incidents display in real-time
- [ ] Filtering works correctly
- [ ] Severity coding accurate
- [ ] Time-ago updates work
- [ ] Auto-refresh functional

### Escalation Logic
- [ ] Rules evaluate correctly
- [ ] Automated escalation works
- [ ] Notifications sent
- [ ] History tracked
- [ ] Override functional

### Response Playbooks
- [ ] All incident types covered
- [ ] SOPs complete
- [ ] Notification matrices accurate
- [ ] Decision trees clear
- [ ] Post-incident templates ready

---

## 6. Cross-Module Integration

### Water Systems
- Lake/wetland watch integration
- Water quality alerts
- Algal bloom linkage
- Flood risk coordination

### Biodiversity
- Species vulnerability alerts
- Mortality event tracking
- Conflict incident linkage
- Migration monitoring

### Districts
- District risk profiles
- Response capacity tracking
- Watch list integration
- Local contact directories

### Protected Areas
- PA-specific alerts
- Corridor monitoring
- Conflict tracking
- Infrastructure readiness

### Trails & Sightings
- Trail closure alerts
- Sighting anomaly detection
- Field incident reporting
- Evacuation route status

### Seasonal Ecology
- Seasonal risk patterns
- Bloom/fire correlation
- Migration conflict prediction
- Climate window risks

---

## 7. Success Metrics

| Metric | Baseline | Target |
|--------|----------|--------|
| Active incidents tracked | 10 | 100+ |
| Average response time | N/A | <2 hours |
| Escalation accuracy | N/A | >95% |
| Playbook coverage | 0% | 100% |
| District readiness score | N/A | >70 |
| Alert freshness (<24h) | 60% | >90% |
| User engagement | 2:00 | 8:00 |

---

## 8. Risk Analysis

| Risk | Impact | Mitigation |
|------|--------|------------|
| Alert fatigue | High | Smart filtering, tiered notifications |
| False positives | Medium | Verification workflow, confidence scoring |
| System overload | Low | Rate limiting, pagination |
| Data staleness | Medium | Auto-flagging, escalation rules |
| Coordination gaps | High | Clear playbooks, regular drills |

---

## 9. Operational Readiness

### Monitoring
- Incident tracking: Real-time
- Risk score updates: Every 15 minutes
- Readiness assessment: Daily
- Playbook review: Quarterly

### Training
- Command center operator training
- Playbook familiarization
- Escalation protocol training
- Communication system training

### Documentation
- System operation manual
- Playbook authoring guide
- Escalation matrix documentation
- Contact directory maintenance
