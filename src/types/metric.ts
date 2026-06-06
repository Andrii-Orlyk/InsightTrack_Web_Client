export type MetricStatus = 'active' | 'pending' | 'archived';
export type MetricType = 'count' | 'duration' | 'currency' | 'percentage';

export interface Metric {
  id: string;
  title: string;
  categoryId: string;
  category: string;
  type: MetricType;
  value: number;
  unit: string;
  date: string;
  note?: string;
  status: MetricStatus;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  label: string;
}

export interface DashboardSummary {
  totalMetrics: number;
  totalValue: number;
  weeklyProgress: number;
  monthlyProgress: number;
  topCategory: string;
  recentActivity: Metric[];
}

export interface ReportSummary {
  id: string;
  period: 'daily' | 'weekly' | 'monthly';
  totalValue: number;
  categoryBreakdown: ReportCategoryBreakdown[];
  trendItems: ReportTrendItem[];
}

export interface ReportCategoryBreakdown {
  categoryId: string;
  category: string;
  value: number;
  percentage: number;
}

export interface ReportTrendItem {
  label: string;
  value: number;
}

export interface MetricFilters {
  search?: string;
  categoryId?: string;
  type?: MetricType | '';
  from?: string;
  to?: string;
}

export interface CreateMetricInput {
  title: string;
  categoryId: string;
  type: MetricType;
  value: number;
  unit: string;
  date: string;
  note?: string;
  status: MetricStatus;
}

export type UpdateMetricInput = CreateMetricInput;

export interface MetricsListResponse {
  items: Metric[];
  totalCount: number;
}
