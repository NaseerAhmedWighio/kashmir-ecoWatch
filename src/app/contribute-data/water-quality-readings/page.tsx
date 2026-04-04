'use client';

import React, { useState } from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Droplets, ArrowLeft, Upload, MapPin, Calendar, Clock, FileText,
  CheckCircle, Loader2, ExternalLink, Info
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const CONTRIBUTOR_TYPES = ['Individual', 'Researcher', 'Institution', 'Field Team', 'District Contributor'] as const;
const ACCEPTED_FORMATS = ['CSV', 'JSON', 'GeoJSON', 'KML', 'JPG', 'PNG', 'WEBP', 'PDF'];
const MAX_FILE_SIZE_MB = 50;

const VERIFICATION_STEPS = [
  { label: 'Received', icon: CheckCircle, color: 'text-blue-400' },
  { label: 'Under Review', icon: Loader2, color: 'text-amber-400' },
  { label: 'Community Check', icon: CheckCircle, color: 'text-emerald-400' },
  { label: 'Expert Review', icon: CheckCircle, color: 'text-violet-400' },
  { label: 'Authority Validation', icon: CheckCircle, color: 'text-blue-400' },
];

export default function WaterQualityReadingsPage() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState('');
  const [formData, setFormData] = useState({
    waterbodyName: '',
    coordinates: '',
    dateTime: '',
    ph: '',
    dissolvedOxygen: '',
    turbidity: '',
    temperature: '',
    conductivity: '',
    methodology: '',
    contributorType: 'Individual' as typeof CONTRIBUTOR_TYPES[number],
    contributorName: '',
    notes: '',
    files: [] as File[],
    consent: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `WQ-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    setSubmissionId(id);
    setSubmitted(true);
  };

  const handleChange = (field: string, value: string | boolean | File[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-slate-950">
        <Navigation />
        <section className="pt-48 pb-20">
          <div className="container mx-auto px-6 max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="glass-intense border-white/10 p-8 text-center">
                <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-emerald-400" />
                </div>
                <h1 className="text-3xl font-bold text-white mb-3">Submission Received</h1>
                <p className="text-slate-400 mb-6">Your water quality readings have been successfully submitted.</p>
                <div className="bg-slate-800/50 rounded-xl p-4 mb-6">
                  <p className="text-sm text-slate-400 mb-1">Submission Reference ID</p>
                  <p className="text-xl font-mono font-bold text-blue-400">{submissionId}</p>
                </div>
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-white mb-4">What happens next</h3>
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    {VERIFICATION_STEPS.map((step, i) => (
                      <div key={step.label} className="flex items-center gap-1">
                        <step.icon className={`w-5 h-5 ${step.color} ${i === 0 ? 'animate-pulse' : 'opacity-40'}`} />
                        <span className="text-xs text-slate-400">{step.label}</span>
                        {i < VERIFICATION_STEPS.length - 1 && <span className="text-slate-600 mx-1">→</span>}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 justify-center">
                  <Link href="/contribute-data">
                    <Button variant="outline" className="border-white/20 text-white">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Contribute Data
                    </Button>
                  </Link>
                  <Link href="/citizen-science">
                    <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
                      Explore Citizen Science
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>
        <AdvancedFooter />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-48 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/50 via-cyan-950/30 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
            <Link href="/contribute-data" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-6">
              <ArrowLeft className="w-4 h-4" />
              Back to Contribute Data
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-xl">
                <Droplets className="w-7 h-7 text-white" />
              </div>
              <Badge variant="info" size="lg">Water Quality</Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
              Water Quality <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Readings</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl">
              Submit pH, dissolved oxygen, turbidity, temperature, and other water quality parameters from Kashmir&apos;s waterbodies. 
              Approved records are routed into Water Systems and Water Quality modules.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Location & Time */}
                <Card className="glass-intense border-white/10 p-6">
                  <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-blue-400" />
                    Location & Time
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1">Waterbody Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.waterbodyName}
                        onChange={e => handleChange('waterbodyName', e.target.value)}
                        placeholder="e.g., Dal Lake, Jhelum River"
                        className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1">GPS Coordinates *</label>
                      <input
                        type="text"
                        required
                        value={formData.coordinates}
                        onChange={e => handleChange('coordinates', e.target.value)}
                        placeholder="e.g., 34.0837° N, 74.7973° E"
                        className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1">Date & Time *</label>
                      <input
                        type="datetime-local"
                        required
                        value={formData.dateTime}
                        onChange={e => handleChange('dateTime', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </Card>

                {/* Readings */}
                <Card className="glass-intense border-white/10 p-6">
                  <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Droplets className="w-5 h-5 text-blue-400" />
                    Water Quality Parameters
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1">pH Value *</label>
                      <input
                        type="number"
                        required
                        step="0.01"
                        min="0"
                        max="14"
                        value={formData.ph}
                        onChange={e => handleChange('ph', e.target.value)}
                        placeholder="e.g., 7.2"
                        className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1">Dissolved Oxygen (mg/L) *</label>
                      <input
                        type="number"
                        required
                        step="0.01"
                        min="0"
                        value={formData.dissolvedOxygen}
                        onChange={e => handleChange('dissolvedOxygen', e.target.value)}
                        placeholder="e.g., 8.5"
                        className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1">Turbidity (NTU) *</label>
                      <input
                        type="number"
                        required
                        step="0.01"
                        min="0"
                        value={formData.turbidity}
                        onChange={e => handleChange('turbidity', e.target.value)}
                        placeholder="e.g., 12.3"
                        className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1">Temperature (°C) *</label>
                      <input
                        type="number"
                        required
                        step="0.1"
                        value={formData.temperature}
                        onChange={e => handleChange('temperature', e.target.value)}
                        placeholder="e.g., 18.5"
                        className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1">Conductivity (µS/cm)</label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.conductivity}
                        onChange={e => handleChange('conductivity', e.target.value)}
                        placeholder="Optional"
                        className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1">Methodology</label>
                      <input
                        type="text"
                        value={formData.methodology}
                        onChange={e => handleChange('methodology', e.target.value)}
                        placeholder="e.g., Portable meter, lab analysis"
                        className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </Card>

                {/* Contributor Info */}
                <Card className="glass-intense border-white/10 p-6">
                  <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-400" />
                    Contributor Information
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1">Contributor Type *</label>
                      <select
                        required
                        value={formData.contributorType}
                        onChange={e => handleChange('contributorType', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {CONTRIBUTOR_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1">Contributor Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.contributorName}
                        onChange={e => handleChange('contributorName', e.target.value)}
                        placeholder="Your name or organization"
                        className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-slate-300 mb-1">Notes / Observations</label>
                    <textarea
                      rows={3}
                      value={formData.notes}
                      onChange={e => handleChange('notes', e.target.value)}
                      placeholder="Additional context, weather conditions, visible pollution, etc."
                      className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </Card>

                {/* File Upload */}
                <Card className="glass-intense border-white/10 p-6">
                  <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Upload className="w-5 h-5 text-blue-400" />
                    Supporting Files
                  </h2>
                  <p className="text-sm text-slate-400 mb-3">
                    Accepted formats: {ACCEPTED_FORMATS.join(', ')} • Max size: {MAX_FILE_SIZE_MB}MB per file
                  </p>
                  <input
                    type="file"
                    multiple
                    accept=".csv,.json,.geojson,.kml,.jpg,.jpeg,.png,.webp,.pdf"
                    onChange={e => handleChange('files', Array.from(e.target.files || []))}
                    className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-500/20 file:text-blue-400 hover:file:bg-blue-500/30"
                  />
                </Card>

                {/* Consent */}
                <Card className="glass-intense border-white/10 p-6">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="consent"
                      required
                      checked={formData.consent}
                      onChange={e => handleChange('consent', e.target.checked)}
                      className="mt-1 w-4 h-4 rounded border-white/20 bg-slate-800 text-blue-500 focus:ring-blue-500"
                    />
                    <label htmlFor="consent" className="text-sm text-slate-300">
                      I confirm that this data was collected legally and accurately. I grant permission for this submission 
                      to be reviewed, validated, and potentially published as part of Kashmir&apos;s environmental intelligence platform. 
                      I understand this data will go through Community → Expert → Authority verification tiers.
                    </label>
                  </div>
                </Card>

                <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 text-white">
                  <Upload className="w-5 h-5 mr-2" />
                  Submit Water Quality Readings
                </Button>
              </form>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="glass-intense border-white/10 p-6">
                <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                  <Info className="w-4 h-4 text-blue-400" />
                  About This Submission
                </h3>
                <p className="text-sm text-slate-400 mb-4">
                  Water quality readings help track the health of Kashmir&apos;s lakes, rivers, streams, and wetlands. 
                  Your data contributes to long-term monitoring and early warning systems.
                </p>
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Routes to</h4>
                  <div className="flex flex-wrap gap-1.5">
                    <Badge variant="info" size="sm">Water Systems</Badge>
                    <Badge variant="info" size="sm">Water Quality Module</Badge>
                  </div>
                </div>
              </Card>

              <Card className="glass-intense border-white/10 p-6">
                <h3 className="text-sm font-bold text-white mb-3">Verification Path</h3>
                <div className="space-y-3">
                  {VERIFICATION_STEPS.map((step, i) => (
                    <div key={step.label} className="flex items-center gap-2">
                      <step.icon className={`w-4 h-4 ${step.color}`} />
                      <span className="text-sm text-slate-300">{step.label}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="glass-intense border-white/10 p-6">
                <h3 className="text-sm font-bold text-white mb-3">Related Links</h3>
                <div className="space-y-2">
                  <Link href="/report-issue" className="block text-sm text-blue-400 hover:text-blue-300 transition-colors">
                    → Report an Issue
                  </Link>
                  <Link href="/submit-sighting" className="block text-sm text-blue-400 hover:text-blue-300 transition-colors">
                    → Submit a Sighting
                  </Link>
                  <Link href="/citizen-science" className="block text-sm text-blue-400 hover:text-blue-300 transition-colors">
                    → Citizen Science
                  </Link>
                  <Link href="/contribute-data" className="block text-sm text-blue-400 hover:text-blue-300 transition-colors">
                    → All Contribution Tracks
                  </Link>
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
