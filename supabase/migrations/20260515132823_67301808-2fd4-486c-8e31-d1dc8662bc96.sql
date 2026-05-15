
-- IMAGES: drop permissive public write policies
DROP POLICY IF EXISTS "Allow public insert on images" ON public.images;
DROP POLICY IF EXISTS "Allow public update on images" ON public.images;
DROP POLICY IF EXISTS "Allow public delete on images" ON public.images;

-- ORDERS: drop permissive public update; keep insert for guest checkout
DROP POLICY IF EXISTS "update_orders" ON public.orders;

CREATE POLICY "users_can_update_own_orders"
ON public.orders
FOR UPDATE
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "admins_can_update_orders"
ON public.orders
FOR UPDATE
TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.admin_users
  WHERE admin_users.user_id = current_setting('app.admin_user_id', true)
))
WITH CHECK (EXISTS (
  SELECT 1 FROM public.admin_users
  WHERE admin_users.user_id = current_setting('app.admin_user_id', true)
));

CREATE POLICY "service_role_can_update_orders"
ON public.orders
FOR UPDATE
TO public
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- Tighten guest insert: only allow inserts where user_id is null (true guest) or matches auth.uid()
DROP POLICY IF EXISTS "insert_orders" ON public.orders;

CREATE POLICY "insert_orders"
ON public.orders
FOR INSERT
TO public
WITH CHECK (
  user_id IS NULL OR user_id = auth.uid()
);

-- DOCUMENTS: remove public read; service role only (chatbot edge function uses service role)
DROP POLICY IF EXISTS "Public can read documents" ON public.documents;

-- SIGN_IN: add explicit service-role-only policy
CREATE POLICY "service_role_only_sign_in"
ON public.sign_in
FOR ALL
TO public
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- PROFILES: drop duplicate policies and restrict to authenticated role for clarity
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;

CREATE POLICY "Users can view own profile"
ON public.profiles
FOR SELECT
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
ON public.profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);
