-- FIELD OPS / initial relational schema
-- This migration is intentionally safe to apply before the frontend migration.
-- No secrets belong in this file. Keep service_role/secret keys server-side only.

create extension if not exists pgcrypto;
create schema if not exists private;

do $$ begin
  create type public.app_role as enum ('consumer', 'retailer', 'distributor', 'operator', 'admin');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.price_tier as enum ('retail', 'retailer', 'distributor');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.quote_status as enum ('new', 'in_review', 'sent', 'awaiting_customer', 'approved', 'rejected', 'expired', 'converted', 'cancelled');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.order_status as enum ('new', 'payment_pending', 'payment_confirmed', 'preparing', 'picking', 'ready_to_ship', 'shipped', 'delivered', 'cancelled');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.content_status as enum ('draft', 'in_review', 'published', 'archived');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.source_type as enum ('manual', 'rss', 'api', 'youtube', 'event');
exception when duplicate_object then null;
end $$;

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  kind text not null default 'retailer' check (kind in ('retailer', 'distributor', 'field', 'platform')),
  is_public boolean not null default true,
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  preferred_role public.app_role not null default 'consumer',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.organization_members (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  role public.app_role not null,
  status text not null default 'active' check (status in ('invited', 'active', 'blocked')),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (organization_id, user_id)
);

create table if not exists public.brands (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  slug text not null,
  logo_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (organization_id, slug)
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  slug text not null,
  description text,
  image_url text,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (organization_id, slug)
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  brand_id uuid references public.brands(id) on delete set null,
  category_id uuid references public.categories(id) on delete set null,
  sku text not null,
  barcode text,
  name text not null,
  slug text not null,
  description text,
  system text,
  product_type text,
  specs jsonb not null default '{}'::jsonb,
  shipping jsonb not null default '{}'::jsonb,
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (organization_id, sku),
  unique (organization_id, slug)
);

create table if not exists public.product_media (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  url text not null,
  alt_text text,
  sort_order integer not null default 0,
  is_primary boolean not null default false,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.product_prices (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  tier public.price_tier not null default 'retail',
  amount numeric(12,2) not null check (amount >= 0),
  currency char(3) not null default 'BRL',
  is_active boolean not null default true,
  valid_from timestamptz,
  valid_until timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (product_id, tier)
);

create table if not exists public.inventory (
  product_id uuid primary key references public.products(id) on delete cascade,
  available_quantity integer not null default 0 check (available_quantity >= 0),
  reserved_quantity integer not null default 0 check (reserved_quantity >= 0),
  low_stock_threshold integer not null default 3 check (low_stock_threshold >= 0),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete set null,
  name text not null,
  email text,
  phone text,
  tax_id text,
  address jsonb not null default '{}'::jsonb,
  notes text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.quotes (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete restrict,
  customer_id uuid references public.customers(id) on delete set null,
  customer_user_id uuid references public.profiles(id) on delete set null,
  created_by uuid references public.profiles(id) on delete set null,
  status public.quote_status not null default 'new',
  origin text not null default 'catalog',
  subtotal numeric(12,2) not null default 0 check (subtotal >= 0),
  discount numeric(12,2) not null default 0 check (discount >= 0),
  freight numeric(12,2) not null default 0 check (freight >= 0),
  total numeric(12,2) not null default 0 check (total >= 0),
  valid_until date,
  shipping jsonb not null default '{}'::jsonb,
  customer_note text,
  internal_note text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.quote_items (
  id uuid primary key default gen_random_uuid(),
  quote_id uuid not null references public.quotes(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  product_name_snapshot text not null,
  sku_snapshot text,
  quantity integer not null check (quantity > 0),
  unit_price numeric(12,2) not null check (unit_price >= 0),
  line_total numeric(12,2) not null check (line_total >= 0),
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete restrict,
  quote_id uuid references public.quotes(id) on delete set null,
  customer_id uuid references public.customers(id) on delete set null,
  customer_user_id uuid references public.profiles(id) on delete set null,
  created_by uuid references public.profiles(id) on delete set null,
  order_number text not null,
  status public.order_status not null default 'new',
  subtotal numeric(12,2) not null default 0 check (subtotal >= 0),
  discount numeric(12,2) not null default 0 check (discount >= 0),
  freight numeric(12,2) not null default 0 check (freight >= 0),
  total numeric(12,2) not null default 0 check (total >= 0),
  shipping jsonb not null default '{}'::jsonb,
  customer_note text,
  internal_note text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (organization_id, order_number)
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  product_name_snapshot text not null,
  sku_snapshot text,
  quantity integer not null check (quantity > 0),
  unit_price numeric(12,2) not null check (unit_price >= 0),
  line_total numeric(12,2) not null check (line_total >= 0),
  picked_quantity integer not null default 0 check (picked_quantity >= 0 and picked_quantity <= quantity),
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.shipments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  carrier text,
  service text,
  tracking_code text,
  status text not null default 'awaiting_picking',
  volumes integer not null default 1 check (volumes > 0),
  weight_kg numeric(10,3) check (weight_kg >= 0),
  label_url text,
  shipped_at timestamptz,
  delivered_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.banners (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  media_type text not null default 'image' check (media_type in ('image', 'video')),
  media_url text not null,
  eyebrow text,
  title text not null,
  title_accent text,
  subtitle text,
  cta_label text,
  cta_target text,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  starts_at timestamptz,
  ends_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.radar_sources (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  source_type public.source_type not null,
  endpoint_url text,
  cadence text,
  is_active boolean not null default true,
  status text not null default 'needs_backend',
  last_sync_at timestamptz,
  notes text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.radar_content (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  source_id uuid references public.radar_sources(id) on delete set null,
  content_type text not null default 'news',
  title text not null,
  summary text,
  description text,
  image_url text,
  city text,
  state text,
  country text default 'Brasil',
  starts_on date,
  starts_at time,
  organizer text,
  field_name text,
  category text,
  tags text[] not null default '{}',
  product_ids uuid[] not null default '{}',
  status public.content_status not null default 'draft',
  published_at timestamptz,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.airdrops (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  code text not null,
  discount_type text not null check (discount_type in ('percent', 'fixed')),
  discount_value numeric(12,2) not null check (discount_value >= 0),
  minimum_subtotal numeric(12,2) not null default 0 check (minimum_subtotal >= 0),
  max_redemptions integer check (max_redemptions is null or max_redemptions > 0),
  redeemed_count integer not null default 0 check (redeemed_count >= 0),
  starts_at timestamptz not null default timezone('utc', now()),
  ends_at timestamptz,
  social_message text,
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (organization_id, code)
);

create table if not exists public.airdrop_redemptions (
  id uuid primary key default gen_random_uuid(),
  airdrop_id uuid not null references public.airdrops(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete set null,
  quote_id uuid references public.quotes(id) on delete set null,
  order_id uuid references public.orders(id) on delete set null,
  redeemed_at timestamptz not null default timezone('utc', now()),
  unique (airdrop_id, user_id, quote_id)
);

create table if not exists public.audit_events (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references public.organizations(id) on delete cascade,
  actor_id uuid references public.profiles(id) on delete set null,
  entity_type text not null,
  entity_id uuid,
  action text not null,
  before_data jsonb,
  after_data jsonb,
  created_at timestamptz not null default timezone('utc', now())
);

-- The membership table must exist before this RLS helper is compiled.
-- It stays outside the exposed public schema and is callable only by authenticated users.
create or replace function private.has_org_role(
  target_org uuid,
  allowed_roles public.app_role[] default null
)
returns boolean
language sql
stable
security definer
set search_path = public, auth
as $$
  select exists (
    select 1
    from public.organization_members om
    where om.organization_id = target_org
      and om.user_id = (select auth.uid())
      and om.status = 'active'
      and (allowed_roles is null or om.role = any(allowed_roles))
  );
$$;

revoke all on function private.has_org_role(uuid, public.app_role[]) from public, anon;
grant execute on function private.has_org_role(uuid, public.app_role[]) to authenticated;

create index if not exists products_org_active_idx on public.products (organization_id, is_active);
create index if not exists products_category_idx on public.products (category_id) where is_active = true;
create index if not exists products_brand_idx on public.products (brand_id) where is_active = true;
create index if not exists product_prices_tier_idx on public.product_prices (tier, is_active);
create index if not exists inventory_low_stock_idx on public.inventory (product_id) where available_quantity <= low_stock_threshold;
create index if not exists customers_org_idx on public.customers (organization_id, created_at desc);
create index if not exists quotes_org_status_idx on public.quotes (organization_id, status, created_at desc);
create index if not exists orders_org_status_idx on public.orders (organization_id, status, created_at desc);
create index if not exists banners_public_order_idx on public.banners (organization_id, is_active, sort_order);
create index if not exists radar_content_public_idx on public.radar_content (organization_id, status, starts_on);
create index if not exists audit_org_created_idx on public.audit_events (organization_id, created_at desc);

do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'organizations', 'profiles', 'organization_members', 'brands', 'categories',
    'products', 'product_media', 'product_prices', 'inventory', 'customers',
    'quotes', 'quote_items', 'orders', 'order_items', 'shipments', 'banners',
    'radar_sources', 'radar_content', 'airdrops', 'airdrop_redemptions', 'audit_events'
  ] loop
    execute format('alter table public.%I enable row level security', table_name);
  end loop;
end $$;

-- Public catalog and published content are readable; all writes remain authenticated.
create policy "public can read active organizations"
  on public.organizations for select to anon, authenticated
  using (is_public and is_active);

create policy "members can read their organization"
  on public.organizations for select to authenticated
  using (private.has_org_role(id, null));

create policy "public can read active brands"
  on public.brands for select to anon, authenticated
  using (is_active and exists (
    select 1 from public.organizations o
    where o.id = organization_id and o.is_public and o.is_active
  ));

create policy "public can read active categories"
  on public.categories for select to anon, authenticated
  using (is_active and exists (
    select 1 from public.organizations o
    where o.id = organization_id and o.is_public and o.is_active
  ));

create policy "public can read active products"
  on public.products for select to anon, authenticated
  using (is_active and exists (
    select 1 from public.organizations o
    where o.id = organization_id and o.is_public and o.is_active
  ));

create policy "public can read product media"
  on public.product_media for select to anon, authenticated
  using (exists (
    select 1 from public.products p
    where p.id = product_id and p.is_active
  ));

create policy "public can read retail prices"
  on public.product_prices for select to anon, authenticated
  using (tier = 'retail' and is_active and exists (
    select 1 from public.products p
    where p.id = product_id and p.is_active
  ));

create policy "public can read active banners"
  on public.banners for select to anon, authenticated
  using (is_active and (starts_at is null or starts_at <= now()) and (ends_at is null or ends_at >= now()) and exists (
    select 1 from public.organizations o
    where o.id = organization_id and o.is_public and o.is_active
  ));

create policy "public can read published radar content"
  on public.radar_content for select to anon, authenticated
  using (status = 'published' and exists (
    select 1 from public.organizations o
    where o.id = organization_id and o.is_public and o.is_active
  ));

create policy "public can read active airdrops"
  on public.airdrops for select to anon, authenticated
  using (is_active and starts_at <= now() and (ends_at is null or ends_at >= now()) and exists (
    select 1 from public.organizations o
    where o.id = organization_id and o.is_public and o.is_active
  ));

-- Identity and membership.
create policy "users can read their profile"
  on public.profiles for select to authenticated
  using (id = (select auth.uid()));

create policy "users can update their profile"
  on public.profiles for update to authenticated
  using (id = (select auth.uid()))
  with check (id = (select auth.uid()));

create policy "users can read their memberships"
  on public.organization_members for select to authenticated
  using (user_id = (select auth.uid()) or private.has_org_role(organization_id, array['retailer', 'operator', 'admin']::public.app_role[]));

create policy "organization admins can manage memberships"
  on public.organization_members for all to authenticated
  using (private.has_org_role(organization_id, array['retailer', 'operator', 'admin']::public.app_role[]))
  with check (private.has_org_role(organization_id, array['retailer', 'operator', 'admin']::public.app_role[]));

-- Organization data. Distributors can read catalog, inventory and orders; only store operators manage them.
create policy "members can read brands"
  on public.brands for select to authenticated
  using (private.has_org_role(organization_id, null));
create policy "store operators manage brands"
  on public.brands for all to authenticated
  using (private.has_org_role(organization_id, array['retailer', 'operator', 'admin']::public.app_role[]))
  with check (private.has_org_role(organization_id, array['retailer', 'operator', 'admin']::public.app_role[]));

create policy "members can read categories"
  on public.categories for select to authenticated
  using (private.has_org_role(organization_id, null));
create policy "store operators manage categories"
  on public.categories for all to authenticated
  using (private.has_org_role(organization_id, array['retailer', 'operator', 'admin']::public.app_role[]))
  with check (private.has_org_role(organization_id, array['retailer', 'operator', 'admin']::public.app_role[]));

create policy "members can read products"
  on public.products for select to authenticated
  using (private.has_org_role(organization_id, null));
create policy "store operators manage products"
  on public.products for all to authenticated
  using (private.has_org_role(organization_id, array['retailer', 'operator', 'admin']::public.app_role[]))
  with check (private.has_org_role(organization_id, array['retailer', 'operator', 'admin']::public.app_role[]));

create policy "members can read product media"
  on public.product_media for select to authenticated
  using (exists (select 1 from public.products p where p.id = product_id and private.has_org_role(p.organization_id, null)));
create policy "store operators manage product media"
  on public.product_media for all to authenticated
  using (exists (select 1 from public.products p where p.id = product_id and private.has_org_role(p.organization_id, array['retailer', 'operator', 'admin']::public.app_role[])))
  with check (exists (select 1 from public.products p where p.id = product_id and private.has_org_role(p.organization_id, array['retailer', 'operator', 'admin']::public.app_role[])));

create policy "members can read prices"
  on public.product_prices for select to authenticated
  using (exists (select 1 from public.products p where p.id = product_id and private.has_org_role(p.organization_id, null)));
create policy "store operators manage prices"
  on public.product_prices for all to authenticated
  using (exists (select 1 from public.products p where p.id = product_id and private.has_org_role(p.organization_id, array['retailer', 'operator', 'admin']::public.app_role[])))
  with check (exists (select 1 from public.products p where p.id = product_id and private.has_org_role(p.organization_id, array['retailer', 'operator', 'admin']::public.app_role[])));

create policy "members can read inventory"
  on public.inventory for select to authenticated
  using (exists (select 1 from public.products p where p.id = product_id and private.has_org_role(p.organization_id, null)));
create policy "store operators manage inventory"
  on public.inventory for all to authenticated
  using (exists (select 1 from public.products p where p.id = product_id and private.has_org_role(p.organization_id, array['retailer', 'operator', 'admin']::public.app_role[])))
  with check (exists (select 1 from public.products p where p.id = product_id and private.has_org_role(p.organization_id, array['retailer', 'operator', 'admin']::public.app_role[])));

-- Customers, quotes and orders.
create policy "customers can read their own record"
  on public.customers for select to authenticated
  using (user_id = (select auth.uid()));
create policy "store staff manage customers"
  on public.customers for all to authenticated
  using (private.has_org_role(organization_id, array['retailer', 'operator', 'admin']::public.app_role[]))
  with check (private.has_org_role(organization_id, array['retailer', 'operator', 'admin']::public.app_role[]));

create policy "customers can create their own quote"
  on public.quotes for insert to authenticated
  with check (customer_user_id = (select auth.uid()));
create policy "customers can read their own quotes"
  on public.quotes for select to authenticated
  using (customer_user_id = (select auth.uid()));
create policy "store staff manage quotes"
  on public.quotes for all to authenticated
  using (private.has_org_role(organization_id, array['retailer', 'operator', 'admin']::public.app_role[]))
  with check (private.has_org_role(organization_id, array['retailer', 'operator', 'admin']::public.app_role[]));

create policy "quote owners can read quote items"
  on public.quote_items for select to authenticated
  using (exists (select 1 from public.quotes q where q.id = quote_id and (q.customer_user_id = (select auth.uid()) or private.has_org_role(q.organization_id, array['retailer', 'operator', 'admin']::public.app_role[]))));
create policy "store staff manage quote items"
  on public.quote_items for all to authenticated
  using (exists (select 1 from public.quotes q where q.id = quote_id and private.has_org_role(q.organization_id, array['retailer', 'operator', 'admin']::public.app_role[])))
  with check (exists (select 1 from public.quotes q where q.id = quote_id and private.has_org_role(q.organization_id, array['retailer', 'operator', 'admin']::public.app_role[])));

create policy "customers can read their own orders"
  on public.orders for select to authenticated
  using (customer_user_id = (select auth.uid()));
create policy "store staff manage orders"
  on public.orders for all to authenticated
  using (private.has_org_role(organization_id, array['retailer', 'operator', 'admin']::public.app_role[]))
  with check (private.has_org_role(organization_id, array['retailer', 'operator', 'admin']::public.app_role[]));

create policy "order owners can read order items"
  on public.order_items for select to authenticated
  using (exists (select 1 from public.orders o where o.id = order_id and (o.customer_user_id = (select auth.uid()) or private.has_org_role(o.organization_id, array['retailer', 'operator', 'admin']::public.app_role[]))));
create policy "store staff manage order items"
  on public.order_items for all to authenticated
  using (exists (select 1 from public.orders o where o.id = order_id and private.has_org_role(o.organization_id, array['retailer', 'operator', 'admin']::public.app_role[])))
  with check (exists (select 1 from public.orders o where o.id = order_id and private.has_org_role(o.organization_id, array['retailer', 'operator', 'admin']::public.app_role[])));

create policy "customers can read their shipments"
  on public.shipments for select to authenticated
  using (exists (select 1 from public.orders o where o.id = order_id and o.customer_user_id = (select auth.uid())));
create policy "store staff manage shipments"
  on public.shipments for all to authenticated
  using (exists (select 1 from public.orders o where o.id = order_id and private.has_org_role(o.organization_id, array['retailer', 'operator', 'admin']::public.app_role[])))
  with check (exists (select 1 from public.orders o where o.id = order_id and private.has_org_role(o.organization_id, array['retailer', 'operator', 'admin']::public.app_role[])));

-- Private operational content and campaigns.
create policy "store staff manage banners"
  on public.banners for all to authenticated
  using (private.has_org_role(organization_id, array['retailer', 'operator', 'admin']::public.app_role[]))
  with check (private.has_org_role(organization_id, array['retailer', 'operator', 'admin']::public.app_role[]));

create policy "store staff manage radar sources"
  on public.radar_sources for all to authenticated
  using (private.has_org_role(organization_id, array['retailer', 'operator', 'admin']::public.app_role[]))
  with check (private.has_org_role(organization_id, array['retailer', 'operator', 'admin']::public.app_role[]));

create policy "store staff manage radar content"
  on public.radar_content for all to authenticated
  using (private.has_org_role(organization_id, array['retailer', 'operator', 'admin']::public.app_role[]))
  with check (private.has_org_role(organization_id, array['retailer', 'operator', 'admin']::public.app_role[]));

create policy "store staff manage airdrops"
  on public.airdrops for all to authenticated
  using (private.has_org_role(organization_id, array['retailer', 'operator', 'admin']::public.app_role[]))
  with check (private.has_org_role(organization_id, array['retailer', 'operator', 'admin']::public.app_role[]));

create policy "users can read their redemptions"
  on public.airdrop_redemptions for select to authenticated
  using (user_id = (select auth.uid()));
create policy "store staff manage redemptions"
  on public.airdrop_redemptions for all to authenticated
  using (exists (select 1 from public.airdrops a where a.id = airdrop_id and private.has_org_role(a.organization_id, array['retailer', 'operator', 'admin']::public.app_role[])))
  with check (exists (select 1 from public.airdrops a where a.id = airdrop_id and private.has_org_role(a.organization_id, array['retailer', 'operator', 'admin']::public.app_role[])));

create policy "store staff can read audit events"
  on public.audit_events for select to authenticated
  using (organization_id is not null and private.has_org_role(organization_id, array['retailer', 'operator', 'admin']::public.app_role[]));

-- Explicit grants keep Data API exposure intentional. RLS remains the row-level boundary.
grant usage on schema public to anon, authenticated;
grant select on public.organizations, public.brands, public.categories, public.products,
  public.product_media, public.product_prices, public.banners, public.radar_content,
  public.airdrops to anon, authenticated;
grant select, insert, update on public.profiles, public.organization_members, public.customers,
  public.quotes, public.quote_items, public.orders, public.order_items, public.shipments,
  public.product_media, public.product_prices, public.inventory, public.banners,
  public.radar_sources, public.radar_content, public.airdrops, public.airdrop_redemptions
  to authenticated;
grant select on public.audit_events to authenticated;

-- Updated timestamps.
do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'organizations', 'profiles', 'organization_members', 'brands', 'categories',
    'products', 'product_prices', 'customers', 'quotes', 'orders', 'shipments',
    'banners', 'radar_sources', 'radar_content', 'airdrops'
  ] loop
    execute format('drop trigger if exists set_updated_at on public.%I', table_name);
    execute format('create trigger set_updated_at before update on public.%I for each row execute function public.touch_updated_at()', table_name);
  end loop;
end $$;
