'use client';

import React from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Activity, Calendar, MapPin, Flower2, ArrowRight, Sprout, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { getPollinatorWindows, PollinatorWindow } from '@/data/seasonal-ecology';

const pollinatorGroupColors: Record<string, string> = {
  bee: 'bg-amber-500/20 text-amber-300',
  bumblebee: 'bg-yellow-500/20 text-yellow-300',
  butterfly: 'bg-pink-500/20 text-pink-300',
  moth: 'bg-purple-500/20 text-purple-300',
  fly: 'bg-slate-500/20 text-slate-300',
  beetle: 'bg-orange-500/20 text-orange-300',
  bird: 'bg-sky-500/20 text-sky-300',
  bat: 'bg-indigo-500/20 text-indigo-300',
};

export default function PollinatorActivityPage() {
  const router = useRouter();
  const windows = getPollinatorWindows();
  const currentMonth = new Date().getMonth() + 1;
  const activeWindows = windows.filter(w => {
    return currentMonth >= w.activityWindow.startMonth && currentMonth <= w.activityWindow.endMonth;
  });

  const allBlooms = [...new Set(windows.flatMap(w => w.associatedBlooms))];
  const allDistricts = [...new Set(windows.flatMap(w => w.districts))];

  return (
    <main className="min-h-screen bg-slate-950"><div className="relative pt-20 md:pt-32 pb-12 md:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-pink-900/10 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-6 h-6 text-amber-400" />
              <span className="text-sm font-semibold uppercase tracking-widest text-slate-400">Biodiversity Intelligence</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Pollinator Activity</h1>
            <p className="text-lg text-slate-400 mb-6">
              Pollinator windows, flowering-linked activity, and seasonal watch periods across Kashmir ecosystems.
            </p>
            <Button size="lg" className="bg-gradient-to-r from-amber-600 to-amber-500" icon={<Flower2 className="w-5 h-5" />} onClick={() => router.push('/biodiversity/phenology-flowering')}>
              View Phenology Records
            </Button>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 -mt-6 relative z-20">
        <Card className="glass-intense border-white/10 p-5" padding="none">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { label: 'Pollinator Windows', value: windows.length, icon: Activity },
              { label: 'Active Now', value: activeWindows.length, icon: Activity, color: 'text-emerald-400' },
              { label: 'Associated Blooms', value: allBlooms.length, icon: Flower2 },
              { label: 'Districts', value: allDistricts.length, icon: MapPin },
              { label: 'Peak Months', value: windows.length > 0 ? windows[0].peakActivityMonths.length : 0, icon: Calendar },
            ].map((stat, idx) => (
              <div key={idx} className="text-center p-3 border-r border-white/5 last:border-r-0">
                <stat.icon className={`w-5 h-5 ${'color' in stat ? (stat as any).color : 'text-amber-400'} mx-auto mb-1`} />
                <div className="text-xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {windows.map((w, i) => (
            <motion.div key={w.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card className="border border-white/10 bg-slate-900/30 hover:bg-slate-900/50 transition-all h-full" padding="md">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-white text-sm">{w.name}</h3>
                    <div className="text-xs text-slate-500">{w.pollinatorGroup}</div>
                  </div>
                  <Badge className={`text-xs ${pollinatorGroupColors[w.pollinatorGroup] || 'bg-slate-700/50 text-slate-300'}`}>
                    {w.pollinatorGroup}
                  </Badge>
                </div>

                <div className="space-y-2 text-xs text-slate-400">
                  <div>
                    <div className="text-slate-500 mb-1">Activity Window</div>
                    <div className="text-slate-300">{w.activityWindow.description}</div>
                  </div>
                  <div>
                    <div className="text-slate-500 mb-1">Peak Activity</div>
                    <div className="flex gap-1 flex-wrap">
                      {w.peakActivityMonths.map(m => (
                        <Badge key={m} className={`text-xs ${m === currentMonth ? 'bg-emerald-500/30 text-emerald-200' : 'bg-slate-700/50 text-slate-300'}`}>
                          {new Date(2026, m - 1).toLocaleString('default', { month: 'short' })}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  {w.associatedBlooms.length > 0 && (
                    <div>
                      <div className="text-slate-500 mb-1">Associated Blooms</div>
                      <div className="text-slate-300">{w.associatedBlooms.slice(0, 3).join(', ')}</div>
                    </div>
                  )}
                  <div className="text-slate-500 line-clamp-2">{w.ecologicalImportance}</div>
                  {w.threats && w.threats.length > 0 && (
                    <div className="text-red-400">Threats: {w.threats.slice(0, 2).join(', ')}</div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-white/5">
                  <button onClick={() => router.push('/biodiversity/phenology-flowering')} className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1">
                    View Linked Phenology <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Annual Activity Timeline */}
      <div className="container mx-auto px-6 py-12 bg-gradient-to-b from-slate-950 to-amber-950/10">
        <h2 className="text-2xl font-bold text-white mb-6">Annual Pollinator Activity Timeline</h2>
        <div className="grid grid-cols-12 gap-1">
          {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, mi) => {
            const monthNum = mi + 1;
            const activeForMonth = windows.filter(w =>
              monthNum >= w.activityWindow.startMonth && monthNum <= w.activityWindow.endMonth
            );
            const isPeak = activeForMonth.some(w => w.peakActivityMonths.includes(monthNum));
            return (
              <div key={month} className="text-center">
                <div className={`text-xs text-slate-400 mb-2 ${isPeak ? 'text-amber-300 font-semibold' : ''}`}>{month}</div>
                <div className="h-24 bg-slate-900/50 rounded border border-white/5 relative overflow-hidden">
                  {activeForMonth.length > 0 && (
                    <div
                      className={`absolute bottom-0 w-full ${isPeak ? 'bg-amber-500/40' : 'bg-amber-500/20'} transition-all`}
                      style={{ height: `${(activeForMonth.length / windows.length) * 100}%` }}
                    />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center text-xs text-white font-medium">
                    {activeForMonth.length}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <AdvancedFooter />
    </main>
  );
}
