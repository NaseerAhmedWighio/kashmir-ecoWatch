// Cross-Module Link Strip Component
// Navigation to related modules (Protected Areas, Biodiversity, Water Systems, etc.)

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  Shield, Leaf, Droplets, Calendar, AlertTriangle, Map,
  Building2, ArrowRight, Layers, Bird, Trees, Mountain
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export interface ModuleLink {
  id: string;
  module: string;
  label: string;
  description: string;
  route: string;
  icon: React.ElementType;
  color: string;
  count?: number;
  enabled: boolean;
}

interface CrossModuleLinkStripProps {
  context?: {
    district?: string;
    species?: string;
    protectedArea?: string;
    habitat?: string;
  };
}

const defaultModuleLinks: ModuleLink[] = [
  {
    id: 'protected-areas',
    module: 'Protected Areas',
    label: 'Protected Areas',
    description: 'National parks, wildlife sanctuaries, and conservation reserves',
    route: '/protected-areas',
    icon: Shield,
    color: 'from-amber-500 to-orange-600',
    count: 12,
    enabled: true
  },
  {
    id: 'biodiversity',
    module: 'Biodiversity',
    label: 'Species Database',
    description: 'Mammals, birds, plants, and medicinal species profiles',
    route: '/biodiversity',
    icon: Leaf,
    color: 'from-emerald-500 to-green-600',
    count: 2847,
    enabled: true
  },
  {
    id: 'water-systems',
    module: 'Water Systems',
    label: 'Wetlands & Water Bodies',
    description: 'Lakes, wetlands, rivers, and aquatic ecosystems',
    route: '/water-systems',
    icon: Droplets,
    color: 'from-blue-500 to-cyan-600',
    count: 456,
    enabled: true
  },
  {
    id: 'seasonal-ecology',
    module: 'Seasonal Ecology',
    label: 'Migration & Bloom Calendar',
    description: 'Seasonal events, migration windows, and phenology',
    route: '/seasonal-ecology',
    icon: Calendar,
    color: 'from-pink-500 to-rose-600',
    enabled: true
  },
  {
    id: 'risk-monitoring',
    module: 'Risk & Monitoring',
    label: 'Risk Profiles',
    description: 'High-altitude risks, wildlife conflict, and hazards',
    route: '/risk-monitoring',
    icon: AlertTriangle,
    color: 'from-red-500 to-orange-600',
    enabled: true
  },
  {
    id: 'district-profiles',
    module: 'District Profiles',
    label: 'District Intelligence',
    description: 'Ecological profiles for all Kashmir districts',
    route: '/districts',
    icon: Building2,
    color: 'from-violet-500 to-purple-600',
    count: 20,
    enabled: true
  },
  {
    id: 'atlas',
    module: 'Atlas',
    label: 'Interactive Map',
    description: 'GIS layers, spatial analysis, and mapping tools',
    route: '/atlas',
    icon: Map,
    color: 'from-sky-500 to-blue-600',
    enabled: true
  },
];

export function CrossModuleLinkStrip({ context }: CrossModuleLinkStripProps) {
  const router = useRouter();
  
  // Customize links based on context
  const contextualLinks: ModuleLink[] = context 
    ? defaultModuleLinks.map(link => {
        // Add context-specific query params
        const params = new URLSearchParams();
        if (context.district) params.set('district', context.district);
        if (context.species) params.set('species', context.species);
        if (context.protectedArea) params.set('pa', context.protectedArea);
        if (context.habitat) params.set('habitat', context.habitat);
        
        const queryString = params.toString();
        return {
          ...link,
          route: queryString ? `${link.route}?${queryString}` : link.route
        };
      })
    : defaultModuleLinks;
  
  return (
    <div className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg">
              <Layers className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">Related Intelligence</h2>
              <p className="text-slate-400">Explore connected ecological data across modules</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {contextualLinks.map((link, index) => {
            const Icon = link.icon;
            
            return (
              <motion.div
                key={link.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card
                  className="glass-light border-white/10 hover:border-white/20 transition-all p-5 h-full cursor-pointer group"
                  onClick={() => link.enabled && router.push(link.route)}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${link.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-bold text-white group-hover:text-violet-400 transition-colors line-clamp-1">
                        {link.label}
                      </h3>
                      {link.count !== undefined && (
                        <Badge variant="outline" size="sm" className="mt-1 border-white/10 text-xs">
                          {link.count.toLocaleString()} entities
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-sm text-slate-400 mb-4 line-clamp-2 leading-relaxed">
                    {link.description}
                  </p>
                  
                  <div className="flex items-center text-xs font-medium text-violet-400 group-hover:text-violet-300 transition-colors">
                    <span>Explore Module</span>
                    <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                  
                  {!link.enabled && (
                    <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center">
                      <Badge variant="outline" size="sm" className="border-slate-600 text-slate-400">
                        Coming Soon
                      </Badge>
                    </div>
                  )}
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
