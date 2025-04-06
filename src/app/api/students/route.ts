import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const cookieStore = await cookies()

        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    getAll: () =>
                        cookieStore.getAll().map((c) => ({
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
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json(data)
    } catch (error) {
        console.error('Server error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
} 