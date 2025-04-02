import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    const body = await req.json();

    const { data, error } = await supabase.auth.signInWithPassword({
        email: body.email,
        password: body.password,
    });

    if (error) {
        console.error('Login failed:', error.message);
        return NextResponse.json({ error: error.message }, { status: 401 });
    }

    console.log('✅ Server-side login successful:', data.user?.email);

    // Redirect to the home page after successful login
    const redirectUrl = new URL('/', req.url);
    const response = NextResponse.redirect(redirectUrl);

    // Set Supabase auth cookies into the response
    await supabase.auth.getSession(); // This ensures cookie state is refreshed
    return response;
}