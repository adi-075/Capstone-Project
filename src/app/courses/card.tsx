import React from "react";
import Image from "next/image";
import { defineBaseUrl } from "@/app/utils/supabaseClient";

interface Course {
    student_id: string;
    professor_id: number;
    course_name: string;
    course_code: string;
    building: string;
    room: string;
}

const courseImages = [
    '/courses/1.avif',
    '/courses/2.avif',
    '/capstone.jpg',
    '/information-security.jpg'
];

function getRandomImage(): string {
    const randomIndex = Math.floor(Math.random() * courseImages.length);
    return courseImages[randomIndex];
}

async function getCourses() {
    try {
        const base_url = await defineBaseUrl();
        const response = await fetch(`${base_url}/api/courses`);
        if (!response.ok) throw new Error('Failed to fetch courses');
        return response.json();
    } catch (error) {
        console.error('Error fetching courses:', error);
        return [];
    }
}

export const CourseCard = async () => {
    const courses = await getCourses();

    return (
        <>
            {courses.map((course: Course) => (
                <Card
                    key={`${course.course_code}-${course.student_id}`}
                    title={course.course_code}
                    value={course.course_name}
                    location={`${course.building} ${course.room}`}
                    imageUrl={getRandomImage()}
                />
            ))}
        </>
    );
};

const Card = ({
    title,
    value,
    location,
    imageUrl,
}: {
    title: string;
    value: string;
    location: string;
    imageUrl: string;
}) => {
    return (
        <div className="col-span-4 relative h-96 rounded-xl overflow-hidden shadow-xl">
            <div className="absolute inset-0">
                <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            <div className="absolute inset-0 bg-black/30"></div>

            <div className="absolute bottom-0 left-0 right-0">
                <div className="bg-white/90 backdrop-blur-3xl p-4 m-3 rounded-lg shadow-sm">
                    <h3 className="text-stone-600 text-lg font-medium mb-2">{title}</h3>
                    <p className="text-3xl font-bold text-stone-800 mb-1">{value}</p>
                    <p className="text-2xl font-bold text-stone-600 mb-1">{location}</p>
                </div>
            </div>
        </div>
    );
};