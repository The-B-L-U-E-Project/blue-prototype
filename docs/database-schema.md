# Database Schema

This doc serves as the file for laying out the database schema for this site. This is still a work in progress and is subject to change.

## Purpose

BLUE stores one global graph of canonical guides. A guide is both a readable content object and a node in the learning graph. The graph is used to derive subject views, frontiers, walkthroughs, levels, and reachability.

The schema deliberately keeps the database source of truth small:

- Store guides and their guide-to-guide relationships.
- Store subjects as tags on guides, not as separate trees.
- Store methods and alternatives under their parent guide.
- Store version history for guides, methods, and alternatives.
- Do not store values that can be derived from the graph.

### `guides`

Important fields:

- `slug`: stable URL identifier.
- `title`: human-readable guide title.
- `summary`: short description for lists and previews.
- `status`: draft lifecycle state.
- `author_id`: original author profile.

Current statuses are:

- `draft`
- `in_review`
- `provisional`
- `published`
- `archived`

### `guide_revisions`

Immutable version history for guide content.

Each revision stores:

- `guide_id`
- `revision_number`
- `title`
- `summary`
- `body`
- `change_summary`
- `author_id`

The schema does not yet include a full submission/publication workflow, so current content is resolved by revision order for now. A later governance migration can add explicit accepted revision pointers or submission records.

### `guide_edges`

Relationships between guides.

The key fields are:

- `from_guide_id`
- `to_guide_id`
- `edge_type`

For prerequisite edges, direction means:

```text
from_guide_id -> to_guide_id
```

Example:

```text
Arithmetic -> Algebra
edge_type = prerequisite
```

That means Arithmetic must be understood before Algebra.

Allowed edge types right now are:

- `prerequisite`
- `used_in`
- `recommended_before`

Only `prerequisite` edges form the learning DAG. Walkthrough generation, level computation, frontier detection, and reachability checks must ignore other edge types.

The migration includes a trigger that prevents cycles among prerequisite edges. Non-prerequisite edges may be cyclic because they do not define learning order.

### `subjects`

Subject tags, such as Math, Physics, or Game Development.

Subjects are not containers and do not own guides. They are filters over the global guide graph.

### `guide_subjects`

Many-to-many join table between guides and subjects.

This allows one canonical guide to appear in multiple subject views without duplicating content.

Example:

```text
Guide: Vectors
Subjects: Math, Physics, Game Development
```

### `todo_prerequisites`

Missing prerequisite topics declared by authors when a real guide does not exist yet.

Example:

```text
Dependent guide: Newton's laws
TODO prerequisite: Vectors
status = open
```

When the missing guide is created, the TODO can be marked `resolved` and linked through `resolved_guide_id`.

Reachability is still derived, not stored. A guide is awaiting prerequisites when it has unresolved TODO prerequisites or unresolved transitive prerequisites.

### `guide_variants`

Methods and alternatives attached to a canonical parent guide.

Allowed variant types are:

- `method`: a competing practice route to the same outcome.
- `alternative`: a competing theoretical framing of the same topic.

Variants have their own slug, title, status, author, and revision history.

### `guide_variant_revisions`

Immutable version history for methods and alternatives.

This mirrors `guide_revisions` so variants can evolve without losing previous versions.

## Derived Data

These are computed from prerequisite edges and optional subject filters.

### Levels

A level is computed inside a walkthrough. The level of a guide is its longest prerequisite path from a primitive within that walkthrough.

The same guide can have different levels in different walkthroughs, so storing a global level would be wrong.

### Frontiers

A frontier is a guide with no dependents inside a subject-filtered graph.

The same guide can be a frontier in one subject and a prerequisite in another, so frontier status is derived per subject view.

### Reachability

Reachability is computed by checking whether every transitive prerequisite exists and whether TODO prerequisites remain unresolved.

Storing `reachable` would risk drift whenever an edge, guide, or TODO prerequisite changes.

### Walkthroughs

Most walkthroughs should be generated on demand by picking a target guide and computing its transitive prerequisite DAG.

Saved or user-curated walkthroughs are intentionally left for a later migration because their sharing, attribution, and dispute model is still open in `docs/open-questions.md`.

## Row Level Security

All new tables have row level security enabled.

The first-pass policy is intentionally conservative:

- Public users can read `provisional` and `published` guide graph content.
- Authors can read and edit their own drafts.
- Authenticated users can create draft guides.
- Authenticated users can create draft methods or alternatives under public/provisional guides.
- Guide authors can attach draft prerequisites, subject tags, and TODO prerequisites to their own draft guides.
- Subject prerequisite floors are publicly readable, but writes are left to service-role/governance code for now.

## Going forward

Still need to add schemas for moderator panels, votes, disputes, and publication decisions are not modeled yet.

