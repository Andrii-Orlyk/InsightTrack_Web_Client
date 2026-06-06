# Manual Test Scenarios

Use demo mode (`VITE_USE_MOCK_API=true`) unless a live backend is explicitly available.

## INSIGHT-DASH-001 — Dashboard review

Steps:

1. Run `npm run dev`
2. Open `/dashboard`

Expected:

- summary cards show numeric values
- weekly trend section renders bars
- recent activity table shows seeded metrics such as "Morning run"
- no backend is required

## INSIGHT-METRICS-001 — Metrics table review

Steps:

1. Open `/metrics`

Expected:

- table shows seeded rows
- edit and delete actions are visible per row
- empty state appears when filters exclude all rows

## INSIGHT-FILTERS-001 — Filter data

Steps:

1. Open `/metrics`
2. Enter `budget` in Search

Expected:

- only matching rows remain visible
- "Morning run" disappears
- "Weekly budget review" remains visible

## INSIGHT-FORM-001 — Add metric validation

Steps:

1. Open `/metrics`
2. Click `Create metric` without filling required fields

Expected:

- validation messages appear for required fields

Steps:

1. Fill valid values and submit

Expected:

- success message appears
- new metric appears in the table

## INSIGHT-FORM-002 — Edit metric

Steps:

1. Click `Edit` on an existing row
2. Change the title and save

Expected:

- form switches to edit mode
- updated title appears in the table after save

## INSIGHT-REPORTS-001 — Report period switch

Steps:

1. Open `/reports`
2. Switch between Daily, Weekly, and Monthly

Expected:

- summary title updates by period
- category breakdown and trend sections remain visible

## INSIGHT-ERROR-001 — Demo conflict

Steps:

1. Create a metric with title `duplicate`

Expected:

- form shows a user-friendly conflict/error message
- no raw stack trace is shown

## INSIGHT-LIVE-001 — Live API diagnostic (optional)

Steps:

1. Set `VITE_USE_MOCK_API=false`
2. Run `npm run check:live-api`

Expected:

- script reports reachable endpoints if a backend exists
- script reports skip messages if no backend is running
