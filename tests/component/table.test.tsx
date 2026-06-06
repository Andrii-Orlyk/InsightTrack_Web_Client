import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { EmptyState } from '../../src/components/feedback/EmptyState';
import { LoadingState } from '../../src/components/feedback/LoadingState';
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableShell,
} from '../../src/components/ui/Table';

describe('TableShell', () => {
  it('renders rows', () => {
    render(
      <TableShell caption="Metrics">
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Morning run</TableCell>
          </TableRow>
        </TableBody>
      </TableShell>
    );

    expect(screen.getByRole('columnheader', { name: 'Title' })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: 'Morning run' })).toBeInTheDocument();
  });

  it('shows loading state', () => {
    render(
      <TableShell isLoading loadingMessage="Loading metrics...">
        <tbody />
      </TableShell>
    );
    expect(screen.getByRole('status')).toHaveTextContent('Loading metrics...');
  });

  it('shows empty state', () => {
    render(
      <TableShell
        isEmpty
        emptyState={<EmptyState title="No metrics" description="Add your first metric." />}
      >
        <tbody />
      </TableShell>
    );
    expect(screen.getByText('No metrics')).toBeInTheDocument();
  });
});

describe('LoadingState', () => {
  it('renders loading message', () => {
    render(<LoadingState message="Loading dashboard..." />);
    expect(screen.getByRole('status')).toHaveTextContent('Loading dashboard...');
  });
});
