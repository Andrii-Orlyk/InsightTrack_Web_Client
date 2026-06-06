import { getApiBaseUrl } from '../lib/env';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface ApiRequestOptions<TBody = unknown> {
  method?: HttpMethod;
  body?: TBody;
  token?: string | null;
  headers?: Record<string, string>;
}

export class HttpError extends Error {
  constructor(
    public status: number,
    public payload: unknown
  ) {
    super(`HTTP request failed with status ${status}`);
  }
}

function parseResponsePayload(text: string): unknown {
  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
}

export async function apiRequest<TResponse, TBody = unknown>(
  path: string,
  options: ApiRequestOptions<TBody> = {}
): Promise<TResponse> {
  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    method: options.method ?? 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const payload = parseResponsePayload(await response.text());

  if (!response.ok) {
    throw new HttpError(response.status, payload);
  }

  return payload as TResponse;
}
