import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { EmptyState } from '../../src/components/feedback/EmptyState';
import { ErrorState } from '../../src/components/feedback/ErrorState';
import { Badge } from '../../src/components/ui/Badge';
import { StatCard } from '../../src/components/ui/StatCard';

describe('EmptyState', () => {
  it('renders title and description', () => {
    render(<EmptyState title="No metrics" description="Create a metric to get started." />);
    expect(screen.getByRole('status')).toHaveTextContent('No metrics');
    expect(screen.getByText('Create a metric to get started.')).toBeInTheDocument();
  });
});

describe('ErrorState', () => {
  it('renders retry action', async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();
    render(
      <ErrorState description="Server error. Please try again later." onRetry={onRetry} />
    );
    await user.click(screen.getByRole('button', { name: 'Try again' }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });
});

describe('Badge', () => {
  it('renders status text', () => {
    render(<Badge variant="success">Active</Badge>);
    expect(screen.getByText('Active')).toBeInTheDocument();
  });
});

describe('StatCard', () => {
  it('renders label and value', () => {
    render(<StatCard label="Total metrics" value="24" />);
    expect(screen.getByText('Total metrics')).toBeInTheDocument();
    expect(screen.getByText('24')).toBeInTheDocument();
  });
});
