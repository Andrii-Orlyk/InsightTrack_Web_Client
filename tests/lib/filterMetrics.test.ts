import { describe, expect, it } from 'vitest';
import { filterMetrics } from '../../src/lib/filterMetrics';
import { seedMetrics } from '../../src/mocks/data/seed';

describe('filterMetrics', () => {
  it('filters by search term', () => {
    const result = filterMetrics(seedMetrics, { search: 'run' });
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('Morning run');
  });

  it('filters by category and type', () => {
    const result = filterMetrics(seedMetrics, { categoryId: 'cat-finance', type: 'currency' });
    expect(result.every((metric) => metric.categoryId === 'cat-finance' && metric.type === 'currency')).toBe(
      true
    );
  });

  it('filters by date range', () => {
    const result = filterMetrics(seedMetrics, { from: '2026-06-04', to: '2026-06-05' });
    expect(result.map((metric) => metric.id)).toEqual(['metric-6', 'metric-7', 'metric-8']);
  });
});
