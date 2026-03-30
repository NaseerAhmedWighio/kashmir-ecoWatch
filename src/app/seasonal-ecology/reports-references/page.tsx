import { SeasonalListingPage } from '@/components/common/SeasonalListingPage';
import { getSeasonalEcologyData } from '@/data/seasonal-ecology';

export default function ReportsReferencesPage() {
  const reports = getSeasonalEcologyData.reports.all();

  const districts = Array.from(new Set(reports.flatMap(r => r.linkedDistricts)));
  const reportTypes = Array.from(new Set(reports.map(r => r.reportType)));
  const seasonalFocus = Array.from(new Set(reports.flatMap(r => r.seasonalFocus)));

  return (
    <SeasonalListingPage
      title="All Seasonal Reports and References"
      subtitle="Kashmir seasonal and phenology-related scientific evidence"
      icon="FileText"
      color="from-slate-500 to-gray-600"
      entities={reports}
      entityVariant="report"
      metrics={[
        { label: 'Total Reports', value: reports.length, icon: 'FileText' as const },
        { label: 'Scientific Studies', value: reports.filter(r => r.reportType === 'scientific-study').length, icon: 'BookOpen' as const },
        { label: 'Monitoring Reports', value: reports.filter(r => r.reportType === 'monitoring-report').length, icon: 'ClipboardList' as const },
        { label: 'Assessments', value: reports.filter(r => r.reportType === 'climate-assessment').length, icon: 'ChartBar' as const },
      ]}
      filters={{
        districts: districts as string[],
        seasons: seasonalFocus as string[],
        additionalFilters: [
          { label: 'Report Type', options: reportTypes as string[] },
        ],
      }}
      detailPageBaseRoute="/seasonal-ecology/reports-references"
      mapPreviewEnabled={false}
    />
  );
}
