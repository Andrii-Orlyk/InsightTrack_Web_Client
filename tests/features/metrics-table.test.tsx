import type { ComponentProps } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import '../mocks/mswLifecycle';
import { MetricsTable } from '../../src/features/tables/MetricsTable';
import { seedMetrics } from '../../src/mocks/data/seed';

function renderMetricsTable(props: Partial<ComponentProps<typeof MetricsTable>> = {}) {
  const queryClient = new QueryClient();

  return render(
    <QueryClientProvider client={queryClient}>
      <MetricsTable
        metrics={seedMetrics}
        isLoading={false}
        isError={false}
        error={null}
        onRetry={() => undefined}
        onEdit={() => undefined}
        hasActiveFilters={false}
        {...props}
      />
    </QueryClientProvider>
  );
}

describe('MetricsTable states', () => {
  it('renders loading state via shell', () => {
    renderMetricsTable({ metrics: [], isLoading: true });
    expect(screen.getByText('Loading metrics...')).toBeInTheDocument();
  });

  it('renders empty state', () => {
    renderMetricsTable({ metrics: [], isLoading: false });
    expect(screen.getByText('No metrics yet')).toBeInTheDocument();
  });

  it('renders error state', () => {
    renderMetricsTable({
      metrics: [],
      isError: true,
      error: new Error('Network failed'),
    });
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });
});

describe('MetricsTable delete flow', () => {
  it('shows row actions for metrics', async () => {
    renderMetricsTable();

    await waitFor(() => {
      expect(screen.getByText('Morning run')).toBeInTheDocument();
    });

    expect(screen.getAllByRole('button', { name: 'Edit' }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('button', { name: 'Delete' }).length).toBeGreaterThan(0);
  });
});
