'use client';

import React, { useState } from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Camera, ArrowLeft, Users, CheckCircle, MapPin, Image } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const qualityChecklist = [
  'Photo is in focus with clear subject identification',
  'Geotag / GPS metadata is preserved (EXIF data intact)',
  'Date and time are visible in photo metadata',
  'Habitat context is visible (not just a close-up)',
  'Multiple angles improve species identification',
  'No excessive editing, filters, or cropping that removes metadata',
  'Scale reference (coin, ruler, hand) helps with size estimation',
];

const photoTypes = [
  { title: 'Seasonal Landscape Photography', desc: 'Document seasonal changes in landscapes, snowlines, vegetation cycles, and waterbody levels' },
  { title: 'Species Photo Records', desc: 'Clear photos of species for identification — birds, mammals, fish, plants, insects, and amphibians' },
  { title: 'Habitat Change Documentation', desc: 'Before/after photos of deforestation, construction, erosion, encroachment, or restoration' },
  { title: 'Wetland Condition Photos', desc: 'Water quality indicators, algae blooms, pollution, invasive species, and shoreline changes' },
];

export default function PhotoDocumentationPage() {
  const [joined, setJoined] = useState(false);

  return (
    <main className="min-h-screen bg-slate-950"><section className="relative pt-48 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/50 via-indigo-950/30 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
            <Link href="/citizen-science" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-6"><ArrowLeft className="w-4 h-4" />Back to Citizen Science</Link>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-xl"><Camera className="w-7 h-7 text-white" /></div>
              <Badge variant="info" size="lg">Photo Program</Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Photo <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Documentation</span></h1>
            <p className="text-lg text-slate-400 max-w-2xl">Capture seasonal changes, species records, habitat conditions, and environmental changes through geotagged photography. Every photo is a data point.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-6">
          <Card className="glass-intense border-blue-500/30 p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div><h2 className="text-xl font-bold text-white mb-1">Ready to Start Documenting?</h2><p className="text-sm text-slate-400">Join 189+ volunteers contributing photo evidence</p></div>
              <div className="flex flex-wrap gap-3">
                <Link href="/contribute-data/geotagged-evidence">
                  <Button size="lg" className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white"><Image className="w-5 h-5 mr-2" />Upload Photo Evidence</Button>
                </Link>
                {!joined ? (<Button size="lg" variant="outline" className="border-blue-500/50 text-blue-400" onClick={() => setJoined(true)}><Users className="w-5 h-5 mr-2" />Join This Program</Button>) : (<Badge variant="success" size="lg"><CheckCircle className="w-4 h-4 mr-1" /> Joined</Badge>)}
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
                <h2 className="text-lg font-bold text-white mb-3">Photo Evidence Categories</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {photoTypes.map(pt => (
                    <div key={pt.title} className="p-4 rounded-lg bg-white/5 border border-white/10">
                      <h3 className="text-sm font-bold text-white mb-1">{pt.title}</h3>
                      <p className="text-xs text-slate-400">{pt.desc}</p>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="glass-intense border-white/10 p-6">
                <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2"><MapPin className="w-5 h-5 text-blue-400" />Geotag Guidance</h2>
                <ul className="space-y-2">
                  {['Enable location services on your phone camera before shooting', 'EXIF GPS data is automatically extracted on upload', 'If EXIF is missing, manually enter coordinates during submission', 'For drone imagery, include flight log coordinates', 'Wetland and species photos benefit from a nearby landmark reference'].map(s => (<li key={s} className="text-sm text-slate-300 flex items-start gap-2"><span className="text-blue-400 mt-1">📍</span>{s}</li>))}
                </ul>
              </Card>

              <Card className="glass-intense border-white/10 p-6">
                <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2"><CheckCircle className="w-5 h-5 text-blue-400" />Image Quality Checklist</h2>
                <ul className="space-y-2">
                  {qualityChecklist.map(s => (<li key={s} className="text-sm text-slate-300 flex items-start gap-2"><span className="text-blue-400 mt-1">✓</span>{s}</li>))}
                </ul>
              </Card>

              <Card className="glass-intense border-white/10 p-6">
                <h2 className="text-lg font-bold text-white mb-3">Examples of Acceptable Evidence</h2>
                <div className="space-y-3">
                  {[
                    { title: 'Species ID Photo', desc: 'Clear, in-focus photo showing distinguishing features of a bird or mammal' },
                    { title: 'Habitat Panorama', desc: 'Wide-angle shot showing habitat type, vegetation, and landscape context' },
                    { title: 'Change Comparison', desc: 'Two photos of the same location at different times showing environmental change' },
                    { title: 'Evidence of Impact', desc: 'Photo documenting pollution, illegal construction, or habitat destruction' },
                  ].map(ex => (
                    <div key={ex.title} className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
                      <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0"><Image className="w-6 h-6 text-blue-400" /></div>
                      <div><h3 className="text-sm font-bold text-white">{ex.title}</h3><p className="text-xs text-slate-400">{ex.desc}</p></div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="glass-intense border-white/10 p-6">
                <h3 className="text-sm font-bold text-white mb-3">What Happens After Joining</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-2"><span className="text-blue-400 font-bold text-sm">1.</span><p className="text-sm text-slate-300">Join the photo documentation program</p></div>
                  <div className="flex items-start gap-2"><span className="text-blue-400 font-bold text-sm">2.</span><p className="text-sm text-slate-300">Upload geotagged photos through the evidence submission flow</p></div>
                  <div className="flex items-start gap-2"><span className="text-blue-400 font-bold text-sm">3.</span><p className="text-sm text-slate-300">Photos are reviewed for quality, location accuracy, and relevance</p></div>
                  <div className="flex items-start gap-2"><span className="text-blue-400 font-bold text-sm">4.</span><p className="text-sm text-slate-300">Accepted photos become part of the environmental evidence archive</p></div>
                </div>
              </Card>
              <Card className="glass-intense border-white/10 p-6">
                <h3 className="text-sm font-bold text-white mb-3">Related Links</h3>
                <div className="space-y-2">
                  <Link href="/contribute-data/geotagged-evidence" className="block text-sm text-blue-400 hover:text-blue-300">→ Submit Geotagged Evidence</Link>
                  <Link href="/submit-sighting" className="block text-sm text-blue-400 hover:text-blue-300">→ Submit a Sighting</Link>
                  <Link href="/citizen-science" className="block text-sm text-blue-400 hover:text-blue-300">→ Citizen Science Hub</Link>
                  <Link href="/contribute" className="block text-sm text-blue-400 hover:text-blue-300">→ All Contribution Paths</Link>
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
