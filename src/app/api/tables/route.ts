import supabase from "@/app/utils/supabaseClient"
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const { data, error } = await supabase
            .rpc('get_tables')
            .select('*')

        if (error) throw error

        return NextResponse.json(data)
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Error fetching Tables"
        return NextResponse.json(
            { error: errorMessage },
            { status: 500 }
        )
    }
}