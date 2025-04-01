import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const isProd = process.env.NODE_ENV === 'production'
    const { pathname } = request.nextUrl

    // Block all /api/** routes in production
    if (isProd && pathname.startsWith('/api/')) {
        return new NextResponse('Access Denied', { status: 403 })
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/api/:path*'],
}

