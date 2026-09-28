-- FIELD OPS / closed access, approved accounts and administration
-- Run after 20260928000000_initial_field_ops_schema.sql and
-- 20260928010000_app_state_and_account_bootstrap.sql.

create table if not exists public.access_grants (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  full_name text,
  phone text,
  organization_id uuid references public.organizations(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  role public.app_role not null default 'retailer',
  permissions text[] not null default '{}'::text[],
  status text not null default 'invited' check (status in ('invited', 'active', 'blocked')),
  invited_by uuid references auth.users(id) on delete set null,
  last_seen_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create unique index if not exists access_grants_email_unique
  on public.access_grants (lower(email));
create index if not exists access_grants_status_idx
  on public.access_grants (status, created_at desc);

alter table public.organization_members
  add column if not exists permissions text[] not null default '{}'::text[];

alter table public.access_grants enable row level security;

create or replace function private.default_permissions(p_role public.app_role)
returns text[]
language sql
immutable
as $$
  select case p_role
    when 'admin' then array['dashboard','products','stock','prices','quotes','orders','shipping','packages','customers','imports','content','banners','settings','access']::text[]
    when 'operator' then array['dashboard','products','stock','prices','quotes','orders','shipping','packages','customers','imports','content','banners','settings']::text[]
    when 'retailer' then array['dashboard','products','stock','prices','quotes','orders','shipping','packages','customers','imports','content','banners','settings']::text[]
    when 'distributor' then array['dashboard','products','stock','prices','orders','shipping','imports']::text[]
    else array['catalog','loadout','favorites','orders']::text[]
  end;
$$;

create or replace function private.is_org_admin(target_org uuid)
returns boolean
language sql
stable
security definer
set search_path = public, auth, private
as $$
  select private.has_org_role(target_org, array['admin','operator']::public.app_role[]);
$$;

revoke all on function private.default_permissions(public.app_role) from public;
revoke all on function private.is_org_admin(uuid) from public, anon;
grant execute on function private.is_org_admin(uuid) to authenticated;

drop policy if exists "admins can read access grants" on public.access_grants;
create policy "admins can read access grants"
  on public.access_grants for select to authenticated
  using (organization_id is not null and private.is_org_admin(organization_id));

drop policy if exists "admins can create access grants" on public.access_grants;
create policy "admins can create access grants"
  on public.access_grants for insert to authenticated
  with check (organization_id is not null and private.is_org_admin(organization_id));

drop policy if exists "admins can update access grants" on public.access_grants;
create policy "admins can update access grants"
  on public.access_grants for update to authenticated
  using (organization_id is not null and private.is_org_admin(organization_id))
  with check (organization_id is not null and private.is_org_admin(organization_id));

drop policy if exists "admins can delete access grants" on public.access_grants;
create policy "admins can delete access grants"
  on public.access_grants for delete to authenticated
  using (organization_id is not null and private.is_org_admin(organization_id));

grant select, insert, update, delete on public.access_grants to authenticated;

drop trigger if exists set_updated_at on public.access_grants;
create trigger set_updated_at
  before update on public.access_grants
  for each row execute function public.touch_updated_at();

create or replace function public.ensure_account(
  p_full_name text,
  p_phone text default null,
  p_role public.app_role default 'consumer'
)
returns jsonb
language plpgsql
security definer
set search_path = public, private, auth
as $$
declare
  v_user_id uuid := auth.uid();
  v_email text;
  v_org_id uuid;
  v_grant public.access_grants%rowtype;
  v_role public.app_role;
  v_permissions text[];
  v_admin_email constant text := 'danilo.cardosoweb@gmail.com';
begin
  if v_user_id is null then
    raise exception 'authentication_required';
  end if;

  select lower(trim(u.email)) into v_email from auth.users u where u.id = v_user_id;

  -- The first administrator is explicit and cannot be claimed by a role selector.
  if v_email = v_admin_email then
    select * into v_grant from public.access_grants where lower(email) = v_admin_email limit 1;
    if v_grant.id is null then
      insert into public.access_grants (email, full_name, role, permissions, status)
      values (v_admin_email, 'Danilo Cardoso', 'admin', private.default_permissions('admin'), 'active')
      returning * into v_grant;
    end if;
  else
    select * into v_grant
      from public.access_grants
      where lower(email) = v_email
        and status in ('invited', 'active')
      order by created_at desc
      limit 1;
    if v_grant.id is null then
      raise exception 'access_not_authorized';
    end if;
  end if;

  v_role := v_grant.role;
  v_permissions := case when coalesce(cardinality(v_grant.permissions), 0) = 0
    then private.default_permissions(v_role)
    else v_grant.permissions end;

  if v_role in ('retailer', 'distributor', 'operator', 'admin') then
    v_org_id := v_grant.organization_id;
    if v_org_id is null then
      select id into v_org_id from public.organizations where slug = 'suprimentos-oliveira' limit 1;
    end if;
    if v_org_id is null then
      insert into public.organizations (name, slug, kind, is_public, is_active)
      values ('Suprimentos Oliveira', 'suprimentos-oliveira', 'retailer', true, true)
      returning id into v_org_id;
    end if;
  end if;

  insert into public.profiles (id, full_name, phone, preferred_role)
  values (v_user_id, nullif(trim(p_full_name), ''), nullif(trim(p_phone), ''), v_role)
  on conflict (id) do update set
    full_name = excluded.full_name,
    phone = excluded.phone,
    preferred_role = excluded.preferred_role,
    updated_at = timezone('utc', now());

  if v_org_id is not null then
    insert into public.organization_members (organization_id, user_id, role, permissions, status)
    values (v_org_id, v_user_id, v_role, v_permissions, 'active')
    on conflict (organization_id, user_id) do update set
      role = excluded.role,
      permissions = excluded.permissions,
      status = 'active',
      updated_at = timezone('utc', now());
  end if;

  update public.access_grants
     set user_id = v_user_id,
         organization_id = coalesce(organization_id, v_org_id),
         status = 'active',
         last_seen_at = timezone('utc', now()),
         updated_at = timezone('utc', now())
   where id = v_grant.id;

  return jsonb_build_object(
    'user_id', v_user_id,
    'email', v_email,
    'organization_id', v_org_id,
    'role', v_role,
    'permissions', v_permissions,
    'full_name', nullif(trim(p_full_name), ''),
    'phone', nullif(trim(p_phone), '')
  );
end;
$$;

revoke all on function public.ensure_account(text, text, public.app_role) from public;
grant execute on function public.ensure_account(text, text, public.app_role) to authenticated;

