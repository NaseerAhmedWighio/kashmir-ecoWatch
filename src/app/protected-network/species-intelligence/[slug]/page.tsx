'use client';

import React from 'react';
import { notFound } from 'next/navigation';
import { SpeciesDetailPage } from '@/components/common/SpeciesDetailPage';
import { getSpeciesProfiles, SpeciesProfile } from '@/data/protected-network';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function SpeciesDetailPageWrapper({ params }: PageProps) {
  const { slug } = await params;
  const species = getSpeciesProfiles.bySlug(slug);

  if (!species) {
    notFound();
  }

  const relatedSpecies = getSpeciesProfiles.all().filter(s => s.slug !== slug);

  return <SpeciesDetailPage species={species} relatedSpecies={relatedSpecies} />;
}
