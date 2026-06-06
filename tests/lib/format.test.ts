import { describe, expect, it } from 'vitest';
import { formatDate, formatMetricValue, formatPercent } from '../../src/lib/format';

describe('format helpers', () => {
  it('formats metric values with unit', () => {
    expect(formatMetricValue(5, 'km')).toBe('5 km');
    expect(formatMetricValue(3.5, 'min')).toBe('3.5 min');
  });

  it('formats dates', () => {
    expect(formatDate('2026-06-01')).toMatch(/2026/);
  });

  it('formats percent with sign', () => {
    expect(formatPercent(12)).toBe('+12%');
    expect(formatPercent(-4)).toBe('-4%');
  });
});
