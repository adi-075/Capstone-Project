import { NextResponse } from 'next/server'
import { fetchStudents } from '@/app/api/supabase'

export async function GET() {
    console.log('Students API route called');
    try {
        const students = await fetchStudents()
        
        if (!students) {
            console.log('No students data returned from fetchStudents');
            return NextResponse.json({ error: 'No data found' }, { status: 404 })
        }
        
        if (students.length === 0) {
            console.log('No students found in database');
            return NextResponse.json({ message: 'No students found in database' }, { status: 200 })
        }
        
        console.log(`Returning ${students.length} students`);
        return NextResponse.json(students)
    } catch (error) {
        console.error('API route error:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
} 