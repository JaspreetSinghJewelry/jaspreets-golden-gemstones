
-- Update the admin function to fix the ambiguous column reference
CREATE OR REPLACE FUNCTION public.delete_order_admin(order_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Delete the order using the primary key id (which is uuid)
  -- Instead of using order_id column which might be ambiguous
  DELETE FROM public.orders WHERE id = order_id;
  
  -- Check if the deletion was successful
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Order with ID % not found', order_id;
  END IF;
END;
$$;

-- Grant execute permission to authenticated users (admin panel users)
GRANT EXECUTE ON FUNCTION public.delete_order_admin(uuid) TO authenticated;
