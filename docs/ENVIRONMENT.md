# Environment

## Variables

| Variable | Example | Purpose |
|---|---|---|
| `VITE_USE_MOCK_API` | `true` | Enables demo/mock mode for frontend review without backend |
| `VITE_INSIGHTTRACK_API_BASE_URL` | `http://localhost:5000` | Primary future InsightTrack API URL |
| `VITE_API_BASE_URL` | `http://localhost:5000` | Generic fallback API URL used by the HTTP client |
| `VITE_APP_ENV` | `development` | Public app environment label |

## Demo mode

```text
VITE_USE_MOCK_API=true
```

Demo mode is the default in `.env.example`. If `VITE_USE_MOCK_API` is unset, the app uses mock mode unless Vite runs in `live` mode.

Run:

```bash
npm run dev
# or
npm run dev:mock
```

## Live API-ready mode

```text
VITE_USE_MOCK_API=false
VITE_INSIGHTTRACK_API_BASE_URL=http://localhost:5000
```

Run:

```bash
npm run dev:live
```

A backend must run separately. Do not treat live mode as verified until a backend exists and integration checks pass.

## Rules

- `.env` is local and ignored.
- `.env.example` is committed.
- Restart Vite after changing environment variables.
