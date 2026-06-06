import { http, HttpResponse } from 'msw';
import type { CreateMetricInput, UpdateMetricInput } from '../types/metric';
import {
  buildDashboardSummary,
  buildReportSummary,
  createMockMetric,
  deleteMockMetric,
  getMockCategories,
  getMockMetricById,
  getMockMetrics,
  parseMetricFilters,
  updateMockMetric,
} from './store';

function jsonError(status: number, message: string) {
  return HttpResponse.json({ message }, { status });
}

export const handlers = [
  http.get('/api/categories', () => {
    return HttpResponse.json(getMockCategories());
  }),

  http.get('/api/dashboard/summary', () => {
    return HttpResponse.json(buildDashboardSummary());
  }),

  http.get('/api/reports/summary', ({ request }) => {
    const url = new URL(request.url);
    const period = (url.searchParams.get('period') ?? 'weekly') as 'daily' | 'weekly' | 'monthly';
    if (!['daily', 'weekly', 'monthly'].includes(period)) {
      return jsonError(400, 'Please check the entered data.');
    }
    return HttpResponse.json(buildReportSummary(period));
  }),

  http.get('/api/metrics', ({ request }) => {
    const filters = parseMetricFilters(new URL(request.url));
    const items = getMockMetrics(filters);
    return HttpResponse.json({ items, totalCount: items.length });
  }),

  http.get('/api/metrics/:id', ({ params }) => {
    const metric = getMockMetricById(String(params.id));
    if (!metric) {
      return jsonError(404, 'The requested resource was not found.');
    }
    return HttpResponse.json(metric);
  }),

  http.post('/api/metrics', async ({ request }) => {
    const body = (await request.json()) as CreateMetricInput;

    if (!body.title?.trim() || !body.categoryId || !body.date || body.value === undefined) {
      return jsonError(400, 'Please check the entered data.');
    }

    if (body.title.trim().toLowerCase() === 'duplicate') {
      return jsonError(409, 'A metric with this title already exists.');
    }

    const metric = createMockMetric({
      ...body,
      title: body.title.trim(),
    });

    return HttpResponse.json(metric, { status: 201 });
  }),

  http.put('/api/metrics/:id', async ({ params, request }) => {
    const body = (await request.json()) as UpdateMetricInput;
    const updated = updateMockMetric(String(params.id), body);

    if (!updated) {
      return jsonError(404, 'The requested resource was not found.');
    }

    return HttpResponse.json(updated);
  }),

  http.delete('/api/metrics/:id', ({ params }) => {
    const deleted = deleteMockMetric(String(params.id));
    if (!deleted) {
      return jsonError(404, 'The requested resource was not found.');
    }
    return HttpResponse.json({ id: String(params.id) });
  }),
];
