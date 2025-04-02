'use client';

import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { FiLogOut } from 'react-icons/fi';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function LogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        const isConfirmed = window.confirm('Are you sure you want to log out?');
        if (isConfirmed) {
            const { error } = await supabase.auth.signOut();
            if (error) {
                console.error('Error logging out:', error.message);
                return;
            }
            router.push('/login');
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
}
