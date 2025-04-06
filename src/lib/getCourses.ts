// lib/getCourses.ts
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import type { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'

export async function getCourses() {
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
                setAll: () => {}, // Not needed in read-only case
            },
        }
    )

    // ✅ Secure user fetch
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
        console.error('Supabase auth error:', userError?.message || 'No user')
        throw new Error('User not authenticated')
    }

    // ✅ Call the RPC that returns this user's course data
    const { data, error } = await supabase.rpc('get_my_courses')

    if (error) {
        console.error('Supabase RPC error:', error.message)
        throw error
    }

    console.log('Courses for user:', user.id, data)

    return data
}