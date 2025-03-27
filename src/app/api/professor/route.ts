import { NextResponse } from 'next/server'
import { fetchProfessors } from '@/app/api/supabase'

export async function GET() {
    console.log('Professors API route called');
    try {
        const professors = await fetchProfessors()
        
        if (!professors) {
            console.log('No professors data returned from fetchProfessors');
            return NextResponse.json({ error: 'No data found' }, { status: 404 })
        }
        
        if (professors.length === 0) {
            console.log('No professors found in database');
            return NextResponse.json({ message: 'No professors found in database' }, { status: 200 })
        }
        
        console.log(`Returning ${professors.length} professors`);
        return NextResponse.json(professors)
    } catch (error) {
        console.error('API route error:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
} 