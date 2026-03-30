'use client';

import React from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Book, Search, FileText, Download, ArrowRight, Calendar, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const categories = [
  { name: 'Research Papers', count: 342, icon: FileText },
  { name: 'Field Guides', count: 47, icon: Book },
  { name: 'Technical Reports', count: 189, icon: FileText },
  { name: 'Policy Documents', count: 56, icon: FileText },
  { name: 'Datasets', count: 78, icon: Search },
  { name: 'Maps & GIS', count: 124, icon: Book },
];

const recentAdditions = [
  { id: 'lib-1', title: 'Biodiversity Assessment of Kashmir Valley 2024', type: 'Research Paper', author: 'Dr. Kumar et al.', year: 2024, downloads: 234 },
  { id: 'lib-2', title: 'Wetland Conservation Manual', type: 'Field Guide', author: 'Wildlife Dept', year: 2023, downloads: 189 },
  { id: 'lib-3', title: 'Climate Change Impact Study - Jhelum Basin', type: 'Technical Report', author: 'MoEFCC', year: 2023, downloads: 421 },
  { id: 'lib-4', title: 'Protected Area Management Plans', type: 'Policy Document', author: 'J&K Forest Dept', year: 2024, downloads: 156 },
];

export default function ResearchLibraryPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />

      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/50 via-purple-950/30 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-2xl">
                <Book className="w-8 h-8 text-white" />
              </div>
              <Badge variant="info" size="lg">Scientific Resources</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Research <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Library</span>
            </h1>

            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-3xl">
              Comprehensive collection of research papers, field guides, technical reports,
              and policy documents supporting environmental conservation in Kashmir
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Button size="lg" className="bg-gradient-to-r from-indigo-500 to-purple-600" icon={<Search className="w-5 h-5" />}>
                Search Library
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white">
                Browse Collections
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Browse by Category</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, i) => (
              <motion.div key={cat.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Card className="glass-intense border-white/10 p-5 text-center cursor-pointer hover:border-indigo-500/30 transition-all">
                  <cat.icon className="w-8 h-8 text-indigo-400 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-white mb-1">{cat.count}</div>
                  <div className="text-sm text-slate-400">{cat.name}</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Recent Additions</h2>
              <p className="text-slate-400">Latest resources added to the library</p>
            </div>
            <Button variant="outline" className="border-white/20 text-white" icon={<ArrowRight className="w-4 h-4" />}>
              View All
            </Button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentAdditions.map((item, i) => (
              <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Card className="glass-intense border-white/10 p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-6 h-6 text-indigo-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base font-bold text-white mb-1">{item.title}</h3>
                      <div className="text-sm text-slate-400 mb-2">{item.author} • {item.year}</div>
                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <Badge variant="outline" size="sm">{item.type}</Badge>
                        <span className="flex items-center gap-1"><Download className="w-3 h-3" />{item.downloads}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AdvancedFooter />
    </main>
  );
}
