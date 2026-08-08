# 0007 — Render Button on Homepage

**Visual change:** Home page now shows a styled, rounded button
below the "Go to About" link — the first piece of real visual
design in the app.

## What happened
`app/page.tsx` now imports `Button` from `@/components/ui/button`
and renders `<Button>Click me</Button>`.

## Why this matters

This is the exists-vs-used distinction from commit 0006 finally
resolving. Since 0006, `button.tsx` sat in the repo fully written,
imported by nothing. This commit is the only change required to
make it real: import it, place it in JSX. Nothing about the
component's own file changed at all — worth confirming yourself
with `git diff` on `components/ui/button.tsx` between these two
commits; it should be empty.

**On what you're actually seeing rendered:** if you inspected the
button's class list in devtools, you saw a long run of Tailwind
utility classes rather than one semantic class like `.btn`. This is
the core trade shadcn/ui (and Tailwind generally) makes: instead of
writing CSS in a separate file and giving it a name, styling is
composed inline from small, single-purpose utility classes. It
looks noisy at first, but it means there's no CSS file to hunt
through, no naming to invent, and no risk of a style unexpectedly
leaking onto some other `.btn` elsewhere in the app.

**On why the button looks *designed* without you writing any of
that design:** if you opened `components/ui/button.tsx`, you saw a
`cva()` (class-variance-authority) call defining named variants —
`default`, `outline`, `ghost`, `destructive`, and so on — each
mapping to a different combination of utility classes. `<Button>`
with no props uses the `default` variant. This is the shape you'll
see repeated across every shadcn component: a `cva()` config
defining the *set* of valid visual states, so switching a button's
entire look later is a one-word prop change (`variant="outline"`),
not a rewrite. We'll exercise that directly in an upcoming commit.

**One more thing worth noticing now, for later:** this Button has
no `onClick` yet — it's not wired to do anything. That's
intentional; we're isolating "component renders and looks right"
from "component has behavior," the same pattern we've used for
every other concept so far. Behavior comes once we introduce
`useState` and the client/server component boundary.

## Where to look
`git diff 19fc9c4 3e5620b -- app/page.tsx`
