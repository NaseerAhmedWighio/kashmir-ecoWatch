'use client';

import React, { useState } from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import {
  Eye, ArrowRight, MapPin, Calendar, Clock, Filter,
  Search, Camera, User, CheckCircle, AlertCircle, Users
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { sightingIntelligenceData, SightingIntelligence, VerificationStatus, TaxonomicGroup, KashmirDistrict } from '@/data/trails-sightings';

const verificationStatusColors: Record<VerificationStatus, string> = {
  verified: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  reviewed: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  community: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  pending: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
};

const taxonomicGroupIcons: Record<TaxonomicGroup, React.ComponentType<{ className?: string }>> = {
  mammals: require('lucide-react').Mountain,
  birds: require('lucide-react').Bird,
  fish: require('lucide-react').Fish,
  plants: require('lucide-react').Sprout,
  'medicinal-plants': require('lucide-react').Flower2,
  amphibians: require('lucide-react').Droplet,
  reptiles: require('lucide-react').Shell,
};

export default function WildlifeSightingsPage() {
  const router = useRouter();
  const [filterStatus, setFilterStatus] = useState<VerificationStatus | 'all'>('all');
  const [filterTaxon, setFilterTaxon] = useState<TaxonomicGroup | 'all'>('all');
  const [filterDistrict, setFilterDistrict] = useState<KashmirDistrict | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter sightings (mammals + birds primarily, but show all)
  const filteredSightings = sightingIntelligenceData.filter(s => {
    if (filterStatus !== 'all' && s.verificationStatus !== filterStatus) return false;
    if (filterTaxon !== 'all' && s.taxonomicGroup !== filterTaxon) return false;
    if (filterDistrict !== 'all' && s.district !== filterDistrict) return false;
    if (searchQuery && !s.speciesName.toLowerCase().includes(searchQuery.toLowerCase()) && !s.location.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  // Aggregation stats
  const totalCount = sightingIntelligenceData.length;
  const verifiedCount = sightingIntelligenceData.filter(s => s.verificationStatus === 'verified').length;
  const reviewedCount = sightingIntelligenceData.filter(s => s.verificationStatus === 'reviewed').length;
  const communityCount = sightingIntelligenceData.filter(s => s.verificationStatus === 'community').length;
  const pendingCount = sightingIntelligenceData.filter(s => s.verificationStatus === 'pending').length;

  const districts: KashmirDistrict[] = ['Srinagar', 'Anantnag', 'Kulgam', 'Pulwama', 'Shopian', 'Budgam', 'Baramulla', 'Kupwara', 'Ganderbal', 'Bandipora', 'Kishtwar', 'Doda', 'Ramban', 'Rajouri', 'Poonch', 'Kathua'];
  const taxa: TaxonomicGroup[] = ['mammals', 'birds', 'fish', 'plants', 'medicinal-plants', 'amphibians', 'reptiles'];

  return (
    <main className="min-h-screen bg-slate-950">{/* Hero */}
      <div className="relative pt-20 md:pt-32 pb-12 md:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-sky-900/10 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <Eye className="w-6 h-6 text-emerald-400" />
              <span className="text-sm font-semibold uppercase tracking-widest text-slate-400">
                Biodiversity Intelligence
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
              Wildlife Sightings
            </h1>
            <p className="text-lg text-slate-400 mb-6">
              Verified and community-submitted wildlife observations across Kashmir.
              Submit your sightings to contribute to Kashmir's biodiversity database.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-600 to-emerald-500"
                icon={<Eye className="w-5 h-5" />}
                onClick={() => router.push('/submit-sighting')}
              >
                Submit a Sighting
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white"
                icon={<MapPin className="w-5 h-5" />}
              >
                View on Map
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="container mx-auto px-6 -mt-6 relative z-20">
        <Card className="glass-intense border-white/10 p-5" padding="none">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { label: 'Total Sightings', value: totalCount, icon: Eye, color: 'text-white' },
              { label: 'Verified', value: verifiedCount, icon: CheckCircle, color: 'text-emerald-400' },
              { label: 'Reviewed', value: reviewedCount, icon: CheckCircle, color: 'text-blue-400' },
              { label: 'Community', value: communityCount, icon: Users, color: 'text-amber-400' },
              { label: 'Pending', value: pendingCount, icon: AlertCircle, color: 'text-slate-400' },
            ].map((stat, idx) => (
              <div key={idx} className="text-center p-3 border-r border-white/5 last:border-r-0">
                <stat.icon className={`w-5 h-5 ${stat.color} mx-auto mb-1`} />
                <div className="text-xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-6 py-8">
        <Card className="border border-white/10 bg-slate-900/50 mb-8" padding="md">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search species or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm rounded-lg bg-slate-800/50 border border-white/10 text-white placeholder:text-slate-500 focus:border-emerald-500/50 outline-none"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as VerificationStatus | 'all')}
              className="px-3 py-2 text-sm rounded-lg bg-slate-800/50 border border-white/10 text-white focus:border-emerald-500/50 outline-none"
            >
              <option value="all">All Status</option>
              <option value="verified">Verified</option>
              <option value="reviewed">Reviewed</option>
              <option value="community">Community</option>
              <option value="pending">Pending</option>
            </select>
            <select
              value={filterTaxon}
              onChange={(e) => setFilterTaxon(e.target.value as TaxonomicGroup | 'all')}
              className="px-3 py-2 text-sm rounded-lg bg-slate-800/50 border border-white/10 text-white focus:border-emerald-500/50 outline-none"
            >
              <option value="all">All Taxa</option>
              {taxa.map(t => <option key={t} value={t}>{t.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</option>)}
            </select>
            <select
              value={filterDistrict}
              onChange={(e) => setFilterDistrict(e.target.value as KashmirDistrict | 'all')}
              className="px-3 py-2 text-sm rounded-lg bg-slate-800/50 border border-white/10 text-white focus:border-emerald-500/50 outline-none"
            >
              <option value="all">All Districts</option>
              {districts.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
        </Card>

        {/* Sightings List */}
        <div className="space-y-4">
          {filteredSightings.map((sighting, index) => {
            const IconComponent = taxonomicGroupIcons[sighting.taxonomicGroup] || Eye;
            return (
              <motion.div
                key={sighting.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
              >
                <Card className="border border-white/10 bg-slate-900/30 hover:bg-slate-900/50 transition-colors" padding="md">
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    {/* Icon & Status */}
                    <div className="flex items-start gap-3 md:w-48 shrink-0">
                      <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-emerald-400" />
                      </div>
                      <Badge className={`text-xs border ${verificationStatusColors[sighting.verificationStatus]}`}>
                        {sighting.verificationStatus}
                      </Badge>
                    </div>

                    {/* Main Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white mb-1">{sighting.speciesName}</h3>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400 mb-2">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {sighting.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {sighting.district}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {new Date(sighting.observationDate).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1 capitalize">
                          <Clock className="w-3 h-3" /> {sighting.season}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2 text-xs">
                        <Badge variant="default" className="bg-slate-700/50 text-slate-300 capitalize">
                          {sighting.habitat.replace('-', ' ')}
                        </Badge>
                        <Badge variant="default" className="bg-slate-700/50 text-slate-300">
                          {sighting.altitude.value}m
                        </Badge>
                        {sighting.hasPhoto && (
                          <Badge variant="default" className="bg-blue-500/20 text-blue-300 flex items-center gap-1">
                            <Camera className="w-3 h-3" /> {sighting.photoCount || 1} photo(s)
                          </Badge>
                        )}
                        <Badge variant="default" className="bg-slate-700/50 text-slate-300 capitalize">
                          {sighting.observerType.replace('-', ' ')}
                        </Badge>
                      </div>
                      {sighting.notes && (
                        <p className="text-xs text-slate-500 mt-2 line-clamp-2">{sighting.notes}</p>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {filteredSightings.length === 0 && (
          <Card className="border border-white/10 bg-slate-900/30 text-center py-12" padding="md">
            <Eye className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">No sightings found</h3>
            <p className="text-sm text-slate-400">Try adjusting your filters or submit a new sighting.</p>
          </Card>
        )}
      </div>

      <AdvancedFooter />
    </main>
  );
}
