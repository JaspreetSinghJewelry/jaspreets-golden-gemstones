
-- Backfill all users from auth.users to public.profiles if not already present
INSERT INTO public.profiles (id, full_name, phone, email, created_at, updated_at)
SELECT
  u.id,
  COALESCE(u.raw_user_meta_data ->> 'full_name', u.email) AS full_name,
  u.raw_user_meta_data ->> 'phone' AS phone,
  u.email,
  u.created_at,
  u.created_at
FROM auth.users u
LEFT JOIN public.profiles p ON p.id = u.id
WHERE p.id IS NULL;
