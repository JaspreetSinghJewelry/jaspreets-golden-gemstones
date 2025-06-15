
-- Insert missing users from auth.users into profiles table (id, full_name, phone, email)
INSERT INTO public.profiles (id, full_name, phone, email, created_at, updated_at)
SELECT
    u.id,
    COALESCE(u.raw_user_meta_data ->> 'full_name', u.email) AS full_name,
    u.raw_user_meta_data ->> 'phone' AS phone,
    u.email,
    now(),
    now()
FROM auth.users u
LEFT JOIN public.profiles p ON u.id = p.id
WHERE p.id IS NULL;
