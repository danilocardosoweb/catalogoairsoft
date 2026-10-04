-- FIELD OPS / operational integrity
-- Apply after the three existing migrations. No secrets belong in this file.

create table if not exists public.organization_settings (
  organization_id uuid primary key references public.organizations(id) on delete cascade,
  settings jsonb not null default '{}'::jsonb check (jsonb_typeof(settings) = 'object'),
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

alter table public.organization_settings enable row level security;

drop policy if exists "members can read organization settings" on public.organization_settings;
create policy "members can read organization settings"
  on public.organization_settings for select to authenticated
  using (private.has_org_role(organization_id, null));

drop policy if exists "store operators manage organization settings" on public.organization_settings;
create policy "store operators manage organization settings"
  on public.organization_settings for all to authenticated
  using (private.has_org_role(organization_id, array['retailer', 'operator', 'admin']::public.app_role[]))
  with check (private.has_org_role(organization_id, array['retailer', 'operator', 'admin']::public.app_role[]));

grant select, insert, update on public.organization_settings to authenticated;

create unique index if not exists banners_org_name_unique on public.banners (organization_id, name);

drop trigger if exists set_updated_at on public.organization_settings;
create trigger set_updated_at
  before update on public.organization_settings
  for each row execute function public.touch_updated_at();

-- Public catalog pages may show availability, but never need reserved quantities.
drop policy if exists "public can read available inventory" on public.inventory;
create policy "public can read available inventory"
  on public.inventory for select to anon
  using (exists (
    select 1 from public.products p
    join public.organizations o on o.id = p.organization_id
    where p.id = product_id and p.is_active and o.is_public and o.is_active
  ));
revoke select on public.inventory from anon;
grant select (product_id, available_quantity) on public.inventory to anon;

-- A blocked grant must also block an already-created membership.
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
  if v_user_id is null then raise exception 'authentication_required'; end if;
  select lower(trim(u.email)) into v_email from auth.users u where u.id = v_user_id;

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
      where lower(email) = v_email and status in ('invited', 'active')
      order by created_at desc limit 1;
    if v_grant.id is null then
      update public.organization_members set status = 'blocked', updated_at = timezone('utc', now()) where user_id = v_user_id;
      raise exception 'access_not_authorized';
    end if;
  end if;

  v_role := v_grant.role;
  v_permissions := case when coalesce(cardinality(v_grant.permissions), 0) = 0
    then private.default_permissions(v_role) else v_grant.permissions end;

  if v_role in ('retailer', 'distributor', 'operator', 'admin') then
    v_org_id := v_grant.organization_id;
    if v_org_id is null then select id into v_org_id from public.organizations where slug = 'suprimentos-oliveira' limit 1; end if;
    if v_org_id is null then
      insert into public.organizations (name, slug, kind, is_public, is_active)
      values ('Suprimentos Oliveira', 'suprimentos-oliveira', 'retailer', true, true) returning id into v_org_id;
    end if;
  end if;

  insert into public.profiles (id, full_name, phone, preferred_role)
  values (v_user_id, nullif(trim(p_full_name), ''), nullif(trim(p_phone), ''), v_role)
  on conflict (id) do update set full_name = coalesce(excluded.full_name, public.profiles.full_name), phone = coalesce(excluded.phone, public.profiles.phone), preferred_role = excluded.preferred_role, updated_at = timezone('utc', now());

  if v_org_id is not null then
    insert into public.organization_members (organization_id, user_id, role, permissions, status)
    values (v_org_id, v_user_id, v_role, v_permissions, 'active')
    on conflict (organization_id, user_id) do update set role = excluded.role, permissions = excluded.permissions, status = 'active', updated_at = timezone('utc', now());
  end if;

  update public.access_grants set user_id = v_user_id, organization_id = coalesce(organization_id, v_org_id), status = 'active', last_seen_at = timezone('utc', now()), updated_at = timezone('utc', now()) where id = v_grant.id;
  return jsonb_build_object('user_id', v_user_id, 'email', v_email, 'organization_id', v_org_id, 'role', v_role, 'permissions', v_permissions, 'full_name', nullif(trim(p_full_name), ''), 'phone', nullif(trim(p_phone), ''));
end;
$$;

revoke all on function public.ensure_account(text, text, public.app_role) from public;
grant execute on function public.ensure_account(text, text, public.app_role) to authenticated;

-- Create a quote and its line snapshots in one transaction. Prices are taken from
-- the current retail catalog when a relational product id is available.
create or replace function public.create_quote_with_items(p_payload jsonb)
returns jsonb
language plpgsql
security definer
set search_path = public, private, auth
as $$
declare
  v_user_id uuid := auth.uid();
  v_org_id uuid := nullif(p_payload->>'organization_id', '')::uuid;
  v_customer_user_id uuid := nullif(p_payload->>'customer_user_id', '')::uuid;
  v_customer_id uuid;
  v_quote_id uuid;
  v_item jsonb;
  v_product public.products%rowtype;
  v_price numeric;
  v_qty integer;
begin
  if v_user_id is null then raise exception 'authentication_required'; end if;
  if v_org_id is null then raise exception 'organization_required'; end if;
  if not private.has_org_role(v_org_id, array['retailer', 'operator', 'admin']::public.app_role[])
     and not (coalesce(v_customer_user_id, v_user_id) = v_user_id and exists (select 1 from public.organizations where id = v_org_id and is_public and is_active)) then
    raise exception 'quote_access_denied';
  end if;
  v_customer_user_id := coalesce(v_customer_user_id, v_user_id);

  insert into public.customers (organization_id, user_id, name, phone, address)
  values (v_org_id, v_customer_user_id, coalesce(nullif(trim(p_payload#>>'{customer,name}'), ''), 'Cliente'), nullif(trim(p_payload#>>'{customer,phone}'), ''), coalesce(p_payload->'customer'->'address', '{}'::jsonb))
  returning id into v_customer_id;

  insert into public.quotes (organization_id, customer_id, customer_user_id, created_by, status, origin, subtotal, discount, freight, total, valid_until, shipping, customer_note)
  values (v_org_id, v_customer_id, v_customer_user_id, v_user_id, 'new', coalesce(p_payload->>'origin', 'catalog'), greatest(0, coalesce((p_payload->>'subtotal')::numeric, 0)), greatest(0, coalesce((p_payload->>'discount')::numeric, 0)), greatest(0, coalesce((p_payload->>'freight')::numeric, 0)), greatest(0, coalesce((p_payload->>'total')::numeric, 0)), nullif(p_payload->>'valid_until', '')::date, coalesce(p_payload->'shipping', '{}'::jsonb), p_payload->>'customer_note')
  returning id into v_quote_id;

  for v_item in select * from jsonb_array_elements(coalesce(p_payload->'items', '[]'::jsonb)) loop
    v_qty := greatest(1, coalesce((v_item->>'quantity')::integer, 0));
    if nullif(v_item->>'product_id', '') is not null then
      select * into v_product from public.products where id = (v_item->>'product_id')::uuid and organization_id = v_org_id and is_active for share;
      if v_product.id is null then raise exception 'product_not_found'; end if;
      select amount into v_price from public.product_prices where product_id = v_product.id and tier = 'retail' and is_active order by valid_from desc nulls last limit 1;
    else
      raise exception 'product_not_synced';
    end if;
    if v_price is null then raise exception 'price_not_found'; end if;
    v_price := greatest(0, v_price);
    insert into public.quote_items (quote_id, product_id, product_name_snapshot, sku_snapshot, quantity, unit_price, line_total)
    values (v_quote_id, v_product.id, v_product.name, v_product.sku, v_qty, v_price, round(v_price * v_qty, 2));
  end loop;

  return jsonb_build_object('id', v_quote_id, 'organization_id', v_org_id, 'status', 'new');
end;
$$;

revoke all on function public.create_quote_with_items(jsonb) from public, anon;
grant execute on function public.create_quote_with_items(jsonb) to authenticated;

-- Approve-to-order is idempotent and reserves stock under row locks.
create sequence if not exists public.order_number_seq;

create or replace function public.convert_quote_to_order(p_quote_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public, private, auth
as $$
declare
  v_user_id uuid := auth.uid();
  v_quote public.quotes%rowtype;
  v_order_id uuid;
  v_order_number text;
  v_item record;
begin
  if v_user_id is null then raise exception 'authentication_required'; end if;
  select * into v_quote from public.quotes where id = p_quote_id for update;
  if v_quote.id is null then raise exception 'quote_not_found'; end if;
  if not private.has_org_role(v_quote.organization_id, array['retailer', 'operator', 'admin']::public.app_role[]) then raise exception 'order_access_denied'; end if;
  if v_quote.status = 'converted' then
    select id, order_number into v_order_id, v_order_number from public.orders where quote_id = p_quote_id limit 1;
    return jsonb_build_object('id', v_order_id, 'order_number', v_order_number, 'already_converted', true);
  end if;
  if v_quote.status <> 'approved' then raise exception 'quote_not_approved'; end if;
  if v_quote.valid_until is not null and v_quote.valid_until < current_date then raise exception 'quote_expired'; end if;

  for v_item in select * from public.quote_items where quote_id = p_quote_id loop
    if v_item.product_id is null then raise exception 'product_not_found'; end if;
    update public.inventory set available_quantity = available_quantity - v_item.quantity, reserved_quantity = reserved_quantity + v_item.quantity, updated_at = timezone('utc', now()) where product_id = v_item.product_id and available_quantity >= v_item.quantity;
    if not found then raise exception 'insufficient_stock'; end if;
  end loop;

  v_order_number := 'PED-' || lpad(nextval('public.order_number_seq')::text, 6, '0');
  insert into public.orders (organization_id, quote_id, customer_id, customer_user_id, created_by, order_number, status, subtotal, discount, freight, total, shipping, customer_note)
  values (v_quote.organization_id, v_quote.id, v_quote.customer_id, v_quote.customer_user_id, v_user_id, v_order_number, 'new', v_quote.subtotal, v_quote.discount, v_quote.freight, v_quote.total, v_quote.shipping, v_quote.customer_note)
  returning id into v_order_id;
  insert into public.order_items (order_id, product_id, product_name_snapshot, sku_snapshot, quantity, unit_price, line_total)
    select v_order_id, product_id, product_name_snapshot, sku_snapshot, quantity, unit_price, line_total from public.quote_items where quote_id = p_quote_id;
  update public.quotes set status = 'converted', updated_at = timezone('utc', now()) where id = p_quote_id;
  return jsonb_build_object('id', v_order_id, 'order_number', v_order_number, 'already_converted', false);
end;
$$;

revoke all on function public.convert_quote_to_order(uuid) from public, anon;
grant execute on function public.convert_quote_to_order(uuid) to authenticated;
