'use client';

import React from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

interface Course {
    id: string;
    course_code: string;
    name: string;
    building: string;
    room: string | null;
}

interface EnrollModalProps {
    isOpen: boolean;
    onClose: () => void;
    onEnroll: (courseCode: string) => void;
}

export const EnrollModal: React.FC<EnrollModalProps> = ({ isOpen, onClose, onEnroll }) => {
    const router = useRouter();
    const [courses, setCourses] = React.useState<Course[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);
    const [selectedCourse, setSelectedCourse] = React.useState<string>('');

    React.useEffect(() => {
        const fetchCourses = async () => {
            try {
                const supabase = createClient(
                    process.env.NEXT_PUBLIC_SUPABASE_URL!,
                    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
                );

                // Fetch all courses
                const { data, error: coursesError } = await supabase
                    .from('course')
                    .select('*')
                    .order('course_code');

                if (coursesError) {
                    throw new Error(`Courses fetch error: ${coursesError.message}`);
                }

                if (!data) {
                    throw new Error('No courses data returned');
                }

                setCourses(data);
                setError(null);
            } catch (err) {
                console.error('Error fetching courses:', err);
                setError(err instanceof Error ? err.message : 'Failed to load courses. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        if (isOpen) {
            fetchCourses();
        }
    }, [isOpen]);

    const handleEnroll = async () => {
        if (!selectedCourse) return;

        try {
            const supabase = createClient(
                process.env.NEXT_PUBLIC_SUPABASE_URL!,
                process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
            );

            // Insert into registrations table
            const { error } = await supabase
                .from('registrations')
                .insert({ course: selectedCourse });

            if (error) {
                if (error.message.includes('Auth session missing')) {
                    router.push('/login');
                    return;
                }
                throw error;
            }

            // Call the parent's onEnroll callback
            onEnroll(selectedCourse);
            setSelectedCourse('');
            onClose();
        } catch (err) {
            console.error('Error enrolling in course:', err);
            setError(err instanceof Error ? err.message : 'Failed to enroll in course. Please try again.');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-[#101935] rounded-lg p-6 max-w-md w-full mx-4">
                <h2 className="text-2xl font-bold mb-4 text-stone-800 dark:text-white">Enroll in a Course</h2>
                
                {loading ? (
                    <p className="text-stone-600 dark:text-[#AEB9E1]">Loading courses...</p>
                ) : error ? (
                    <div className="space-y-2">
                        <p className="text-red-500 dark:text-red-400">{error}</p>
                        <button
                            onClick={() => setLoading(true)}
                            className="text-sm text-violet-500 hover:text-violet-600"
                        >
                            Try Again
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="relative">
                            <select
                                value={selectedCourse}
                                onChange={(e) => setSelectedCourse(e.target.value)}
                                className="w-full p-3 bg-stone-50 dark:bg-[#1A2236] border border-stone-300 dark:border-stone-700 rounded-lg text-stone-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                            >
                                <option value="">Select a course</option>
                                {courses.map((course) => (
                                    <option key={course.id} value={course.course_code}>
                                        {course.course_code} - {course.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {selectedCourse && (
                            <div className="p-4 bg-stone-50 dark:bg-[#1A2236] rounded-lg">
                                <h3 className="font-medium text-stone-800 dark:text-white mb-2">Course Details</h3>
                                {courses.find(c => c.course_code === selectedCourse) && (
                                    <>
                                        <p className="text-sm text-stone-600 dark:text-[#AEB9E1]">
                                            <span className="font-medium">Location:</span> {courses.find(c => c.course_code === selectedCourse)?.building}
                                            {courses.find(c => c.course_code === selectedCourse)?.room && 
                                                ` - Room ${courses.find(c => c.course_code === selectedCourse)?.room}`}
                                        </p>
                                    </>
                                )}
                            </div>
                        )}

                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 bg-stone-200 dark:bg-[#1A2236] text-stone-800 dark:text-white rounded-lg hover:bg-stone-300 dark:hover:bg-[#232B3F] transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleEnroll}
                                disabled={!selectedCourse}
                                className="px-4 py-2 bg-violet-500 text-white rounded-lg hover:bg-violet-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Enroll
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}; 