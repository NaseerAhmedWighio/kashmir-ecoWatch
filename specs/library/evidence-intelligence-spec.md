# Library: Evidence Intelligence System - Specification

## Overview

Transform the Library from a document listing into a **comprehensive evidence intelligence system** with district/module/evidence-type browsing, entity linking, methods/confidence tracking, source tagging, curated collections, and evidence cards with module integration.

---

## 1. Scope and Dependencies

### 1.1 In Scope

#### Browse by District
- District-based evidence navigation
- Evidence count per district
- District evidence profiles
- Filter by evidence type within district
- Cross-district comparative evidence

#### Browse by Module
- Module-specific evidence collections
- Evidence coverage by module
- Module evidence gaps identification
- Cross-module evidence linking

#### Browse by Evidence Type
- Standardized evidence taxonomy:
  - Scientific Studies (peer-reviewed)
  - Field Surveys (primary data)
  - Monitoring Reports (time-series)
  - Management Plans (policy/operational)
  - Assessments (evaluations)
  - Datasets (raw/processed data)
  - Maps & GIS (spatial data)
  - Atlases (comprehensive references)
  - EIAs (environmental impact)
  - Policy Documents (government/NGO)

#### Reports Tied to Entities
- Species-linked evidence
- Lake-linked evidence
- Wetland-linked evidence
- District-linked evidence
- Protected area-linked evidence
- Trail-linked evidence
- Multi-entity evidence

#### Methods and Source-Confidence Layer
- Methodology documentation
- Data collection methods
- Sample size/scope indicators
- Confidence scoring (0-100)
- Quality flags (high/medium/low/unverified)
- Verification status
- Peer review status

#### Official vs Academic vs Field Source Tags
- **Official**: Government agencies, statutory bodies
- **Academic**: Universities, research institutions
- **Field**: NGOs, community groups, citizen science
- **International**: UN bodies, international NGOs
- **Commercial**: Private sector reports

#### Collections
- Thematic collections (curated by topic)
- Geographic collections (by district/region)
- Temporal collections (by year/period)
- User-curated collections (future)
- Featured collections (editor's picks)

#### Evidence Cards with "Used In Module" Links
- Evidence card component
- Module usage indicators
- Entity linkage display
- Confidence/quality badges
- Citation information
- Download/access links

### 1.2 Out of Scope

- Full-text search within documents (Phase 2)
- Document upload/submission system (Phase 2)
- User collections (Phase 2)
- Citation management integration (Phase 2)
- DOI/identifier resolution (Phase 2)

### 1.3 External Dependencies

| Dependency | Owner | Status |
|------------|-------|--------|
| Report PDFs | Various | Hosted externally |
| DOIs | Crossref | Future integration |
| Citation export | Various formats | Manual implementation |

---

## 2. Key Decisions and Rationale

### 2.1 Evidence Type Taxonomy

**Decision:** 10 standardized evidence types with clear definitions.

**Types:**
1. **Scientific Study** - Peer-reviewed journal articles
2. **Field Survey** - Primary field data collection
3. **Monitoring Report** - Time-series monitoring data
4. **Management Plan** - Operational/conservation plans
5. **Assessment** - Evaluations, status assessments
6. **Dataset** - Raw or processed data
7. **Map & GIS** - Spatial data, shapefiles
8. **Atlas** - Comprehensive reference works
9. **EIA** - Environmental Impact Assessments
10. **Policy Document** - Government/NGO policy papers

**Rationale:**
- Covers all evidence types in platform
- Clear distinctions for filtering
- Aligns with academic/policy conventions
- Extensible for future types

### 2.2 Source Tagging System

**Decision:** 5 source categories with sub-categorization.

**Categories:**
- **Official** - J&K Govt, MoEFCC, CPCB, WII
- **Academic** - University of Kashmir, SKUAST, research institutes
- **Field** - WWF, WTI, local NGOs, community groups
- **International** - UNEP, IUCN, Wetlands International
- **Commercial** - Consulting firms, private sector

**Rationale:**
- Clear provenance tracking
- Helps assess credibility
- Enables source-based filtering
- Recognizes contribution diversity

### 2.3 Confidence Scoring

**Decision:** 0-100 confidence score with quality flags.

**Calculation:**
```
Confidence = (
  Peer Review (30) +
  Sample Size (20) +
  Methodology Rigor (25) +
  Recency (15) +
  Verification (10)
)
```

**Quality Flags:**
- **High** (80-100): Peer-reviewed, robust methods, recent
- **Medium** (50-79): Some review, adequate methods
- **Low** (20-49): Limited review, basic methods
- **Unverified** (0-19): Unreviewed, preliminary

**Rationale:**
- Transparent quality assessment
- Helps users evaluate evidence
- Encourages quality submissions
- Aligns with scientific practice

### 2.4 Entity Linking

**Decision:** Rich entity linking with metadata.

**Linked Entity Types:**
- Species (by slug)
- Water bodies (lakes, wetlands, rivers)
- Districts
- Protected areas
- Trails
- Habitats

**Link Metadata:**
- Relevance score (0-100)
- Link type (primary, secondary, mention)
- Context description

**Rationale:**
- Enables evidence discovery
- Supports module integration
- Provides context for evidence
- Facilitates cross-referencing

### 2.5 Collections Structure

**Decision:** Curated thematic collections with metadata.

**Collection Types:**
- **Thematic**: Wetlands, Climate, Forests, Springs
- **Geographic**: District-specific collections
- **Temporal**: Annual reports, decadal assessments
- **Featured**: Editor's picks, high-impact evidence

**Collection Metadata:**
- Curator (individual/organization)
- Description and scope
- Inclusion criteria
- Last updated date
- Item count

**Rationale:**
- Organizes evidence meaningfully
- Highlights important works
- Supports research workflows
- Enables targeted browsing

---

## 3. Interfaces and API Contracts

### 3.1 Enhanced Evidence Interface

```typescript
interface EvidenceItem {
  // Core Identity
  id: string;
  slug: string;
  title: string;
  evidenceType: EvidenceType;
  
  // Publication Details
  year: number;
  publicationDate?: string;
  authors: Author[];
  organization?: string;
  publisher?: string;
  
  // Content
  abstract: string;
  keywords: string[];
  methodology?: string;
  
  // Source & Confidence
  sourceCategory: SourceCategory;
  sourceTags: string[];
  confidenceScore: number;        // 0-100
  qualityFlag: QualityFlag;
  peerReviewed: boolean;
  verified: boolean;
  verifiedBy?: string;
  verificationDate?: string;
  
  // Entity Linking
  linkedEntities: LinkedEntity[];
  linkedDistricts: string[];
  linkedSpecies: string[];
  linkedWaterBodies: string[];
  linkedProtectedAreas: string[];
  linkedTrails: string[];
  linkedHabitats: string[];
  
  // Module Usage
  usedInModules: ModuleUsage[];
  
  // Collections
  collections: string[];          // Collection slugs
  
  // Access
  downloadUrl?: string;
  accessUrl?: string;
  doi?: string;
  citationFormat: string;
  
  // Metrics
  views: number;
  downloads: number;
  citations: number;
  
  // Metadata
  language: string;
  pages?: number;
  fileSize?: string;
  lastUpdated: string;
}

type EvidenceType = 
  | 'scientific-study'
  | 'field-survey'
  | 'monitoring-report'
  | 'management-plan'
  | 'assessment'
  | 'dataset'
  | 'map-gis'
  | 'atlas'
  | 'eia'
  | 'policy-document';

type SourceCategory = 
  | 'official'
  | 'academic'
  | 'field'
  | 'international'
  | 'commercial';

type QualityFlag = 'high' | 'medium' | 'low' | 'unverified';

interface Author {
  name: string;
  affiliation?: string;
  orcid?: string;
}

interface LinkedEntity {
  type: string;                 // 'species', 'lake', 'wetland', etc.
  slug: string;
  name: string;
  relevanceScore: number;       // 0-100
  linkType: 'primary' | 'secondary' | 'mention';
  context?: string;
}

interface ModuleUsage {
  module: string;               // 'biodiversity', 'water-systems', etc.
  page: string;                 // Specific page using evidence
  context: string;              // How evidence is used
  lastUsed: string;
}

interface Collection {
  id: string;
  slug: string;
  title: string;
  description: string;
  collectionType: 'thematic' | 'geographic' | 'temporal' | 'featured';
  curator: {
    name: string;
    organization?: string;
  };
  items: string[];              // Evidence slugs
  itemCount: number;
  inclusionCriteria?: string;
  lastUpdated: string;
  featured: boolean;
}
```

### 3.2 Data Access Functions

```typescript
// Evidence Browsing
getEvidenceByDistrict(district: string): EvidenceItem[]
getEvidenceByModule(module: string): EvidenceItem[]
getEvidenceByType(type: EvidenceType): EvidenceItem[]
getEvidenceBySourceCategory(category: SourceCategory): EvidenceItem[]

// Entity Linking
getEvidenceForSpecies(speciesSlug: string): EvidenceItem[]
getEvidenceForWaterBody(waterBodySlug: string): EvidenceItem[]
getEvidenceForProtectedArea(paSlug: string): EvidenceItem[]

// Collections
getCollections(): Collection[]
getCollectionBySlug(slug: string): Collection | null
getThematicCollections(): Collection[]
getFeaturedCollections(): Collection[]

// Search & Filter
searchEvidence(query: string, filters?: EvidenceFilters): EvidenceItem[]
getEvidenceByConfidence(minConfidence: number): EvidenceItem[]
getRecentEvidence(limit?: number): EvidenceItem[]

// Metrics
getEvidenceMetrics(): {
  total: number;
  byType: Record<EvidenceType, number>;
  bySource: Record<SourceCategory, number>;
  byQuality: Record<QualityFlag, number>;
}
```

---

## 4. Implementation Phases

### Phase 1: Data Model Enhancement (Week 1)
- Define EvidenceItem interface
- Migrate existing reports to new schema
- Add source tags and confidence scores

### Phase 2: District/Module/Evidence Browsing (Week 2)
- District browse UI
- Module browse UI
- Evidence type filter

### Phase 3: Entity Linking (Week 3)
- Rich entity linking
- Entity evidence cards
- Bidirectional links

### Phase 4: Methods/Confidence Layer (Week 4)
- Confidence scoring UI
- Quality flag display
- Methodology documentation

### Phase 5: Collections (Week 5)
- Collection browsing
- Thematic collections
- Featured collections

### Phase 6: Evidence Cards (Week 6)
- Evidence card component
- Module usage indicators
- Citation display

---

## 5. Acceptance Criteria

### District Browse
- [ ] All 16 districts have evidence pages
- [ ] Evidence count per district displayed
- [ ] Filter by evidence type works
- [ ] Cross-district comparison available

### Module Browse
- [ ] All modules have evidence collections
- [ ] Module evidence gaps identified
- [ ] Cross-module evidence linked

### Evidence Type
- [ ] 10 evidence types implemented
- [ ] Type filtering works
- [ ] Type definitions documented

### Entity Linking
- [ ] Species linking functional
- [ ] Water body linking functional
- [ ] District linking functional
- [ ] Multi-entity evidence supported

### Confidence Layer
- [ ] Confidence scores assigned
- [ ] Quality flags visible
- [ ] Methodology documented

### Collections
- [ ] Thematic collections created
- [ ] Featured collections displayed
- [ ] Collection browsing works

### Evidence Cards
- [ ] Cards display all metadata
- [ ] Module usage shown
- [ ] Citation format correct
- [ ] Download links work

---

## 6. Cross-Module Integration

### Biodiversity
- Species-linked evidence
- Conservation assessments
- Population studies

### Water Systems
- Lake/wetland studies
- Water quality reports
- Hydrological assessments

### Districts
- District profiles
- Development plans
- Socioeconomic studies

### Risk Monitoring
- Hazard assessments
- Incident reports
- Risk analyses

### Seasonal Ecology
- Phenology studies
- Migration research
- Climate assessments

### Protected Areas
- Management plans
- Biodiversity surveys
- Conservation assessments

---

## 7. Success Metrics

| Metric | Baseline | Target |
|--------|----------|--------|
| Evidence items catalogued | 50 | 500+ |
| Entity linking coverage | 20% | 80% |
| Collections created | 0 | 20+ |
| Average confidence score | N/A | >70 |
| Evidence views/month | N/A | 5000+ |
| Module integration | 2 modules | All modules |

---

## 8. Risk Analysis

| Risk | Impact | Mitigation |
|------|--------|------------|
| Incomplete metadata | Medium | Required fields, validation |
| Broken download links | Low | Regular link checking |
| Outdated evidence | Medium | Last updated tracking |
| Quality inconsistency | High | Confidence scoring, review |

---

## 9. Operational Readiness

### Curation
- Evidence review workflow
- Quality assessment protocol
- Metadata validation

### Updates
- Quarterly evidence additions
- Annual collection review
- Link checking monthly

### Documentation
- Evidence type definitions
- Source tagging guidelines
- Confidence scoring methodology
