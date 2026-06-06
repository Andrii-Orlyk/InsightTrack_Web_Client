# CI

## Purpose

GitHub Actions CI is configured for install, typecheck, lint, Vitest, build, and mock-mode Playwright E2E smoke tests. The workflow verifies the frontend project without requiring a backend.

Do not claim CI is passing on the new remote repository until Actions runs green after push.

## Workflow jobs

### build-test

```text
npm ci
npm run typecheck
npm run lint
npm run test
npm run build
```

### e2e-smoke

```text
npm ci
npx playwright install --with-deps chromium
npm run test:e2e
```

The E2E job starts the app with `npm run dev:mock` and runs 6 mock-mode Playwright smoke tests against MSW demo data. Live API checks remain manual via `npm run check:live-api` and are not part of CI.

## Rules

- CI must not require a live backend.
- CI must not require private `.env` values.
- CI uses deterministic unit/component/feature tests (59 Vitest tests across 20 files) and mock-backed E2E smoke tests (6 tests).
- Do not claim CI is passing on GitHub until Actions is actually green on the remote repository.

## Local equivalent

```bash
npm ci
npm run typecheck
npm run lint
npm run test
npm run build
bash -n scripts/*.sh
npm run test:e2e
```
