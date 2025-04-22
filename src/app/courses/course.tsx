'use client';

import React from 'react'
import { CourseCard } from './card'
import { EnrollModal } from './enroll-modal'
import { createClient } from '@supabase/supabase-js'

export default function Course() {
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const handleEnroll = async (courseCode: string) => {
        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );

        const { error } = await supabase
            .from('registrations')
            .insert({ course: courseCode });

        if (error) {
            console.error('Error enrolling in course:', error);
            return;
        }

        // Close modal and refresh the page to show new enrollment
        setIsModalOpen(false);
        window.location.reload();
    };

    return (
        <div className="min-h-screen bg-stone-50 dark:bg-[#101935]">
            <div className="container mx-auto py-8">
                <div className="flex justify-between items-center px-5 mb-5">
                    <h1 className='text-left text-2xl font-bold text-stone-950 dark:text-white/80'>Enrolled Courses</h1>
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="px-6 py-3 bg-violet-500 text-white rounded-lg shadow hover:bg-violet-600 transition"
                    >
                        Add Course
                    </button>
                </div>
                <div className='px-4 grid gap-5 grid-cols-12 p-2'>
                    <CourseCard />
                </div>
                <EnrollModal 
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onEnroll={handleEnroll}
                />
            </div>
        </div>
    )
}
