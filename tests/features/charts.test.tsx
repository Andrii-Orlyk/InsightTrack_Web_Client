import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CategoryBreakdown } from '../../src/features/charts/CategoryBreakdown';
import { TrendBars } from '../../src/features/charts/TrendBars';

describe('chart-ready components', () => {
  it('renders trend bars from data', () => {
    render(
      <TrendBars
        items={[
          { label: 'Morning run', value: 35 },
          { label: 'Budget review', value: 120 },
        ]}
      />
    );

    expect(screen.getByLabelText('Trend bars')).toBeInTheDocument();
    expect(screen.getByText('Morning run')).toBeInTheDocument();
    expect(screen.getByText('120')).toBeInTheDocument();
  });

  it('shows empty state when no trend data', () => {
    render(<TrendBars items={[]} />);
    expect(screen.getByText('No data')).toBeInTheDocument();
  });

  it('renders category breakdown', () => {
    render(
      <CategoryBreakdown
        items={[
          { categoryId: 'cat-health', category: 'Health', value: 40, percentage: 40 },
          { categoryId: 'cat-finance', category: 'Finance', value: 60, percentage: 60 },
        ]}
      />
    );

    expect(screen.getByLabelText('Category breakdown')).toBeInTheDocument();
    expect(screen.getByText('Health')).toBeInTheDocument();
    expect(screen.getByText('60% of total')).toBeInTheDocument();
  });
});
