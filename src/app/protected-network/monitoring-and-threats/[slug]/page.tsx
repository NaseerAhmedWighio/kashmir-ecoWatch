'use client';

import React from 'react';
import { notFound } from 'next/navigation';
import { ThreatDetailPage } from '@/components/common/ThreatDetailPage';
import { getThreats, Threat } from '@/data/protected-network';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ThreatDetailPageWrapper({ params }: PageProps) {
  const { slug } = await params;
  const threat = getThreats.bySlug(slug);

  if (!threat) {
    notFound();
  }

  const relatedThreats = getThreats.all().filter(t => t.slug !== slug);

  return <ThreatDetailPage threat={threat} relatedThreats={relatedThreats} />;
}
