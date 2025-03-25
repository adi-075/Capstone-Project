import { NextResponse } from 'next/server'
import { fetchAllTablesData } from '../supabase'

export async function GET() {
    console.log('Grades API route called');
    try {
        const allData = await fetchAllTablesData()
        
        if (!allData) {
            console.log('No data returned from fetchAllTablesData');
            return NextResponse.json({ error: 'No data found' }, { status: 404 })
        }

        const grades = allData['grade'] || []
        
        if (grades.length === 0) {
            console.log('No grades found in database');
            return NextResponse.json({ message: 'No grades found in database' }, { status: 200 })
        }
        
        console.log(`Returning ${grades.length} grades`);
        return NextResponse.json(grades)
    } catch (error) {
        console.error('API route error:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
} 