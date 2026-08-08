# 0006 — Initialize shadcn/ui

**Visual change:** None yet — Button exists in the codebase but
isn't rendered anywhere.

## What happened
Running `npx shadcn@latest init` and choosing Radix UI as the
primitives library and the "Nova" preset (Lucide icons + Geist
font) generated:

- `components.json` — shadcn's own config: which style, which
  icon library, where components should be written to
- `lib/utils.ts` — a small helper, `cn()`, used by every shadcn
  component to merge Tailwind classes safely
- `components/ui/button.tsx` — a first, ready-to-use component,
  bundled automatically by this preset rather than added as a
  separate step
- `app/globals.css` — updated with CSS custom properties (color
  tokens, radii, etc.) that shadcn's components reference
- `app/layout.tsx` — updated to load the Geist font and apply it
  globally

## Why this matters

**On the CLI choice itself:** shadcn/ui used to mean "components
built on Radix," full stop. It now lets you pick the underlying
headless-primitives library at init time — Radix UI, React Aria,
or Base UI. This is worth sitting with: shadcn isn't really a
component *library* in the traditional sense (like importing a
pre-built Button from `node_modules`). It's closer to a code
generator — it writes actual, editable component source files into
your repo, and those files can be built on top of whichever
primitives engine you choose. We chose Radix UI deliberately, since
it's the most common choice in real-world shadcn projects and what
we set out to learn.

**On `components/ui/button.tsx` arriving during init, not after:**
Originally we planned to split "install shadcn" and "add Button"
into two separate commits, to keep the exists-vs-used distinction
sharp (same as we did with the /about route). This preset bundles
a starter component with init, so that split didn't happen
naturally this time — and this journal favors describing what
actually happened over staging an artificial split. The concept
still holds either way: Button.tsx exists in the tree right now,
fully defined, and nothing in the app renders it yet. You can
verify that yourself — try searching the codebase for "Button" and
you'll only find its own definition, no usages.

**On the layout.tsx diff, three things worth naming individually:**
1. `Geist({...})` — Next.js's built-in font optimization. This
   isn't a `<link>` tag to Google Fonts; Next.js downloads and
   self-hosts the font file at build time, then exposes it as a
   CSS variable (`--font-sans`), which avoids a runtime request to
   Google and avoids layout shift while the font loads.
2. `cn("font-sans", geist.variable)` — this is the very `cn()`
   helper from `lib/utils.ts`, already in use one file after being
   created. It's a thin wrapper around two libraries
   (`clsx` + `tailwind-merge`) that lets you conditionally combine
   class names without producing conflicting/duplicate Tailwind
   classes — you'll see this pattern in nearly every shadcn
   component going forward.
3. The className moved from `<html lang="en">` to
   `<html lang="en" className={cn(...)}>` — applying the font at
   the `<html>` level (not `<body>`) makes the CSS variable
   available to the entire document, including things like modals
   or portals that might render outside `<body>`'s normal flow
   later on.

## Where to look
`git diff ff7c6ab 46c8522`
