'use server'

import { createClient } from '@/lib/supabase/server'

export async function enrollInCourse(courseCode: string) {
    try {
        const supabase = createClient()

        // Get the current user to verify authentication
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()
        
        if (sessionError || !session) {
            throw new Error('User not authenticated')
        }

        console.log('Enrolling student with ID:', session.user.id)

        // Check if student is already enrolled in this course
        const { data: existingRegistration, error: checkError } = await supabase
            .from('registrations')
            .select('id')
            .eq('user_id', session.user.id)
            .eq('course', courseCode)
            .single()

        if (checkError && checkError.code !== 'PGRST116') { // PGRST116 is "no rows returned"
            throw new Error(`Error checking enrollment: ${checkError.message}`)
        }

        if (existingRegistration) {
            throw new Error('You are already enrolled in this course')
        }

        // Enroll the student
        const { error: enrollError } = await supabase
            .from('registrations')
            .insert([
                {
                    user_id: session.user.id,
                    course: courseCode
                }
            ])

        if (enrollError) {
            throw new Error(`Error enrolling in course: ${enrollError.message}`)
        }

        return { success: true }
    } catch (error) {
        console.error('Error in enrollInCourse:', error)
        if (error instanceof Error) {
            throw new Error(error.message)
        }
        throw new Error('Failed to enroll in course')
    }
}

export async function fetchCourses() {
    try {
        const supabase = createClient()

        // Get the current user to verify authentication
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()
        
        if (sessionError) {
            console.error('Session error:', sessionError)
            throw new Error(`Session error: ${sessionError.message}`)
        }

        if (!session) {
            console.error('No session found')
            throw new Error('No session found')
        }

        console.log('Fetching courses for user ID:', session.user.id)

        // First get the student details
        const { data: studentData, error: studentError } = await supabase
            .from('student')
            .select('id, first_name, last_name')
            .eq('uid', session.user.id)
            .single()

        if (studentError) {
            console.error('Error fetching student:', studentError)
            throw new Error(`Error fetching student: ${studentError.message}`)
        }

        if (!studentData) {
            throw new Error('Student not found')
        }

        // Get registered courses with course details
        const { data: registrations, error: regError } = await supabase
            .from('registrations')
            .select(`
                course,
                course:course!course (
                    course_code,
                    name,
                    building,
                    room
                )
            `)
            .eq('user_id', session.user.id)
            .order('id', { ascending: false })

        if (regError) {
            console.error('Error fetching registrations:', regError)
            throw new Error(`Error fetching registrations: ${regError.message}`)
        }

        if (!registrations) {
            return []
        }

        // Remove duplicates by keeping only the most recent registration for each course
        const uniqueCourses = registrations.reduce((acc: any[], current) => {
            const exists = acc.find(item => item.course === current.course)
            if (!exists) {
                acc.push(current)
            }
            return acc
        }, [])

        // Transform the data to match the expected format
        const transformedData = uniqueCourses.map(registration => {
            console.log('Registration data:', registration); // Debug log
            return {
                student_id: studentData.id,
                student_name: `${studentData.first_name} ${studentData.last_name}`,
                course_code: registration.course?.course_code || String(registration.course),
                course_name: registration.course?.name || 'Unknown Course',
                building: registration.course?.building || 'Unknown Building',
                room: registration.course?.room || 'Unknown Room'
            }
        })

        return transformedData
    } catch (error) {
        console.error('Error in fetchCourses:', error)
        if (error instanceof Error) {
            throw new Error(`Failed to fetch courses: ${error.message}`)
        }
        throw new Error('Failed to fetch courses: Unknown error')
    }
} 