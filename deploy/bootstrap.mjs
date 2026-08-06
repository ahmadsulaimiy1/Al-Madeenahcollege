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
const SHA = 'a190a68047b4f98232abfd51ad81455a0556f9e6';
const run = (cmd) => execSync(cmd, { stdio: 'inherit', shell: '/bin/bash' });

console.log(`fetching ${REPO}@${SHA}`);
run(`curl -fsSL https://codeload.github.com/${REPO}/tar.gz/${SHA} | tar xz --strip-components=1`);

/* The test suite IS the build. A failing check fails the deploy rather than
   shipping quietly. */
run('node scripts/fetch-fonts.mjs && node scripts/build.mjs && node tests/run.mjs');
