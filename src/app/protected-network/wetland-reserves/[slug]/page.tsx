'use client';

import React from 'react';
import { notFound } from 'next/navigation';
import { ProtectedAreaDetailPage } from '@/components/common/ProtectedAreaDetailPage';
import { getProtectedAreas, ProtectedArea } from '@/data/protected-network';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function WetlandReserveDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const area = getProtectedAreas.wetlandReserves().find(pa => pa.slug === slug);

  if (!area) {
    notFound();
  }

  const relatedAreas = getProtectedAreas.wetlandReserves().filter(pa => pa.slug !== slug);

  return <ProtectedAreaDetailPage area={area} relatedAreas={relatedAreas} />;
}
