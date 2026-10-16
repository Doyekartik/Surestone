-- Run once in Supabase Dashboard > SQL Editor.
-- Public visitors can read published listings; only explicitly trusted admin
-- users can create, edit, or remove listings and property media.

create table if not exists public.properties (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  status text not null default 'draft' check (status in ('draft', 'published', 'sold')),
  price_inr bigint not null check (price_inr >= 0),
  property_type text not null check (property_type in ('Apartment', 'Villa', 'Penthouse', 'Plot')),
  city text not null default 'Raipur',
  locality text not null,
  bedrooms integer not null default 0 check (bedrooms >= 0),
  bathrooms integer not null default 0 check (bathrooms >= 0),
  area_sqft integer not null check (area_sqft > 0),
  description text not null default '',
  amenities text[] not null default '{}',
  image_urls text[] not null default '{}',
  tour_url text,
  verified boolean not null default false,
  move_in_ready boolean not null default true,
  latitude double precision,
  longitude double precision,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists properties_public_listings_idx
  on public.properties (status, city, created_at desc);

create table if not exists public.property_admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.properties enable row level security;
alter table public.property_admins enable row level security;

grant select on public.properties to anon, authenticated;
grant insert, update, delete on public.properties to authenticated;
grant select on public.property_admins to authenticated;

drop policy if exists "Admins can view their own access row" on public.property_admins;
create policy "Admins can view their own access row"
  on public.property_admins for select to authenticated
  using (user_id = (select auth.uid()));

drop policy if exists "Anyone can read published properties" on public.properties;
create policy "Anyone can read published properties"
  on public.properties for select to anon, authenticated
  using (status = 'published' or exists (
    select 1 from public.property_admins a where a.user_id = (select auth.uid())
  ));

drop policy if exists "Property admins can insert properties" on public.properties;
create policy "Property admins can insert properties"
  on public.properties for insert to authenticated
  with check (exists (
    select 1 from public.property_admins a where a.user_id = (select auth.uid())
  ));

drop policy if exists "Property admins can update properties" on public.properties;
create policy "Property admins can update properties"
  on public.properties for update to authenticated
  using (exists (
    select 1 from public.property_admins a where a.user_id = (select auth.uid())
  ))
  with check (exists (
    select 1 from public.property_admins a where a.user_id = (select auth.uid())
  ));

drop policy if exists "Property admins can delete properties" on public.properties;
create policy "Property admins can delete properties"
  on public.properties for delete to authenticated
  using (exists (
    select 1 from public.property_admins a where a.user_id = (select auth.uid())
  ));

-- Publicly viewable listing media. Add an admin allow-list row before uploading.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'property-media',
  'property-media',
  true,
  52428800,
  array['image/jpeg','image/png','image/webp','image/avif','model/gltf-binary','model/gltf+json','application/octet-stream']
)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Anyone can view property media" on storage.objects;
create policy "Anyone can view property media"
  on storage.objects for select to anon, authenticated
  using (bucket_id = 'property-media');

drop policy if exists "Property admins can upload media" on storage.objects;
create policy "Property admins can upload media"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'property-media' and exists (
      select 1 from public.property_admins a where a.user_id = (select auth.uid())
    )
  );

drop policy if exists "Property admins can update media" on storage.objects;
create policy "Property admins can update media"
  on storage.objects for update to authenticated
  using (
    bucket_id = 'property-media' and exists (
      select 1 from public.property_admins a where a.user_id = (select auth.uid())
    )
  )
  with check (
    bucket_id = 'property-media' and exists (
      select 1 from public.property_admins a where a.user_id = (select auth.uid())
    )
  );

drop policy if exists "Property admins can delete media" on storage.objects;
create policy "Property admins can delete media"
  on storage.objects for delete to authenticated
  using (
    bucket_id = 'property-media' and exists (
      select 1 from public.property_admins a where a.user_id = (select auth.uid())
    )
  );
