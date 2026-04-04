'use client';

import React, { useState } from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Leaf, ArrowLeft, Upload, MapPin, FileText, CheckCircle, Loader2, ExternalLink, Info, Shield
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const CONTRIBUTOR_TYPES = ['Individual', 'Academic/Research', 'Institution', 'NGO', 'Field Team', 'Monitoring Network'] as const;
const HABITAT_TYPES = ['Wetland', 'Forest', 'Grassland', 'Alpine', 'Agricultural', 'Urban', 'Riparian', 'Lake/Pond', 'River/Stream'] as const;
const SURVEY_METHODS = ['Visual encounter', 'Point count', 'Transect walk', 'Camera trap', 'Call survey', 'Sign survey'] as const;
const ACCEPTED_FORMATS = ['CSV', 'JSON', 'JPG', 'PNG', 'WEBP', 'PDF'];
const MAX_FILE_SIZE_MB = 50;

const VERIFICATION_STEPS = [
  { label: 'Received', icon: CheckCircle, color: 'text-blue-400' },
  { label: 'Under Review', icon: Loader2, color: 'text-amber-400' },
  { label: 'Community Check', icon: CheckCircle, color: 'text-emerald-400' },
  { label: 'Expert Review', icon: CheckCircle, color: 'text-violet-400' },
  { label: 'Authority Validation', icon: CheckCircle, color: 'text-blue-400' },
];

export default function SpeciesSurveyRecordsPage() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState('');
  const [formData, setFormData] = useState({
    speciesName: '',
    count: '',
    habitatType: '' as typeof HABITAT_TYPES[number],
    location: '',
    coordinates: '',
    dateTime: '',
    surveyMethod: '' as typeof SURVEY_METHODS[number],
    surveyEffort: '',
    notes: '',
    contributorType: 'Individual' as typeof CONTRIBUTOR_TYPES[number],
    contributorName: '',
    files: [] as File[],
    consent: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `SS-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    setSubmissionId(id);
    setSubmitted(true);
  };

  const handleChange = (field: string, value: string | boolean | File[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-slate-950"><section className="pt-48 pb-20">
          <div className="container mx-auto px-6 max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="glass-intense border-white/10 p-8 text-center">
                <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-emerald-400" />
                </div>
                <h1 className="text-3xl font-bold text-white mb-3">Submission Received</h1>
                <p className="text-slate-400 mb-6">Your species survey records have been successfully submitted.</p>
                <div className="bg-slate-800/50 rounded-xl p-4 mb-6">
                  <p className="text-sm text-slate-400 mb-1">Submission Reference ID</p>
                  <p className="text-xl font-mono font-bold text-emerald-400">{submissionId}</p>
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
    <main className="min-h-screen bg-slate-950"><section className="relative pt-48 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/50 via-teal-950/30 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
            <Link href="/contribute-data" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-6">
              <ArrowLeft className="w-4 h-4" />
              Back to Contribute Data
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-xl">
                <Leaf className="w-7 h-7 text-white" />
              </div>
              <Badge variant="success" size="lg">Biodiversity</Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
              Species Survey <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Records</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl">
              Submit structured species count data, population surveys, and distribution records. 
              Approved records are routed into the Biodiversity module for long-term tracking and analysis.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                <Card className="glass-intense border-white/10 p-6">
                  <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Leaf className="w-5 h-5 text-emerald-400" />
                    Species Information
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1">Species Name *</label>
                      <input type="text" required value={formData.speciesName} onChange={e => handleChange('speciesName', e.target.value)} placeholder="Common or scientific name" className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1">Count / Abundance *</label>
                      <input type="text" required value={formData.count} onChange={e => handleChange('count', e.target.value)} placeholder="e.g., 12 individuals, ~50" className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1">Habitat Type *</label>
                      <select required value={formData.habitatType} onChange={e => handleChange('habitatType', e.target.value)} className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500">
                        <option value="">Select habitat</option>
                        {HABITAT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1">Survey Method *</label>
                      <select required value={formData.surveyMethod} onChange={e => handleChange('surveyMethod', e.target.value)} className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500">
                        <option value="">Select method</option>
                        {SURVEY_METHODS.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>
                </Card>

                <Card className="glass-intense border-white/10 p-6">
                  <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-emerald-400" />
                    Location & Time
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1">Location Name *</label>
                      <input type="text" required value={formData.location} onChange={e => handleChange('location', e.target.value)} placeholder="e.g., Dachigam National Park" className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1">GPS Coordinates *</label>
                      <input type="text" required value={formData.coordinates} onChange={e => handleChange('coordinates', e.target.value)} placeholder="e.g., 34.1050° N, 74.8730° E" className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1">Date & Time *</label>
                      <input type="datetime-local" required value={formData.dateTime} onChange={e => handleChange('dateTime', e.target.value)} className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1">Survey Effort</label>
                      <input type="text" value={formData.surveyEffort} onChange={e => handleChange('surveyEffort', e.target.value)} placeholder="e.g., 2 hours, 3km transect" className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                    </div>
                  </div>
                </Card>

                <Card className="glass-intense border-white/10 p-6">
                  <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-emerald-400" />
                    Contributor Information
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1">Contributor Type *</label>
                      <select required value={formData.contributorType} onChange={e => handleChange('contributorType', e.target.value)} className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500">
                        {CONTRIBUTOR_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1">Contributor Name *</label>
                      <input type="text" required value={formData.contributorName} onChange={e => handleChange('contributorName', e.target.value)} placeholder="Your name or organization" className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-slate-300 mb-1">Notes / Observations</label>
                    <textarea rows={3} value={formData.notes} onChange={e => handleChange('notes', e.target.value)} placeholder="Behavior notes, weather, associated species, etc." className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                  </div>
                </Card>

                <Card className="glass-intense border-white/10 p-6">
                  <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Upload className="w-5 h-5 text-emerald-400" />
                    Supporting Files
                  </h2>
                  <p className="text-sm text-slate-400 mb-3">Accepted: {ACCEPTED_FORMATS.join(', ')} • Max: {MAX_FILE_SIZE_MB}MB</p>
                  <input type="file" multiple accept=".csv,.json,.jpg,.jpeg,.png,.webp,.pdf" onChange={e => handleChange('files', Array.from(e.target.files || []))} className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-emerald-500/20 file:text-emerald-400 hover:file:bg-emerald-500/30" />
                </Card>

                <Card className="glass-intense border-white/10 p-6">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-bold text-white mb-2">Data Permissions & Sensitivity</h3>
                      <ul className="text-xs text-slate-400 space-y-1">
                        <li>• Contributors confirm they have permission to share this data</li>
                        <li>• Exact location details may be restricted for sensitive or threatened species</li>
                        <li>• Publication status depends on data quality and expert verification</li>
                        <li>• Sensitive biodiversity data may remain restricted to authorized personnel</li>
                      </ul>
                    </div>
                  </div>
                </Card>

                <Card className="glass-intense border-white/10 p-6">
                  <div className="flex items-start gap-3">
                    <input type="checkbox" id="consent" required checked={formData.consent} onChange={e => handleChange('consent', e.target.checked)} className="mt-1 w-4 h-4 rounded border-white/20 bg-slate-800 text-emerald-500 focus:ring-emerald-500" />
                    <label htmlFor="consent" className="text-sm text-slate-300">
                      I confirm this observation was made legally and accurately. I grant permission for review and potential publication. Data will go through Community → Expert → Authority verification.
                    </label>
                  </div>
                </Card>

                <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
                  <Upload className="w-5 h-5 mr-2" />
                  Submit Species Survey Records
                </Button>
              </form>
            </div>

            <div className="space-y-6">
              <Card className="glass-intense border-white/10 p-6">
                <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2"><Info className="w-4 h-4 text-emerald-400" />About This Submission</h3>
                <p className="text-sm text-slate-400 mb-4">Species survey records help track biodiversity, population trends, and distribution patterns across Kashmir&apos;s ecosystems.</p>
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-slate-500 uppercase">Routes to</h4>
                  <div className="flex flex-wrap gap-1.5"><Badge variant="success" size="sm">Biodiversity</Badge></div>
                </div>
              </Card>
              <Card className="glass-intense border-white/10 p-6">
                <h3 className="text-sm font-bold text-white mb-3">Verification Path</h3>
                <div className="space-y-3">{VERIFICATION_STEPS.map((step) => (<div key={step.label} className="flex items-center gap-2"><step.icon className={`w-4 h-4 ${step.color}`} /><span className="text-sm text-slate-300">{step.label}</span></div>))}</div>
              </Card>
              <Card className="glass-intense border-white/10 p-6">
                <h3 className="text-sm font-bold text-white mb-3">Related Links</h3>
                <div className="space-y-2">
                  <Link href="/report-issue" className="block text-sm text-emerald-400 hover:text-emerald-300">→ Report an Issue</Link>
                  <Link href="/submit-sighting" className="block text-sm text-emerald-400 hover:text-emerald-300">→ Submit a Sighting</Link>
                  <Link href="/citizen-science" className="block text-sm text-emerald-400 hover:text-emerald-300">→ Citizen Science</Link>
                  <Link href="/contribute-data" className="block text-sm text-emerald-400 hover:text-emerald-300">→ All Contribution Tracks</Link>
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
