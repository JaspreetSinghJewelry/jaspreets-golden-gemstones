-- Drop the existing function first
DROP FUNCTION IF EXISTS public.delete_order_admin(uuid);

-- Recreate the function with a different parameter name to avoid ambiguity
CREATE OR REPLACE FUNCTION public.delete_order_admin(target_order_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Delete the order using the primary key id (which is uuid)
  -- Parameter is now named target_order_id to avoid ambiguity with order_id column
  DELETE FROM public.orders WHERE id = target_order_id;
  
  -- Check if the deletion was successful
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Order with ID % not found', target_order_id;
  END IF;
END;
$$;

-- Grant execute permission to authenticated users (admin panel users)
GRANT EXECUTE ON FUNCTION public.delete_order_admin(uuid) TO authenticated;