-- Product media uploads.
-- Product images are public catalog assets; only authorized store staff may upload,
-- replace or remove files. The product_media table remains the source of truth
-- for which images are attached to each product.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'product-media',
  'product-media',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif']::text[]
)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "store staff upload product media" on storage.objects;
create policy "store staff upload product media"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'product-media'
    and (storage.foldername(name))[1] is not null
    and private.has_org_role(
      ((storage.foldername(name))[1])::uuid,
      array['retailer', 'operator', 'admin']::public.app_role[]
    )
  );

drop policy if exists "store staff update product media" on storage.objects;
create policy "store staff update product media"
  on storage.objects for update to authenticated
  using (
    bucket_id = 'product-media'
    and private.has_org_role(
      ((storage.foldername(name))[1])::uuid,
      array['retailer', 'operator', 'admin']::public.app_role[]
    )
  )
  with check (
    bucket_id = 'product-media'
    and private.has_org_role(
      ((storage.foldername(name))[1])::uuid,
      array['retailer', 'operator', 'admin']::public.app_role[]
    )
  );

drop policy if exists "store staff delete product media" on storage.objects;
create policy "store staff delete product media"
  on storage.objects for delete to authenticated
  using (
    bucket_id = 'product-media'
    and private.has_org_role(
      ((storage.foldername(name))[1])::uuid,
      array['retailer', 'operator', 'admin']::public.app_role[]
    )
  );
