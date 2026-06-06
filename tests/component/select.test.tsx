import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Select } from '../../src/components/ui/Select';

const options = [
  { label: 'Health', value: 'health' },
  { label: 'Finance', value: 'finance' },
];

describe('Select', () => {
  it('renders label and options', () => {
    render(<Select label="Category" options={options} />);
    expect(screen.getByLabelText('Category')).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Health' })).toBeInTheDocument();
  });

  it('shows error message', () => {
    render(<Select label="Category" options={options} error="Select a category" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Select a category');
  });
});
