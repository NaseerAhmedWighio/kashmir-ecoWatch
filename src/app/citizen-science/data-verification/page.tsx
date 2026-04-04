'use client';

import React, { useState } from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { CheckCircle, ArrowLeft, Users, Shield, Eye, FileSearch, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const verificationTypes = [
  { title: 'Species Identification', desc: 'Confirm or correct the species name based on photo evidence, location, and known distribution', icon: FileSearch },
  { title: 'Location Accuracy', desc: 'Verify GPS coordinates match the described habitat and known range of the species', icon: Eye },
  { title: 'Evidence Quality', desc: 'Assess photo clarity, metadata completeness, and overall evidentiary value', icon: CheckCircle },
  { title: 'Duplicate Detection', desc: 'Flag records that may be duplicates of existing submissions from the same or different contributors', icon: AlertTriangle },
];

const trustLevels = [
  { level: 'Level 1 — New Reviewer', desc: 'Just joined; reviews are supervised and weighted lower', minReviews: 0 },
  { level: 'Level 2 — Trusted Reviewer', desc: 'Completed 25+ reviews with 80%+ agreement rate', minReviews: 25 },
  { level: 'Level 3 — Expert Reviewer', desc: 'Completed 100+ reviews; reviews carry higher weight and priority', minReviews: 100 },
  { level: 'Level 4 — Senior Expert', desc: 'Recognized subject-matter expert; can override community consensus', minReviews: 250 },
];

const pendingTasks = [
  { id: 'V-2847', species: 'Unidentified passerine', location: 'Hokersar Wetland', submitted: '2025-04-01', queue: 'Community', priority: 'Normal' },
  { id: 'V-2846', species: 'Himalayan Monal', location: 'Sonamarg', submitted: '2025-04-01', queue: 'Expert', priority: 'High' },
  { id: 'V-2845', species: 'Migratory waterfowl group', location: 'Wular Lake', submitted: '2025-03-31', queue: 'Community', priority: 'Normal' },
  { id: 'V-2844', species: 'Plant species (unknown)', location: 'Lidder Valley', submitted: '2025-03-30', queue: 'Expert', priority: 'Normal' },
  { id: 'V-2843', species: 'Hangul herd sighting', location: 'Dachigam NP', submitted: '2025-03-29', queue: 'Community', priority: 'High' },
];

export default function DataVerificationPage() {
  const [joined, setJoined] = useState(false);

  return (
    <main className="min-h-screen bg-slate-950"><section className="relative pt-48 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-950/50 via-purple-950/30 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
            <Link href="/citizen-science" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-6"><ArrowLeft className="w-4 h-4" />Back to Citizen Science</Link>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-xl"><CheckCircle className="w-7 h-7 text-white" /></div>
              <Badge variant="info" size="lg">Verification Program</Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Data <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">Verification</span></h1>
            <p className="text-lg text-slate-400 max-w-2xl">Review and validate community-submitted observations, species records, and environmental data for accuracy. Quality review is the backbone of environmental intelligence.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-6">
          <Card className="glass-intense border-violet-500/30 p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div><h2 className="text-xl font-bold text-white mb-1">Ready to Start Verifying?</h2><p className="text-sm text-slate-400">Join 67+ reviewers maintaining data quality standards</p></div>
              <div className="flex flex-wrap gap-3">
                {!joined ? (<Button size="lg" className="bg-gradient-to-r from-violet-500 to-purple-600 text-white" onClick={() => setJoined(true)}><Shield className="w-5 h-5 mr-2" />Join This Program</Button>) : (<Badge variant="success" size="lg"><CheckCircle className="w-4 h-4 mr-1" /> Joined</Badge>)}
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <Card className="glass-intense border-white/10 p-6">
                <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2"><Shield className="w-5 h-5 text-violet-400" />Reviewer Eligibility & Trust Levels</h2>
                <p className="text-sm text-slate-400 mb-4">Anyone can join as a Level 1 reviewer. As you complete reviews with high agreement rates, you progress through trust levels that give your reviews more weight and access to higher-priority queues.</p>
                <div className="space-y-3">
                  {trustLevels.map(tl => (
                    <div key={tl.level} className="p-3 rounded-lg bg-white/5 border border-white/10">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-sm font-bold text-white">{tl.level}</h3>
                        <Badge variant="outline" size="sm">{tl.minReviews}+ reviews</Badge>
                      </div>
                      <p className="text-xs text-slate-400">{tl.desc}</p>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="glass-intense border-white/10 p-6">
                <h2 className="text-lg font-bold text-white mb-3">What Gets Verified</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {verificationTypes.map(vt => (
                    <div key={vt.title} className="p-4 rounded-lg bg-white/5 border border-white/10">
                      <div className="flex items-center gap-2 mb-2"><vt.icon className="w-5 h-5 text-violet-400" /><h3 className="text-sm font-bold text-white">{vt.title}</h3></div>
                      <p className="text-xs text-slate-400">{vt.desc}</p>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Pending Verification Queue */}
              <Card className="glass-intense border-white/10 p-6">
                <h2 className="text-lg font-bold text-white mb-3">Pending Verification Tasks</h2>
                <p className="text-sm text-slate-400 mb-4">Sample of records awaiting review. Join the program to access the full verification queue.</p>
                <div className="space-y-2">
                  {pendingTasks.map(task => (
                    <div key={task.id} className="flex items-center justify-between py-2 px-3 rounded-lg bg-white/5 border border-white/5">
                      <div>
                        <p className="text-sm font-medium text-white">{task.species}</p>
                        <p className="text-xs text-slate-400">{task.id} • {task.location} • {task.submitted}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={task.priority === 'High' ? 'danger' : 'info'} size="sm">{task.queue}</Badge>
                        {task.priority === 'High' && <Badge variant="danger" size="sm">High</Badge>}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="glass-intense border-white/10 p-6">
                <h2 className="text-lg font-bold text-white mb-3">Contributor Progression</h2>
                <p className="text-sm text-slate-400 mb-4">Your verification activity builds a track record visible on your contributor profile:</p>
                <ul className="space-y-2">
                  {['Total reviews completed', 'Agreement rate with consensus', 'Average review time', 'Trust level and badge', 'Contributions to data quality improvements'].map(s => (<li key={s} className="text-sm text-slate-300 flex items-start gap-2"><span className="text-violet-400 mt-1">→</span>{s}</li>))}
                </ul>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="glass-intense border-white/10 p-6">
                <h3 className="text-sm font-bold text-white mb-3">What Happens After Joining</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-2"><span className="text-violet-400 font-bold text-sm">1.</span><p className="text-sm text-slate-300">Join the verification program as a Level 1 reviewer</p></div>
                  <div className="flex items-start gap-2"><span className="text-violet-400 font-bold text-sm">2.</span><p className="text-sm text-slate-300">Access the community verification queue</p></div>
                  <div className="flex items-start gap-2"><span className="text-violet-400 font-bold text-sm">3.</span><p className="text-sm text-slate-300">Review species IDs, locations, evidence quality, and duplicates</p></div>
                  <div className="flex items-start gap-2"><span className="text-violet-400 font-bold text-sm">4.</span><p className="text-sm text-slate-300">Progress through trust levels with consistent, accurate reviews</p></div>
                </div>
              </Card>
              <Card className="glass-intense border-white/10 p-6">
                <h3 className="text-sm font-bold text-white mb-3">Verification Model</h3>
                <p className="text-sm text-slate-400 mb-3">Every submission follows:</p>
                <div className="space-y-2">
                  {['Community Review — open to all reviewers', 'Expert Review — verified subject-matter experts', 'Authority Validation — final confirmation by recognized authorities'].map((s,i) => (
                    <div key={s} className="flex items-center gap-2"><span className="text-violet-400 font-bold text-sm">{i+1}.</span><span className="text-sm text-slate-300">{s}</span></div>
                  ))}
                </div>
                <Link href="/contribute" className="block mt-3 text-xs text-violet-400 hover:text-violet-300">Learn more about verification →</Link>
              </Card>
              <Card className="glass-intense border-white/10 p-6">
                <h3 className="text-sm font-bold text-white mb-3">Related Links</h3>
                <div className="space-y-2">
                  <Link href="/contribute-data" className="block text-sm text-violet-400 hover:text-violet-300">→ Contribute Data</Link>
                  <Link href="/submit-sighting" className="block text-sm text-violet-400 hover:text-violet-300">→ Submit a Sighting</Link>
                  <Link href="/citizen-science" className="block text-sm text-violet-400 hover:text-violet-300">→ Citizen Science Hub</Link>
                  <Link href="/contribute" className="block text-sm text-violet-400 hover:text-violet-300">→ Verification Model</Link>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
      <AdvancedFooter />
    </main>
  );
}
