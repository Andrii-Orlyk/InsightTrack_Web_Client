import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import '../mocks/mswLifecycle';
import { MetricsPage } from '../../src/pages/MetricsPage';

function renderMetricsPage() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <MetricsPage />
      </MemoryRouter>
    </QueryClientProvider>
  );
}

describe('MetricsPage', () => {
  it('renders metrics table and filters', async () => {
    renderMetricsPage();

    await waitFor(() => {
      expect(screen.getByText('Morning run')).toBeInTheDocument();
    });

    expect(screen.getByLabelText(/Search/)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Create metric' })).toBeInTheDocument();
  });

  it('filters metrics by search', async () => {
    const user = userEvent.setup();
    renderMetricsPage();

    await waitFor(() => {
      expect(screen.getByText('Morning run')).toBeInTheDocument();
    });

    await user.type(screen.getByLabelText(/Search/), 'budget');
    await waitFor(() => {
      expect(screen.queryByText('Morning run')).not.toBeInTheDocument();
      expect(screen.getByText('Weekly budget review')).toBeInTheDocument();
    });
  });
});
