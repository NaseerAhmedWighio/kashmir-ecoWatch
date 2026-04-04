'use client';

import React, { useState, useRef } from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { 
  Camera, MapPin, Calendar, Eye, ArrowRight, CheckCircle, 
  Users, Target, Binoculars, Leaf, Map, Shield, Route, 
  Layers, Search, TrendingUp, FileCheck, Database, Upload
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const speciesCategories = [
  { id: 'mammal', label: 'Mammal', icon: '🦌' },
  { id: 'bird', label: 'Bird', icon: '🦅' },
  { id: 'reptile', label: 'Reptile/Amphibian', icon: '🦎' },
  { id: 'fish', label: 'Fish', icon: '🐟' },
  { id: 'plant', label: 'Plant', icon: '🌿' },
  { id: 'other', label: 'Other', icon: '🔍' },
];

const habitatTypes = [
  { id: 'forest', label: 'Forest' },
  { id: 'wetland', label: 'Wetland' },
  { id: 'grassland', label: 'Grassland' },
  { id: 'alpine', label: 'Alpine/Meadow' },
  { id: 'river-stream', label: 'River/Stream' },
  { id: 'lake-pond', label: 'Lake/Pond' },
  { id: 'agricultural', label: 'Agricultural' },
  { id: 'urban', label: 'Urban/Suburban' },
  { id: 'other', label: 'Other' },
];

const confidenceLevels = [
  { id: 'certain', label: 'Certain', description: 'Confident in species identification', color: 'from-emerald-500 to-teal-500' },
  { id: 'probable', label: 'Probable', description: 'Likely correct, minor uncertainty', color: 'from-blue-500 to-cyan-500' },
  { id: 'possible', label: 'Possible', description: 'Some uncertainty, needs verification', color: 'from-amber-500 to-orange-500' },
  { id: 'uncertain', label: 'Uncertain', description: 'Low confidence, expert review needed', color: 'from-red-500 to-pink-500' },
];

const observationMethods = [
  { id: 'direct', label: 'Direct Observation' },
  { id: 'heard', label: 'Heard (Call/Sound)' },
  { id: 'photographed', label: 'Photographed' },
  { id: 'tracks', label: 'Tracks/Signs' },
  { id: 'inferred', label: 'Inferred Evidence' },
];

const workflowSteps = [
  { icon: FileCheck, label: 'Received', description: 'Observation logged and acknowledged', color: 'text-blue-400' },
  { icon: Search, label: 'Under Review', description: 'Initial screening and classification', color: 'text-amber-400' },
  { icon: Layers, label: 'Context Checked', description: 'Cross-referenced with existing records', color: 'text-purple-400' },
  { icon: Eye, label: 'Expert Review', description: 'Species expert verification where needed', color: 'text-orange-400' },
  { icon: Database, label: 'Published', description: 'Added to biodiversity records', color: 'text-emerald-400' },
];

// Helper to generate sighting reference ID
function generateSightingId(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const random = Math.floor(Math.random() * 9000 + 1000);
  return `SIGHT-${year}${month}${day}-${random}`;
}

export default function SubmitSightingPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Form state
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [speciesName, setSpeciesName] = useState('');
  const [dateObserved, setDateObserved] = useState('');
  const [locationText, setLocationText] = useState('');
  const [coordinates, setCoordinates] = useState('');
  const [locationPrecision, setLocationPrecision] = useState<'exact' | 'approximate'>('exact');
  const [description, setDescription] = useState('');
  const [countObserved, setCountObserved] = useState('');
  const [confidence, setConfidence] = useState<string>('probable');
  const [behaviorObserved, setBehaviorObserved] = useState('');
  const [habitatType, setHabitatType] = useState<string>('');
  const [observationMethod, setObservationMethod] = useState<string>('direct');
  const [photos, setPhotos] = useState<File[]>([]);
  const [contributorName, setContributorName] = useState('');
  const [contributorEmail, setContributorEmail] = useState('');
  
  // Submission state
  const [submitted, setSubmitted] = useState(false);
  const [sightingId, setSightingId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCategory || !speciesName || !dateObserved || !locationText || !description) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Generate sighting reference ID
    const newSightingId = generateSightingId();
    setSightingId(newSightingId);
    
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
      <main className="min-h-screen bg-slate-950">
        <Navigation />
        <section className="relative pt-20 md:pt-48 pb-16 md:pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/50 to-slate-950" />
          <div className="container mx-auto px-6 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="max-w-3xl mx-auto"
            >
              <div className="text-center mb-8">
                <CheckCircle className="w-20 h-20 text-emerald-400 mx-auto mb-6" />
                <h1 className="text-4xl font-bold text-white mb-4">Sighting Received</h1>
                <p className="text-slate-400 text-lg">
                  Your observation has been logged and will be reviewed for inclusion in Kashmir's biodiversity records.
                </p>
              </div>

              {/* Sighting Reference Card */}
              <Card className="glass-intense border-white/10 p-6 mb-6">
                <div className="text-center">
                  <div className="text-sm text-slate-400 mb-2">Sighting Reference ID</div>
                  <div className="text-3xl font-mono font-bold text-white mb-4">{sightingId}</div>
                  <p className="text-sm text-slate-400">
                    Please save this reference for any follow-up inquiries.
                  </p>
                </div>
              </Card>

              {/* What Happens Next */}
              <Card className="glass-intense border-white/10 p-6 mb-8">
                <h3 className="text-lg font-bold text-white mb-4">What Happens Next</h3>
                <div className="space-y-3 mb-4">
                  {workflowSteps.map((step, idx) => (
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
                <p className="text-xs text-slate-500 mt-4">
                  Approved sightings may contribute to <span className="text-white font-medium">Biodiversity</span>, 
                  <span className="text-white font-medium"> Wildlife Sightings</span>, 
                  <span className="text-white font-medium"> District Biodiversity Profiles</span>, and related conservation intelligence layers.
                </p>
                <p className="text-xs text-slate-500 mt-2">
                  {contributorEmail && 'You may be contacted if additional information or clarification is needed.'}
                  Sensitive species locations may be generalized for public display.
                </p>
              </Card>

              <div className="flex flex-wrap gap-3 justify-center">
                <Button onClick={() => router.push('/submit-sighting')}>
                  Submit Another Sighting
                </Button>
                <Button variant="outline" className="border-white/20 text-white" onClick={() => router.push('/biodiversity/wildlife-sightings')}>
                  <Eye className="w-4 h-4 mr-2" />
                  View Wildlife Sightings
                </Button>
                <Button variant="outline" className="border-white/20 text-white" onClick={() => router.push('/biodiversity')}>
                  Explore Biodiversity Hub
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
    <main className="min-h-screen bg-slate-950">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-48 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/50 via-teal-950/30 to-slate-950" />
        <div className="absolute inset-0 bg-grid opacity-20" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl">
            <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
              <button onClick={() => router.push('/contribute')} className="hover:text-white transition-colors">Contribute</button>
              <span className="text-slate-600">/</span>
              <span className="text-white font-medium">Submit a Sighting</span>
            </nav>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-2xl">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <Badge variant="success" size="lg">Citizen Science</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Submit a <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Sighting</span>
            </h1>

            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-3xl">
              Contribute wildlife observations to build Kashmir's most comprehensive
              biodiversity database for conservation and research
            </p>
          </motion.div>
        </div>
      </section>

      {/* How Sightings Are Handled */}
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
                  <h2 className="text-lg font-bold text-white mb-2">How Sightings Are Handled</h2>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Sightings are screened, classified, and reviewed before being added to biodiversity records, 
                    species intelligence, district profiles, or related ecological workflows where appropriate.
                  </p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-white/10">
                <div className="flex items-start gap-2 text-sm text-slate-400">
                  <Route className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
                  <p>
                    Approved sightings may contribute to <span className="text-white font-medium">Biodiversity</span>, 
                    <span className="text-white font-medium"> Wildlife Sightings</span>, 
                    <span className="text-white font-medium"> District Biodiversity Profiles</span>, and related 
                    <span className="text-white font-medium"> conservation intelligence layers</span>.
                  </p>
                </div>
                <div className="flex items-start gap-2 text-sm text-slate-400 mt-3">
                  <Shield className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <p className="text-amber-300">
                    Sensitive species and vulnerable habitats may not be displayed with exact public location.
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
                {/* Species Category */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-white mb-3">Species Category <span className="text-red-400">*</span></label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                    {speciesCategories.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`p-3 rounded-xl border transition-all text-center ${
                          selectedCategory === cat.id
                            ? 'border-emerald-500 bg-emerald-500/10 ring-1 ring-emerald-500/30'
                            : 'border-white/10 hover:border-emerald-500/50 bg-white/5'
                        }`}
                      >
                        <div className="text-xl mb-1">{cat.icon}</div>
                        <div className="text-xs font-medium text-white">{cat.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Species Name */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-white mb-2">Species Name <span className="text-red-400">*</span></label>
                  <input
                    type="text"
                    placeholder="Common or scientific name"
                    value={speciesName}
                    onChange={(e) => setSpeciesName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>

                {/* Date & Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      Date Observed <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="date"
                      value={dateObserved}
                      onChange={(e) => setDateObserved(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-emerald-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">
                      <MapPin className="w-4 h-4 inline mr-1" />
                      Location <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="District or area"
                      value={locationText}
                      onChange={(e) => setLocationText(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                      required
                    />
                  </div>
                </div>

                {/* Coordinates & Location Precision */}
                <div className="mb-6 p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-start gap-3 mb-3">
                    <Map className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <label className="block text-sm font-semibold text-white mb-2">
                        GPS Coordinates (Optional)
                      </label>
                      <div className="flex gap-3">
                        <input
                          type="text"
                          placeholder="Latitude, Longitude"
                          value={coordinates}
                          onChange={(e) => setCoordinates(e.target.value)}
                          className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 text-sm"
                        />
                        <button
                          type="button"
                          onClick={handleGetCurrentLocation}
                          className="px-3 py-2 rounded-lg bg-white/10 text-xs text-slate-300 hover:text-white hover:bg-white/20 transition-colors whitespace-nowrap"
                        >
                          Get Location
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="locationPrecision"
                        value="exact"
                        checked={locationPrecision === 'exact'}
                        onChange={(e) => setLocationPrecision(e.target.value as 'exact' | 'approximate')}
                        className="w-4 h-4 rounded bg-slate-900 border-white/10 text-emerald-500 focus:ring-emerald-500"
                      />
                      <span className="text-xs text-white">Exact Location</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="locationPrecision"
                        value="approximate"
                        checked={locationPrecision === 'approximate'}
                        onChange={(e) => setLocationPrecision(e.target.value as 'exact' | 'approximate')}
                        className="w-4 h-4 rounded bg-slate-900 border-white/10 text-emerald-500 focus:ring-emerald-500"
                      />
                      <span className="text-xs text-white">Approximate Location</span>
                    </label>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    • Exact location preferred for accuracy • Approximate location accepted if unsure • Sensitive records may have generalized public coordinates
                  </p>
                </div>

                {/* Count & Observation Method */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">
                      <Users className="w-4 h-4 inline mr-1" />
                      Number Observed
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., 1, 2-3, flock of ~20"
                      value={countObserved}
                      onChange={(e) => setCountObserved(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">
                      <Binoculars className="w-4 h-4 inline mr-1" />
                      Observation Method
                    </label>
                    <select
                      value={observationMethod}
                      onChange={(e) => setObservationMethod(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-emerald-500"
                    >
                      {observationMethods.map((method) => (
                        <option key={method.id} value={method.id} className="bg-slate-800">{method.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Confidence Level */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-white mb-3">Confidence Level</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {confidenceLevels.map((level) => (
                      <button
                        key={level.id}
                        type="button"
                        onClick={() => setConfidence(level.id)}
                        className={`p-3 rounded-xl border transition-all text-center ${
                          confidence === level.id
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

                {/* Habitat Type */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-white mb-2">
                    <Leaf className="w-4 h-4 inline mr-1" />
                    Habitat Type
                  </label>
                  <select
                    value={habitatType}
                    onChange={(e) => setHabitatType(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="" className="bg-slate-800">Select habitat type (optional)</option>
                    {habitatTypes.map((habitat) => (
                      <option key={habitat.id} value={habitat.id} className="bg-slate-800">{habitat.label}</option>
                    ))}
                  </select>
                </div>

                {/* Behavior Observed */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-white mb-2">Behavior Observed</label>
                  <textarea
                    placeholder="Describe behavior, activity, or notable characteristics..."
                    rows={3}
                    value={behaviorObserved}
                    onChange={(e) => setBehaviorObserved(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 resize-none"
                  />
                </div>

                {/* Description */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-white mb-2">Description <span className="text-red-400">*</span></label>
                  <textarea
                    placeholder="Describe the sighting in detail: what you observed, environmental context, any immediate conservation concerns..."
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 resize-none"
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
                    className="border-2 border-dashed border-white/10 rounded-xl p-6 text-center hover:border-emerald-500/30 transition-colors cursor-pointer"
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
                    <p>• Clear, recent images help with species identification and review</p>
                    <p>• Photo evidence may support verification priority</p>
                    <p>• Some evidence may remain restricted or internal for sensitive species</p>
                  </div>
                </div>

                {/* Contributor Info */}
                <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">
                      Your Name (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="How you'd like to be credited"
                      value={contributorName}
                      onChange={(e) => setContributorName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">
                      Email (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="For follow-up if clarification needed"
                      value={contributorEmail}
                      onChange={(e) => setContributorEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-600" 
                  disabled={!selectedCategory || !speciesName || !dateObserved || !locationText || !description || isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Camera className="w-5 h-5 mr-2" />
                      Submit Sighting
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {workflowSteps.map((step, idx) => (
                  <div key={step.label} className="flex flex-col items-start gap-2">
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
              <Link href="/biodiversity" className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1">
                Explore Biodiversity Hub <ArrowRight className="w-3 h-3" />
              </Link>
              <span className="text-slate-600">|</span>
              <Link href="/biodiversity/wildlife-sightings" className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1">
                View Wildlife Sightings <ArrowRight className="w-3 h-3" />
              </Link>
              <span className="text-slate-600">|</span>
              <Link href="/contribute" className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1">
                Other Contribution Paths <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <AdvancedFooter />
    </main>
  );
}
