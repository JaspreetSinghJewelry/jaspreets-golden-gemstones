-- Enable RLS on documents table
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access (for chatbot to search)
CREATE POLICY "Public can read documents" ON documents
  FOR SELECT USING (true);

-- Create policy to allow service role to manage documents (for crawling/embedding)
CREATE POLICY "Service role can manage documents" ON documents
  FOR ALL USING (auth.role() = 'service_role');

-- Fix search path for existing functions
ALTER FUNCTION handle_new_user() SET search_path = '';
ALTER FUNCTION delete_order_admin(uuid) SET search_path = '';
ALTER FUNCTION match_documents(vector, float, int) SET search_path = '';