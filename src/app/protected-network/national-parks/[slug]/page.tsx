'use client';

import React from 'react';
import { notFound } from 'next/navigation';
import { ProtectedAreaDetailPage } from '@/components/common/ProtectedAreaDetailPage';
import { getProtectedAreas, ProtectedArea } from '@/data/protected-network';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function NationalParkDetailPage({ params }: PageProps) {
  const unwrappedParams = React.use(params);
  const area = getProtectedAreas.nationalParks().find(pa => pa.slug === unwrappedParams.slug);

  if (!area) {
    notFound();
  }

  const relatedAreas = getProtectedAreas.nationalParks().filter(pa => pa.slug !== unwrappedParams.slug);

  return <ProtectedAreaDetailPage area={area} relatedAreas={relatedAreas} />;
}
