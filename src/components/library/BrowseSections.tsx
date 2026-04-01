'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { browseByDistrict, browseByModule, browseByCategory, EvidenceCategory } from '@/data/evidence-intelligence';
import { MapPin, Layers, FileText, Database, Scroll, FlaskConical, Map, Compass, BookOpen, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const categoryIcons: Record<string, React.ElementType> = {
  research: BookOpen,
  reports: FileText,
  datasets: Database,
  policy: Scroll,
  methods: FlaskConical,
  maps: Map,
  guides: Compass,
};

interface BrowseSectionsProps {
  onCategoryClick?: (category: string) => void;
  onDistrictClick?: (districtId: string) => void;
  onModuleClick?: (moduleId: string) => void;
}

export function BrowseByCategory({ onCategoryClick }: { onCategoryClick?: (category: string) => void }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {browseByCategory.map((cat, i) => {
        const Icon = categoryIcons[cat.id] || FileText;
        return (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card 
              className="glass-intense border-white/10 p-5 text-center cursor-pointer hover:border-indigo-500/30 transition-all group"
              onClick={() => onCategoryClick?.(cat.id)}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <Icon className="w-6 h-6 text-indigo-400" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">{cat.count}</div>
              <div className="text-sm text-slate-400 mb-1">{cat.name}</div>
              {cat.description && (
                <div className="text-xs text-slate-500 line-clamp-2">{cat.description}</div>
              )}
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}

export function BrowseByDistrict({ onDistrictClick }: { onDistrictClick?: (districtId: string) => void }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
      {browseByDistrict.map((district, i) => (
        <motion.div
          key={district.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.03 }}
        >
          <Card 
            className="glass-intense border-white/10 p-4 text-center cursor-pointer hover:border-emerald-500/30 transition-all group"
            onClick={() => onDistrictClick?.(district.id)}
          >
            <MapPin className="w-5 h-5 text-emerald-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <div className="text-sm font-semibold text-white mb-1">{district.name}</div>
            <Badge variant="outline" size="sm" className="text-xs">
              {district.count} items
            </Badge>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

export function BrowseByModule({ onModuleClick }: { onModuleClick?: (moduleId: string) => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {browseByModule.map((module, i) => (
        <motion.div
          key={module.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
        >
          <Card 
            className="glass-intense border-white/10 p-5 cursor-pointer hover:border-purple-500/30 transition-all group h-full"
            onClick={() => onModuleClick?.(module.id)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Layers className="w-5 h-5 text-purple-400" />
              </div>
              <Badge variant="secondary" size="sm">{module.count}</Badge>
            </div>
            <h3 className="text-base font-bold text-white mb-1 group-hover:text-purple-400 transition-colors">{module.name}</h3>
            <div className="flex items-center justify-between mt-4">
              <span className="text-xs text-slate-500">Evidence linked</span>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

export function BrowseSections({ onCategoryClick, onDistrictClick, onModuleClick }: BrowseSectionsProps) {
  return (
    <div className="space-y-12">
      {/* Browse by Category */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Browse by Evidence Type</h2>
            <p className="text-sm text-slate-400">Explore resources by content format</p>
          </div>
        </div>
        <BrowseByCategory onCategoryClick={onCategoryClick} />
      </section>

      {/* Browse by Module */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Browse by Module</h2>
            <p className="text-sm text-slate-400">Evidence used across platform modules</p>
          </div>
          <Button variant="ghost" size="sm" className="text-indigo-400">
            View All Modules
          </Button>
        </div>
        <BrowseByModule onModuleClick={onModuleClick} />
      </section>

      {/* Browse by District */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Browse by District</h2>
            <p className="text-sm text-slate-400">Geographically filtered evidence</p>
          </div>
          <Button variant="ghost" size="sm" className="text-indigo-400">
            View All Districts
          </Button>
        </div>
        <BrowseByDistrict onDistrictClick={onDistrictClick} />
      </section>
    </div>
  );
}
