'use client';

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { fetchCourses, deleteCourse } from "@/app/actions/courses";
import { FiTrash2 } from "react-icons/fi";

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

interface CardProps {
    title: string;
    professorName: string;
    imageUrl: string;
    courseName: string;
    building: string;
    room: string;
    onDelete?: () => void;
}

const Card: React.FC<CardProps> = ({ title, professorName, imageUrl, courseName, building, room, onDelete }) => {
    return (
        <div className="col-span-4">
            <div className="bg-white dark:bg-[#1A2234] rounded-lg shadow-md overflow-hidden">
                <div className="relative h-48">
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="p-4">
                    <h3 className="text-lg font-semibold text-stone-900 dark:text-white/90">{title}</h3>
                    <p className="text-sm text-stone-600 dark:text-[#AEB9E1]">{courseName}</p>
                    <p className="text-sm text-stone-600 dark:text-[#AEB9E1] mt-2">
                        Professor: {professorName}
                    </p>
                    <p className="text-sm text-stone-600 dark:text-[#AEB9E1]">
                        Location: {building} {room}
                    </p>
                    <button
                        onClick={onDelete}
                        className="mt-4 flex items-center gap-2 text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                    >
                        <FiTrash2 className="text-lg" />
                        <span>Delete Course</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export const CourseCard = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const handleDelete = async (courseCode: string) => {
        if (!confirm('Are you sure you want to delete this course?')) {
            return;
        }

        try {
            await deleteCourse(courseCode);
            // Refresh the courses list
            const updatedCourses = await fetchCourses();
            setCourses(updatedCourses);
        } catch (error) {
            console.error('Error deleting course:', error);
            alert(error instanceof Error ? error.message : 'Failed to delete course');
        }
    };

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
                    onDelete={() => handleDelete(course.course_code)}
                />
            ))}
        </>
    );
};