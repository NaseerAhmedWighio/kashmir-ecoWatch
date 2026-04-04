'use client';

import React, { useState } from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  AlertTriangle, MapPin, FileText, Camera, ArrowRight, CheckCircle,
  Flame, Droplets, Leaf, Trash2, Building2, Waves, Cloud, Zap,
  Upload, Clock, Map, User, Mail, Eye
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const issueTypes = [
  { id: 'forest-fire', label: 'Forest Fire', icon: Flame, color: 'from-orange-500 to-red-600' },
  { id: 'landslide', label: 'Landslide', icon: MapPin, color: 'from-amber-500 to-orange-600' },
  { id: 'flooding', label: 'Flooding', icon: Droplets, color: 'from-blue-500 to-cyan-600' },
  { id: 'wildlife-incident', label: 'Wildlife Incident', icon: Leaf, color: 'from-emerald-500 to-teal-600' },
  { id: 'human-wildlife-conflict', label: 'Human-Wildlife Conflict', icon: AlertTriangle, color: 'from-red-500 to-pink-600' },
  { id: 'pollution', label: 'Pollution Leak', icon: Cloud, color: 'from-purple-500 to-indigo-600' },
  { id: 'sewage-overflow', label: 'Sewage Overflow', icon: Waves, color: 'from-slate-500 to-zinc-600' },
  { id: 'illegal-dumping', label: 'Illegal Dumping', icon: Trash2, color: 'from-gray-500 to-slate-600' },
  { id: 'fish-bird-mortality', label: 'Fish/Bird Mortality', icon: Zap, color: 'from-yellow-500 to-orange-500' },
  { id: 'air-quality-event', label: 'Air Quality Event', icon: Cloud, color: 'from-slate-600 to-gray-700' },
  { id: 'infrastructure-failure', label: 'Infrastructure Failure', icon: Building2, color: 'from-stone-500 to-stone-700' },
  { id: 'other-hazard', label: 'Other Hazard', icon: AlertTriangle, color: 'from-slate-500 to-slate-700' },
];

const severityLevels = [
  { id: 'low', label: 'Low', description: 'Minor concern, no immediate threat', color: 'from-blue-500 to-cyan-500' },
  { id: 'moderate', label: 'Moderate', description: 'Requires attention, developing situation', color: 'from-amber-500 to-orange-500' },
  { id: 'high', label: 'High', description: 'Significant threat, needs rapid response', color: 'from-orange-500 to-red-500' },
  { id: 'critical', label: 'Critical', description: 'Emergency, immediate action required', color: 'from-red-600 to-red-800' },
];

export default function ReportIssuePage() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedSeverity, setSelectedSeverity] = useState<string>('moderate');
  const [incidentDate, setIncidentDate] = useState('');
  const [incidentTime, setIncidentTime] = useState('');
  const [coordinates, setCoordinates] = useState('');
  const [anonymous, setAnonymous] = useState(false);
  const [photos, setPhotos] = useState<File[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setCoordinates(`${pos.coords.latitude.toFixed(6)}, ${pos.coords.longitude.toFixed(6)}`),
        () => {}
      );
    }
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-slate-950">
        <Navigation />
        <section className="relative pt-20 md:pt-48 pb-16 md:pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/50 to-slate-950" />
          <div className="container mx-auto px-6 relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto text-center">
              <CheckCircle className="w-20 h-20 text-emerald-400 mx-auto mb-6" />
              <h1 className="text-4xl font-bold text-white mb-4">Report Submitted</h1>
              <p className="text-slate-400 mb-2">
                Your incident report has been logged into the Kashmir environmental intelligence system.
              </p>
              <p className="text-sm text-slate-500 mb-8">
                Reports are reviewed through our verification pipeline: Community → Expert → Authority.
                You will receive updates if contact information was provided.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Button onClick={() => router.push('/report-issue')}>
                  Submit Another Report
                </Button>
                <Button variant="outline" className="border-white/20 text-white" onClick={() => router.push('/contribute')}>
                  Explore Other Ways to Contribute
                </Button>
              </div>
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
      <section className="relative pt-48 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/50 via-orange-950/30 to-slate-950" />
        <div className="absolute inset-0 bg-grid opacity-20" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl">
            <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
              <button onClick={() => router.push('/contribute')} className="hover:text-white transition-colors">Contribute</button>
              <span className="text-slate-600">/</span>
              <span className="text-white font-medium">Report an Issue</span>
            </nav>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center shadow-2xl">
                <AlertTriangle className="w-8 h-8 text-white" />
              </div>
              <Badge variant="danger" size="lg">Emergency & Hazard Reporting</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Report an <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">Issue</span>
            </h1>

            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-3xl">
              Report environmental hazards, emergencies, and urgent concerns for rapid response
              and district-level risk intelligence
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Card className="glass-intense border-white/10 p-6 sm:p-8">
              <form onSubmit={handleSubmit}>
                {/* Issue Type */}
                <div className="mb-8">
                  <label className="block text-sm font-semibold text-white mb-3">Issue Type <span className="text-red-400">*</span></label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {issueTypes.map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setSelectedType(type.id)}
                        className={`p-3 rounded-xl border transition-all text-center ${
                          selectedType === type.id
                            ? 'border-red-500 bg-red-500/10 ring-1 ring-red-500/30'
                            : 'border-white/10 hover:border-white/20 bg-white/5'
                        }`}
                      >
                        <type.icon className={`w-5 h-5 mx-auto mb-2 ${selectedType === type.id ? 'text-red-400' : 'text-slate-400'}`} />
                        <div className="text-xs font-medium text-white">{type.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Severity */}
                <div className="mb-8">
                  <label className="block text-sm font-semibold text-white mb-3">Severity Level</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {severityLevels.map((level) => (
                      <button
                        key={level.id}
                        type="button"
                        onClick={() => setSelectedSeverity(level.id)}
                        className={`p-3 rounded-xl border transition-all text-center ${
                          selectedSeverity === level.id
                            ? 'border-white/30 bg-white/10'
                            : 'border-white/10 hover:border-white/20 bg-white/5'
                        }`}
                      >
                        <div className={`text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r ${level.color} mb-1`}>
                          {level.label}
                        </div>
                        <div className="text-xs text-slate-400">{level.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Location */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-white mb-2">Location <span className="text-red-400">*</span></label>
                  <div className="relative mb-3">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                      type="text"
                      placeholder="Describe the location or area"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-red-500"
                      required
                    />
                  </div>
                  <div className="flex gap-3">
                    <div className="relative flex-1">
                      <Map className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="text"
                        placeholder="GPS coordinates (optional)"
                        value={coordinates}
                        onChange={(e) => setCoordinates(e.target.value)}
                        className="w-full pl-10 pr-20 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-red-500 text-sm"
                      />
                      <button
                        type="button"
                        onClick={handleGetCurrentLocation}
                        className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 rounded-lg bg-white/10 text-xs text-slate-300 hover:text-white hover:bg-white/20 transition-colors"
                      >
                        Get Location
                      </button>
                    </div>
                  </div>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">
                      <Clock className="w-4 h-4 inline mr-1" />
                      Date of Incident
                    </label>
                    <input
                      type="date"
                      value={incidentDate}
                      onChange={(e) => setIncidentDate(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">
                      <Clock className="w-4 h-4 inline mr-1" />
                      Time of Incident (approximate)
                    </label>
                    <input
                      type="time"
                      value={incidentTime}
                      onChange={(e) => setIncidentTime(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-white mb-2">Description <span className="text-red-400">*</span></label>
                  <textarea
                    placeholder="Describe the issue in detail: what happened, what is affected, any immediate risks to public safety or environment..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-red-500 resize-none"
                    required
                  />
                </div>

                {/* Photo Upload */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-white mb-2">
                    <Camera className="w-4 h-4 inline mr-1" />
                    Photo Evidence (Optional)
                  </label>
                  <div className="border-2 border-dashed border-white/10 rounded-xl p-6 text-center hover:border-red-500/30 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                    <p className="text-sm text-slate-400">Drag and drop photos or click to upload</p>
                    <p className="text-xs text-slate-500 mt-1">JPG, PNG, WEBP — max 10MB per file</p>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => e.target.files && setPhotos(Array.from(e.target.files))}
                    />
                  </div>
                  {photos.length > 0 && (
                    <div className="mt-2 text-sm text-emerald-400">{photos.length} file(s) selected</div>
                  )}
                </div>

                {/* Anonymous Toggle */}
                <div className="mb-6 p-4 rounded-xl bg-white/5 border border-white/10">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={anonymous}
                      onChange={(e) => setAnonymous(e.target.checked)}
                      className="w-4 h-4 rounded bg-slate-900 border-white/10 text-red-500 focus:ring-red-500"
                    />
                    <div>
                      <span className="text-sm font-medium text-white flex items-center gap-2">
                        <Eye className="w-4 h-4 text-slate-400" />
                        Submit Anonymously
                      </span>
                      <span className="text-xs text-slate-400 block mt-0.5">
                        Your identity will not be displayed publicly
                      </span>
                    </div>
                  </label>
                </div>

                {/* Contact (conditional) */}
                {!anonymous && (
                  <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-white mb-2">
                        <User className="w-4 h-4 inline mr-1" />
                        Your Name (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="How you'd like to be credited"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-white mb-2">
                        <Mail className="w-4 h-4 inline mr-1" />
                        Email (Optional)
                      </label>
                      <input
                        type="email"
                        placeholder="For follow-up on your report"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-red-500"
                      />
                    </div>
                  </div>
                )}

                <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-red-500 to-orange-600" disabled={!selectedType}>
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Submit Incident Report
                </Button>
              </form>
            </Card>

            {/* Related Links */}
            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              <Link href="/contribute" className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1">
                Other Contribution Paths <ArrowRight className="w-3 h-3" />
              </Link>
              <span className="text-slate-600">|</span>
              <Link href="/risk-monitoring/live-alerts-advisories" className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1">
                View Live Alerts <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <AdvancedFooter />
    </main>
  );
}
