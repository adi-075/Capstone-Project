import { NextResponse } from 'next/server'
import { fetchGrades } from '../../utils/supabaseClient'

export async function GET() {
    console.log('Grades API route called');
    try {
        const grades = await fetchGrades()
        
        if (!grades) {
            console.log('No grades data returned from fetchGrades');
            return NextResponse.json({ error: 'No data found' }, { status: 404 })
        }
        
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