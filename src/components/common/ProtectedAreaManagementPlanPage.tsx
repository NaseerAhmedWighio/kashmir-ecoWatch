'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  ArrowLeft, ChevronRight, FileText, Shield, CheckCircle2,
  AlertTriangle, Target, Layers, Database, ExternalLink,
  Calendar, BarChart3, Leaf, Users, Clock
} from 'lucide-react';
import { ProtectedArea } from '@/data/protected-network';

interface Props {
  area: ProtectedArea;
  backHref: string;
  categoryLabel: string;
  categoryHref: string;
}

// ── Progress bar ──────────────────────────────────────────────────────────────
function ProgressBar({ label, target, current, pct }: { label: string; target: string; current: string; pct: number }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <div>
          <span className="text-sm text-white font-medium">{label}</span>
          <span className="text-[11px] text-slate-500 ml-2">Target: {target}</span>
        </div>
        <span className="text-xs font-bold text-emerald-400">{pct}%</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden mb-0.5">
        <div className="h-full rounded-full bg-emerald-500 transition-all duration-700" style={{ width: `${pct}%` }} />
      </div>
      <div className="text-[10px] text-slate-500">{current}</div>
    </div>
  );
}

// ── Priority badge ────────────────────────────────────────────────────────────
function PriorityBadge({ priority }: { priority: string }) {
  const styles: Record<string, string> = {
    Critical: 'bg-red-500/20 text-red-400 border border-red-500/30',
    High:     'bg-amber-500/20 text-amber-400 border border-amber-500/30',
    Medium:   'bg-blue-500/20 text-blue-400 border border-blue-500/30',
    Low:      'bg-slate-500/20 text-slate-400 border border-slate-500/30',
  };
  return (
    <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${styles[priority] ?? styles.Low}`}>
      {priority}
    </span>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────
export function ProtectedAreaManagementPlanPage({ area, backHref, categoryLabel, categoryHref }: Props) {
  const router = useRouter();
  const a = area as any;
  const flagship = a.flagshipSpecies ?? 'flagship species';
  const CARD = 'bg-white/5 border border-white/10';

  const objectives = [
    `Maintain and expand viable ${flagship} population within the park through habitat protection and population monitoring.`,
    'Restore and protect core habitat zones including degraded edge areas and encroachment-affected boundaries.',
    'Reduce anthropogenic pressure through regulated visitor access, community engagement, and livelihood support programs.',
    'Establish comprehensive species monitoring and ecological data management systems with annual review cycles.',
    'Strengthen ecological connectivity with adjacent protected landscapes through corridor identification and buffer management.',
    'Integrate climate adaptation strategies into habitat management protocols, fire risk assessment, and hydrological monitoring.',
  ];

  const zones = [
    { id: 'I',   name: 'Core Zone',    purpose: 'Strict protection — no public access. Critical wildlife habitat and breeding areas.', access: 'Restricted',        border: 'border-l-red-500' },
    { id: 'II',  name: 'Buffer Zone',  purpose: 'Limited research, monitoring, and permitted scientific activities.',                    access: 'Permit Required',   border: 'border-l-amber-500' },
    { id: 'III', name: 'Tourism Zone', purpose: 'Regulated eco-tourism, interpretation trails, and visitor education programs.',         access: 'Open (Seasonal)',   border: 'border-l-emerald-500' },
  ];

  const actionPlan = [
    { action: 'Camera trap network expansion',    timeline: '2024–2025', priority: 'High' },
    { action: 'Anti-poaching patrol enhancement', timeline: '2024–2025', priority: 'Critical' },
    { action: 'Community liaison program',         timeline: '2024–2026', priority: 'High' },
    { action: 'Invasive species survey',           timeline: '2024',      priority: 'Medium' },
    { action: 'Water source mapping',              timeline: '2024',      priority: 'Medium' },
    { action: `${flagship} population census`,    timeline: '2024–2029', priority: 'Critical' },
    { action: 'Habitat restoration — core zone',  timeline: '2025–2027', priority: 'High' },
    { action: 'Climate vulnerability assessment',  timeline: '2025',      priority: 'Medium' },
    { action: 'Research MOU with WII',             timeline: '2024',      priority: 'Low' },
  ];

  const targets = [
    { label: `${flagship} population census`, target: 'Annual',    current: 'Active — field survey underway',   pct: 85 },
    { label: 'Camera trap coverage',           target: '75% area',  current: '68% area currently covered',       pct: 91 },
    { label: 'Patrol frequency',               target: 'Weekly',    current: 'Active — 100% target met',         pct: 100 },
    { label: 'Vegetation transects',           target: '50 plots',  current: '38 of 50 plots established',       pct: 76 },
    { label: 'Water source mapping',           target: 'Complete',  current: 'In progress — 45% done',           pct: 45 },
  ];

  const documents = [
    { title: 'Management Plan 2024–2029', type: 'Management Plan', size: '4.2 MB', source: 'J&K Wildlife Dept.', year: 2024 },
    { title: 'Ecological Assessment Report', type: 'Scientific Report', size: '2.1 MB', source: 'Wildlife Institute of India', year: 2023 },
    { title: 'Species Monitoring Protocol', type: 'Monitoring Protocol', size: '890 KB', source: 'Field Research Unit', year: 2024 },
    { title: 'Boundary Notification', type: 'Legal Notification', size: '340 KB', source: 'Govt. of J&K', year: area.established },
    { title: 'Annual Review 2023', type: 'Annual Review', size: '1.8 MB', source: 'J&K Wildlife Dept.', year: 2023 },
  ];

  const section = (i: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: i * 0.07 },
  });

  return (
    <main className="min-h-screen bg-slate-950">

      {/* ── COMPACT HERO ── */}
      <div className="bg-white/[0.03] backdrop-blur-xl pt-20 pb-8 border-b border-white/[0.06]">
        <div className="container mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-5 flex-wrap">
            <button onClick={() => router.push('/protected-network')} className="hover:text-white transition-colors">Protected Network</button>
            <ChevronRight className="w-3 h-3" />
            <button onClick={() => router.push(categoryHref)} className="hover:text-white transition-colors">{categoryLabel}</button>
            <ChevronRight className="w-3 h-3" />
            <button onClick={() => router.push(backHref)} className="hover:text-white transition-colors">{area.name}</button>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">Management Plan</span>
          </nav>

          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" /> Back to park profile
          </button>

          <h1 className="text-2xl sm:text-3xl font-black text-white mb-1">{area.name}</h1>
          <p className="text-sm text-slate-400 mb-5">Conservation management framework, objectives, and action plan</p>

          {/* Status pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { label: 'Plan Period', value: '2024–2029' },
              { label: 'Status', value: 'Active' },
              { label: 'Authority', value: 'J&K Wildlife Protection Dept.' },
            ].map(pill => (
              <div key={pill.label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
                <span className="text-[9px] text-slate-500 uppercase">{pill.label}:</span>
                <span className="text-xs font-semibold text-white">{pill.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SECTIONS ── */}
      <div className="container mx-auto px-6 py-10 space-y-6">

        {/* 1. Plan Overview */}
        <motion.div {...section(0)}>
          <Card className={`${CARD} p-6`}>
            <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-500" /> Plan Overview
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-slate-400 leading-relaxed">
                  This management plan establishes conservation objectives, habitat management protocols, species monitoring targets,
                  and threat mitigation strategies for <span className="text-white font-medium">{area.name}</span>.
                  It is prepared in accordance with the Wildlife Protection Act 1972 and subsequent J&K amendments,
                  and reviewed every five years by the J&K Department of Wildlife Protection.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Authority',     value: 'J&K Dept. of Wildlife Protection' },
                  { label: 'Plan Period',   value: '2024–2029' },
                  { label: 'Review Cycle', value: '5 years' },
                  { label: 'Legal Basis',  value: 'Wildlife Protection Act 1972' },
                ].map(m => (
                  <div key={m.label}>
                    <div className="text-[9px] text-slate-500 uppercase mb-0.5">{m.label}</div>
                    <div className="text-sm text-white font-semibold">{m.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* 2. Objectives */}
        <motion.div {...section(1)}>
          <Card className={`${CARD} p-6`}>
            <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
              <Target className="w-5 h-5 text-emerald-500" /> Conservation Objectives
            </h2>
            <div className="space-y-3">
              {objectives.map((obj, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/3 border border-white/5">
                  <div className="w-6 h-6 rounded-lg bg-emerald-500/15 flex items-center justify-center shrink-0 text-xs font-bold text-emerald-400">{i + 1}</div>
                  <p className="text-sm text-slate-300 leading-relaxed">{obj}</p>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* 3. Management Zones */}
        <motion.div {...section(2)}>
          <Card className={`${CARD} p-6`}>
            <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-500" /> Management Zones
            </h2>
            <div className="space-y-3">
              {zones.map(zone => (
                <div key={zone.id} className={`p-4 rounded-xl bg-white/3 border border-white/5 border-l-4 ${zone.border}`}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-slate-500 uppercase">Zone {zone.id}</span>
                        <span className="text-sm font-bold text-white">{zone.name}</span>
                      </div>
                      <p className="text-xs text-slate-400">{zone.purpose}</p>
                    </div>
                    <div className="shrink-0">
                      <div className="text-[9px] text-slate-500 uppercase mb-0.5">Access</div>
                      <div className="text-xs font-semibold text-white whitespace-nowrap">{zone.access}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* 4. Action Plan */}
        <motion.div {...section(3)}>
          <Card className={`${CARD} p-6`}>
            <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Action Plan
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="text-left text-[10px] text-slate-500 uppercase pb-3 pr-4">Action</th>
                    <th className="text-left text-[10px] text-slate-500 uppercase pb-3 pr-4 whitespace-nowrap">Timeline</th>
                    <th className="text-left text-[10px] text-slate-500 uppercase pb-3">Priority</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {actionPlan.map((row, i) => (
                    <tr key={i} className="hover:bg-white/2 transition-colors">
                      <td className="py-3 pr-4 text-white">{row.action}</td>
                      <td className="py-3 pr-4 text-slate-400 whitespace-nowrap">{row.timeline}</td>
                      <td className="py-3"><PriorityBadge priority={row.priority} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>

        {/* 5. Monitoring Targets */}
        <motion.div {...section(4)}>
          <Card className={`${CARD} p-6`}>
            <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-emerald-500" /> Monitoring Targets
            </h2>
            <div className="space-y-5">
              {targets.map((t, i) => (
                <ProgressBar key={i} label={t.label} target={t.target} current={t.current} pct={t.pct} />
              ))}
            </div>
          </Card>
        </motion.div>

        {/* 6. Documents */}
        <motion.div {...section(5)}>
          <Card className={`${CARD} p-6`}>
            <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-500" /> Documents
            </h2>
            <div className="space-y-3">
              {documents.map((doc, i) => (
                <div key={i} className="flex items-center justify-between gap-4 p-4 rounded-xl bg-white/3 border border-white/5 hover:border-emerald-500/30 transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-amber-500/15 flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4 text-amber-400" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-white truncate">{doc.title}</div>
                      <div className="text-[10px] text-slate-500">{doc.type} · PDF, {doc.size} · {doc.source} · {doc.year}</div>
                    </div>
                  </div>
                  <a href="/protected-network/reports-and-plans">
                    <Button variant="outline" size="sm" className="border-emerald-600/40 text-emerald-400 hover:border-emerald-500 shrink-0" icon={<ExternalLink className="w-3.5 h-3.5" />}>
                      View
                    </Button>
                  </a>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* 7. Data Provenance */}
        <motion.div {...section(6)}>
          <Card className={`${CARD} p-4`}>
            <div className="flex items-start gap-2.5">
              <Database className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
              <p className="text-xs text-slate-500 leading-relaxed">
                This management plan record is compiled from official J&K Wildlife Department notifications, published management plans,
                and secondary conservation literature. Data accuracy is subject to official department records.{' '}
                <span className="text-slate-400">Last verified: 2024.</span>
              </p>
            </div>
          </Card>
        </motion.div>

      </div>
    </main>
  );
}
