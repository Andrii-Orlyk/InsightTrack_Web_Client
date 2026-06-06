import type { MetricFilters } from '../types/metric';

export const queryKeys = {
  categories: ['categories'] as const,
  metrics: (filters?: MetricFilters) => ['metrics', filters ?? {}] as const,
  metric: (id: string) => ['metrics', id] as const,
  dashboardSummary: ['dashboard', 'summary'] as const,
  reportSummary: (period: string) => ['reports', 'summary', period] as const,
};
