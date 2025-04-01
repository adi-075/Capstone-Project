import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname
    const isProd = process.env.NODE_ENV === 'production'

    if (!isProd || !pathname.startsWith('/api/')) {
        return NextResponse.next()
    }

    const referer = request.headers.get('referer') || ''
    const origin = request.headers.get('origin') || ''
    const host = request.headers.get('host') || ''

    const isInternal =
        referer.includes(host) ||
        origin.includes(host) ||
        (!referer && !origin) // SSR requests from Node don't send either

    if (!isInternal) {
        return new NextResponse(
            JSON.stringify({
                message: "🚫 External access to this API route is blocked in production.",
                hint: "This route is only accessible by Rocketdash frontend or server.",
                timestamp: new Date().toISOString(),
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
