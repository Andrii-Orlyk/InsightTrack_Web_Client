# InsightTrack Web Client

## What is this?

InsightTrack Web Client is a React + TypeScript dashboard/reporting frontend portfolio project. It demonstrates portfolio-focused frontend implementation for data-heavy UI: dashboard summary cards, metric/event tables, filters, validated forms, chart-ready views, responsive layouts, loading/empty/error states, demo data, automated tests, and clean public documentation.

This project is part of a .NET / full-stack portfolio. It does not replace backend projects. Its role is to prove frontend dashboard, data presentation, reporting UI, and QA-minded release discipline.

## Project boundary

This repository is frontend-only.

It includes frontend API clients, TypeScript data models, MSW demo handlers, mock data, test fixtures, scripts, and public documentation. Backend implementation, database migrations, controllers, repositories, server-side services, and backend project files are intentionally outside this repository.

## Target user flow

```text
Dashboard -> Metrics table -> Add metric/event -> Filter by date/category/type -> Review summary cards -> Review chart-ready trends and reports
```

## Main features

- Dashboard summary cards
- Metrics/events table
- Date/category/type filters and search
- Create/edit/delete metric form
- Loading, empty, error, and success states
- Responsive dashboard layout
- Accessible forms and controls
- Chart-ready visual components
- MSW demo data mode
- Live API-ready environment configuration
- Automated unit, component, feature, and E2E smoke tests
- GitHub Actions CI configured for install, typecheck, lint, Vitest, build, and mock-mode Playwright E2E smoke tests

## Integration modes

| Mode | When to use | Backend required | How to run |
|---|---|---|---|
| Demo / mock | Portfolio review and local UI testing | No | `npm run dev` or `npm run dev:mock` with `VITE_USE_MOCK_API=true` |
| Live API-ready | Future integration with InsightTrack API | Yes | `npm run dev:live` with `VITE_USE_MOCK_API=false` |

## Demo data

Demo mode uses MSW with seeded in-memory data. No login is required.

| Data | Demo content |
|---|---|
| Categories | Health, Finance, Learning, Work |
| Metrics | 8 seeded metric events across multiple dates |
| Dashboard | Summary cards, recent activity, weekly trend block |
| Reports | Daily, weekly, and monthly summary views |
| Conflict example | Create a metric titled `duplicate` to trigger a 409 response |

## Demo mode

Demo mode uses MSW with seeded in-memory data and does not require a backend.

```bash
npm ci
cp .env.example .env
npm run dev
```

Default `.env.example` value:

```text
VITE_USE_MOCK_API=true
```

## Live API-ready mode

```text
VITE_USE_MOCK_API=false
VITE_INSIGHTTRACK_API_BASE_URL=http://localhost:5000
```

Then run:

```bash
npm run dev:live
```

Live API mode requires a backend to run separately and is a prepared frontend boundary.

If the backend is not running, the UI may show a server-unavailable message. That is expected live-mode behavior.

Optional diagnostic:

```bash
npm run check:live-api
```

Do not claim live API completion until a real backend exists and passes integration checks.

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start Vite dev server (mock mode by default unless live mode is configured) |
| `npm run dev:mock` | Start development server in mock/demo mode |
| `npm run dev:live` | Start development server in live API-ready mode |
| `npm run typecheck` | Run TypeScript type checking |
| `npm run lint` | Run ESLint |
| `npm run test` | Run Vitest unit/component/feature tests |
| `npm run test:ci` | Run typecheck, lint, test, and build in one command |
| `npm run test:e2e` | Run Playwright smoke tests |
| `npm run build` | Create production build |
| `npm run doctor` | Run local project sanity checks |
| `npm run clean` | Remove generated artifacts |
| `npm run check:live-api` | Optional live API reachability diagnostic |

## Verification

| Check | Command | Expected result |
|---|---|---|
| Install | `npm ci` | Dependencies install without errors |
| Typecheck | `npm run typecheck` | No TypeScript errors |
| Lint | `npm run lint` | ESLint passes with zero warnings |
| Unit/component/feature tests | `npm run test` | 64 Vitest tests pass across 20 test files |
| Production build | `npm run build` | Build completes successfully |
| Script syntax | `bash -n scripts/*.sh` | No bash syntax errors |
| E2E smoke (optional local) | `npm run test:e2e` | 6 mock-mode Playwright smoke tests (requires browsers) |

Full local gate:

```bash
npm ci
npm run typecheck
npm run lint
npm run test
npm run build
bash -n scripts/*.sh
```

Optional:

```bash
npm run test:e2e
```

GitHub Actions CI is configured for install, typecheck, lint, Vitest, build, and mock-mode Playwright E2E smoke tests. Do not claim CI is passing on the new remote repository until Actions runs green after push.

## Documentation

| Document | Description |
|---|---|
| `docs/ARCHITECTURE.md` | Frontend structure, data flow, dashboard layers, and demo/live boundary |
| `docs/API_INTEGRATION.md` | Demo API contract and future live API integration model |
| `docs/DEMO_MODE.md` | How to review the project without backend |
| `docs/ENVIRONMENT.md` | Environment variables and demo/live configuration |
| `docs/TESTING.md` | Automated, component, E2E, and manual testing strategy |
| `docs/RUNBOOK.md` | Local verification and release workflow |
| `docs/UI_UX.md` | Dashboard UX, responsive layout, accessibility, and state rules |
| `docs/ROADMAP.md` | Exact public roadmap and tag plan |
| `docs/PR_RELEASE_LOG.md` | Release-note structure for public history |
| `docs/KNOWN_LIMITATIONS.md` | Honest project scope and non-goals |
| `docs/MANUAL_TEST_SCENARIOS.md` | Manual dashboard and live-mode scenarios |
| `docs/REGRESSION_CHECKLIST.md` | Pre-release regression checklist |
| `docs/CI.md` | GitHub Actions expectations and CI scope |

## Not included

- Backend implementation
- Real database
- Real authentication service
- Production deployment
- Enterprise BI platform features
- Real-time streaming
- AI/ML analytics

## Summary

InsightTrack Web Client is a React + TypeScript dashboard/reporting frontend with reusable UI components, summary cards, metrics tables, filters, validated forms, chart-ready data views, MSW demo mode, automated tests, and clean GitHub documentation.
