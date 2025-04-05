'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/app/utils/supabase/server'

export async function login(formData: FormData) {
    const supabase = await createClient()
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { error } = await supabase.auth.signInWithPassword(data)
    
    if (error) {
        console.error('Login error:', error.message)
        redirect(`/login?error=${encodeURIComponent(error.message)}`)
    }

    revalidatePath('/', 'layout')
    redirect('/')
}

export async function signup(formData: FormData) {
    const supabase = await createClient()
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    // Create auth user with metadata
    const { data: authData, error: authError } = await supabase.auth.signUp({
        ...data,
        options: {
            data: {
                first_name: formData.get('first_name') as string,
                last_name: formData.get('last_name') as string,
                major: formData.get('major') as string,
                year: formData.get('year') as string,
            }
        }
    })
    
    if (authError) {
        console.error('Auth Error:', authError)
        redirect(`/signup?error=${encodeURIComponent(authError.message)}`)
    }

    if (!authData.user) {
        console.error('No user data returned from auth signup')
        redirect('/signup?error=Failed to create user account')
    }

    // Check if student record already exists
    const { data: existingStudent, error: checkError } = await supabase
        .from('student')
        .select('*')
        .eq('uid', authData.user.id)
        .single();

    if (checkError && checkError.code !== 'PGRST116') { // PGRST116 is "no rows returned"
        console.error('Error checking existing student:', checkError);
        redirect(`/signup?error=${encodeURIComponent('Error checking existing account')}`);
    }

    // If student record already exists, just redirect to home
    if (existingStudent) {
        console.log('Student record already exists, proceeding to home page');
        revalidatePath('/', 'layout');
        redirect('/');
    }

    // Create student record
    const { error: studentError } = await supabase
        .from('student')
        .insert([
            {
                id: authData.user.email,
                first_name: formData.get('first_name') as string,
                last_name: formData.get('last_name') as string,
                email: authData.user.email,
                major: formData.get('major') as string,
                year: formData.get('year') as string,
                uid: authData.user.id
            }
        ])

    if (studentError) {
        console.error('Student creation error details:', {
            message: studentError.message,
            code: studentError.code,
            details: studentError.details,
            hint: studentError.hint
        });
        
        // If student creation fails, we should delete the auth user
        await supabase.auth.admin.deleteUser(authData.user.id)
        redirect(`/signup?error=${encodeURIComponent(studentError.message)}`)
    }

    console.log('Student created successfully')
    revalidatePath('/', 'layout')
    redirect('/')
}