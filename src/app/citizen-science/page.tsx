'use client';

import React from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Users, Eye, Camera, Book, ArrowRight, Heart, Shield,
  CheckCircle, Award, MapPin, Calendar, TrendingUp, ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const programs = [
  {
    id: 'wildlife-monitoring',
    title: 'Wildlife Monitoring',
    description: 'Track and document wildlife populations, distributions, and behavioral patterns across Kashmir\'s ecosystems',
    icon: Eye,
    color: 'from-emerald-500 to-teal-600',
    volunteers: 234,
    activities: ['Species sighting documentation', 'Population trend tracking', 'Habitat condition assessment', 'Migration pattern recording'],
    cta: 'Start Monitoring',
  },
  {
    id: 'photo-documentation',
    title: 'Photo Documentation',
    description: 'Capture seasonal changes, species records, habitat conditions, and environmental changes through geotagged photography',
    icon: Camera,
    color: 'from-blue-500 to-indigo-600',
    volunteers: 189,
    activities: ['Seasonal landscape photography', 'Species photo records', 'Habitat change documentation', 'Wetland condition photos'],
    cta: 'Start Documenting',
  },
  {
    id: 'data-verification',
    title: 'Data Verification',
    description: 'Review and validate community-submitted observations, species records, and environmental data for accuracy',
    icon: CheckCircle,
    color: 'from-violet-500 to-purple-600',
    volunteers: 67,
    activities: ['Species identification review', 'Location accuracy verification', 'Evidence quality assessment', 'Duplicate flagging'],
    cta: 'Start Verifying',
  },
  {
    id: 'community-outreach',
    title: 'Community Outreach',
    description: 'Engage local communities in conservation awareness, environmental monitoring training, and citizen science programs',
    icon: Users,
    color: 'from-amber-500 to-orange-600',
    volunteers: 145,
    activities: ['Community workshops', 'School programs', 'Field training sessions', 'District participation drives'],
    cta: 'Join Outreach',
  },
];

const contributorBenefits = [
  { icon: Award, title: 'Recognition Tiers', description: 'Progress from Observer to Steward based on contribution volume and verification status' },
  { icon: MapPin, title: 'District Rankings', description: 'See your district\'s participation rank and compete in community conservation goals' },
  { icon: Calendar, title: 'Contribution History', description: 'Track all your submissions, verification status, and impact over time' },
  { icon: Shield, title: 'Verified Contributor Badge', description: 'Earn trust levels that give your submissions priority review and display status' },
];

const districtLeaders = [
  { district: 'Srinagar', contributors: 156, trend: 'increasing' },
  { district: 'Anantnag', contributors: 98, trend: 'increasing' },
  { district: 'Baramulla', contributors: 87, trend: 'stable' },
  { district: 'Pulwama', contributors: 72, trend: 'increasing' },
  { district: 'Kulgam', contributors: 54, trend: 'stable' },
  { district: 'Ganderbal', contributors: 48, trend: 'decreasing' },
];

export default function CitizenSciencePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-48 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/50 via-violet-950/30 to-slate-950" />
        <div className="absolute inset-0 bg-grid opacity-20" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl">
            <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
              <button onClick={() => router.push('/contribute')} className="hover:text-white transition-colors">Contribute</button>
              <span className="text-slate-600">/</span>
              <span className="text-white font-medium">Citizen Science</span>
            </nav>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-violet-600 flex items-center justify-center shadow-2xl">
                <Users className="w-8 h-8 text-white" />
              </div>
              <Badge variant="success" size="lg">Community Science Program</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Citizen <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-violet-400">Science</span>
            </h1>

            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-3xl">
              Join a growing community of 635+ citizen scientists contributing to Kashmir&apos;s
              environmental monitoring, data verification, and conservation efforts
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-teal-600" onClick={() => router.push('/submit-sighting')}>
                <Camera className="w-5 h-5 mr-2" />
                Start Contributing
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white" onClick={() => router.push('/contribute')}>
                Explore All Paths
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="text-center">
              <div className="text-4xl font-bold text-emerald-400 mb-2">635</div>
              <div className="text-sm text-slate-400">Active Volunteers</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }} className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">2,847</div>
              <div className="text-sm text-slate-400">Submissions Verified</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }} className="text-center">
              <div className="text-4xl font-bold text-amber-400 mb-2">20</div>
              <div className="text-sm text-slate-400">Districts Participating</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }} className="text-center">
              <div className="text-4xl font-bold text-violet-400 mb-2">4</div>
              <div className="text-sm text-slate-400">Active Programs</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Participation Programs</h2>
            <p className="text-slate-400">Choose a program matching your interests and expertise</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {programs.map((program, index) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="glass-intense border-white/10 hover:border-white/20 transition-all p-6 h-full group">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${program.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                      <program.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-lg font-bold text-white">{program.title}</h3>
                        <Badge variant="outline" size="sm" className="text-xs">{program.volunteers} volunteers</Badge>
                      </div>
                      <p className="text-sm text-slate-400">{program.description}</p>
                    </div>
                  </div>

                  <ul className="space-y-1.5 mb-4">
                    {program.activities.map((activity, i) => (
                      <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                        <span className="text-emerald-400 mt-1">•</span>
                        {activity}
                      </li>
                    ))}
                  </ul>

                  <Button
                    size="sm"
                    className={`w-full bg-gradient-to-r ${program.color} hover:opacity-90 text-white text-sm`}
                    onClick={() => router.push('/submit-sighting')}
                  >
                    <span>{program.cta}</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Contributor Benefits</h2>
            <p className="text-slate-400">What you gain from participating in the citizen science program</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contributorBenefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="glass-intense border-white/10 p-5 text-center">
                  <benefit.icon className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
                  <h3 className="text-sm font-bold text-white mb-2">{benefit.title}</h3>
                  <p className="text-xs text-slate-400">{benefit.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* District Rankings */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">District Participation Rankings</h2>
            <p className="text-slate-400">Top districts by active contributor count</p>
          </motion.div>

          <Card className="glass-intense border-white/10 p-6">
            <div className="space-y-4">
              {districtLeaders.map((item, index) => (
                <div key={item.district} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-slate-500 w-6 text-center">#{index + 1}</span>
                    <TrendingUp className={`w-4 h-4 ${
                      item.trend === 'increasing' ? 'text-emerald-400' :
                      item.trend === 'decreasing' ? 'text-red-400' : 'text-slate-400'
                    }`} />
                    <span className="text-sm font-medium text-white">{item.district}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-white">{item.contributors}</span>
                    <Badge
                      variant={item.trend === 'increasing' ? 'success' : item.trend === 'decreasing' ? 'danger' : 'info'}
                      size="sm"
                    >
                      {item.trend === 'increasing' ? '↑' : item.trend === 'decreasing' ? '↓' : '→'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <Card className="glass-intense border-white/10 overflow-hidden">
            <div className="relative p-8 sm:p-12 text-center">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 to-violet-600/20" />
              <div className="relative z-10">
                <Heart className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-white mb-4">Make a Difference</h2>
                <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
                  Your observations help build a comprehensive picture of Kashmir&apos;s environment
                  for better conservation decisions, policy-making, and public awareness
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-teal-600" onClick={() => router.push('/submit-sighting')}>
                    <Camera className="w-5 h-5 mr-2" />
                    Submit Your First Sighting
                  </Button>
                  <Button size="lg" variant="outline" className="border-white/20 text-white" onClick={() => router.push('/report-issue')}>
                    <ArrowRight className="w-5 h-5 mr-2" />
                    Report an Issue
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <AdvancedFooter />
    </main>
  );
}
