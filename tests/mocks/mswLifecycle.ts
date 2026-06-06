import { afterAll, afterEach, beforeAll } from 'vitest';
import { server } from '../../src/mocks/server';
import { resetMockStore } from '../../src/mocks/store';

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

afterEach(() => {
  resetMockStore();
  server.resetHandlers();
});

afterAll(() => server.close());
