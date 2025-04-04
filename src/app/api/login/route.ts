import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const cookieStore = cookies();
        const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
        const body = await req.json();

        // Sign in with email and password
        const { data, error } = await supabase.auth.signInWithPassword({
            email: body.email,
            password: body.password,
        });

        if (error) {
            console.error('Login failed:', error.message);
            return NextResponse.json({ error: error.message }, { status: 401 });
        }

        // Get the session to ensure cookies are set
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
            console.error('Session error:', sessionError.message);
            return NextResponse.json({ error: sessionError.message }, { status: 500 });
        }

        if (!session) {
            return NextResponse.json({ error: 'No session created' }, { status: 500 });
        }

        console.log('✅ Server-side login successful:', data.user?.email);

        // Create response with redirect
        const redirectUrl = new URL('/', req.url);
        const response = NextResponse.redirect(redirectUrl);

        return response;
    } catch (error) {
        console.error('Unexpected error during login:', error);
        return NextResponse.json(
            { error: 'An unexpected error occurred' },
            { status: 500 }
        );
    }
}