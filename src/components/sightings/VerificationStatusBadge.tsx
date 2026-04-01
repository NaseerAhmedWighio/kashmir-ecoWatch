// Verification Status Badge Component
// Enhanced verification indicators for sightings

import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { VerificationStatus } from '@/data/trails-sightings';
import { CheckCircle, Eye, Users, Clock } from 'lucide-react';

interface VerificationStatusBadgeProps {
  status: VerificationStatus;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const statusConfig = {
  verified: {
    icon: CheckCircle,
    color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    label: 'Verified',
    description: 'Expert-verified observation'
  },
  reviewed: {
    icon: Eye,
    color: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    label: 'Reviewed',
    description: 'Under expert review'
  },
  community: {
    icon: Users,
    color: 'bg-sky-500/20 text-sky-400 border-sky-500/30',
    label: 'Community',
    description: 'Community-submitted'
  },
  pending: {
    icon: Clock,
    color: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
    label: 'Pending',
    description: 'Awaiting verification'
  }
};

export function VerificationStatusBadge({ 
  status, 
  size = 'sm',
  showLabel = true 
}: VerificationStatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;
  
  return (
    <Badge 
      size={size}
      className={`border ${config.color} ${!showLabel ? 'px-2' : ''}`}
    >
      <Icon className={`w-3 h-3 ${showLabel ? 'mr-1' : ''}`} />
      {showLabel && config.label}
    </Badge>
  );
}
