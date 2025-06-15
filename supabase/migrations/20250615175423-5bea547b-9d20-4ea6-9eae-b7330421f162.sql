
-- Backfill missing rows in profiles from auth.users that do not yet exist in public.profiles

insert into public.profiles (id, full_name, phone, email, created_at, updated_at)
select 
  u.id,
  coalesce(u.raw_user_meta_data ->> 'full_name', u.email),
  u.raw_user_meta_data ->> 'phone',
  u.email,
  u.created_at,
  u.created_at
from auth.users u
left join public.profiles p on p.id = u.id
where p.id is null;
