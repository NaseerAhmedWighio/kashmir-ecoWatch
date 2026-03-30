'use client';

import React, { useState } from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import * as Icons from 'lucide-react';
import {
  MapPin, Search, Filter, ArrowRight, Thermometer,
  Activity, AlertTriangle, Ruler, Eye, ChevronRight, Droplet,
  Waves, Wind, Mountain, Fish, Hammer, Layers
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { WaterEntity } from '@/data/water-systems';

interface ListingPageProps {
  title: string;
  description: string;
  icon: keyof typeof import('lucide-react');
  color: string;
  entities: WaterEntity[];
  entityType: string;
  filters: {
    districts: string[];
    categories: string[];
    qualityStatuses?: string[];
    additionalFilters?: Array<{ key: string; label: string; options: string[] }>;
  };
  getEntitySlug: (entity: WaterEntity) => string;
  getCategory: (entity: WaterEntity) => string;
  getSecondaryMetric?: (entity: WaterEntity) => { label: string; value: string; icon?: keyof typeof import('lucide-react') } | null;
  renderAdditionalInfo?: (entity: WaterEntity) => React.ReactNode;
}

export function WaterEntityListingPage({
  title,
  description,
  icon: iconName,
  color,
  entities,
  entityType,
  filters,
  getEntitySlug,
  getCategory,
  getSecondaryMetric,
  renderAdditionalInfo,
}: ListingPageProps) {
  const Icon = (Icons as any)[iconName] || Icons.Droplet;
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedQuality, setSelectedQuality] = useState<string>('all');

  const filteredEntities = entities.filter(entity => {
    const matchesSearch = entity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entity.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDistrict = selectedDistrict === 'all' || entity.district === selectedDistrict;
    const matchesCategory = selectedCategory === 'all' || getCategory(entity) === selectedCategory;
    const matchesQuality = !filters.qualityStatuses || selectedQuality === 'all' || entity.waterQuality?.status === selectedQuality;
    return matchesSearch && matchesDistrict && matchesCategory && matchesQuality;
  });

  const getQualityBadge = (status: string) => {
    switch (status) {
      case 'excellent': return 'success';
      case 'good': return 'success';
      case 'moderate': return 'warning';
      case 'poor': return 'warning';
      case 'critical': return 'danger';
      default: return 'default';
    }
  };

  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />

      {/* Hero */}
      <div className="relative pt-24 pb-12 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-20`} />
        <div className="absolute inset-0 bg-grid opacity-20" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <nav className="flex items-center gap-2 text-sm text-slate-400 mb-4">
              <button onClick={() => router.push('/water-systems')} className="hover:text-white transition-colors">
                Water Systems
              </button>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white font-medium">{title}</span>
            </nav>

            <div className="flex items-start justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <Badge variant="info" size="lg">{entities.length} {entityType}</Badge>
                </div>
                <h1 className="text-5xl font-black text-white mb-4">
                  {title}
                </h1>
                <p className="text-xl text-slate-400 max-w-3xl leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass-intense border-white/10 p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <Input
                    placeholder={`Search ${entityType.toLowerCase()} by name or description...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-slate-900/50 border-white/10 text-white"
                  />
                </div>
              </div>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="px-4 py-2.5 rounded-lg bg-slate-900/50 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Districts</option>
                {filters.districts.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2.5 rounded-lg bg-slate-900/50 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                {filters.categories.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            {filters.qualityStatuses && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                <select
                  value={selectedQuality}
                  onChange={(e) => setSelectedQuality(e.target.value)}
                  className="px-4 py-2.5 rounded-lg bg-slate-900/50 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Quality Levels</option>
                  {filters.qualityStatuses.map(s => (
                    <option key={s} value={s} className="capitalize">{s}</option>
                  ))}
                </select>
              </div>
            )}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
              <div className="text-sm text-slate-400">
                Showing <span className="text-white font-semibold">{filteredEntities.length}</span> of <span className="text-white font-semibold">{entities.length}</span> {entityType.toLowerCase()}
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-white/20 text-white"
                icon={<Filter className="w-4 h-4" />}
              >
                More Filters
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Entities Grid */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEntities.map((entity, idx) => (
            <motion.div
              key={entity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + idx * 0.05 }}
            >
              <Card className="glass-intense border-white/10 p-6 h-full hover:border-white/20 transition-all cursor-pointer group">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors truncate">
                      {entity.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" size="sm" className="text-xs border-white/10 text-slate-400">
                        {getCategory(entity)}
                      </Badge>
                      {entity.waterQuality && (
                        <Badge variant={getQualityBadge(entity.waterQuality.status)} size="sm">
                          {entity.waterQuality.status}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                  {entity.description}
                </p>

                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center p-2 rounded-lg bg-slate-800/50">
                    <Ruler className="w-4 h-4 text-slate-500 mx-auto mb-1" />
                    <div className="text-xs text-slate-500">Elevation</div>
                    <div className="text-sm font-bold text-white">{entity.elevation}m</div>
                  </div>
                  {entity.area && (
                    <div className="text-center p-2 rounded-lg bg-slate-800/50">
                      <Droplet className="w-4 h-4 text-slate-500 mx-auto mb-1" />
                      <div className="text-xs text-slate-500">Area</div>
                      <div className="text-sm font-bold text-white">{entity.area} km²</div>
                    </div>
                  )}
                  {entity.length && (
                    <div className="text-center p-2 rounded-lg bg-slate-800/50">
                      <Wind className="w-4 h-4 text-slate-500 mx-auto mb-1" />
                      <div className="text-xs text-slate-500">Length</div>
                      <div className="text-sm font-bold text-white">{entity.length} km</div>
                    </div>
                  )}
                  {!entity.area && !entity.length && (
                    <div className="text-center p-2 rounded-lg bg-slate-800/50">
                      <Activity className="w-4 h-4 text-slate-500 mx-auto mb-1" />
                      <div className="text-xs text-slate-500">Species</div>
                      <div className="text-sm font-bold text-white">{entity.biodiversity?.length || 0}</div>
                    </div>
                  )}
                  {getSecondaryMetric && getSecondaryMetric(entity) && (
                    <div className="text-center p-2 rounded-lg bg-slate-800/50">
                      {(() => {
                        const metric = getSecondaryMetric(entity);
                        if (metric?.icon) {
                          const IconComponent = (Icons as any)[metric.icon];
                          return IconComponent ? <IconComponent className="w-4 h-4 text-slate-500 mx-auto mb-1" /> : null;
                        }
                        return null;
                      })()}
                      <div className="text-xs text-slate-500">{getSecondaryMetric(entity)?.label}</div>
                      <div className="text-sm font-bold text-white">{getSecondaryMetric(entity)?.value}</div>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <MapPin className="w-4 h-4" />
                    <span>{entity.district}</span>
                  </div>
                  {entity.waterQuality && (
                    <div className="flex items-center gap-1 text-sm text-slate-400">
                      <Thermometer className="w-4 h-4" />
                      <span>pH {entity.waterQuality.pH.toFixed(1)}</span>
                    </div>
                  )}
                </div>

                {renderAdditionalInfo && renderAdditionalInfo(entity)}

                {entity.threats && entity.threats.length > 0 && (
                  <div className="flex items-center gap-2 text-xs text-amber-400 mb-4">
                    <AlertTriangle className="w-4 h-4" />
                    <span>{entity.threats.length} threats identified</span>
                  </div>
                )}

                <Button
                  size="sm"
                  className={`w-full bg-gradient-to-r ${color}`}
                  icon={<ArrowRight className="w-4 h-4" />}
                  onClick={() => router.push(getEntitySlug(entity))}
                >
                  View Details
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredEntities.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <Icon className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No {entityType.toLowerCase()} found</h3>
            <p className="text-slate-400">Try adjusting your search or filters</p>
          </motion.div>
        )}
      </div>

      {/* CTA */}
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className={`bg-gradient-to-r ${color} border-0 p-8`}>
            <div className="flex items-center justify-between flex-wrap gap-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Need More Detailed {title} Information?
                </h3>
                <p className="text-white/80">
                  Access comprehensive data, analysis, and conservation reports
                </p>
              </div>
              <Button
                size="lg"
                className="bg-white/20 text-white border-0"
                icon={<Eye className="w-5 h-5" />}
                onClick={() => router.push('/dashboards/water-systems')}
              >
                View Analytics Dashboard
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>

      <AdvancedFooter />
    </main>
  );
}
