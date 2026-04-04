'use client';

import React, { useState } from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { FileText, ArrowLeft, Upload, CheckCircle, Loader2, ExternalLink, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const CONTRIBUTOR_TYPES = ['Individual', 'Researcher', 'Institution', 'Field Team', 'District Contributor'] as const;
const PUBLICATION_STATUS = ['Unpublished', 'In Preparation', 'Submitted', 'Published', 'Peer-Reviewed'] as const;
const ACCEPTED_FORMATS = ['CSV', 'JSON', 'XLSX', 'PDF', 'ZIP', 'DOI Link'];
const MAX_FILE_SIZE_MB = 200;
const VERIFICATION_STEPS = [
  { label: 'Received', icon: CheckCircle, color: 'text-blue-400' },
  { label: 'Under Review', icon: Loader2, color: 'text-amber-400' },
  { label: 'Community Check', icon: CheckCircle, color: 'text-emerald-400' },
  { label: 'Expert Review', icon: CheckCircle, color: 'text-violet-400' },
  { label: 'Authority Validation', icon: CheckCircle, color: 'text-blue-400' },
];

export default function ResearchSurveyDataPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState('');
  const [formData, setFormData] = useState({
    studyTitle: '', institution: '', publicationStatus: '' as typeof PUBLICATION_STATUS[number],
    datasetLink: '', abstract: '', timeRangeStart: '', timeRangeEnd: '',
    geographicCoverage: '', methodology: '',
    contributorType: 'Institution' as typeof CONTRIBUTOR_TYPES[number],
    contributorName: '', files: [] as File[], consent: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `RS-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
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
              <div className="w-20 h-20 rounded-full bg-indigo-500/20 flex items-center justify-center mx-auto mb-6"><CheckCircle className="w-10 h-10 text-indigo-400" /></div>
              <h1 className="text-3xl font-bold text-white mb-3">Submission Received</h1>
              <p className="text-slate-400 mb-6">Your research & survey data has been successfully submitted.</p>
              <div className="bg-slate-800/50 rounded-xl p-4 mb-6"><p className="text-sm text-slate-400 mb-1">Submission Reference ID</p><p className="text-xl font-mono font-bold text-indigo-400">{submissionId}</p></div>
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
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/50 via-blue-950/30 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
            <Link href="/contribute-data" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-6"><ArrowLeft className="w-4 h-4" />Back to Contribute Data</Link>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-xl"><FileText className="w-7 h-7 text-white" /></div>
              <Badge variant="info" size="lg">Research Data</Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Research & Survey <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">Data</span></h1>
            <p className="text-lg text-slate-400 max-w-2xl">Submit academic research outputs, institutional survey results, and peer-reviewed findings. Approved records route into Library and relevant domain modules.</p>
          </motion.div>
        </div>
      </section>
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                <Card className="glass-intense border-white/10 p-6">
                  <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><FileText className="w-5 h-5 text-indigo-400" />Study Information</h2>
                  <div className="space-y-4">
                    <div><label className="block text-sm font-medium text-slate-300 mb-1">Study Title *</label><input type="text" required value={formData.studyTitle} onChange={e => handleChange('studyTitle', e.target.value)} placeholder="Full title of the study or survey" className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500" /></div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div><label className="block text-sm font-medium text-slate-300 mb-1">Institution *</label><input type="text" required value={formData.institution} onChange={e => handleChange('institution', e.target.value)} placeholder="e.g., University of Kashmir" className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500" /></div>
                      <div><label className="block text-sm font-medium text-slate-300 mb-1">Publication Status *</label><select required value={formData.publicationStatus} onChange={e => handleChange('publicationStatus', e.target.value)} className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"><option value="">Select status</option>{PUBLICATION_STATUS.map(s => <option key={s} value={s}>{s}</option>)}</select></div>
                    </div>
                    <div><label className="block text-sm font-medium text-slate-300 mb-1">Dataset Link / DOI</label><input type="url" value={formData.datasetLink} onChange={e => handleChange('datasetLink', e.target.value)} placeholder="https://doi.org/... or external link" className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500" /></div>
                  </div>
                </Card>
                <Card className="glass-intense border-white/10 p-6">
                  <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><FileText className="w-5 h-5 text-indigo-400" />Abstract & Coverage</h2>
                  <div className="space-y-4">
                    <div><label className="block text-sm font-medium text-slate-300 mb-1">Abstract / Summary *</label><textarea rows={4} required value={formData.abstract} onChange={e => handleChange('abstract', e.target.value)} placeholder="Brief summary of the research, key findings, and relevance" className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500" /></div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div><label className="block text-sm font-medium text-slate-300 mb-1">Time Range Start</label><input type="date" value={formData.timeRangeStart} onChange={e => handleChange('timeRangeStart', e.target.value)} className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" /></div>
                      <div><label className="block text-sm font-medium text-slate-300 mb-1">Time Range End</label><input type="date" value={formData.timeRangeEnd} onChange={e => handleChange('timeRangeEnd', e.target.value)} className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" /></div>
                      <div className="sm:col-span-2"><label className="block text-sm font-medium text-slate-300 mb-1">Geographic Coverage</label><input type="text" value={formData.geographicCoverage} onChange={e => handleChange('geographicCoverage', e.target.value)} placeholder="e.g., Kashmir Valley, specific districts" className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500" /></div>
                    </div>
                    <div><label className="block text-sm font-medium text-slate-300 mb-1">Methodology</label><textarea rows={2} value={formData.methodology} onChange={e => handleChange('methodology', e.target.value)} placeholder="Research methods, sampling design, analytical approach" className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500" /></div>
                  </div>
                </Card>
                <Card className="glass-intense border-white/10 p-6">
                  <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><FileText className="w-5 h-5 text-indigo-400" />Contributor Information</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div><label className="block text-sm font-medium text-slate-300 mb-1">Contributor Type *</label><select required value={formData.contributorType} onChange={e => handleChange('contributorType', e.target.value)} className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">{CONTRIBUTOR_TYPES.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
                    <div><label className="block text-sm font-medium text-slate-300 mb-1">Contributor Name *</label><input type="text" required value={formData.contributorName} onChange={e => handleChange('contributorName', e.target.value)} placeholder="Your name or organization" className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500" /></div>
                  </div>
                </Card>
                <Card className="glass-intense border-white/10 p-6">
                  <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Upload className="w-5 h-5 text-indigo-400" />File Upload</h2>
                  <p className="text-sm text-slate-400 mb-3">Accepted: {ACCEPTED_FORMATS.join(', ')} • Max: {MAX_FILE_SIZE_MB}MB</p>
                  <input type="file" multiple onChange={e => handleChange('files', Array.from(e.target.files || []))} className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-500/20 file:text-indigo-400 hover:file:bg-indigo-500/30" />
                </Card>
                <Card className="glass-intense border-white/10 p-6">
                  <div className="flex items-start gap-3"><input type="checkbox" id="consent" required checked={formData.consent} onChange={e => handleChange('consent', e.target.checked)} className="mt-1 w-4 h-4 rounded border-white/20 bg-slate-800 text-indigo-500 focus:ring-indigo-500" /><label htmlFor="consent" className="text-sm text-slate-300">I confirm this research data is shared with appropriate permissions. I grant permission for review and potential publication through Community → Expert → Authority verification.</label></div>
                </Card>
                <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-indigo-500 to-blue-600 text-white"><Upload className="w-5 h-5 mr-2" />Submit Research & Survey Data</Button>
              </form>
            </div>
            <div className="space-y-6">
              <Card className="glass-intense border-white/10 p-6"><h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2"><Info className="w-4 h-4 text-indigo-400" />About This Submission</h3><p className="text-sm text-slate-400 mb-4">Research data enriches the platform&apos;s evidence base and connects academic findings with environmental monitoring.</p><div className="space-y-2"><h4 className="text-xs font-semibold text-slate-500 uppercase">Routes to</h4><div className="flex flex-wrap gap-1.5"><Badge variant="info" size="sm">Library</Badge><Badge variant="info" size="sm">Domain Modules</Badge></div></div></Card>
              <Card className="glass-intense border-white/10 p-6"><h3 className="text-sm font-bold text-white mb-3">Verification Path</h3><div className="space-y-3">{VERIFICATION_STEPS.map((step) => (<div key={step.label} className="flex items-center gap-2"><step.icon className={`w-4 h-4 ${step.color}`} /><span className="text-sm text-slate-300">{step.label}</span></div>))}</div></Card>
              <Card className="glass-intense border-white/10 p-6"><h3 className="text-sm font-bold text-white mb-3">Related Links</h3><div className="space-y-2"><Link href="/report-issue" className="block text-sm text-indigo-400 hover:text-indigo-300">→ Report an Issue</Link><Link href="/submit-sighting" className="block text-sm text-indigo-400 hover:text-indigo-300">→ Submit a Sighting</Link><Link href="/citizen-science" className="block text-sm text-indigo-400 hover:text-indigo-300">→ Citizen Science</Link><Link href="/contribute-data" className="block text-sm text-indigo-400 hover:text-indigo-300">→ All Contribution Tracks</Link></div></Card>
            </div>
          </div>
        </div>
      </section>
      <AdvancedFooter />
    </main>
  );
}
