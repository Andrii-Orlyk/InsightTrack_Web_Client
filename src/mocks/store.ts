import type { Category, DashboardSummary, Metric, MetricFilters, ReportSummary } from '../types/metric';
import { filterMetrics } from '../lib/filterMetrics';
import { cloneSeedCategories, cloneSeedMetrics } from './data/seed';

let metricsStore = cloneSeedMetrics();
let categoriesStore = cloneSeedCategories();

export function resetMockStore(): void {
  metricsStore = cloneSeedMetrics();
  categoriesStore = cloneSeedCategories();
}

export function getMockCategories(): Category[] {
  return categoriesStore.map((category) => ({ ...category }));
}

export function getMockMetrics(filters: MetricFilters = {}): Metric[] {
  return filterMetrics(metricsStore, filters);
}

export function getMockMetricById(id: string): Metric | undefined {
  return metricsStore.find((metric) => metric.id === id);
}

export function createMockMetric(input: Omit<Metric, 'id' | 'category'> & { category?: string }): Metric {
  const category = categoriesStore.find((item) => item.id === input.categoryId);
  const metric: Metric = {
    id: `metric-${Date.now()}`,
    title: input.title,
    categoryId: input.categoryId,
    category: category?.name ?? input.category ?? 'Unknown',
    type: input.type,
    value: input.value,
    unit: input.unit,
    date: input.date,
    note: input.note,
    status: input.status,
  };
  metricsStore = [metric, ...metricsStore];
  return metric;
}

export function updateMockMetric(id: string, input: Partial<Metric>): Metric | undefined {
  const index = metricsStore.findIndex((metric) => metric.id === id);
  if (index === -1) {
    return undefined;
  }

  const category = input.categoryId
    ? categoriesStore.find((item) => item.id === input.categoryId)
    : undefined;

  const updated: Metric = {
    ...metricsStore[index],
    ...input,
    category: category?.name ?? metricsStore[index].category,
  };

  metricsStore[index] = updated;
  return updated;
}

export function deleteMockMetric(id: string): boolean {
  const next = metricsStore.filter((metric) => metric.id !== id);
  const deleted = next.length !== metricsStore.length;
  metricsStore = next;
  return deleted;
}

function getTopCategory(items: Metric[]): string {
  const totals = new Map<string, number>();
  items.forEach((metric) => {
    totals.set(metric.category, (totals.get(metric.category) ?? 0) + metric.value);
  });

  let topCategory = 'None';
  let topValue = 0;
  totals.forEach((value, category) => {
    if (value > topValue) {
      topValue = value;
      topCategory = category;
    }
  });

  return topCategory;
}

export function buildDashboardSummary(): DashboardSummary {
  const recentActivity = [...metricsStore]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5);

  const weeklyItems = metricsStore.filter((metric) => metric.date >= '2026-06-01');
  const monthlyItems = metricsStore;

  return {
    totalMetrics: metricsStore.length,
    totalValue: metricsStore.reduce((sum, metric) => sum + metric.value, 0),
    weeklyProgress: weeklyItems.reduce((sum, metric) => sum + metric.value, 0),
    monthlyProgress: monthlyItems.reduce((sum, metric) => sum + metric.value, 0),
    topCategory: getTopCategory(metricsStore),
    recentActivity,
  };
}

export function buildReportSummary(period: ReportSummary['period']): ReportSummary {
  const source =
    period === 'daily'
      ? metricsStore.filter((metric) => metric.date === '2026-06-05')
      : period === 'weekly'
        ? metricsStore.filter((metric) => metric.date >= '2026-06-01')
        : metricsStore;

  const totalValue = source.reduce((sum, metric) => sum + metric.value, 0);
  const categoryTotals = new Map<string, { categoryId: string; category: string; value: number }>();

  source.forEach((metric) => {
    const current = categoryTotals.get(metric.categoryId) ?? {
      categoryId: metric.categoryId,
      category: metric.category,
      value: 0,
    };
    current.value += metric.value;
    categoryTotals.set(metric.categoryId, current);
  });

  const categoryBreakdown = Array.from(categoryTotals.values()).map((item) => ({
    ...item,
    percentage: totalValue ? Math.round((item.value / totalValue) * 100) : 0,
  }));

  const trendItems = source.slice(0, 5).map((metric) => ({
    label: metric.title,
    value: metric.value,
  }));

  return {
    id: `report-${period}`,
    period,
    totalValue,
    categoryBreakdown,
    trendItems,
  };
}

export function parseMetricFilters(url: URL): MetricFilters {
  return {
    search: url.searchParams.get('search') ?? undefined,
    categoryId: url.searchParams.get('categoryId') ?? undefined,
    type: (url.searchParams.get('type') as MetricFilters['type']) ?? undefined,
    from: url.searchParams.get('from') ?? undefined,
    to: url.searchParams.get('to') ?? undefined,
  };
}
