'use client';

import { FiLogOut } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createClient } from '@/app/utils/supabase/client';

export const LogoutButton = () => {
    const router = useRouter();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = async () => {
        const isConfirmed = window.confirm('Are you sure you want to log out?');
        if (!isConfirmed) return;

        try {
            setIsLoggingOut(true);

            // First, sign out from Supabase client-side
            const supabase = createClient();
            await supabase.auth.signOut();

            // Then call our API endpoint
            const res = await fetch('/auth/signout', {
                method: 'POST',
                cache: 'no-store',
            });

            if (res.redirected) {
                window.location.href = res.url;
                return;
            }

            // If we reach here, redirect to login page
            window.location.href = '/login';
            
        } catch (error) {
            console.error('Logout failed:', error);
            // Even if there's an error, try to redirect to login
            window.location.href = '/login';
        } finally {
            setIsLoggingOut(false);
        }
    };

    return (
        <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex items-center justify-start gap-2 w-full rounded px-2 py-1.5 text-sm transition-[box-shadow,_background-color,_color] hover:bg-stone-200 dark:hover:bg-[#0B1739] bg-transparent text-stone-500 dark:text-stone-100/80 shadow-none disabled:opacity-50"
        >
            <FiLogOut className={isLoggingOut ? 'animate-spin' : ''} />
            <span>{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
        </button>
    );
}; 