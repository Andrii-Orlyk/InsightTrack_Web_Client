# PR Release Log

## Release strategy

This project uses an exact 10-tag roadmap history from `v0.1.0` to `v1.0.0`.

## Planned release tags

| Tag | Scope |
|---|---|
| `v0.1.0` | Frontend project foundation |
| `v0.2.0` | Routing and dashboard layout |
| `v0.3.0` | API client and environment configuration |
| `v0.4.0` | Demo data and mock integration |
| `v0.5.0` | Metrics table and filters |
| `v0.6.0` | Forms, validation, and UI states |
| `v0.7.0` | Charts, summary cards, and responsive dashboard UX |
| `v0.8.0` | Automated tests |
| `v0.9.0` | CI, scripts, demo/live runtime docs |
| `v1.0.0` | Public portfolio release |

## Suggested release note format

```text
## vX.Y.Z — Short title

### Added
- ...

### Changed
- ...

### Verified
- npm run typecheck
- npm run lint
- npm run test
- npm run build
```

## Verification gate

Before each public tag:

```bash
npm ci
npm run typecheck
npm run lint
npm run test
npm run build
bash -n scripts/*.sh
```

Optional before `v1.0.0`:

```bash
npm run test:e2e
```

Do not publish with failing deterministic checks.

## Current implementation note

Local development currently includes routing, component system, dashboard features, tests, CI workflow, and public docs aligned to the roadmap above. Final public tag publishing should follow the exact tag sequence without creating `v1.0.1`.
