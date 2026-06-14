'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Heading } from '@/components/common/Heading';
import { Select } from '@/components/ui/Select';
import {
  Footprints, Shield, Download, Lock, CheckCircle2, 
  ArrowLeft, User, Mail, Building, FileQuestion, Send, Globe, Map, FileText
} from 'lucide-react';
import { trailsObservationsData, trailsReportsData } from '@/data/trails-observations';
import { getCorridors, getSpeciesProfiles } from '@/data/protected-network';

function RequestFormContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const slug = searchParams.get('slug') || '';
  
  const trail = trailsObservationsData.find(t => t.trail_id === slug);
  const report = !trail ? trailsReportsData.find(r => r.slug === slug) : null;
  const corridor = !trail && !report ? getCorridors.bySlug(slug) : null;
  const species = !trail && !report && !corridor ? getSpeciesProfiles.bySlug(slug) : null;
  const isAtlas = slug === 'atlas';

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    organization: '',
    role: '',
    purpose: '',
    joinNetwork: true,
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [securedToken, setSecuredToken] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.fullName.trim()) errors.fullName = 'Full Name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!formData.organization.trim()) errors.organization = 'Institution/Organization is required';
    if (!formData.role) errors.role = 'Please select your academic/professional role';
    if (!formData.purpose.trim() || formData.purpose.trim().length < 15) {
      errors.purpose = 'Please provide a clear justification (minimum 15 characters)';
    }
    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);

    // Simulate API call and token generation
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      const generatedToken = `KEW-GPX-${Math.random().toString(36).substring(2, 11).toUpperCase()}`;
      setSecuredToken(generatedToken);
      
      // Save credentials in local storage to bypass future checks
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('kew_member_registered', 'true');
        window.localStorage.setItem('kew_member_name', formData.fullName);
        window.localStorage.setItem('kew_member_email', formData.email);
        window.localStorage.setItem('kew_member_token', generatedToken);
      }
    }, 1500);
  };

  const triggerMockDownload = () => {
    if (trail) {
      alert(`Downloading requested GPX / GIS Track: "${trail.trail_name || 'Trail Route'}.gpx"`);
    } else if (report) {
      alert(`Downloading requested document: "${report.title || 'Academic Report'}.pdf"`);
    } else if (corridor) {
      alert(`Downloading requested GIS Layers for Corridor: "${corridor.name || 'Corridor Link'}.zip"`);
    } else if (species) {
      alert(`Downloading requested GIS Range Layers for Species: "${species.name || 'Species Profile'}.zip"`);
    } else if (isAtlas) {
      alert('Downloading requested Complete Protected Area Atlas GIS Dataset (KML/GeoJSON).zip');
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col justify-between">
      <div>
        <Heading
          title={<><span className="block whitespace-nowrap">Spatial Data</span><span className="block whitespace-nowrap bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">Verification</span></>}
          subtitle="Kashmir Trails and Observation Network spatial coordinates and GIS files are restricted. Unregistered users must register institutional credentials to download GPX/KML tracking data."
          icon={<Shield className="w-6 h-6 text-emerald-400" />}
          label="Verification Center"
          breadcrumbs={[
            { label: 'Trails & Sightings', href: '/protected-network/trails-and-sightings' },
            { label: 'Request GIS Access' }
          ]}
        />

        <div className="container mx-auto px-6 py-10 max-w-4xl">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-6 group text-left"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Trails & Sightings
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Trail info */}
            <div className="lg:col-span-5 space-y-6">
              <Card className="border border-white/10 bg-white/5 text-white p-6" padding="none">
                <h3 className="text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5" />
                  Requested Route
                </h3>
                
                {trail ? (
                  <div className="space-y-4">
                    <div className='flex flex-col'>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                        <Footprints className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-base text-white leading-tight">{trail.trail_name}</h4>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="info" size="sm">{trail.route_type}</Badge>
                  
                        </div>
                      </div>
                    </div>
                    <Badge variant="default" size="sm">{trail.estimated_length_km} km</Badge>
                    </div>
                    
                    <p className="text-xs text-slate-400 leading-relaxed pt-2 border-t border-white/5">
                      {trail.field_intelligence || 'Detailed field assessment logs and route elevation profiles.'}
                    </p>

                    <div className="text-[11px] text-slate-500 space-y-1">
                      <div>District/Region: <strong className="text-slate-300">{trail.district_or_region}</strong></div>
                      <div>Difficulty: <strong className="text-slate-300">{trail.difficulty}</strong></div>
                      <div>Altitude: <strong className="text-slate-300">{trail.elevation_min_m}m - {trail.elevation_max_m}m</strong></div>
                      <div>Sensitivity: <strong className="text-slate-300">{trail.habitat_sensitivity}</strong></div>
                    </div>
                  </div>
                ) : report ? (
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                        <FileText className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-base text-white leading-tight">{report.title}</h4>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="info" size="sm">{report.type}</Badge>
                          <Badge variant="default" size="sm">{report.year}</Badge>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-xs text-slate-400 leading-relaxed pt-2 border-t border-white/5">
                      {report.description}
                    </p>

                    <div className="text-[11px] text-slate-500 space-y-1">
                      <div>Authors: <strong className="text-slate-300">{report.authors.join(', ')}</strong></div>
                      {report.linkedAreas.length > 0 && (
                        <div>Focus: <strong className="text-slate-300 capitalize">{report.linkedAreas[0].replace(/-/g, ' ')}</strong></div>
                      )}
                    </div>
                  </div>
                ) : corridor ? (
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                        <Map className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-base text-white leading-tight">{corridor.name}</h4>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="info" size="sm">Wildlife Corridor</Badge>
                          <Badge variant="default" size="sm">{corridor.priority} Priority</Badge>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-xs text-slate-400 leading-relaxed pt-2 border-t border-white/5">
                      {corridor.description}
                    </p>

                    <div className="text-[11px] text-slate-500 space-y-1">
                      <div>Status: <strong className="text-slate-300">{corridor.status}</strong></div>
                      <div>Primary Source: <strong className="text-slate-300">{corridor.source_primary || 'J&K Wildlife Department'}</strong></div>
                      <div>Priority Score: <strong className="text-slate-300">{corridor.restorationPriorityScore || 75}</strong></div>
                    </div>
                  </div>
                ) : species ? (
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                        <Shield className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-base text-white leading-tight">{species.name}</h4>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="info" size="sm">{species.scientificName}</Badge>
                          <Badge variant="default" size="sm">{species.conservationStatus}</Badge>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-xs text-slate-400 leading-relaxed pt-2 border-t border-white/5">
                      {species.description}
                    </p>

                    <div className="text-[11px] text-slate-500 space-y-1">
                      <div>Status: <strong className="text-slate-300">{species.conservationStatus}</strong></div>
                      <div>Distribution: <strong className="text-slate-300">{species.distribution}</strong></div>
                    </div>
                  </div>
                ) : isAtlas ? (
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                        <Globe className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-base text-white leading-tight">Protected Area Atlas GIS Layer</h4>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="info" size="sm">GIS Dataset</Badge>
                          <Badge variant="default" size="sm">All Layers</Badge>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-xs text-slate-400 leading-relaxed pt-2 border-t border-white/5">
                      Complete geospatial vector dataset of the Kashmir Protected Area Network including National Parks, Wildlife Sanctuaries, Wetlands, and Corridors.
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <FileQuestion className="w-10 h-10 text-slate-500 mx-auto mb-2" />
                    <p className="text-sm text-slate-400">No specific trail or document requested.</p>
                    <p className="text-xs text-slate-500 mt-1">Registering will grant you global access keys to all GPX and GIS tracks in the directory.</p>
                  </div>
                )}
              </Card>

              <Card className="border border-white/10 bg-slate-900/40 p-5" padding="none">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">GIS & Route Usage Agreement</h4>
                <ul className="text-[11px] text-slate-400 space-y-2 list-disc pl-4">
                  <li>GPX paths are restricted to scientific field surveys and official patrol planning.</li>
                  <li>Do not publish raw GPS tracks of sensitive habitats (e.g. Hangul breeding grounds) to public hiking platforms.</li>
                  <li>Users are requested to report trail condition changes or species sightings to the platform.</li>
                </ul>
              </Card>
            </div>

            {/* Right: Registration/Request Module */}
            <div className="lg:col-span-7">
              <Card className="border border-white/10 bg-white/5 text-white p-6 md:p-8" padding="none">
                {submitSuccess ? (
                  <div className="text-center py-8 space-y-6">
                    <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto scale-110">
                      <CheckCircle2 className="w-10 h-10 animate-pulse" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">GIS Clearance Approved</h3>
                      <p className="text-slate-400 text-sm mt-2 max-w-sm mx-auto">
                        Your credentials have been verified. You now have immediate access to all spatial datasets.
                      </p>
                    </div>

                    <div className="bg-white/5 p-4 rounded-xl border border-white/5 max-w-md mx-auto space-y-2">
                      <span className="text-[10px] text-slate-500 uppercase tracking-widest block">SECURED DATA TOKEN</span>
                      <code className="text-sm font-mono text-emerald-400 font-bold block select-all bg-white/5 py-1 px-3 rounded">{securedToken}</code>
                      <span className="text-[10px] text-slate-400 block">This credentials key has been linked to your browser session.</span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                      {(trail || report || corridor || species || isAtlas) && (
                        <Button 
                          onClick={triggerMockDownload}
                          className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium animate-bounce" 
                          icon={<Download className="w-4 h-4" />}
                        >
                          {trail ? 'Download GPX Map Route' : 
                           report ? 'Download Scientific Report' :
                           corridor ? 'Download GIS Corridor Layers' :
                           species ? 'Download GIS Species Layers' :
                           'Download Complete GIS Atlas'}
                        </Button>
                      )}
                      <Button 
                        variant="outline" 
                        className="border-white/20 text-white hover:bg-white/5"
                        onClick={() => router.push('/protected-network/trails-and-sightings')}
                      >
                        Return to Explorer
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">Researcher Credentials</h3>
                      <p className="text-xs text-slate-400 leading-normal">
                        Submit institutional credentials to unlock secure GIS GPX access streams instantly.
                      </p>
                    </div>

                    <div className="space-y-4">
                      {/* Full Name */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Full Name</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder="Dr. Fayaz Ahmad"
                            className={`w-full pl-9 pr-4 py-2.5 text-sm rounded-lg bg-white/5 border ${formErrors.fullName ? 'border-red-500/50' : 'border-white/10'} text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 transition-colors`}
                          />
                        </div>
                        {formErrors.fullName && (
                          <span className="text-xs text-red-400 mt-1 block">{formErrors.fullName}</span>
                        )}
                      </div>

                      {/* Email Address */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Institutional Email Address</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="fayaz@uok.edu.in"
                            className={`w-full pl-9 pr-4 py-2.5 text-sm rounded-lg bg-white/5 border ${formErrors.email ? 'border-red-500/50' : 'border-white/10'} text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 transition-colors`}
                          />
                        </div>
                        {formErrors.email && (
                          <span className="text-xs text-red-400 mt-1 block">{formErrors.email}</span>
                        )}
                      </div>

                      {/* Organization & Role */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Institution / Organization</label>
                          <div className="relative">
                            <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                            <input
                              type="text"
                              name="organization"
                              value={formData.organization}
                              onChange={handleInputChange}
                              placeholder="University of Kashmir"
                              className={`w-full pl-9 pr-4 py-2.5 text-sm rounded-lg bg-white/5 border ${formErrors.organization ? 'border-red-500/50' : 'border-white/10'} text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 transition-colors`}
                            />
                          </div>
                          {formErrors.organization && (
                            <span className="text-xs text-red-400 mt-1 block">{formErrors.organization}</span>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Researcher Role</label>
                          <Select
                            value={formData.role}
                            onChange={(value) => handleInputChange({ target: { name: 'role', value } } as any)}
                            options={[
                              { value: '', label: 'Select Role...' },
                              { value: 'professor', label: 'University Professor / Researcher' },
                              { value: 'student', label: 'Graduate / Research Student' },
                              { value: 'gis_specialist', label: 'GIS Analyst / Specialist' },
                              { value: 'ngo', label: 'NGO Conservation Coordinator' },
                              { value: 'government', label: 'Government Official / Department Member' },
                              { value: 'other', label: 'Independent Ecologist' },
                            ]}
                          />
                          {formErrors.role && (
                            <span className="text-xs text-red-400 mt-1 block">{formErrors.role}</span>
                          )}
                        </div>
                      </div>

                      {/* Purpose */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Justification / Purpose of Access</label>
                        <textarea
                          name="purpose"
                          rows={3}
                          value={formData.purpose}
                          onChange={handleInputChange}
                          placeholder="Please describe how this GPX/GIS data will support your environmental research, zoning, or field analysis..."
                          className={`w-full px-3 py-2 text-sm rounded-lg bg-white/5 border ${formErrors.purpose ? 'border-red-500/50' : 'border-white/10'} text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 transition-colors resize-none`}
                        />
                        {formErrors.purpose && (
                          <span className="text-xs text-red-400 mt-1 block">{formErrors.purpose}</span>
                        )}
                      </div>

                      {/* Join network option */}
                      <div className="flex items-start gap-3 pt-2">
                        <input
                          type="checkbox"
                          id="joinNetwork"
                          name="joinNetwork"
                          checked={formData.joinNetwork}
                          onChange={handleCheckboxChange}
                          className="mt-1 h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 bg-white/5 accent-emerald-500"
                        />
                        <label htmlFor="joinNetwork" className="text-xs text-slate-400 leading-normal select-none">
                          <strong className="text-slate-300">Join Kashmir EcoWatch Academic Network</strong> as a verified member. This grants you instant key credentials to bypass registration forms on all future document downloads.
                        </label>
                      </div>
                    </div>

                    <div className="pt-4">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs md:text-sm font-semibold py-3"
                        icon={isSubmitting ? undefined : <Send className="w-2 h-2 md:w-4 md:h-4" />}
                      >
                        {isSubmitting ? 'Authenticating and Registering...' : 'Submit Credentials & Request Access'}
                      </Button>
                    </div>
                  </form>
                )}
              </Card>
            </div>
          </div>
        </div>
      </div>
       
    </main>
  );
}

export default function RequestPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white/5 flex items-center justify-center text-white">Loading Verification Center...</div>}>
      <RequestFormContent />
    </Suspense>
  );
}
