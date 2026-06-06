import type {
  Category,
  CreateMetricInput,
  DashboardSummary,
  Metric,
  MetricFilters,
  MetricsListResponse,
  ReportSummary,
  UpdateMetricInput,
} from '../types/metric';
import { apiRequest } from './httpClient';

function toQueryString(filters: MetricFilters = {}): string {
  const params = new URLSearchParams();

  if (filters.search) params.set('search', filters.search);
  if (filters.categoryId) params.set('categoryId', filters.categoryId);
  if (filters.type) params.set('type', filters.type);
  if (filters.from) params.set('from', filters.from);
  if (filters.to) params.set('to', filters.to);

  const query = params.toString();
  return query ? `?${query}` : '';
}

export const insightTrackApi = {
  getCategories: () => apiRequest<Category[]>('/api/categories'),

  getMetrics: (filters?: MetricFilters) =>
    apiRequest<MetricsListResponse>(`/api/metrics${toQueryString(filters)}`),

  getMetric: (id: string) => apiRequest<Metric>(`/api/metrics/${id}`),

  createMetric: (input: CreateMetricInput) =>
    apiRequest<Metric, CreateMetricInput>('/api/metrics', { method: 'POST', body: input }),

  updateMetric: (id: string, input: UpdateMetricInput) =>
    apiRequest<Metric, UpdateMetricInput>(`/api/metrics/${id}`, { method: 'PUT', body: input }),

  deleteMetric: (id: string) => apiRequest<{ id: string }>(`/api/metrics/${id}`, { method: 'DELETE' }),

  getDashboardSummary: () => apiRequest<DashboardSummary>('/api/dashboard/summary'),

  getReportSummary: (period: ReportSummary['period']) =>
    apiRequest<ReportSummary>(`/api/reports/summary?period=${period}`),
};
