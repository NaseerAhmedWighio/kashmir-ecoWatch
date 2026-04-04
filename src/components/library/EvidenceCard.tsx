'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { EvidenceItem, ModuleReference, RelatedEntity, sourceTypeLabels, confidenceLabels, categoryLabels } from '@/data/evidence-intelligence';
import { FileText, Download, MapPin, Link as LinkIcon, ExternalLink, BookOpen, Database, FlaskConical, Map, Scroll, Star, Users, Building2, Calendar, TrendingUp, Compass } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EvidenceCardProps {
  evidence: EvidenceItem;
  variant?: 'default' | 'compact' | 'featured';
  showModuleLinks?: boolean;
  showRelatedEntities?: boolean;
  onClick?: () => void;
}

const categoryIcons: Record<string, React.ElementType> = {
  research: BookOpen,
  report: FileText,
  dataset: Database,
  policy: Scroll,
  method: FlaskConical,
  map: Map,
  guide: Compass,
};

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
  species: 'text-emerald-400',
  lake: 'text-blue-400',
  wetland: 'text-cyan-400',
  district: 'text-purple-400',
  protected_area: 'text-emerald-400',
  spring: 'text-cyan-400',
  forest: 'text-green-400',
  glacier: 'text-blue-400',
};

export function EvidenceCard({
  evidence,
  variant = 'default',
  showModuleLinks = true,
  showRelatedEntities = true,
  onClick
}: EvidenceCardProps) {
  const router = useRouter();
  const CategoryIcon = categoryIcons[evidence.category] || FileText;

  const handleViewDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/library/${evidence.id}`);
  };

  if (variant === 'compact') {
    return (
      <Card className="glass-intense border-white/10 hover:border-indigo-500/30 transition-all p-4 cursor-pointer group" onClick={onClick}>
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0">
            <CategoryIcon className="w-5 h-5 text-indigo-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-white group-hover:text-indigo-400 transition-colors line-clamp-2">{evidence.title}</h3>
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <Badge variant="outline" size="sm">{categoryLabels[evidence.category]}</Badge>
              <span className="text-xs text-slate-500">{evidence.publishedDate.split('-')[0]}</span>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  if (variant === 'featured') {
    return (
      <Card className="glass-intense border-white/10 hover:border-indigo-500/40 transition-all p-6 cursor-pointer group relative overflow-hidden" onClick={onClick}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-bl-full" />
        
        <div className="relative">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                <CategoryIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <Badge variant="outline" size="sm" className="mb-1">{categoryLabels[evidence.category]}</Badge>
                <div className="flex items-center gap-2">
                  <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium border", sourceTypeColors[evidence.sourceType])}>
                    {sourceTypeLabels[evidence.sourceType]}
                  </span>
                  <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium", confidenceColors[evidence.confidence])}>
                    {confidenceLabels[evidence.confidence]}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 text-amber-400">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-sm font-medium">Featured</span>
            </div>
          </div>

          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors line-clamp-2">{evidence.title}</h3>
          <p className="text-sm text-slate-400 mb-4 line-clamp-3">{evidence.abstract}</p>

          <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
            <span className="flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5" />
              {evidence.organization}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(evidence.publishedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
            </span>
          </div>

          {showRelatedEntities && evidence.relatedEntities.length > 0 && (
            <div className="mb-4">
              <div className="text-xs text-slate-500 mb-2">Related Entities</div>
              <div className="flex flex-wrap gap-2">
                {evidence.relatedEntities.slice(0, 4).map(entity => {
                  const EntityIcon = entityIcons[entity.type] || MapPin;
                  return (
                    <a
                      key={entity.id}
                      href={entity.slug || '#'}
                      className={cn(
                        "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-800/50 hover:bg-slate-700/50 transition-colors",
                        entityColors[entity.type]
                      )}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <EntityIcon className="w-3 h-3" />
                      {entity.name}
                    </a>
                  );
                })}
              </div>
            </div>
          )}

          {showModuleLinks && evidence.usedInModules.length > 0 && (
            <div className="mb-4">
              <div className="text-xs text-slate-500 mb-2 flex items-center gap-1">
                <LinkIcon className="w-3 h-3" />
                Used in {evidence.usedInModules.length} Module{evidence.usedInModules.length > 1 ? 's' : ''}
              </div>
              <div className="flex flex-wrap gap-2">
                {evidence.usedInModules.slice(0, 3).map(module => (
                  <a
                    key={module.moduleId}
                    href={module.modulePath}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/20 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="w-3 h-3" />
                    {module.moduleName}
                  </a>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Download className="w-3.5 h-3.5" />
                {evidence.downloadCount}
              </span>
              <span className="flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" />
                {evidence.citationCount} citations
              </span>
            </div>
            <Button size="sm" variant="outline" className="border-white/20 text-white h-9" onClick={handleViewDetails}>
              View Details
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  // Default variant
  return (
    <Card className="glass-intense border-white/10 hover:border-indigo-500/30 transition-all p-5 cursor-pointer group" onClick={onClick}>
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0">
          <CategoryIcon className="w-6 h-6 text-indigo-400" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="text-base font-bold text-white group-hover:text-indigo-400 transition-colors line-clamp-2">{evidence.title}</h3>
          </div>

          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <Badge variant="outline" size="sm">{categoryLabels[evidence.category]}</Badge>
            <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium border", sourceTypeColors[evidence.sourceType])}>
              {sourceTypeLabels[evidence.sourceType]}
            </span>
            <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium", confidenceColors[evidence.confidence])}>
              {confidenceLabels[evidence.confidence]}
            </span>
          </div>

          <p className="text-sm text-slate-400 mb-3 line-clamp-2">{evidence.abstract}</p>

          <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
            <span className="flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5" />
              {evidence.organization}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(evidence.publishedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
            </span>
          </div>

          {showRelatedEntities && evidence.relatedEntities.length > 0 && (
            <div className="mb-3">
              <div className="flex flex-wrap gap-1.5">
                {evidence.relatedEntities.slice(0, 3).map(entity => {
                  const EntityIcon = entityIcons[entity.type] || MapPin;
                  return (
                    <a
                      key={entity.id}
                      href={entity.slug || '#'}
                      className={cn(
                        "inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium bg-slate-800/50 hover:bg-slate-700/50 transition-colors",
                        entityColors[entity.type]
                      )}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <EntityIcon className="w-3 h-3" />
                      {entity.name}
                    </a>
                  );
                })}
              </div>
            </div>
          )}

          {showModuleLinks && evidence.usedInModules.length > 0 && (
            <div className="mb-3">
              <div className="flex flex-wrap gap-1.5">
                {evidence.usedInModules.slice(0, 2).map(module => (
                  <a
                    key={module.moduleId}
                    href={module.modulePath}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/20 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <LinkIcon className="w-3 h-3" />
                    {module.moduleName}
                  </a>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-3 border-t border-white/5">
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Download className="w-3.5 h-3.5" />
                {evidence.downloadCount}
              </span>
              <span className="flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" />
                {evidence.citationCount}
              </span>
            </div>
            <Button size="sm" variant="outline" className="border-white/20 text-white h-8" onClick={handleViewDetails}>
              View Details
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

interface ModuleLinkBadgeProps {
  module: ModuleReference;
}

export function ModuleLinkBadge({ module }: ModuleLinkBadgeProps) {
  return (
    <a
      href={module.modulePath}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/20 transition-colors"
    >
      <ExternalLink className="w-3 h-3" />
      {module.moduleName}
    </a>
  );
}

interface RelatedEntityBadgeProps {
  entity: RelatedEntity;
}

export function RelatedEntityBadge({ entity }: RelatedEntityBadgeProps) {
  const EntityIcon = entityIcons[entity.type] || MapPin;
  
  return (
    <a
      href={entity.slug || '#'}
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-800/50 hover:bg-slate-700/50 transition-colors",
        entityColors[entity.type]
      )}
    >
      <EntityIcon className="w-3 h-3" />
      {entity.name}
    </a>
  );
}

interface SourceConfidenceBadgeProps {
  sourceType: string;
  confidence: string;
  compact?: boolean;
}

export function SourceConfidenceBadge({ sourceType, confidence, compact = false }: SourceConfidenceBadgeProps) {
  if (compact) {
    return (
      <div className="flex items-center gap-1.5">
        <span className={cn("px-1.5 py-0.5 rounded text-xs font-medium border", sourceTypeColors[sourceType])}>
          {sourceTypeLabels[sourceType as keyof typeof sourceTypeLabels]}
        </span>
        <span className={cn("px-1.5 py-0.5 rounded text-xs font-medium", confidenceColors[confidence])}>
          {confidenceLabels[confidence as keyof typeof confidenceLabels]}
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className={cn("px-2 py-1 rounded-full text-xs font-medium border", sourceTypeColors[sourceType])}>
        {sourceTypeLabels[sourceType as keyof typeof sourceTypeLabels]}
      </span>
      <span className={cn("px-2 py-1 rounded-full text-xs font-medium", confidenceColors[confidence])}>
        {confidenceLabels[confidence as keyof typeof confidenceLabels]}
      </span>
    </div>
  );
}
