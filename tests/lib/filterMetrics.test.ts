import { describe, expect, it } from 'vitest';
import { filterMetrics } from '../../src/lib/filterMetrics';
import type { Metric } from '../../src/types/metric';
import { seedMetrics } from '../../src/mocks/data/seed';

const isoMetric: Metric = {
  ...seedMetrics[0],
  id: 'metric-iso',
  date: '2026-06-03T14:30:00.000Z',
};

const invalidDateMetric: Metric = {
  ...seedMetrics[0],
  id: 'metric-invalid',
  date: 'not-a-date',
};

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

  it('filters by date-only metric dates', () => {
    const result = filterMetrics(seedMetrics, { from: '2026-06-04', to: '2026-06-05' });
    expect(result.map((metric) => metric.id)).toEqual(['metric-6', 'metric-7', 'metric-8']);
  });

  it('filters by from date with date-only filter values', () => {
    const result = filterMetrics(seedMetrics, { from: '2026-06-05' });
    expect(result.map((metric) => metric.id)).toContain('metric-8');
    expect(result.every((metric) => metric.date >= '2026-06-05')).toBe(true);
  });

  it('filters by to date with date-only filter values', () => {
    const result = filterMetrics(seedMetrics, { to: '2026-06-02' });
    expect(result.map((metric) => metric.id)).toEqual(['metric-1', 'metric-2', 'metric-3']);
  });

  it('filters ISO timestamp metric dates against date-only range', () => {
    const result = filterMetrics([isoMetric], { from: '2026-06-03', to: '2026-06-03' });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('metric-iso');
  });

  it('excludes metrics with invalid dates when date filters are active', () => {
    const result = filterMetrics([invalidDateMetric], { from: '2026-06-01' });
    expect(result).toHaveLength(0);
  });

  it('does not apply date filtering when from and to are empty', () => {
    const result = filterMetrics([invalidDateMetric], {});
    expect(result).toHaveLength(1);
  });
});
