'use client';

import React from 'react';
import { notFound } from 'next/navigation';
import { TrailDetailPage } from '@/components/common/TrailDetailPage';
import { getTrails, Trail } from '@/data/protected-network';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function TrailDetailPageWrapper({ params }: PageProps) {
  const { slug } = await params;
  const trail = getTrails.bySlug(slug);

  if (!trail) {
    notFound();
  }

  const relatedTrails = getTrails.all().filter(t => t.slug !== slug);

  return <TrailDetailPage trail={trail} relatedTrails={relatedTrails} />;
}
