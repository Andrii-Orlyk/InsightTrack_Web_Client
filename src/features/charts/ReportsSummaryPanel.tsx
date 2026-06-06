import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { insightTrackApi } from '../../api/insightTrackApi';
import { ErrorState } from '../../components/feedback/ErrorState';
import { LoadingState } from '../../components/feedback/LoadingState';
import { Button } from '../../components/ui/Button';
import { Card, CardBody, CardTitle } from '../../components/ui/Card';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { mapApiError } from '../../lib/apiErrors';
import { formatMetricValue } from '../../lib/format';
import { queryKeys } from '../../lib/queryKeys';
import type { ReportSummary } from '../../types/metric';
import { CategoryBreakdown } from './CategoryBreakdown';
import { TrendBars } from './TrendBars';

const periods: ReportSummary['period'][] = ['daily', 'weekly', 'monthly'];

export function ReportsSummaryPanel() {
  const [period, setPeriod] = useState<ReportSummary['period']>('weekly');

  const reportQuery = useQuery({
    queryKey: queryKeys.reportSummary(period),
    queryFn: () => insightTrackApi.getReportSummary(period),
  });

  if (reportQuery.isLoading) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-8">
        <LoadingState message="Loading report summary..." />
      </div>
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

  const report = reportQuery.data!;

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Report period"
        description="Switch between daily, weekly, and monthly demo summaries."
        actions={
          <div className="flex flex-wrap gap-2">
            {periods.map((item) => (
              <Button
                key={item}
                size="sm"
                variant={period === item ? 'primary' : 'secondary'}
                onClick={() => setPeriod(item)}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Button>
            ))}
          </div>
        }
      />

      <Card>
        <CardBody>
          <CardTitle
            title={`${report.period.charAt(0).toUpperCase()}${report.period.slice(1)} total`}
            description="Combined metric values for the selected period."
          />
          <p className="mt-4 text-3xl font-semibold text-slate-900">
            {formatMetricValue(report.totalValue, 'pts')}
          </p>
        </CardBody>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardBody className="space-y-4">
            <CardTitle title="Category breakdown" />
            <CategoryBreakdown items={report.categoryBreakdown} />
          </CardBody>
        </Card>
        <Card>
          <CardBody className="space-y-4">
            <CardTitle title="Trend overview" />
            <TrendBars items={report.trendItems} />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
