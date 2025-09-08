-- Fix critical security vulnerability: Remove public access to orders table
-- Drop the overly permissive admin policy that allows anyone to read all orders
DROP POLICY IF EXISTS "admin_view_all_orders" ON public.orders;

-- Create a proper admin policy that actually checks admin status
CREATE POLICY "admin_can_view_all_orders" ON public.orders
FOR SELECT 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = current_setting('app.admin_user_id', true)
  )
);

-- Ensure authenticated users can only see their own orders
-- This policy already exists but let's make sure it's properly defined
DROP POLICY IF EXISTS "select_own_orders" ON public.orders;
CREATE POLICY "authenticated_users_can_view_own_orders" ON public.orders
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- Allow guest users to view orders they created (matching by email in customer_data)
CREATE POLICY "guest_users_can_view_orders_by_email" ON public.orders
FOR SELECT
TO anon
USING (
  CASE 
    WHEN user_id IS NULL THEN
      (customer_data->>'email')::text = current_setting('app.guest_email', true)
    ELSE false
  END
);