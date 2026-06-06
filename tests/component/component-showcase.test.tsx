import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ComponentShowcase } from '../../src/features/components/ComponentShowcase';

describe('ComponentShowcase', () => {
  it('renders dashboard-oriented sections', () => {
    render(<ComponentShowcase />);
    expect(screen.getByRole('heading', { name: /InsightTrack component showcase/i })).toBeInTheDocument();
    expect(screen.getByText('Summary cards')).toBeInTheDocument();
    expect(screen.getByText('Filter bar')).toBeInTheDocument();
    expect(screen.getByText('Metrics table shell')).toBeInTheDocument();
  });
});
