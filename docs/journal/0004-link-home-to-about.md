# 0004 — Link Home to /about

**Visual change:** Home page now shows a "Go to About" link below
the heading. Clicking it navigates to /about without a full page
reload.

## What happened
- `app/page.tsx`: imported `Link` from `next/link`, added
  `<Link href="/about">Go to About</Link>` inside the `<main>`.

## Why this matters
This is the first moment two routes actually *talk* to each other,
and it's worth being precise about what `<Link>` is doing versus a
plain `<a href="/about">`.

With a normal `<a>` tag, clicking it tells the browser: throw away
everything currently in memory, make a fresh HTTP request for
/about, and re-parse/re-render the entire HTML document from
scratch. You'd see a white flash and the whole page — including
things unrelated to what changed, like a shared header — reload.

`<Link>` intercepts that click in JavaScript instead. It fetches
only the data needed for the new route, swaps the relevant content
into the already-running React app, and updates the URL via the
browser's History API. Nothing reloads. Anything shared between
the two pages (once we have a shared layout element like a header)
would simply *stay mounted* — untouched, not re-fetched, not
re-rendered.

This is "client-side routing," and it's the actual reason
frameworks like Next.js exist rather than just writing plain HTML
pages: you get the navigable, multi-page *feel* of a traditional
website, but with the speed and continuity of a single-page app.

If you watched the Network tab like I suggested: on first load of
`/`, you got a full document request. Clicking the Link, you did
NOT get another full document — just a small data/RSC payload for
the about route. That's the mechanism, made visible.

One thing to keep in the back of your mind for later: `<Link>` also
prefetches routes it can see in the viewport by default, so by the
time you click it, the needed code may already be sitting in the
browser. We'll come back to this when we look at performance later.

## Where to look
`git diff e61f4a3 63eddf5 -- app/page.tsx`
