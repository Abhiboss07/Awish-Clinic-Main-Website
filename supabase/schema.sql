create extension if not exists pgcrypto;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'app_role') then
    create type public.app_role as enum ('admin', 'writer');
  end if;

  if not exists (select 1 from pg_type where typname = 'blog_status') then
    create type public.blog_status as enum ('draft', 'in_review', 'approved', 'published', 'rejected');
  end if;

  if not exists (select 1 from pg_type where typname = 'booking_status') then
    create type public.booking_status as enum ('pending', 'confirmed', 'completed', 'cancelled');
  end if;
end
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  role public.app_role not null default 'writer',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.profiles(id) on delete cascade,
  author_name text,
  reviewer_id uuid references public.profiles(id) on delete set null,
  reviewer_name text,
  title text not null,
  slug text not null unique,
  excerpt text not null default '',
  content text not null,
  cover_image_url text,
  cover_image_path text,
  gallery_image_urls text[] not null default '{}',
  gallery_image_paths text[] not null default '{}',
  youtube_links text[] not null default '{}',
  drive_links text[] not null default '{}',
  status public.blog_status not null default 'draft',
  submitted_at timestamptz,
  approved_at timestamptz,
  published_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  source text not null check (source in ('contact', 'appointment')),
  name text not null,
  phone text not null,
  email text,
  service text,
  message text,
  preferred_date date,
  preferred_time text,
  status public.booking_status not null default 'pending',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row execute procedure public.set_updated_at();

drop trigger if exists blog_posts_set_updated_at on public.blog_posts;
create trigger blog_posts_set_updated_at
before update on public.blog_posts
for each row execute procedure public.set_updated_at();

drop trigger if exists bookings_set_updated_at on public.bookings;
create trigger bookings_set_updated_at
before update on public.bookings
for each row execute procedure public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.email)
  )
  on conflict (id) do update
    set email = excluded.email,
        full_name = coalesce(public.profiles.full_name, excluded.full_name);

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

create or replace function public.enforce_booking_slot_cap()
returns trigger
language plpgsql
as $$
declare
  slot_count integer;
begin
  if new.preferred_date is null or new.preferred_time is null or new.status = 'cancelled' then
    return new;
  end if;

  select count(*)
  into slot_count
  from public.bookings
  where preferred_date = new.preferred_date
    and preferred_time = new.preferred_time
    and status <> 'cancelled'
    and id <> coalesce(new.id, '00000000-0000-0000-0000-000000000000'::uuid);

  if slot_count >= 3 then
    raise exception 'Only 3 bookings are allowed for the same date and time slot.';
  end if;

  return new;
end;
$$;

drop trigger if exists bookings_slot_cap on public.bookings;
create trigger bookings_slot_cap
before insert or update on public.bookings
for each row execute procedure public.enforce_booking_slot_cap();

alter table public.profiles enable row level security;
alter table public.blog_posts enable row level security;
alter table public.bookings enable row level security;

drop policy if exists "Users can read their own profile" on public.profiles;
create policy "Users can read their own profile"
on public.profiles
for select
to authenticated
using (auth.uid() = id);

drop policy if exists "Published blogs are publicly visible" on public.blog_posts;
create policy "Published blogs are publicly visible"
on public.blog_posts
for select
to public
using (status = 'published');

insert into storage.buckets (id, name, public)
values ('blog-media', 'blog-media', true)
on conflict (id) do nothing;

drop policy if exists "Blog media is publicly readable" on storage.objects;
create policy "Blog media is publicly readable"
on storage.objects
for select
to public
using (bucket_id = 'blog-media');
