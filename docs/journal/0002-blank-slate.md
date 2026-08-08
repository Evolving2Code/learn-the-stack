# 0002 — Blank Slate

**Visual change:** Default Next.js starter page (logo, links, docs
cards) → plain white page with the text "learn-the-stack"

## What happened
- `app/page.tsx` replaced with a minimal component: one `<main>`,
  one `<h1>`
- `app/globals.css` stripped down to just the three Tailwind
  directives (`base`, `components`, `utilities`) — removed the
  default CSS custom properties and dark-mode media query
  create-next-app scaffolds in
- `app/layout.tsx` kept structurally intact (it has to — Next.js
  requires a root layout with `<html>`/`<body>`) but metadata
  simplified
- Unused default SVGs removed from `public/`

## Why this matters
create-next-app's starter page exists to prove the install worked —
it's not meant to be built on top of. Keeping it around invites two
bad habits: (1) deleting boilerplate piece-by-piece *while* also
trying to add your own code, which muddies what you actually wrote
vs. what was scaffolded, and (2) treating that starter styling as a
foundation, when it's really just a demo.

This commit draws a hard line: everything after this point in the
repo is code we intentionally added, for a reason we can explain.
That's the whole premise of this project.

Two things worth noticing in the diff:
- `globals.css` still needs the three `@tailwind` directives even
  though the page has almost no styling yet — these are what let
  Tailwind's utility classes (like the ones we'll add in the next
  commits) actually resolve to CSS at build time. Without them,
  className="..." attributes would just be inert strings.
- `layout.tsx` is *not* optional boilerplate the way `page.tsx`'s
  content was. In the App Router, every route needs a layout
  somewhere in its folder chain — this root one is the minimum
  required for the app to render at all.

## Where to look
`git diff 63ebdd0 <250fb61>`
