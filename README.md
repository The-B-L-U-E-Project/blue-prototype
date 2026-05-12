# Project BLUE

**BLUE** — **B**road **L**earning **U**niversal **E**ducation.

A free, universally accessible website where anyone can learn how to do things starting from zero prerequisite knowledge.

Inspired by [Sebastian Rey's idea on The List Podcast](https://www.youtube.com/watch?v=qcRKmm3B25c&t=58s).

---

## The Problem

When you're learning how to actually do something online, normal search conventions make learning very fragmented and tedious.


| Approach                                | What's missing                                                                                                                                |
| --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **The open web (search, blogs, video)** | Information is scattered. Niche topics might never surface. Searching requires hopping from site to site                                      |
| **Wikipedia-style encyclopedias**       | Random facts, so it doesn't necessarily teach you how to do anything.                                                                         |
| **Light how-to sites**                  | Fine for simple tasks, but sites/guides becomes much more sparse when tasks are harder and more niche.                                        |
| **Curated free curricula**              | Inconsistent in terms of depthness of information per topic. Some topics get a lot of thoroughness while others do not.                       |
| **AI chat / search summaries**          | General search and chat assistants' answer quality rely heavily on prompt wording, context limits, and allowed training or retrieval sources. |


---

## The Goal

One site. Any subject. Tutorial-structured. Free forever.

1. **Zero prerequisites** — you can start at the bottom of any topic and progress to the frontier.
2. **Free and universal** — no paywalls. If users have to pay to learn, the project's vision has been compromised.
3. **Unified, tutorial-shaped progression** — guides build on each other in enforced levels (see Core Design), not a pile of unrelated facts or shallow steps.

---

## Core Design

### 1. The Hierarchy

Every guide lives at a **level** in a subject's hierarchy.

- **Level 1** — most basic primitives (e.g. *build a transistor*, *how a cell works*).
- **Level 2** — combine level-1 primitives (e.g. *chain transistors into a logic gate*, *how cells form tissues*).
- **Level 3+** — keep composing upward until you reach the frontier of human knowledge.

**Hard rule:** every level-N guide must be completable using only level <N content. No skipped steps. A reader starting at level 1 can climb all the way up without external prerequisites.

Anyone can spin up a *new* hierarchy if they're proposing a new system (e.g. an alternative math). It just has to be structured the same way: simplest concepts at the bottom, building up.

### 2. One Guide Per Topic + Methods

- **One canonical guide per topic.** Want to write a new one? Either beat the existing guide or submit edits to it.
- **Methods sub-articles.** Inside a canonical guide, alternative approaches live as named *methods*. Each method has its own page and is linkable from elsewhere. A method that gains adoption can be promoted to the main approach.

### 3. The Verifier + Moderator System (WIP idea)

Wikipedia-style open moderation lets bad actors and biased reviewers dominate. Pure expert gatekeeping kills openness. BLUE splits the difference with two distinct community roles, both rubric-bound, panel-based, and required to justify decisions in writing.

**Pre-publish — Verifiers.** New guides and edits go through a verification gate.

- Reviewed by an **odd-numbered random jury of verifiers** drawn from the relevant subject pool.
- Each review has a **timer** (hours to weeks depending on scope).
- Verifiers are not required to be subject experts. Their job is structural: check hierarchy soundness, catch obvious errors, prevent duplication, confirm declared-axis claims on competing guides.
- Discretion is constrained: decisions are rubric-bound, justified in writing, and publicly logged. Verifiers who vote without explanation risk losing the role.
- Majority approve within the timer → publish. Otherwise → back to author.

**Post-publish — Moderators + community vote.** Every published guide accumulates upvotes and downvotes from learners.

- Upvote is a single click, no input required.
- **Downvote requires a rubric reason** from a fixed list (Unclear, Factually wrong, Missing step, Outdated, Broken link or asset, Prereq gap, Wrong level, Better method exists, Scope creep). An optional section pointer and free-form text can be attached.
- The public sees totals only. The per-rubric and per-section breakdown is moderator-only — both for signal precision and to make brigade detection harder to game.
- A re-review by a moderator panel fires when any of three trigger paths cross threshold (overall downvote ratio, rubric-weighted severity, or section-density flagging), with a minimum-vote floor so low-traffic guides cannot be tripped by a handful of votes.
- Moderators also sit on dispute panels.

**Credentialing.** Subject-expert credentialing for verifiers and moderators is deferred. Both roles as currently defined are structural-rubric jobs that do not require subject expertise, which also makes the roles recruitable in parallel with authors during cold start. Multi-subject participation is allowed.

### 4. Funding: Contextual Advertising Only

Hosting and dev cost real money. The only ethical funding model that doesn't compromise the mission:

- Guides that require materials or services link to advertisers selling exactly those materials/services.
- Pay-per-click or revenue share with the advertiser.
- **Ads must be contextual** (e.g. a Dodge Ram drivetrain guide can advertise drivetrain parts, nothing else). No site-wide banners, no off-topic placements.
- Ads are confined to a dedicated section of each guide. Plastering them everywhere kills the resource.
- Product rankings inside ad sections are driven by **user star ratings / like-dislike**, not advertiser bids. Advertisers compete on quality.
- Anti-fraud is non-negotiable: review-bombing and bot reviews must be detected and discarded.

### 5. Disputes

Disputes are inevitable: information accuracy, hierarchy placement, vote outcomes, role assignments, cross-niche overlaps.

Sketch of the system:

- **Standing required** to open a dispute. Repeat spammers get flagged by auditors and rate-limited or banned from opening new ones.
- **All votes are odd-numbered.** Even-tied panels auto-eject one member to break ties.
- **Spin-off resolution** for cross-niche disagreement: when two subject communities disagree on a shared guide, fork it into two niche-specific versions. Breaks the consolidation rule on purpose, as a release valve.
- **Resolution authority depends on the dispute type.** Hierarchy fights → hierarchy maintainers + a neutral auditor. Vote fights → an independent dispute board to avoid conflicts of interest.

---

## Why This Is Hard

Worth saying upfront, since anyone building this needs eyes open:

- **Legal pressure.** Traditional education sells the scarcity of specialized knowledge. A free, exhaustive alternative is an existential threat to that business model. Expect lawsuits, copyright claims, takedown attempts.
- **Corporate pressure.** Detailed guides on building proprietary products (think *how to build an iPhone 17*) will draw legal fire from the manufacturers.
- **Jurisdiction matters.** Where the entity is incorporated will materially affect survival odds.
- **Funding without compromising the mission.** The moment profit becomes the priority, BLUE becomes another paywalled aggregator and the project has failed.

Legal scaffolding has to come *before* the site does.

---

## Contributing

Open. Issues, PRs, and design challenges to the verifier / moderator / hierarchy / dispute systems are all welcome.