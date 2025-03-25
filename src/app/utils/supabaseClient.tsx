import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL as string
const supabaseKey = process.env.SUPABASE_KEY
console.log('Supabase Key:', supabaseKey ? 'Key exists' : 'Key is undefined')

if (!supabaseKey) {
    throw new Error('SUPABASE_KEY is not defined in environment variables')
}

const supabase = createClient(supabaseUrl, supabaseKey)
export default supabase