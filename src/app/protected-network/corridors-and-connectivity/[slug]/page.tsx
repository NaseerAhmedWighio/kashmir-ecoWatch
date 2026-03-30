'use client';

import React from 'react';
import { notFound } from 'next/navigation';
import { CorridorDetailPage } from '@/components/common/CorridorDetailPage';
import { getCorridors, Corridor } from '@/data/protected-network';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CorridorDetailPageWrapper({ params }: PageProps) {
  const { slug } = await params;
  const corridor = getCorridors.bySlug(slug);

  if (!corridor) {
    notFound();
  }

  const relatedCorridors = getCorridors.all().filter(c => c.slug !== slug);

  return <CorridorDetailPage corridor={corridor} relatedCorridors={relatedCorridors} />;
}
