# Architecture

## Purpose

InsightTrack Web Client is a frontend-only dashboard/reporting project. It demonstrates React + TypeScript delivery for data-heavy interfaces: metrics, filters, forms, dashboard cards, chart-ready visuals, and report views.

## Architectural boundary

This repository contains only frontend code. Backend implementation is out of scope.

Allowed:

- React components
- TypeScript DTOs
- frontend API client
- environment configuration
- MSW demo handlers and mock data
- tests
- scripts
- docs

Forbidden:

- backend controllers
- server services
- database migrations
- `.cs`, `.csproj`, `.sln`, `.sql`
- production analytics infrastructure

## Feature-first structure

```text
src/
  app/                 application shell, providers, router
  api/                 typed HTTP/API boundary
  components/          reusable UI, layout, feedback, forms
  features/
    dashboard/         summary cards and recent activity
    charts/            trend bars, category breakdown, reports panel
    tables/            metrics table and filters
    forms/             metric form and validation schema
    components/        component showcase composition
  mocks/               MSW handlers, seeded data, in-memory store
  pages/               route-level pages
  lib/                 env, error mapping, filters, formatting, query keys
  styles/              global styles
  types/               API/domain types
```

## Data flow

```text
Page -> feature component -> TanStack Query -> insightTrackApi -> MSW handler or live API -> UI state
```

## Demo-first architecture

Demo mode uses MSW with an in-memory store seeded from `src/mocks/data/seed.ts`. It supports dashboard summaries, metrics CRUD, categories, and report summaries without a backend.

## Live API-ready architecture

Live API mode uses the configured base URL from environment variables. The same typed API client is used in both modes. Live integration is prepared but not claimed as complete until a backend exists.

## State management

TanStack Query handles server/demo data:

- query keys for dashboard summary, metrics, categories, reports
- invalidation after create/edit/delete metric
- loading, empty, and error states per feature

Local state is used for filter inputs, selected edit metric, and report period toggles.

## Scope boundaries

The project stays practical:

- no enterprise BI platform
- no real-time streaming
- no AI/ML predictions
- no authentication service in current scope
- no backend logic in frontend
