import supabase from "@/app/utils/supabaseClient"
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const { data, error } = await supabase
            .rpc('get_tables')
            .select('*')

        if (error) throw error

        return NextResponse.json(data)
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "Error fetching Tables" },
            { status: 500 }
        )
    }
}