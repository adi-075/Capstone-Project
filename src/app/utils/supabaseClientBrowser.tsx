import { createClient } from '@supabase/supabase-js'

// This client is for browser/client-side use only
// It uses only the public anonymous key which has limited permissions
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY is not defined')
}

const supabaseBrowser = createClient(supabaseUrl, supabaseAnonKey)
export default supabaseBrowser 