# UI/UX Rules

## Purpose

The UI must feel like a practical dashboard/reporting frontend, not a component playground detached from real data flows.

## Dashboard UX

Implemented on `/dashboard`:

- page title and description
- summary cards for total metrics, weekly progress, monthly progress, and top category
- weekly trend overview using chart-ready bars
- recent activity table with link to full metrics view

## Metrics UX

Implemented on `/metrics`:

- filter bar for search, category, type, and date range
- create/edit metric form with validation
- metrics table with edit and delete actions
- empty, loading, and error states

## Reports UX

Implemented on `/reports`:

- daily, weekly, and monthly period toggle
- total value summary card
- category breakdown list
- trend overview bars

## Forms

Forms support:

- visible labels
- field-level validation messages
- disabled/loading submit state
- cancel path when editing
- form-level API error message

## Charts / visual data

Chart-ready CSS bar blocks and category lists are used instead of a heavy chart library. This matches the project scope for chart-ready dashboard views.

## Accessibility basics

- Inputs and selects have labels
- Buttons use clear text
- Status uses text plus badge variants, not color alone
- Focus-visible styles are enabled globally
- Error messages use `role="alert"` where appropriate

## Responsive behavior

- Desktop sidebar navigation
- Mobile drawer navigation
- Tables scroll horizontally inside intentional overflow containers
- Filter grids collapse on smaller widths
