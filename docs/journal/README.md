# Journal Index

Every commit in this repo has a matching entry here, written to
explain not just *what* changed but *why* — the concept each step
is teaching. Read in order for a running walkthrough of the stack.

| # | Commit | Summary |
|---|--------|---------|
| 0001 | scaffold Next.js app | Raw, unmodified create-next-app output |
| 0002 | blank slate | Boilerplate UI stripped to a minimal placeholder |
| 0003 | add /about route | A folder + page.tsx becomes a URL, with no config |
| 0004 | link home to /about | Client-side navigation via next/link, vs. full page reload |
| 0005 | CI-based snapshots | Playwright + GitHub Actions generate the visual filmstrip, since Termux can't run browser binaries locally |
| 0006 | shadcn/ui init | Radix UI + Nova preset (Lucide/Geist); Button.tsx exists but unused; cn() helper introduced |
