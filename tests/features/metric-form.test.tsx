import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import '../mocks/mswLifecycle';
import { MetricForm } from '../../src/features/forms/MetricForm';

function renderMetricForm() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <MetricForm />
    </QueryClientProvider>
  );
}

describe('MetricForm', () => {
  it('shows validation errors for empty submit', async () => {
    const user = userEvent.setup();
    renderMetricForm();

    await user.click(screen.getByRole('button', { name: 'Create metric' }));

    await waitFor(() => {
      expect(screen.getByText('Title is required.')).toBeInTheDocument();
    });
  });

  it('submits a valid metric', async () => {
    const user = userEvent.setup();
    renderMetricForm();

    await waitFor(() => {
      expect(screen.getByLabelText(/Category/)).toBeInTheDocument();
    });

    await user.type(screen.getByLabelText(/Title/), 'Evening walk');
    await user.selectOptions(screen.getByLabelText(/Category/), 'cat-health');
    await user.selectOptions(screen.getByLabelText(/^Type/), 'duration');
    fireEvent.change(screen.getByLabelText(/Value/), { target: { value: '20' } });
    await user.type(screen.getByLabelText(/Unit/), 'min');
    fireEvent.change(screen.getByLabelText(/Date/), { target: { value: '2026-06-05' } });
    await user.click(screen.getByRole('button', { name: 'Create metric' }));

    await waitFor(() => {
      expect(screen.getByText('Metric saved successfully.')).toBeInTheDocument();
    });
  });
});
