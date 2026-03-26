#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

cleanup() {
    trap - INT TERM EXIT
    kill -- 0$$ 2>/dev/null || true
}

trap cleanup INT TERM EXIT

(
    cd "$ROOT_DIR/server"
    npm run start-dev
) &

(
    cd "$ROOT_DIR/web"
    npm run dev
) &

wait