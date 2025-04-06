import { NextRequest, NextResponse } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';

export async function updateSession(req: NextRequest, res: NextResponse) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll().map(cookie => ({
            name: cookie.name,
            value: cookie.value,
          }))
        },
        setAll(cookieList: { name: string; value: string; options?: CookieOptions }[]) {
          cookieList.forEach(cookie => {
            res.cookies.set({
              name: cookie.name,
              value: cookie.value,
              ...cookie.options,
            })
          })
        },
      },
    }
  )

  await supabase.auth.getSession()

  return res
}
