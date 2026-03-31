'use client';

import React from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  FileText, ArrowRight, ChevronRight, Download, Book,
  MapPin, Activity, Calendar, Users, Tag, Layers,
  Eye, Share2, Bookmark
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Report } from '@/data/protected-network';

interface ReportDetailPageProps {
  report: Report;
  relatedReports?: Report[];
}

export function ReportDetailPage({ report, relatedReports = [] }: ReportDetailPageProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState<'overview' | 'geographies' | 'themes' | 'species' | 'metadata'>('overview');

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Management Plan': return 'from-emerald-500 to-emerald-600';
      case 'Scientific Report': return 'from-purple-500 to-purple-600';
      case 'Monitoring Data': return 'from-blue-500 to-blue-600';
      case 'Assessment': return 'from-amber-500 to-amber-600';
      case 'Atlas': return 'from-pink-500 to-pink-600';
      default: return 'from-slate-500 to-slate-600';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Management Plan': return Book;
      case 'Scientific Report': return FileText;
      case 'Monitoring Data': return Activity;
      case 'Assessment': return Layers;
      case 'Atlas': return MapPin;
      default: return FileText;
    }
  };

  const TypeIcon = getTypeIcon(report.type);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Book },
    { id: 'geographies', label: 'Linked Geographies', icon: MapPin },
    { id: 'themes', label: 'Key Themes', icon: Tag },
    { id: 'species', label: 'Related Species', icon: Activity },
    { id: 'metadata', label: 'Metadata', icon: FileText },
  ];

  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />

      {/* Hero */}
      <div className="relative pt-24 pb-12 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br from-amber-600/15 to-slate-900`} />
        <div className="absolute inset-0 bg-grid opacity-20" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-sm text-slate-400 mb-4">
              <button onClick={() => router.push('/protected-network')} className="hover:text-white transition-colors">
                Protected Network
              </button>
              <ChevronRight className="w-4 h-4" />
              <button onClick={() => router.push('/protected-network/reports-and-plans')} className="hover:text-white transition-colors">
                Reports & Plans
              </button>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white font-medium">{report.title}</span>
            </nav>

            <div className="flex items-start justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getTypeColor(report.type)} text-white flex items-center justify-center shadow-lg`}>
                    <TypeIcon className="w-6 h-6" />
                  </div>
                  <Badge variant="info" size="lg">
                    {report.type}
                  </Badge>
                  <Badge variant="default" size="lg">
                    {report.year}
                  </Badge>
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
                  {report.title}
                </h1>
                <p className="text-xl text-slate-400 max-w-3xl mb-6">
                  {report.description}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button
                    className="bg-gradient-to-r from-amber-600 to-amber-500"
                    icon={<Download className="w-5 h-5" />}
                  >
                    Download PDF
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white/20 text-white"
                    icon={<Bookmark className="w-5 h-5" />}
                  >
                    Save to Library
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white/20 text-white"
                    icon={<Share2 className="w-5 h-5" />}
                  >
                    Share
                  </Button>
                </div>
              </div>

              {/* Quick Stats */}
              <Card className="glass-intense border-white/10 p-6 hidden lg:block">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-slate-400" />
                    <div>
                      <div className="text-xs text-slate-500 uppercase">Linked Areas</div>
                      <div className="text-lg font-bold text-white">{report.linkedAreas.length}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Activity className="w-5 h-5 text-slate-400" />
                    <div>
                      <div className="text-xs text-slate-500 uppercase">Linked Species</div>
                      <div className="text-lg font-bold text-white">{report.linkedSpecies.length}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Tag className="w-5 h-5 text-slate-400" />
                    <div>
                      <div className="text-xs text-slate-500 uppercase">Themes</div>
                      <div className="text-lg font-bold text-white">{report.themes.length}</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Metrics Bar */}
      <div className="container mx-auto px-6 mt-10 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass-intense border-white/10 p-6" padding="none">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {[
                { label: 'Type', value: report.type.split(' ')[0], icon: TypeIcon },
                { label: 'Year', value: report.year, icon: Calendar },
                { label: 'Authors', value: report.authors.length, icon: Users },
                { label: 'Linked Areas', value: report.linkedAreas.length, icon: MapPin },
                { label: 'Linked Species', value: report.linkedSpecies.length, icon: Activity },
                { label: 'Themes', value: report.themes.length, icon: Tag },
              ].map((metric, idx) => (
                <div key={idx} className="text-center p-4 border-r border-white/5 last:border-r-0">
                  <metric.icon className="w-5 h-5 text-slate-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white tabular-nums">
                    {metric.value}
                  </div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white'
                    : 'glass-light border border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card className="card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
                  <h2 className="text-2xl font-bold text-white mb-4">Document Overview</h2>
                  <p className="text-slate-400 leading-relaxed mb-6">{report.description}</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-slate-500 uppercase mb-1">Document Type</div>
                      <div className="text-white font-medium">{report.type}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 uppercase mb-1">Publication Year</div>
                      <div className="text-white font-medium">{report.year}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 uppercase mb-1">Authors</div>
                      <div className="text-white font-medium">{report.authors.length} organizations</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 uppercase mb-1">Linked Areas</div>
                      <div className="text-white font-medium">{report.linkedAreas.length} protected areas</div>
                    </div>
                  </div>
                </Card>

                <Card className="card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
                  <h2 className="text-2xl font-bold text-white mb-4">Authors & Contributors</h2>
                  <div className="space-y-3">
                    {report.authors.map((author, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-slate-800/50 border border-white/5 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                          <Users className="w-5 h-5 text-amber-400" />
                        </div>
                        <div>
                          <div className="text-white font-medium">{author}</div>
                          <div className="text-xs text-slate-500 uppercase">Contributing Organization</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
                  <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full border-white/20 text-white justify-start" icon={<Download className="w-4 h-4" />}>
                      Download PDF
                    </Button>
                    <Button variant="outline" size="sm" className="w-full border-white/20 text-white justify-start" icon={<Bookmark className="w-4 h-4" />}>
                      Save to Library
                    </Button>
                    <Button variant="outline" size="sm" className="w-full border-white/20 text-white justify-start" icon={<Eye className="w-4 h-4" />}>
                      Preview
                    </Button>
                    <Button variant="outline" size="sm" className="w-full border-white/20 text-white justify-start" icon={<Share2 className="w-4 h-4" />}>
                      Share
                    </Button>
                  </div>
                </Card>

                <Card className="card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
                  <h3 className="text-lg font-bold text-white mb-4">Key Themes</h3>
                  <div className="flex flex-wrap gap-2">
                    {report.themes.map((theme, idx) => (
                      <Badge key={idx} variant="default" size="sm">
                        {theme}
                      </Badge>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'geographies' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card className="card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
              <h2 className="text-2xl font-bold text-white mb-6">Linked Protected Areas</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {report.linkedAreas.map((area, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-800/50 border border-white/5 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <div className="text-white font-medium">{area.replace(/-/g, ' ')}</div>
                      <div className="text-xs text-slate-500 uppercase">Protected Area</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
              <h2 className="text-2xl font-bold text-white mb-4">Geographic Coverage</h2>
              <div className="h-64 rounded-xl bg-slate-800/50 border border-white/5 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-amber-500 mx-auto mb-3" />
                  <p className="text-slate-400 text-sm">Interactive map of linked areas</p>
                  <p className="text-slate-500 text-xs mt-1">{report.linkedAreas.length} protected areas</p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {activeTab === 'themes' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card className="card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
              <h2 className="text-2xl font-bold text-white mb-6">Key Themes</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {report.themes.map((theme, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                        <Tag className="w-5 h-5 text-amber-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-white">{theme}</h3>
                    </div>
                    <p className="text-sm text-slate-400">Key focus area covered in this document</p>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {activeTab === 'species' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card className="card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
              <h2 className="text-2xl font-bold text-white mb-6">Related Species</h2>
              {report.linkedSpecies.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {report.linkedSpecies.map((species, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-800/50 border border-white/5">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                          <Activity className="w-5 h-5 text-purple-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-white capitalize">{species.replace(/-/g, ' ')}</h3>
                      </div>
                      <Badge variant="info" size="sm">Featured Species</Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Activity className="w-12 h-12 text-slate-500 mx-auto mb-3" />
                  <p className="text-slate-400">No specific species linked to this report</p>
                </div>
              )}
            </Card>
          </motion.div>
        )}

        {activeTab === 'metadata' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card className="card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
              <h2 className="text-2xl font-bold text-white mb-6">Document Metadata</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-800/50 border border-white/5">
                    <div className="text-xs text-slate-500 uppercase mb-1">Document Type</div>
                    <div className="text-white font-medium">{report.type}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-800/50 border border-white/5">
                    <div className="text-xs text-slate-500 uppercase mb-1">Publication Year</div>
                    <div className="text-white font-medium">{report.year}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-800/50 border border-white/5">
                    <div className="text-xs text-slate-500 uppercase mb-1">Authors</div>
                    <div className="text-white font-medium">{report.authors.join(', ')}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-800/50 border border-white/5">
                    <div className="text-xs text-slate-500 uppercase mb-1">Linked Areas</div>
                    <div className="text-white font-medium">{report.linkedAreas.length} areas</div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Cite This Document</h3>
                  <p className="text-slate-400 text-sm">{report.authors[0]} ({report.year}). {report.title}.</p>
                </div>
                <Button variant="outline" className="border-white/20 text-white" icon={<Share2 className="w-4 h-4" />}>
                  Copy Citation
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {/* CTA Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <Card className="bg-gradient-to-r from-amber-600 to-amber-500 border-0 p-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Explore More Reports</h3>
                <p className="text-white/80">Browse management plans, scientific reports, and conservation documents</p>
              </div>
              <Button size="lg" className="bg-white/20 text-white border-0" icon={<ArrowRight className="w-5 h-5" />}>
                View All Reports
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>

      <AdvancedFooter />
    </main>
  );
}
