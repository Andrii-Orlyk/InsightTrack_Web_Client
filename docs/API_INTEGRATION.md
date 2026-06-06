# API Integration

## Purpose

This project uses a typed frontend API boundary so the UI works in demo mode now and can integrate with a future InsightTrack API later.

## Modes

| Mode | Description | Backend required |
|---|---|---|
| Demo/mock | Uses MSW handlers and seeded in-memory data | No |
| Live API-ready | Calls configured API base URL | Yes, future backend required |

## Environment variables

```text
VITE_INSIGHTTRACK_API_BASE_URL=http://localhost:5000
VITE_API_BASE_URL=http://localhost:5000
VITE_USE_MOCK_API=true
VITE_APP_ENV=development
```

## Implemented frontend contract

These endpoints are used by the UI and implemented in demo mode via MSW:

```text
GET    /api/dashboard/summary
GET    /api/metrics
GET    /api/metrics/:id
POST   /api/metrics
PUT    /api/metrics/:id
DELETE /api/metrics/:id
GET    /api/categories
GET    /api/reports/summary?period=daily|weekly|monthly
```

Authentication endpoints are not implemented in the current frontend scope.

## Error mapping

| Status / case | UI message |
|---|---|
| 400 validation | Please check the entered data. |
| 401 unauthorized | Please sign in to continue. |
| 403 forbidden | You do not have permission to perform this action. |
| 404 not found | The requested resource was not found. |
| 409 business conflict | Server message when provided, otherwise a conflict message |
| 500 server error | Server error. Please try again later. |
| Network unavailable | Unable to reach the server. Check your connection and try again. |

Demo conflict example: create a metric with title `duplicate` to receive a 409 response.

## Demo data

Demo mode includes:

- 4 categories: Health, Finance, Learning, Work
- 8 seeded metrics/events across multiple dates
- dashboard summary with recent activity
- daily, weekly, and monthly report summaries
- chart-ready trend items derived from demo metrics

## Truth rule

Do not claim live backend completion until a backend exists and live verification passes. Demo mode is valid for frontend review, but it does not replace final live integration testing.
