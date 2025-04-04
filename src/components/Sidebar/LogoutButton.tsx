'use client';

import { FiLogOut } from 'react-icons/fi';

export const LogoutButton = () => {
    const handleLogout = async () => {
        const isConfirmed = window.confirm('Are you sure you want to log out?');
        if (!isConfirmed) return;

        const res = await fetch('/auth/signout', {
            method: 'POST',
        });

        if (res.redirected) {
            // Let the server handle the redirect cleanly
            window.location.href = res.url;
        } else {
            const errorText = await res.text();
            console.error('Logout failed:', errorText);
        }
    };

    return (
        <button
            onClick={handleLogout}
            className="flex items-center justify-start gap-2 w-full rounded px-2 py-1.5 text-sm transition-[box-shadow,_background-color,_color] hover:bg-stone-200 bg-transparent text-stone-500 shadow-none"
        >
            <FiLogOut />
            <span>Logout</span>
        </button>
    );
}; 