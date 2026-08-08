# AGENTS.md

## Project
Next.js (App Router) + TypeScript + Tailwind + shadcn/ui (Radix under
the hood) + Framer Motion + Lucide icons. Demo app: a habit tracker,
used purely as a vehicle to learn the stack.

## Commands
- `npm run dev` — start dev server (localhost:3000)
- `npm run build` — production build
- `npm run lint` — lint

## Conventions
- Commits are small and isolated: one visible/structural change per
  commit. See docs/journal/ for the running explainer log.
- Every commit gets a matching entry in docs/journal/NNNN-slug.md
  (see docs/journal/README.md for the template and index).
- No `src/` directory — `app/` lives at project root.
- shadcn components are added via CLI into components/ui/ and are
  owned/edited directly, not treated as a locked dependency.

## Structure
- app/            routes (App Router: folder = URL segment)
- components/ui/  shadcn-generated components
- docs/journal/   one markdown file per commit, explainer-style
- docs/snapshots/ screenshots of the app at each commit
