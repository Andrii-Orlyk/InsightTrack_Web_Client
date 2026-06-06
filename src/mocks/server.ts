import { setupServer } from 'msw/node';
import { handlers } from './handlers';
import { resetMockStore } from './store';

export const server = setupServer(...handlers);

export function resetMockServerState(): void {
  resetMockStore();
  server.resetHandlers();
}
