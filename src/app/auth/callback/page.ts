'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function AuthCallback() {
    const router = useRouter()
    const [attempts, setAttempts] = useState(0)

    useEffect(() => {
        const verifySession = async () => {
            const { data: { session } } = await supabase.auth.getSession()

            if (session) {
                console.log('✅ Session exists, redirecting to /')
                router.push('/')
            } else if (attempts < 5) {
                // Try again in 300ms (max 5 times)
                setTimeout(() => setAttempts((prev) => prev + 1), 300)
            } else {
                console.log('❌ Session still missing after retries')
                router.push('/login')
            }
        }

        verifySession()
    }, [router, attempts])


}
