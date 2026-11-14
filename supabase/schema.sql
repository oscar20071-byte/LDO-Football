-- LDO Football: almacenamiento privado de partidas en Supabase
-- Ejecuta este archivo en Supabase > SQL Editor con el propietario del proyecto.
create table if not exists public.ldo_saves (
  user_id uuid primary key references auth.users(id) on delete cascade,
  payload jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.ldo_saves enable row level security;

drop policy if exists "Users can read their own LDO save" on public.ldo_saves;
create policy "Users can read their own LDO save"
  on public.ldo_saves for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users can insert their own LDO save" on public.ldo_saves;
create policy "Users can insert their own LDO save"
  on public.ldo_saves for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "Users can update their own LDO save" on public.ldo_saves;
create policy "Users can update their own LDO save"
  on public.ldo_saves for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

grant select, insert, update on public.ldo_saves to authenticated;
