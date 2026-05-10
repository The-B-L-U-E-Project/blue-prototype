# Contributing to BLUE

Thanks for considering a contribution. BLUE is a free, universally
accessible learning platform — see [README.md](README.md) for the
public-facing mission, and [CLAUDE.md](CLAUDE.md) for the operational
principles that shape every design decision.

This document covers:

- [Licensing and sign-off](#licensing-and-sign-off)
- [What kinds of contributions](#what-kinds-of-contributions)
- [Reporting bugs and proposing features](#reporting-bugs-and-proposing-features)
- [Code contributions](#code-contributions)
- [Content contributions (guides, methods)](#content-contributions-guides-methods)
- [Code of conduct](#code-of-conduct)
- [Security issues](#security-issues)

---

## Licensing and sign-off

BLUE is dual-licensed:

- **Source code:** [AGPL-3.0](LICENSE) — copyleft for networked services.
  Forks hosted as a service must publish their source.
- **Educational content** (guides, methods, illustrations):
  [CC BY-SA 4.0](LICENSE-CONTENT) — attribution + share-alike.

By submitting a contribution, you agree that your work is licensed under
the applicable license above and that you have the right to submit it.

---

## What kinds of contributions

We welcome:

- Bug reports and reproductions
- Feature proposals (please open an issue to discuss before large PRs)
- Code: backend (`api/`), frontend (`app/`), infrastructure
- Documentation improvements
- Educational guides and methods (once the content pipeline ships)
- Verifier-system design proposals — this is a hard, unsolved area;
  thoughtful prior-art writeups are very welcome
- Accessibility, internationalization, and low-bandwidth optimizations
  (see UI Design Principles in [CLAUDE.md](CLAUDE.md))

Please **do not** submit:

- Proposals that introduce paywalls, premium tiers, or non-contextual
  advertising. These violate the project's load-bearing principles
  (see [CLAUDE.md](CLAUDE.md) "Non-Negotiable Principles").
- Content scraped from sources that are not compatibly licensed
  (CC BY-SA 4.0 compatible or your own original work).
- Engagement-optimized UX patterns (streaks, XP, dark patterns).

---

## Reporting bugs and proposing features

- Search [existing issues](../../issues) first to avoid duplicates.
- Use the issue templates in `.github/ISSUE_TEMPLATE/`.
- For security issues, **do not open a public issue**. See
  [SECURITY.md](SECURITY.md).

---

## Code contributions

### Setup

```bash
pnpm install
pnpm dev   # see package.json / workspace scripts
```

The repo is a pnpm workspace:

- `api/` — Hono backend. Exports `AppType` from `api/src/index.ts`.
- `app/` — React 19 + Vite frontend. Consumes `AppType` via `hc<AppType>`.
- `supabase/` — database, auth, storage.

### Conventions

The frontend layout is binding — see the "App Structure" section in
[CLAUDE.md](CLAUDE.md). In short:

- Path alias `@/` maps to `src/`. Always import via `'@/ui'`, not
  `'../../../ui'`.
- `ui/` is pure presentational primitives. No fetching, no RPC, no
  business logic.
- `features/<surface>/` may import `@/ui`, `@/api`, `@/lib`. Must not
  import from another `features/` folder.
- `routes/` files are thin: call hooks, lay out feature components.
- Tailwind v4 (no `tailwind.config.js`); design tokens in `index.css`
  via `@theme`.

### Before opening a PR

1. `pnpm -r typecheck` (or `tsc --noEmit`) passes.
2. `pnpm -r build` passes.
3. Manually verify your change in a browser — there is no automated
   test suite. Exercise the golden path and edge cases.
4. Commit with `-s` for DCO sign-off.
5. Reference the related issue in the PR description.

### PR scope

Keep PRs focused. Refactors, feature work, and dependency bumps belong
in separate PRs. Drive-by cleanups make review harder.

---

## Content contributions (guides, methods)

The content pipeline (hierarchy enforcement, verifier juries, dispute
resolution) is still being designed — see "Core Mental Model" in
[CLAUDE.md](CLAUDE.md). Until the in-platform contribution flow exists,
the canonical place to propose content structure is via issues using
the "Guide proposal" template.

When the platform is live, guide and method contributions will go
through the verifier-jury review process described in CLAUDE.md.
Repository PRs are not the long-term path for content.

---

## Code of conduct

This project follows the [Contributor Covenant 2.1](CODE_OF_CONDUCT.md).
By participating you agree to abide by its terms. Report violations as
described in that document.

---

## Security issues

Please **do not** open public issues for security vulnerabilities. See
[SECURITY.md](SECURITY.md) for the private disclosure process.
