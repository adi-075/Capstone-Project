'use client';

import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
    return createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            auth: {
                persistSession: false,
                storageKey: 'session-storage',
                storage: window.sessionStorage,
                autoRefreshToken: true,
                detectSessionInUrl: false
            }
        }
    );
}