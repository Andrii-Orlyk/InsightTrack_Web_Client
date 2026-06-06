# Demo Mode

## Purpose

Demo mode allows reviewers to inspect the dashboard frontend without running a backend. It is the default portfolio review path.

## Enable demo mode

```text
VITE_USE_MOCK_API=true
```

This is the default in `.env.example`. The app also defaults to mock mode unless Vite runs in `live` mode.

## Run

```bash
npm ci
cp .env.example .env
npm run dev
```

Or explicitly:

```bash
npm run dev:mock
```

For live API mode with a backend, use `npm run dev:live`. If the backend is not running, the UI may show a server-unavailable message — that is expected outside demo mode.

## How it works

- MSW intercepts `/api/*` requests in the browser
- An in-memory store serves seeded categories, metrics, dashboard summaries, and reports
- Create, update, and delete operations mutate the demo store until the page reloads

## Demo scope

The demo supports:

- dashboard summary cards on `/dashboard`
- metrics table on `/metrics`
- search plus category, type, and date filters
- create/edit/delete metric form
- daily, weekly, and monthly report views on `/reports`
- loading, empty, error, and success states

## Seeded demo data

| Item | Count / detail |
|---|---|
| Categories | 4 (Health, Finance, Learning, Work) |
| Metrics | 8 events with mixed types and statuses |
| Reports | Period-based summaries with category breakdown and trend items |

## Limitations

Demo mode is frontend-only. It does not represent a production backend, authentication system, database, or analytics engine.
