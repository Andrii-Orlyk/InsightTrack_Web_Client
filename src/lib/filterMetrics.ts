import type { Metric, MetricFilters } from '../types/metric';

function toDateOnlyKey(value: string): string | null {
  if (!value) return null;

  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return value;
  }

  const timestamp = Date.parse(value);

  if (Number.isNaN(timestamp)) {
    return null;
  }

  return new Date(timestamp).toISOString().slice(0, 10);
}

export function filterMetrics(metrics: Metric[], filters: MetricFilters): Metric[] {
  const search = filters.search?.trim().toLowerCase() ?? '';

  return metrics.filter((metric) => {
    if (search) {
      const haystack = `${metric.title} ${metric.note ?? ''} ${metric.category}`.toLowerCase();
      if (!haystack.includes(search)) {
        return false;
      }
    }

    if (filters.categoryId && metric.categoryId !== filters.categoryId) {
      return false;
    }

    if (filters.type && metric.type !== filters.type) {
      return false;
    }

    if (filters.from || filters.to) {
      const metricDate = toDateOnlyKey(metric.date);

      if (!metricDate) {
        return false;
      }

      const fromDate = filters.from ? toDateOnlyKey(filters.from) : null;
      const toDate = filters.to ? toDateOnlyKey(filters.to) : null;

      if (fromDate && metricDate < fromDate) return false;
      if (toDate && metricDate > toDate) return false;
    }

    return true;
  });
}
