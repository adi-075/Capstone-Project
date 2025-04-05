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
        options: {
            data: {
                first_name: formData.get('first_name') as string,
                last_name: formData.get('last_name') as string,
                major: formData.get('major') as string,
                year: formData.get('year') as string,
            }
        }
    }

    console.log('Starting signup process...')
    console.log('Form data:', data)

    const { data: authData, error: authError } = await supabase.auth.signUp(data)
    
    if (authError) {
        console.error('Auth Error:', authError)
        redirect(`/signup?error=${encodeURIComponent(authError.message)}`)
    }

    if (!authData.user) {
        console.error('No user data returned from auth signup')
        redirect('/signup?error=Failed to create user account')
    }

    console.log('Auth User Created:', authData.user.id)
    revalidatePath('/', 'layout')
    redirect('/')
}