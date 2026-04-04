'use client';

import React, { useState } from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Camera, ArrowLeft, Upload, MapPin, FileText, CheckCircle, Loader2, ExternalLink, Info, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const CONTRIBUTOR_TYPES = ['Individual', 'Academic/Research', 'Institution', 'NGO', 'Field Team', 'Monitoring Network'] as const;
const EVIDENCE_TYPES = ['Habitat Change', 'Pollution Evidence', 'Species Evidence', 'Infrastructure Impact', 'Climate Evidence', 'Land Use Change', 'Other'] as const;
const ACCEPTED_FORMATS = ['JPG', 'PNG', 'WEBP', 'TIFF', 'MP4', 'PDF', 'GeoJSON', 'KML'];
const MAX_FILE_SIZE_MB = 100;
const VERIFICATION_STEPS = [
  { label: 'Received', icon: CheckCircle, color: 'text-blue-400' },
  { label: 'Under Review', icon: Loader2, color: 'text-amber-400' },
  { label: 'Community Check', icon: CheckCircle, color: 'text-emerald-400' },
  { label: 'Expert Review', icon: CheckCircle, color: 'text-violet-400' },
  { label: 'Authority Validation', icon: CheckCircle, color: 'text-blue-400' },
];

export default function GeotaggedEvidencePage() {
  const [submitted, setSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState('');
  const [formData, setFormData] = useState({
    coordinates: '', dateCaptured: '', description: '',
    evidenceType: '' as typeof EVIDENCE_TYPES[number], sourceContext: '',
    contributorType: 'Individual' as typeof CONTRIBUTOR_TYPES[number],
    contributorName: '', files: [] as File[], consent: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `GE-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    setSubmissionId(id);
    setSubmitted(true);
  };
  const handleChange = (field: string, value: string | boolean | File[]) => setFormData(prev => ({ ...prev, [field]: value }));

  if (submitted) {
    return (
      <main className="min-h-screen bg-slate-950">
        <Navigation />
        <section className="pt-48 pb-20"><div className="container mx-auto px-6 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="glass-intense border-white/10 p-8 text-center">
              <div className="w-20 h-20 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-6"><CheckCircle className="w-10 h-10 text-amber-400" /></div>
              <h1 className="text-3xl font-bold text-white mb-3">Submission Received</h1>
              <p className="text-slate-400 mb-6">Your geotagged evidence has been successfully submitted.</p>
              <div className="bg-slate-800/50 rounded-xl p-4 mb-6"><p className="text-sm text-slate-400 mb-1">Submission Reference ID</p><p className="text-xl font-mono font-bold text-amber-400">{submissionId}</p></div>
              <div className="mb-8"><h3 className="text-sm font-semibold text-white mb-4">What happens next</h3>
                <div className="flex items-center justify-between gap-2 flex-wrap">{VERIFICATION_STEPS.map((step, i) => (<div key={step.label} className="flex items-center gap-1"><step.icon className={`w-5 h-5 ${step.color} ${i === 0 ? 'animate-pulse' : 'opacity-40'}`} /><span className="text-xs text-slate-400">{step.label}</span>{i < VERIFICATION_STEPS.length - 1 && <span className="text-slate-600 mx-1">→</span>}</div>))}</div>
              </div>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link href="/contribute-data"><Button variant="outline" className="border-white/20 text-white"><ArrowLeft className="w-4 h-4 mr-2" />Back to Contribute Data</Button></Link>
                <Link href="/citizen-science"><Button className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white">Explore Citizen Science<ExternalLink className="w-4 h-4 ml-2" /></Button></Link>
              </div>
            </Card>
          </motion.div>
        </div></section>
        <AdvancedFooter />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />
      <section className="relative pt-48 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-950/50 via-orange-950/30 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
            <Link href="/contribute-data" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-6"><ArrowLeft className="w-4 h-4" />Back to Contribute Data</Link>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-xl"><Camera className="w-7 h-7 text-white" /></div>
              <Badge variant="warning" size="lg">Geotagged Evidence</Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Geotagged Evidence <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">Collections</span></h1>
            <p className="text-lg text-slate-400 max-w-2xl">Submit location-tagged photos, drone imagery, and field documentation with GPS metadata. Approved records route into relevant modules by theme.</p>
          </motion.div>
        </div>
      </section>
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                <Card className="glass-intense border-white/10 p-6">
                  <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><MapPin className="w-5 h-5 text-amber-400" />Location & Evidence Details</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div><label className="block text-sm font-medium text-slate-300 mb-1">GPS Coordinates *</label><input type="text" required value={formData.coordinates} onChange={e => handleChange('coordinates', e.target.value)} placeholder="e.g., 34.0837° N, 74.7973° E" className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500" /></div>
                    <div><label className="block text-sm font-medium text-slate-300 mb-1">Date Captured *</label><input type="date" required value={formData.dateCaptured} onChange={e => handleChange('dateCaptured', e.target.value)} className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-amber-500" /></div>
                    <div><label className="block text-sm font-medium text-slate-300 mb-1">Evidence Type *</label><select required value={formData.evidenceType} onChange={e => handleChange('evidenceType', e.target.value)} className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"><option value="">Select type</option>{EVIDENCE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
                    <div><label className="block text-sm font-medium text-slate-300 mb-1">Source Context</label><input type="text" value={formData.sourceContext} onChange={e => handleChange('sourceContext', e.target.value)} placeholder="e.g., Field survey, drone flight, ground observation" className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500" /></div>
                  </div>
                </Card>
                <Card className="glass-intense border-white/10 p-6">
                  <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><FileText className="w-5 h-5 text-amber-400" />Description</h2>
                  <textarea rows={4} required value={formData.description} onChange={e => handleChange('description', e.target.value)} placeholder="Detailed description of the evidence, what it shows, and its environmental significance" className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500" />
                  <p className="text-xs text-slate-500 mt-2">EXIF/geotag metadata will be preserved and validated. Ensure photos contain embedded GPS coordinates when possible.</p>
                </Card>
                <Card className="glass-intense border-white/10 p-6">
                  <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><FileText className="w-5 h-5 text-amber-400" />Contributor Information</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div><label className="block text-sm font-medium text-slate-300 mb-1">Contributor Type *</label><select required value={formData.contributorType} onChange={e => handleChange('contributorType', e.target.value)} className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-amber-500">{CONTRIBUTOR_TYPES.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
                    <div><label className="block text-sm font-medium text-slate-300 mb-1">Contributor Name *</label><input type="text" required value={formData.contributorName} onChange={e => handleChange('contributorName', e.target.value)} placeholder="Your name or organization" className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500" /></div>
                  </div>
                </Card>
                <Card className="glass-intense border-white/10 p-6">
                  <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Upload className="w-5 h-5 text-amber-400" />Media Upload</h2>
                  <p className="text-sm text-slate-400 mb-3">Accepted: {ACCEPTED_FORMATS.join(', ')} • Max: {MAX_FILE_SIZE_MB}MB</p>
                  <input type="file" multiple accept=".jpg,.jpeg,.png,.webp,.tiff,.mp4,.pdf,.geojson,.kml" onChange={e => handleChange('files', Array.from(e.target.files || []))} className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-amber-500/20 file:text-amber-400 hover:file:bg-amber-500/30" />
                </Card>
                <Card className="glass-intense border-white/10 p-6">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-bold text-white mb-2">Data Permissions & Sensitivity</h3>
                      <ul className="text-xs text-slate-400 space-y-1">
                        <li>• Contributors confirm they have permission to share this data</li>
                        <li>• Exact location details may be restricted for sensitive sites</li>
                        <li>• Publication status depends on data quality and verification</li>
                        <li>• Sensitive environmental data may remain restricted to authorized personnel</li>
                      </ul>
                    </div>
                  </div>
                </Card>
                <Card className="glass-intense border-white/10 p-6">
                  <div className="flex items-start gap-3"><input type="checkbox" id="consent" required checked={formData.consent} onChange={e => handleChange('consent', e.target.checked)} className="mt-1 w-4 h-4 rounded border-white/20 bg-slate-800 text-amber-500 focus:ring-amber-500" /><label htmlFor="consent" className="text-sm text-slate-300">I confirm this evidence was captured legally. I grant permission for review and potential publication through Community → Expert → Authority verification.</label></div>
                </Card>
                <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white"><Upload className="w-5 h-5 mr-2" />Submit Geotagged Evidence</Button>
              </form>
            </div>
            <div className="space-y-6">
              <Card className="glass-intense border-white/10 p-6"><h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2"><Info className="w-4 h-4 text-amber-400" />About This Submission</h3><p className="text-sm text-slate-400 mb-4">Geotagged evidence provides visual, location-verified documentation of environmental conditions and changes.</p><div className="space-y-2"><h4 className="text-xs font-semibold text-slate-500 uppercase">Routes to</h4><div className="flex flex-wrap gap-1.5"><Badge variant="warning" size="sm">Relevant Module by Theme</Badge></div></div></Card>
              <Card className="glass-intense border-white/10 p-6"><h3 className="text-sm font-bold text-white mb-3">Verification Path</h3><div className="space-y-3">{VERIFICATION_STEPS.map((step) => (<div key={step.label} className="flex items-center gap-2"><step.icon className={`w-4 h-4 ${step.color}`} /><span className="text-sm text-slate-300">{step.label}</span></div>))}</div></Card>
              <Card className="glass-intense border-white/10 p-6"><h3 className="text-sm font-bold text-white mb-3">Related Links</h3><div className="space-y-2"><Link href="/report-issue" className="block text-sm text-amber-400 hover:text-amber-300">→ Report an Issue</Link><Link href="/submit-sighting" className="block text-sm text-amber-400 hover:text-amber-300">→ Submit a Sighting</Link><Link href="/citizen-science" className="block text-sm text-amber-400 hover:text-amber-300">→ Citizen Science</Link><Link href="/contribute-data" className="block text-sm text-amber-400 hover:text-amber-300">→ All Contribution Tracks</Link></div></Card>
            </div>
          </div>
        </div>
      </section>
      <AdvancedFooter />
    </main>
  );
}
