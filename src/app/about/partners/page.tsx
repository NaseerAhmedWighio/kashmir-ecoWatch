'use client';

import React, { useState } from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Users, Globe, Heart, ArrowRight, Mail, MapPin, Building2,
  GraduationCap, Shield, Leaf, Database, Activity, BarChart3, Eye,
  ChevronDown, ChevronUp, CheckCircle2, Upload, FileText,
  ExternalLink, MessageSquare, Siren, Binoculars, Layers,
  CheckCircle, AlertTriangle, Search, Clock, Target, Zap
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

// ─── Data ────────────────────────────────────────────────────────────────────

const VALUE_CARDS = [
  { icon: Shield, title: 'Institutional Grounding', desc: 'Formal partnerships with departments, universities, labs, and environmental authorities that provide structural credibility and data access.', color: 'from-blue-500 to-cyan-600', iconColor: 'text-blue-400' },
  { icon: GraduationCap, title: 'Scientific Review', desc: 'Expert contributors and affiliated professionals who validate findings, review methodology, and advise on sensitive ecological matters.', color: 'from-violet-500 to-purple-600', iconColor: 'text-violet-400' },
  { icon: MapPin, title: 'Field Intelligence', desc: 'District-level observation, community documentation, geotagged evidence, and grassroots environmental monitoring across Kashmir.', color: 'from-emerald-500 to-teal-600', iconColor: 'text-emerald-400' },
  { icon: Eye, title: 'Responsible Public Publication', desc: 'All contributions undergo review, classification, and sensitivity assessment before publication to protect ecological interests and maintain trust.', color: 'from-amber-500 to-orange-600', iconColor: 'text-amber-400' },
];

const TRUSTED_NETWORK = [
  { name: 'Dr. Kumar Foundation USA', type: 'Institution', domain: 'Institutional Support', geography: 'United States', role: 'Primary Supporter', badge: 'Supporting Institution' },
  { name: 'University of Kashmir — Environmental Science', type: 'Institution', domain: 'Environmental Research', geography: 'Srinagar, Kashmir', role: 'Academic Collaboration', badge: 'Research Partner' },
  { name: 'SKUAST-Kashmir', type: 'Institution', domain: 'Agricultural & Environmental Sciences', geography: 'Kashmir', role: 'Research & Data Contribution', badge: 'Research Partner' },
  { name: 'J&K Pollution Control Committee', type: 'Authority', domain: 'Environmental Governance', geography: 'Jammu & Kashmir', role: 'Authority Reference', badge: 'Government Authority' },
  { name: 'J&K Lake Conservation & Management Authority', type: 'Authority', domain: 'Lake & Wetland Management', geography: 'Srinagar, Kashmir', role: 'Authority Reference', badge: 'Government Authority' },
  { name: 'NASA Earthdata', type: 'Global System', domain: 'Earth Observation', geography: 'Global', role: 'Reference System', badge: 'Global Reference' },
  { name: 'ICIMOD', type: 'Regional System', domain: 'Mountain & Himalayan Knowledge', geography: 'South Asia', role: 'Regional Knowledge', badge: 'Regional Reference' },
  { name: 'GBIF — Global Biodiversity Information Facility', type: 'Global System', domain: 'Biodiversity Data', geography: 'Global', role: 'Biodiversity Reference', badge: 'Global Reference' },
];

const ONBOARDING_PATHS = [
  { icon: Building2, title: 'Institutional Partner Onboarding', desc: 'For departments, universities, laboratories, NGOs, environmental bodies, observatories, technical institutions, and formal organizations.', route: '#institutional-form', color: 'from-blue-500 to-cyan-600' },
  { icon: Users, title: 'Individual Expert Onboarding', desc: 'For affiliated professionals, retired officials, retired scientists, private specialists, independent experts, and qualified field contributors.', route: '#expert-form', color: 'from-violet-500 to-purple-600' },
  { icon: Leaf, title: 'Field & Community Participation', desc: 'For district groups, local monitoring contributors, citizen-science networks, observation teams, and ecological documentation support.', route: '#community', color: 'from-emerald-500 to-teal-600' },
  { icon: Globe, title: 'Strategic & Technical Collaboration', desc: 'For geospatial systems, Earth observation partners, data-processing collaborators, technical infrastructure support, and specialized environmental intelligence.', route: '#strategic', color: 'from-indigo-500 to-blue-600' },
];

const COLLAB_STEPS = [
  { step: 1, title: 'Apply or Express Interest', desc: 'Submit an institutional or individual application through the appropriate onboarding pathway.' },
  { step: 2, title: 'Review and Classification', desc: 'Your application is reviewed for role fit, domain relevance, and contribution type.' },
  { step: 3, title: 'Verification and Capability Assessment', desc: 'Credentials, institutional status, and data capability are assessed where applicable.' },
  { step: 4, title: 'Role Activation', desc: 'Approved contributors are assigned a role and participation pathway within the platform.' },
  { step: 5, title: 'Ongoing Contribution and Visibility', desc: 'Active contributors may receive public visibility, directory listing, and structured participation channels.' },
];

const PARTICIPATION_STANDARDS = [
  { icon: Shield, title: 'Scientific Integrity', desc: 'All contributions must meet evidence-based standards and methodological quality expectations.' },
  { icon: Target, title: 'Role Clarity', desc: 'Contributors must clearly define their capacity, authorization level, and intended participation scope.' },
  { icon: FileText, title: 'Evidence & Methodological Quality', desc: 'Data, reports, and submissions should follow structured formats and source transparency.' },
  { icon: Eye, title: 'Responsible Publication', desc: 'Not all contributions are published immediately. Review, classification, and sensitivity assessment apply.' },
  { icon: MapPin, title: 'Regional Grounding', desc: 'Contributions should maintain relevance to Kashmir\'s environmental context and ecological realities.' },
  { icon: Shield, title: 'Sensitivity and Privacy', desc: 'Sensitive ecological information, species locations, and vulnerable data may be restricted or generalized.' },
];

const INSTITUTION_TYPES = [
  'Government department or authority',
  'University or academic institution',
  'Research unit or lab',
  'NGO or civil society organization',
  'Technical or GIS institution',
  'Monitoring network or observatory',
  'Environmental or conservation body',
  'Strategic support institution',
  'Other formal entity',
];

const COLLABORATION_INTENTS = [
  'Institutional support',
  'Data contribution',
  'Scientific review',
  'Field verification',
  'Monitoring collaboration',
  'Geospatial support',
  'Public participation support',
  'Capacity building',
  'Strategic partnership',
];

const DOMAIN_EXPERTISE = [
  'Biodiversity',
  'Water systems',
  'Wetlands and lakes',
  'Rivers and watersheds',
  'Pollution',
  'Forest ecology',
  'Climate and cryosphere',
  'GIS and remote sensing',
  'Hazard and risk',
  'Environmental health',
  'Policy and governance',
];

const EXPERT_CAPACITY = [
  'Affiliated professional',
  'Retired expert',
  'Independent specialist',
  'Private consultant',
  'Field knowledge contributor',
  'Citizen-science contributor',
  'Technical expert',
  'District-level subject expert',
];

const EXPERT_DOMAINS = [
  'Hydrology',
  'Wetlands',
  'Lake ecology',
  'Biodiversity',
  'Wildlife',
  'Forest ecology',
  'Pollution',
  'GIS and remote sensing',
  'Hazard interpretation',
  'Environmental planning',
  'Policy and law',
  'Ecological documentation',
];

const EXPERT_CONTRIBUTION_MODES = [
  'Scientific review',
  'Advisory support',
  'Field verification',
  'Technical review',
  'Geospatial interpretation',
  'Ecological documentation',
  'Historical context',
  'Mentorship',
];

const VISIBILITY_OPTIONS = [
  'Public profile',
  'Limited public profile',
  'Internal only',
  'Reviewer pool only',
];

const FAQS = [
  { q: 'How do institutions apply?', a: 'Use the Institutional Partner Onboarding form on this page. Select your institution type, collaboration intent, complete the profile, and submit for review. You will receive acknowledgment within the standard review window.' },
  { q: 'Can retired experts join?', a: 'Yes. Select "Retired expert" as your capacity type in the Individual Expert Onboarding form. You may list your former institution and provide retired service proof as evidence of credibility.' },
  { q: 'Is expert participation separate from institutional partnership?', a: 'Yes. Institutional partnership is for formal organizations applying in official capacity. Individual expert onboarding is for qualified persons applying in personal capacity, not as institutional representatives unless explicitly authorized.' },
  { q: 'Are all onboarded partners publicly visible?', a: 'No. Only approved, display-cleared, and public-safe profiles appear in the Trusted Network Directory. Some contributors remain internal or reviewer-pool only based on their visibility preference and platform assessment.' },
  { q: 'Can we contribute data without becoming a full partner?', a: 'Yes. Use the Contribute Data workflow or Citizen Science pathways for individual data submissions without formal partnership. Full onboarding is for structured, ongoing collaboration.' },
  { q: 'How does Kashmir EcoWatch review new partnership applications?', a: 'Applications undergo review for role fit, domain relevance, institutional credibility (where applicable), data capability, and contribution type alignment. Verification may include credential checks and capability assessment.' },
  { q: 'Is there a separate route for technical and GIS collaboration?', a: 'Yes. Use the Strategic & Technical Collaboration section for geospatial systems, Earth observation, remote sensing, data engineering, and technical infrastructure inquiries.' },
];

// ─── Page Component ──────────────────────────────────────────────────────────

export default function PartnersPage() {
  const router = useRouter();
  const [networkTab, setNetworkTab] = useState('All');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Institutional form state
  const [instForm, setInstForm] = useState({ step: 1, name: '', type: '', website: '', yearEstablished: '', registrationRef: '', focalPerson: '', designation: '', email: '', phone: '', country: '', state: '', district: '', location: '', geoScope: '', collaborationIntents: [] as string[], domains: [] as string[], dataCapability: [] as string[], verificationRole: '', technicalReadiness: [] as string[], publicationLevel: '' });

  // Expert form state
  const [expertForm, setExpertForm] = useState({ step: 1, capacity: '', name: '', currentDesignation: '', affiliation: '', formerInstitution: '', personalEmail: '', officialEmail: '', phone: '', baseDistrict: '', applyingAs: '', canShowAffiliation: '', isAuthorized: '', canBeVerified: '', expertise: [] as string[], geoFamiliarity: [], contributionMode: [] as string[], evidenceType: '', visibility: '' });

  const toggleSelection = (list: string[], value: string) =>
    list.includes(value) ? list.filter(v => v !== value) : [...list, value];

  const networkTabs = ['All', 'Institutions', 'Expert Contributors', 'Research & Technical', 'Field & Community', 'Strategic & Advisory'];

  const filteredNetwork = networkTab === 'All' ? TRUSTED_NETWORK : TRUSTED_NETWORK.filter(n => {
    if (networkTab === 'Institutions') return n.type === 'Institution' || n.type === 'Authority';
    if (networkTab === 'Research & Technical') return n.domain.includes('Research') || n.domain.includes('Observation') || n.domain.includes('Data');
    if (networkTab === 'Strategic & Advisory') return n.domain.includes('Support') || n.domain.includes('Knowledge') || n.domain.includes('Reference');
    return true;
  });

  const badgeColor = (badge: string) => {
    if (badge.includes('Supporting')) return 'bg-amber-500/10 text-amber-400';
    if (badge.includes('Research')) return 'bg-blue-500/10 text-blue-400';
    if (badge.includes('Government')) return 'bg-emerald-500/10 text-emerald-400';
    if (badge.includes('Global')) return 'bg-purple-500/10 text-purple-400';
    if (badge.includes('Regional')) return 'bg-cyan-500/10 text-cyan-400';
    return 'bg-slate-500/10 text-slate-400';
  };

  return (
    <main className="min-h-screen bg-slate-950">
      {/* ─── 1. Hero ──────────────────────────────────────────────────────── */}
      <section className="relative pt-20 md:pt-48 pb-16 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/50 via-teal-950/30 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-2xl">
                <Users className="w-8 h-8 text-white" />
              </div>
              <Badge variant="info" size="lg">Partnerships, Expert Network & Onboarding</Badge>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
              Partner With <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Kashmir EcoWatch</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-4xl mb-8">
              Kashmir EcoWatch works through institutional collaboration, scientific expertise, field knowledge, environmental data contribution, and public-interest stewardship. This page connects formal organizations, expert contributors, and qualified participants to the right onboarding pathway.
            </p>

            <div className="flex flex-wrap gap-3">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => document.getElementById('pathways')?.scrollIntoView({ behavior: 'smooth' })}>
                Explore Partnership Paths <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/5" onClick={() => document.getElementById('directory')?.scrollIntoView({ behavior: 'smooth' })}>
                View Trusted Network
              </Button>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/5" onClick={() => document.getElementById('institutional-form')?.scrollIntoView({ behavior: 'smooth' })}>
                Start Institutional Onboarding
              </Button>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/5" onClick={() => document.getElementById('expert-form')?.scrollIntoView({ behavior: 'smooth' })}>
                Start Expert Onboarding
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── 2. Why Collaboration Matters ─────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <Badge variant="info">Value</Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-4 mb-3">Why Collaboration Matters</h2>
            <p className="text-slate-400 max-w-3xl leading-relaxed">
              Kashmir EcoWatch depends on structured collaboration across scientific, institutional, field, geospatial, and public-interest environmental pathways. Different participants contribute different forms of value.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl">
            {VALUE_CARDS.map((card, i) => (
              <motion.div key={card.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <Card className="glass-intense border-white/10 p-5 h-full">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center mb-3`}>
                    <card.icon className={`w-5 h-5 text-white`} />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-2">{card.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{card.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. Trusted Network Directory ─────────────────────────────────── */}
      <section id="directory" className="py-16 md:py-20 bg-slate-900">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <Badge variant="info">Directory</Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-4 mb-3">Trusted Network Directory</h2>
            <p className="text-slate-400 max-w-3xl leading-relaxed">
              Explore public-facing institutions, experts, and approved collaborators already onboarded within the Kashmir EcoWatch ecosystem.
            </p>
          </motion.div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {networkTabs.map(tab => (
              <button key={tab} onClick={() => setNetworkTab(tab)} className={cn('px-3 py-1.5 rounded-lg text-xs font-medium transition-colors', networkTab === tab ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white')}>
                {tab}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredNetwork.map((entity, i) => (
              <motion.div key={entity.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <Card className="glass-intense border-white/10 p-5 h-full">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium', badgeColor(entity.badge))}>{entity.badge}</span>
                  </div>
                  <h3 className="text-sm font-bold text-white mb-2 leading-tight">{entity.name}</h3>
                  <div className="space-y-1 text-xs text-slate-400">
                    <p><span className="text-slate-500">Type:</span> {entity.type}</p>
                    <p><span className="text-slate-500">Domain:</span> {entity.domain}</p>
                    <p><span className="text-slate-500">Geography:</span> {entity.geography}</p>
                    <p><span className="text-slate-500">Role:</span> {entity.role}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. Choose Your Onboarding Path ───────────────────────────────── */}
      <section id="pathways" className="py-16 md:py-20 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <Badge variant="info">Onboarding</Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-4 mb-3">Choose Your Onboarding Path</h2>
            <p className="text-slate-400 max-w-3xl leading-relaxed">
              Select the pathway that matches your organization, expertise, or participation intent.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl">
            {ONBOARDING_PATHS.map((path, i) => (
              <motion.div key={path.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <Card className="glass-intense border-white/10 p-6 cursor-pointer group h-full" onClick={() => document.getElementById(path.route.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' })}>
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${path.color} flex items-center justify-center shadow-lg shrink-0`}>
                      <path.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors leading-tight">{path.title}</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">{path.desc}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5. Contact the Right Pathway ─────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-slate-950">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl">
            <Badge variant="info">Contact</Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-4 mb-3">Contact the Right Pathway</h2>
            <p className="text-slate-400 mb-8 max-w-2xl leading-relaxed">
              These addresses may route into a shared backend handling system, but the public-facing contact shown in the UI should match your intent and context.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Institutional Partnerships', email: 'partners@kashmir-ecowatch.com', icon: Building2, color: 'text-blue-400' },
                { label: 'Individual Experts', email: 'experts@kashmir-ecowatch.com', icon: Users, color: 'text-violet-400' },
                { label: 'Data Contributions', email: 'data@kashmir-ecowatch.com', icon: Database, color: 'text-amber-400' },
                { label: 'General Platform Contact', email: 'contact@kashmir-ecowatch.com', icon: Mail, color: 'text-emerald-400' },
              ].map((contact, i) => (
                <Card key={contact.label} className="glass-intense border-white/10 p-5">
                  <contact.icon className={cn('w-6 h-6 mb-3', contact.color)} />
                  <p className="text-xs text-slate-500 mb-1">{contact.label}</p>
                  <a href={`mailto:${contact.email}`} className="text-xs font-mono text-white hover:text-emerald-400 hover:underline break-all">{contact.email}</a>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── 6. How Collaboration Works ───────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <Badge variant="info">Process</Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-4 mb-3">How Collaboration Works</h2>
            <p className="text-slate-400 max-w-3xl leading-relaxed">
              Different collaborators enter the platform through different review pathways depending on their role, expertise, institutional status, data readiness, and contribution type.
            </p>
          </motion.div>

          <div className="max-w-4xl space-y-4">
            {COLLAB_STEPS.map((step, i) => (
              <motion.div key={step.step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <Card className="glass-intense border-white/10 p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                      <span className="text-sm font-bold text-emerald-400">{step.step}</span>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white mb-1">{step.title}</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 7. Participation Standards ───────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-slate-900">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <Badge variant="info">Standards</Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-4 mb-3">Participation Standards</h2>
            <p className="text-slate-400 max-w-3xl leading-relaxed">
              All contributors to Kashmir EcoWatch are expected to uphold these standards.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl">
            {PARTICIPATION_STANDARDS.map((std, i) => (
              <motion.div key={std.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <Card className="glass-intense border-white/10 p-5 h-full">
                  <std.icon className="w-6 h-6 text-emerald-400 mb-3" />
                  <h3 className="text-sm font-bold text-white mb-2">{std.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{std.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 8. Institutional Partner Onboarding ──────────────────────────── */}
      <section id="institutional-form" className="py-16 md:py-20 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <Badge variant="info">Institutional</Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-4 mb-3">Institutional Partner Onboarding</h2>
            <p className="text-slate-400 max-w-3xl leading-relaxed">
              For formal organizations applying in official capacity. Complete each step below.
            </p>
          </motion.div>

          <Card className="glass-intense border-white/10 p-6 sm:p-8 max-w-4xl">
            {/* Step indicator */}
            <div className="flex items-center gap-1 mb-8 overflow-x-auto pb-2">
              {['Institution Type', 'Collaboration Intent', 'Organization Profile', 'Geographic Scope', 'Domain Expertise', 'Data Capability', 'Verification Role', 'Technical Readiness', 'Publication', 'Uploads', 'Review'].map((label, i) => (
                <div key={label} className={cn('flex items-center shrink-0', i < 10 && 'mr-1')}>
                  <div className={cn('w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold', instForm.step > i + 1 ? 'bg-emerald-500 text-white' : instForm.step === i + 1 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-white/5 text-slate-500')}>
                    {instForm.step > i + 1 ? <CheckCircle className="w-4 h-4" /> : i + 1}
                  </div>
                  <span className={cn('text-xs ml-1 hidden lg:inline', instForm.step === i + 1 ? 'text-emerald-400' : 'text-slate-500')}>{label}</span>
                </div>
              ))}
            </div>

            {/* Step 1: Institution Type */}
            {instForm.step === 1 && (
              <div>
                <h3 className="text-sm font-bold text-white mb-4">Select Institution Type</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {INSTITUTION_TYPES.map(type => (
                    <button key={type} onClick={() => setInstForm({ ...instForm, type })} className={cn('px-4 py-3 rounded-lg text-sm text-left transition-colors border', instForm.type === type ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10')}>
                      {type}
                    </button>
                  ))}
                </div>
                <Button className="mt-6 bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => setInstForm({ ...instForm, step: 2 })} disabled={!instForm.type}>Continue</Button>
              </div>
            )}

            {/* Step 2: Collaboration Intent */}
            {instForm.step === 2 && (
              <div>
                <h3 className="text-sm font-bold text-white mb-4">Select Collaboration Intent (multi-select)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {COLLABORATION_INTENTS.map(intent => (
                    <button key={intent} onClick={() => setInstForm({ ...instForm, collaborationIntents: toggleSelection(instForm.collaborationIntents, intent) })} className={cn('px-4 py-3 rounded-lg text-sm text-left transition-colors border', instForm.collaborationIntents.includes(intent) ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10')}>
                      {instForm.collaborationIntents.includes(intent) && <CheckCircle2 className="w-4 h-4 inline mr-2 text-emerald-400" />}{intent}
                    </button>
                  ))}
                </div>
                <div className="flex gap-3 mt-6">
                  <Button variant="outline" className="border-white/20 text-white" onClick={() => setInstForm({ ...instForm, step: 1 })}>Back</Button>
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => setInstForm({ ...instForm, step: 3 })} disabled={instForm.collaborationIntents.length === 0}>Continue</Button>
                </div>
              </div>
            )}

            {/* Step 3: Organization Profile */}
            {instForm.step === 3 && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-white mb-4">Organization Profile</h3>
                {[
                  { key: 'name', label: 'Institution Name', required: true },
                  { key: 'website', label: 'Website' },
                  { key: 'yearEstablished', label: 'Year Established' },
                  { key: 'registrationRef', label: 'Registration or Department Reference' },
                  { key: 'focalPerson', label: 'Focal Person', required: true },
                  { key: 'designation', label: 'Designation' },
                  { key: 'email', label: 'Official Email', required: true },
                  { key: 'phone', label: 'Phone' },
                  { key: 'country', label: 'Country' },
                  { key: 'state', label: 'State or UT' },
                  { key: 'district', label: 'District' },
                  { key: 'location', label: 'Office Location' },
                ].map(field => (
                  <div key={field.key}>
                    <label className="block text-xs font-medium text-slate-300 mb-1">{field.label}{field.required && <span className="text-red-400 ml-1">*</span>}</label>
                    <input type="text" value={(instForm as any)[field.key] || ''} onChange={e => setInstForm({ ...instForm, [field.key]: e.target.value })} className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 text-sm" placeholder={field.label} />
                  </div>
                ))}
                <div className="flex gap-3 mt-6">
                  <Button variant="outline" className="border-white/20 text-white" onClick={() => setInstForm({ ...instForm, step: 2 })}>Back</Button>
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => setInstForm({ ...instForm, step: 4 })}>Continue</Button>
                </div>
              </div>
            )}

            {/* Steps 4-11 simplified */}
            {instForm.step === 4 && (
              <div>
                <h3 className="text-sm font-bold text-white mb-4">Geographic Scope</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {['Kashmir-wide', 'District-specific', 'Watershed-specific', 'Wetland-specific', 'Protected area-specific', 'Multi-district', 'Advisory only'].map(scope => (
                    <button key={scope} onClick={() => setInstForm({ ...instForm, geoScope: scope })} className={cn('px-4 py-3 rounded-lg text-sm text-left transition-colors border', instForm.geoScope === scope ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10')}>{scope}</button>
                  ))}
                </div>
                <div className="flex gap-3 mt-6">
                  <Button variant="outline" className="border-white/20 text-white" onClick={() => setInstForm({ ...instForm, step: 3 })}>Back</Button>
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => setInstForm({ ...instForm, step: 5 })} disabled={!instForm.geoScope}>Continue</Button>
                </div>
              </div>
            )}

            {instForm.step === 5 && (
              <div>
                <h3 className="text-sm font-bold text-white mb-4">Domain Expertise (multi-select)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {DOMAIN_EXPERTISE.map(d => (
                    <button key={d} onClick={() => setInstForm({ ...instForm, domains: toggleSelection(instForm.domains, d) })} className={cn('px-4 py-3 rounded-lg text-sm text-left transition-colors border', instForm.domains.includes(d) ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10')}>
                      {instForm.domains.includes(d) && <CheckCircle2 className="w-4 h-4 inline mr-2 text-emerald-400" />}{d}
                    </button>
                  ))}
                </div>
                <div className="flex gap-3 mt-6">
                  <Button variant="outline" className="border-white/20 text-white" onClick={() => setInstForm({ ...instForm, step: 4 })}>Back</Button>
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => setInstForm({ ...instForm, step: 6 })}>Continue</Button>
                </div>
              </div>
            )}

            {instForm.step === 6 && (
              <div>
                <h3 className="text-sm font-bold text-white mb-4">Data Capability (multi-select)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {['Raw data', 'Cleaned data', 'GIS layers', 'Reports', 'Monitoring logs', 'Field observations', 'Historical archives', 'Reference systems', 'Earth observation inputs'].map(cap => (
                    <button key={cap} onClick={() => setInstForm({ ...instForm, dataCapability: toggleSelection(instForm.dataCapability, cap) })} className={cn('px-4 py-3 rounded-lg text-sm text-left transition-colors border', instForm.dataCapability.includes(cap) ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10')}>
                      {instForm.dataCapability.includes(cap) && <CheckCircle2 className="w-4 h-4 inline mr-2 text-emerald-400" />}{cap}
                    </button>
                  ))}
                </div>
                <div className="flex gap-3 mt-6">
                  <Button variant="outline" className="border-white/20 text-white" onClick={() => setInstForm({ ...instForm, step: 5 })}>Back</Button>
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => setInstForm({ ...instForm, step: 7 })}>Continue</Button>
                </div>
              </div>
            )}

            {instForm.step === 7 && (
              <div>
                <h3 className="text-sm font-bold text-white mb-4">Verification Role</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {['Source partner only', 'Review support', 'Expert review support', 'Field verification support', 'Authority confirmation support', 'Advisory only'].map(role => (
                    <button key={role} onClick={() => setInstForm({ ...instForm, verificationRole: role })} className={cn('px-4 py-3 rounded-lg text-sm text-left transition-colors border', instForm.verificationRole === role ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10')}>{role}</button>
                  ))}
                </div>
                <div className="flex gap-3 mt-6">
                  <Button variant="outline" className="border-white/20 text-white" onClick={() => setInstForm({ ...instForm, step: 6 })}>Back</Button>
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => setInstForm({ ...instForm, step: 8 })} disabled={!instForm.verificationRole}>Continue</Button>
                </div>
              </div>
            )}

            {instForm.step === 8 && (
              <div>
                <h3 className="text-sm font-bold text-white mb-4">Technical Readiness (multi-select)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {['API available', 'Secure upload', 'Manual upload', 'Periodic reporting', 'GIS interoperability', 'Metadata available', 'Historical data available'].map(t => (
                    <button key={t} onClick={() => setInstForm({ ...instForm, technicalReadiness: toggleSelection(instForm.technicalReadiness, t) })} className={cn('px-4 py-3 rounded-lg text-sm text-left transition-colors border', instForm.technicalReadiness.includes(t) ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10')}>
                      {instForm.technicalReadiness.includes(t) && <CheckCircle2 className="w-4 h-4 inline mr-2 text-emerald-400" />}{t}
                    </button>
                  ))}
                </div>
                <div className="flex gap-3 mt-6">
                  <Button variant="outline" className="border-white/20 text-white" onClick={() => setInstForm({ ...instForm, step: 7 })}>Back</Button>
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => setInstForm({ ...instForm, step: 9 })}>Continue</Button>
                </div>
              </div>
            )}

            {instForm.step === 9 && (
              <div>
                <h3 className="text-sm font-bold text-white mb-4">Compliance and Publication Preference</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {['Public', 'Restricted public', 'Internal review only', 'Confidential reference only'].map(level => (
                    <button key={level} onClick={() => setInstForm({ ...instForm, publicationLevel: level })} className={cn('px-4 py-3 rounded-lg text-sm text-left transition-colors border', instForm.publicationLevel === level ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10')}>{level}</button>
                  ))}
                </div>
                <div className="flex gap-3 mt-6">
                  <Button variant="outline" className="border-white/20 text-white" onClick={() => setInstForm({ ...instForm, step: 8 })}>Back</Button>
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => setInstForm({ ...instForm, step: 10 })} disabled={!instForm.publicationLevel}>Continue</Button>
                </div>
              </div>
            )}

            {instForm.step === 10 && (
              <div>
                <h3 className="text-sm font-bold text-white mb-4">Uploads (optional)</h3>
                <p className="text-xs text-slate-400 mb-4">Upload institutional proof, authorization letters, sample data, methodology documents, GIS samples, or brand assets.</p>
                <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-emerald-500/30 transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-slate-500 mx-auto mb-3" />
                  <p className="text-sm text-slate-400">Click to upload or drag and drop</p>
                  <p className="text-xs text-slate-500 mt-1">PDF, DOC, XLS, GIS files, images (max 25MB each)</p>
                </div>
                <div className="flex gap-3 mt-6">
                  <Button variant="outline" className="border-white/20 text-white" onClick={() => setInstForm({ ...instForm, step: 9 })}>Back</Button>
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => setInstForm({ ...instForm, step: 11 })}>Review & Submit</Button>
                </div>
              </div>
            )}

            {instForm.step === 11 && (
              <div>
                <h3 className="text-sm font-bold text-white mb-4">Review Summary</h3>
                <Card className="bg-white/5 border-white/10 p-4 mb-6">
                  <div className="space-y-2 text-sm">
                    <p><span className="text-slate-500">Institution Type:</span> <span className="text-white">{instForm.type || '—'}</span></p>
                    <p><span className="text-slate-500">Name:</span> <span className="text-white">{instForm.name || '—'}</span></p>
                    <p><span className="text-slate-500">Email:</span> <span className="text-white">{instForm.email || '—'}</span></p>
                    <p><span className="text-slate-500">Geographic Scope:</span> <span className="text-white">{instForm.geoScope || '—'}</span></p>
                    <p><span className="text-slate-500">Collaboration Intent:</span> <span className="text-white">{instForm.collaborationIntents.join(', ') || '—'}</span></p>
                    <p><span className="text-slate-500">Domain Expertise:</span> <span className="text-white">{instForm.domains.join(', ') || '—'}</span></p>
                    <p><span className="text-slate-500">Verification Role:</span> <span className="text-white">{instForm.verificationRole || '—'}</span></p>
                    <p><span className="text-slate-500">Publication:</span> <span className="text-white">{instForm.publicationLevel || '—'}</span></p>
                  </div>
                </Card>
                <div className="flex gap-3">
                  <Button variant="outline" className="border-white/20 text-white" onClick={() => setInstForm({ ...instForm, step: 10 })}>Back</Button>
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => { alert('Application submitted for review.'); setInstForm({ step: 1, name: '', type: '', website: '', yearEstablished: '', registrationRef: '', focalPerson: '', designation: '', email: '', phone: '', country: '', state: '', district: '', location: '', geoScope: '', collaborationIntents: [], domains: [], dataCapability: [], verificationRole: '', technicalReadiness: [], publicationLevel: '' }); }}>Submit Application</Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </section>

      {/* ─── 9. Individual Expert Onboarding ──────────────────────────────── */}
      <section id="expert-form" className="py-16 md:py-20 bg-slate-950">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <Badge variant="info">Expert</Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-4 mb-3">Individual Expert Onboarding</h2>
            <p className="text-slate-400 max-w-3xl leading-relaxed">
              For qualified individuals applying in personal capacity, not as formal institutional representatives unless explicitly authorized.
            </p>
          </motion.div>

          <Card className="glass-intense border-white/10 p-6 sm:p-8 max-w-4xl">
            {/* Step indicator */}
            <div className="flex items-center gap-1 mb-8 overflow-x-auto pb-2">
              {['Capacity', 'Profile', 'Representation', 'Expertise', 'Geography', 'Contribution Mode', 'Evidence', 'Visibility', 'Review'].map((label, i) => (
                <div key={label} className={cn('flex items-center shrink-0', i < 8 && 'mr-1')}>
                  <div className={cn('w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold', expertForm.step > i + 1 ? 'bg-violet-500 text-white' : expertForm.step === i + 1 ? 'bg-violet-500/20 text-violet-400 border border-violet-500/30' : 'bg-white/5 text-slate-500')}>
                    {expertForm.step > i + 1 ? <CheckCircle className="w-4 h-4" /> : i + 1}
                  </div>
                  <span className={cn('text-xs ml-1 hidden lg:inline', expertForm.step === i + 1 ? 'text-violet-400' : 'text-slate-500')}>{label}</span>
                </div>
              ))}
            </div>

            {/* Step 1: Capacity */}
            {expertForm.step === 1 && (
              <div>
                <h3 className="text-sm font-bold text-white mb-4">Select Capacity Type</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {EXPERT_CAPACITY.map(cap => (
                    <button key={cap} onClick={() => setExpertForm({ ...expertForm, capacity: cap })} className={cn('px-4 py-3 rounded-lg text-sm text-left transition-colors border', expertForm.capacity === cap ? 'bg-violet-500/10 border-violet-500/30 text-violet-400' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10')}>{cap}</button>
                  ))}
                </div>
                <Button className="mt-6 bg-violet-600 hover:bg-violet-700 text-white" onClick={() => setExpertForm({ ...expertForm, step: 2 })} disabled={!expertForm.capacity}>Continue</Button>
              </div>
            )}

            {/* Step 2: Profile */}
            {expertForm.step === 2 && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-white mb-4">Profile</h3>
                {[
                  { key: 'name', label: 'Full Name', required: true },
                  { key: 'currentDesignation', label: 'Current or Former Designation' },
                  { key: 'affiliation', label: 'Current Affiliation (if any)' },
                  { key: 'formerInstitution', label: 'Former Institution (if retired)' },
                  { key: 'personalEmail', label: 'Personal Email', required: true },
                  { key: 'officialEmail', label: 'Official Email (if relevant)' },
                  { key: 'phone', label: 'Phone' },
                  { key: 'baseDistrict', label: 'Base District or Location' },
                ].map(field => (
                  <div key={field.key}>
                    <label className="block text-xs font-medium text-slate-300 mb-1">{field.label}{field.required && <span className="text-red-400 ml-1">*</span>}</label>
                    <input type="text" value={(expertForm as any)[field.key] || ''} onChange={e => setExpertForm({ ...expertForm, [field.key]: e.target.value })} className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 text-sm" placeholder={field.label} />
                  </div>
                ))}
                <div className="flex gap-3 mt-6">
                  <Button variant="outline" className="border-white/20 text-white" onClick={() => setExpertForm({ ...expertForm, step: 1 })}>Back</Button>
                  <Button className="bg-violet-600 hover:bg-violet-700 text-white" onClick={() => setExpertForm({ ...expertForm, step: 3 })}>Continue</Button>
                </div>
              </div>
            )}

            {/* Steps 3-9 simplified */}
            {expertForm.step === 3 && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-white mb-4">Representation Clarity</h3>
                {[
                  { key: 'applyingAs', label: 'Applying officially or personally?' },
                  { key: 'canShowAffiliation', label: 'Can affiliation be shown publicly?' },
                  { key: 'isAuthorized', label: 'Is institutional authorization available?' },
                  { key: 'canBeVerified', label: 'Can role be verified?' },
                ].map(field => (
                  <div key={field.key}>
                    <label className="block text-xs font-medium text-slate-300 mb-1">{field.label}</label>
                    <input type="text" value={(expertForm as any)[field.key] || ''} onChange={e => setExpertForm({ ...expertForm, [field.key]: e.target.value })} className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 text-sm" />
                  </div>
                ))}
                <div className="flex gap-3 mt-6">
                  <Button variant="outline" className="border-white/20 text-white" onClick={() => setExpertForm({ ...expertForm, step: 2 })}>Back</Button>
                  <Button className="bg-violet-600 hover:bg-violet-700 text-white" onClick={() => setExpertForm({ ...expertForm, step: 4 })}>Continue</Button>
                </div>
              </div>
            )}

            {expertForm.step === 4 && (
              <div>
                <h3 className="text-sm font-bold text-white mb-4">Expertise (multi-select)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {EXPERT_DOMAINS.map(d => (
                    <button key={d} onClick={() => setExpertForm({ ...expertForm, expertise: toggleSelection(expertForm.expertise, d) })} className={cn('px-4 py-3 rounded-lg text-sm text-left transition-colors border', expertForm.expertise.includes(d) ? 'bg-violet-500/10 border-violet-500/30 text-violet-400' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10')}>
                      {expertForm.expertise.includes(d) && <CheckCircle2 className="w-4 h-4 inline mr-2 text-violet-400" />}{d}
                    </button>
                  ))}
                </div>
                <div className="flex gap-3 mt-6">
                  <Button variant="outline" className="border-white/20 text-white" onClick={() => setExpertForm({ ...expertForm, step: 3 })}>Back</Button>
                  <Button className="bg-violet-600 hover:bg-violet-700 text-white" onClick={() => setExpertForm({ ...expertForm, step: 5 })}>Continue</Button>
                </div>
              </div>
            )}

            {expertForm.step === 5 && (
              <div>
                <h3 className="text-sm font-bold text-white mb-4">Geographic Familiarity (multi-select)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {['Kashmir-wide', 'North Kashmir', 'Central Kashmir', 'South Kashmir', 'District specific', 'Watershed-specific', 'Protected area-specific'].map(g => (
                    <button key={g} onClick={() => setExpertForm({ ...expertForm, geoFamiliarity: toggleSelection(expertForm.geoFamiliarity, g) })} className={cn('px-4 py-3 rounded-lg text-sm text-left transition-colors border', expertForm.geoFamiliarity.includes(g) ? 'bg-violet-500/10 border-violet-500/30 text-violet-400' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10')}>
                      {expertForm.geoFamiliarity.includes(g) && <CheckCircle2 className="w-4 h-4 inline mr-2 text-violet-400" />}{g}
                    </button>
                  ))}
                </div>
                <div className="flex gap-3 mt-6">
                  <Button variant="outline" className="border-white/20 text-white" onClick={() => setExpertForm({ ...expertForm, step: 4 })}>Back</Button>
                  <Button className="bg-violet-600 hover:bg-violet-700 text-white" onClick={() => setExpertForm({ ...expertForm, step: 6 })}>Continue</Button>
                </div>
              </div>
            )}

            {expertForm.step === 6 && (
              <div>
                <h3 className="text-sm font-bold text-white mb-4">Contribution Mode (multi-select)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {EXPERT_CONTRIBUTION_MODES.map(m => (
                    <button key={m} onClick={() => setExpertForm({ ...expertForm, contributionMode: toggleSelection(expertForm.contributionMode, m) })} className={cn('px-4 py-3 rounded-lg text-sm text-left transition-colors border', expertForm.contributionMode.includes(m) ? 'bg-violet-500/10 border-violet-500/30 text-violet-400' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10')}>
                      {expertForm.contributionMode.includes(m) && <CheckCircle2 className="w-4 h-4 inline mr-2 text-violet-400" />}{m}
                    </button>
                  ))}
                </div>
                <div className="flex gap-3 mt-6">
                  <Button variant="outline" className="border-white/20 text-white" onClick={() => setExpertForm({ ...expertForm, step: 5 })}>Back</Button>
                  <Button className="bg-violet-600 hover:bg-violet-700 text-white" onClick={() => setExpertForm({ ...expertForm, step: 7 })}>Continue</Button>
                </div>
              </div>
            )}

            {expertForm.step === 7 && (
              <div>
                <h3 className="text-sm font-bold text-white mb-4">Evidence of Credibility</h3>
                <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-violet-500/30 transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-slate-500 mx-auto mb-3" />
                  <p className="text-sm text-slate-400">Upload CV, publications, reports, GIS work sample, certifications, or retired service proof</p>
                  <p className="text-xs text-slate-500 mt-1">PDF, DOC, images (max 25MB each)</p>
                </div>
                <div className="flex gap-3 mt-6">
                  <Button variant="outline" className="border-white/20 text-white" onClick={() => setExpertForm({ ...expertForm, step: 6 })}>Back</Button>
                  <Button className="bg-violet-600 hover:bg-violet-700 text-white" onClick={() => setExpertForm({ ...expertForm, step: 8 })}>Continue</Button>
                </div>
              </div>
            )}

            {expertForm.step === 8 && (
              <div>
                <h3 className="text-sm font-bold text-white mb-4">Visibility Preference</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {VISIBILITY_OPTIONS.map(v => (
                    <button key={v} onClick={() => setExpertForm({ ...expertForm, visibility: v })} className={cn('px-4 py-3 rounded-lg text-sm text-left transition-colors border', expertForm.visibility === v ? 'bg-violet-500/10 border-violet-500/30 text-violet-400' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10')}>{v}</button>
                  ))}
                </div>
                <div className="flex gap-3 mt-6">
                  <Button variant="outline" className="border-white/20 text-white" onClick={() => setExpertForm({ ...expertForm, step: 7 })}>Back</Button>
                  <Button className="bg-violet-600 hover:bg-violet-700 text-white" onClick={() => setExpertForm({ ...expertForm, step: 9 })} disabled={!expertForm.visibility}>Review & Submit</Button>
                </div>
              </div>
            )}

            {expertForm.step === 9 && (
              <div>
                <h3 className="text-sm font-bold text-white mb-4">Review Summary</h3>
                <Card className="bg-white/5 border-white/10 p-4 mb-6">
                  <div className="space-y-2 text-sm">
                    <p><span className="text-slate-500">Capacity:</span> <span className="text-white">{expertForm.capacity || '—'}</span></p>
                    <p><span className="text-slate-500">Name:</span> <span className="text-white">{expertForm.name || '—'}</span></p>
                    <p><span className="text-slate-500">Email:</span> <span className="text-white">{expertForm.personalEmail || '—'}</span></p>
                    <p><span className="text-slate-500">Expertise:</span> <span className="text-white">{expertForm.expertise.join(', ') || '—'}</span></p>
                    <p><span className="text-slate-500">Contribution Mode:</span> <span className="text-white">{expertForm.contributionMode.join(', ') || '—'}</span></p>
                    <p><span className="text-slate-500">Visibility:</span> <span className="text-white">{expertForm.visibility || '—'}</span></p>
                  </div>
                </Card>
                <div className="flex gap-3">
                  <Button variant="outline" className="border-white/20 text-white" onClick={() => setExpertForm({ ...expertForm, step: 8 })}>Back</Button>
                  <Button className="bg-violet-600 hover:bg-violet-700 text-white" onClick={() => { alert('Expert application submitted for review.'); setExpertForm({ step: 1, capacity: '', name: '', currentDesignation: '', affiliation: '', formerInstitution: '', personalEmail: '', officialEmail: '', phone: '', baseDistrict: '', applyingAs: '', canShowAffiliation: '', isAuthorized: '', canBeVerified: '', expertise: [], geoFamiliarity: [], contributionMode: [], evidenceType: '', visibility: '' }); }}>Submit Application</Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </section>

      {/* ─── 10. Field & Community Participation ──────────────────────────── */}
      <section id="community" className="py-16 md:py-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl">
            <Badge variant="info">Community</Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-4 mb-3">Field & Community Participation</h2>
            <p className="text-slate-400 mb-8 leading-relaxed">
              For contributors whose role is field-linked visibility, observation, documentation, community knowledge, and grassroots participation.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: Siren, label: 'Report an Issue', href: '/report-issue', desc: 'File a structured environmental incident report' },
                { icon: Binoculars, label: 'Submit Sighting', href: '/submit-sighting', desc: 'Log a wildlife or plant species observation' },
                { icon: Leaf, label: 'Join Citizen Science', href: '/citizen-science', desc: 'Participate in community science programs' },
                { icon: FileText, label: 'Contribute Field Records', href: '/contribute-data', desc: 'Share field documentation and evidence' },
              ].map(action => (
                <Card key={action.label} className="glass-intense border-white/10 p-5 cursor-pointer group" onClick={() => router.push(action.href)}>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                      <action.icon className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">{action.label}</h3>
                      <p className="text-xs text-slate-400">{action.desc}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── 11. Strategic & Technical Collaboration ──────────────────────── */}
      <section id="strategic" className="py-16 md:py-20 bg-slate-900">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl">
            <Badge variant="info">Technical</Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-4 mb-3">Strategic & Technical Collaboration</h2>
            <p className="text-slate-400 mb-8 leading-relaxed">
              For GIS partners, Earth observation support, remote sensing collaborators, satellite and geospatial interpretation partners, environmental data engineering support, technical infrastructure support, and reference system contributors.
            </p>

            <Card className="glass-intense border-white/10 p-6">
              <p className="text-sm text-slate-300 mb-4">
                Suitable for: GIS partners, Earth observation support, remote sensing collaborators, satellite and geospatial interpretation partners, environmental data engineering support, technical infrastructure support, reference system contributors.
              </p>
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white" onClick={() => window.location.href = 'mailto:data@kashmir-ecowatch.com'}>
                Start Technical Collaboration Inquiry <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* ─── 12. FAQ ──────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <Badge variant="info">FAQ</Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-4 mb-3">Frequently Asked Questions</h2>
          </motion.div>

          <div className="max-w-4xl space-y-3">
            {FAQS.map((faq, i) => (
              <Card key={i} className="glass-intense border-white/10 p-0 overflow-hidden cursor-pointer" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <div className="p-5 sm:p-6 flex items-start justify-between gap-4">
                  <h3 className="text-sm font-semibold text-white leading-snug flex-1">{faq.q}</h3>
                  <span className="text-slate-400 shrink-0">{openFaq === i ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}</span>
                </div>
                {openFaq === i && (
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 border-t border-white/10 pt-3">
                    <p className="text-sm text-slate-300 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      <AdvancedFooter />
    </main>
  );
}
