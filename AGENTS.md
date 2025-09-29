# Repository Guidelines

## Project Structure & Module Organization
- **App shell:** Next.js 15 routes live in `src/app`, with feature-specific hooks, services, and components co-located per route.
- **Server layer:** Hono API endpoints and SSE helpers sit in `src/server/service`.
- **Shared contracts:** Conversation schemas are centralized under `src/lib/conversation-schema` for Zod-driven types.
- **UI primitives:** Reusable building blocks stay in `src/components/ui`; static assets land in `public/`; builds emit the CLI bundle to `dist/`.
- **Testing assets:** Co-locate specs beside source files as `*.test.ts(x)` and reuse mocks from `src/test-setups/`.

## Build, Test, and Development Commands
- `pnpm install` — install workspace dependencies (Node 20.12+ required).
- `pnpm dev` — launch Turbopack dev server on http://localhost:3400 with the Hono API and SSE stream.
- `pnpm build` — run `scripts/build.sh` to produce the distributable CLI in `dist/`.
- `pnpm start` — execute the built CLI via `dist/index.js`.
- `pnpm typecheck` — run `tsc --noEmit` for strict types.
- `pnpm lint` / `pnpm fix` — check or auto-fix formatting with Biome 2.2.
- `pnpm test` / `pnpm test:watch` — execute Vitest suites once or in watch mode.

## Coding Style & Naming Conventions
- Biome enforces two-space indentation, double quotes, and sorted imports; run `pnpm lint` before pushing.
- Use `PascalCase.tsx` for components, `camelCase.ts` for utilities, `SCREAMING_SNAKE_CASE` for constants, and suffix atoms with `Atom`.
- Prefer type inference from shared Zod schemas; ensure Suspense-ready data flows integrate with TanStack Query.

## Testing Guidelines
- Vitest 3 powers unit and integration suites with globals configured in `vitest.config.ts`.
- Mirror production scenarios, cover failure paths, and assert SSE side effects.
- Name specs `feature.test.ts` or `Component.test.tsx`; keep mocks in `src/test-setups/` for reuse.
- Run `pnpm test` and `pnpm typecheck` before opening a PR; include CLI snapshots if behavior changes.

## Commit & Pull Request Guidelines
- Follow Conventional Commits (`feat:`, `fix:`, `chore:`) and reference issues (e.g., `#123`) when applicable.
- PRs should summarize user-facing changes, attach screenshots or relevant terminal output, and list executed commands.
- Note any new environment variables or migrations; request review only after lint, type, and test checks succeed.

## Agent Workflow Tips
- Keep feature work localized within a route folder to simplify reviews.
- Favor incremental PRs; large changes should be broken into reviewable slices.
- Document non-obvious architectural decisions in `docs/` or inline comments for future agents.
