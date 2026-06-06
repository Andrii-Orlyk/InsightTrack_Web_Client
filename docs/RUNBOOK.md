# Runbook

## Install

```bash
npm ci
```

## Demo mode

```bash
cp .env.example .env
npm run dev
```

Ensure:

```text
VITE_USE_MOCK_API=true
```

Alternative:

```bash
npm run dev:mock
```

## Live API-ready mode

```text
VITE_USE_MOCK_API=false
VITE_INSIGHTTRACK_API_BASE_URL=http://localhost:5000
```

Then:

```bash
npm run dev:live
```

If the backend is not running, the UI may show:

```text
Unable to reach the server. Check your connection and try again.
```

That message is expected in live mode when the API is unavailable.

Optional diagnostic:

```bash
npm run check:live-api
```

## Verify locally

```bash
npm run typecheck
npm run lint
npm run test
npm run build
bash -n scripts/*.sh
```

Optional E2E:

```bash
npm run test:e2e
```

One-command gate:

```bash
npm run test:ci
```

## Clean artifacts

```bash
npm run clean
```

## Doctor check

```bash
npm run doctor
```

## Release rule

Before public release, confirm local-only files, internal notes, generated artifacts, and private environment files are not tracked.
