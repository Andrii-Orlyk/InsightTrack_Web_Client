# Testing Strategy

## Goal

Testing proves that the dashboard frontend behaves correctly in deterministic demo mode and remains ready for future live API integration.

## Automated checks

```bash
npm run typecheck
npm run lint
npm run test
npm run build
```

Optional:

```bash
npm run test:e2e
```

One-command local gate:

```bash
npm run test:ci
```

## Current automated coverage

| Layer | What is covered | Count |
|---|---|---|
| Unit | error mapping, filter logic, formatting, env base URL | 4 test files |
| Component | Button, Input, Select, Table, feedback states, showcase | 7 test files |
| Feature | dashboard, metrics page, metric form, charts, reports, table states | 6 test files |
| API / MSW | CRUD, summaries, 404, 409, handler scenarios | 2 test files |
| E2E smoke | home, dashboard, metrics, reports, filter, form validation | 6 tests |

Total Vitest tests: 59 across 20 files.

## Required test areas

Unit/API:

- API base URL resolution
- error mapping
- filter helpers
- formatting helpers

Component/feature:

- dashboard summary cards render from demo data
- metrics table renders rows and states
- filters update visible results
- create/edit form validation works
- chart-ready components render labels and values
- reports period switching works

E2E smoke (mock mode, local and GitHub Actions):

- app loads
- dashboard route loads summary content without network error
- metrics page loads table data without network error
- reports page loads report sections without network error
- search filter changes visible rows
- form validation appears on empty submit

## Live checks

Live checks are optional until a backend exists:

```bash
npm run check:live-api
```

They must not block CI.

## CI rule

GitHub Actions CI is configured for install, typecheck, lint, Vitest, build, and mock-mode Playwright E2E smoke tests. CI uses deterministic tests and does not depend on a live backend. Live API checks remain manual and are not part of CI. See `docs/CI.md`. Do not claim CI is passing on the new remote repository until Actions runs green after push.
