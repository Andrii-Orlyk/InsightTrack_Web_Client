import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import '../mocks/mswLifecycle';
import { DashboardPage } from '../../src/pages/DashboardPage';

function renderDashboard() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <DashboardPage />
      </MemoryRouter>
    </QueryClientProvider>
  );
}

describe('DashboardPage', () => {
  it('renders summary cards from demo data', async () => {
    renderDashboard();

    await waitFor(() => {
      expect(screen.getByText('Total metrics')).toBeInTheDocument();
    });

    expect(screen.getByText('Recent activity')).toBeInTheDocument();
    expect(screen.getByText('Morning run')).toBeInTheDocument();
  });
});
