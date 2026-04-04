'use client';

import React, { useState } from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Eye, ArrowLeft, Users, Shield, MapPin, Camera, CheckCircle, ExternalLink, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const evidenceStandards = [
  'Clear photo or observable evidence of the species',
  'Accurate GPS coordinates (use phone GPS or mapping tool)',
  'Date and time of observation',
  'Count estimate or exact number if possible',
  'Habitat description (forest type, elevation, weather)',
  'Behavior notes (feeding, nesting, migrating, etc.)',
];

const safetyTips = [
  'Always inform someone of your field location and expected return time',
  'Carry a charged phone, water, and first-aid kit',
  'Avoid approaching dangerous or territorial wildlife',
  'Respect protected areas and entry restrictions',
  'Do not disturb nests, dens, or breeding sites',
  'Work in pairs when possible, especially in remote areas',
];

const recentRecords = [
  { species: 'Hangul (Cervus hanglu)', location: 'Dachigam NP', date: '2025-03-28', status: 'Verified', district: 'Srinagar' },
  { species: 'Himalayan Brown Bear', location: 'Gurez Valley', date: '2025-03-25', status: 'Under Review', district: 'Bandipora' },
  { species: 'Black-necked Crane', location: 'Wetland near Tso Moriri', date: '2025-03-20', status: 'Verified', district: 'Kargil' },
  { species: 'Snow Leopard', location: 'Gulmarg WLS', date: '2025-03-15', status: 'Expert Reviewed', district: 'Baramulla' },
];

export default function WildlifeMonitoringPage() {
  const [joined, setJoined] = useState(false);

  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-48 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/50 via-teal-950/30 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
            <Link href="/citizen-science" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-6">
              <ArrowLeft className="w-4 h-4" />
              Back to Citizen Science
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-xl">
                <Eye className="w-7 h-7 text-white" />
              </div>
              <Badge variant="success" size="lg">Citizen Science Program</Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
              Wildlife <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Monitoring</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl">
              Track and document wildlife populations, distributions, and behavioral patterns across Kashmir&apos;s ecosystems. 
              Your observations help build a living archive of biodiversity.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Join Action */}
      <section className="py-8">
        <div className="container mx-auto px-6">
          <Card className="glass-intense border-emerald-500/30 p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white mb-1">Ready to Start Monitoring?</h2>
                <p className="text-sm text-slate-400">Join 234+ volunteers already contributing wildlife observations</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/submit-sighting">
                  <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
                    <Camera className="w-5 h-5 mr-2" />
                    Submit a Sighting
                  </Button>
                </Link>
                {!joined ? (
                  <Button size="lg" variant="outline" className="border-emerald-500/50 text-emerald-400" onClick={() => setJoined(true)}>
                    <Users className="w-5 h-5 mr-2" />
                    Join This Program
                  </Button>
                ) : (
                  <Badge variant="success" size="lg"><CheckCircle className="w-4 h-4 mr-1" /> Joined</Badge>
                )}
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Who This Is For */}
              <Card className="glass-intense border-white/10 p-6">
                <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5 text-emerald-400" />
                  Who This Is For
                </h2>
                <p className="text-sm text-slate-400 mb-4">
                  This program is open to anyone with an interest in Kashmir&apos;s wildlife — from casual nature observers to trained field researchers.
                  You don&apos;t need formal qualifications, but accuracy and honesty in reporting are essential.
                </p>
                <ul className="space-y-2">
                  {['Nature enthusiasts and birdwatchers', 'Students and educators', 'Field researchers and biologists', 'Forest department volunteers', 'Local community members'].map((item) => (
                    <li key={item} className="text-sm text-slate-300 flex items-start gap-2"><span className="text-emerald-400 mt-1">•</span>{item}</li>
                  ))}
                </ul>
              </Card>

              {/* Observation Protocol */}
              <Card className="glass-intense border-white/10 p-6">
                <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-emerald-400" />
                  Species Observation Protocol
                </h2>
                <ol className="space-y-3">
                  {['Record the exact date, time, and GPS location of your observation', 'Estimate or count the number of individuals observed', 'Note the species name (use field guides or apps if unsure)', 'Describe the habitat (forest type, elevation, water source)', 'Record behavior (feeding, resting, breeding, migrating)', 'Take clear photos as evidence when possible', 'Submit your observation through the Submit a Sighting flow'].map((step, i) => (
                    <li key={step} className="text-sm text-slate-300 flex items-start gap-2"><span className="text-emerald-400 font-bold flex-shrink-0">{i + 1}.</span>{step}</li>
                  ))}
                </ol>
              </Card>

              {/* Evidence Standards */}
              <Card className="glass-intense border-white/10 p-6">
                <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  Evidence Standards
                </h2>
                <ul className="space-y-2">
                  {evidenceStandards.map((s) => (<li key={s} className="text-sm text-slate-300 flex items-start gap-2"><span className="text-emerald-400 mt-1">✓</span>{s}</li>))}
                </ul>
              </Card>

              {/* Field Safety */}
              <Card className="glass-intense border-white/10 p-6">
                <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                  Field Safety Guidance
                </h2>
                <ul className="space-y-2">
                  {safetyTips.map((s) => (<li key={s} className="text-sm text-slate-300 flex items-start gap-2"><span className="text-amber-400 mt-1">⚠</span>{s}</li>))}
                </ul>
              </Card>

              {/* Recent Records */}
              <Card className="glass-intense border-white/10 p-6">
                <h2 className="text-lg font-bold text-white mb-3">Recent Verified Monitoring Records</h2>
                <div className="space-y-3">
                  {recentRecords.map((r) => (
                    <div key={r.species + r.date} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                      <div>
                        <p className="text-sm font-medium text-white">{r.species}</p>
                        <p className="text-xs text-slate-400">{r.location} • {r.date} • {r.district}</p>
                      </div>
                      <Badge variant={r.status === 'Verified' ? 'success' : r.status === 'Expert Reviewed' ? 'info' : 'warning'} size="sm">{r.status}</Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="glass-intense border-white/10 p-6">
                <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2"><Shield className="w-4 h-4 text-emerald-400" />What Happens After Joining</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-2"><span className="text-emerald-400 font-bold text-sm">1.</span><p className="text-sm text-slate-300">Gain access to the monitoring program and contributor dashboard</p></div>
                  <div className="flex items-start gap-2"><span className="text-emerald-400 font-bold text-sm">2.</span><p className="text-sm text-slate-300">Submit sightings and species observations</p></div>
                  <div className="flex items-start gap-2"><span className="text-emerald-400 font-bold text-sm">3.</span><p className="text-sm text-slate-300">Your submissions go through Community → Expert → Authority review</p></div>
                  <div className="flex items-start gap-2"><span className="text-emerald-400 font-bold text-sm">4.</span><p className="text-sm text-slate-300">Earn recognition tiers and build your contributor history</p></div>
                </div>
              </Card>
              <Card className="glass-intense border-white/10 p-6">
                <h3 className="text-sm font-bold text-white mb-3">District Participation</h3>
                <div className="space-y-2">
                  {[{d:'Srinagar',c:156},{d:'Anantnag',c:98},{d:'Baramulla',c:87},{d:'Pulwama',c:72}].map(x => (
                    <div key={x.d} className="flex items-center justify-between text-sm"><span className="text-slate-300">{x.d}</span><span className="text-white font-semibold">{x.district}</span></div>
                  ))}
                </div>
                <Link href="/citizen-science" className="block mt-3 text-xs text-emerald-400 hover:text-emerald-300">View all district rankings →</Link>
              </Card>
              <Card className="glass-intense border-white/10 p-6">
                <h3 className="text-sm font-bold text-white mb-3">Related Links</h3>
                <div className="space-y-2">
                  <Link href="/submit-sighting" className="block text-sm text-emerald-400 hover:text-emerald-300">→ Submit a Sighting</Link>
                  <Link href="/contribute-data" className="block text-sm text-emerald-400 hover:text-emerald-300">→ Contribute Data</Link>
                  <Link href="/citizen-science" className="block text-sm text-emerald-400 hover:text-emerald-300">→ Citizen Science Hub</Link>
                  <Link href="/contribute" className="block text-sm text-emerald-400 hover:text-emerald-300">→ All Contribution Paths</Link>
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
