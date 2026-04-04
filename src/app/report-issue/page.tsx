'use client';

import React, { useState, useRef } from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  AlertTriangle, MapPin, FileText, Camera, ArrowRight, CheckCircle,
  Flame, Droplets, Leaf, Trash2, Building2, Waves, Cloud, Zap,
  Upload, Clock, Map, User, Mail, Eye, Shield, Route, Layers, Search,
  TrendingUp, Bell, FileCheck, Archive
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

const workflowSteps = [
  { icon: FileText, label: 'Received', description: 'Report logged and acknowledged', color: 'text-blue-400' },
  { icon: Search, label: 'Under Review', description: 'Initial screening and classification', color: 'text-amber-400' },
  { icon: Layers, label: 'Context Reviewed', description: 'Cross-referenced with existing data', color: 'text-purple-400' },
  { icon: TrendingUp, label: 'Escalated if Urgent', description: 'High-severity reports fast-tracked', color: 'text-orange-400' },
  { icon: Bell, label: 'Advisory Issued', description: 'Alert or field signal published', color: 'text-emerald-400' },
  { icon: Archive, label: 'Resolved', description: 'Incident archived with outcome', color: 'text-slate-400' },
];

// Helper to generate incident reference ID
function generateIncidentId(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const random = Math.floor(Math.random() * 9000 + 1000);
  return `KEI-${year}${month}${day}-${random}`;
}

export default function ReportIssuePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Form state
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedSeverity, setSelectedSeverity] = useState<string>('moderate');
  const [locationText, setLocationText] = useState('');
  const [coordinates, setCoordinates] = useState('');
  const [incidentDate, setIncidentDate] = useState('');
  const [incidentTime, setIncidentTime] = useState('');
  const [description, setDescription] = useState('');
  const [anonymous, setAnonymous] = useState(false);
  const [photos, setPhotos] = useState<File[]>([]);
  const [reporterName, setReporterName] = useState('');
  const [reporterEmail, setReporterEmail] = useState('');
  
  // Submission state
  const [submitted, setSubmitted] = useState(false);
  const [incidentId, setIncidentId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedType || !locationText || !description) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Generate incident reference ID
    const newIncidentId = generateIncidentId();
    setIncidentId(newIncidentId);
    
    // Simulate async submission (replace with actual API call when backend is ready)
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setSubmitted(true);
    setIsSubmitting(false);
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setCoordinates(`${pos.coords.latitude.toFixed(6)}, ${pos.coords.longitude.toFixed(6)}`),
        (error) => {
          // Silently fail - user can enter manually
          console.log('Geolocation failed:', error);
        }
      );
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhotos(Array.from(e.target.files));
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Success screen
  if (submitted) {
    return (
      <main className="min-h-screen bg-slate-950"><section className="relative pt-20 md:pt-48 pb-16 md:pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/50 to-slate-950" />
          <div className="container mx-auto px-6 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="max-w-3xl mx-auto"
            >
              <div className="text-center mb-8">
                <CheckCircle className="w-20 h-20 text-emerald-400 mx-auto mb-6" />
                <h1 className="text-4xl font-bold text-white mb-4">Incident Report Received</h1>
                <p className="text-slate-400 text-lg">
                  Your report has been successfully logged into the Kashmir Environmental Intelligence system.
                </p>
              </div>

              {/* Incident Reference Card */}
              <Card className="glass-intense border-white/10 p-6 mb-6">
                <div className="text-center">
                  <div className="text-sm text-slate-400 mb-2">Incident Reference ID</div>
                  <div className="text-3xl font-mono font-bold text-white mb-4">{incidentId}</div>
                  <p className="text-sm text-slate-400">
                    Please save this reference for any follow-up inquiries.
                  </p>
                </div>
              </Card>

              {/* What Happens Next */}
              <Card className="glass-intense border-white/10 p-6 mb-8">
                <h3 className="text-lg font-bold text-white mb-4">What Happens Next</h3>
                <div className="space-y-3 mb-4">
                  {workflowSteps.slice(0, 4).map((step, idx) => (
                    <div key={step.label} className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0`}>
                        <step.icon className={`w-4 h-4 ${step.color}`} />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-white">{step.label}</div>
                        <div className="text-xs text-slate-400">{step.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-500">
                  Reports are prioritized based on severity and potential public impact. 
                  {anonymous && reporterEmail ? ' You may be contacted if follow-up information is required.' : ''}
                </p>
              </Card>

              <div className="flex flex-wrap gap-3 justify-center">
                <Button onClick={() => router.push('/report-issue')}>
                  Submit Another Report
                </Button>
                <Button variant="outline" className="border-white/20 text-white" onClick={() => router.push('/risk-monitoring/live-alerts-advisories')}>
                  <Bell className="w-4 h-4 mr-2" />
                  View Live Alerts
                </Button>
                <Button variant="outline" className="border-white/20 text-white" onClick={() => router.push('/contribute')}>
                  Explore Other Contribution Paths
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
        <AdvancedFooter />
      </main>
    );
  }

  // Main form
  return (
    <main className="min-h-screen bg-slate-950">{/* Hero */}
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

      {/* How Reports Are Handled */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="glass-intense border-white/10 p-6">
              <div className="flex items-start gap-3 mb-4">
                <Shield className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-lg font-bold text-white mb-2">How Reports Are Handled</h2>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Incident reports are screened, classified, and routed to the relevant thematic and district workflows. 
                    High-severity reports may be prioritized for rapid review, alert handling, or field follow-up.
                  </p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-white/10">
                <div className="flex items-start gap-2 text-sm text-slate-400">
                  <Route className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
                  <p>
                    Reports may be routed to <span className="text-white font-medium">Biodiversity</span>, 
                    <span className="text-white font-medium"> Water Systems</span>, 
                    <span className="text-white font-medium"> Environmental Monitoring</span>, 
                    <span className="text-white font-medium"> Air & Noise Monitoring</span>, or 
                    <span className="text-white font-medium"> Risk & Monitoring</span> depending on issue type and severity.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Form */}
      <section className="py-8 md:py-12">
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
                      value={locationText}
                      onChange={(e) => setLocationText(e.target.value)}
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
                  <div className="mt-2 text-xs text-slate-500 space-y-1">
                    <p>• Exact location preferred where safe and accessible</p>
                    <p>• Approximate location accepted if exact point is unknown</p>
                    <p>• District and nearest landmark may help with routing</p>
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
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
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
                  <div 
                    onClick={triggerFileInput}
                    className="border-2 border-dashed border-white/10 rounded-xl p-6 text-center hover:border-red-500/30 transition-colors cursor-pointer"
                  >
                    <Upload className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                    <p className="text-sm text-slate-400">Drag and drop photos or click to upload</p>
                    <p className="text-xs text-slate-500 mt-1">JPG, PNG, WEBP — max 10MB per file</p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={handlePhotoUpload}
                    />
                  </div>
                  {photos.length > 0 && (
                    <div className="mt-2 text-sm text-emerald-400">{photos.length} file(s) selected</div>
                  )}
                  <div className="mt-2 text-xs text-slate-500 space-y-1">
                    <p>• Upload clear, recent images where available</p>
                    <p>• Evidence may support review priority and contextual assessment</p>
                    <p>• Sensitive media may not be shown publicly</p>
                  </div>
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
                  <div className="mt-3 pt-3 border-t border-white/10 text-xs text-slate-500 space-y-1">
                    <p>• Reports may still be reviewed internally regardless of anonymity</p>
                    <p>• Not all reports become public alerts</p>
                    <p>• Sensitive reports may remain restricted to authorized personnel</p>
                  </div>
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
                        value={reporterName}
                        onChange={(e) => setReporterName(e.target.value)}
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
                        value={reporterEmail}
                        onChange={(e) => setReporterEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-red-500"
                      />
                    </div>
                  </div>
                )}

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-red-500 to-orange-600" 
                  disabled={!selectedType || !locationText || !description || isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-5 h-5 mr-2" />
                      Submit Incident Report
                    </>
                  )}
                </Button>
              </form>
            </Card>

            {/* What Happens Next */}
            <Card className="glass-intense border-white/10 p-6 mt-6">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-emerald-400" />
                What Happens After Submission
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {workflowSteps.map((step, idx) => (
                  <div key={step.label} className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0`}>
                      <step.icon className={`w-5 h-5 ${step.color}`} />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{step.label}</div>
                      <div className="text-xs text-slate-400">{step.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Related Links */}
            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              <Link href="/contribute" className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1">
                Explore Other Contribution Paths <ArrowRight className="w-3 h-3" />
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
