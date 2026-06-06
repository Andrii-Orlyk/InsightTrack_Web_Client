import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);

export async function enableMocking() {
  if (!import.meta.env.DEV) {
    return;
  }

  const { env } = await import('../lib/env');

  if (!env.useMockApi) {
    return;
  }

  await worker.start({
    onUnhandledRequest: 'warn',
    quiet: false,
  });
}
