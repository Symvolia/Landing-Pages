create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  rating integer not null check (rating between 1 and 5),
  content text not null,
  project text not null,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.reviews enable row level security;

revoke all on table public.reviews from anon, authenticated;
grant all on table public.reviews to service_role;
