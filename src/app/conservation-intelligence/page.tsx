'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Shield, Network, BookOpen, ExternalLink, ArrowRight,
  Users, Leaf, Trees, Droplet, Fish, Mountain,
  Pill, FileText, Map, ChevronRight,
  Target, GitBranch, Globe, Layers,
  AlertTriangle, CheckCircle, Scale
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

// ============================================================
// DATA: ESRO Conservation Networks
// ============================================================

const conservationNetworks = [
  {
    id: 'bcn',
    name: 'Biodiversity Conservation Network',
    acronym: 'BCN',
    esroFile: 'bcn_eienkashmir.htm',
    description: 'Comprehensive biodiversity conservation framework covering wildlife, plants, fisheries, medicinal plants, and human-wildlife conflict management across Kashmir.',
    color: 'from-emerald-500 to-teal-600',
    icon: Leaf,
    subPrograms: [
      {
        name: 'Council for Wildlife Protection & Research',
        acronym: 'CWPR',
        description: 'Wildlife species protection, research coordination, and conservation policy development.',
        icon: Shield,
        color: 'from-green-500 to-emerald-600',
      },
      {
        name: 'Council for Plant Protection & Research',
        acronym: 'CPPR',
        description: 'Flora conservation, botanical research, and endangered plant species protection.',
        icon: Trees,
        color: 'from-teal-500 to-cyan-600',
      },
      {
        name: 'Wildlife Human Conflict Management Programme',
        acronym: 'WHCMP',
        description: 'Mitigation strategies for human-wildlife conflict, compensation frameworks, and community safety.',
        icon: AlertTriangle,
        color: 'from-amber-500 to-orange-600',
      },
      {
        name: 'Chinar Conservation Network',
        acronym: 'CCN',
        description: 'Protection and regeneration of Kashmir\'s iconic Chinar trees (Platanus orientalis) heritage.',
        icon: Trees,
        color: 'from-red-500 to-rose-600',
      },
      {
        name: 'Fisheries Conservation & Protection Council',
        acronym: 'FCPC',
        description: 'Aquatic biodiversity conservation, fish species protection, and sustainable fisheries management.',
        icon: Fish,
        color: 'from-blue-500 to-indigo-600',
      },
      {
        name: 'Conservation Alliance for Medicinal Plants',
        acronym: 'CAMP',
        description: 'Medicinal plant conservation, sustainable harvesting, and traditional knowledge preservation.',
        icon: Pill,
        color: 'from-purple-500 to-violet-600',
      },
    ],
    ecoWatchMapping: [
      { module: 'Biodiversity Intelligence', path: '/biodiversity', description: 'Species database, threat monitoring, conservation analytics' },
      { module: 'Protected Network', path: '/protected-network', description: 'Protected areas, corridors, species monitoring' },
      { module: 'Risk Monitoring: Human-Wildlife Conflict', path: '/risk-monitoring/human-wildlife-conflict', description: 'Conflict incidents, mitigation strategies' },
      { module: 'Water Systems: Fisheries', path: '/water-systems', description: 'Aquatic biodiversity, fish conservation' },
    ],
  },
  {
    id: 'cank',
    name: 'Climate Action Network Kashmir',
    acronym: 'CANK',
    esroFile: 'cank_eienkashmir.htm',
    description: 'Regional climate action coordination network addressing climate change impacts, mitigation strategies, and adaptation planning for Kashmir Valley.',
    color: 'from-sky-500 to-blue-600',
    icon: Globe,
    subPrograms: [],
    ecoWatchMapping: [
      { module: 'Risk Monitoring: Global Warming Impacts', path: '/risk-monitoring/global-warming-impacts', description: 'Temperature trends, climate impact assessment' },
      { module: 'Risk Monitoring: Glacier & Cryosphere', path: '/risk-monitoring/glacier-cryosphere-risks', description: 'Glacier retreat, snow cover monitoring' },
      { module: 'Seasonal Ecology', path: '/seasonal-ecology', description: 'Phenology shifts, seasonal pattern changes' },
    ],
  },
  {
    id: 'thcnp',
    name: 'Trans-Himalaya Conservation Network Plan',
    acronym: 'THCNP',
    esroFile: 'thcnp_eienkashmir.htm',
    description: 'Cross-border conservation planning for Trans-Himalayan ecosystems, high-altitude biodiversity, and landscape-level ecological connectivity.',
    color: 'from-violet-500 to-purple-600',
    icon: Mountain,
    subPrograms: [],
    ecoWatchMapping: [
      { module: 'Protected Network: Atlas', path: '/protected-network/atlas', description: 'Spatial conservation planning, landscape mapping' },
      { module: 'Protected Network: Corridors', path: '/protected-network/corridors-and-connectivity', description: 'Ecological connectivity, corridor protection' },
      { module: 'Biodiversity: Threatened Species', path: '/biodiversity/threatened-species', description: 'Trans-Himalayan threatened species monitoring' },
    ],
  },
  {
    id: 'cpep',
    name: 'Conservation & Peace Environment Programme',
    acronym: 'CPEP',
    esroFile: 'cpep_eienkashmir.htm',
    description: 'Environment-peacebuilding initiative integrating conservation with community development, sustainable livelihoods, and conflict-sensitive environmental management.',
    color: 'from-amber-500 to-orange-600',
    icon: Scale,
    subPrograms: [],
    ecoWatchMapping: [
      { module: 'Risk Monitoring: Incident Reports', path: '/risk-monitoring/incident-reports', description: 'Environmental incident documentation' },
      { module: 'Field Reports', path: '/field-reports', description: 'Community-based environmental reporting' },
      { module: 'About: Partners', path: '/about/partners', description: 'Multi-stakeholder conservation partnerships' },
    ],
  },
];

const stats = [
  { label: 'Conservation Networks', value: 4, icon: Network, color: 'text-emerald-400' },
  { label: 'Sub-Programs', value: 7, icon: GitBranch, color: 'text-teal-400' },
  { label: 'Species Programs', value: 5, icon: Leaf, color: 'text-green-400' },
  { label: 'Research Partners', value: 45, icon: Users, color: 'text-sky-400' },
];

const conservationPriorities = [
  {
    title: 'Endangered Species Recovery',
    description: 'Hangul (Kashmir Stag), Snow Leopard, Markhor, and other critically endangered species require intensive monitoring and habitat protection.',
    priority: 'Critical',
    networks: ['BCN', 'THCNP'],
    icon: Shield,
  },
  {
    title: 'Climate Change Adaptation',
    description: 'Glacier retreat, shifting precipitation patterns, and phenological disruptions demand coordinated climate action across all elevation zones.',
    priority: 'Critical',
    networks: ['CANK', 'THCNP'],
    icon: Globe,
  },
  {
    title: 'Human-Wildlife Conflict Mitigation',
    description: 'Increasing human-wildlife interface conflicts require early warning systems, compensation mechanisms, and community-based management.',
    priority: 'High',
    networks: ['BCN', 'CPEP'],
    icon: AlertTriangle,
  },
  {
    title: 'Medicinal Plant Conservation',
    description: 'Over-harvesting and habitat loss threaten Kashmir\'s medicinal plant diversity requiring sustainable harvesting protocols and cultivation programs.',
    priority: 'High',
    networks: ['BCN'],
    icon: Pill,
  },
  {
    title: 'Aquatic Ecosystem Protection',
    description: 'Wetland degradation, water pollution, and invasive species threaten freshwater biodiversity including endemic Snow Trout and wetland habitats.',
    priority: 'High',
    networks: ['BCN', 'CPEP'],
    icon: Droplet,
  },
  {
    title: 'Chinar Heritage Conservation',
    description: 'Kashmir\'s iconic Chinar trees face threats from urbanization, disease, and climate stress requiring comprehensive conservation and regeneration.',
    priority: 'Medium',
    networks: ['BCN'],
    icon: Trees,
  },
  {
    title: 'Trans-Himalayan Connectivity',
    description: 'Maintaining ecological corridors between protected areas in Trans-Himalayan regions for wide-ranging species and genetic exchange.',
    priority: 'Medium',
    networks: ['THCNP', 'CANK'],
    icon: Mountain,
  },
  {
    title: 'Community-Based Conservation',
    description: 'Engaging local communities in conservation through sustainable livelihoods, environmental education, and participatory monitoring.',
    priority: 'Medium',
    networks: ['CPEP', 'BCN'],
    icon: Users,
  },
];

const researchPartners = [
  { domain: 'Wildlife Biology', count: 8, expertise: 'Species ecology, population monitoring, habitat assessment' },
  { domain: 'Forestry', count: 6, expertise: 'Forest management, silviculture, forest ecology' },
  { domain: 'Agriculture', count: 5, expertise: 'Crop systems, agroecology, sustainable agriculture' },
  { domain: 'Natural History', count: 4, expertise: 'Taxonomy, biogeography, ecological documentation' },
  { domain: 'Taxonomy', count: 4, expertise: 'Species identification, classification, systematics' },
  { domain: 'Fisheries', count: 4, expertise: 'Aquatic ecology, fish biology, fisheries management' },
  { domain: 'Tourism', count: 3, expertise: 'Ecotourism, sustainable tourism, visitor management' },
  { domain: 'Zoology', count: 4, expertise: 'Animal biology, behavior, physiology' },
  { domain: 'Biotechnology', count: 3, expertise: 'Genetic analysis, conservation genetics, molecular tools' },
  { domain: 'Protected Area Management', count: 4, expertise: 'PA planning, management effectiveness, monitoring' },
];

// ============================================================
// COMPONENTS
// ============================================================

function Breadcrumb() {
  return (
    <nav className="container mx-auto px-6 pt-24 md:pt-32 pb-4" aria-label="Breadcrumb">
      <ol className="flex items-center gap-2 text-sm text-slate-500">
        <li>
          <Link href="/" className="hover:text-slate-300 transition-colors">
            Home
          </Link>
        </li>
        <li>
          <ChevronRight className="w-4 h-4" />
        </li>
        <li className="text-slate-300 font-medium">Conservation Intelligence</li>
      </ol>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className="container mx-auto px-6 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl"
      >
        <div className="flex items-center gap-2 mb-4">
          <Network className="w-6 h-6 text-emerald-400" />
          <span className="text-sm font-semibold uppercase tracking-widest text-slate-400">
            Conservation Intelligence
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
          ESRO Conservation Networks
          <span className="block bg-gradient-to-r from-emerald-400 via-teal-400 to-green-400 bg-clip-text text-transparent">
            Heritage & Intelligence
          </span>
        </h1>

        <p className="text-lg md:text-xl text-slate-400 mb-8 leading-relaxed max-w-3xl">
          Comprehensive documentation of the Environmental Development & Research Organisation (ESRO)
          conservation network architecture that formed the foundation for Kashmir&apos;s environmental
          intelligence platform. Four interconnected networks coordinating biodiversity conservation,
          climate action, Trans-Himalayan planning, and environment-peacebuilding.
        </p>

        <div className="flex flex-wrap gap-4 mb-8">
          <Button
            size="lg"
            className="bg-gradient-to-r from-emerald-600 to-teal-600"
            icon={<Network className="w-5 h-5" />}
          >
            Explore Networks
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/20 text-white"
            icon={<BookOpen className="w-5 h-5" />}
          >
            ESRO Archive
          </Button>
        </div>

        {/* ESRO Heritage Attribution */}
        <div className="bg-gradient-to-r from-emerald-900/20 to-teal-900/20 border border-emerald-500/20 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
              <Users className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-white font-semibold mb-1">ESRO Organizational Structure</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                45 individuals on board — environmentalists, foresters, specialists from wildlife,
                livestock, agriculture, natural history, taxonomy, fisheries, tourism, zoology,
                biotechnology, protected area management.
              </p>
              <p className="text-slate-500 text-xs mt-2">
                Source: Environmental Development & Research Organisation (ESRO) — eienkashmir.htm archives
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function StatsSection() {
  return (
    <section className="container mx-auto px-6 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="glass-intense border-white/10" padding="none">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center p-6 md:p-8">
                <stat.icon className={`w-6 h-6 ${stat.color} mx-auto mb-3`} />
                <div className="text-3xl md:text-4xl font-black text-white tabular-nums mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-slate-500 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </section>
  );
}

function NetworkCard({ network, index }: { network: typeof conservationNetworks[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = network.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="border border-white/5 bg-slate-900/50 h-full" padding="lg">
        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${network.color} text-white flex items-center justify-center shadow-lg flex-shrink-0`}>
            <Icon className="w-7 h-7" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="info" size="sm">{network.acronym}</Badge>
              <Badge variant="outline" size="sm">ESRO</Badge>
            </div>
            <h3 className="text-xl font-bold text-white mb-1">{network.name}</h3>
            <p className="text-xs text-slate-500 font-mono">Source: {network.esroFile}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-400 text-sm leading-relaxed mb-6">{network.description}</p>

        {/* Sub-Programs */}
        {network.subPrograms.length > 0 && (
          <div className="mb-6">
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-2 text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors mb-3"
            >
              <GitBranch className="w-4 h-4" />
              <span>{network.subPrograms.length} Sub-Programs</span>
              <ArrowRight className={`w-4 h-4 transition-transform ${expanded ? 'rotate-90' : ''}`} />
            </button>

            {expanded && (
              <div className="space-y-3">
                {network.subPrograms.map((program, pIdx) => (
                  <div
                    key={pIdx}
                    className="bg-white/5 border border-white/10 rounded-lg p-4"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${program.color} text-white flex items-center justify-center`}>
                        <program.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">{program.acronym}</div>
                        <div className="text-xs text-slate-500">{program.name}</div>
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{program.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* EcoWatch Mapping */}
        <div className="mb-6">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
            <Layers className="w-3 h-3" />
            EcoWatch Module Mapping
          </h4>
          <div className="space-y-2">
            {network.ecoWatchMapping.map((mapping, mIdx) => (
              <Link
                key={mIdx}
                href={mapping.path}
                className="flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-400 transition-colors group"
              >
                <ArrowRight className="w-3 h-3 text-slate-600 group-hover:text-emerald-400 transition-colors" />
                <span className="flex-1">{mapping.module}</span>
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>
        </div>

        {/* ESRO Source Attribution */}
        <div className="pt-4 border-t border-white/5">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <BookOpen className="w-3 h-3" />
            <span>ESRO Legacy: {network.esroFile}</span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

function NetworkGrid() {
  return (
    <section className="container mx-auto px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
            <Network className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">Conservation Networks</h2>
            <p className="text-slate-400">ESRO&apos;s four interconnected conservation architectures</p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {conservationNetworks.map((network, index) => (
          <NetworkCard key={network.id} network={network} index={index} />
        ))}
      </div>
    </section>
  );
}

function ConservationPriorities() {
  const priorityColors: Record<string, string> = {
    Critical: 'danger',
    High: 'warning',
    Medium: 'info',
  } as const;

  return (
    <section className="container mx-auto px-6 py-16 bg-gradient-to-b from-slate-950 to-slate-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
            <Target className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">Conservation Priorities</h2>
            <p className="text-slate-400">Priority actions derived from ESRO conservation network data</p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {conservationPriorities.map((priority, index) => {
          const Icon = priority.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="border border-white/5 bg-slate-900/50 h-full" padding="lg">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl ${
                    priority.priority === 'Critical'
                      ? 'bg-red-500/20 text-red-400'
                      : priority.priority === 'High'
                        ? 'bg-amber-500/20 text-amber-400'
                        : 'bg-sky-500/20 text-sky-400'
                  } flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-bold text-white">{priority.title}</h3>
                      <Badge variant={priorityColors[priority.priority] as any} size="sm">
                        {priority.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed mb-4">
                      {priority.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {priority.networks.map((net) => (
                        <Badge key={net} variant="outline" size="sm">
                          {net}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function ResearchPartnersSection() {
  return (
    <section className="container mx-auto px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">Research Partnership Framework</h2>
            <p className="text-slate-400">
              ESRO&apos;s multidisciplinary network of 45 specialists across 10 domains
            </p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {researchPartners.map((partner, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="border border-white/5 bg-slate-900/50 h-full" padding="lg">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-bold text-white">{partner.domain}</h3>
                <div className="text-2xl font-black text-emerald-400">{partner.count}</div>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">{partner.expertise}</p>
              <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                <Users className="w-3 h-3" />
                <span>{partner.count} specialists</span>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Total */}
      <div className="mt-8 bg-gradient-to-r from-emerald-900/20 to-teal-900/20 border border-emerald-500/20 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white font-semibold mb-1">ESRO Research Network</h3>
            <p className="text-slate-400 text-sm">
              45 individuals — environmentalists, foresters, and specialists across 10 domains
            </p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-black text-emerald-400">45</div>
            <div className="text-xs text-slate-500 uppercase">Total Partners</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PolicyRecommendations() {
  const recommendations = [
    {
      title: 'Integrate ESRO Legacy Data',
      description: 'Systematically migrate ESRO conservation network documentation into EcoWatch intelligence modules to preserve institutional knowledge and historical baselines.',
      action: 'Data Migration',
      icon: FileText,
    },
    {
      title: 'Establish Multi-Stakeholder Governance',
      description: 'Reconstitute ESRO\'s 45-member specialist network as an advisory board for EcoWatch, ensuring continuity of multidisciplinary expertise.',
      action: 'Governance',
      icon: Users,
    },
    {
      title: 'Operationalize Sub-Programs',
      description: 'Translate BCN\'s 6 sub-programs (CWPR, CPPR, WHCMP, CCN, FCPC, CAMP) into active EcoWatch monitoring modules with defined KPIs.',
      action: 'Implementation',
      icon: CheckCircle,
    },
    {
      title: 'Climate Action Coordination',
      description: 'Activate CANK framework for cross-sectoral climate coordination, integrating glacier monitoring, phenology tracking, and impact assessment.',
      action: 'Climate',
      icon: Globe,
    },
    {
      title: 'Trans-Himalayan Collaboration',
      description: 'Establish THCNP as a cross-border conservation planning mechanism, coordinating with neighboring regions on landscape-level conservation.',
      action: 'Regional',
      icon: Mountain,
    },
    {
      title: 'Environment-Peacebuilding Integration',
      description: 'Leverage CPEP framework to integrate conservation with community development, ensuring conflict-sensitive environmental management.',
      action: 'Peacebuilding',
      icon: Scale,
    },
  ];

  return (
    <section className="container mx-auto px-6 py-16 bg-gradient-to-b from-slate-950 to-emerald-950/20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
            <Scale className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">Policy Recommendations</h2>
            <p className="text-slate-400">Strategic actions to operationalize ESRO conservation architectures</p>
          </div>
        </div>
      </motion.div>

      <div className="space-y-6">
        {recommendations.map((rec, index) => {
          const Icon = rec.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <Card className="border border-white/5 bg-slate-900/50" padding="lg">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-bold text-white">{rec.title}</h3>
                      <Badge variant="success" size="sm">{rec.action}</Badge>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {rec.description}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function ESROArchitectureDiagram() {
  return (
    <section className="container mx-auto px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center">
            <GitBranch className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">ESRO Conservation Architecture</h2>
            <p className="text-slate-400">Organizational structure and network relationships</p>
          </div>
        </div>
      </motion.div>

      <Card className="border border-white/5 bg-slate-900/50" padding="lg">
        <div className="space-y-8">
          {/* Top Level: ESRO */}
          <div className="text-center">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-xl shadow-lg">
              <Network className="w-6 h-6" />
              <div>
                <div className="text-lg font-bold">ESRO</div>
                <div className="text-xs text-emerald-100">Environmental Development & Research Organisation</div>
              </div>
              <div className="ml-4 pl-4 border-l border-white/20">
                <div className="text-2xl font-black">45</div>
                <div className="text-xs text-emerald-100">Specialists</div>
              </div>
            </div>
          </div>

          {/* Connector */}
          <div className="flex justify-center">
            <div className="w-0.5 h-8 bg-emerald-500/50" />
          </div>

          {/* Four Networks */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {conservationNetworks.map((network) => {
              const Icon = network.icon;
              return (
                <div key={network.id} className="text-center">
                  <div className={`bg-gradient-to-br ${network.color} text-white p-4 rounded-xl shadow-lg`}>
                    <Icon className="w-6 h-6 mx-auto mb-2" />
                    <div className="font-bold text-sm">{network.acronym}</div>
                    <div className="text-xs text-white/80 mt-1">{network.name}</div>
                  </div>
                  {network.subPrograms.length > 0 && (
                    <div className="mt-3 text-xs text-slate-500">
                      {network.subPrograms.length} sub-programs
                    </div>
                  )}
                  <div className="mt-2 text-xs text-slate-600 font-mono">
                    {network.esroFile}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Connector */}
          <div className="flex justify-center">
            <div className="w-0.5 h-8 bg-emerald-500/50" />
          </div>

          {/* EcoWatch Platform */}
          <div className="text-center">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white px-8 py-4 rounded-xl shadow-lg">
              <Globe className="w-6 h-6" />
              <div>
                <div className="text-lg font-bold">EcoWatch Platform</div>
                <div className="text-xs text-violet-100">Kashmir Environmental Intelligence Platform</div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}

// ============================================================
// MAIN PAGE
// ============================================================

export default function ConservationIntelligencePage() {
  return (
    <main className="min-h-screen bg-slate-950">
      {/* Breadcrumb */}
      <Breadcrumb />

      {/* Hero Section */}
      <HeroSection />

      {/* Stats */}
      <StatsSection />

      {/* Network Grid */}
      <NetworkGrid />

      {/* ESRO Architecture Diagram */}
      <ESROArchitectureDiagram />

      {/* Conservation Priorities */}
      <ConservationPriorities />

      {/* Research Partners */}
      <ResearchPartnersSection />

      {/* Policy Recommendations */}
      <PolicyRecommendations />

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Network className="w-8 h-8" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Explore the Full EcoWatch Platform
          </h2>
          <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
            ESRO&apos;s conservation networks form the foundation of EcoWatch&apos;s environmental
            intelligence. Explore biodiversity, risk monitoring, water systems, and more.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-emerald-600 to-teal-600"
              icon={<Leaf className="w-5 h-5" />}
            >
              <Link href="/biodiversity">Biodiversity Intelligence</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 text-white"
              icon={<Shield className="w-5 h-5" />}
            >
              <Link href="/risk-monitoring">Risk Monitoring</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 text-white"
              icon={<Map className="w-5 h-5" />}
            >
              <Link href="/protected-network">Protected Network</Link>
            </Button>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
