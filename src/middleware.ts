import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname
    const referer = request.headers.get('referer') || ''
    const host = request.headers.get('host') || ''
    const isProd = process.env.NODE_ENV === 'production'

    const isApiRoute = pathname.startsWith('/api/')
    const isFromFrontend = referer.includes(host)

    if (isProd && isApiRoute && !isFromFrontend) {
        return new NextResponse(
            JSON.stringify({
                message: "🚫 External access to this API route is blocked in production.",
                hint: "This route is only accessible by the Rocketdash frontend.",
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
