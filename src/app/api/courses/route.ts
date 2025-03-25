import { NextResponse } from 'next/server'
import { fetchAllTablesData } from '../supabase'

export async function GET() {
    console.log('Courses API route called');
    try {
        const allData = await fetchAllTablesData()
        
        if (!allData) {
            console.log('No data returned from fetchAllTablesData');
            return NextResponse.json({ error: 'No data found' }, { status: 404 })
        }

        const courses = allData['course'] || []
        
        if (courses.length === 0) {
            console.log('No courses found in database');
            return NextResponse.json({ message: 'No courses found in database' }, { status: 200 })
        }
        
        console.log(`Returning ${courses.length} courses`);
        return NextResponse.json(courses)
    } catch (error) {
        console.error('API route error:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
} 