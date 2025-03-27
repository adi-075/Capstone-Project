import { createClient } from "@supabase/supabase-js";

// This client is for server-side use only
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey =
    process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_KEY;

if (!supabaseUrl) {
    throw new Error(
        "NEXT_PUBLIC_SUPABASE_URL is not defined in environment variables"
    );
}

if (!supabaseKey) {
    throw new Error(
        "SUPABASE_SERVICE_KEY or SUPABASE_KEY is not defined in environment variables"
    );
}

const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
