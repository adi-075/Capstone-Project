import { NextRequest, NextResponse } from 'next/server'
import supabase from '@/app/utils/supabaseClient'
export async function POST(req: NextRequest) {
    try {
        const body = await req.json()

        const { error } = await supabase
            .from('blocked_requests')
            .insert({
                ip: body.ip,
                path: body.path,
                time: body.time,
            })

        if (error) {
            console.error('Supabase insert error:', error)
            return NextResponse.json({ success: false }, { status: 500 })
        }

        return NextResponse.json({ success: true })
    } catch (err) {
        console.error('Unexpected error logging to Supabase:', err)
        return NextResponse.json({ success: false }, { status: 500 })
    }
}