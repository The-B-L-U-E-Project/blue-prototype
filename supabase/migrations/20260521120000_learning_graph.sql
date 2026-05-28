-- Initial BLUE learning graph schema.
--
-- Source of truth:
-- - guides are canonical learning objects and graph nodes.
-- - guide_edges connect guides; only edge_type = 'prerequisite' forms the DAG.
-- - subjects are tags/views, not containers.
-- - levels, frontiers, reachability, and generated walkthroughs are derived.

create table public.guides (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  summary text,
  status text not null default 'draft',
  author_id uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint guides_slug_format check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  constraint guides_title_nonempty check (char_length(trim(title)) > 0),
  constraint guides_status_valid check (status in ('draft', 'in_review', 'provisional', 'published', 'archived'))
);

create table public.guide_revisions (
  id uuid primary key default gen_random_uuid(),
  guide_id uuid not null references public.guides (id) on delete cascade,
  revision_number integer not null,
  title text not null,
  summary text,
  body text not null,
  change_summary text,
  author_id uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  constraint guide_revisions_revision_number_positive check (revision_number > 0),
  constraint guide_revisions_title_nonempty check (char_length(trim(title)) > 0),
  constraint guide_revisions_body_nonempty check (char_length(trim(body)) > 0),
  constraint guide_revisions_guide_revision_unique unique (guide_id, revision_number)
);

create table public.guide_edges (
  id uuid primary key default gen_random_uuid(),
  from_guide_id uuid not null references public.guides (id) on delete cascade,
  to_guide_id uuid not null references public.guides (id) on delete cascade,
  edge_type text not null default 'prerequisite',
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  constraint guide_edges_no_self_edge check (from_guide_id <> to_guide_id),
  constraint guide_edges_edge_type_valid check (edge_type in ('prerequisite', 'used_in', 'recommended_before')),
  constraint guide_edges_unique unique (from_guide_id, to_guide_id, edge_type)
);

create table public.subjects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint subjects_slug_format check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  constraint subjects_name_nonempty check (char_length(trim(name)) > 0)
);

create table public.guide_subjects (
  guide_id uuid not null references public.guides (id) on delete cascade,
  subject_id uuid not null references public.subjects (id) on delete cascade,
  added_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  primary key (guide_id, subject_id)
);

create table public.subject_prerequisite_floors (
  subject_id uuid not null references public.subjects (id) on delete cascade,
  guide_id uuid not null references public.guides (id) on delete cascade,
  added_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  primary key (subject_id, guide_id)
);

create table public.todo_prerequisites (
  id uuid primary key default gen_random_uuid(),
  dependent_guide_id uuid not null references public.guides (id) on delete cascade,
  title text not null,
  description text,
  status text not null default 'open',
  resolved_guide_id uuid references public.guides (id) on delete set null,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint todo_prerequisites_title_nonempty check (char_length(trim(title)) > 0),
  constraint todo_prerequisites_status_valid check (status in ('open', 'resolved', 'dismissed')),
  constraint todo_prerequisites_resolved_requires_guide check ((status = 'resolved') = (resolved_guide_id is not null))
);

create table public.guide_variants (
  id uuid primary key default gen_random_uuid(),
  parent_guide_id uuid not null references public.guides (id) on delete cascade,
  slug text not null,
  title text not null,
  variant_type text not null,
  status text not null default 'draft',
  author_id uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint guide_variants_slug_format check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  constraint guide_variants_title_nonempty check (char_length(trim(title)) > 0),
  constraint guide_variants_type_valid check (variant_type in ('method', 'alternative')),
  constraint guide_variants_status_valid check (status in ('draft', 'in_review', 'provisional', 'published', 'archived')),
  constraint guide_variants_parent_slug_unique unique (parent_guide_id, slug)
);

create table public.guide_variant_revisions (
  id uuid primary key default gen_random_uuid(),
  variant_id uuid not null references public.guide_variants (id) on delete cascade,
  revision_number integer not null,
  title text not null,
  summary text,
  body text not null,
  change_summary text,
  author_id uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  constraint guide_variant_revisions_revision_number_positive check (revision_number > 0),
  constraint guide_variant_revisions_title_nonempty check (char_length(trim(title)) > 0),
  constraint guide_variant_revisions_body_nonempty check (char_length(trim(body)) > 0),
  constraint guide_variant_revisions_variant_revision_unique unique (variant_id, revision_number)
);

-- Keep prerequisite edges acyclic. Non-prerequisite relationships are allowed
-- to be cyclic because they do not define walkthrough order.
create or replace function public.prevent_prerequisite_cycle()
returns trigger
language plpgsql
as $$
begin
  if new.edge_type <> 'prerequisite' then
    return new;
  end if;

  if exists (
    with recursive reachable (guide_id) as (
      select ge.to_guide_id
      from public.guide_edges ge
      where ge.from_guide_id = new.to_guide_id
        and ge.edge_type = 'prerequisite'
        and ge.id <> coalesce(new.id, '00000000-0000-0000-0000-000000000000'::uuid)

      union

      select ge.to_guide_id
      from public.guide_edges ge
      join reachable r on r.guide_id = ge.from_guide_id
      where ge.edge_type = 'prerequisite'
        and ge.id <> coalesce(new.id, '00000000-0000-0000-0000-000000000000'::uuid)
    )
    select 1
    from reachable
    where guide_id = new.from_guide_id
  ) then
    raise exception 'Adding prerequisite edge % -> % would create a cycle', new.from_guide_id, new.to_guide_id;
  end if;

  return new;
end;
$$;

create trigger guide_edges_prevent_prerequisite_cycle
  before insert or update of from_guide_id, to_guide_id, edge_type on public.guide_edges
  for each row execute function public.prevent_prerequisite_cycle();

-- updated_at maintenance
create trigger guides_touch_updated_at
  before update on public.guides
  for each row execute function public.touch_updated_at();

create trigger subjects_touch_updated_at
  before update on public.subjects
  for each row execute function public.touch_updated_at();

create trigger todo_prerequisites_touch_updated_at
  before update on public.todo_prerequisites
  for each row execute function public.touch_updated_at();

create trigger guide_variants_touch_updated_at
  before update on public.guide_variants
  for each row execute function public.touch_updated_at();

-- Traversal and lookup indexes.
create index guides_status_idx on public.guides (status);
create index guides_author_id_idx on public.guides (author_id);
create index guide_revisions_guide_id_revision_number_idx on public.guide_revisions (guide_id, revision_number desc);

create index guide_edges_from_guide_id_idx on public.guide_edges (from_guide_id);
create index guide_edges_to_guide_id_idx on public.guide_edges (to_guide_id);
create index guide_edges_edge_type_idx on public.guide_edges (edge_type);
create index guide_edges_prerequisite_from_idx on public.guide_edges (from_guide_id) where edge_type = 'prerequisite';
create index guide_edges_prerequisite_to_idx on public.guide_edges (to_guide_id) where edge_type = 'prerequisite';

create index guide_subjects_subject_id_idx on public.guide_subjects (subject_id);
create index subject_prerequisite_floors_guide_id_idx on public.subject_prerequisite_floors (guide_id);
create index todo_prerequisites_dependent_guide_id_idx on public.todo_prerequisites (dependent_guide_id);
create index todo_prerequisites_resolved_guide_id_idx on public.todo_prerequisites (resolved_guide_id);
create unique index todo_prerequisites_open_title_unique
  on public.todo_prerequisites (dependent_guide_id, lower(title))
  where status = 'open';

create index guide_variants_parent_guide_id_idx on public.guide_variants (parent_guide_id);
create index guide_variants_status_idx on public.guide_variants (status);
create index guide_variant_revisions_variant_id_revision_number_idx
  on public.guide_variant_revisions (variant_id, revision_number desc);

-- Row level security.
alter table public.guides enable row level security;
alter table public.guide_revisions enable row level security;
alter table public.guide_edges enable row level security;
alter table public.subjects enable row level security;
alter table public.guide_subjects enable row level security;
alter table public.subject_prerequisite_floors enable row level security;
alter table public.todo_prerequisites enable row level security;
alter table public.guide_variants enable row level security;
alter table public.guide_variant_revisions enable row level security;

create policy "Public guides are readable"
  on public.guides for select
  to anon, authenticated
  using (status in ('provisional', 'published'));

create policy "Guide authors can read their guides"
  on public.guides for select
  to authenticated
  using (auth.uid() = author_id);

create policy "Authenticated users can create draft guides"
  on public.guides for insert
  to authenticated
  with check (auth.uid() = author_id and status = 'draft');

create policy "Guide authors can update draft guides"
  on public.guides for update
  to authenticated
  using (auth.uid() = author_id and status = 'draft')
  with check (auth.uid() = author_id and status = 'draft');

create policy "Public guide revisions are readable"
  on public.guide_revisions for select
  to anon, authenticated
  using (
    exists (
      select 1
      from public.guides g
      where g.id = guide_id
        and g.status in ('provisional', 'published')
    )
  );

create policy "Guide authors can read guide revisions"
  on public.guide_revisions for select
  to authenticated
  using (
    exists (
      select 1
      from public.guides g
      where g.id = guide_id
        and g.author_id = auth.uid()
    )
  );

create policy "Guide authors can create draft guide revisions"
  on public.guide_revisions for insert
  to authenticated
  with check (
    auth.uid() = author_id
    and exists (
      select 1
      from public.guides g
      where g.id = guide_id
        and g.author_id = auth.uid()
        and g.status = 'draft'
    )
  );

create policy "Public guide edges are readable"
  on public.guide_edges for select
  to anon, authenticated
  using (
    exists (
      select 1
      from public.guides g
      where g.id = from_guide_id
        and g.status in ('provisional', 'published')
    )
    and exists (
      select 1
      from public.guides g
      where g.id = to_guide_id
        and g.status in ('provisional', 'published')
    )
  );

create policy "Guide authors can read draft guide edges"
  on public.guide_edges for select
  to authenticated
  using (
    exists (
      select 1
      from public.guides g
      where g.id = to_guide_id
        and g.author_id = auth.uid()
    )
  );

create policy "Guide authors can create draft guide edges"
  on public.guide_edges for insert
  to authenticated
  with check (
    auth.uid() = created_by
    and exists (
      select 1
      from public.guides g
      where g.id = to_guide_id
        and g.author_id = auth.uid()
        and g.status = 'draft'
    )
  );

create policy "Guide authors can delete draft guide edges"
  on public.guide_edges for delete
  to authenticated
  using (
    exists (
      select 1
      from public.guides g
      where g.id = to_guide_id
        and g.author_id = auth.uid()
        and g.status = 'draft'
    )
  );

create policy "Subjects are readable"
  on public.subjects for select
  to anon, authenticated
  using (true);

create policy "Public guide subjects are readable"
  on public.guide_subjects for select
  to anon, authenticated
  using (
    exists (
      select 1
      from public.guides g
      where g.id = guide_id
        and g.status in ('provisional', 'published')
    )
  );

create policy "Guide authors can read draft guide subjects"
  on public.guide_subjects for select
  to authenticated
  using (
    exists (
      select 1
      from public.guides g
      where g.id = guide_id
        and g.author_id = auth.uid()
    )
  );

create policy "Guide authors can create draft guide subjects"
  on public.guide_subjects for insert
  to authenticated
  with check (
    auth.uid() = added_by
    and exists (
      select 1
      from public.guides g
      where g.id = guide_id
        and g.author_id = auth.uid()
        and g.status = 'draft'
    )
  );

create policy "Guide authors can delete draft guide subjects"
  on public.guide_subjects for delete
  to authenticated
  using (
    exists (
      select 1
      from public.guides g
      where g.id = guide_id
        and g.author_id = auth.uid()
        and g.status = 'draft'
    )
  );

create policy "Public subject prerequisite floors are readable"
  on public.subject_prerequisite_floors for select
  to anon, authenticated
  using (
    exists (
      select 1
      from public.guides g
      where g.id = guide_id
        and g.status in ('provisional', 'published')
    )
  );

create policy "Public todo prerequisites are readable"
  on public.todo_prerequisites for select
  to anon, authenticated
  using (
    exists (
      select 1
      from public.guides g
      where g.id = dependent_guide_id
        and g.status in ('provisional', 'published')
    )
  );

create policy "Guide authors can read draft todo prerequisites"
  on public.todo_prerequisites for select
  to authenticated
  using (
    exists (
      select 1
      from public.guides g
      where g.id = dependent_guide_id
        and g.author_id = auth.uid()
    )
  );

create policy "Guide authors can create draft todo prerequisites"
  on public.todo_prerequisites for insert
  to authenticated
  with check (
    auth.uid() = created_by
    and status = 'open'
    and resolved_guide_id is null
    and exists (
      select 1
      from public.guides g
      where g.id = dependent_guide_id
        and g.author_id = auth.uid()
        and g.status = 'draft'
    )
  );

create policy "Guide authors can update draft todo prerequisites"
  on public.todo_prerequisites for update
  to authenticated
  using (
    exists (
      select 1
      from public.guides g
      where g.id = dependent_guide_id
        and g.author_id = auth.uid()
        and g.status = 'draft'
    )
  )
  with check (
    exists (
      select 1
      from public.guides g
      where g.id = dependent_guide_id
        and g.author_id = auth.uid()
        and g.status = 'draft'
    )
  );

create policy "Guide authors can delete draft todo prerequisites"
  on public.todo_prerequisites for delete
  to authenticated
  using (
    exists (
      select 1
      from public.guides g
      where g.id = dependent_guide_id
        and g.author_id = auth.uid()
        and g.status = 'draft'
    )
  );

create policy "Public guide variants are readable"
  on public.guide_variants for select
  to anon, authenticated
  using (
    status in ('provisional', 'published')
    and exists (
      select 1
      from public.guides g
      where g.id = parent_guide_id
        and g.status in ('provisional', 'published')
    )
  );

create policy "Variant authors can read their variants"
  on public.guide_variants for select
  to authenticated
  using (auth.uid() = author_id);

create policy "Authenticated users can create draft guide variants"
  on public.guide_variants for insert
  to authenticated
  with check (
    auth.uid() = author_id
    and status = 'draft'
    and exists (
      select 1
      from public.guides g
      where g.id = parent_guide_id
        and g.status in ('provisional', 'published')
    )
  );

create policy "Variant authors can update draft variants"
  on public.guide_variants for update
  to authenticated
  using (auth.uid() = author_id and status = 'draft')
  with check (auth.uid() = author_id and status = 'draft');

create policy "Public guide variant revisions are readable"
  on public.guide_variant_revisions for select
  to anon, authenticated
  using (
    exists (
      select 1
      from public.guide_variants gv
      join public.guides g on g.id = gv.parent_guide_id
      where gv.id = variant_id
        and gv.status in ('provisional', 'published')
        and g.status in ('provisional', 'published')
    )
  );

create policy "Variant authors can read variant revisions"
  on public.guide_variant_revisions for select
  to authenticated
  using (
    exists (
      select 1
      from public.guide_variants gv
      where gv.id = variant_id
        and gv.author_id = auth.uid()
    )
  );

create policy "Variant authors can create draft variant revisions"
  on public.guide_variant_revisions for insert
  to authenticated
  with check (
    auth.uid() = author_id
    and exists (
      select 1
      from public.guide_variants gv
      where gv.id = variant_id
        and gv.author_id = auth.uid()
        and gv.status = 'draft'
    )
  );

comment on table public.guides is 'Canonical BLUE guide records. Guides are the nodes of the learning graph.';
comment on table public.guide_revisions is 'Immutable guide version history. Current content is resolved by revision order until submission workflow adds explicit publication pointers.';
comment on table public.guide_edges is 'Guide-to-guide relationships. Only prerequisite edges define the learning DAG used for levels, frontiers, reachability, and walkthroughs.';
comment on table public.subjects is 'Subject tags used to filter the global guide graph. Subjects do not own guides.';
comment on table public.guide_subjects is 'Many-to-many guide to subject tagging.';
comment on table public.subject_prerequisite_floors is 'Subject-level prerequisite floor guides used to avoid bloating subject views with every low-level dependency.';
comment on table public.todo_prerequisites is 'Missing prerequisite topics declared by authors before a canonical guide exists.';
comment on table public.guide_variants is 'Methods and alternatives attached to a canonical parent guide.';
comment on table public.guide_variant_revisions is 'Immutable version history for methods and alternatives.';

comment on column public.guide_edges.edge_type is 'Only prerequisite edges participate in DAG traversal. used_in and recommended_before are contextual relationships.';
