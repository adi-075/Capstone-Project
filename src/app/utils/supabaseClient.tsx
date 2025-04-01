import { createClient } from "@supabase/supabase-js";
import { headers } from 'next/headers';

export async function defineBaseUrl() {
    const headersList = headers();
    const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
    const host = (await headersList).get('host') || 'localhost:3000';
    const baseUrl = `${protocol}://${host}`;
    return baseUrl;
}
// This client is for server-side use only
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey =
    process.env.SUPABASE_SERVICE_KEY;

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
