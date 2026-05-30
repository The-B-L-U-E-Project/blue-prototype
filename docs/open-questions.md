# Open Design Questions

This file is a **catalog of unresolved questions** about the BLUE system. It is the canonical "what we still need to figure out" document. 

Each entry has:

- **Q** — the open question
- **Sebastian's take** — his tentative answer, if any (paraphrased; absence means he explicitly said he didn't know)
- **Status** — `open` (no answer), `partial` (gestured at, not resolved), `tentative` (his answer exists but he flagged it as a starting point only)

The original mission constraints (free forever, zero prerequisites, one canonical guide, contextual ads only, profit subordinate to mission) live in the `README`. Those are non-negotiable. Everything below is.

> **Terminology note.** Sebastian's framing used a single **verifier** role for both pre-publish review and post-publish dispute/oversight. The current system in `[overall-system.md](overall-system.md)` splits these into two roles:
>
> - **Verifier** — pre-publish gate. Non-expert, rubric-bound panel, justified in writing.
> - **Moderator** — post-publish review, re-review panels triggered by the vote+rubric signal, and dispute panels.
>
> Where Sebastian's "verifier" refers to post-publish duties below, read it as today's "moderator." Sebastian's takes are preserved verbatim for traceability.

---

## 1. Legal, Jurisdictional & Existential

### 1.1 Where to incorporate

- **Q:** Where should BLUE be legally based to minimize jurisdictional attack surface (US gov, traditional education industry, IP-holding corporations)?
- **Sebastian's take:** Some country where it's "harder for the US government to come after you." No specific jurisdiction proposed.
- **Status:** open

### 1.2 IP / trade-secret exposure

- **Q:** How does BLUE handle guides that touch active corporate IP (e.g. "How to build an iPhone 17") without getting strangled by lawsuits?
- **Sebastian's take:** Acknowledges the problem; offers no defense beyond "be aware of what you're getting into" and incorporate strategically.
- **Status:** open

### 1.3 Startup capital

- **Q:** Where does the initial money come from without poisoning the mission (VCs / angels demanding ROI normally implies eventual paywalls or ad pollution)?
- **Sebastian's take:** No experience with this; explicitly punts.
- **Status:** open

### 1.4 Corporate form & charter — the "Constitution"

- **Q:** What goes in BLUE's operating agreement to make the mission resistant to capture by future leadership?
- **Sebastian's take:** Treat the operating agreement like a constitution. Specifically:
  - **Termination Clause:** regular users can cast "termination" votes against leadership; if a threshold passes within a 90-day window, leadership is automatically removed.
  - The voting/termination mechanism must be **kept architecturally separate from the website itself** so site updates can't tamper with it.
  - The operating agreement must require this voting mechanism to remain effective in perpetuity.
  - **No share sales** — shareholder interests can never become a corrupting force.
  - **No rebranding** beyond aesthetic changes — closes the "rebrand → new operating agreement → drop the constraints" loophole.
  - Regular users must be able to **download any/all parts of the knowledge base** so backups exist outside corporate control.
  - Auto-termination of any employee (including CEO) caught taking bribes for ad-ranking influence.
- **Status:** tentative on the structure; **open** on every concrete number/threshold (how many termination votes? how is bribe-taking detected? what counts as a "rebrand"? where does the voting infrastructure physically live?)

---

## 2. Hierarchy & Content Structure

### 2.1 What goes on each level

- **Q:** Who decides what content lives at level N of a given hierarchy, and how is the level-N-must-be-completable-from-level-<N invariant actually enforced?
- **Sebastian's take:** "Up to the site users." Verifiers manage their own hierarchy (see 6.2).
- **Status:** open — there's no proposed mechanism for catching prerequisite-skipping at scale.

### 2.2 Creating new hierarchies

- **Q:** When can someone spin up an entirely new hierarchy (e.g. an alternative math system) instead of contributing to an existing one?
- **Sebastian's take:** Allowed "as long as it's structured appropriately" — no gatekeeping process specified.
- **Status:** open

### 2.3 Information consolidation vs spin-offs

- **Q:** "One canonical guide per topic" is a core principle, but the dispute-resolution proposal allows a guide to fork into two niche-specific versions when verifiers from different niches can't agree (see 7.2). How is this contradiction managed?
- **Sebastian's take:** Acknowledges the contradiction outright; offers no resolution.
- **Status:** open

---

## 3. Verifier System

### 3.1 Level inheritance

- **Q:** Should a high-level verifier automatically be allowed to vote on lower-level content, or must they pass each level's test independently?
- **Sebastian's take:** **No automatic inheritance.** Expertise at a higher level doesn't imply competence at lower levels.
- **Status:** resolved (per Sebastian); kept here for traceability.

### 3.2 Multi-subject verifiers

- **Q:** Can one user be a verifier in multiple subjects?
- **Sebastian's take:** Yes — analogous to a college double-major.
- **Status:** resolved in principle; **open** on whether there are caps, conflict-of-interest rules, or workload limits.

### 3.3 Required vote justifications

- **Q:** Verifiers must justify each vote in writing, on pain of losing verifier status. What's the bar for "good enough" justification, and who judges that?
- **Sebastian's take:** Silent or trivial justifications risk loss of status — but the judging body is unspecified.
- **Status:** open

### 3.4 Downvote-driven auto-revision threshold

- **Q:** How are user-downvote thresholds calibrated so unpopular-but-correct content isn't mob-deleted?
- **Sebastian's take:** A downvote threshold doesn't unpublish; it routes the guide to a verifier review state. Verifiers check for misinformation. If none, guide stays up; if some, verifiers edit or replace. Specific numbers / time windows: unspecified.
- **Status:** **structurally resolved** by `[overall-system.md](overall-system.md)` §"Post-Publish: Vote-Based Verification" — downvotes are rubric-bound (9 categories), public display is totals only, and re-review fires from a moderator panel on a three-path trigger (ratio / rubric-weighted / section-density) with a minimum-vote floor so low-traffic guides cannot be tripped. Concrete thresholds and the minimum-vote floor remain **open**.

### 3.5 Verifier vs. user conflict

- **Q:** What happens when verifiers publish a guide and users hate it / spam-downvote it? Does verifier authority win, or does user feedback win, or does it depend?
- **Sebastian's take:** Explicitly unresolved. Notes the tension: locking out user-driven takedowns hands verifiers + test makers near-total control of information.
- **Status:** open

### 3.6 Verifier abuse — vote spam and trolling

- **Q:** What can verifiers actually call votes on, how often, and what stops a hostile verifier from spamming the voting system?
- **Sebastian's take:** Verbatim — "I don't have a definitive answer to" this. Suggests verifiers should be able to "police their own" by removing obnoxious members; suggests Roles within a niche to prevent every verifier from voting on every change. UX/UI for vote-calling deferred entirely.
- **Status:** open

### 3.7 Initial verifier seeding

- **Q:** When BLUE is brand new and a niche has zero or one verifiers, how does that niche start publishing anything?
- **Sebastian's take:** Maybe require a minimum verifier count per niche (count varies by hierarchy level) before voting is allowed. Or appoint temporary verifiers manually until the population grows.
- **Status:** partial

---

## 4. Test Maker & Auditor Roles

### 4.1 Who designs verifier tests

- **Q:** Who creates the tests that gate the verifier role for each niche × level?
- **Sebastian's take:** In the cold-start phase, contracted outside experts. Long-term, a **Test Maker** role: a niche-and-level-specific role granted to experienced verifiers via a verifier-approved application process. Test Makers can collaborate with other Test Makers in the same niche × level.
- **Status:** tentative — concrete eligibility criteria, application flow, and credibility metrics are unspecified.

### 4.2 Test quality

- **Q:** How do you make sure verifier tests are actually good?
- **Sebastian's take:** A 1–5 star rating system with written reviews, viewable by all. Crucially **mass downvotes cannot remove a test** — only signal poor quality.
- **Status:** partial — the disconnect between "tests can be rated badly" and "tests can't be removed" implies an editorial intervention path that isn't described.

### 4.3 Test bias / Test Maker abuse

- **Q:** What prevents Test Makers from designing tests that are technically valid but politically/ideologically biased to gatekeep?
- **Sebastian's take:** Introduce **Auditors** — a small role that can permanently revoke Test Maker or Verifier status for patterns of malicious or unfair behavior. Auditors follow strict rules and **cannot create or moderate content** themselves (separation of roles, anti-conflict-of-interest).
- **Status:** tentative — Auditor selection, accountability for Auditors themselves, and what counts as "pattern of malicious behavior" all unspecified.

### 4.4 Allowed test criteria

- **Q:** Can a Test Maker require things like "verifiers for level 7 physics must have IQ ≥ 120"?
- **Sebastian's take:** Yes, "as long as testing criteria ultimately contributes to the quality of the content, rather than detracting from it." Who judges contribution-vs-detraction is not specified.
- **Status:** open

---

## 5. New Niches & New Hierarchies

### 5.1 Niche creation flow

- **Q:** New niches (e.g. "Elevator Hacking" splitting off from "Hacking") have to come from somewhere. Who calls the vote and who votes?
- **Sebastian's take:** As specialized content accumulates under a broader niche, verifiers (or any user with sufficient standing) can call a vote on whether to spawn a new niche. If passed, the niche and an accompanying hierarchy are created.
- **Status:** tentative — voting threshold, who's eligible to call the vote, and how the new hierarchy's level structure is initialized are all unspecified.

### 5.2 Niche approval gating

- **Q:** Who actually approves a new niche after a vote passes?
- **Sebastian's take:** Options: (a) auto-approve on majority verifier vote + at least one Test Maker attached, (b) require Auditor approval, or (c) case-dependent. Not committed.
- **Status:** open

### 5.3 Required Test Maker before niche creation

- **Q:** Must one or more Test Makers be assigned to a new niche before it can launch (so verifier screening can begin)?
- **Sebastian's take:** Probably yes. Floated as a likely requirement.
- **Status:** partial

### 5.4 Cold-start a niche with too few verifiers

- **Q:** A niche has too few verifiers for any vote to be statistically meaningful — what now?
- **Sebastian's take:** Hold publishing until the verifier population reaches a minimum (level-dependent), or appoint temporary verifiers.
- **Status:** partial — mirror of 3.7.

---

## 6. Multi-Niche Content & Hierarchy Management

### 6.1 Cross-niche content

- **Q:** A single guide (e.g. "T-cell Anatomy") legitimately belongs to multiple niches/hierarchies (Biology, Biochemistry, Medicine). How is this represented?
- **Sebastian's take:** Multi-label / tag system. Each owning niche shows as a label on the guide. The guide is one canonical entity; the niche tags control where it's visible in each hierarchy.
- **Status:** tentative — labels are described; cross-niche edit conflicts (see 7.2) reveal it's not enough.

### 6.2 Authority over niche membership

- **Q:** Who can add, remove, and reorder a guide within a hierarchy?
- **Sebastian's take:**
  - Verifiers can add/remove guides **within their own hierarchy** but **never within someone else's**. (Math verifiers can detach a "Concentric Shapes" guide from the Math hierarchy but cannot detach it from the Physics hierarchy.)
  - Verifiers can move guides up/down their own hierarchy when the level placement is wrong.
  - Some kind of in-niche **consensus** is required for hierarchy changes — but if every verifier had to vote on every change, it'd be unworkable, so verifiers should be allowed to assign **Roles** (organization, publication-voting, modification-voting, etc.) by majority vote. Until roles exist, all verifiers vote on all tasks.
- **Status:** tentative — Role assignment mechanics, role-revocation, and tie-breaking inside small niches are unspecified.

---

## 7. Disputes

### 7.1 Even-numbered verifier panels

- **Q:** Votes use odd-numbered panels to prevent ties; if the eligible pool is even, someone is auto-ejected. Who, and by what rule?
- **Sebastian's take:** Acknowledges the problem; doesn't pick a rule.
- **Status:** open

### 7.2 Cross-niche disagreement on shared content

- **Q:** Verifiers from two niches that both own a guide disagree on its content — what happens?
- **Sebastian's take:** Spin-off: clone the guide so each niche gets its own editable copy. **Explicitly contradicts** the "one canonical guide per topic" principle.
- **Status:** open — Sebastian flags this as an unresolved contradiction with information consolidation (see 2.3).

### 7.3 Content disputes — author specificity

- **Q:** How is a content dispute opened?
- **Sebastian's take:** Opener must specify what the problem is and exactly which parts of which guides/articles/hierarchies must change — even when the fix spans many.
- **Status:** tentative — UX unspecified; threshold of "specific enough" unspecified.

### 7.4 Dispute discussion threads

- **Q:** Where do users discuss an open dispute?
- **Sebastian's take:** Auto-created message thread per dispute, deleted when the dispute resolves.
- **Status:** tentative — moderation, archival (audit trail vs. delete), and visibility scoping unspecified.

### 7.5 Theory vs. Practice dispute timing

- **Q:** Should disputes have a deadline?
- **Sebastian's take:**
  - **Practice guides:** mandatory time limit; verifiers must propose and vote on a resolution before it expires.
  - **Theory guides:** disputes may exist indefinitely (forcing resolution to "what causes gravity" is absurd). Once a resolution is finally proposed, *that* resolution gets a vote timer.
- **Status:** tentative — concrete time windows are not pinned.

### 7.6 Vote timers in general

- **Q:** How long should a vote stay open?
- **Sebastian's take:** Depends on (a) what's being voted on, (b) the content's hierarchy level, (c) the user ranks involved, (d) the niches involved. Lower-level content → hours to a couple days. Higher-level / more complex content → days to weeks. Larger-scope disputes → more time.
- **Status:** partial — directional rule given; concrete numbers not.

### 7.7 Dispute-resolution authority

- **Q:** Who resolves a dispute?
- **Sebastian's take:** Depends on dispute type. Hierarchy-placement disputes → whoever owns hierarchy organization (a Role inside the niche) plus a neutral outside Auditor. Possibly more experienced verifiers in some cases. Possibly a fully separate dispute-resolution subsystem to enforce separation of concerns.
- **Status:** open — explicitly punted ("strong leaders... will have to dedicate themselves").

### 7.8 Spam disputes

- **Q:** How do you stop dispute-spammers?
- **Sebastian's take:** Require user to be in good standing to open a dispute. Auditors can ban repeat spammers from opening new ones. Or rate-limit users to a handful of open disputes at a time.
- **Status:** tentative — exact thresholds, "good standing" definition, and Auditor accountability unspecified.

---

## 8. Theory vs. Practice Guides

### 8.1 Differentiating Theory and Practice

- **Q:** Should the system formally distinguish Theory (e.g. 2nd law of thermodynamics) from Practice (e.g. wiring an electrical circuit)?
- **Sebastian's take:** Yes — different labels, different structures.
  - **Practice guides** are end-goal-shaped: every section pushes toward the goal, simplest components → most complex.
  - **Theory guides** are centered on explaining the theory itself.
- **Status:** tentative — schema differences in storage, rendering, and editing are unspecified.

### 8.2 Strengths/weaknesses (red/green) panel for Theory guides

- **Q:** Theory guides should expose what the theory explains (green) vs. doesn't explain (red), with cross-links to contradicting theories. Who maintains this list?
- **Sebastian's take:** Probably verifiers — opening it to all users is exploitable. When a theory is updated, verifiers should review which red/green items still apply.
- **Status:** partial — exact gating, manipulation defenses, and what triggers a red/green review unspecified.

### 8.3 Allowed theories — "neutral perspective"

- **Q:** Which theories/hypotheses are admissible? Including controversial / minority / failed-but-historically-important ones?
- **Sebastian's take:** Extremely wide range allowed if **fitted properly to a hierarchy** and **written from a neutral perspective**. "The Theory of X posits that X is true" — never "Our group believes X is true."
- **Status:** tentative — "neutral perspective" enforcement is not described, and adjudicating it is a prime capture vector.

---

## 9. Advertising & Monetization

### 9.1 Ad-ranking manipulation

- **Q:** How is review-bot fraud (advertisers gaming the like/dislike rankings) detected at scale?
- **Sebastian's take:** Acknowledges the risk; no detection mechanism proposed.
- **Status:** open

### 9.2 Bribe-detection enforcement

- **Q:** The operating agreement's "any employee taking bribes for ad-ranking influence is auto-terminated" clause is only useful if bribes can be detected. How?
- **Sebastian's take:** Doesn't say.
- **Status:** open

### 9.3 Contextual-ad scope

- **Q:** What counts as a guide-relevant ad? (Tools? Educational books? Adjacent services? Substitute products?) Where exactly is the line drawn before contextual advertising slips into general advertising?
- **Sebastian's take:** Ads only on guides directly related to the product/service; ads confined to a defined region of the page. Specifics on the relatedness test are not given.
- **Status:** open

### 9.4 Advertiser influence firewall

- **Q:** How is the advertising relationship structurally prevented from influencing content or rankings (in either direction)?
- **Sebastian's take:** Asserted as a non-negotiable principle but with no enforcement architecture.
- **Status:** open

---

## 10. Walkthroughs & Personalization

### 10.1 Goal-oriented entry

- **Q:** Most users will arrive with a high-level goal in mind, not a desire to study a whole hierarchy bottom-up. How does the site help?
- **Sebastian's take:** Highlight only the lower-level guides that are actually prerequisites for that specific high-level goal, instead of forcing the user through everything below it.
- **Status:** tentative — no algorithm for "actually a prerequisite for *this* goal" specified.

### 10.2 User-generated Walkthroughs

- **Q:** Should users be able to create named "Walkthroughs" — curated linear tracks ending in a specific high-level guide — and share them?
- **Sebastian's take:** Yes. Picking a high-level guide as the "finish line" auto-isolates required lower-level guides on a single track. Walkthroughs should be downloadable for offline access.
- **Status:** tentative — sharing model, attribution, dispute handling for walkthroughs unspecified.

### 10.3 Hierarchy visualization

- **Q:** How do users *see* the hierarchy and the connections between guides?
- **Sebastian's take:** A visualizer should exist. ("Bird's Eye" mode flagged separately as showing all hierarchies in a single visualizer.)
- **Status:** open — no design.

### 10.4 Completion tracking

- **Q:** Should the site track which guides a user has completed?
- **Sebastian's take:** Yes — and use that to let users build Walkthroughs from *only* uncompleted guides.
- **Status:** tentative — what counts as "completed" is undefined and especially fraught for Practice guides where completion is a real-world action the site can't observe.

---

## 11. Badges & Reward System

### 11.1 Should there be badges at all

- **Q:** BLUE's UI principles forbid gamification (no XP, streaks, dopamine loops). Where do badges fit?
- **Sebastian's take:** Badges as artifacts of progress, not of engagement. Differentiated by what was earned (Completion, Verifier, Test Maker, Activity), by niche, by level. Designs differ per niche × level.
- **Status:** **conflict** — needs explicit reconciliation with the "no gamification" UI principle.

### 11.2 Who designs badges

- **Q:** Test Makers? Verifiers? Both?
- **Sebastian's take:** Either, optionally. Not committed.
- **Status:** open

### 11.3 Badges as privileges

- **Q:** Should some badges unlock voting rights or role eligibility (e.g. "you need badge X to apply as Test Maker for level 7 Medicine")?
- **Sebastian's take:** "Maybe." Floated, not adopted.
- **Status:** open — significant design implication: badges become structural, not cosmetic.

### 11.4 Activity badges

- **Q:** Should there be a separately-categorized "Activity" badge measuring how recently a user has been engaged with their niche, used to gate certain time-sensitive votes?
- **Sebastian's take:** Probably useful — keeps stale verifiers from voting on rapidly-changing topics. Visually distinct from regular badges.
- **Status:** tentative — calculation method, decay, gaming resistance unspecified.

### 11.5 Re-issuing badges on hierarchy changes

- **Q:** When a hierarchy/niche undergoes a major change, should new badge designs be issued so a user's badges show how up-to-date they are with the current "meta"?
- **Sebastian's take:** Probably. Tied to the reality that science and technology landscapes shift.
- **Status:** open

---

## 12. Quality-of-Life Subsystems (all open)

Sebastian flagged these as "Other Possible Additions" — none have detailed designs.

- Content-reporting system
- Guide-requesting system
- "A Guide to Writing Guides" — for content creators; differentiates Theory vs. Practice; explains hierarchy linkage; covers dispute policy; emphasizes clarity, accuracy, consolidation, elimination of redundancy and trivial content
- Starter Guide — for readers; teaches how the BLUE system itself works
- 3D model / graph visualization application embeddable inside guides
- Practice-guide "Priority" labels (Gas Efficiency vs. Cheapness vs. ...) to differentiate *methods* by what they optimize; analogous dimensions for *alternatives* on more theoretical guides; potentially its own filterable category
- "Bird's Eye" — single visualizer of every hierarchy and guide
- Recent Changes feed (Wikipedia-style), with filter
- Notifications / Alerts system
- Access to previous versions of guides (with their historical likes/dislikes/ratings)
- Multi-author guides
- Messaging system, with role-aware rules:
  - **Regular users:** Discord-style threads, niche-independent, public
  - **Verifiers:** niche-dependent, public threads, regular users cannot post but can read
  - **Test Makers:** closed, niche-dependent (test contents must not leak); Auditors gain access during audits
  - **Auditors:** can read all Test Maker messages on audit

For each, the open question is the same shape: what is the spec, who builds it, how does it interact with the verifier/auditor system, how is it abused?

---

## 13. Operational

### 13.1 Day-to-day adjudication

- **Q:** Who runs BLUE day-to-day, and how is leadership selected / replaced (beyond the termination clause in 1.4)?
- **Sebastian's take:** Punted — "strong leaders who are good at coming up with fair solutions."
- **Status:** open

### 13.2 Sustainability without mission drift

- **Q:** Beyond the contextual-ad model, what diversification (donations, grants, etc.) is allowed without violating the "profit must not become the priority" principle?
- **Sebastian's take:** Not addressed. Only contextual ads are explicitly endorsed as ethical.
- **Status:** open

