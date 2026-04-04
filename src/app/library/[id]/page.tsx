'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Download, ExternalLink, Calendar, Building2, MapPin,
  Link as LinkIcon, FlaskConical, Star, FileText, Database, BookOpen,
  Tag, Clock, Share2, Bookmark
} from 'lucide-react';
import { evidenceRegistry, sourceTypeLabels, confidenceLabels, categoryLabels } from '@/data/evidence-intelligence';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

const sourceTypeColors: Record<string, string> = {
  official: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  academic: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  field: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  citizen: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
};

const confidenceColors: Record<string, string> = {
  high: 'bg-emerald-500/20 text-emerald-400',
  medium: 'bg-amber-500/20 text-amber-400',
  low: 'bg-orange-500/20 text-orange-400',
  unverified: 'bg-slate-500/20 text-slate-400',
};

const confidenceDescriptions: Record<string, string> = {
  high: 'Peer-reviewed, institutionally validated, or multi-source verified evidence',
  medium: 'Academic or field-collected data with standard methodological review',
  low: 'Preliminary findings or single-source observations requiring validation',
  unverified: 'Community-submitted evidence pending formal review',
};

const entityIcons: Record<string, React.ElementType> = {
  species: MapPin,
  lake: MapPin,
  wetland: MapPin,
  district: MapPin,
  protected_area: MapPin,
  spring: MapPin,
  forest: MapPin,
  glacier: MapPin,
};

const entityColors: Record<string, string> = {
  species: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  lake: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  wetland: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
  district: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  protected_area: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  spring: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
  forest: 'text-green-400 bg-green-500/10 border-green-500/20',
  glacier: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
};

export default function EvidenceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const evidenceId = params.id as string;

  const evidence = evidenceRegistry.find(e => e.id === evidenceId);

  if (!evidence) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <FileText className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Evidence Not Found</h1>
          <p className="text-slate-400 mb-6">The evidence item you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => router.push('/library')} icon={<ArrowLeft className="w-5 h-5" />}>
            Back to Library
          </Button>
        </div>
      </main>
    );
  }

  const relatedEvidence = evidenceRegistry
    .filter(e =>
      e.id !== evidence.id &&
      (e.collections.some(c => evidence.collections.includes(c)) ||
       e.relatedEntities.some(re => evidence.relatedEntities.some(eRe => eRe.id === re.id)))
    )
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-slate-950">
      {/* Top Navigation Bar */}
      <section className="border-b border-white/5 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => router.push('/library')}
              icon={<ArrowLeft className="w-5 h-5" />}
              className="text-slate-400 hover:text-white"
            >
              Back to Library
            </Button>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                icon={<Share2 className="w-4 h-4" />}
                className="text-slate-400 hover:text-white"
              >
                Share
              </Button>
              <Button
                variant="ghost"
                size="sm"
                icon={<Bookmark className="w-4 h-4" />}
                className="text-slate-400 hover:text-white"
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/30 via-purple-950/20 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-5xl"
          >
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <Badge variant="outline" size="lg" className="text-sm">
                {categoryLabels[evidence.category]}
              </Badge>
              <span className={cn("px-3 py-1 rounded-full text-sm font-medium border", sourceTypeColors[evidence.sourceType])}>
                {sourceTypeLabels[evidence.sourceType]}
              </span>
              <span className={cn("px-3 py-1 rounded-full text-sm font-medium", confidenceColors[evidence.confidence])}>
                {confidenceLabels[evidence.confidence]}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
              {evidence.title}
            </h1>

            {/* Meta Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="flex items-start gap-3">
                <Building2 className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <div className="text-xs text-slate-500 mb-1">Source Organization</div>
                  <div className="text-sm text-white font-medium">{evidence.organization}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <div className="text-xs text-slate-500 mb-1">Published</div>
                  <div className="text-sm text-white font-medium">
                    {new Date(evidence.publishedDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <div className="text-xs text-slate-500 mb-1">Last Updated</div>
                  <div className="text-sm text-white font-medium">
                    {new Date(evidence.lastUpdated).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Metrics */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400">
              <span className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                {evidence.downloadCount} downloads
              </span>
              <span className="flex items-center gap-2">
                <Star className="w-4 h-4" />
                {evidence.citationCount} citations
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Abstract */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="glass-intense border-white/10 p-6">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Abstract / Summary
                  </h2>
                  <p className="text-slate-300 leading-relaxed">{evidence.abstract}</p>
                </Card>
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="glass-intense border-white/10 p-6">
                  <h2 className="text-xl font-bold text-white mb-4">Description</h2>
                  <p className="text-slate-300 leading-relaxed">{evidence.description}</p>
                </Card>
              </motion.div>

              {/* Methods Used */}
              {evidence.methods && evidence.methods.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card className="glass-intense border-white/10 p-6">
                    <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <FlaskConical className="w-5 h-5" />
                      Methods & Protocols
                    </h2>
                    <div className="space-y-4">
                      {evidence.methods.map(method => (
                        <div key={method.methodId} className="pb-4 border-b border-white/5 last:border-0 last:pb-0">
                          <div className="font-semibold text-white mb-1">{method.methodName}</div>
                          <div className="text-sm text-slate-400">{method.description}</div>
                          {method.protocol && (
                            <div className="text-xs text-indigo-400 mt-1">Protocol: {method.protocol}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              )}

              {/* Keywords & Tags */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="glass-intense border-white/10 p-6">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Tag className="w-5 h-5" />
                    Keywords & Tags
                  </h2>
                  <div className="space-y-3">
                    {evidence.keywords.length > 0 && (
                      <div>
                        <div className="text-xs text-slate-500 mb-2">Keywords</div>
                        <div className="flex flex-wrap gap-2">
                          {evidence.keywords.map((keyword, i) => (
                            <Badge key={i} variant="secondary" size="sm">{keyword}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    {evidence.tags.length > 0 && (
                      <div>
                        <div className="text-xs text-slate-500 mb-2">Tags</div>
                        <div className="flex flex-wrap gap-2">
                          {evidence.tags.map((tag, i) => (
                            <Badge key={i} variant="outline" size="sm">{tag}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>

              {/* Related Evidence */}
              {relatedEvidence.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card className="glass-intense border-white/10 p-6">
                    <h2 className="text-xl font-bold text-white mb-4">Related Evidence</h2>
                    <div className="space-y-3">
                      {relatedEvidence.map(item => (
                        <div
                          key={item.id}
                          className="p-4 rounded-lg bg-slate-800/30 hover:bg-slate-800/50 transition-colors cursor-pointer"
                          onClick={() => router.push(`/library/${item.id}`)}
                        >
                          <div className="font-semibold text-white mb-1">{item.title}</div>
                          <div className="text-sm text-slate-400 line-clamp-2">{item.abstract}</div>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline" size="sm">{categoryLabels[item.category]}</Badge>
                            <span className={cn("text-xs px-2 py-0.5 rounded", confidenceColors[item.confidence])}>
                              {confidenceLabels[item.confidence]}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              )}
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Confidence Level Explanation */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Card className="glass-intense border-white/10 p-6">
                  <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                    <Star className="w-5 h-5" />
                    Confidence Assessment
                  </h3>
                  <div className={cn("px-3 py-2 rounded-lg text-sm font-medium mb-3", confidenceColors[evidence.confidence])}>
                    {confidenceLabels[evidence.confidence]}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {confidenceDescriptions[evidence.confidence]}
                  </p>
                </Card>
              </motion.div>

              {/* Related Entities */}
              {evidence.relatedEntities.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <Card className="glass-intense border-white/10 p-6">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      Related Entities
                    </h3>
                    <div className="space-y-2">
                      {evidence.relatedEntities.map(entity => {
                        const EntityIcon = entityIcons[entity.type] || MapPin;
                        return (
                          <a
                            key={entity.id}
                            href={entity.slug || '#'}
                            className={cn(
                              "flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800/50 transition-colors",
                              entityColors[entity.type]
                            )}
                          >
                            <EntityIcon className="w-4 h-4" />
                            <div>
                              <div className="text-sm font-medium text-white">{entity.name}</div>
                              <div className="text-xs text-slate-500 capitalize">{entity.type.replace('_', ' ')}</div>
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  </Card>
                </motion.div>
              )}

              {/* Used In Modules */}
              {evidence.usedInModules.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <Card className="glass-intense border-white/10 p-6">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <LinkIcon className="w-5 h-5" />
                      Used in Modules
                    </h3>
                    <div className="space-y-2">
                      {evidence.usedInModules.map(module => (
                        <a
                          key={module.moduleId}
                          href={module.modulePath}
                          className="block p-3 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 transition-colors"
                        >
                          <div className="text-sm font-medium text-indigo-400">{module.moduleName}</div>
                          <div className="text-xs text-slate-400 mt-1">{module.usageContext}</div>
                        </a>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              )}

              {/* Districts */}
              {evidence.districts.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <Card className="glass-intense border-white/10 p-6">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      Geographic Scope
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {evidence.districts.map(district => (
                        <a
                          key={district}
                          href={`/districts/${district}`}
                          className="px-3 py-1.5 rounded-lg text-sm font-medium bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border border-purple-500/20 transition-colors"
                        >
                          {district.charAt(0).toUpperCase() + district.slice(1)}
                        </a>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              )}

              {/* Source & Access */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Card className="glass-intense border-white/10 p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Source & Access</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="text-xs text-slate-500 mb-1">Authors</div>
                      <div className="text-sm text-white">{evidence.authors.join(', ')}</div>
                    </div>
                    {evidence.doi && (
                      <div>
                        <div className="text-xs text-slate-500 mb-1">DOI</div>
                        <a href={`https://doi.org/${evidence.doi}`} className="text-sm text-indigo-400 hover:text-indigo-300 break-all">
                          {evidence.doi}
                        </a>
                      </div>
                    )}
                    <div className="flex flex-col gap-2 pt-2">
                      {evidence.downloadUrl && (
                        <Button
                          size="sm"
                          className="w-full"
                          icon={<Download className="w-4 h-4" />}
                          as="a"
                          href={evidence.downloadUrl}
                        >
                          Download Dataset
                        </Button>
                      )}
                      {evidence.url && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full border-white/20 text-white"
                          icon={<ExternalLink className="w-4 h-4" />}
                          as="a"
                          href={evidence.url}
                          target="_blank"
                        >
                          View Source
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Citation Format */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Card className="glass-intense border-white/10 p-6">
                  <h3 className="text-lg font-bold text-white mb-3">Suggested Citation</h3>
                  <div className="text-xs text-slate-400 leading-relaxed bg-slate-800/50 p-3 rounded-lg">
                    {evidence.authors.join(', ')} ({new Date(evidence.publishedDate).getFullYear()}). 
                    <em className="text-slate-300"> {evidence.title}</em>. 
                    {evidence.organization && <span> {evidence.organization}. </span>}
                    {evidence.doi && <span>DOI: {evidence.doi}</span>}
                  </div>
                </Card>
              </motion.div>

              {/* Status Tag */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Card className="glass-intense border-white/10 p-6">
                  <h3 className="text-lg font-bold text-white mb-3">Publication Status</h3>
                  <Badge variant="outline" size="lg" className="w-full justify-center text-sm">
                    Published & Archived
                  </Badge>
                  <p className="text-xs text-slate-500 mt-2 text-center">
                    This evidence item has completed review and is available for reference.
                  </p>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
