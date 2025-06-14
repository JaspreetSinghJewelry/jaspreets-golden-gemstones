
import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

const SUPABASE_URL = 'https://bxscivdpwersyohpaamn.supabase.co'
const SUPABASE_PUBLISHABLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ4c2NpdmRwd2Vyc3lvaHBhYW1uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4NTg1NjYsImV4cCI6MjA2NDQzNDU2Nn0.dILqWbppsSDLTnQgUBCQbYgWdJp0enh6YckSuPu4nnc'

console.log('Supabase Client: Initializing with proper auth config...', {
  url: SUPABASE_URL,
  hasKey: !!SUPABASE_PUBLISHABLE_KEY,
  environment: typeof window !== 'undefined' ? 'browser' : 'server'
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
      debug: false // Reduced debug logging
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

// Test connection only once on initialization
let connectionTested = false;

const testConnection = async () => {
  if (connectionTested) return;
  connectionTested = true;
  
  try {
    console.log('Supabase Client: Testing connection...');
    const { data, error } = await supabase.auth.getSession();
    console.log('Supabase Client: Initial session check:', {
      hasSession: !!data?.session,
      error: error?.message
    });
  } catch (err) {
    console.error('Supabase Client: Connection test failed:', err);
  }
};

// Test connection on initialization
if (typeof window !== 'undefined') {
  testConnection();
}

// Auth state monitoring
supabase.auth.onAuthStateChange((event, session) => {
  console.log('Supabase Auth Event:', {
    event,
    hasSession: !!session,
    userEmail: session?.user?.email
  });
});
