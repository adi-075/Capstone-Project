import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    // Get the API key from the request headers
    const apiKey = request.headers.get('x-api-key')
    const expectedKey = process.env.NEXT_PUBLIC_API_KEY as string
    
    console.log('Debug Info:')
    console.log('Received API Key length:', apiKey?.length || 0)
    console.log('Expected API Key length:', expectedKey?.length || 0)
    console.log('Keys match:', apiKey === expectedKey)
    
    // Check if the route is /api/students
    if (request.nextUrl.pathname.startsWith('/api/students') || 
        request.nextUrl.pathname.startsWith('/api/all') ||
        request.nextUrl.pathname.startsWith('/api/courses')) {
        // Verify the API key
        if (!apiKey || apiKey !== expectedKey) {
            console.log('API Key mismatch or missing')
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }
        console.log('API Key verified successfully')
    }

    return NextResponse.next()
}

// Configure which routes to protect
export const config = {
    matcher: ['/api/students', '/api/all', '/api/courses']
}   