import { createClient } from '@supabase/supabase-js'

// This client is for server-side use only
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_KEY

if (!supabaseUrl) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL is not defined in environment variables')
}

if (!supabaseKey) {
    throw new Error('SUPABASE_SERVICE_KEY or SUPABASE_KEY is not defined in environment variables')
}

const supabase = createClient(supabaseUrl, supabaseKey)

// Individual fetch functions for each table
export async function fetchStudents() {
    const { data, error } = await supabase
        .from('student')
        .select('*')

    if (error) {
        console.error('Error fetching students:', error)
        return null
    }

    return data
}

export async function fetchProfessors() {
    const { data, error } = await supabase
        .from('professor')
        .select('*')

    if (error) {
        console.error('Error fetching professors:', error)
        return null
    }

    return data
}

export async function fetchCourses() {
    const { data, error } = await supabase
        .from('course')
        .select('*')

    if (error) {
        console.error('Error fetching courses:', error)
        return null
    }

    return data
}

export async function fetchGrades() {
    const { data, error } = await supabase
        .from('grade')
        .select('*')

    if (error) {
        console.error('Error fetching grades:', error)
        return null
    }

    return data
}

export default supabase