import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { PageShell } from '../components/common/PageShell';
import { MetricForm } from '../features/forms';
import { MetricsFilters, MetricsTable } from '../features/tables';
import { insightTrackApi } from '../api/insightTrackApi';
import { queryKeys } from '../lib/queryKeys';
import type { Metric, MetricFilters } from '../types/metric';

const emptyFilters: MetricFilters = {};

export function MetricsPage() {
  const [filters, setFilters] = useState<MetricFilters>(emptyFilters);
  const [editingMetric, setEditingMetric] = useState<Metric | null>(null);

  const categoriesQuery = useQuery({
    queryKey: queryKeys.categories,
    queryFn: insightTrackApi.getCategories,
  });

  const metricsQuery = useQuery({
    queryKey: queryKeys.metrics(filters),
    queryFn: () => insightTrackApi.getMetrics(filters),
  });

  const hasActiveFilters = useMemo(
    () => Boolean(filters.search || filters.categoryId || filters.type || filters.from || filters.to),
    [filters]
  );

  return (
    <PageShell
      title="Metrics"
      description="Track, filter, create, edit, and delete metric events in demo mode."
    >
      <div className="space-y-6">
        <MetricsFilters
          filters={filters}
          categories={categoriesQuery.data ?? []}
          onChange={setFilters}
        />

        <MetricForm
          metric={editingMetric}
          onSuccess={() => setEditingMetric(null)}
          onCancel={editingMetric ? () => setEditingMetric(null) : undefined}
        />

        <MetricsTable
          metrics={metricsQuery.data?.items ?? []}
          isLoading={metricsQuery.isLoading}
          isError={metricsQuery.isError}
          error={metricsQuery.error}
          onRetry={() => metricsQuery.refetch()}
          onEdit={setEditingMetric}
          hasActiveFilters={hasActiveFilters}
        />
      </div>
    </PageShell>
  );
}
