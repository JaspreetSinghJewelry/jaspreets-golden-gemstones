
-- 1. Backfill the profiles table from auth.users for users that are missing a profile.
INSERT INTO public.profiles (id, full_name, phone, email)
SELECT
  u.id,
  COALESCE(u.raw_user_meta_data ->> 'full_name', u.email) AS full_name,
  u.raw_user_meta_data ->> 'phone' AS phone,
  u.email
FROM auth.users u
LEFT JOIN public.profiles p ON u.id = p.id
WHERE p.id IS NULL;

-- 2. Drop and recreate the sync trigger and function to ensure reliability.

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

DROP FUNCTION IF EXISTS public.handle_new_user();

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
BEGIN
  -- Insert a row into profiles, or update if exists (resilient upsert logic)
  INSERT INTO public.profiles (id, full_name, phone, email, created_at, updated_at)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.email),
    NEW.raw_user_meta_data ->> 'phone',
    NEW.email,
    now(),
    now()
  )
  ON CONFLICT (id) DO
    UPDATE SET
      full_name = EXCLUDED.full_name,
      phone = EXCLUDED.phone,
      email = EXCLUDED.email,
      updated_at = now();
  RETURN NEW;
END;
$function$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE PROCEDURE public.handle_new_user();
