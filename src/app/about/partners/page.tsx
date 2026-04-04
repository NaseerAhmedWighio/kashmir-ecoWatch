'use client';

import React from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Users, Globe, Heart, ArrowRight, Mail, MapPin, Building2,
  GraduationCap, Shield, Leaf, Database, Activity, BarChart3, Eye
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

const kashmirAcademicPartners = [
  'University of Kashmir',
  'School of Earth & Environmental Sciences, University of Kashmir',
  'Department of Environmental Science, University of Kashmir',
  'Department of Geography & Disaster Management, University of Kashmir',
  'Department of Geoinformatics, University of Kashmir',
  'Department of Botany, University of Kashmir',
  'Department of Zoology, University of Kashmir',
  'Department of Bioresources, University of Kashmir',
  'Centre for Biodiversity and Taxonomy, University of Kashmir',
  'National Himalayan Cryospheric Research Lab, University of Kashmir',
  'SKUAST-Kashmir',
  'Islamic University of Science & Technology',
  'Department of Environment, Sustainability and Climate Change, IUST',
  'Department of Planning & Geomatics, IUST',
  'SKIMS (environmental health relevance)',
];

const jkAuthorities = [
  'J&K Forest Department',
  'Wildlife Wing, J&K',
  'J&K Pollution Control Committee',
  'J&K Lake Conservation & Management Authority',
];

const indiaScientific = [
  'MoEFCC',
  'IMD',
  'CPCB',
  'Survey of India',
  'Wildlife Institute of India',
  'Botanical Survey of India',
  'Zoological Survey of India',
];

const asiaRegional = [
  'ICIMOD',
  'Mountain GeoPortal, ICIMOD',
  'SERVIR Hindu Kush Himalaya resources',
  'South Asia-relevant Himalayan, climate, water, geospatial, and mountain knowledge systems',
];

const globalSystems = [
  'NASA Earthdata',
  'Copernicus Programme',
  'European Space Agency',
  'UNEP World Environment Situation Room',
  'IUCN Red List',
  'GBIF',
  'Ramsar Sites Information System',
];

const partnerContributionRoles = [
  { icon: Heart, title: 'Institutional Support', desc: 'Foundational backing and sponsorship' },
  { icon: GraduationCap, title: 'Scientific Knowledge', desc: 'Research, review, and interpretation' },
  { icon: Database, title: 'Data Contribution', desc: 'Monitoring data and reference systems' },
  { icon: Activity, title: 'Field Monitoring', desc: 'Documentation and observation networks' },
  { icon: Globe, title: 'Geospatial Support', desc: 'Remote sensing and Earth observation' },
  { icon: Leaf, title: 'Biodiversity Reference', desc: 'Species data and conservation systems' },
  { icon: Eye, title: 'Review & Interpretation', desc: 'Expert contextual analysis' },
  { icon: Users, title: 'Public Participation', desc: 'Community reporting and citizen science' },
];

const partnershipPrinciples = [
  'Scientific integrity',
  'Regional grounding',
  'Evidence-based environmental understanding',
  'Geospatial and field-linked environmental visibility',
  'Responsible public publication',
  'Ecological stewardship',
  'Public-interest knowledge systems',
];

export default function PartnersPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-950">
      {/* 1. Hero */}
      <section className="relative pt-20 md:pt-48 pb-16 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/50 via-teal-950/30 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-5xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-2xl">
                <Users className="w-8 h-8 text-white" />
              </div>
              <Badge variant="info" size="lg">Partnerships & Collaboration</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Partners</span>
            </h1>

            <p className="text-xl text-slate-400 leading-relaxed max-w-4xl mb-8">
              Kashmir EcoWatch works through a multi-level collaboration model involving supporting institutions, academic and research ecosystems, environmental authorities, scientific bodies, NGOs, monitoring networks, and knowledge systems connected to Kashmir, Jammu & Kashmir, India, Asia, and the global level. These partnerships strengthen environmental intelligence, data contribution, review, scientific interpretation, geospatial context, field visibility, and public-interest stewardship across the platform.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. How Collaboration Works */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Philosophy</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">How Collaboration Works</h2>
            <p className="text-lg text-slate-400 leading-relaxed">
              Kashmir EcoWatch is not built as a stand-alone information portal. It is designed as a collaborative environmental intelligence ecosystem. Different partners contribute in different ways, including institutional support, data contribution, scientific review, research collaboration, geospatial and Earth observation context, field evidence, environmental interpretation, public participation, and regionally grounded knowledge support.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3. Foundational Support */}
      <section className="py-16 md:py-20 bg-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Foundational Support</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Supporting Institutions</h2>
          </motion.div>

          <Card className="glass-intense border-amber-500/20 bg-amber-500/5 p-8 max-w-3xl">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center flex-shrink-0">
                <Heart className="w-8 h-8 text-amber-400" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-2xl font-bold text-white">Dr. Kumar Foundation USA</h3>
                  <Badge variant="outline" size="sm" className="border-amber-500/30 text-amber-400 bg-amber-500/10">Primary Supporter</Badge>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  Provides foundational institutional support for Kashmir EcoWatch as a Kashmir diaspora-supported initiative for environmental intelligence, scientific stewardship, and public-interest ecological knowledge. The Foundation's role encompasses support, sponsorship, and broader institutional backing for the platform.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* 4. Kashmir-Based Academic & Research */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-blue-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Academic & Research</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Kashmir-Based Academic & Research Collaboration</h2>
            <p className="text-lg text-slate-400 max-w-4xl mb-8 leading-relaxed">
              Kashmir EcoWatch recognizes the importance of Kashmir-based academic and research ecosystems in strengthening biodiversity understanding, environmental science, geospatial work, habitat interpretation, cryosphere studies, water-system knowledge, and district-level ecological awareness.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {kashmirAcademicPartners.map((inst, i) => (
              <motion.div
                key={inst}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
              >
                <Card className="glass-intense border-white/10 p-4">
                  <div className="flex items-start gap-3">
                    <GraduationCap className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-300">{inst}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. J&K Environmental Authorities */}
      <section className="py-16 md:py-20 bg-slate-950">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Authorities</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Environmental Authorities & Regional Institutions</h2>
            <p className="text-lg text-slate-400 max-w-4xl mb-8 leading-relaxed">
              Environmental intelligence across Kashmir depends on meaningful alignment with regional environmental governance, ecological administration, lake and wetland management, pollution control, conservation oversight, and field-linked environmental systems across Jammu & Kashmir.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
            {jkAuthorities.map((auth, i) => (
              <motion.div
                key={auth}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="glass-intense border-white/10 p-5">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-300 font-medium">{auth}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. India-Based Scientific & Regulatory */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-indigo-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">National</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">India-Based Scientific & Regulatory Collaboration</h2>
            <p className="text-lg text-slate-400 max-w-4xl mb-8 leading-relaxed">
              Kashmir EcoWatch may align with India-based scientific, survey, meteorological, biodiversity, environmental, and regulatory institutions that contribute reference systems, methodologies, technical guidance, scientific context, and environmental knowledge relevant to the platform.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl">
            {indiaScientific.map((inst, i) => (
              <motion.div
                key={inst}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="glass-intense border-white/10 p-4">
                  <div className="flex items-start gap-3">
                    <Building2 className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-300 font-medium">{inst}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Asia & South Asia Regional */}
      <section className="py-16 md:py-20 bg-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-cyan-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Regional</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Asia & South Asia Regional Knowledge Systems</h2>
            <p className="text-lg text-slate-400 max-w-4xl mb-8 leading-relaxed">
              Kashmir EcoWatch recognizes the wider Himalayan, mountain, transboundary, climate, water, and geospatial context of environmental knowledge across South Asia. Regional systems and collaborations may contribute geospatial understanding, mountain-environment interpretation, watershed context, cryosphere support, and regional environmental intelligence.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
            {asiaRegional.map((inst, i) => (
              <motion.div
                key={inst}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="glass-intense border-white/10 p-5">
                  <div className="flex items-start gap-3">
                    <Globe className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-300">{inst}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Global Earth Observation */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-purple-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Global</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Global Earth Observation, Biodiversity & Conservation Systems</h2>
            <p className="text-lg text-slate-400 max-w-4xl mb-8 leading-relaxed">
              Kashmir EcoWatch may also be informed by globally recognized Earth observation, geospatial, biodiversity, and conservation systems that strengthen satellite interpretation, remote sensing context, geospatial overlays, biodiversity reference, and environmental comparison at broader scales.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {globalSystems.map((inst, i) => (
              <motion.div
                key={inst}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="glass-intense border-white/10 p-4">
                  <div className="flex items-start gap-3">
                    <Globe className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-300 font-medium">{inst}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. NGOs, Field Networks & Community */}
      <section className="py-16 md:py-20 bg-slate-950">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Community</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">NGOs, Field Networks & Community Collaboration</h2>
            <p className="text-lg text-slate-400 leading-relaxed mb-8">
              Kashmir EcoWatch values collaboration with NGOs, field teams, grassroots conservation groups, citizen-science networks, district-level monitoring contributors, and community-supported environmental documentation systems. These relationships strengthen local visibility, field evidence, issue reporting, ecological observation, public awareness, and regionally grounded environmental participation.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                'NGOs',
                'Field monitoring networks',
                'Grassroots conservation organizations',
                'District-level observation groups',
                'Citizen science communities',
                'Geotagged evidence contributors',
                'Survey and documentation teams',
              ].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03 }}
                >
                  <Card className="glass-intense border-white/10 p-4 text-center">
                    <p className="text-sm text-slate-300 font-medium">{item}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 10. How Partners Contribute */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Contribution Model</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How Partners Contribute</h2>
            <p className="text-lg text-slate-400 max-w-3xl mb-8">
              Different partners and collaborators may contribute to Kashmir EcoWatch through multiple pathways.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {partnerContributionRoles.map((role, i) => (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="glass-intense border-white/10 p-5 text-center h-full">
                  <role.icon className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
                  <h3 className="text-sm font-bold text-white mb-1">{role.title}</h3>
                  <p className="text-xs text-slate-500">{role.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Partnership Principles */}
      <section className="py-16 md:py-20 bg-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Principles</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Partnership Principles</h2>
            <p className="text-lg text-slate-400 mb-8 leading-relaxed">
              Kashmir EcoWatch values collaboration that strengthens:
            </p>

            <div className="space-y-3">
              {partnershipPrinciples.map((principle, i) => (
                <motion.div
                  key={principle}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                  <p className="text-slate-300">{principle}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 12. Institutional Engagement */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <Mail className="w-8 h-8 text-emerald-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Contact</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Institutional Engagement</h2>
            <p className="text-lg text-slate-400 leading-relaxed mb-8">
              For institutional collaboration, research-linked coordination, environmental knowledge partnerships, or support aligned with the Kashmir EcoWatch mission.
            </p>

            <Card className="glass-intense border-white/10 p-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-emerald-400" />
                  <a href="mailto:contact@kashmir-ecowatch.com" className="text-slate-300 hover:text-emerald-400 transition-colors">
                    contact@kashmir-ecowatch.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-emerald-400" />
                  <span className="text-slate-400">Srinagar, Jammu & Kashmir</span>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      <AdvancedFooter />
    </main>
  );
}
