'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { 
  MapPin, 
  Droplet, 
  TrendingUp, 
  Info, 
  Book, 
  ArrowRight,
  Layers,
  Mountain,
  Waves
} from 'lucide-react';
import { 
  NWIA_WETLAND_CLASSES, 
  KASHMIR_DISTRICT_STATS, 
  KASHMIR_VALLEY_TOTALS,
  NWIA_HIGH_ALTITUDE_LAKES_SUMMARY 
} from '@/data/nwia-references';

interface NwiaClassificationCardProps {
  variant?: 'compact' | 'detailed';
}

export function NwiaClassificationPanel({ variant = 'detailed' }: NwiaClassificationCardProps) {
  const [expandedClass, setExpandedClass] = React.useState<string | null>(null);

  const getClassIcon = (code: string) => {
    switch (code) {
      case '1101': return Droplet;
      case '1103': return Mountain;
      case '1104': return Waves;
      case '1106': return TrendingUp;
      case '1202': return Layers;
      default: return Info;
    }
  };

  const getClassColor = (code: string) => {
    switch (code) {
      case '1101': return 'from-blue-500 to-cyan-600';
      case '1103': return 'from-slate-400 to-slate-600';
      case '1104': return 'from-sky-500 to-blue-600';
      case '1106': return 'from-indigo-500 to-purple-600';
      case '1202': return 'from-amber-500 to-orange-600';
      default: return 'from-slate-500 to-slate-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-white">NWIA Wetland Classification</h3>
          <p className="text-sm text-slate-400 mt-1">
            National Wetland Inventory and Assessment - Jammu and Kashmir Atlas (2010)
          </p>
        </div>
        <Badge variant="info" size="lg">Kashmir Valley</Badge>
      </div>

      {/* Classification System */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {NWIA_WETLAND_CLASSES.map((wetlandClass) => {
          const Icon = getClassIcon(wetlandClass.code);
          const isExpanded = expandedClass === wetlandClass.code;

          return (
            <Card 
              key={wetlandClass.code}
              className={`glass-intense border-white/10 p-4 cursor-pointer transition-all hover:border-white/20 ${
                isExpanded ? 'border-white/30 bg-white/10' : ''
              }`}
              onClick={() => setExpandedClass(isExpanded ? null : wetlandClass.code)}
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${getClassColor(wetlandClass.code)} flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" size="sm" className="border-white/20 text-white text-xs">
                      {wetlandClass.code}
                    </Badge>
                    <h4 className="text-sm font-bold text-white truncate">{wetlandClass.name}</h4>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2">{wetlandClass.description}</p>
                  
                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-white/10">
                      <div className="text-xs text-slate-500 uppercase mb-2">Kashmir Examples</div>
                      <div className="flex flex-wrap gap-1">
                        {wetlandClass.kashmirExamples.map((example, idx) => (
                          <Badge key={idx} variant="info" size="sm" className="text-xs">
                            {example}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* District Statistics */}
      <Card className="glass-intense border-white/10 p-6">
        <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-400" />
          District-wise Wetland Distribution
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {KASHMIR_DISTRICT_STATS.map((district) => (
            <div key={district.district} className="p-4 rounded-xl bg-slate-800/50 border border-white/5">
              <div className="flex items-center justify-between mb-3">
                <h5 className="text-sm font-bold text-white">{district.district}</h5>
                <Badge variant="info" size="sm">{district.majorTypePercentage}%</Badge>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Area:</span>
                  <span className="text-white font-medium">{district.totalWetlandAreaHa.toLocaleString()} ha</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Major Type:</span>
                  <span className="text-white font-medium">{district.majorWetlandType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">High Altitude:</span>
                  <span className="text-white font-medium">{district.highAltitudeWetlandsHa.toLocaleString()} ha</span>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-white/5">
                <div className="text-xs text-slate-500 mb-1">Key Wetlands</div>
                <div className="flex flex-wrap gap-1">
                  {district.keyWetlands.slice(0, 2).map((wetland, idx) => (
                    <Badge key={idx} variant="outline" size="sm" className="text-xs border-white/10 text-slate-400">
                      {wetland}
                    </Badge>
                  ))}
                  {district.keyWetlands.length > 2 && (
                    <Badge variant="outline" size="sm" className="text-xs border-white/10 text-slate-400">
                      +{district.keyWetlands.length - 2}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Valley Totals */}
      <Card className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 p-6">
        <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Layers className="w-5 h-5 text-blue-400" />
          Kashmir Valley Totals (NWIA 2010)
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center p-3 rounded-lg bg-slate-800/50">
            <div className="text-2xl font-bold text-white">{KASHMIR_VALLEY_TOTALS.totalWetlandAreaHa.toLocaleString()}</div>
            <div className="text-xs text-slate-400 mt-1">Total Wetland (ha)</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-slate-800/50">
            <div className="text-2xl font-bold text-white">{KASHMIR_VALLEY_TOTALS.totalWetlandAreaKm2.toFixed(2)}</div>
            <div className="text-xs text-slate-400 mt-1">Total Wetland (km²)</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-slate-800/50">
            <div className="text-2xl font-bold text-white">{(KASHMIR_VALLEY_TOTALS.lakesPondsAreaHa / 1000).toFixed(1)}k</div>
            <div className="text-xs text-slate-400 mt-1">Lakes/Ponds (ha)</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-slate-800/50">
            <div className="text-2xl font-bold text-white">{(KASHMIR_VALLEY_TOTALS.riverStreamAreaHa / 1000).toFixed(1)}k</div>
            <div className="text-xs text-slate-400 mt-1">Rivers/Streams (ha)</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-slate-800/50">
            <div className="text-2xl font-bold text-white">{KASHMIR_VALLEY_TOTALS.totalHighAltitudeLakes.toLocaleString()}</div>
            <div className="text-xs text-slate-400 mt-1">High Altitude Lakes</div>
          </div>
        </div>
      </Card>

      {/* High Altitude Lakes Summary */}
      <Card className="glass-intense border-white/10 p-6">
        <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Mountain className="w-5 h-5 text-slate-400" />
          High Altitude Lakes of Kashmir
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="text-4xl font-bold text-white">{NWIA_HIGH_ALTITUDE_LAKES_SUMMARY.totalCount.toLocaleString()}</div>
              <div className="text-sm text-slate-400">Total high-altitude lakes<br/>above 3000m elevation</div>
            </div>
            <div className="space-y-2">
              {Object.entries(NWIA_HIGH_ALTITUDE_LAKES_SUMMARY.districts).map(([district, data]) => (
                <div key={district} className="flex items-center justify-between p-2 rounded-lg bg-slate-800/50">
                  <span className="text-sm text-white capitalize">{district}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-400">{data.count} lakes</span>
                    <span className="text-xs text-white font-medium">{data.area}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="text-sm text-slate-400 mb-3">Notable Examples</div>
            <div className="grid grid-cols-2 gap-2">
              {NWIA_HIGH_ALTITUDE_LAKES_SUMMARY.notableExamples.map((lake, idx) => (
                <div key={idx} className="p-2 rounded-lg bg-slate-800/50 border border-white/5">
                  <div className="text-xs text-white font-medium">{lake}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <div className="text-xs text-blue-300">
                <strong>Characteristics:</strong> Glacial origin, crystal-clear waters, high dissolved oxygen, low turbidity, sensitive to climate change
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Source Citation */}
      <Card className="glass-light border-white/10 p-4">
        <div className="flex items-start gap-3">
          <Book className="w-5 h-5 text-slate-400 mt-0.5" />
          <div>
            <div className="text-xs text-slate-500 uppercase mb-1">Data Source</div>
            <p className="text-sm text-slate-400">
              SAC/ISRO & University of Kashmir. (2010). National Wetland Atlas: Jammu and Kashmir. 
              Space Applications Centre, Ahmedabad, India.
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-2 border-white/20 text-white text-xs h-7"
              icon={<ArrowRight className="w-3 h-3" />}
            >
              View NWIA Atlas
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

// Compact version for embedding in detail pages
export function NwiaClassificationBadge({ nwiaCode, nwiaSignificance }: { nwiaCode?: string; nwiaSignificance?: string }) {
  if (!nwiaCode) return null;

  const wetlandClass = NWIA_WETLAND_CLASSES.find(c => c.code === nwiaCode);
  
  const getClassColor = (code: string) => {
    switch (code) {
      case '1101': return 'from-blue-500 to-cyan-600';
      case '1103': return 'from-slate-400 to-slate-600';
      case '1104': return 'from-sky-500 to-blue-600';
      case '1106': return 'from-indigo-500 to-purple-600';
      case '1202': return 'from-amber-500 to-orange-600';
      default: return 'from-slate-500 to-slate-600';
    }
  };

  return (
    <Card className="glass-intense border-white/10 p-4">
      <div className="flex items-start gap-3">
        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${getClassColor(nwiaCode)} flex items-center justify-center flex-shrink-0`}>
          <Badge variant="outline" size="sm" className="border-white/30 text-white text-xs bg-transparent">
            {nwiaCode}
          </Badge>
        </div>
        <div className="flex-1">
          <div className="text-xs text-slate-500 uppercase mb-1">NWIA Classification</div>
          <div className="text-sm font-bold text-white">{wetlandClass?.name || 'Unknown'}</div>
          {nwiaSignificance && (
            <p className="text-xs text-slate-400 mt-1">{nwiaSignificance}</p>
          )}
        </div>
      </div>
    </Card>
  );
}
