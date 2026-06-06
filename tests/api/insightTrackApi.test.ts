import { describe, expect, it } from 'vitest';
import '../mocks/mswLifecycle';
import { insightTrackApi } from '../../src/api/insightTrackApi';

describe('insightTrackApi with MSW', () => {
  it('loads categories', async () => {
    const categories = await insightTrackApi.getCategories();
    expect(categories.length).toBeGreaterThan(0);
  });

  it('loads metrics with filters', async () => {
    const response = await insightTrackApi.getMetrics({ search: 'run' });
    expect(response.items).toHaveLength(1);
    expect(response.totalCount).toBe(1);
  });

  it('creates, updates, and deletes a metric', async () => {
    const created = await insightTrackApi.createMetric({
      title: 'Test metric',
      categoryId: 'cat-health',
      type: 'count',
      value: 3,
      unit: 'items',
      date: '2026-06-05',
      status: 'active',
    });

    expect(created.id).toBeTruthy();

    const updated = await insightTrackApi.updateMetric(created.id, {
      ...created,
      title: 'Updated metric',
      categoryId: created.categoryId,
      type: created.type,
      value: 4,
      unit: created.unit,
      date: created.date,
      status: created.status,
    });

    expect(updated.title).toBe('Updated metric');

    await insightTrackApi.deleteMetric(created.id);
    await expect(insightTrackApi.getMetric(created.id)).rejects.toMatchObject({ status: 404 });
  });

  it('returns conflict for duplicate demo title', async () => {
    await expect(
      insightTrackApi.createMetric({
        title: 'duplicate',
        categoryId: 'cat-health',
        type: 'count',
        value: 1,
        unit: 'items',
        date: '2026-06-05',
        status: 'active',
      })
    ).rejects.toMatchObject({ status: 409 });
  });

  it('loads dashboard and report summaries', async () => {
    const dashboard = await insightTrackApi.getDashboardSummary();
    expect(dashboard.totalMetrics).toBeGreaterThan(0);

    const report = await insightTrackApi.getReportSummary('weekly');
    expect(report.period).toBe('weekly');
    expect(report.categoryBreakdown.length).toBeGreaterThan(0);
  });
});
