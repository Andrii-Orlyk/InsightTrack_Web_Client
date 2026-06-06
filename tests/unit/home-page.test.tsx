import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { HomePage } from '../../src/pages/HomePage';

describe('HomePage', () => {
  it('renders portfolio heading', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: /InsightTrack Web Client/i })).toBeInTheDocument();
  });
});
