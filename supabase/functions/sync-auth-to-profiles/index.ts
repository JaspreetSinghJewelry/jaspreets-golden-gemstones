
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

// Helper function to get missing users from Auth that are not in public.profiles
async function syncMissingProfiles(supabaseClient) {
  // 1. Get users from Auth
  const { data: usersData, error: usersError } = await supabaseClient.auth.admin.listUsers()
  if (usersError) return { error: "Error fetching Auth users: " + usersError.message }

  // 2. Get current profiles
  const { data: profilesData, error: profilesError } = await supabaseClient
    .from("profiles")
    .select("id")
  if (profilesError) return { error: "Error fetching profiles: " + profilesError.message }

  const profileIds = new Set((profilesData ?? []).map(p => p.id))
  const toInsert = []

  for (const user of usersData.users) {
    if (!profileIds.has(user.id)) {
      // User is missing in profiles
      toInsert.push({
        id: user.id,
        full_name: user.user_metadata?.full_name || user.email?.split("@")[0] || "",
        phone: user.user_metadata?.phone || "",
        email: user.email || "",
      })
    }
  }

  if (toInsert.length === 0) {
    return { added: 0, message: "All users already in profiles." }
  }

  // 3. Insert missing profiles
  const { error: insertError } = await supabaseClient
    .from("profiles")
    .insert(toInsert)
  if (insertError) return { error: "Error inserting profiles: " + insertError.message }
  return { added: toInsert.length, details: toInsert }
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders })
  }
  const { supabase } = await import("https://deno.land/x/supabase_js@2.39.7/mod.ts")
  const supabaseUrl = Deno.env.get("SUPABASE_URL")
  const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") // Must be Service Role Key
  const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey, { auth: { persistSession: false } })

  const result = await syncMissingProfiles(supabaseClient)

  return new Response(JSON.stringify(result), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
    status: result.error ? 500 : 200,
  })
})
