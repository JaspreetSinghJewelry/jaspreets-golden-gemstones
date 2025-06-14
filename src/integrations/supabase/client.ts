
import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

const SUPABASE_URL = 'https://bxscivdpwersyohpaamn.supabase.co'
const SUPABASE_PUBLISHABLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ4c2NpdmRwd2Vyc3lvaHBhYW1uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4NTg1NjYsImV4cCI6MjA2NDQzNDU2Nn0.dILqWbppsSDLTnQgUBCQbYgWdJp0enh6YckSuPu4nnc'

// Debug logging for environment detection
console.log('Supabase Client: Initializing...', {
  url: SUPABASE_URL,
  hasKey: !!SUPABASE_PUBLISHABLE_KEY,
  environment: typeof window !== 'undefined' ? 'browser' : 'server',
  origin: typeof window !== 'undefined' ? window.location?.origin : 'server-side'
});

export const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      storage: typeof window !== 'undefined' ? window.localStorage : undefined,
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      flowType: 'pkce'
    },
    global: {
      headers: {
        'Content-Type': 'application/json',
        'X-Client-Info': 'jaspreet-jewelry@1.0.0'
      }
    },
    db: {
      schema: 'public'
    }
  }
)

// Test connection and log status
supabase.auth.getSession().then(({ data: { session }, error }) => {
  console.log('Supabase Client: Initial session check:', {
    hasSession: !!session,
    userEmail: session?.user?.email,
    error: error?.message,
    timestamp: new Date().toISOString()
  });
}).catch((err) => {
  console.error('Supabase Client: Failed to check initial session:', err);
});

// Log auth state changes
supabase.auth.onAuthStateChange((event, session) => {
  console.log('Supabase Client: Auth state change:', {
    event,
    hasSession: !!session,
    userEmail: session?.user?.email,
    timestamp: new Date().toISOString()
  });
});
