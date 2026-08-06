# Deploy

The Vercel project `almadinah-college` is **not** git-connected. It holds only
the three files beside this README; the build fetches the repository at a pinned
commit and runs the full test suite as its build step.

| Setting | Value |
|---|---|
| Install command | `echo "no dependencies"` |
| Build command | `node bootstrap.mjs` |
| Output directory | `dist` |
| Framework | none |

## To deploy

1. Push to `claude/madinah-college-strategy-k5prqn`.
2. Set `SHA` in `bootstrap.mjs` to the pushed `git rev-parse HEAD`.
3. Upload these three files to the project, target `production`.
4. **Read the build log.** It must report the current check count. A build that
   reports an older count built older source — see below.

## Why the SHA is pinned

`codeload.github.com/<repo>/tar.gz/<branch>` is CDN-cached. On 6 August 2026 two
consecutive production builds fetched a stale branch tarball, reported
"All checks passed" against the previous commit, and served the old design while
every local check passed. Nothing in the build was wrong; the build was simply
building something else.

A commit SHA is immutable. The build log's check count is the receipt: if it
reports the count this commit's test suite produces, it built this commit.
