import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function updateSession(req: NextRequest, res: NextResponse) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: req.cookies }
  );

  // Retrieve the current session
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();

  if (sessionError) {
    console.error('Error retrieving session:', sessionError.message);
    return;
  }

  if (session) {
    // Set the access and refresh tokens in cookies
    res.cookies.set('sb-access-token', session.access_token);
    res.cookies.set('sb-refresh-token', session.refresh_token);
  } else {
    // Delete the cookies if no session exists
    res.cookies.delete('sb-access-token');
    res.cookies.delete('sb-refresh-token');
  }
}
