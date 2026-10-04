-- Management improvements: suppliers, explicit logistics labels and audit history.
-- Apply after the operational integrity migration.

create table if not exists public.suppliers (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  slug text not null,
  contact_name text,
  phone text,
  whatsapp text,
  email text,
  website text,
  notes text,
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (organization_id, slug)
);

alter table public.products
  add column if not exists supplier_id uuid references public.suppliers(id) on delete set null;

alter table public.quotes
  add column if not exists loss_reason text;

alter table public.shipments
  add column if not exists is_official_tracking boolean not null default false;

alter table public.suppliers enable row level security;

drop policy if exists "public can read active suppliers" on public.suppliers;
create policy "public can read active suppliers"
  on public.suppliers for select to anon, authenticated
  using (is_active and exists (
    select 1 from public.organizations o
    where o.id = organization_id and o.is_public and o.is_active
  ));

drop policy if exists "members can read suppliers" on public.suppliers;
create policy "members can read suppliers"
  on public.suppliers for select to authenticated
  using (private.has_org_role(organization_id, null));

drop policy if exists "store operators manage suppliers" on public.suppliers;
create policy "store operators manage suppliers"
  on public.suppliers for all to authenticated
  using (private.has_org_role(organization_id, array['retailer', 'operator', 'admin']::public.app_role[]))
  with check (private.has_org_role(organization_id, array['retailer', 'operator', 'admin']::public.app_role[]));

grant select on public.suppliers to anon, authenticated;
grant insert, update, delete on public.suppliers to authenticated;

drop trigger if exists set_updated_at on public.suppliers;
create trigger set_updated_at
  before update on public.suppliers
  for each row execute function public.touch_updated_at();

create index if not exists suppliers_org_active_idx
  on public.suppliers (organization_id, is_active, name);
create index if not exists products_supplier_idx
  on public.products (supplier_id) where supplier_id is not null;

-- Changes to commercial and access records are retained for operational review.
create or replace function public.log_operational_change()
returns trigger
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  v_org_id uuid;
  v_entity_id uuid;
  v_actor_id uuid;
  v_before jsonb;
  v_after jsonb;
begin
  if tg_op in ('UPDATE', 'DELETE') then
    v_before := to_jsonb(old);
  end if;
  if tg_op in ('INSERT', 'UPDATE') then
    v_after := to_jsonb(new);
  end if;

  if tg_table_name in ('products', 'quotes', 'orders', 'access_grants', 'suppliers') then
    v_org_id := coalesce((v_after ->> 'organization_id')::uuid, (v_before ->> 'organization_id')::uuid);
    v_entity_id := coalesce((v_after ->> 'id')::uuid, (v_before ->> 'id')::uuid);
  elsif tg_table_name in ('inventory', 'product_prices') then
    v_entity_id := coalesce((v_after ->> 'product_id')::uuid, (v_before ->> 'product_id')::uuid);
    select p.organization_id into v_org_id from public.products p where p.id = v_entity_id;
  end if;

  select p.id into v_actor_id from public.profiles p where p.id = (select auth.uid());

  insert into public.audit_events (organization_id, actor_id, entity_type, entity_id, action, before_data, after_data)
  values (
    v_org_id,
    v_actor_id,
    tg_table_name,
    v_entity_id,
    lower(tg_op),
    v_before,
    v_after
  );
  if tg_op = 'DELETE' then
    return old;
  end if;
  return new;
end;
$$;

revoke all on function public.log_operational_change() from public, anon, authenticated;

drop trigger if exists audit_products on public.products;
create trigger audit_products after insert or update or delete on public.products
  for each row execute function public.log_operational_change();
drop trigger if exists audit_product_prices on public.product_prices;
create trigger audit_product_prices after insert or update or delete on public.product_prices
  for each row execute function public.log_operational_change();
drop trigger if exists audit_inventory on public.inventory;
create trigger audit_inventory after insert or update or delete on public.inventory
  for each row execute function public.log_operational_change();
drop trigger if exists audit_quotes on public.quotes;
create trigger audit_quotes after insert or update or delete on public.quotes
  for each row execute function public.log_operational_change();
drop trigger if exists audit_orders on public.orders;
create trigger audit_orders after insert or update or delete on public.orders
  for each row execute function public.log_operational_change();
drop trigger if exists audit_access_grants on public.access_grants;
create trigger audit_access_grants after insert or update or delete on public.access_grants
  for each row execute function public.log_operational_change();
drop trigger if exists audit_suppliers on public.suppliers;
create trigger audit_suppliers after insert or update or delete on public.suppliers
  for each row execute function public.log_operational_change();

grant select on public.suppliers to anon, authenticated;
