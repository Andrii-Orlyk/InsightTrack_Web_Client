import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import '../mocks/mswLifecycle';
import { ReportsSummaryPanel } from '../../src/features/charts/ReportsSummaryPanel';

function renderReports() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <ReportsSummaryPanel />
    </QueryClientProvider>
  );
}

describe('ReportsSummaryPanel', () => {
  it('renders weekly report summary', async () => {
    renderReports();

    await waitFor(() => {
      expect(screen.getByText(/Weekly total/i)).toBeInTheDocument();
    });

    expect(screen.getByText('Category breakdown')).toBeInTheDocument();
    expect(screen.getByText('Trend overview')).toBeInTheDocument();
  });

  it('switches report period', async () => {
    const user = userEvent.setup();
    renderReports();

    await waitFor(() => {
      expect(screen.getByText(/Weekly total/i)).toBeInTheDocument();
    });

    await user.click(screen.getByRole('button', { name: 'Daily' }));

    await waitFor(() => {
      expect(screen.getByText(/Daily total/i)).toBeInTheDocument();
    });
  });
});
