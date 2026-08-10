/* Deploy bootstrap — uploaded to Vercel, not run locally.

   The Vercel project holds only the three files in this directory. Everything
   else is fetched from GitHub at build time, so a deploy uploads three files
   rather than the whole repository.

   PINNED TO A COMMIT SHA, NEVER TO THE BRANCH NAME.
   A branch tarball is served from a CDN cache. Two production builds in a row
   were built from a stale copy of the branch while reporting success — they
   ran the OLD test count (817) against source that had moved on, and the live
   site silently served the previous design for twenty minutes. A commit SHA is
   immutable, so that cannot recur: if this build succeeds, it built exactly
   this commit.

   Update SHA to the pushed HEAD before each deploy. */
import { execSync } from 'node:child_process';

const REPO = 'ahmadsulaimiy1/Al-Madeenahcollege';
const SHA = '49f50af44796944f4bbb40f0209a18e433751749';
const run = (cmd) => execSync(cmd, { stdio: 'inherit', shell: '/bin/bash' });

console.log(`fetching ${REPO}@${SHA}`);
run(`curl -fsSL https://codeload.github.com/${REPO}/tar.gz/${SHA} | tar xz --strip-components=1`);

/* The test suite IS the build. A failing check fails the deploy rather than
   shipping quietly.
   The responsive gate and the design-system audit both need a browser binary
   the deploy host does not have, so each prints its reason and exits 0 there.
   They are local release gates, not deploy gates — stated plainly rather than
   left to look like they ran. The static suite is the one the deploy enforces,
   and its check count in the build log is the receipt. */
run('node tests/engine.mjs && node scripts/fetch-fonts.mjs && node scripts/build.mjs'
  + ' && node tests/run.mjs && node tests/responsive.mjs && node tests/audit.mjs');
