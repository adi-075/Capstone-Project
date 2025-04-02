// app/api/login/route.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    const supabase = createRouteHandlerClient({ cookies })
    const body = await req.json()

    const { data, error } = await supabase.auth.signInWithPassword({
        email: body.email,
        password: body.password,
    })

    if (error) {
        console.error('Login failed:', error.message)
        return NextResponse.json({ error: error.message }, { status: 401 })
    }

    console.log('✅ Server-side login successful:', data.user?.email)
    return NextResponse.json({ message: 'Login successful' })
}
