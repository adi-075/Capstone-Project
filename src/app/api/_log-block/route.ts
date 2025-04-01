import { appendFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'

export async function POST(req: NextRequest) {
    try {
        const data = await req.json()
        const logLine = `[${data.time}] Blocked IP: ${data.ip}, Path: ${data.path}\n`

        const logPath = path.join(process.cwd(), 'logs', 'blocked.log')
        await appendFile(logPath, logLine, { encoding: 'utf-8' })

        return NextResponse.json({ success: true })
    } catch (err) {
        console.error('Log write error:', err)
        return NextResponse.json({ success: false }, { status: 500 })
    }
}
