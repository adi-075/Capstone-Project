import { NextResponse } from 'next/server'
import { fetchAllTablesData } from '../supabase'

export async function GET() {
    console.log('All tables API route called');
    try {
        const data = await fetchAllTablesData()
        
        if (!data) {
            console.log('No data returned from fetchAllTablesData');
            return NextResponse.json({ error: 'No data found' }, { status: 404 })
        }
        
        return NextResponse.json(data)
    } catch (error) {
        console.error('API route error:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}