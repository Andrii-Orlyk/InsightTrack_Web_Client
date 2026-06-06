import { useQuery } from '@tanstack/react-query';
import { insightTrackApi } from '../../api/insightTrackApi';
import { ErrorState } from '../../components/feedback/ErrorState';
import { LoadingState } from '../../components/feedback/LoadingState';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { TrendBars } from '../charts/TrendBars';
import { mapApiError } from '../../lib/apiErrors';
import { queryKeys } from '../../lib/queryKeys';

export function DashboardTrendSection() {
  const reportQuery = useQuery({
    queryKey: queryKeys.reportSummary('weekly'),
    queryFn: () => insightTrackApi.getReportSummary('weekly'),
  });

  if (reportQuery.isLoading) {
    return (
      <section className="rounded-xl border border-slate-200 bg-white p-6">
        <LoadingState message="Loading trend data..." />
      </section>
    );
  }

  if (reportQuery.isError) {
    return (
      <ErrorState
        description={mapApiError(reportQuery.error)}
        onRetry={() => reportQuery.refetch()}
      />
    );
  }

  return (
    <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-6">
      <SectionHeader
        title="Weekly trend overview"
        description="Chart-ready bars built from demo report data."
      />
      <TrendBars items={reportQuery.data!.trendItems} emptyMessage="No weekly trend data yet." />
    </section>
  );
}
