#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${VITE_INSIGHTTRACK_API_BASE_URL:-${VITE_API_BASE_URL:-http://localhost:5000}}"
BASE_URL="${BASE_URL%/}"

echo "Checking InsightTrack API-ready endpoints: ${BASE_URL}"
echo "This is an optional manual diagnostic. CI must not depend on a live backend."

ENDPOINTS=(
  "/api/metrics"
  "/api/categories"
  "/api/reports/summary?period=weekly"
)

reachable=0

for endpoint in "${ENDPOINTS[@]}"; do
  if curl -fsS "${BASE_URL}${endpoint}" >/dev/null 2>&1; then
    echo "OK: ${endpoint} is reachable."
    reachable=$((reachable + 1))
  else
    echo "SKIP: ${endpoint} is not reachable or not implemented yet."
  fi
done

if [ "$reachable" -eq 0 ]; then
  echo "Live API is not reachable yet. This is not a frontend bug while live backend is out of scope."
else
  echo "Live API diagnostic completed with ${reachable} reachable endpoint(s)."
fi
