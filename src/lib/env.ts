const rawUseMock =
  import.meta.env.VITE_USE_MOCK_API ??
  (import.meta.env.MODE === 'live' ? 'false' : 'true');

export const env = {
  apiBaseUrl:
    import.meta.env.VITE_INSIGHTTRACK_API_BASE_URL ??
    import.meta.env.VITE_API_BASE_URL ??
    'http://localhost:5000',
  useMockApi: rawUseMock === 'true',
  appEnv: import.meta.env.VITE_APP_ENV ?? import.meta.env.MODE,
} as const;

export function getApiBaseUrl(): string {
  return env.useMockApi ? '' : env.apiBaseUrl.replace(/\/$/, '');
}
