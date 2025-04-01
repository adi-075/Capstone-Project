import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname

    if (process.env.NODE_ENV === 'production' && pathname.startsWith('/api/')) {
        return new NextResponse(
            JSON.stringify({
                message: "Hi there 👋 This isn't the page you're looking for.",
                note: "API routes are disabled in production.",
                timestamp: new Date().toISOString()
            }),
            {
                status: 403,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/api/:path*'],
}
