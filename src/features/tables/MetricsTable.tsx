import { useMutation, useQueryClient } from '@tanstack/react-query';
import { insightTrackApi } from '../../api/insightTrackApi';
import { EmptyState } from '../../components/feedback/EmptyState';
import { ErrorState } from '../../components/feedback/ErrorState';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableShell,
} from '../../components/ui/Table';
import { mapApiError } from '../../lib/apiErrors';
import { formatDate, formatMetricValue } from '../../lib/format';
import { queryKeys } from '../../lib/queryKeys';
import type { Metric } from '../../types/metric';

const statusVariant = {
  active: 'success',
  pending: 'warning',
  archived: 'outline',
} as const;

type MetricsTableProps = {
  metrics: Metric[];
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  onRetry: () => void;
  onEdit: (metric: Metric) => void;
  hasActiveFilters: boolean;
};

export function MetricsTable({
  metrics,
  isLoading,
  isError,
  error,
  onRetry,
  onEdit,
  hasActiveFilters,
}: MetricsTableProps) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id: string) => insightTrackApi.deleteMetric(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['metrics'] });
      await queryClient.invalidateQueries({ queryKey: queryKeys.dashboardSummary });
      await queryClient.invalidateQueries({ queryKey: ['reports'] });
    },
  });

  if (isError) {
    return <ErrorState description={mapApiError(error)} onRetry={onRetry} />;
  }

  return (
    <TableShell
      caption="Metrics table"
      isLoading={isLoading}
      loadingMessage="Loading metrics..."
      isEmpty={!isLoading && metrics.length === 0}
      emptyState={
        <EmptyState
          title={hasActiveFilters ? 'No matching metrics' : 'No metrics yet'}
          description={
            hasActiveFilters
              ? 'Try adjusting your search or filter values.'
              : 'Create your first metric using the form above.'
          }
        />
      }
    >
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Value</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {metrics.map((metric) => (
          <TableRow key={metric.id}>
            <TableCell>{formatDate(metric.date)}</TableCell>
            <TableCell>{metric.title}</TableCell>
            <TableCell>{metric.category}</TableCell>
            <TableCell className="capitalize">{metric.type}</TableCell>
            <TableCell>{formatMetricValue(metric.value, metric.unit)}</TableCell>
            <TableCell>
              <Badge variant={statusVariant[metric.status]}>{metric.status}</Badge>
            </TableCell>
            <TableCell>
              <div className="flex flex-wrap gap-2">
                <Button variant="secondary" size="sm" onClick={() => onEdit(metric)}>
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  loading={deleteMutation.isPending && deleteMutation.variables === metric.id}
                  onClick={() => deleteMutation.mutate(metric.id)}
                >
                  Delete
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </TableShell>
  );
}
