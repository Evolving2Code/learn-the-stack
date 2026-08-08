# 0003 — Add /about Route

**Visual change:** None on `/` — but visiting `/about` directly now
renders a page instead of a 404.

## What happened
- New file: `app/about/page.tsx`, exporting a default component
  that renders an `<h1>` and a `<p>`.
- Nothing else changed. No config file was touched, no route was
  "registered" anywhere.

## Why this matters
This is the core mental model of the App Router: **a folder inside
`app/` becomes a URL segment, and a `page.tsx` inside that folder
is what renders for that URL.** `app/about/page.tsx` becoming
`/about` isn't a convention you configure — it's the router. There
is no routes file, no `<Route path="/about">` array to maintain,
the way there might be in some other frameworks or in the old Pages
Router (`pages/about.tsx` worked similarly, but App Router pushes
this further with layouts, nested routing, and colocated files).

Notice this commit deliberately does NOT link to `/about` from
anywhere yet. That's on purpose — I want you to see, in isolation,
that a route can exist and be reachable by typing the URL directly,
completely independent of whether anything in the UI points to it.
The next commit adds the link, and you'll be able to diff the two
commits separately to see "route exists" vs. "route is navigable
from the UI" as two distinct concepts.

## Where to look
`git diff a9c35d4 4e5ea92`
