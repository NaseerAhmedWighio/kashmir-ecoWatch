'use client';

import React from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  BookOpen, FileText, Search, ArrowRight, ExternalLink,
  Book, Scroll, BarChart3, Download, Layers, Map,
  Shield, Leaf, Droplet, Mountain, Eye, Calendar, Users
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const librarySections = [
  {
    id: 'environmental-impact-assessment',
    title: 'Environmental Impact Assessments',
    description: 'Comprehensive EIAs covering water resources, soil degradation, forest degradation, wetland threats, biodiversity erosion, and socio-economic impact across Jammu & Kashmir',
    icon: FileText,
    color: 'from-amber-500 to-orange-600',
    route: '/research-library/environmental-impact-assessment',
    documentCount: 1,
    status: 'Live' as const,
  },
  {
    id: 'reports',
    title: 'Research Reports',
    description: 'In-depth research reports, technical documents, and scientific publications on Kashmir ecology, biodiversity, climate change, and environmental monitoring',
    icon: Book,
    color: 'from-blue-500 to-cyan-600',
    route: '/research-library/reports',
    documentCount: 12,
    status: 'Live' as const,
  },
];

const researchTopics = [
  { icon: Droplet, label: 'Water Resources', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { icon: Mountain, label: 'Soil Degradation', color: 'text-amber-400', bg: 'bg-amber-500/10' },
  { icon: Leaf, label: 'Forest Ecology', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { icon: Shield, label: 'Biodiversity', color: 'text-purple-400', bg: 'bg-purple-500/10' },
  { icon: Map, label: 'Climate Change', color: 'text-red-400', bg: 'bg-red-500/10' },
  { icon: Users, label: 'Socio-Economic', color: 'text-pink-400', bg: 'bg-pink-500/10' },
];

export default function ResearchLibraryPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-950">
      <div className="relative pt-20 md:pt-48 pb-16 overflow-hidden">
        
        <div className="absolute inset-0 bg-[#160C27]" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-6 h-6 text-violet-400" />
              <span className="text-sm font-semibold uppercase tracking-widest text-slate-400">
                Scientific Research
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
              Research Library
            </h1>
            <p className="text-xl text-slate-400 mb-8 leading-relaxed">
              Environmental impact assessments, research reports, and scientific publications 
              documenting Kashmir&apos;s ecological systems and environmental challenges
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-violet-600 to-purple-500"
                icon={<BookOpen className="w-5 h-5" />}
                onClick={() => router.push('/library')}
              >
                Browse Evidence Library
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white"
                icon={<Download className="w-5 h-5" />}
              >
                Download Reports
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 -mt-8 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass-intense border-white/10 p-6" padding="none">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-4">
              {[
                { label: 'Research Documents', value: '13', icon: FileText },
                { label: 'Environmental EIAs', value: '1', icon: Scroll },
                { label: 'Research Topics', value: '6', icon: Book },
                { label: 'Data Sources', value: '24', icon: Layers },
              ].map((metric, idx) => (
                <div key={idx} className="text-center p-3">
                  <metric.icon className="w-5 h-5 text-slate-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white tabular-nums">{metric.value}</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">{metric.label}</div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-white mb-8">Library Collections</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {librarySections.map((section, idx) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx }}
              >
                <Card
                  className="glass border-white/10 p-6 h-full hover:border-white/20 transition-all duration-300 group cursor-pointer"
                  onClick={() => router.push(section.route)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${section.color}`}>
                      <section.icon className="w-6 h-6 text-white" />
                    </div>
                    <Badge variant={section.status === 'Live' ? 'success' : 'warning'} size="sm">
                      {section.status}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{section.title}</h3>
                  <p className="text-sm text-slate-400 mb-4">{section.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">
                      {section.documentCount} document{section.documentCount !== 1 ? 's' : ''}
                    </span>
                    <span className="flex items-center text-sm text-violet-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      Browse <ArrowRight className="w-4 h-4 ml-1" />
                    </span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="container mx-auto px-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="glass border-white/10 p-6">
            <h2 className="text-xl font-bold text-white mb-2">Research Topics</h2>
            <p className="text-sm text-slate-400 mb-6">Key research domains covered in the library</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {researchTopics.map((topic) => (
                <div key={topic.label} className={`${topic.bg} rounded-xl p-4 text-center border border-white/5`}>
                  <topic.icon className={`w-6 h-6 ${topic.color} mx-auto mb-2`} />
                  <span className="text-sm text-slate-300">{topic.label}</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      <AdvancedFooter />
    </main>
  );
}
