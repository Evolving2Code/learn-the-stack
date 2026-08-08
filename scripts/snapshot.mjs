// Runs in CI. For each commit hash passed in, checks it out into a
// temp worktree, boots the dev server, screenshots the known routes,
// and saves them to docs/snapshots/. Does NOT touch your working
// directory's current branch.
//
// Usage: node scripts/snapshot.mjs <hash1>:<slug1> <hash2>:<slug2> ...

import { chromium } from "playwright";
import { execSync } from "node:child_process";
import { existsSync, mkdirSync, rmSync } from "node:fs";

const ROUTES = ["/", "/about"];
const OUT_DIR = "docs/snapshots";
const WORKTREE_DIR = ".snapshot-worktree";

const targets = process.argv.slice(2).map((arg) => {
  const [hash, slug] = arg.split(":");
  return { hash, slug };
});

if (targets.length === 0) {
  console.error("Usage: node scripts/snapshot.mjs <hash>:<slug> ...");
  process.exit(1);
}

if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

const browser = await chromium.launch();

for (const { hash, slug } of targets) {
  console.log(`\n=== ${slug} (${hash}) ===`);

  if (existsSync(WORKTREE_DIR)) {
    execSync(`git worktree remove --force ${WORKTREE_DIR}`, { stdio: "inherit" });
  }
  execSync(`git worktree add --detach ${WORKTREE_DIR} ${hash}`, { stdio: "inherit" });
  execSync("npm install", { cwd: WORKTREE_DIR, stdio: "inherit" });

  const { spawn } = await import("node:child_process");
  const server = spawn("npm", ["run", "dev", "--", "--port", "3100"], {
    cwd: WORKTREE_DIR,
    stdio: "ignore",
    detached: true,
  });

  await new Promise((resolve) => setTimeout(resolve, 5000));

  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  for (const route of ROUTES) {
    const routeName = route === "/" ? "home" : route.replace("/", "");
    const filename = `${OUT_DIR}/${slug}--${routeName}.png`;
    try {
      await page.goto(`http://localhost:3100${route}`, { waitUntil: "networkidle" });
      await page.screenshot({ path: filename });
      console.log(`Saved ${filename}`);
    } catch (err) {
      console.warn(`Skipped ${route}: ${err.message}`);
    }
  }
  await page.close();

  process.kill(-server.pid);
  execSync(`git worktree remove --force ${WORKTREE_DIR}`, { stdio: "inherit" });
}

await browser.close();
console.log("\nDone.");
