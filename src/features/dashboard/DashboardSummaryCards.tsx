import { useQuery } from '@tanstack/react-query';
import { insightTrackApi } from '../../api/insightTrackApi';
import { ErrorState } from '../../components/feedback/ErrorState';
import { LoadingState } from '../../components/feedback/LoadingState';
import { StatCard } from '../../components/ui/StatCard';
import { mapApiError } from '../../lib/apiErrors';
import { formatMetricValue } from '../../lib/format';
import { queryKeys } from '../../lib/queryKeys';

export function DashboardSummaryCards() {
  const summaryQuery = useQuery({
    queryKey: queryKeys.dashboardSummary,
    queryFn: insightTrackApi.getDashboardSummary,
  });

  if (summaryQuery.isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="rounded-xl border border-slate-200 bg-white p-6">
            <LoadingState message="Loading summary..." size="sm" />
          </div>
        ))}
      </div>
    );
  }

  if (summaryQuery.isError) {
    return (
      <ErrorState
        description={mapApiError(summaryQuery.error)}
        onRetry={() => summaryQuery.refetch()}
      />
    );
  }

  const summary = summaryQuery.data!;

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard label="Total metrics" value={summary.totalMetrics} hint="Tracked events" />
      <StatCard
        label="Weekly progress"
        value={formatMetricValue(summary.weeklyProgress, 'pts')}
        hint="Current demo week"
      />
      <StatCard
        label="Monthly progress"
        value={formatMetricValue(summary.monthlyProgress, 'pts')}
        hint="Current demo month"
      />
      <StatCard label="Top category" value={summary.topCategory} hint="Highest combined value" />
    </div>
  );
}
