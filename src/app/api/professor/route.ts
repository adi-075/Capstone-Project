import supabase from '@/app/utils/supabaseClient'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const { data, error } = await supabase
            .from('professor')
            .select('*')

        if (error) throw error

        return NextResponse.json(data)
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Error fetching Professors"
        return NextResponse.json(
            { error: errorMessage },
            { status: 500 }
        )
    }
}