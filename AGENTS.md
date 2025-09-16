# Repository Guidelines

## Project Structure & Module Organization
Claude Code Viewer is a Next.js 15 / React 19 application with an embedded Hono API. Route-driven UI lives in `src/app`, real-time and parsing services in `src/server/service`, and shared Zod schemas in `src/lib/conversation-schema`. UI primitives are under `src/components/ui`, while static assets reside in `public/` and CLI output is emitted to `dist/` after builds. Keep feature-specific hooks, services, and components co-located within the relevant route folder for clarity.

## Build, Test, and Development Commands
- `pnpm install` — install dependencies (requires Node 20.12+).
- `pnpm dev` — launch Next.js with Turbopack on port 3400, serving the Hono API and SSE stream.
- `pnpm build` — run `scripts/build.sh` to produce the standalone bundle in `dist/`.
- `pnpm start` — execute the built CLI (`dist/index.js`).
- `pnpm typecheck` — strict TypeScript compilation via `tsc --noEmit`.
- `pnpm lint` / `pnpm fix` — format and lint with Biome (check vs write + unsafe fixes).
- `pnpm test` / `pnpm test:watch` — run Vitest suites once or in watch mode.

## Coding Style & Naming Conventions
Biome 2.2 enforces formatting: two-space indentation, double quotes, and organized imports. Components use `PascalCase.tsx`, utilities use `camelCase.ts`, constants stay in `SCREAMING_SNAKE_CASE`. Hooks begin with `use` and Jotai atoms end with `Atom`. Favor type inference from Zod schemas and keep Suspense-ready data fetching with TanStack Query.

## Testing Guidelines
Vitest 3 powers the test suite with globals enabled and shared setup from `vitest.config.ts`. Add specs alongside source files using `*.test.ts` or `*.test.tsx`, covering happy paths, failure handling, and SSE side effects. Run `pnpm test` plus `pnpm typecheck` before opening a PR, and extend mocks in `src/test-setups/` as needed.

## Commit & Pull Request Guidelines
Follow Conventional Commit prefixes (`feat:`, `fix:`, `chore:`) as seen in history, referencing issues like `#123` when applicable. PRs should include a concise summary, screenshots or terminal output for user-facing changes, a checklist of executed commands, and notes on any new environment variables. Request review once lint, type, and test checks pass locally.
