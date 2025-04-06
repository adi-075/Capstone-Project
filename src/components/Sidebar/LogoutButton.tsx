'use client';

import { FiLogOut } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const LogoutButton = () => {
    const router = useRouter();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = async () => {
        const isConfirmed = window.confirm('Are you sure you want to log out?');
        if (!isConfirmed) return;

        try {
            setIsLoggingOut(true);
            const res = await fetch('/auth/signout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!res.ok) {
                throw new Error(await res.text());
            }

            // Clear any local storage or session data if needed
            localStorage.clear();
            sessionStorage.clear();

            // Use router.push for client-side navigation
            if (res.redirected) {
                router.push(res.url);
            } else {
                router.push('/login'); // Fallback to login page
            }
            
            // Force a hard refresh after navigation
            router.refresh();
            
        } catch (error) {
            console.error('Logout failed:', error);
            alert('Failed to logout. Please try again.');
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