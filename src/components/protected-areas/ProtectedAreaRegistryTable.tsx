// Protected Area Registry Table Component
// Full registry table view with management, threat, and access status

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ProtectedAreaRegistry } from '@/data/protected-area-registry';
import {
  Shield, AlertTriangle, Lock, MapPin, TrendingUp,
  Eye, Activity, ArrowRight, Search, Filter
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface ProtectedAreaRegistryTableProps {
  data: ProtectedAreaRegistry[];
  onViewDetails?: (pa: ProtectedAreaRegistry) => void;
}

const managementStatusColors = {
  'fully-managed': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  'partially-managed': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  'nominally-managed': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  'unmanaged': 'bg-red-500/20 text-red-400 border-red-500/30'
};

const threatStatusColors = {
  critical: 'bg-red-500/20 text-red-400 border-red-500/30',
  high: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  medium: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  low: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  minimal: 'bg-lime-500/20 text-lime-400 border-lime-500/30'
};

const accessStatusColors = {
  open: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  restricted: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  'permit-required': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  closed: 'bg-red-500/20 text-red-400 border-red-500/30',
  seasonal: 'bg-sky-500/20 text-sky-400 border-sky-500/30'
};

const encroachmentStatusColors = {
  severe: 'bg-red-500/20 text-red-400 border-red-500/30',
  moderate: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  low: 'bg-lime-500/20 text-lime-400 border-lime-500/30',
  none: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
};

const categoryColors = {
  national_park: 'from-emerald-500 to-teal-600',
  wildlife_sanctuary: 'from-blue-500 to-cyan-600',
  wetland_reserve: 'from-sky-500 to-blue-600',
  conservation_reserve: 'from-amber-500 to-orange-600',
  game_reserve: 'from-purple-500 to-pink-600',
  iba: 'from-violet-500 to-purple-600'
};

export function ProtectedAreaRegistryTable({ data, onViewDetails }: ProtectedAreaRegistryTableProps) {
  const router = useRouter();

  const getCategoryPath = (category: string) => {
    return category.replace('_', '-');
  };

  return (
    <Card className="glass-intense border-white/10 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider py-4 px-4">
                Protected Area
              </th>
              <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider py-4 px-4">
                Category
              </th>
              <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider py-4 px-4">
                Area
              </th>
              <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider py-4 px-4">
                District
              </th>
              <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider py-4 px-4">
                Management
              </th>
              <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider py-4 px-4">
                Threats
              </th>
              <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider py-4 px-4">
                Access
              </th>
              <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider py-4 px-4">
                Encroachment
              </th>
              <th className="text-right text-xs font-medium text-slate-400 uppercase tracking-wider py-4 px-4">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {data.map((pa, index) => (
              <motion.tr
                key={pa.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                className="hover:bg-white/5 transition-colors"
              >
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${categoryColors[pa.category]} flex items-center justify-center flex-shrink-0`}>
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{pa.name}</div>
                      <div className="text-xs text-slate-500">{pa.district}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <Badge variant="outline" size="sm" className="border-white/20 text-white text-xs capitalize">
                    {pa.category.replace('_', ' ')}
                  </Badge>
                </td>
                <td className="py-4 px-4">
                  <div className="text-sm text-white font-medium">{pa.areaSqKm} km²</div>
                </td>
                <td className="py-4 px-4">
                  <div className="text-sm text-slate-300">{pa.district}</div>
                </td>
                <td className="py-4 px-4">
                  <Badge size="sm" className={managementStatusColors[pa.managementStatus.status]}>
                    {pa.managementStatus.status.replace('-', ' ')}
                  </Badge>
                </td>
                <td className="py-4 px-4">
                  <Badge size="sm" className={threatStatusColors[pa.threatStatus.overall]}>
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    {pa.threatStatus.overall}
                  </Badge>
                </td>
                <td className="py-4 px-4">
                  <Badge size="sm" className={accessStatusColors[pa.accessStatus.status]}>
                    <Lock className="w-3 h-3 mr-1" />
                    {pa.accessStatus.status.replace('-', ' ')}
                  </Badge>
                </td>
                <td className="py-4 px-4">
                  <Badge size="sm" className={encroachmentStatusColors[pa.encroachmentWatch.status]}>
                    <Eye className="w-3 h-3 mr-1" />
                    {pa.encroachmentWatch.status}
                  </Badge>
                </td>
                <td className="py-4 px-4 text-right">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/5"
                    icon={<ArrowRight className="w-4 h-4" />}
                    onClick={() => router.push(`/protected-network/${getCategoryPath(pa.category)}/${pa.slug}`)}
                  >
                    View
                  </Button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {data.length === 0 && (
        <div className="text-center py-20">
          <Shield className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No protected areas found</h3>
          <p className="text-slate-400">Try adjusting your filters</p>
        </div>
      )}
    </Card>
  );
}
