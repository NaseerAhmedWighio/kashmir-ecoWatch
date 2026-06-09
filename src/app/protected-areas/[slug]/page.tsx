'use client';

import React from 'react';
import { notFound } from 'next/navigation';
import { ProtectedAreaDetailPage } from '@/components/common/ProtectedAreaDetailPage';
import { getProtectedAreas } from '@/data/protected-network';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ProtectedAreaSlugPage({ params }: PageProps) {
  const unwrappedParams = React.use(params);
  const area = getProtectedAreas.bySlug(unwrappedParams.slug);

  if (!area) {
    notFound();
  }

  const relatedAreas = getProtectedAreas.all().filter(pa => pa.slug !== unwrappedParams.slug).slice(0, 4);

  return <ProtectedAreaDetailPage area={area} relatedAreas={relatedAreas} />;
}
