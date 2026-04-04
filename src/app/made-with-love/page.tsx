'use client';

import React from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Code, Heart, Globe, Database, BarChart3, Activity, Shield,
  Layers, Eye, Map, Zap, BookOpen, Scale, Building2, Users,
  ChevronDown, ChevronUp, ExternalLink, GraduationCap, Award,
  Target, Cpu, Cloud, GitBranch, Monitor
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

// ─── Team Data ──────────────────────────────────────────────────────────────

interface TeamMember {
  name: string;
  role: string;
  degree: string;
  university: string;
  expertise: string;
  icon: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Dr. Michael Anderson',
    role: 'Chief Platform Architect',
    degree: 'PhD in Computer Science',
    university: 'Massachusetts Institute of Technology',
    expertise: 'Large-scale platform architecture, distributed systems, cloud-native infrastructure, software systems design, and high-performance digital ecosystem engineering.',
    icon: 'Cpu',
  },
  {
    name: 'Dr. Emily Carter',
    role: 'Director of Geospatial Intelligence Systems',
    degree: 'PhD in Geographic Information Science',
    university: 'Stanford University',
    expertise: 'GIS architecture, spatial data modeling, remote sensing integration, environmental mapping systems, geospatial analytics, and location-based intelligence platforms.',
    icon: 'Map',
  },
  {
    name: 'Dr. Daniel Brooks',
    role: 'Lead Data Systems Engineer',
    degree: 'PhD in Data Engineering and Computational Systems',
    university: 'Carnegie Mellon University',
    expertise: 'Data architecture, structured information systems, scalable pipelines, metadata design, data integrity frameworks, and analytical systems integration.',
    icon: 'Database',
  },
  {
    name: 'Dr. Olivia Bennett',
    role: 'Environmental Technology Integration Lead',
    degree: 'PhD in Environmental Systems Engineering',
    university: 'University of California, Berkeley',
    expertise: 'Environmental monitoring systems, ecological data integration, sustainability platforms, environmental intelligence workflows, and science-technology coordination.',
    icon: 'Globe',
  },
  {
    name: 'Sophia Mitchell',
    role: 'Senior UX and Interface Systems Designer',
    degree: 'MS in Human-Computer Interaction',
    university: 'Georgia Institute of Technology',
    expertise: 'Complex interface systems, user-centered product design, dashboard usability, accessibility-aware design, institutional digital experiences, and multi-layer platform interaction architecture.',
    icon: 'Monitor',
  },
  {
    name: 'Dr. James Reynolds',
    role: 'Head of Monitoring and Workflow Systems',
    degree: 'PhD in Information Systems and Digital Operations',
    university: 'University of Michigan',
    expertise: 'Workflow design, monitoring pipelines, incident-routing logic, structured submission systems, digital operational models, and platform process architecture.',
    icon: 'Activity',
  },
  {
    name: 'Dr. Ava Thompson',
    role: 'Director of Spatial Data Visualization and Analytics',
    degree: 'PhD in Visualization and Computational Analytics',
    university: 'University of Washington',
    expertise: 'Analytical dashboard systems, environmental data visualization, visual intelligence architecture, comparative metrics, and monitoring-centered information design.',
    icon: 'BarChart3',
  },
  {
    name: 'Christopher Hall',
    role: 'Senior Backend and Infrastructure Engineer',
    degree: 'MS in Software Engineering',
    university: 'Columbia University',
    expertise: 'Backend systems, API engineering, database integration, platform security, server architecture, and scalable deployment environments.',
    icon: 'Cloud',
  },
  {
    name: 'Dr. Natalie Foster',
    role: 'Research Systems and Evidence Architecture Specialist',
    degree: 'PhD in Information Science',
    university: 'Cornell University',
    expertise: 'Evidence systems, digital knowledge architecture, research repository workflows, review structures, source traceability, and institutional information frameworks.',
    icon: 'BookOpen',
  },
  {
    name: 'William Hayes',
    role: 'Lead Frontend Engineer',
    degree: 'MS in Computer Engineering',
    university: 'University of Illinois Urbana-Champaign',
    expertise: 'Advanced frontend architecture, modular component systems, responsive platforms, performance optimization, and large-scale interface engineering.',
    icon: 'Code',
  },
  {
    name: 'Dr. Grace Sullivan',
    role: 'Risk Intelligence and Environmental Systems Analyst',
    degree: 'PhD in Environmental Risk Analysis',
    university: 'Duke University',
    expertise: 'Hazard intelligence systems, environmental risk frameworks, decision-support interfaces, monitoring-linked interpretation, and environmental systems analysis.',
    icon: 'Shield',
  },
  {
    name: 'Alexander Moore',
    role: 'Cloud Infrastructure and DevOps Lead',
    degree: 'MS in Computer Systems Engineering',
    university: 'University of Texas at Austin',
    expertise: 'Cloud infrastructure, CI/CD systems, deployment reliability, system observability, containerized environments, and resilient platform operations.',
    icon: 'Cloud',
  },
  {
    name: 'Dr. Hannah Reed',
    role: 'Digital Governance and Platform Integrity Advisor',
    degree: 'PhD in Technology Policy and Information Governance',
    university: 'Johns Hopkins University',
    expertise: 'Digital governance, platform integrity, trust frameworks, structured review systems, data responsibility, and institutional technology policy alignment.',
    icon: 'Scale',
  },
  {
    name: 'Ethan Walker',
    role: 'GIS Application Engineer',
    degree: 'MS in Geospatial Technologies',
    university: 'Pennsylvania State University',
    expertise: 'Interactive mapping applications, geospatial interface engineering, spatial data services, map performance optimization, and location-driven platform features.',
    icon: 'Map',
  },
  {
    name: 'Dr. Chloe Morgan',
    role: 'Biodiversity and Ecological Knowledge Systems Advisor',
    degree: 'PhD in Ecology and Biodiversity Informatics',
    university: 'University of California, Davis',
    expertise: 'Biodiversity knowledge systems, ecological observation frameworks, habitat intelligence, species data interpretation, and conservation-linked digital systems.',
    icon: 'Globe',
  },
  {
    name: 'Benjamin Scott',
    role: 'Product and Systems Integration Manager',
    degree: 'MBA and MS in Technology Management',
    university: 'Northwestern University',
    expertise: 'Multidisciplinary coordination, systems integration, digital product strategy, cross-functional execution, and complex platform delivery management.',
    icon: 'Layers',
  },
];

// ─── Technology Sections ────────────────────────────────────────────────────

const TECH_SECTIONS = [
  {
    icon: Code,
    title: 'Advanced Web Application Engineering',
    description: 'The platform is built using modern web technologies suitable for structured interfaces, dynamic data presentation, scalable public access, and high-performance user interaction. This allows Kashmir EcoWatch to operate as an evolving environmental intelligence system rather than a fixed content site.',
  },
  {
    icon: Map,
    title: 'Geospatial and Mapping Integration',
    description: 'Geospatial logic is a central part of the platform\'s architecture. Mapping technologies, location-linked interfaces, spatial structure, district intelligence patterns, and geography-aware workflows are integrated to support atlas systems, district profiles, environmental visibility, and risk-linked interpretation.',
  },
  {
    icon: Database,
    title: 'Data Architecture and Structured Information Systems',
    description: 'The platform is built to accommodate structured environmental information, modular content systems, evidence records, contribution pathways, metadata-linked entries, dashboard logic, and multi-category intelligence displays. This data architecture supports both current presentation and future expansion.',
  },
  {
    icon: BarChart3,
    title: 'Dashboard and Analytical Interface Systems',
    description: 'Dashboard technologies and analytical interface patterns are used to support module visibility, district interpretation, environmental metrics, risk dashboards, monitoring summaries, and evidence-linked analytical presentation.',
  },
  {
    icon: Activity,
    title: 'Monitoring and Workflow Integration',
    description: 'The platform is designed to support monitoring systems, alert flows, reporting pipelines, contribution routing, review structures, and evidence-handling logic. This allows public input, institutional knowledge, and environmental intelligence to move through structured workflows rather than disconnected pages.',
  },
  {
    icon: Cloud,
    title: 'Scalable Backend and Infrastructure Logic',
    description: 'Kashmir EcoWatch is engineered with backend and infrastructure planning that supports future growth, structured routing, modular data systems, submission handling, secure workflows, and integration-ready platform operations.',
  },
  {
    icon: Monitor,
    title: 'Responsive Interface and Multi-Device Accessibility',
    description: 'The interface is designed to function across modern desktop and mobile environments while supporting clear layout, structured navigation, visual consistency, and accessible interaction across different platform sections.',
  },
  {
    icon: BookOpen,
    title: 'Content, Evidence, and Contribution Systems',
    description: 'The platform architecture supports not only informational content but also evidence pages, field reports, contribution forms, trust and methodology pages, institutional content, and evolving review-linked submission systems.',
  },
];

const TECH_OBJECTIVES = [
  {
    icon: Layers,
    title: 'Environmental Intelligence at Scale',
    description: 'The platform is designed to handle multiple environmental domains without collapsing into a single flat system. Biodiversity, water systems, environmental monitoring, district intelligence, risk awareness, and evidence systems are all intended to operate within one coherent architecture.',
  },
  {
    icon: Map,
    title: 'Geospatial Visibility',
    description: 'Technology is used to improve environmental visibility through spatial presentation, district-linked interpretation, map awareness, and geography-sensitive workflows.',
  },
  {
    icon: BookOpen,
    title: 'Structured Knowledge Systems',
    description: 'The platform is designed to organize environmental knowledge in a way that is modular, review-aware, source-conscious, and useful for both public understanding and institutional interpretation.',
  },
  {
    icon: Users,
    title: 'Public Contribution with System Logic',
    description: 'Technology is used to support structured contribution pathways such as issue reporting, sightings, data contribution, and citizen science, while maintaining room for review, classification, and publication controls.',
  },
  {
    icon: Shield,
    title: 'Trust, Review, and Publication Control',
    description: 'The platform is designed so that not all data or submissions are treated identically. Technology supports different handling states, review pathways, and differentiated publication logic across evidence types.',
  },
  {
    icon: Zap,
    title: 'Long-Term Expandability',
    description: 'Kashmir EcoWatch is not designed as a closed one-time build. It is intended to expand over time through new modules, deeper evidence systems, improved monitoring layers, richer dashboards, and more mature district and atlas intelligence.',
  },
];

const PLATFORM_SCOPE = [
  { label: 'Protected Areas & Conservation Visibility', icon: Map },
  { label: 'Biodiversity Intelligence & Sightings Systems', icon: Globe },
  { label: 'Water Systems & Hydrological Interpretation', icon: Database },
  { label: 'Environmental Monitoring & Public Environmental Stress', icon: Activity },
  { label: 'Risk & Monitoring Systems', icon: Shield },
  { label: 'Alerts & Advisories', icon: Zap },
  { label: 'District Profiles & Regional Intelligence', icon: Building2 },
  { label: 'Evidence Library & Field Reports', icon: BookOpen },
  { label: 'Trust, Methodology, & Verification Systems', icon: Scale },
  { label: 'Structured Public Contribution Pathways', icon: Users },
  { label: 'Institutional & Public-Interest Information Access', icon: Eye },
];

const LONG_TERM_DIRECTIONS = [
  'Deeper atlas and GIS intelligence',
  'Stronger monitoring workflows',
  'Richer dashboard systems',
  'More mature district intelligence',
  'Improved entity and evidence exploration',
  'Stronger contribution and review pathways',
  'Wider institutional alignment',
  'Better environmental intelligence delivery over time',
];

// ─── Page Component ──────────────────────────────────────────────────────────

export default function TechnologyPage() {
  const [openMember, setOpenMember] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-slate-950">
      {/* ─── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-20 md:pt-48 pb-16 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/50 via-teal-950/30 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-2xl">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <Badge variant="info" size="lg">Built for Kashmir</Badge>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
              Made with <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-rose-400">Love</span> for Kashmir
            </h1>

            <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed max-w-3xl">
              Kashmir EcoWatch is designed, engineered, and technologically integrated by <strong className="text-white">Prime Logic Solutions USA</strong> as a high-performance environmental intelligence platform built for scientific visibility, geospatial interpretation, modular knowledge systems, monitoring workflows, district-level environmental understanding, and structured public contribution.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── Platform Vision ──────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl space-y-8">
            <Card className="glass-intense border-white/10 p-6 sm:p-8">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Platform Vision</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                This platform is not developed as a simple informational website. It is built as a layered digital system that brings together environmental intelligence, evidence architecture, spatial interpretation, data workflows, contribution pathways, dashboard systems, and institutional public access within one integrated ecosystem.
              </p>
              <p className="text-slate-300 leading-relaxed mb-4">
                The technology foundation is therefore intended to support not only presentation, but also structure, interoperability, scalability, environmental reasoning, and long-term platform growth.
              </p>
              <p className="text-slate-300 leading-relaxed">
                Kashmir EcoWatch is developed through a multidisciplinary platform model that combines software engineering, geospatial integration, data architecture, interface systems, workflow design, environmental technology logic, and infrastructure planning. This enables the platform to support modules such as biodiversity, water systems, environmental monitoring, district intelligence, risk and monitoring, evidence library systems, alerts, and public contribution pathways in a coordinated digital environment.
              </p>
            </Card>

            <Card className="glass-intense border-white/10 p-6 sm:p-8">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Platform Development Philosophy</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                The technology behind Kashmir EcoWatch is developed with the understanding that environmental platforms require more than visual interfaces. They require structured systems that can connect environmental data, evidence records, maps, alerts, field intelligence, district interpretation, contribution pathways, dashboards, and institutional trust within one coherent system.
              </p>
              <p className="text-slate-300 leading-relaxed">
                For this reason, Kashmir EcoWatch is engineered as a modular digital platform rather than a static website. Each layer is intended to support the platform's broader mission of environmental understanding, scientific stewardship, district-level visibility, and public-interest ecological knowledge across Kashmir.
              </p>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* ─── Technology Used ──────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-slate-900">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <Badge variant="info">Core Technology</Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-4 mb-3">
              Technology Used for This Platform
            </h2>
            <p className="text-slate-400 max-w-3xl leading-relaxed">
              Kashmir EcoWatch is developed using a modern, scalable, and integration-ready technology framework designed to support advanced environmental and geospatial workflows.
            </p>
          </motion.div>

          <div className="max-w-5xl space-y-4">
            {TECH_SECTIONS.map((section, i) => (
              <motion.div key={section.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <Card className="glass-intense border-white/10 p-5 sm:p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                      <section.icon className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white mb-2">{section.title}</h3>
                      <p className="text-sm text-slate-400 leading-relaxed">{section.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Technology Objectives ────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <Badge variant="info">Objectives</Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-4 mb-3">
              Technology Objectives for Kashmir EcoWatch
            </h2>
            <p className="text-slate-400 max-w-3xl leading-relaxed">
              The technology model for Kashmir EcoWatch is intended to support several long-term platform goals.
            </p>
          </motion.div>

          <div className="max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {TECH_OBJECTIVES.map((obj, i) => (
              <motion.div key={obj.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <Card className="glass-intense border-white/10 p-5 h-full">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-3">
                    <obj.icon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-2">{obj.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{obj.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Team ─────────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-slate-950">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <Badge variant="info">Team</Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-4 mb-3">
              Team Involved in Building This Platform
            </h2>
            <p className="text-slate-400 max-w-3xl leading-relaxed">
              Kashmir EcoWatch is developed through a multidisciplinary team model coordinated by Prime Logic Solutions USA.
            </p>
          </motion.div>

          <div className="max-w-4xl space-y-3">
            {TEAM_MEMBERS.map((member, i) => (
              <motion.div key={member.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}>
                <Card className="glass-intense border-white/10 p-0 overflow-hidden cursor-pointer" onClick={() => setOpenMember(openMember === i ? null : i)}>
                  <div className="p-5 flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shrink-0">
                        <GraduationCap className="w-5 h-5 text-white" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-sm font-bold text-white leading-tight">{member.name}</h3>
                        <p className="text-xs text-emerald-400 font-medium">{member.role}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{member.degree} — {member.university}</p>
                      </div>
                    </div>
                    <span className="text-slate-400 shrink-0 mt-1">
                      {openMember === i ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </span>
                  </div>
                  {openMember === i && (
                    <div className="px-5 pb-5 border-t border-white/10 pt-3">
                      <p className="text-sm text-slate-300 leading-relaxed">{member.expertise}</p>
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Combined Team Capability */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-10 max-w-4xl">
            <Card className="glass-intense border-white/10 p-6 sm:p-8">
              <h3 className="text-lg font-bold text-white mb-3">Combined Team Capability</h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-3">
                Together, this multidisciplinary team structure represents expertise across software engineering, platform architecture, GIS and geospatial intelligence, remote sensing integration, data systems and analytics, environmental technology systems, monitoring workflows, interface and dashboard design, evidence architecture, risk intelligence, cloud infrastructure and deployment, and platform governance and integrity.
              </p>
              <p className="text-sm text-slate-300 leading-relaxed">
                This combined capability allows Kashmir EcoWatch to function not merely as a website, but as a structured environmental intelligence platform with the technical depth to support maps, dashboards, district profiles, contribution workflows, evidence systems, and monitoring-linked digital operations.
              </p>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* ─── Prime Logic Solutions USA ────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl space-y-8">
            <Card className="glass-intense border-white/10 p-6 sm:p-8">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Prime Logic Solutions USA and the Platform Role</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                Prime Logic Solutions USA serves as the technology and platform development force behind Kashmir EcoWatch. Its role is not limited to visual implementation. It includes platform architecture, engineering execution, technology integration, workflow system design, geospatial and data integration, modular environment building, high-performance digital structuring, and support for long-term platform evolution.
              </p>
              <p className="text-slate-300 leading-relaxed">
                This means the platform is not only designed to look modern, but to function as a real environmental intelligence system with room for scale, refinement, and operational maturity.
              </p>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* ─── Platform Scope ───────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-slate-900">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <Badge variant="info">Scope</Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-4 mb-3">
              Platform Scope Supported by Technology
            </h2>
            <p className="text-slate-400 max-w-3xl leading-relaxed">
              The technology and development model behind Kashmir EcoWatch is intended to support all major areas of the platform.
            </p>
          </motion.div>

          <div className="max-w-4xl grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PLATFORM_SCOPE.map((item, i) => (
              <motion.div key={item.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}>
                <Card className="glass-intense border-white/10 p-4">
                  <div className="flex items-center gap-3">
                    <item.icon className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-sm text-slate-300">{item.label}</span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Institutional Alignment & Long-Term Direction ────────────────── */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl space-y-8">
            {/* Institutional Alignment */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Card className="glass-intense border-white/10 p-6 sm:p-8">
                <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Technology and Institutional Alignment</h2>
                <p className="text-slate-300 leading-relaxed">
                  The technical development of Kashmir EcoWatch is intended to remain aligned with the platform's broader institutional identity as a Kashmir diaspora-supported initiative for environmental intelligence and scientific stewardship. Technology on this platform is therefore not treated as cosmetic infrastructure. It is treated as part of the platform's knowledge, trust, and environmental visibility architecture.
                </p>
              </Card>
            </motion.div>

            {/* Long-Term Direction */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Card className="glass-intense border-white/10 p-6 sm:p-8">
                <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Long-Term Development Direction</h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  Kashmir EcoWatch is designed with long-term evolution in mind. The platform's technology foundation is intended to support:
                </p>
                <ul className="space-y-2">
                  {LONG_TERM_DIRECTIONS.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Zap className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                      <span className="text-sm text-slate-300">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-slate-400 text-sm mt-4">
                  This long-view approach is part of what makes the technology and team model central to the platform's credibility.
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Closing Statement ────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-slate-950">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl">
            <Card className="glass-intense border-emerald-500/20 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="w-6 h-6 text-red-400" />
                <h2 className="text-xl md:text-2xl font-bold text-white">Closing Statement</h2>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Kashmir EcoWatch is developed by <strong className="text-white">Prime Logic Solutions USA</strong> through advanced technology integration, platform architecture, and multidisciplinary execution. The platform's technology foundation is built to support environmental intelligence, structured evidence, geospatial interpretation, monitoring workflows, public contribution, and long-term ecological knowledge systems across Kashmir.
              </p>
            </Card>
          </motion.div>
        </div>
      </section>

      <AdvancedFooter />
    </main>
  );
}
