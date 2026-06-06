import { describe, expect, it } from 'vitest';
import '../mocks/mswLifecycle';
import { insightTrackApi } from '../../src/api/insightTrackApi';
import { HttpError } from '../../src/api/httpClient';
import { mapApiError } from '../../src/lib/apiErrors';

describe('MSW handler scenarios', () => {
  it('handles categories endpoint', async () => {
    const categories = await insightTrackApi.getCategories();
    expect(categories.map((category) => category.name)).toContain('Health');
  });

  it('handles reports summary endpoint', async () => {
    const report = await insightTrackApi.getReportSummary('monthly');
    expect(report.period).toBe('monthly');
    expect(report.trendItems.length).toBeGreaterThan(0);
  });

  it('returns not found for missing metric', async () => {
    await expect(insightTrackApi.getMetric('missing-id')).rejects.toBeInstanceOf(HttpError);
    try {
      await insightTrackApi.getMetric('missing-id');
    } catch (error) {
      expect(mapApiError(error)).toBe('The requested resource was not found.');
    }
  });

  it('returns validation error for invalid report period via API layer', async () => {
    const response = await fetch('/api/reports/summary?period=invalid');
    expect(response.status).toBe(400);
    const body = (await response.json()) as { message: string };
    expect(body.message).toBe('Please check the entered data.');
  });
});
