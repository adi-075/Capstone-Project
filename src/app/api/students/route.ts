import supabase from '@/app/utils/supabaseClient'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const { data, error } = await supabase
            .from('student')
            .select('*')

        if (error) throw error

        return NextResponse.json(data)
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Error fetching Students"
        return NextResponse.json(
            { error: errorMessage },
            { status: 500 }
        )
    }
}