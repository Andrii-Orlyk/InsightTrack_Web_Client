import type { Metric, MetricFilters } from '../types/metric';

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

    if (filters.from && metric.date < filters.from) {
      return false;
    }

    if (filters.to && metric.date > filters.to) {
      return false;
    }

    return true;
  });
}
