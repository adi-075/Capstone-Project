'use client';

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { fetchCourses } from "@/app/actions/courses";

interface Course {
    course_code: string;
    course_name: string;
    building: string;
    room: string;
    professor_name: string;
}

const courseImages = [
    '/courses/1.avif',
    '/courses/2.avif',
    '/capstone.jpg',
    '/information-security.jpg'
];

// Function to get a consistent image for a course code
function getCourseImage(courseCode: string): string {
    // Create a hash of the course code to get a consistent index
    const hash = courseCode.split('').reduce((acc, char) => {
        return acc + char.charCodeAt(0);
    }, 0);
    
    // Use the hash to get a consistent index from courseImages
    const index = Math.abs(hash) % courseImages.length;
    return courseImages[index];
}

export const CourseCard = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCoursesData = async () => {
            try {
                setError(null);
                const data = await fetchCourses();
                setCourses(data);
            } catch (error) {
                console.error('Error fetching courses:', error);
                setError(error instanceof Error ? error.message : 'Failed to fetch courses');
            } finally {
                setLoading(false);
            }
        };

        fetchCoursesData();
    }, []);

    if (loading) {
        return (
            <div className="col-span-4 ml-1">
                <p className="text-lg text-stone-600 dark:text-[#AEB9E1]">Loading courses...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="col-span-4 ml-1">
                <p className="text-lg text-red-600 dark:text-red-400">Error: {error}</p>
            </div>
        );
    }

    if (!courses || courses.length === 0) {
        return (
            <div className="col-span-4 ml-1">
                <p className="text-lg text-stone-600 dark:text-[#AEB9E1]">You are not enrolled in any courses yet.</p>
            </div>
        );
    }

    return (
        <>
            {courses.map((course: Course) => (
                <Card
                    key={course.course_code}
                    title={course.course_code}
                    professorName={course.professor_name}
                    imageUrl={getCourseImage(course.course_code)}
                    courseName={course.course_name}
                    building={course.building}
                    room={course.room}
                />
            ))}
        </>
    );
};

const Card = ({
    title,
    professorName,
    imageUrl,
    courseName,
    building,
    room
}: {
    title: string;
    professorName: string;
    imageUrl: string;
    courseName: string;
    building: string;
    room: string;
}) => {
    return (
        <div className="col-span-4 relative h-96 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="absolute inset-0">
                <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                    priority
                />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
            
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4">
                    <h3 className="text-2xl font-bold mb-2 tracking-wide">{title}</h3>
                    <p className="text-lg mb-2 font-medium">{courseName}</p>
                    <div className="space-y-1 text-sm">
                        <p className="flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            {professorName}
                        </p>
                        <p className="flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {building} {room}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};