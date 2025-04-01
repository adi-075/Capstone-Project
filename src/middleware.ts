import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname

    if (process.env.NODE_ENV === 'production' && pathname.startsWith('/api/')) {
        const ip =
            request.headers.get('x-forwarded-for') ||
            'unknown'

        // Fire-and-forget logging to internal API
        fetch(`${request.nextUrl.origin}/_log-block`, {
            method: 'POST',
            body: JSON.stringify({
                ip,
                path: pathname,
                time: new Date().toISOString()
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).catch(() => { }) // Don't block on errors

        return new NextResponse(
            JSON.stringify({
                message: "Hi there 👋 This isn't the page you're looking for.",
                note: "This route is disabled in production.",
                warning: "If you're not a human… we see you. 🙂",
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