'use client';

import React from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Map, TrendingUp, ArrowRight, Search, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { getCorridors } from '@/data/protected-network';
import { Heading } from '@/components/common/Heading';

export default function CorridorsPage() {
  const corridors = getCorridors.all();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'danger';
      case 'High': return 'warning';
      case 'Medium': return 'info';
      default: return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'success';
      case 'Degraded': return 'warning';
      case 'Threatened': return 'danger';
      default: return 'default';
    }
  };

  return (
    <main className="min-h-screen bg-slate-950">
      <Heading
        title={<><span className="block whitespace-nowrap">Kashmir Corridors</span><span className="block whitespace-nowrap bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">and Connectivity</span></>}
        subtitle="Landscape connectivity and habitat linkage analysis across Kashmir's protected area network. Identifies wildlife corridors, fragmentation zones, ecological bottlenecks, and movement pathways for conservation planning and spatial management."
        icon={<Map className="w-6 h-6 text-emerald-400" />}
        label="Ecological Intelligence"
        breadcrumbs={[{ label: 'Corridors & Connectivity' }]}
        images={['/images/protected-network.png', '/images/bear.png', '/images/tiger.png', '/images/markhor.png']}
        actions={
          <>
            <Button className="bg-gradient-to-r from-pink-600 to-pink-500" icon={<Search className="w-5 h-5" />}>Search Corridors</Button>
            <Button variant="outline" className="border-white/20 text-white" icon={<Map className="w-5 h-5" />}>Connectivity Map</Button>
          </>
        }
      />

      <div className="container mx-auto px-6 -mt-8 relative z-20 mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="glass-intense border-white/10 p-4 lg:p-5" padding="none">
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-8 gap-1 sm:gap-2">
              {[
                { label: 'Identified Corridors', value: corridors.length, icon: Map },
                { label: 'Critical Priority', value: corridors.filter(c => c.priority === 'Critical').length, icon: TrendingUp },
                { label: 'Total Length', value: '287 km', icon: Search },
                { label: 'Active Status', value: corridors.filter(c => c.status === 'Active').length, icon: Activity },
                { label: 'Degraded', value: corridors.filter(c => c.status === 'Degraded').length, icon: TrendingUp },
                { label: 'Threatened', value: corridors.filter(c => c.status === 'Threatened').length, icon: Map },
                { label: 'PA Connections', value: 24, icon: Activity },
                { label: 'Frag. Zones', value: 11, icon: Search },
              ].map((metric, idx) => (
                <div key={idx} className="py-2 px-1 lg:py-3 lg:px-2 rounded-xl text-center min-w-0">
                  <metric.icon className="w-4 h-4 text-emerald-500 mx-auto mb-1" />
                  <div className="text-base sm:text-lg lg:text-base xl:text-lg font-bold text-white tabular-nums leading-tight truncate">
                    {metric.value}
                  </div>
                  <div className="text-[9px] sm:text-[10px] lg:text-[9px] xl:text-[10px] text-slate-500 uppercase tracking-wide mt-0.5 leading-tight break-words">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      <div className="container mx-auto px-6 py-8">
          {corridors.map((corridor, index) => (
            <motion.a
              key={corridor.id}
              href={`/protected-network/corridors-and-connectivity/${corridor.slug}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="block group"
            >
              <Card className="card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-white group-hover:text-pink-300 transition-colors">{corridor.name}</h3>
                      <Badge variant={getPriorityColor(corridor.priority)} size="sm">
                        {corridor.priority} Priority
                      </Badge>
                      <Badge variant={getStatusColor(corridor.status)} size="sm">
                        {corridor.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-slate-400">
                      <span>Type: <strong className="text-white">{corridor.type}</strong></span>
                      <span>Length: <strong className="text-white">{corridor.length}</strong></span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-pink-400 group-hover:text-pink-300 transition-colors" icon={<ArrowRight className="w-4 h-4" />} />
                </div>
              </Card>
            </motion.a>
          ))}
        </div>


      
    </main>
  );
}
