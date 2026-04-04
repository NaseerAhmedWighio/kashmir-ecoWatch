'use client';

import React, { useState } from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Shield, Users, Building2, FlaskConical, Briefcase, FileText,
  Mail, BookOpen, Eye, Handshake, AlertTriangle, Microscope, Globe,
  ChevronDown, ChevronUp, CheckCircle2, Upload, CheckCircle,
  ArrowRight, User, Award, MapPin, Target, Zap, Layers,
  Heart, GraduationCap, Lock, Search
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

// ─── Data ────────────────────────────────────────────────────────────────────

const FOUR_PILLARS = [
  { icon: Shield, title: 'Platform Governance', desc: 'Strategic direction, institutional relationships, public-interest mandate, legal and policy alignment, and platform-level governance decisions.', color: 'from-indigo-500 to-blue-600', iconColor: 'text-indigo-400', bgColor: 'bg-indigo-500/10' },
  { icon: FlaskConical, title: 'Scientific Advisory', desc: 'Guidance on methodology, verification standards, confidence logic, evidence quality, and review integrity across platform intelligence layers.', color: 'from-emerald-500 to-teal-600', iconColor: 'text-emerald-400', bgColor: 'bg-emerald-500/10' },
  { icon: Microscope, title: 'Expert Committee', desc: 'Independent, affiliated, senior, retired, and specialist contributors who support review, domain judgment, publication sensitivity, and complex ecological interpretation.', color: 'from-violet-500 to-purple-600', iconColor: 'text-violet-400', bgColor: 'bg-violet-500/10' },
  { icon: Briefcase, title: 'Operational Management', desc: 'Day-to-day operations, evidence handling, contribution review, content production, alert coordination, and system maintenance across the platform.', color: 'from-amber-500 to-orange-600', iconColor: 'text-amber-400', bgColor: 'bg-amber-500/10' },
];

const LEADERSHIP_SEATS = [
  { title: 'Founder / Institutional Sponsor', filled: true, public: true, name: 'Dr. Kumar Foundation USA', responsibility: 'Institutional sponsorship and foundational support', link: '/about/partners', visibility: 'Public Full Profile' },
  { title: 'Platform Director', filled: true, public: false, name: 'Seat Filled', responsibility: 'Platform vision, strategic partnerships, institutional relationships', link: null, visibility: 'Seat Internal' },
  { title: 'Governance Lead', filled: true, public: false, name: 'Seat Filled', responsibility: 'Governance structure, advisory coordination, oversight alignment', link: null, visibility: 'Seat Internal' },
  { title: 'Scientific Coordination Lead', filled: true, public: false, name: 'Seat Filled', responsibility: 'Scientific review coordination, expert committee management', link: null, visibility: 'Seat Internal' },
  { title: 'Technical Systems Lead', filled: true, public: false, name: 'Seat Filled', responsibility: 'Platform architecture, geospatial systems, infrastructure', link: null, visibility: 'Seat Internal' },
  { title: 'Public-Interest Oversight Lead', filled: true, public: false, name: 'Seat Filled', responsibility: 'Public-interest alignment, community feedback, trust systems', link: null, visibility: 'Seat Internal' },
];

const ADVISORY_SEATS = [
  { title: 'Hydrology & Water Systems Advisory', status: 'Seat Reserved / Pending Activation', domain: 'Water Systems', visibility: 'Internal' },
  { title: 'Biodiversity & Wildlife Advisory', status: 'Seat Reserved / Pending Activation', domain: 'Biodiversity', visibility: 'Internal' },
  { title: 'GIS & Remote Sensing Advisory', status: 'Seat Under Formation', domain: 'Geospatial', visibility: 'Internal' },
  { title: 'Environmental Risk & Monitoring Advisory', status: 'Seat Reserved / Pending Activation', domain: 'Risk & Monitoring', visibility: 'Internal' },
  { title: 'Methodology & Confidence Framework Advisory', status: 'Seat Filled', domain: 'Methodology', visibility: 'Internal' },
  { title: 'Sensitivity & Ethics Advisory', status: 'Seat Reserved / Pending Activation', domain: 'Ethics & Sensitivity', visibility: 'Internal' },
];

const EXPERT_COMMITTEE_DISPLAY = {
  publiclyListed: 0,
  retiredSeniorAdvisors: 0,
  specialistReviewSeats: 0,
  restrictedReviewMembers: 0,
  domainPools: ['Hydrology', 'Biodiversity', 'GIS & Remote Sensing', 'Environmental Risk', 'Methodology', 'Ethics & Sensitivity'],
};

const OPS_ROLES = [
  { role: 'Operations Coordinator', status: 'Seat Filled', public: false },
  { role: 'Evidence Review Coordinator', status: 'Seat Filled', public: false },
  { role: 'Alert & Reporting Coordinator', status: 'Seat Filled', public: false },
  { role: 'Contribution Workflow Coordinator', status: 'Seat Under Formation', public: false },
  { role: 'GIS / Systems Operations Lead', status: 'Seat Filled', public: false },
  { role: 'Content & Public Interface Coordination', status: 'Seat Under Formation', public: false },
];

const AFFILIATED_EXPERTS_PREVIEW = [
  { name: 'Seat Open', type: 'Individual Expert', domain: 'Hydrology', geo: 'Kashmir', relevance: 'Water Systems Intelligence', visibility: 'Recruitment Open' },
  { name: 'Seat Open', type: 'Individual Expert', domain: 'Biodiversity & Wildlife', geo: 'Kashmir', relevance: 'Species & Habitat Intelligence', visibility: 'Recruitment Open' },
  { name: 'Seat Open', type: 'Individual Expert', domain: 'GIS & Remote Sensing', geo: 'Global', relevance: 'Geospatial Intelligence', visibility: 'Recruitment Open' },
  { name: 'Seat Open', type: 'Individual Expert', domain: 'Environmental Risk', geo: 'Himalayan Region', relevance: 'Hazard Interpretation', visibility: 'Recruitment Open' },
];

const INSTITUTIONAL_PARTNERS_PREVIEW = [
  { name: 'Dr. Kumar Foundation USA', type: 'Supporting Institution', domain: 'Institutional Support', geo: 'United States', relevance: 'Foundational Sponsorship', badge: 'Primary Supporter' },
  { name: 'University of Kashmir', type: 'Academic Institution', domain: 'Environmental Research', geo: 'Srinagar', relevance: 'Scientific Review & Data', badge: 'Research Partner' },
  { name: 'J&K Lake Conservation & Management Authority', type: 'Government Authority', domain: 'Lake & Wetland Management', geo: 'Srinagar', relevance: 'Authority Reference', badge: 'Government Authority' },
  { name: 'NASA Earthdata', type: 'Global Reference System', domain: 'Earth Observation', geo: 'Global', relevance: 'Reference System', badge: 'Global Reference' },
];

const ADVISORY_STREAMS = [
  { icon: BookOpen, title: 'Methodology Advisory', desc: 'Supports review logic, classification, evidence standards, confidence scoring, and methodological documentation.', color: 'text-blue-400' },
  { icon: AlertTriangle, title: 'Sensitivity & Ethics Advisory', desc: 'Supports decisions involving sensitive species, ecological vulnerability, safety, and responsible publication.', color: 'text-amber-400' },
  { icon: Building2, title: 'Technical Advisory', desc: 'Supports geospatial systems, infrastructure, monitoring technology, data architecture, and technical platform evolution.', color: 'text-emerald-400' },
  { icon: Globe, title: 'Institutional Coordination Advisory', desc: 'Supports relationships with government departments, universities, research institutions, conservation bodies, and environmental networks.', color: 'text-violet-400' },
];

const OVERSIGHT_MECHANISMS = [
  { icon: Shield, title: 'Governance Accountability', desc: 'Platform governance structure ensuring accountability and public-interest alignment.' },
  { icon: Microscope, title: 'Expert Review', desc: 'Expert committee review of methodology, confidence frameworks, and publication decisions.' },
  { icon: Handshake, title: 'Institutional Coordination', desc: 'Institutional partner coordination for data quality, credibility, and joint monitoring alignment.' },
  { icon: Users, title: 'Community Feedback', desc: 'Community feedback pathways for platform improvement and public-interest stewardship.' },
  { icon: FileText, title: 'Transparent Frameworks', desc: 'Transparent methodology, terms of use, and verification systems accessible to all users.' },
];

const INTEREST_CATEGORIES = [
  'Scientific Advisory',
  'Global Diaspora Environmental Expert Committee',
  'Affiliated Expert Network',
  'Institutional Governance Collaboration',
  'Technical / GIS Advisory',
  'Retired Expert Participation',
  'Thematic Review Pool',
  'Governance Support Role',
  'Sensitivity & Ethics Review Support',
  'Nomination of Another Person or Institution',
];

const APPLICANT_TYPES = [
  'Individual',
  'Institution',
  'On behalf of another expert',
  'On behalf of an institution',
];

const GOVERNANCE_RELEVANCE = [
  'Environmental science',
  'Hydrology / water systems',
  'Wetlands / lakes',
  'Biodiversity / wildlife',
  'Forest ecology',
  'Pollution',
  'Climate / cryosphere',
  'Hazard / disaster interpretation',
  'GIS / remote sensing',
  'Data systems',
  'Environmental law / policy',
  'Governance / ethics / sensitivity',
  'Institutional coordination',
];

const INTENDED_CONTRIBUTIONS = [
  'Scientific review',
  'Advisory input',
  'Committee participation',
  'Governance oversight',
  'Technical guidance',
  'Institutional bridging',
  'Thematic interpretation',
  'Mentorship',
  'Retired expert contribution',
  'Review panel participation',
];

const KASHMIR_RELEVANCE = [
  'Direct regional work experience',
  'Kashmir-related research',
  'Himalayan systems expertise',
  'Diaspora scientific connection',
  'Relevant comparative expertise',
  'No direct Kashmir work but domain relevance',
];

const VISIBILITY_OPTIONS = [
  'Full public profile',
  'Limited public profile',
  'Role only',
  'Internal only',
  'Undecided',
];

const visibilityBadge = (v: string) => {
  if (v.includes('Public Full')) return 'bg-emerald-500/10 text-emerald-400';
  if (v.includes('Public Limited')) return 'bg-blue-500/10 text-blue-400';
  if (v.includes('Role Only')) return 'bg-slate-500/10 text-slate-400';
  if (v.includes('Internal')) return 'bg-amber-500/10 text-amber-400';
  if (v.includes('Recruitment')) return 'bg-violet-500/10 text-violet-400';
  if (v.includes('Reserved') || v.includes('Formation')) return 'bg-slate-500/10 text-slate-400';
  return 'bg-slate-500/10 text-slate-400';
};

// ─── Page Component ──────────────────────────────────────────────────────────

export default function GovernancePage() {
  const router = useRouter();
  const [openSection, setOpenSection] = useState<string | null>('leadership');
  const [affiliatedTab, setAffiliatedTab] = useState('Affiliated Experts');
  const [interestForm, setInterestForm] = useState({ step: 1, category: '', applicantType: '', name: '', designation: '', affiliation: '', formerInstitution: '', country: '', base: '', email: '', phone: '', profileUrl: '', institutionName: '', institutionType: '', focalPerson: '', role: '', instEmail: '', website: '', instGeography: '', instDomain: '', relevance: [], contributions: [], experience: '', kashmirRelevance: '', visibility: '', nomineeName: '', nomineeWhy: '', nomineeRelationship: '', nomineeContact: '', nomineeNote: '' });

  const toggleSelection = (list: string[], value: string) =>
    list.includes(value) ? list.filter(v => v !== value) : [...list, value];

  return (
    <main className="min-h-screen bg-slate-950">
      {/* ─── 1. Hero ──────────────────────────────────────────────────────── */}
      <section className="relative pt-20 md:pt-48 pb-16 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/50 via-slate-950/30 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-slate-600 flex items-center justify-center shadow-2xl">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <Badge variant="info" size="lg">Governance</Badge>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-slate-400">Governance</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-4xl mb-8">
              Governance structure, public composition, advisory systems, expert committee pathways, operational oversight, and governance participation for Kashmir EcoWatch.
            </p>

            <p className="text-base text-slate-400 leading-relaxed max-w-3xl mb-8">
              Kashmir EcoWatch operates under a structured governance framework designed to support scientific integrity, public-interest stewardship, operational accountability, responsible publication, and institutionally grounded environmental intelligence across Kashmir.
            </p>

            <div className="flex flex-wrap gap-3">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white" onClick={() => document.getElementById('pillars')?.scrollIntoView({ behavior: 'smooth' })}>
                View Governance Structure <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/5" onClick={() => document.getElementById('composition')?.scrollIntoView({ behavior: 'smooth' })}>
                Explore Current Composition
              </Button>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/5" onClick={() => document.getElementById('interest-intake')?.scrollIntoView({ behavior: 'smooth' })}>
                Express Interest in Participation
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── 2. Governance Statement ──────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl">
            <Card className="glass-intense border-white/10 p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <Shield className="w-6 h-6 text-indigo-400 mt-0.5 shrink-0" />
                <div>
                  <h2 className="text-lg font-bold text-white mb-3">Governance Statement</h2>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Kashmir EcoWatch separates operational management, scientific advisory, expert review, and institutional coordination into distinct but interconnected layers. This structure exists to preserve methodological rigor, accountability, ecological sensitivity, and trust across data intake, interpretation, publication, and platform evolution.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* ─── 3. Four Pillars of Governance ────────────────────────────────── */}
      <section id="pillars" className="py-16 md:py-20 bg-slate-900">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <Badge variant="info">Structure</Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-4 mb-3">Four Pillars of Governance</h2>
            <p className="text-slate-400 max-w-3xl leading-relaxed">
              Distinct but interconnected layers that ensure accountability, scientific rigor, and operational effectiveness.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {FOUR_PILLARS.map((pillar, i) => (
              <motion.div key={pillar.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <Card className="glass-intense border-white/10 p-5 h-full">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${pillar.color} flex items-center justify-center mb-3`}>
                    <pillar.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-2">{pillar.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{pillar.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. Current Governance Composition ────────────────────────────── */}
      <section id="composition" className="py-16 md:py-20 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <Badge variant="info">Composition</Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-4 mb-3">Current Governance Composition</h2>
            <p className="text-slate-400 max-w-3xl leading-relaxed">
              Kashmir EcoWatch maintains both public-facing and restricted governance layers. Where appropriate, leadership roles, advisory participants, expert committee members, affiliated experts, and institutional collaborators may be displayed publicly. Some positions may remain partially visible or internal due to sensitivity, institutional constraints, or review confidentiality.
            </p>
          </motion.div>

          <div className="max-w-4xl space-y-3">
            {[
              { id: 'leadership', title: 'Platform Leadership', count: `${LEADERSHIP_SEATS.filter(s => s.filled).length} of ${LEADERSHIP_SEATS.length} seats filled`, content: null },
              { id: 'advisory', title: 'Scientific Advisory', count: `${ADVISORY_SEATS.filter(s => s.status === 'Seat Filled').length} active, ${ADVISORY_SEATS.filter(s => s.status.includes('Reserved')).length} reserved`, content: null },
              { id: 'expert-committee', title: 'Global Diaspora Environmental Expert Committee', count: `${EXPERT_COMMITTEE_DISPLAY.domainPools.length} domain pools active`, content: null },
              { id: 'ops', title: 'Operational Management Team', count: `${OPS_ROLES.filter(r => r.status === 'Seat Filled').length} filled, ${OPS_ROLES.filter(r => r.status.includes('Formation')).length} under formation`, content: null },
              { id: 'affiliated', title: 'Affiliated Experts & Institutional Partners', count: `${AFFILIATED_EXPERTS_PREVIEW.length} expert seats open, ${INSTITUTIONAL_PARTNERS_PREVIEW.length} partners listed`, content: null },
            ].map((section, i) => (
              <motion.div key={section.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}>
                <Card className="glass-intense border-white/10 p-0 overflow-hidden cursor-pointer" onClick={() => setOpenSection(openSection === section.id ? null : section.id)}>
                  <div className="p-5 flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-sm font-bold text-white">{section.title}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">{section.count}</p>
                    </div>
                    <span className="text-slate-400 shrink-0">{openSection === section.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}</span>
                  </div>
                  {openSection === section.id && (
                    <div className="px-5 pb-5 border-t border-white/10 pt-3">
                      {section.id === 'leadership' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {LEADERSHIP_SEATS.map(seat => (
                            <Card key={seat.title} className="bg-white/5 border-white/5 p-3">
                              <div className="flex items-center justify-between mb-1">
                                <h4 className="text-xs font-bold text-white">{seat.title}</h4>
                                <span className={cn('text-xs px-1.5 py-0.5 rounded-full', visibilityBadge(seat.visibility))}>{seat.visibility}</span>
                              </div>
                              <p className="text-xs text-slate-500">{seat.responsibility}</p>
                              {seat.public && seat.link && (
                                <a href={seat.link} className="text-xs text-indigo-400 hover:underline mt-1 inline-block">View Profile →</a>
                              )}
                            </Card>
                          ))}
                        </div>
                      )}
                      {section.id === 'advisory' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {ADVISORY_SEATS.map(seat => (
                            <Card key={seat.title} className="bg-white/5 border-white/5 p-3">
                              <h4 className="text-xs font-bold text-white mb-1">{seat.title}</h4>
                              <div className="flex items-center gap-2">
                                <span className={cn('text-xs px-1.5 py-0.5 rounded-full', visibilityBadge(seat.status))}>{seat.status}</span>
                                <span className="text-xs text-slate-500">{seat.domain}</span>
                              </div>
                            </Card>
                          ))}
                        </div>
                      )}
                      {section.id === 'expert-committee' && (
                        <div className="space-y-3">
                          <p className="text-xs text-slate-300 leading-relaxed">
                            A structured expert layer for scientific interpretation, contextual environmental review, thematic escalation, sensitive publication judgment, and specialist domain assessment where routine workflows alone are not sufficient.
                          </p>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {[
                              { label: 'Publicly Listed', value: EXPERT_COMMITTEE_DISPLAY.publiclyListed, color: 'text-emerald-400' },
                              { label: 'Retired Senior Advisors', value: EXPERT_COMMITTEE_DISPLAY.retiredSeniorAdvisors, color: 'text-blue-400' },
                              { label: 'Specialist Review Seats', value: EXPERT_COMMITTEE_DISPLAY.specialistReviewSeats, color: 'text-violet-400' },
                              { label: 'Restricted Review', value: EXPERT_COMMITTEE_DISPLAY.restrictedReviewMembers, color: 'text-slate-400' },
                            ].map(stat => (
                              <div key={stat.label} className="text-center p-3 rounded-lg bg-white/5">
                                <div className={cn('text-xl font-bold', stat.color)}>{stat.value}</div>
                                <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
                              </div>
                            ))}
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {EXPERT_COMMITTEE_DISPLAY.domainPools.map(pool => (
                              <span key={pool} className="text-xs px-2 py-1 rounded bg-white/5 text-slate-400">{pool}</span>
                            ))}
                          </div>
                        </div>
                      )}
                      {section.id === 'ops' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {OPS_ROLES.map(role => (
                            <Card key={role.role} className="bg-white/5 border-white/5 p-3">
                              <h4 className="text-xs font-bold text-white mb-1">{role.role}</h4>
                              <span className={cn('text-xs px-1.5 py-0.5 rounded-full', visibilityBadge(role.status))}>{role.status}</span>
                            </Card>
                          ))}
                        </div>
                      )}
                      {section.id === 'affiliated' && (
                        <div className="space-y-3">
                          <p className="text-xs text-slate-400">Affiliated expert seats are open for qualified individuals. Institutional partners are listed below.</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {INSTITUTIONAL_PARTNERS_PREVIEW.map(p => (
                              <Card key={p.name} className="bg-white/5 border-white/5 p-3">
                                <div className="flex items-center justify-between mb-1">
                                  <h4 className="text-xs font-bold text-white">{p.name}</h4>
                                  <span className={cn('text-xs px-1.5 py-0.5 rounded-full', visibilityBadge(p.badge))}>{p.badge}</span>
                                </div>
                                <p className="text-xs text-slate-500">{p.type} — {p.domain}</p>
                                <p className="text-xs text-slate-500">{p.geo}</p>
                              </Card>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5. Platform Leadership ───────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-slate-950">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl">
            <Card className="glass-intense border-white/10 p-6 sm:p-8">
              <h2 className="text-lg font-bold text-white mb-3">Platform Leadership</h2>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                Kashmir EcoWatch is led by a core team responsible for platform vision, strategic partnerships, institutional relationships, and public-interest direction. The platform operates as a Kashmir diaspora-supported initiative with institutional backing from the <strong className="text-white">Dr. Kumar Foundation USA</strong>.
              </p>
              <p className="text-sm text-slate-400 leading-relaxed">
                Oversight is provided through governance accountability, expert committee review of methodology and publication decisions, institutional partner coordination for data quality and credibility, community feedback pathways, and transparent methodology, terms of use, and verification frameworks.
              </p>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* ─── 6. Scientific Advisory ───────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <Badge variant="info">Advisory</Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-4 mb-3">Scientific Advisory</h2>
            <p className="text-slate-400 max-w-3xl leading-relaxed">
              Guidance on methodology, confidence frameworks, review logic, and methodological transparency across platform intelligence layers.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl">
            {ADVISORY_SEATS.map(seat => (
              <Card key={seat.title} className="glass-intense border-white/10 p-4">
                <h3 className="text-xs font-bold text-white mb-2">{seat.title}</h3>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={cn('text-xs px-1.5 py-0.5 rounded-full', visibilityBadge(seat.status))}>{seat.status}</span>
                  <span className="text-xs text-slate-500">{seat.visibility}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 7. Global Diaspora Environmental Expert Committee ────────────── */}
      <section className="py-16 md:py-20 bg-slate-900">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl">
            <Badge variant="info">Expert Committee</Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-4 mb-3">Global Diaspora Environmental Expert Committee</h2>
            <p className="text-slate-400 mb-6 leading-relaxed">
              A structured expert layer for scientific interpretation, contextual environmental review, thematic escalation, sensitive publication judgment, and specialist domain assessment where routine workflows alone are not sufficient.
            </p>

            <Card className="glass-intense border-white/10 p-6 mb-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                {[
                  { label: 'Publicly Listed', value: EXPERT_COMMITTEE_DISPLAY.publiclyListed, color: 'text-emerald-400' },
                  { label: 'Retired Senior Advisors', value: EXPERT_COMMITTEE_DISPLAY.retiredSeniorAdvisors, color: 'text-blue-400' },
                  { label: 'Specialist Review Seats', value: EXPERT_COMMITTEE_DISPLAY.specialistReviewSeats, color: 'text-violet-400' },
                  { label: 'Restricted Review', value: EXPERT_COMMITTEE_DISPLAY.restrictedReviewMembers, color: 'text-slate-400' },
                ].map(stat => (
                  <div key={stat.label} className="text-center">
                    <div className={cn('text-2xl font-bold', stat.color)}>{stat.value}</div>
                    <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {EXPERT_COMMITTEE_DISPLAY.domainPools.map(pool => (
                  <span key={pool} className="text-xs px-2 py-1 rounded bg-white/5 text-slate-400">{pool}</span>
                ))}
              </div>
            </Card>

            <Button variant="outline" className="border-white/20 text-white hover:bg-white/5" onClick={() => router.push('/about/expert-committee')}>
              View Full Committee Page <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ─── 8. Operational Management Team ───────────────────────────────── */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <Badge variant="info">Operations</Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-4 mb-3">Operational Management Team</h2>
            <p className="text-slate-400 max-w-3xl leading-relaxed">
              Day-to-day platform operations, evidence handling, contribution review, alert coordination, and system maintenance.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl">
            {OPS_ROLES.map(role => (
              <Card key={role.role} className="glass-intense border-white/10 p-4">
                <h3 className="text-xs font-bold text-white mb-2">{role.role}</h3>
                <span className={cn('text-xs px-1.5 py-0.5 rounded-full', visibilityBadge(role.status))}>{role.status}</span>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 9. Affiliated Experts & Institutional Partners ───────────────── */}
      <section className="py-16 md:py-20 bg-slate-950">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <Badge variant="info">Network</Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-4 mb-3">Affiliated Experts & Institutional Partners</h2>
          </motion.div>

          <div className="flex flex-wrap gap-2 mb-6">
            {['Affiliated Experts', 'Institutional Partners'].map(tab => (
              <button key={tab} onClick={() => setAffiliatedTab(tab)} className={cn('px-3 py-1.5 rounded-lg text-xs font-medium transition-colors', affiliatedTab === tab ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white')}>
                {tab}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl">
            {affiliatedTab === 'Affiliated Experts'
              ? AFFILIATED_EXPERTS_PREVIEW.map(exp => (
                  <Card key={exp.name} className="glass-intense border-white/10 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xs font-bold text-white">{exp.name}</h3>
                      <span className={cn('text-xs px-1.5 py-0.5 rounded-full', visibilityBadge(exp.visibility))}>{exp.visibility}</span>
                    </div>
                    <p className="text-xs text-slate-500">{exp.type} — {exp.domain}</p>
                    <p className="text-xs text-slate-500">{exp.geo}</p>
                    <p className="text-xs text-slate-500 mt-1">{exp.relevance}</p>
                  </Card>
                ))
              : INSTITUTIONAL_PARTNERS_PREVIEW.map(p => (
                  <Card key={p.name} className="glass-intense border-white/10 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xs font-bold text-white">{p.name}</h3>
                      <span className={cn('text-xs px-1.5 py-0.5 rounded-full', visibilityBadge(p.badge))}>{p.badge}</span>
                    </div>
                    <p className="text-xs text-slate-500">{p.type} — {p.domain}</p>
                    <p className="text-xs text-slate-500">{p.geo}</p>
                    <p className="text-xs text-slate-500 mt-1">{p.relevance}</p>
                  </Card>
                ))}
          </div>
        </div>
      </section>

      {/* ─── 10. How Advisory Works ───────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <Badge variant="info">Advisory</Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-4 mb-3">How Advisory Works</h2>
            <p className="text-slate-400 max-w-3xl leading-relaxed">
              Specialized advisory streams providing structured guidance across methodology, ethics, technology, and institutional coordination.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl">
            {ADVISORY_STREAMS.map(stream => (
              <Card key={stream.title} className="glass-intense border-white/10 p-5">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                    <stream.icon className={cn('w-5 h-5', stream.color)} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white mb-2">{stream.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{stream.desc}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 11. Oversight Mechanisms ─────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-slate-900">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <Badge variant="info">Oversight</Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-4 mb-3">Oversight Mechanisms</h2>
            <p className="text-slate-400 max-w-3xl leading-relaxed">
              Governance control layers ensuring platform integrity, scientific credibility, and public-interest alignment.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl">
            {OVERSIGHT_MECHANISMS.map((m, i) => (
              <Card key={m.title} className="glass-intense border-white/10 p-5">
                <m.icon className="w-5 h-5 text-indigo-400 mb-3" />
                <h3 className="text-sm font-bold text-white mb-2">{m.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{m.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 12. Governance Interest Intake ───────────────────────────────── */}
      <section id="interest-intake" className="py-16 md:py-20 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <Badge variant="info">Interest Intake</Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-4 mb-3">Interested in Governance, Advisory, or Expert Participation?</h2>
            <p className="text-slate-400 max-w-3xl leading-relaxed">
              Kashmir EcoWatch may consider expressions of interest from qualified individuals, retired professionals, affiliated experts, institutions, technical specialists, and trusted advisors whose expertise can strengthen governance, scientific interpretation, review systems, thematic assessment, or public-interest environmental stewardship.
            </p>
            <p className="text-xs text-slate-500 mt-2 max-w-3xl">
              Submission of interest does not guarantee appointment, membership, or public listing. All expressions are assessed according to scientific relevance, governance fit, expertise, credibility, operational need, and visibility suitability.
            </p>
          </motion.div>

          <Card className="glass-intense border-white/10 p-6 sm:p-8 max-w-4xl">
            {/* Step indicator */}
            <div className="flex items-center gap-1 mb-8 overflow-x-auto pb-2">
              {['Interest Category', 'Applicant Type', 'Profile', 'Governance Relevance', 'Intended Contribution', 'Evidence', 'Kashmir Relevance', 'Visibility', 'Nomination', 'Review'].map((label, i) => (
                <div key={label} className={cn('flex items-center shrink-0', i < 9 && 'mr-1')}>
                  <div className={cn('w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold', interestForm.step > i + 1 ? 'bg-indigo-500 text-white' : interestForm.step === i + 1 ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' : 'bg-white/5 text-slate-500')}>
                    {interestForm.step > i + 1 ? <CheckCircle className="w-4 h-4" /> : i + 1}
                  </div>
                  <span className={cn('text-xs ml-1 hidden lg:inline', interestForm.step === i + 1 ? 'text-indigo-400' : 'text-slate-500')}>{label}</span>
                </div>
              ))}
            </div>

            {/* Step 1: Interest Category */}
            {interestForm.step === 1 && (
              <div>
                <h3 className="text-sm font-bold text-white mb-4">Select Interest Category</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {INTEREST_CATEGORIES.map(cat => (
                    <button key={cat} onClick={() => setInterestForm({ ...interestForm, category: cat })} className={cn('px-4 py-3 rounded-lg text-sm text-left transition-colors border', interestForm.category === cat ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10')}>{cat}</button>
                  ))}
                </div>
                <Button className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white" onClick={() => setInterestForm({ ...interestForm, step: 2 })} disabled={!interestForm.category}>Continue</Button>
              </div>
            )}

            {/* Step 2: Applicant Type */}
            {interestForm.step === 2 && (
              <div>
                <h3 className="text-sm font-bold text-white mb-4">Applicant Type</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {APPLICANT_TYPES.map(type => (
                    <button key={type} onClick={() => setInterestForm({ ...interestForm, applicantType: type })} className={cn('px-4 py-3 rounded-lg text-sm text-left transition-colors border', interestForm.applicantType === type ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10')}>{type}</button>
                  ))}
                </div>
                <div className="flex gap-3 mt-6">
                  <Button variant="outline" className="border-white/20 text-white" onClick={() => setInterestForm({ ...interestForm, step: 1 })}>Back</Button>
                  <Button className="bg-indigo-600 hover:bg-indigo-700 text-white" onClick={() => setInterestForm({ ...interestForm, step: 3 })} disabled={!interestForm.applicantType}>Continue</Button>
                </div>
              </div>
            )}

            {/* Step 3: Profile */}
            {interestForm.step === 3 && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-white mb-4">Profile</h3>
                {['name', 'designation', 'affiliation', 'formerInstitution', 'country', 'base', 'email', 'phone', 'profileUrl'].map(key => (
                  <div key={key}>
                    <label className="block text-xs font-medium text-slate-300 mb-1">{key.split(/(?=[A-Z])/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}{key === 'name' || key === 'email' ? <span className="text-red-400 ml-1">*</span> : ''}</label>
                    <input type="text" value={(interestForm as any)[key] || ''} onChange={e => setInterestForm({ ...interestForm, [key]: e.target.value })} className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm" placeholder={key.split(/(?=[A-Z])/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} />
                  </div>
                ))}
                <div className="flex gap-3 mt-6">
                  <Button variant="outline" className="border-white/20 text-white" onClick={() => setInterestForm({ ...interestForm, step: 2 })}>Back</Button>
                  <Button className="bg-indigo-600 hover:bg-indigo-700 text-white" onClick={() => setInterestForm({ ...interestForm, step: 4 })}>Continue</Button>
                </div>
              </div>
            )}

            {/* Step 4: Governance Relevance */}
            {interestForm.step === 4 && (
              <div>
                <h3 className="text-sm font-bold text-white mb-4">Governance Relevance (multi-select)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {GOVERNANCE_RELEVANCE.map(r => (
                    <button key={r} onClick={() => setInterestForm({ ...interestForm, relevance: toggleSelection(interestForm.relevance, r) })} className={cn('px-4 py-3 rounded-lg text-sm text-left transition-colors border', interestForm.relevance.includes(r) ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10')}>
                      {interestForm.relevance.includes(r) && <CheckCircle2 className="w-4 h-4 inline mr-2 text-indigo-400" />}{r}
                    </button>
                  ))}
                </div>
                <div className="flex gap-3 mt-6">
                  <Button variant="outline" className="border-white/20 text-white" onClick={() => setInterestForm({ ...interestForm, step: 3 })}>Back</Button>
                  <Button className="bg-indigo-600 hover:bg-indigo-700 text-white" onClick={() => setInterestForm({ ...interestForm, step: 5 })}>Continue</Button>
                </div>
              </div>
            )}

            {/* Step 5: Intended Contribution */}
            {interestForm.step === 5 && (
              <div>
                <h3 className="text-sm font-bold text-white mb-4">Intended Contribution (multi-select)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {INTENDED_CONTRIBUTIONS.map(c => (
                    <button key={c} onClick={() => setInterestForm({ ...interestForm, contributions: toggleSelection(interestForm.contributions, c) })} className={cn('px-4 py-3 rounded-lg text-sm text-left transition-colors border', interestForm.contributions.includes(c) ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10')}>
                      {interestForm.contributions.includes(c) && <CheckCircle2 className="w-4 h-4 inline mr-2 text-indigo-400" />}{c}
                    </button>
                  ))}
                </div>
                <div className="flex gap-3 mt-6">
                  <Button variant="outline" className="border-white/20 text-white" onClick={() => setInterestForm({ ...interestForm, step: 4 })}>Back</Button>
                  <Button className="bg-indigo-600 hover:bg-indigo-700 text-white" onClick={() => setInterestForm({ ...interestForm, step: 6 })}>Continue</Button>
                </div>
              </div>
            )}

            {/* Steps 6-10 simplified */}
            {interestForm.step === 6 && (
              <div>
                <h3 className="text-sm font-bold text-white mb-4">Evidence and Credibility</h3>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Years of Experience</label>
                  <input type="text" value={interestForm.experience} onChange={e => setInterestForm({ ...interestForm, experience: e.target.value })} className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm" placeholder="e.g., 15+ years in environmental science" />
                </div>
                <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-indigo-500/30 transition-colors cursor-pointer mt-4">
                  <Upload className="w-8 h-8 text-slate-500 mx-auto mb-3" />
                  <p className="text-sm text-slate-400">Upload CV, publications, reports, certifications, or retired service proof</p>
                  <p className="text-xs text-slate-500 mt-1">PDF, DOC, images (max 25MB each)</p>
                </div>
                <div className="flex gap-3 mt-6">
                  <Button variant="outline" className="border-white/20 text-white" onClick={() => setInterestForm({ ...interestForm, step: 5 })}>Back</Button>
                  <Button className="bg-indigo-600 hover:bg-indigo-700 text-white" onClick={() => setInterestForm({ ...interestForm, step: 7 })}>Continue</Button>
                </div>
              </div>
            )}

            {interestForm.step === 7 && (
              <div>
                <h3 className="text-sm font-bold text-white mb-4">Kashmir Relevance</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {KASHMIR_RELEVANCE.map(r => (
                    <button key={r} onClick={() => setInterestForm({ ...interestForm, kashmirRelevance: r })} className={cn('px-4 py-3 rounded-lg text-sm text-left transition-colors border', interestForm.kashmirRelevance === r ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10')}>{r}</button>
                  ))}
                </div>
                <div className="flex gap-3 mt-6">
                  <Button variant="outline" className="border-white/20 text-white" onClick={() => setInterestForm({ ...interestForm, step: 6 })}>Back</Button>
                  <Button className="bg-indigo-600 hover:bg-indigo-700 text-white" onClick={() => setInterestForm({ ...interestForm, step: 8 })} disabled={!interestForm.kashmirRelevance}>Continue</Button>
                </div>
              </div>
            )}

            {interestForm.step === 8 && (
              <div>
                <h3 className="text-sm font-bold text-white mb-4">Visibility Preference</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {VISIBILITY_OPTIONS.map(v => (
                    <button key={v} onClick={() => setInterestForm({ ...interestForm, visibility: v })} className={cn('px-4 py-3 rounded-lg text-sm text-left transition-colors border', interestForm.visibility === v ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10')}>{v}</button>
                  ))}
                </div>
                <div className="flex gap-3 mt-6">
                  <Button variant="outline" className="border-white/20 text-white" onClick={() => setInterestForm({ ...interestForm, step: 7 })}>Back</Button>
                  <Button className="bg-indigo-600 hover:bg-indigo-700 text-white" onClick={() => setInterestForm({ ...interestForm, step: interestForm.category.includes('Nomination') ? 9 : 10 })} disabled={!interestForm.visibility}>Continue</Button>
                </div>
              </div>
            )}

            {interestForm.step === 9 && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-white mb-4">Nomination Details</h3>
                {['nomineeName', 'nomineeWhy', 'nomineeRelationship', 'nomineeContact', 'nomineeNote'].map(key => (
                  <div key={key}>
                    <label className="block text-xs font-medium text-slate-300 mb-1">{key.split(/(?=[A-Z])/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</label>
                    {key === 'nomineeNote' ? (
                      <textarea value={(interestForm as any)[key] || ''} onChange={e => setInterestForm({ ...interestForm, [key]: e.target.value })} rows={3} className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm resize-none" placeholder="Supporting note" />
                    ) : (
                      <input type="text" value={(interestForm as any)[key] || ''} onChange={e => setInterestForm({ ...interestForm, [key]: e.target.value })} className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm" placeholder={key.split(/(?=[A-Z])/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} />
                    )}
                  </div>
                ))}
                <div className="flex gap-3 mt-6">
                  <Button variant="outline" className="border-white/20 text-white" onClick={() => setInterestForm({ ...interestForm, step: 8 })}>Back</Button>
                  <Button className="bg-indigo-600 hover:bg-indigo-700 text-white" onClick={() => setInterestForm({ ...interestForm, step: 10 })}>Review & Submit</Button>
                </div>
              </div>
            )}

            {interestForm.step === 10 && (
              <div>
                <h3 className="text-sm font-bold text-white mb-4">Review Summary</h3>
                <Card className="bg-white/5 border-white/10 p-4 mb-6">
                  <div className="space-y-2 text-sm">
                    <p><span className="text-slate-500">Interest Category:</span> <span className="text-white">{interestForm.category || '—'}</span></p>
                    <p><span className="text-slate-500">Applicant Type:</span> <span className="text-white">{interestForm.applicantType || '—'}</span></p>
                    <p><span className="text-slate-500">Name:</span> <span className="text-white">{interestForm.name || '—'}</span></p>
                    <p><span className="text-slate-500">Email:</span> <span className="text-white">{interestForm.email || '—'}</span></p>
                    <p><span className="text-slate-500">Governance Relevance:</span> <span className="text-white">{interestForm.relevance.join(', ') || '—'}</span></p>
                    <p><span className="text-slate-500">Intended Contribution:</span> <span className="text-white">{interestForm.contributions.join(', ') || '—'}</span></p>
                    <p><span className="text-slate-500">Kashmir Relevance:</span> <span className="text-white">{interestForm.kashmirRelevance || '—'}</span></p>
                    <p><span className="text-slate-500">Visibility:</span> <span className="text-white">{interestForm.visibility || '—'}</span></p>
                  </div>
                </Card>
                <div className="flex gap-3">
                  <Button variant="outline" className="border-white/20 text-white" onClick={() => setInterestForm({ ...interestForm, step: 8 })}>Back</Button>
                  <Button className="bg-indigo-600 hover:bg-indigo-700 text-white" onClick={() => { alert('Expression of interest submitted for review.'); setInterestForm({ step: 1, category: '', applicantType: '', name: '', designation: '', affiliation: '', formerInstitution: '', country: '', base: '', email: '', phone: '', profileUrl: '', institutionName: '', institutionType: '', focalPerson: '', role: '', instEmail: '', website: '', instGeography: '', instDomain: '', relevance: [], contributions: [], experience: '', kashmirRelevance: '', visibility: '', nomineeName: '', nomineeWhy: '', nomineeRelationship: '', nomineeContact: '', nomineeNote: '' }); }}>Submit Expression of Interest</Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </section>

      {/* ─── 13. Contact for Governance Matters ───────────────────────────── */}
      <section className="py-16 md:py-20 bg-slate-950">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl">
            <Badge variant="info">Contact</Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-4 mb-3">Contact for Governance Matters</h2>
            <p className="text-slate-400 mb-8 leading-relaxed">
              These addresses may route into a shared backend handling system, but the public-facing contact shown in the UI matches the user's intent and context.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: 'Governance inquiries', email: 'contact@kashmir-ecowatch.com', icon: Shield, color: 'text-indigo-400' },
                { label: 'Expert participation', email: 'experts@kashmir-ecowatch.com', icon: Microscope, color: 'text-violet-400' },
                { label: 'Institutional coordination', email: 'partners@kashmir-ecowatch.com', icon: Handshake, color: 'text-blue-400' },
              ].map(c => (
                <Card key={c.label} className="glass-intense border-white/10 p-5">
                  <c.icon className={cn('w-6 h-6 mb-3', c.color)} />
                  <p className="text-xs text-slate-500 mb-1">{c.label}</p>
                  <a href={`mailto:${c.email}`} className="text-xs font-mono text-white hover:text-indigo-400 hover:underline break-all">{c.email}</a>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <AdvancedFooter />
    </main>
  );
}
