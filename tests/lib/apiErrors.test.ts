import { describe, expect, it } from 'vitest';
import { mapApiError } from '../../src/lib/apiErrors';
import { HttpError } from '../../src/api/httpClient';

describe('mapApiError', () => {
  it('maps validation errors', () => {
    expect(mapApiError(new HttpError(400, null))).toBe('Please check the entered data.');
  });

  it('maps unauthorized errors', () => {
    expect(mapApiError(new HttpError(401, null))).toBe('Please sign in to continue.');
  });

  it('maps not found errors', () => {
    expect(mapApiError(new HttpError(404, null))).toBe('The requested resource was not found.');
  });

  it('uses server message when provided', () => {
    expect(mapApiError(new HttpError(409, { message: 'A metric with this title already exists.' }))).toBe(
      'A metric with this title already exists.'
    );
  });

  it('maps network errors', () => {
    expect(mapApiError(new TypeError('Failed to fetch'))).toBe(
      'Unable to reach the server. Check your connection and try again.'
    );
  });
});
