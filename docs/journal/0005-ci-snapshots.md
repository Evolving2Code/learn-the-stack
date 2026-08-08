# 0005 — CI-Based Snapshot Generation

**Visual change:** None directly — this adds tooling, not app UI.

## What happened
- Added `scripts/snapshot.mjs`: given a list of commit-hash/slug
  pairs, it checks out each one into an isolated `git worktree`,
  boots the dev server, screenshots the known routes with
  Playwright, and saves PNGs to `docs/snapshots/`.
- Added `.github/workflows/snapshots.yml`: a manually-triggered
  GitHub Action that runs the script on GitHub's Ubuntu runners and
  commits the resulting images back to the repo.
- Added `playwright` as a devDependency.

## Why this matters
This detour exists because of a real constraint: local development
here happens in Termux (Android), and Playwright's browser binaries
aren't built for Android — only Linux, macOS, and Windows. Rather
than work around that locally, we moved the actual screenshotting
to GitHub's own runners, which are real Ubuntu machines.

This turned out to be a better fit for the project's goal than the
local version would have been anyway. The end result — "jump to
commit 5, then 45, then 28, and see the UI" — doesn't require a
live dev server or a local browser at all. It just requires the
PNGs to already exist in the repo, which now happens automatically,
triggered on demand, with no manual screenshotting.

`git worktree` (rather than repeated `git checkout`) is the key
mechanism letting one script visit many commits safely: it checks
out a commit into a *separate* folder without disturbing whatever
branch is currently active in the main working directory. That
matters a lot in CI, where you don't want "checking out an old
commit to screenshot it" to conflict with the checkout the workflow
itself is running on.

## Where to look
`git diff ff7c6ab 258cf6a`
