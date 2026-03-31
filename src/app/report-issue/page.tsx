'use client';

import React, { useState } from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { AlertTriangle, MapPin, FileText, Camera, ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const issueTypes = [
  { id: 'wildfire', label: 'Forest Fire', icon: AlertTriangle, color: 'from-orange-500 to-red-600' },
  { id: 'landslide', label: 'Landslide', icon: MapPin, color: 'from-amber-500 to-orange-600' },
  { id: 'flood', label: 'Flooding', icon: AlertTriangle, color: 'from-blue-500 to-cyan-600' },
  { id: 'wildlife', label: 'Wildlife Incident', icon: Camera, color: 'from-emerald-500 to-teal-600' },
  { id: 'pollution', label: 'Pollution', icon: FileText, color: 'from-purple-500 to-indigo-600' },
  { id: 'other', label: 'Other Hazard', icon: AlertTriangle, color: 'from-slate-500 to-slate-600' },
];

export default function ReportIssuePage() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-slate-950">
        <Navigation />
        <section className="relative pt-20 md:pt-48 pb-16 md:pb-20 overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto text-center">
              <CheckCircle className="w-20 h-20 text-emerald-400 mx-auto mb-6" />
              <h1 className="text-4xl font-bold text-white mb-4">Report Submitted</h1>
              <p className="text-slate-400 mb-8">Thank you for your report. Our team will review it shortly.</p>
              <Button onClick={() => router.push('/report-issue')}>Submit Another Report</Button>
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

      <section className="relative pt-20 md:pt-48 pb-16 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/50 via-orange-950/30 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center shadow-2xl">
                <AlertTriangle className="w-8 h-8 text-white" />
              </div>
              <Badge variant="danger" size="lg">Emergency Reporting</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Report an <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">Issue</span>
            </h1>

            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-3xl">
              Report environmental hazards, emergencies, or concerns to help improve
              risk monitoring and enable rapid response
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <Card className="glass-intense border-white/10 p-8">
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-white mb-3">Issue Type</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {issueTypes.map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setSelectedType(type.id)}
                        className={`p-4 rounded-xl border transition-all ${
                          selectedType === type.id
                            ? 'border-emerald-500 bg-emerald-500/10'
                            : 'border-white/10 hover:border-white/20'
                        }`}
                      >
                        <type.icon className={`w-6 h-6 mx-auto mb-2 bg-gradient-to-br ${type.color} p-1 rounded-lg text-white`} />
                        <div className="text-xs font-medium text-white">{type.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-semibold text-white mb-2">Location</label>
                  <input
                    type="text"
                    placeholder="Enter location or area description"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-semibold text-white mb-2">Description</label>
                  <textarea
                    placeholder="Describe the issue in detail"
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 resize-none"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-semibold text-white mb-2">Contact Information (Optional)</label>
                  <input
                    type="email"
                    placeholder="Your email for follow-up"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-red-500 to-orange-600" disabled={!selectedType}>
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Submit Report
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      <AdvancedFooter />
    </main>
  );
}
