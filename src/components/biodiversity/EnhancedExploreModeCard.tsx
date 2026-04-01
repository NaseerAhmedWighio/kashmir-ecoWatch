// Enhanced Explore Mode Card Component
// Upgraded intelligence mode exploration with counts and descriptions

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface EnhancedExploreModeCardProps {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
  href: string;
  count?: number;
  countLabel?: string;
  color: string;
  delay?: number;
}

export function EnhancedExploreModeCard({
  id,
  label,
  description,
  icon: Icon,
  href,
  count,
  countLabel = 'entities',
  color,
  delay = 0
}: EnhancedExploreModeCardProps) {
  const router = useRouter();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
    >
      <Card
        className="glass-light border-white/10 hover:border-white/20 transition-all p-6 cursor-pointer group h-full"
        onClick={() => router.push(href)}
      >
        <div className="flex items-start gap-4 mb-4">
          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg flex-shrink-0`}>
            <Icon className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-white group-hover:text-slate-200 transition-colors mb-1">
              {label}
            </h3>
            {count !== undefined && (
              <Badge variant="outline" size="sm" className="border-white/10 text-xs">
                <span className="font-bold text-white mr-1">{count.toLocaleString()}</span>
                {countLabel}
              </Badge>
            )}
          </div>
        </div>
        
        <p className="text-sm text-slate-400 mb-4 leading-relaxed">
          {description}
        </p>
        
        <div className="flex items-center text-xs font-medium text-slate-400 group-hover:text-white transition-colors">
          <span>Explore {label}</span>
          <svg className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </Card>
    </motion.div>
  );
}
