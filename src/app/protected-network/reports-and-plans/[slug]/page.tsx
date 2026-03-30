'use client';

import React from 'react';
import { notFound } from 'next/navigation';
import { ReportDetailPage } from '@/components/common/ReportDetailPage';
import { getReports, Report } from '@/data/protected-network';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ReportDetailPageWrapper({ params }: PageProps) {
  const { slug } = await params;
  const report = getReports.bySlug(slug);

  if (!report) {
    notFound();
  }

  const relatedReports = getReports.all().filter(r => r.slug !== slug);

  return <ReportDetailPage report={report} relatedReports={relatedReports} />;
}
