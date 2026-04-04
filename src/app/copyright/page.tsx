'use client';

import React, { useState } from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Shield, FileText, Lock, Code, Database, Globe, AlertTriangle,
  ChevronDown, ChevronUp, BookOpen, Scale, Search, Map,
  BarChart3, Activity, Building2, Eye, Users, Zap, Heart
} from 'lucide-react';
import { motion } from 'framer-motion';

// ─── Sections Data ──────────────────────────────────────────────────────────

const OWNERSHIP_ITEMS = [
  'original page content and written text',
  'platform naming and identity systems',
  'environmental intelligence structure and content organization',
  'custom interface layout and design systems',
  'dashboard arrangements and analytical presentation models',
  'maps, spatial display structures, and geospatial interface design',
  'evidence architecture and structured library systems',
  'district profile presentation systems',
  'monitoring and alert workflow structures',
  'trust and verification presentation frameworks',
  'contribution pathway structures and public reporting logic',
  'platform graphics, icons, labels, and visual components',
  'curated data presentation layers and original compilations',
  'reports, summaries, methodological wording, and legal text',
  'proprietary structural and workflow elements',
];

const IP_SCOPE_ITEMS = [
  { label: 'Copyright in original written, visual, structural, and digital materials' },
  { label: 'Database and compilation-style rights in structured information' },
  { label: 'Proprietary workflow logic and platform-system arrangements' },
  { label: 'Interface and user-experience structures' },
  { label: 'Information design models and digital architecture' },
  { label: 'Naming systems and proprietary presentation formats' },
  { label: 'Technology-linked methods and integrated functional structures' },
  { label: 'Protectable system designs and original implementation models' },
  { label: 'Unregistered and registered rights where applicable' },
];

const PROTECTED_ARCHITECTURE = [
  'module architecture and content hierarchy',
  'routing logic and information organization',
  'district intelligence structuring',
  'environmental evidence categorization',
  'monitoring-to-alert workflow presentation',
  'data, trust, and review architecture',
  'dashboard grouping logic',
  'map-linked environmental entity systems',
  'contribution pathway frameworks',
  'review and verification state presentation models',
  'institutional information systems',
  'public-interest environmental knowledge structuring',
  'integrated design logic connecting environmental, geospatial, analytical, and civic functions',
];

const TECHNOLOGY_ELEMENTS = [
  'platform workflow structures',
  'contribution intake and routing systems',
  'monitoring and risk presentation logic',
  'dashboard and metric display architecture',
  'geospatial integration and map-linked interaction systems',
  'evidence-handling and library-organization systems',
  'trust, methodology, and verification presentation models',
  'public reporting and structured submission workflows',
  'modular interface and component logic',
  'system coordination between environmental domains',
  'digital operational models and integrated platform behavior',
];

const PROHIBITED_EXTRACTIONS = [
  'scraping structured records',
  'bulk copying of text or listings',
  'harvesting evidence or report metadata',
  'extracting district profile structures',
  'copying dashboard arrangements',
  'reproducing module hierarchy',
  'harvesting or reconstructing platform databases',
  'copying mapped or location-linked information',
  'replicating contribution workflows',
  'attempting to clone or imitate the platform\'s structure, logic, or systems',
];

const REVERSE_ENGINEERING_ITEMS = [
  'functional architecture',
  'workflow logic',
  'data-routing structures',
  'geospatial interface design',
  'monitoring integration models',
  'trust-framework presentation logic',
  'structured evidence systems',
  'dashboard layouts or analytical grouping logic',
  'contribution and verification flow arrangements',
  'institutional page systems',
  'integrated user-experience structures',
];

const COMPILATION_RIGHTS = [
  'selection of content',
  'organization of content',
  'categorization of content',
  'relationship between content layers',
  'original arrangement of environmental knowledge systems',
  'structured presentation of evidence, districts, entities, alerts, dashboards, and trust systems',
];

const SENSITIVITY_ITEMS = [
  'vulnerable habitats',
  'rare species',
  'sensitive ecological systems',
  'field contributors',
  'review integrity',
  'public-interest stewardship',
  'responsible publication standards',
];

const ENFORCEMENT_ITEMS = [
  'infringement',
  'unauthorized copying',
  'scraping',
  'system imitation',
  'misuse of sensitive data',
  'false affiliation',
  'unauthorized republication',
  'commercial exploitation',
  'reverse engineering',
  'improper redistribution of protected or restricted materials',
];

const FULL_SECTIONS = [
  {
    id: 'ownership',
    icon: Shield,
    title: '1. Ownership of Platform Materials',
    content: (
      <>
        <p className="text-slate-300 leading-relaxed mb-4">
          Unless otherwise stated, all original content and platform materials appearing on Kashmir EcoWatch are owned by, controlled by, licensed to, or otherwise lawfully used by Kashmir EcoWatch and its relevant rights holders. This includes, without limitation:
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {OWNERSHIP_ITEMS.map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <FileText className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
              <span className="text-sm text-slate-400">{item}</span>
            </li>
          ))}
        </ul>
        <p className="text-slate-300 leading-relaxed mt-4">
          Ownership protection applies not only to isolated content items, but also to the <strong className="text-white">selection, arrangement, coordination, design logic, and integrated system architecture</strong> through which the platform operates.
        </p>
      </>
    ),
  },
  {
    id: 'ip-scope',
    icon: Scale,
    title: '2. Intellectual Property Scope',
    content: (
      <>
        <p className="text-slate-300 leading-relaxed mb-4">
          The intellectual property associated with Kashmir EcoWatch may include, without limitation:
        </p>
        <ul className="space-y-1.5 mb-4">
          {IP_SCOPE_ITEMS.map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <Shield className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
              <span className="text-sm text-slate-400">{item.label}</span>
            </li>
          ))}
        </ul>
        <p className="text-slate-300 leading-relaxed">
          Certain aspects of the platform may include <strong className="text-white">proprietary, patentable, or otherwise legally protectable methods, structures, system logic, design models, workflow arrangements, or technology integrations</strong>, whether formally registered, pending, unregistered, or otherwise recognized under applicable law.
        </p>
      </>
    ),
  },
  {
    id: 'architecture',
    icon: Code,
    title: '3. Protection of Original Platform Architecture',
    content: (
      <>
        <p className="text-slate-300 leading-relaxed mb-4">
          The architecture of Kashmir EcoWatch should be understood as part of its protected digital and intellectual environment. This includes not only visible page content, but also the broader logic through which the platform is structured and experienced. Protected platform architecture may include:
        </p>
        <ul className="space-y-1.5 mb-4">
          {PROTECTED_ARCHITECTURE.map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <Code className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
              <span className="text-sm text-slate-400">{item}</span>
            </li>
          ))}
        </ul>
        <p className="text-slate-300 leading-relaxed">
          Even where individual ideas are not independently protected, the original <strong className="text-white">combination, arrangement, implementation, and expression</strong> of these systems across the platform may still be protected.
        </p>
      </>
    ),
  },
  {
    id: 'technology',
    icon: Database,
    title: '4. Technology, Workflow, and Systems Protection',
    content: (
      <>
        <p className="text-slate-300 leading-relaxed mb-4">
          Kashmir EcoWatch includes technology-enabled structures that go beyond ordinary web publishing. Protected technological and systems-related elements may include:
        </p>
        <ul className="space-y-1.5 mb-4">
          {TECHNOLOGY_ELEMENTS.map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <Database className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
              <span className="text-sm text-slate-400">{item}</span>
            </li>
          ))}
        </ul>
        <p className="text-slate-300 leading-relaxed">
          Certain technology-facing components of the platform may constitute <strong className="text-white">proprietary systems, protectable technology methods, patentable structures, or confidential implementation logic</strong>, depending on the specific element and applicable law.
        </p>
      </>
    ),
  },
  {
    id: 'development',
    icon: Globe,
    title: '5. Platform Development and Technology Integration',
    content: (
      <>
        <p className="text-slate-300 leading-relaxed mb-4">
          Kashmir EcoWatch is designed, engineered, and technologically integrated by <strong className="text-white">Prime Logic Solutions USA</strong> through advanced platform architecture, digital systems design, geospatial integration, structured data workflows, interface systems, and multidisciplinary engineering support.
        </p>
        <p className="text-slate-300 leading-relaxed">
          Where applicable, the platform's engineering logic, system structure, technology-enabled workflows, digital architecture, interface implementation, and integrated design frameworks may form part of the broader protected digital environment associated with Kashmir EcoWatch and its development ecosystem. Protection may extend to engineering structure, system arrangement, technology-enabled platform logic, integrated feature architecture, complex workflow models, digital operational design, and platform-wide environmental intelligence presentation systems.
        </p>
      </>
    ),
  },
  {
    id: 'restrictions',
    icon: Lock,
    title: '6. Content Use Restrictions',
    content: (
      <>
        <p className="text-slate-300 leading-relaxed mb-4">
          No part of Kashmir EcoWatch may be copied, reproduced, republished, uploaded, posted, distributed, transmitted, adapted, translated, reformatted, mirrored, scraped, harvested, compiled into external systems, reverse engineered, deconstructed, sold, licensed, or commercially exploited in whole or in part without prior written authorization, except where limited lawful use is expressly permitted.
        </p>
        <p className="text-slate-300 leading-relaxed">
          Unauthorized reuse is prohibited even where the platform or its materials are copied in altered, partial, derivative, reformatted, or disguised form.
        </p>
      </>
    ),
  },
  {
    id: 'scraping',
    icon: Search,
    title: '7. Prohibition on Scraping, Extraction, and Replication',
    content: (
      <>
        <p className="text-slate-300 leading-relaxed mb-4">
          Unauthorized automated or manual extraction of platform content, structured information, or protected systems is prohibited. This includes, without limitation:
        </p>
        <ul className="space-y-1.5 mb-4">
          {PROHIBITED_EXTRACTIONS.map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
              <span className="text-sm text-slate-400">{item}</span>
            </li>
          ))}
        </ul>
        <p className="text-slate-300 leading-relaxed">
          Any attempt to recreate, imitate, mirror, or rebuild materially similar protected platform structures without authorization may be treated as misuse of protected content, systems, or intellectual property.
        </p>
      </>
    ),
  },
  {
    id: 'reverse-engineering',
    icon: Code,
    title: '8. Restrictions on Reverse Engineering and Functional Imitation',
    content: (
      <>
        <p className="text-slate-300 leading-relaxed mb-4">
          Users, developers, organizations, or third parties may not attempt to reverse engineer, deconstruct, replicate, decode, or imitate protected technical, structural, workflow-based, or design-based aspects of Kashmir EcoWatch for unauthorized use. This includes attempts to reproduce:
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
          {REVERSE_ENGINEERING_ITEMS.map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <Lock className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
              <span className="text-sm text-slate-400">{item}</span>
            </li>
          ))}
        </ul>
        <p className="text-slate-300 leading-relaxed">
          Protection applies not only to literal duplication, but also to <strong className="text-white">substantially similar replication</strong> of protected original arrangement, implementation, or expression.
        </p>
      </>
    ),
  },
  {
    id: 'compilation',
    icon: Database,
    title: '9. Database, Compilation, and Structured Content Rights',
    content: (
      <>
        <p className="text-slate-300 leading-relaxed mb-4">
          Kashmir EcoWatch may include original compilations, structured records, categorized information systems, district-linked arrangements, evidence collections, module-linked groupings, and environmental intelligence frameworks that may qualify for protection as compilations, databases, structured arrangements, or similar organized content systems. This may include protection in the:
        </p>
        <ul className="space-y-1.5 mb-4">
          {COMPILATION_RIGHTS.map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <Database className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
              <span className="text-sm text-slate-400">{item}</span>
            </li>
          ))}
        </ul>
        <p className="text-slate-300 leading-relaxed">
          The fact that some underlying source material may be public, mixed-source, or externally referenced does not remove protection from the platform's original compilation, arrangement, and presentation structure.
        </p>
      </>
    ),
  },
  {
    id: 'brand',
    icon: Globe,
    title: '10. Brand, Name, and Identity Protection',
    content: (
      <>
        <p className="text-slate-300 leading-relaxed">
          The names, labels, platform identity elements, structural page titles, environmental intelligence framing, and visual expressions associated with Kashmir EcoWatch may be protected under applicable intellectual property, branding, unfair competition, passing-off, and related legal principles where applicable. Unauthorized use of the platform name, associated identity, or materially similar branding in ways that create confusion, imitation, association, misrepresentation, or unauthorized affiliation is prohibited.
        </p>
      </>
    ),
  },
  {
    id: 'public-use',
    icon: Users,
    title: '11. Public, Academic, and Reference Use',
    content: (
      <>
        <p className="text-slate-300 leading-relaxed mb-4">
          Kashmir EcoWatch is a public-interest platform, but public-interest purpose does not waive legal rights. Limited personal, educational, academic, journalistic, or public-interest reference use may be permissible where such use is lawful, fair, and appropriately attributed, and where it does not involve:
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            'bulk copying',
            'republication of substantial portions',
            'commercial reuse',
            'removal of context',
            'misuse of sensitive ecological information',
            'unauthorized extraction of structured records',
            'reproduction of protected design or platform systems',
            'redistribution of restricted or non-public materials',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
              <span className="text-sm text-slate-400">{item}</span>
            </li>
          ))}
        </ul>
        <p className="text-slate-300 leading-relaxed mt-4">
          Any broader reuse, republication, or derivative use requires authorization.
        </p>
      </>
    ),
  },
  {
    id: 'sensitive',
    icon: Lock,
    title: '12. Sensitive Ecological and Data-Protection Considerations',
    content: (
      <>
        <p className="text-slate-300 leading-relaxed mb-4">
          Some environmental, geospatial, biodiversity, district, or evidence-linked information on Kashmir EcoWatch may be subject to restriction, masking, generalization, delayed publication, or limited display. This may be done to protect:
        </p>
        <ul className="space-y-1.5 mb-4">
          {SENSITIVITY_ITEMS.map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <Lock className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
              <span className="text-sm text-slate-400">{item}</span>
            </li>
          ))}
        </ul>
        <p className="text-slate-300 leading-relaxed">
          Unauthorized extraction, reconstruction, redistribution, or misuse of such sensitive information may constitute not only a breach of platform terms, but also improper use of protected and sensitivity-controlled platform materials.
        </p>
      </>
    ),
  },
  {
    id: 'no-transfer',
    icon: Shield,
    title: '13. No Implied Transfer of Rights',
    content: (
      <>
        <p className="text-slate-300 leading-relaxed mb-4">
          Accessing Kashmir EcoWatch does not transfer any ownership interest, license, or right in the platform or its protected materials, except for narrow, limited, revocable use rights necessary for lawful viewing and platform interaction consistent with platform terms.
        </p>
        <p className="text-slate-300 leading-relaxed">
          No user, visitor, organization, or third party acquires any right to reproduce platform systems, commercialize platform materials, build derivative works based on protected structure, reuse protected workflows, redistribute platform intelligence as their own, or repackage structured platform materials into separate products or services without explicit authorization.
        </p>
      </>
    ),
  },
  {
    id: 'enforcement',
    icon: AlertTriangle,
    title: '14. Enforcement and Protection of Rights',
    content: (
      <>
        <p className="text-slate-300 leading-relaxed mb-4">
          Kashmir EcoWatch reserves all rights to protect its platform, systems, original content, and associated protected materials through available legal, contractual, technical, or administrative means. This may include action in relation to:
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
          {ENFORCEMENT_ITEMS.map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <AlertTriangle className="w-3.5 h-3.5 text-red-400 mt-0.5 shrink-0" />
              <span className="text-sm text-slate-400">{item}</span>
            </li>
          ))}
        </ul>
        <p className="text-slate-300 leading-relaxed">
          Failure to act in one instance does not waive any future right of enforcement.
        </p>
      </>
    ),
  },
  {
    id: 'permissions',
    icon: FileText,
    title: '15. Permissions and Authorized Use Requests',
    content: (
      <>
        <p className="text-slate-300 leading-relaxed">
          Requests for permissions, licensing, institutional reuse, republication, technical collaboration, or authorized derivative use should be directed through formal written communication. Any permission granted must be explicit and should not be inferred from public availability of platform content.
        </p>
      </>
    ),
  },
  {
    id: 'reservation',
    icon: Shield,
    title: '16. Reservation of Rights',
    content: (
      <>
        <p className="text-slate-300 leading-relaxed font-medium">
          All rights not expressly granted are fully reserved.
        </p>
      </>
    ),
  },
];

// ─── Page Component ──────────────────────────────────────────────────────────

export default function CopyrightPage() {
  const [openSection, setOpenSection] = useState<string | null>('ownership');
  const currentYear = new Date().getFullYear();

  return (
    <main className="min-h-screen bg-slate-950">
      {/* ─── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-20 md:pt-48 pb-16 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/50 via-slate-950/30 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-slate-600 flex items-center justify-center shadow-2xl">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <Badge variant="info" size="lg">Legal Notice</Badge>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
              Copyright, Intellectual Property &amp; Technology <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-slate-400">Protection</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 mb-4 leading-relaxed max-w-3xl">
              © {currentYear} Kashmir EcoWatch. All rights reserved.
            </p>

            <p className="text-base text-slate-400 leading-relaxed max-w-3xl">
              Kashmir EcoWatch is a protected environmental intelligence platform. All original elements associated with the platform, including its identity, structure, technology-enabled systems, content architecture, evidence organization, environmental intelligence frameworks, geospatial presentation methods, dashboards, workflows, visual systems, written materials, reporting structures, and other original digital components, are protected under applicable copyright, intellectual property, database, proprietary systems, and related legal principles.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── Platform Nature ──────────────────────────────────────────────── */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl">
            <Card className="glass-intense border-white/10 p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <Globe className="w-6 h-6 text-indigo-400 mt-0.5 shrink-0" />
                <div>
                  <h3 className="text-sm font-bold text-white mb-2 uppercase tracking-wide">Platform Nature</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    This platform is not a simple informational website. It is a structured digital environment designed to organize, interpret, present, and manage environmental intelligence, evidence systems, geospatial knowledge, monitoring workflows, district-level environmental understanding, public contribution pathways, and institutional information access across Kashmir. As such, both the visible and underlying components of the platform should be treated as protected intellectual and digital property.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* ─── Full Sections (Accordion) ────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-slate-900">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <Badge variant="info">Full Notice</Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-4 mb-3">
              Complete Rights and Protection Notice
            </h2>
            <p className="text-slate-400 max-w-2xl">
              Each section below covers a specific aspect of the platform's intellectual property, technology protection, and legal rights framework.
            </p>
          </motion.div>

          <div className="max-w-4xl space-y-3">
            {FULL_SECTIONS.map((section, i) => (
              <motion.div key={section.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}>
                <Card className="glass-intense border-white/10 p-0 overflow-hidden">
                  <button
                    className="w-full p-5 sm:p-6 flex items-start justify-between gap-4 text-left"
                    onClick={() => setOpenSection(openSection === section.id ? null : section.id)}
                  >
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div className="w-9 h-9 rounded-lg bg-indigo-500/10 flex items-center justify-center shrink-0">
                        <section.icon className="w-5 h-5 text-indigo-400" />
                      </div>
                      <h3 className="text-sm font-semibold text-white leading-snug pt-1">{section.title}</h3>
                    </div>
                    <span className="text-slate-400 shrink-0 mt-1">
                      {openSection === section.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </span>
                  </button>
                  {openSection === section.id && (
                    <div className="px-5 sm:px-6 pb-5 sm:pb-6 border-t border-white/10 pt-4">
                      {section.content}
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Permissions Contact ──────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Card className="glass-intense border-indigo-500/20 p-6">
                <div className="flex items-start gap-4">
                  <FileText className="w-6 h-6 text-indigo-400 mt-0.5 shrink-0" />
                  <div>
                    <h3 className="text-sm font-bold text-white mb-2">Permissions and Inquiries</h3>
                    <p className="text-sm text-slate-400 mb-3 leading-relaxed">
                      For permissions, licensing, institutional reuse, republication, technical collaboration, or authorized derivative use requests:
                    </p>
                    <a href="mailto:legal@kashmir-ecowatch.com" className="text-sm text-indigo-400 font-mono hover:underline">
                      legal@kashmir-ecowatch.com
                    </a>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <Card className="glass-intense border-white/10 p-6">
                <div className="flex items-center gap-4">
                  <Shield className="w-8 h-8 text-emerald-400 shrink-0" />
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-1">All Rights Reserved</h3>
                    <p className="text-sm text-slate-400">
                      © {currentYear} Kashmir EcoWatch. All rights not expressly granted are fully reserved.
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <AdvancedFooter />
    </main>
  );
}
