-- Ensure admin_users RLS policy is properly created
-- Drop and recreate the policy to ensure it's working correctly
DROP POLICY IF EXISTS "Only service role can access admin credentials" ON public.admin_users;

-- Create a more explicit policy for service role access
CREATE POLICY "Service role can manage admin credentials" 
ON public.admin_users 
FOR ALL 
TO service_role
USING (true)
WITH CHECK (true);

-- Also create a policy that denies access to other roles
CREATE POLICY "Deny access to non-service roles" 
ON public.admin_users 
FOR ALL 
TO authenticated, anon
USING (false)
WITH CHECK (false);