# Roadmap

Exact public release sequence for InsightTrack Web Client.

| Version | Scope | Status |
|---|---|---|
| v0.1.0 | Frontend project foundation | Complete |
| v0.2.0 | Routing and dashboard layout | Complete |
| v0.3.0 | API client and environment configuration | Complete |
| v0.4.0 | Demo data and mock integration | Complete |
| v0.5.0 | Metrics table and filters | Complete |
| v0.6.0 | Forms, validation, and UI states | Complete |
| v0.7.0 | Charts, summary cards, and responsive dashboard UX | Complete |
| v0.8.0 | Automated tests | Complete |
| v0.9.0 | CI, scripts, demo/live runtime docs | Complete |
| v1.0.0 | Public portfolio release | Current target |

## Version notes

### v0.1.0 — Frontend project foundation

- Vite + React + TypeScript setup
- Tailwind CSS baseline
- package scripts and lint/typecheck tooling

### v0.2.0 — Routing and dashboard layout

- Routes: `/`, `/dashboard`, `/metrics`, `/reports`, `/about`, not found
- Responsive app shell with sidebar and mobile navigation

### v0.3.0 — API client and environment configuration

- Typed API client in `src/api/`
- Environment-driven mock/live base URL handling
- Centralized API error mapping

### v0.4.0 — Demo data and mock integration

- MSW handlers and seeded categories/metrics
- Dashboard and report summary endpoints in demo mode

### v0.5.0 — Metrics table and filters

- Metrics table with row actions
- Search, category, type, and date filters

### v0.6.0 — Forms, validation, and UI states

- Create/edit metric form with React Hook Form + Zod
- Loading, empty, error, and success feedback

### v0.7.0 — Charts, summary cards, and responsive dashboard UX

- Dashboard summary cards
- Chart-ready trend bars and category breakdown blocks
- Daily/weekly/monthly report views

### v0.8.0 — Automated tests

- Unit, component, feature, and MSW handler tests
- Playwright smoke tests for core routes and flows

### v0.9.0 — CI, scripts, demo/live runtime docs

- GitHub Actions workflow
- Doctor, clean, and live API diagnostic scripts
- Public docs for demo/live runtime behavior

### v1.0.0 — Public portfolio release

- Final README and docs
- Public GitHub hygiene
- Exact tag history from v0.1.0 to v1.0.0
