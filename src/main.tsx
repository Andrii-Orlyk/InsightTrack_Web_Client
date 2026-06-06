import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app/App';
import './styles/index.css';

async function bootstrap() {
  if (import.meta.env.DEV) {
    const { enableMocking } = await import('./mocks/browser');
    await enableMocking();

    const { env } = await import('./lib/env');
    console.info(`[InsightTrack] API mode: ${env.useMockApi ? 'mock' : 'live'}`);
  }

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

void bootstrap();
