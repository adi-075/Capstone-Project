import React from "react";
// import Image from "next/image";
// import { FaUser } from "react-icons/fa";
import { FaLocationArrow } from "react-icons/fa6";


export const CourseCard = () => {
    return (
        <>
            <Card
                title="ENGT 4050"
                value="Senior Technology Capstone"
                url="/capstone.jpg"
                professor="Prof. Bilal Sarsour"
                room="NE 1160"
            />
            <Card
                title="CSET 3250"
                value="Client-Side Scripting"
                professor="Dr. Hong Wang"
                url="/scripting.jpg"
                room="Online"
            />
            <Card
                title="INFS 3400"
                value="Information Systems"
                professor="Dr. Basaam Hasan"
                url="/information-security.jpg"
                room="Stranahan 0118"
            />
            <Card
                title="CSET 4750"
                value="Computer Networks"
                professor="Prof. Scott Brahaney"
                url="/information-security.jpg"
                room="NE 1001"
            />
            <Card
                title="BUAD 3010"
                value="Principles of Marketing"
                professor="Dr. Ellen Pullins"
                url="/information-security.jpg"
                room="Savage & Business 1140"
            />
            <Card
                title="FINA 3060"
                value="Personal Finance"
                professor="Prof. Shawn Tysiak"
                url="/information-security.jpg"
                room="Online"
            />
        </>
    );
};

const Card = ({
    title,
    value,
    url,
    professor,
    room,
}: {
    title: string;
    value: string;
    url?: string;
    professor?: string;
    room?: string;
}) => {
    return (
        <div className="col-span-4 relative h-96 rounded-xl overflow-hidden shadow-xl">
            {/* Full-sized background image */}
            <div className="absolute inset-0">
                <img
                    src={url}
                    alt={title}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Semi-transparent overlay for better text readability if needed */}
            <div className="absolute inset-0 bg-black/30 bg-opacity-20"></div>

            {/* Text overlay container */}
            <div className="absolute bottom-0 left-0 right-0">
                <div className="bg-white/90 backdrop-blur-3xl p-4 m-3 rounded-lg shadow-sm">
                    <h3 className="text-stone-600 text-lg font-medium mb-2">{title}</h3>
                    <p className="text-3xl font-bold text-stone-800 mb-1">{value}</p>
                    <p className="text-2xl font-bold text-stone-600 mb-1">
                        {professor}</p>
                    <p className="text-2xl font-bold text-stone-600 mb-1">Classroom: {room}</p>
                </div>
            </div>
        </div>
    );
};