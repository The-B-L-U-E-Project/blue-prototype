# CLAUDE.md — Project Context for AI Assistants

This file is the canonical briefing for any AI agent working in this repo. Read it before making suggestions, writing code, or reviewing changes. The README is public-facing; this file is operational.

---

## What BLUE Is

**BLUE** = **B**road **L**earning **U**niversal **E**ducation.

A free, universally accessible website where anyone can learn how to *do* arbitrarily complex, arbitrarily niche things — starting from zero prerequisite knowledge. Think Wikipedia's openness + WikiHow's how-to focus + a tutorial's progressive structure, all at unlimited depth.

Inspired by Sebastian Rey's pitch on The List Podcast: [https://www.youtube.com/watch?v=qcRKmm3B25c](https://www.youtube.com/watch?v=qcRKmm3B25c)

The README has the full public write-up. This file captures the *intent* and the constraints that should shape every decision.

---

## The Problem BLUE Solves

**What is broken elsewhere (in combination):**

- **Scatter on the open web.** Useful procedural knowledge sits in disparate blogs, videos, forums, and docs. For complex or niche topics, finding and stitching a coherent path is slow; "finding is practically its own skill," and many subjects never surface in one place.
- **Encyclopedic vs. procedural shape.** Sources like Wikipedia are strong for factual overview, not for *doing* progressively harder things with enforced prerequisites. Readers still leave to hunt how-to fragments elsewhere.
- **Shallow or inconsistent how-to curricula.** Lightweight how-to hubs cap depth on hard skills ("go to school / hire a professional"). Broad free curricula are uneven: strong where a small team invested, thin or absent for highly specific or frontier procedures.
- **Search and AI as partial substitutes.** General search and chat assistants depend on query wording, context limits, and allowed training or retrieval sources; they do not provide a single, audited, site-native hierarchy from level 1 to the frontier, or a durable canonical guide per topic with explicit governance.

**BLUE's wedge:** one place, **tutorial-shaped** (not fact-only), **hierarchically enforced prerequisites**, **one canonical guide per topic** with **methods** (practice) and **alternatives** (theoretical) for competing framings, **community contribution** with **verifier juries**—so a learner can climb from zero to arbitrarily deep, niche, practical knowledge without assembling the internet by hand.

---

## Non-Negotiable Principles

These are load-bearing. If a proposal violates one of these, push back rather than implementing it.

1. **Free forever.** No paywalls, no premium tiers, no "freemium." If users have to pay to learn, the project has failed its purpose.
2. **Zero prerequisites at every level.** A reader starting at level 1 of any subject must be able to climb to the frontier without leaving the site. Every level-N guide must be completable using only content at level <N.
3. **One canonical guide per topic.** No duplicate articles. Competing practice routes live as *methods* and competing theoretical framings live as *alternatives* inside the canonical guide.
4. **Tutorial-shaped, not fact-shaped.** Content teaches you to *do* things. If a guide reads like a Wikipedia article, it's wrong.
5. **Contextual ads only.** Advertising is allowed *only* on guides directly related to the product/service. No site-wide banners. No off-topic placements. No advertiser influence on content or ranking.
6. **Profit must not become the priority.** Sustainability is fine. Optimizing the site for revenue ahead of the mission breaks it.

---

## UI Design Principles

BLUE is for everyone, globally. The UI optimizes for **cognitive clarity, low bandwidth, low-end devices, emotional neutrality, long-form reading, trust, accessibility, progressive depth** — not engagement, retention, or clicks. Modern engagement-optimized UI is actively hostile to learning. BLUE should feel like a library, textbook, lab notebook, or map of knowledge — never like social media, a SaaS dashboard, or an edtech startup.

These principles are load-bearing. If a UI proposal violates one, push back rather than implementing it.

1. **Calm, not stimulating.** No bright gradients, gratuitous animation, flashy transitions, gamification, dopamine-driven mechanics. Use whitespace, readable typography, restrained color, stable layouts, predictable interactions. The user should feel "I can think here," not "this app is trying to keep me scrolling."
2. **Reading-first design.** Learning is mostly reading and understanding. Generous line spacing, readable serif or humanist fonts, narrow content widths, strong hierarchy, low visual noise. Aim for the readability of a good textbook with the navigation of a modern knowledge graph. Wikipedia is ugly but works because density is informational, typography is stable, content dominates UI.
3. **Don't assume prior knowledge.** This applies to UI too. Explain navigation naturally, expose dependencies visually, define jargon inline, always show "why this matters." Prefer "Before learning CPU Pipelines, most learners study: Registers, Logic Gates, Instruction Sets" over "Prerequisites Missing." Human, not institutional.
4. **Respect low-end hardware.** Many users worldwide have weak internet, old Android phones, limited RAM, expensive mobile data. Fast page loads, minimal JS, server-render first, aggressive caching, no giant bundles, no useless animation. A fast simple site feels more trustworthy globally than a fancy heavy one — Wikipedia loads everywhere.
5. **Mobile-first, but reading-first.** Mobile-only is the global default, but most mobile-first design today destroys depth. Avoid TikTok-style spacing, giant cards, endless padding, empty screens. Use compact readable layouts, collapsible sections, persistent hierarchy context, good typography at small sizes. Think "portable textbook," not "content feed."
6. **Stable navigation.** People learning hard subjects overload easily. Navigation should feel consistent, spatial, mappable: persistent sidebar, breadcrumbs, visible hierarchy, backtracking support, dependency paths. No hidden navigation, no modal-heavy UI, no infinite nested tabs. Users should never feel lost.
7. **Neutral + universal visual language.** If the aesthetic targets Silicon Valley, gamers, academia, or minimalism enthusiasts, it accidentally excludes others. Aim for culturally neutral, soft academic, timeless: off-white paper backgrounds, muted ink-like colors, subtle dividers, textbook margins, restrained iconography. The UI should age slowly.
8. **Progress without gamification.** No XP, streaks, loot-box dopamine, fake productivity metrics. Use knowledge maps, visible prerequisites, completion clarity, concept mastery, path visualization. A learner should feel "I understand more," not "number go up."
9. **Transparency builds trust.** BLUE depends on verification systems, so show why guides are trusted, show verifier reasoning, show revision history, show disputes openly. Never hide process legitimacy. People trust visible systems more than opaque authority.
10. **Accessibility is core, not a feature.** Keyboard navigation, screen reader support, dyslexia-friendly options, adjustable text sizing, dark/light modes, high contrast, reduced motion. Education should not require perfect eyesight, hearing, or motor control.
11. **Depth should feel infinite but navigable.** The hierarchy should feel enormous, interconnected, frontier-reaching — while still feeling approachable, climbable, structured. The user should feel "I can keep going forever." That emotional sense is core to BLUE's identity.
12. **The UI should never feel like it wants something from you.** No "buy / subscribe / click / stay / upgrade." No manipulative urgency, no countdown pressure, no "limited time." BLUE communicates "learn / explore / understand / build." The UI should feel intellectually honest.

**Aesthetic direction:** *Modern Technical Library* — old scientific textbooks, museum archives, Obsidian, Linear, Notion's restraint, early-web simplicity, academic publishing — but warmer, more human, less corporate.

---

## Core Mental Model

Three interlocking systems define the product. Most design decisions trace back to one of them.

### Hierarchy

- Each subject has a hierarchy of levels.
- Level 1 = atomic primitives (e.g. *build a transistor*, *how a cell works*).
- Each level composes the level below.
- Level boundaries are enforced: a guide cannot reference content above its own level as a prerequisite.
- New hierarchies can be created for new systems (e.g. an alternative math), as long as they follow the same shape.
- Every level-N guide must be completable using only level <N content. No skipped steps. A reader starting at level 1 can climb all the way up without external prerequisites.

### Methods & alternatives

- Inside a canonical guide, competing *practice* routes live as *methods*; competing *theoretical* framings live as *alternatives*.
- Each method or alternative has its own page and is linkable.
- Community **upvotes and downvotes** rank sibling methods and alternatives; sustained preference can promote one to the main approach.

### Verifier System

- New guides and edits are reviewed by an **odd-numbered random jury of verifiers** for that subject + level.
- Reviews have a timer (hours to weeks depending on scope).
- Majority vote → publish. Otherwise → back to author.
- Every vote requires a written justification. Silent votes risk loss of verifier status.
- Post-publication, users can upvote/downvote. Enough downvotes inside a window auto-routes the guide back for revision.
- Becoming a verifier requires subject- and level-specific testing.
- Higher levels → stricter tests.
- Multi-subject verifiers allowed.

### Disputes

- Standing required to open one. Spammers get rate-limited.
- All votes use odd-numbered panels; ties auto-eject a member.
- Cross-niche disagreement on a shared guide → spin-off (fork into two niche-specific versions).
- Resolution authority depends on dispute type. Vote disputes go to an independent board to avoid conflicts of interest.

---

## What This Repo Is

Early scaffolding for the website. The hard problems are social and structural (hierarchy enforcement, verifier selection, dispute resolution); the code is the delivery vehicle.

**Workspace layout** (pnpm workspace):

- `api/` — Hono backend. Source of truth for types: `api/src/index.ts` exports `AppType`, which the frontend consumes via `hc<AppType>`.
- `app/` — React 19 + Vite 8 frontend.
- `supabase/` — database / auth / storage (used by `api/`, not by `app/` directly).

## Guidance for AI Assistants

When writing code or proposing designs in this repo:

- **Anchor to the principles above.** If a feature would create a paywall, allow non-contextual ads, let high-level content sneak in unexplained prerequisites, or duplicate canonical guides, flag it instead of building it.
- **Default to mechanisms that resist capture.** Verifier selection, ranking, and dispute resolution are all attack surfaces. Random selection, odd panels, transparent justifications, and separation of roles exist specifically to make capture harder. Don't simplify them away for convenience.
- **Treat "how do we make this work at scale" as a first-class question, not an afterthought.** A naive Wikipedia clone fails — the design exists because the obvious approaches don't work.
- **Don't import assumptions from edtech SaaS.** No course-completion gamification, no engagement metrics that pressure authors to write clickbait, no "free trial" flows. The site isn't a product funnel.
- **Public-facing copy is in the README.** This file is for internal/AI consumption — operational, not marketing.
