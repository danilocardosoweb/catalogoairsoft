-- FIELD OPS / account bootstrap and cloud application state
-- Run after 20260928000000_initial_field_ops_schema.sql.
-- This migration contains no secrets.

create table if not exists public.user_app_state (
  user_id uuid primary key references auth.users(id) on delete cascade,
  state jsonb not null default '{}'::jsonb check (jsonb_typeof(state) = 'object'),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

alter table public.user_app_state enable row level security;

drop policy if exists "users manage their app state" on public.user_app_state;
create policy "users manage their app state"
  on public.user_app_state for all to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

grant select, insert, update, delete on public.user_app_state to authenticated;

drop trigger if exists set_updated_at on public.user_app_state;
create trigger set_updated_at
  before update on public.user_app_state
  for each row execute function public.touch_updated_at();

create or replace function public.ensure_account(
  p_full_name text,
  p_phone text default null,
  p_role public.app_role default 'consumer'
)
returns jsonb
language plpgsql
security definer
set search_path = public, private
as $$
declare
  v_user_id uuid := auth.uid();
  v_org_id uuid;
  v_role public.app_role := coalesce(p_role, 'consumer'::public.app_role);
begin
  if v_user_id is null then
    raise exception 'authentication_required';
  end if;

  insert into public.profiles (id, full_name, phone, preferred_role)
  values (v_user_id, nullif(trim(p_full_name), ''), nullif(trim(p_phone), ''), v_role)
  on conflict (id) do update set
    full_name = excluded.full_name,
    phone = excluded.phone,
    preferred_role = excluded.preferred_role,
    updated_at = timezone('utc', now());

  if v_role in ('retailer', 'distributor', 'operator', 'admin') then
    select id into v_org_id
      from public.organizations
      where slug = 'suprimentos-oliveira'
      limit 1;

    if v_org_id is null then
      insert into public.organizations (name, slug, kind, is_public, is_active)
      values ('Suprimentos Oliveira', 'suprimentos-oliveira', 'retailer', true, true)
      returning id into v_org_id;
    end if;

    if exists (
      select 1 from public.organization_members
      where organization_id = v_org_id
        and status = 'active'
        and user_id <> v_user_id
    ) and not exists (
      select 1 from public.organization_members
      where organization_id = v_org_id
        and user_id = v_user_id
    ) then
      raise exception 'organization_already_claimed';
    end if;

    insert into public.organization_members (organization_id, user_id, role, status)
    values (v_org_id, v_user_id, v_role, 'active')
    on conflict (organization_id, user_id) do update set
      role = excluded.role,
      status = 'active',
      updated_at = timezone('utc', now());
  end if;

  return jsonb_build_object(
    'user_id', v_user_id,
    'organization_id', v_org_id,
    'role', v_role,
    'full_name', nullif(trim(p_full_name), ''),
    'phone', nullif(trim(p_phone), '')
  );
end;
$$;

revoke all on function public.ensure_account(text, text, public.app_role) from public;
grant execute on function public.ensure_account(text, text, public.app_role) to authenticated;
