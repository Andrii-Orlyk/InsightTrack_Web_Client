import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { insightTrackApi } from '../../api/insightTrackApi';
import { ErrorState } from '../../components/feedback/ErrorState';
import { LoadingState } from '../../components/feedback/LoadingState';
import { ROUTES } from '../../components/navigation/navItems';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { SectionHeader } from '../../components/ui/SectionHeader';
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableShell,
} from '../../components/ui/Table';
import { EmptyState } from '../../components/feedback/EmptyState';
import { mapApiError } from '../../lib/apiErrors';
import { formatDate, formatMetricValue } from '../../lib/format';
import { queryKeys } from '../../lib/queryKeys';

const statusVariant = {
  active: 'success',
  pending: 'warning',
  archived: 'outline',
} as const;

export function DashboardRecentMetrics() {
  const summaryQuery = useQuery({
    queryKey: queryKeys.dashboardSummary,
    queryFn: insightTrackApi.getDashboardSummary,
  });

  if (summaryQuery.isLoading) {
    return <LoadingState message="Loading recent activity..." />;
  }

  if (summaryQuery.isError) {
    return (
      <ErrorState
        description={mapApiError(summaryQuery.error)}
        onRetry={() => summaryQuery.refetch()}
      />
    );
  }

  const recentActivity = summaryQuery.data!.recentActivity;

  return (
    <section className="space-y-4">
      <SectionHeader
        title="Recent activity"
        description="Latest metric updates from your demo dataset."
        actions={
          <Link to={ROUTES.metrics}>
            <Button variant="secondary" size="sm">
              View all metrics
            </Button>
          </Link>
        }
      />
      <TableShell
        caption="Recent metrics"
        isEmpty={recentActivity.length === 0}
        emptyState={
          <EmptyState
            title="No recent metrics"
            description="Create a metric to see recent activity here."
          />
        }
      >
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentActivity.map((metric) => (
            <TableRow key={metric.id}>
              <TableCell>{formatDate(metric.date)}</TableCell>
              <TableCell>{metric.title}</TableCell>
              <TableCell>{metric.category}</TableCell>
              <TableCell>{formatMetricValue(metric.value, metric.unit)}</TableCell>
              <TableCell>
                <Badge variant={statusVariant[metric.status]}>{metric.status}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableShell>
    </section>
  );
}
