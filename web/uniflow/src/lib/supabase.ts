import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Validation layer to help debug the 401/JWS errors
if (!supabaseUrl || !supabaseAnonKey || supabaseAnonKey.includes('PUT_YOUR_CORRECT')) {
  console.warn('⚠️ Supabase credentials missing or invalid in web/uniflow/.env')
}

if (supabaseAnonKey && supabaseAnonKey.startsWith('sb_publishable')) {
  console.error('❌ CRITICAL: You are using a Stripe Publishable Key instead of a Supabase Anon Key.')
  console.error('Please get your Anon key (starting with "eyJ...") from Project Settings -> API in Supabase.')
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '')