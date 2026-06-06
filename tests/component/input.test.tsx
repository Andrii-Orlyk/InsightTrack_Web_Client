import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Input } from '../../src/components/ui/Input';

describe('Input', () => {
  it('renders label', () => {
    render(<Input label="Metric title" />);
    expect(screen.getByLabelText('Metric title')).toBeInTheDocument();
  });

  it('shows error message', () => {
    render(<Input label="Value" error="Value is required" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Value is required');
    expect(screen.getByLabelText('Value')).toHaveAttribute('aria-invalid', 'true');
  });

  it('accepts typing', async () => {
    const user = userEvent.setup();
    render(<Input label="Search" />);
    const input = screen.getByLabelText('Search');
    await user.type(input, 'health');
    expect(input).toHaveValue('health');
  });
});
