# Project Guidelines

A personal monorepo containing two TypeScript projects and a few shell scripts. See [README.md](README.md) for the (sparse) human-facing intro.

## Layout

- [server/](server/) — Express + Socket.IO web server (Node, ESM, TypeScript).
- [web/](web/) — React 19 SPA built with Vite + TypeScript.
- [bash/](bash/) — Helper shell scripts (dev launcher, branch helpers, color utilities).

The two npm packages are independent — there is no root `package.json` or workspace tooling. Run `npm install` inside each project separately.

## server/

Express 5 HTTP server with a Socket.IO websocket layer. Entry point [server/src/server.ts](server/src/server.ts) wires JSON/urlencoded/CORS middleware then registers route modules from [server/src/controllers/](server/src/controllers/). Listens on port `3000`.

Architecture follows a controller / service / model split:

- `controllers/` — route registration, request/response handling.
- `services/` — business logic.
- `models/` — in-memory state, including a [logs](server/src/models/logs.ts) buffer and [performance samples](server/src/models/performance-samples.ts).
- `utils/` — small primitives (ring buffer, moving average, JSON typing).
- `errors/` — typed error classes.

Persisted data lives in [server/data.json](server/data.json) via [server/src/persistence.ts](server/src/persistence.ts).

### Build and Test (server)

Run from `server/`:

- `npm run start-dev` — nodemon: rebuild + restart on `.ts` changes.
- `npm run start-ts` — run directly via `ts-node`.
- `npm run build` / `npm start` — `tsc` then `node dist/server.js`.
- `npm test` — Jest (ESM mode, requires `--experimental-vm-modules`, already in the script).
- `npm run lint` / `npm run format` — ESLint / Prettier.

### Conventions (server)

- ESM (`"type": "module"`) — relative imports must include the `.js` extension even from `.ts` sources (see [server.ts](server/src/server.ts) imports).
- Top-level `await` is used for startup.
- New routes: add a `register*Routes(app)` function in `controllers/` and call it from `startup()` in [server.ts](server/src/server.ts).
- Logging goes through `log()` from [models/logs.ts](server/src/models/logs.ts), not `console.log`. Avoid logging requests to `/logs` (infinite-loop guard in the request middleware).

## web/

React 19 SPA using `react-router-dom` v7 with `HashRouter`. Entry [web/src/main.tsx](web/src/main.tsx) → [web/src/App.tsx](web/src/App.tsx) → routes defined in [web/src/routes.tsx](web/src/routes.tsx). Connects to the server via Socket.IO ([web/src/models/](web/src/models/)).

Folders under [web/src/](web/src/):

- `views/` — top-level pages (one folder per route: logs, sessions, shell-command-executions, themes, todos, etc.).
- `components/` — reusable UI (charts, gauges, tables, form fields).
- `hooks/`, `models/`, `utils/`, `icons/` — supporting code.

Theming is dynamic: themes are listed in `models/themes`, selected via a `<select>` in `App`, and persisted in `localStorage`. CSS lives in [web/public/themes/](web/public/themes/) so theme files can be loaded as plain `<link>` tags at runtime.

A custom ESLint rule lives in [web/eslint-rules/allow-block-imports.js](web/eslint-rules/allow-block-imports.js).

### Build and Test (web)

Run from `web/`:

- `npm run dev` — Vite dev server.
- `npm run build` — `tsc -b && vite build`.
- `npm run preview` — preview the production build.
- `npm run lint` — ESLint + Stylelint over CSS/SCSS.

There is no test runner configured for `web/` yet.

## bash/

- [bash/start-work-friendly.sh](bash/start-work-friendly.sh) — launches `server` (start-dev) and `web` (dev) in parallel with cleanup trap. Preferred way to run both during development.
- [bash/current-branch.sh](bash/current-branch.sh), [bash/on-branch.sh](bash/on-branch.sh) — git branch helpers.
- [bash/bash-colors.sh](bash/bash-colors.sh) — sourced color constants for the other scripts.

Scripts use `#!/usr/bin/env bash` with `set -euo pipefail`; preserve that when editing.

## Conventions (workspace-wide)

- TypeScript everywhere. Match the existing project's style — `server/` uses single quotes + semicolons (Prettier); `web/` uses double quotes (see existing files before formatting).
- Don't introduce a root `package.json` or workspace manager unless asked — the two projects are deliberately separate.
- This repo is public but personal; the [README.md](README.md) note "All rights reserved" is intentional. Don't add a license without asking.
