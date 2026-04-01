# Community Alert Network - Specification

## Overview

**Community Alert Network** is a location-aware, community-verified field intelligence system that enables users to report, confirm, update, and resolve real-time environmental, hazard, mobility, and ecological alerts across Kashmir.

## Product Vision

Build a **shared, community-verified alert engine** that transforms Kashmir EcoWatch into a scientific, public-interest intelligence platform with real-time ground truth capabilities.

## Core Capabilities

1. **Alert Reporting**: Category-specific forms for hazard, environmental, biodiversity, mobility, and public safety alerts
2. **Community Verification**: Nearby users can confirm, update, or contradict alerts
3. **Confidence Scoring**: Algorithmic trust weighting based on contributor history and confirmation patterns
4. **Alert Lifecycle**: Automatic expiry, escalation, and resolution based on community signals
5. **Duplicate Detection**: Smart merging of similar reports to prevent map clutter
6. **Proximity Notifications**: Location-aware alerts for users moving toward affected areas
7. **Moderator Review**: Institutional escalation for high-impact events

## Alert Categories

### 1. Hazard Alerts
- Landslide, rockfall, avalanche risk, snow blockage, black ice
- Floodwater on road, river overflow, road collapse, bridge damage
- Wildfire smoke, fallen trees, severe low visibility

### 2. Environmental Alerts
- Illegal dumping, sewage discharge, chemical discharge
- Fish kill, bird mortality, algal bloom, water contamination
- Unusual foam/discoloration, forest degradation, fire outbreak, wetland encroachment

### 3. Biodiversity & Wildlife Alerts
- Wildlife crossing, injured/trapped animal, human-wildlife conflict
- Bird congregation, nesting disturbance, poaching suspicion
- Unusual migration, mass mortality, invasive species presence

### 4. Mobility & Access Alerts
- Route blocked, trail closure, tourist site restricted
- Permit/checkpoint active, heavy congestion, parking saturation
- Access timing restriction, unsafe route, damaged footpath, bridge unsafe

### 5. Public Safety Alerts
- Crowd surge, local emergency, rescue operation underway
- Unstable structure, public hazard, exposed wires
- Contamination zone, fire spread risk, unsafe water crossing

## Alert Data Model

### Core Fields
- **Identity**: id, category, subtype, title, description
- **Status**: severity, status, publicStatus, confidenceState, lifecycleStage
- **Location**: coordinates, district, address, route info (optional)
- **Timing**: timeObserved, createdAt, updatedAt, expiresAt
- **Scope**: visibilityScope, directionalRelevance
- **Evidence**: primaryEvidence, evidenceCount
- **Safety Context**: passable, blocked, dangerous, avoid area, pedestrian only
- **Reporter**: id, type, tier, anonymized flag
- **Confirmations**: stillActive, worsened, reduced, cleared, moved, incorrect, updates counts
- **Scoring**: confidenceScore (0-100), lastConfirmedAt
- **Expiry**: expiryCategory (fast/moving/medium/slow), isExpired
- **Moderation**: requiresModeration, moderationStatus, escalatedToInstitutions
- **Duplicates**: duplicateOf, mergedAlertIds

### Confirmation Actions
- **Still Active**: Condition persists (refreshes timestamp, extends window)
- **Worsened**: More severe (raises severity, escalates)
- **Reduced**: Less severe (lowers risk)
- **Cleared**: No longer present (moves toward resolved)
- **Moved Slightly**: Location shifted (adjusts map marker)
- **Incorrect Report**: Mistaken/false (decreases confidence)
- **Add Update**: New information (note, evidence, details)

## Confidence Scoring Model

### Confidence States
1. **Unverified** (0-25): Awaiting verification
2. **Early Community Signal** (25-50): Initial reports
3. **Community Confirmed** (50-75): Multiple confirmations
4. **Strongly Confirmed** (75-90): High confidence from multiple sources
5. **Institutionally Reviewed** (90-100): Verified by authorities
6. **Conflicted** (20-45): Contradicting reports
7. **Stale** (10-30): Not recently confirmed
8. **Resolved** (0-20): Issue cleared

### Score Calculation
- Base score from confirmation counts
- Weighted by contributor trust (0.3-1.0 multiplier)
- Time decay factor (older confirmations worth less)
- Contradiction penalty (incorrect/cleared reports)
- Diminishing returns for high volume (spam prevention)

### Trust Weighting
Contributor tiers with associated weights:
- New Contributor: 0.3
- Active Contributor: 0.5
- Reliable Contributor: 0.7
- Trusted Local Observer: 0.85
- Verified Volunteer: 0.9
- Partner Institutional Observer: 1.0

## Alert Lifecycle

1. **Submitted**: User creates alert → Status: Unverified
2. **Published**: Visible to nearby/relevant users
3. **Reconfirmed**: Community confirms → Status: Community Confirmed
4. **Intensified**: Condition worsens → Escalation triggered
5. **Resolved**: Cleared by multiple users → Status: Resolved
6. **Archived**: Historical record preserved

## Expiry Logic

### Fast-Moving Alerts (30min - 2hr)
- Congestion, animal crossing, smoke on road, route blockage
- Refresh threshold: 15min, Stale: 90min

### Medium Alerts (6 - 24hr)
- Landslide debris, trail closure, sewage discharge, fish mortality
- Refresh threshold: 2hr, Stale: 12hr

### Slow Ecological Alerts (24 - 72hr)
- Dumping site, habitat disturbance, encroachment, polluted outflow
- Refresh threshold: 6hr, Stale: 36hr

## Duplicate Detection

Two alerts are potential duplicates if:
- Same category and subtype
- Within 0.5km distance threshold
- Within 2hr time proximity
- Similar description (future: NLP similarity)

When duplicate detected:
- Prompt user: "Are you reporting this same active alert?"
- Options: Confirm existing | Create separate (if truly different)
- Merge evidence and confirmations

## Reconfirmation Prompt Logic

Prompt users for reconfirmation when:
- User is within defined radius (500m-3km based on context)
- User is moving toward alert zone
- Alert confidence is low or stale
- User is trusted contributor in that district
- User recently opened map/module nearby

Do NOT prompt when:
- Alert is expired or archived
- User is too far (unless moving toward)
- Alert already has strong confirmation

## Notification System

### Push Notification Triggers
- New high-severity alert within 2km
- Alert ahead on user's route
- Request to verify (trusted users)
- Alert status changed (cleared, worsened, escalated)

### Notification Channels
- In-app notifications (always)
- Push notifications (opt-in)
- Email (for subscribed districts/categories)
- SMS (critical emergencies only, opt-in)

## Safety Rules

### Platform Guidelines
- Report only when safe to do so
- No interaction while driving
- No confrontation for evidence
- Do not approach dangerous wildlife
- Do not enter hazard zones to verify
- No personal accusations or naming individuals
- No vigilantism language
- Sensitive reports may be blurred or delayed

### Disclaimer
All alerts are community-generated and should be verified independently. Platform is not liable for accuracy.

## User Flows

### Flow A: New Alert Submission
1. User taps "Community Alert Network"
2. Selects category (Hazard, Environmental, Biodiversity, Mobility, Public Safety)
3. Selects specific subtype
4. Pins location on map or uses current GPS
5. Adds severity, status, directional relevance
6. Writes description
7. Uploads evidence (photo/video/audio) - optional but encouraged
8. Selects reporter type and visibility scope
9. Submits → Alert created with "Unverified" status

### Flow B: Nearby User Reconfirmation
1. User receives notification or sees alert on map
2. Opens alert card
3. Reviews details (severity, confidence, evidence, time)
4. Taps quick action: Still Active | Worsened | Cleared | Add Update
5. Optionally adds note or evidence
6. Submits → Confidence score recalculated

### Flow C: Duplicate Interception
1. User attempts to create new alert
2. System detects similar nearby alert (same category, <0.5km, <2hr)
3. Shows prompt: "This may already be reported. View existing alert?"
4. User can:
   - View existing and confirm it
   - Create separate alert (with explanation)

### Flow D: Moderator Review
1. Alert flagged for moderation (high severity, sensitive category, low confidence + high impact)
2. Moderator receives notification
3. Reviews alert details, evidence, confirmations
4. Actions: Approve | Request more info | Flag as incorrect | Escalate to institution
5. Status updated accordingly

## Integration Points

### Within Kashmir EcoWatch

#### Contribute Module
- "Community Alert Network" as primary contribution option
- Quick report from homepage

#### Risk & Monitoring Module
- Live Alerts dashboard
- District risk profiles
- Alert statistics and trends
- Community verification leaderboard

#### Map/Atlas
- Alert layer toggle
- Clustered markers by category
- Filter by severity, confidence, time range

#### Districts
- District-specific alert feeds
- Local risk scores

#### Biodiversity, Water Systems, Trails
- Category-specific alert consumption
- Alert-driven monitoring campaigns

## Technical Architecture

### Frontend Components
- `AlertCard.tsx`: Display alert with confidence, actions
- `AlertReconfirmationSheet.tsx`: Bottom sheet for updates
- `AlertSubmissionForm.tsx`: Category-specific form
- `AlertMapLayer.tsx`: Leaflet map integration
- `AlertFilters.tsx`: Filter controls
- `AlertStats.tsx`: Dashboard widgets

### Backend Services (Planned)
- Alert CRUD API
- Confirmation processing
- Confidence scoring engine
- Duplicate detection service
- Notification dispatcher
- Moderation queue

### Database Schema (PostgreSQL + PostGIS)
```sql
-- Alerts table
CREATE TABLE alerts (
  id UUID PRIMARY KEY,
  category VARCHAR(50) NOT NULL,
  subtype VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  severity VARCHAR(20) NOT NULL,
  status VARCHAR(20) NOT NULL,
  public_status VARCHAR(30) NOT NULL,
  confidence_state VARCHAR(30) NOT NULL,
  confidence_score DECIMAL(5,2) NOT NULL,
  lifecycle_stage VARCHAR(20) NOT NULL,
  location GEOGRAPHY(POINT, 4326) NOT NULL,
  district VARCHAR(100) NOT NULL,
  address JSONB,
  time_observed TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  visibility_scope VARCHAR(30) NOT NULL,
  directional_relevance VARCHAR(30) NOT NULL,
  safety_context JSONB,
  reporter_id UUID NOT NULL,
  reporter_type VARCHAR(30) NOT NULL,
  reporter_tier VARCHAR(50) NOT NULL,
  requires_moderation BOOLEAN DEFAULT FALSE,
  moderation_status VARCHAR(20),
  escalated_to_institutions BOOLEAN DEFAULT FALSE,
  duplicate_of UUID,
  merged_alert_ids UUID[],
  tags TEXT[],
  EXCLUDE USING gist (location WITH &&) WHERE (public_status != 'archived')
);

-- Alert confirmations table
CREATE TABLE alert_confirmations (
  id UUID PRIMARY KEY,
  alert_id UUID NOT NULL REFERENCES alerts(id),
  user_id UUID NOT NULL,
  action_type VARCHAR(30) NOT NULL,
  note TEXT,
  evidence JSONB,
  severity_adjustment VARCHAR(20),
  location_adjustment GEOGRAPHY(POINT, 4326),
  created_at TIMESTAMPTZ NOT NULL,
  trust_weight DECIMAL(3,2) NOT NULL
);

-- Contributor profiles table
CREATE TABLE contributor_profiles (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  role_type VARCHAR(30) NOT NULL,
  tier VARCHAR(50) NOT NULL,
  trust_score DECIMAL(5,2) NOT NULL,
  district_affinity JSONB,
  verification_status VARCHAR(20) NOT NULL,
  institutional_affiliation VARCHAR(255),
  report_history JSONB,
  joined_at TIMESTAMPTZ NOT NULL,
  last_active_at TIMESTAMPTZ NOT NULL
);

-- Alert subscriptions table
CREATE TABLE alert_subscriptions (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  district VARCHAR(100) NOT NULL,
  categories TEXT[] NOT NULL,
  radius_km DECIMAL(5,2) NOT NULL,
  notification_preference JSONB,
  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL
);
```

## Acceptance Criteria

### Alert Submission
- [ ] User can select from 5 categories with appropriate subtypes
- [ ] Location pinning works on mobile and desktop
- [ ] Evidence upload supports photo, video, audio
- [ ] Form validates required fields before submission
- [ ] Alert created with correct initial state (Unverified)

### Alert Display
- [ ] Alert card shows all key metadata (severity, confidence, time, distance)
- [ ] Confidence indicator uses correct color and label
- [ ] Quick actions are visible and functional
- [ ] Safety context badges display correctly
- [ ] Expiry warning shows when <30min remaining

### Reconfirmation
- [ ] User can select from 7 confirmation actions
- [ ] Note required for Moved/Incorrect/Add Update actions
- [ ] Evidence upload works in reconfirmation flow
- [ ] Confidence score updates correctly after submission
- [ ] Alert status transitions follow rules

### Duplicate Detection
- [ ] System detects potential duplicates within 0.5km and 2hr
- [ ] User prompted to view existing alert
- [ ] User can confirm existing or create separate with explanation

### Expiry Logic
- [ ] Alerts expire based on category configuration
- [ ] Stale alerts marked appropriately
- [ ] Expired alerts removed from live feed but archived

### Trust Scoring
- [ ] Contributor trust score calculated from history
- [ ] Tier assigned based on score and activity
- [ ] Trust weight applied to confirmations

## Out of Scope (Phase 2+)

- Real-time WebSocket updates
- Advanced NLP for duplicate detection
- Machine learning for confidence scoring
- Cross-platform alert sharing
- SMS notification integration
- Multi-language support
- Offline mode
- Advanced analytics dashboard

## Success Metrics

- **Alerts Created**: Target 50+ per week in first month
- **Confirmation Rate**: >40% of alerts receive community confirmation
- **Time to Confirmation**: Median <30 minutes for high-traffic areas
- **Duplicate Rate**: <15% of submissions are duplicates
- **User Retention**: 30% of alert creators submit again within 2 weeks
- **Confidence Accuracy**: >85% of "Community Confirmed" alerts validated by moderators

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| False/malicious reports | High | Trust scoring, contradiction handling, moderation queue |
| Low participation in rural areas | Medium | Partner with local volunteers, institutions |
| Alert fatigue from notifications | Medium | Smart filtering, user preferences, rate limiting |
| Privacy concerns | Medium | Anonymization options, blurred locations for sensitive reports |
| Legal liability | High | Clear disclaimers, community-generated content labeling |

## Future Enhancements

1. **AI-Assisted Validation**: Image recognition for evidence verification
2. **Predictive Alerts**: Pattern detection for recurring hazards
3. **Emergency Integration**: Direct link to disaster response authorities
4. **Gamification**: Badges, leaderboards for top contributors
5. **Multi-Platform**: Mobile app with background location alerts
6. **API Access**: Third-party integration for tourism, transport apps

## Detailed Alert Subtypes by Category

### Hazard Alert Smart Fields
- Road width affected (one_lane / both_lanes)
- Water depth estimate (cm/meters)
- Debris size (small/medium/large)
- Snow depth estimate
- Moving slope risk (low/medium/high/critical)
- Emergency response present (yes/no)

### Environmental Alert Smart Fields
- Water color changed (yes/no, color description)
- Smell present (yes/no, type)
- Dead fish visible (count estimate)
- Foam visible (yes/no, extent)
- Dumping ongoing or old (ongoing/historical)
- Smoke density (light/moderate/heavy)
- Area affected estimate (sq meters)

### Wildlife Alert Smart Fields
- Species known or unknown
- Count estimate
- Status: alive / injured / dead
- Moving / stationary
- Immediate risk to people? (yes/no)
- Immediate risk to animal? (yes/no)

### Mobility Alert Smart Fields
- Route still open? (yes/no/partial)
- Expected delay (minutes)
- Entry restricted? (yes/no)
- Permit check active? (yes/no)
- Parking full? (yes/no)
- Trail condition (good/fair/poor/closed)
- Tourists being turned back? (yes/no)

## Reconfirmation Model - Detailed Behavior

### System Effects by Action Type

| Action | Confidence Effect | Status Effect | Notification |
|--------|------------------|---------------|--------------|
| Still Active | +10-20 points | Extends active window | Refresh timestamp |
| Worsened | +15-25 points | May escalate severity | Ping moderators if critical |
| Reduced | +5-10 points | May lower severity | Update watchers |
| Cleared | -20-40 points | Moves toward resolved | Notify subscribers |
| Moved Slightly | +10 points | Updates location | Show movement trail |
| Incorrect Report | -30-50 points | May hide if conflicted | Review reporter trust |
| Add Update | +5-15 points | Enriches data | Show new evidence |

### Conflict Handling Rules

When conflicting inputs arrive:
1. Label alert as **Conflicted** if confidence drops below 40
2. Keep visible with caution badge
3. Request additional confirmations from trusted users
4. Show latest evidence prominently
5. Display message: "Recent reports conflict. Last active confirmation X min ago"

## Notification Delivery Logic

### Who Gets Alerted

| User Type | Trigger | Radius | Priority |
|-----------|---------|--------|----------|
| Physically Near | New alert | 500m-2km | High |
| Moving Toward | Alert on route | Route-based | High |
| Module Subscriber | New in category | District-wide | Medium |
| Trusted Local | Verification request | 1-3km | Medium |
| General User | High severity only | 2-5km | Low |

### Radius by Alert Type

- **Road alerts**: 500m - 3km (speed context dependent)
- **Trail alerts**: 100m - 1km
- **Wildlife alerts**: 200m - 800m (narrower to avoid crowding)
- **Pollution/water**: District or watershed-based

## Alert Card - Complete Anatomy

Each alert card displays:
- Alert type icon (category-colored)
- Title (auto-generated: category + location)
- Distance from user (dynamic)
- Time since last confirmation
- Severity badge (color-coded)
- Confidence level (visual indicator + label)
- Status indicator
- Evidence count badge
- Safety context badges (blocked, dangerous, passable)
- Quick action buttons (Still Active, Worsened, Cleared, Add Update)
- Expiry warning if <30min remaining

## Public-Facing Statuses

Use clean, user-friendly states:
- **Reported**: Awaiting verification
- **Needs Verification**: Early stage
- **Community Confirmed**: Multiple confirmations
- **Actively Changing**: Recent updates
- **Conflicted**: Contradicting reports
- **Reduced**: Condition improved
- **Cleared**: No longer present
- **Resolved**: Fully resolved
- **Archived**: Historical record

## Moderator Escalation Rules

Alerts requiring moderator review:
- Major landslide
- Avalanche risk
- Mass mortality event
- Pollution discharge (industrial)
- Fire outbreak
- Bridge collapse
- Sensitive wildlife incident
- Widespread flooding

Moderator Actions:
- Approve and boost visibility
- Request more information
- Flag as incorrect
- Escalate to institutional partner
- Merge with duplicate
- Adjust severity/confidence
