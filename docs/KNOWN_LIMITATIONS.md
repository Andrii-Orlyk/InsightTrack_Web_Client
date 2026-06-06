# Known Limitations

## Current scope

This is a frontend portfolio project focused on dashboard/reporting UI, not a production analytics platform.

## Limitations

- This frontend repository intentionally does not contain backend project files such as `.cs`, `.csproj`, `.sln`, `.sql`, database migrations, controllers, repositories, or server-side services.
- Backend implementation is not included in this repository.
- Demo mode uses MSW with in-memory seeded data; data resets on page reload.
- Live API mode is prepared but requires a future InsightTrack API.
- Authentication is not implemented.
- Real-time updates are not included.
- Advanced charting libraries and BI drill-downs are not included.
- Production deployment, monitoring, and security hardening are out of scope.
- GitHub Actions pass status must be verified on the remote repository before claiming green CI publicly.

## Why this is acceptable

The project proves frontend dashboard/reporting skills: layout, tables, filters, forms, chart-ready views, demo mode, tests, docs, and release hygiene.

## Positioning note

This project is intentionally scoped as a demo-first dashboard/reporting frontend. It focuses on UI structure, metrics presentation, filters, forms, chart-ready views, deterministic demo data, tests, and documentation. Live API integration is prepared as a frontend boundary, while production analytics, enterprise BI workflows, real-time streaming, and deployment are outside the current scope.
