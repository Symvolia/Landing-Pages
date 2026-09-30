#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

if [[ ! -f .env.local && ! -f .env ]]; then
  echo "Nessun file .env. Copia .env.example in .env.local prima del deploy di produzione."
fi

npm run build
npx vercel --prod
