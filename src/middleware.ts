import { NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/app/utils/supabase/middleware'
import { createServerClient } from '@supabase/ssr'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  // Call your existing middleware (update session tokens)
  await updateSession(req, res)

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => req.cookies.getAll().map(c => ({ name: c.name, value: c.value })),
        setAll: cookies => cookies.forEach(c => res.cookies.set(c.name, c.value, c.options)),
      },
    }
  )

  // Check authentication status explicitly
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const path = req.nextUrl.pathname

  const publicPaths = ['/login', '/signup', '/auth/confirm', '/error']

  const isPublicPath = publicPaths.some(p => path.startsWith(p))

  if (!user && !isPublicPath) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  if (user && isPublicPath) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return res
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}