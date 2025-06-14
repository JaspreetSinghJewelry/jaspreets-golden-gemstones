
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
      flowType: 'pkce',
      debug: true
    },
    global: {
      headers: {
        'Content-Type': 'application/json',
        'X-Client-Info': 'jaspreet-jewelry@1.0.0'
      }
    },
    db: {
      schema: 'public'
    },
    realtime: {
      params: {
        eventsPerSecond: 2
      }
    }
  }
)

// Enhanced connection testing
const testConnection = async () => {
  try {
    console.log('Supabase Client: Testing connection...');
    const { data, error } = await supabase.auth.getSession();
    console.log('Supabase Client: Connection test result:', {
      hasSession: !!data?.session,
      userEmail: data?.session?.user?.email,
      error: error?.message,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    console.error('Supabase Client: Connection test failed:', err);
  }
};

// Test connection on initialization
if (typeof window !== 'undefined') {
  testConnection();
}

// Enhanced auth state change logging
supabase.auth.onAuthStateChange((event, session) => {
  console.log('Supabase Client: Auth state change:', {
    event,
    hasSession: !!session,
    userEmail: session?.user?.email,
    accessToken: session?.access_token ? 'present' : 'missing',
    expiresAt: session?.expires_at ? new Date(session.expires_at * 1000).toISOString() : 'none',
    timestamp: new Date().toISOString()
  });
});
