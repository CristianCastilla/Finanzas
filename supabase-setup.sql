-- ============================================================
--  Base de datos para el panel de finanzas
--  Pega TODO esto en Supabase -> SQL Editor -> New query -> Run
-- ============================================================

-- 1) Tabla que guarda los registros de tu cartera
create table if not exists public.snapshots (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid not null references auth.users(id) on delete cascade,
  fecha          date not null,
  msci_world     numeric(14,2) not null default 0,
  msci_emerging  numeric(14,2) not null default 0,
  bitcoin        numeric(14,2) not null default 0,
  renta_fija     numeric(14,2) not null default 0,
  created_at     timestamptz not null default now(),
  unique (user_id, fecha)
);

-- 2) Índice para ordenar por fecha rápido
create index if not exists snapshots_user_fecha_idx
  on public.snapshots (user_id, fecha);

-- 3) Activar seguridad a nivel de fila (CLAVE para que sea privado)
alter table public.snapshots enable row level security;

-- 4) Políticas: cada usuario solo puede tocar SUS propias filas
drop policy if exists "select_own" on public.snapshots;
drop policy if exists "insert_own" on public.snapshots;
drop policy if exists "update_own" on public.snapshots;
drop policy if exists "delete_own" on public.snapshots;

create policy "select_own" on public.snapshots
  for select using (auth.uid() = user_id);

create policy "insert_own" on public.snapshots
  for insert with check (auth.uid() = user_id);

create policy "update_own" on public.snapshots
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "delete_own" on public.snapshots
  for delete using (auth.uid() = user_id);
