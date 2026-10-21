# Connect The Astittva Estates to Supabase

## 1. Create the Supabase project

Create a project at [supabase.com](https://supabase.com/). Open **SQL Editor**, paste in `schema.sql`, and run it. This creates the properties table, public read-only access for published Raipur listings, an admin allow-list, and a public `property-media` bucket with restricted uploads.

## 2. Add the website connection

In **Project Settings → API**, copy the **Project URL** and the **publishable key** (older projects may label it `anon` / `public`). Put those two public values in `supabase-config.js`:

```js
window.SURESTONE_SUPABASE = {
  url: 'https://YOUR-PROJECT.supabase.co',
  publishableKey: 'sb_publishable_...'
};
```

The publishable key is intended for browser use. Never put a `service_role` or secret key in this website or send it in chat. Row-level security in `schema.sql` allows the public site to read published listings only.

## 3. Add yourself as a listing administrator

Create your own user in **Authentication → Users**. Copy that user's ID, then run this in the SQL Editor, replacing the example UUID:

```sql
insert into public.property_admins (user_id)
values ('YOUR-AUTH-USER-UUID')
on conflict do nothing;
```

This allow-list protects listing and media writes from public visitors. Do not make the `property_admins` table publicly writable.

## 4. Add or update a listing

Open **Table Editor → properties** and add a row. Fill in the title, unique URL slug, price in rupees, property type, locality, bedrooms, bathrooms, area in sq. ft., description, amenities, and image URLs. Set `status` to `published` when it is ready to appear; `draft` and `sold` rows are hidden from the public site.

For property photos and 3D files, upload them to **Storage → property-media** while signed into the admin account. Copy each file's public URL into `image_urls` (an array of URLs) or `tour_url` (one embeddable 3D viewer URL). Images in `image_urls` appear in order: the first is the cover image, followed by gallery images.

## 5. Run the website

Serve this folder over HTTP (for example, `py -m http.server 8000`) and open `http://localhost:8000`. When Supabase is configured, published listings replace the local illustrative sample data. Without project settings, the site continues to show its sample listings.

## Notes

- This connection covers **property listings and their media**. Account profiles, favourites, visit requests, and enquiry forms are still stored locally in each browser; they have not been moved to Supabase.
- Supabase free projects can pause after inactivity and have storage, database, and bandwidth quotas. Keep listing photos optimized and avoid uploading full-resolution video/3D files to the free bucket.
