import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';

describe('env api base url', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('defaults to mock API when VITE_USE_MOCK_API is unset and mode is not live', async () => {
    vi.stubEnv('MODE', 'development');
    vi.stubEnv('VITE_INSIGHTTRACK_API_BASE_URL', 'http://localhost:5000');
    const { getApiBaseUrl, env } = await import('../../src/lib/env');
    expect(env.useMockApi).toBe(true);
    expect(getApiBaseUrl()).toBe('');
  });

  it('uses mock API when VITE_USE_MOCK_API=true', async () => {
    vi.stubEnv('VITE_USE_MOCK_API', 'true');
    vi.stubEnv('VITE_INSIGHTTRACK_API_BASE_URL', 'http://localhost:5000');
    const { getApiBaseUrl, env } = await import('../../src/lib/env');
    expect(env.useMockApi).toBe(true);
    expect(getApiBaseUrl()).toBe('');
  });

  it('uses live base url when VITE_USE_MOCK_API=false', async () => {
    vi.stubEnv('VITE_USE_MOCK_API', 'false');
    vi.stubEnv('VITE_INSIGHTTRACK_API_BASE_URL', 'http://localhost:5000/');
    const { getApiBaseUrl, env } = await import('../../src/lib/env');
    expect(env.useMockApi).toBe(false);
    expect(getApiBaseUrl()).toBe('http://localhost:5000');
  });

  it('uses live base url in live mode when mock flag is unset', async () => {
    vi.stubEnv('MODE', 'live');
    vi.stubEnv('VITE_INSIGHTTRACK_API_BASE_URL', 'http://localhost:5000');
    const { getApiBaseUrl, env } = await import('../../src/lib/env');
    expect(env.useMockApi).toBe(false);
    expect(getApiBaseUrl()).toBe('http://localhost:5000');
  });

  it('prefers VITE_INSIGHTTRACK_API_BASE_URL over VITE_API_BASE_URL', async () => {
    vi.stubEnv('VITE_USE_MOCK_API', 'false');
    vi.stubEnv('VITE_INSIGHTTRACK_API_BASE_URL', 'http://insighttrack.local:5000');
    vi.stubEnv('VITE_API_BASE_URL', 'http://fallback.local:5000');
    const { getApiBaseUrl } = await import('../../src/lib/env');
    expect(getApiBaseUrl()).toBe('http://insighttrack.local:5000');
  });
});
