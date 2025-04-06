// lib/getStudents.ts
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import type { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'

export async function getStudents() {
    const cookieStore = await cookies()

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll: () =>
                    cookieStore.getAll().map((c: RequestCookie) => ({
                        name: c.name,
                        value: c.value,
                    })),
                setAll: () => { }, // Required but unused in this read-only case
            },
        }
    )

    const { data, error } = await supabase.from('student').select('*')

    if (error) {
        console.error('Supabase error:', error.message)
        throw error
    }

    return data
}