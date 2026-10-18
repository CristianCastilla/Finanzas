-- ============================================================
--  Base de datos para el panel de finanzas  (v2 - movimientos)
--  Pega TODO esto en Supabase -> SQL Editor -> New query -> Run
--  Es seguro ejecutarlo aunque ya lo hicieras antes.
-- ============================================================

-- 1) Tabla de MOVIMIENTOS (aportaciones y retiradas)
create table if not exists public.movimientos (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  fecha       date not null,
  activo      text not null check (activo in ('msci_world','msci_emerging','bitcoin','renta_fija')),
  tipo        text not null check (tipo in ('aportacion','retirada')),
  importe     numeric(14,2) not null check (importe > 0),
  created_at  timestamptz not null default now()
);

create index if not exists movimientos_user_idx on public.movimientos (user_id, fecha);

-- 2) Seguridad a nivel de fila (RLS): cada usuario solo ve lo suyo
alter table public.movimientos enable row level security;

drop policy if exists "select_own_mov" on public.movimientos;
drop policy if exists "insert_own_mov" on public.movimientos;
drop policy if exists "update_own_mov" on public.movimientos;
drop policy if exists "delete_own_mov" on public.movimientos;

create policy "select_own_mov" on public.movimientos
  for select using (auth.uid() = user_id);

create policy "insert_own_mov" on public.movimientos
  for insert with check (auth.uid() = user_id);

create policy "update_own_mov" on public.movimientos
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "delete_own_mov" on public.movimientos
  for delete using (auth.uid() = user_id);


-- ============================================================
--  3) LIMPIEZA OPCIONAL (tabla antigua de "snapshots")
--  La versión anterior usaba una tabla llamada "snapshots".
--  Ya no se usa. Descomenta la línea de abajo si quieres borrarla.
-- ============================================================
-- drop table if exists public.snapshots;
