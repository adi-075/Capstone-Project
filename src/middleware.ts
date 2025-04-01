import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname

    // Block ALL /api routes, no matter the environment
    if (process.env.NODE_ENV === 'production' && pathname.startsWith('/api/')) {
        return new NextResponse(
            JSON.stringify({ message: 'Forbidden: API access is blocked.' }),
            {
                status: 403,
                headers: { 'Content-Type': 'application/json' },
            }
        )
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/api/:path*'], // Match /api and anything under it
}
