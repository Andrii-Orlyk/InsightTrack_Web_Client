# Regression Checklist

## Automated

- [ ] `npm ci` succeeds
- [ ] `npm run typecheck` passes
- [ ] `npm run lint` passes
- [ ] `npm run test` passes (64 Vitest tests across 20 files)
- [ ] `npm run build` passes
- [ ] `bash -n scripts/*.sh` passes
- [ ] `npm run test:e2e` passes locally when Playwright browsers are installed (6 mock-mode smoke tests)

## Demo mode

- [ ] App starts without backend
- [ ] `/dashboard` renders summary cards and recent activity
- [ ] `/metrics` renders seeded rows
- [ ] Search/category/type/date filters work
- [ ] Create/edit/delete metric flows work
- [ ] `/reports` switches daily/weekly/monthly views
- [ ] Empty, loading, and error states are reachable

## Public GitHub hygiene

- [ ] No local-only workflow files are tracked
- [ ] No internal audit/release notes are tracked
- [ ] No generated artifacts are tracked (`dist`, coverage, reports)
- [ ] No backend files are tracked
- [ ] README tables render correctly
- [ ] Roadmap contains exact v0.1.0 through v1.0.0 sequence
- [ ] No decorative emojis in public docs

## Release wording

- [ ] README/docs do not claim production backend completion
- [ ] README/docs do not claim green GitHub Actions unless verified remotely
