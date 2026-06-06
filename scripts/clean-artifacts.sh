#!/usr/bin/env bash
set -euo pipefail

echo "Cleaning generated frontend artifacts..."
rm -rf dist coverage coverage-report playwright-report test-results reports
rm -f tsconfig.tsbuildinfo
find . -name "*.tsbuildinfo" -type f -delete
find . -name ".DS_Store" -type f -delete
find . -type d -name "__MACOSX" -prune -exec rm -rf {} +

echo "Clean complete."
