import React from "react";
import Image from "next/image";
import { getCourses } from "@/lib/getCourses";

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

export const CourseCard = async () => {
    const courses = await getCourses();

    if (!courses || courses.length === 0) {
        return (
            <div className="col-span-4 ml-1">
                <p className="text-lg text-stone-600">You are not enrolled in any courses yet.</p>
                <button className="mt-3 px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
                    Add Course
                </button>
            </div>
        );
    }

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