import React from "react";
import Image from "next/image";

export const CourseCard = () => {
    return (
        <>
            <Card
                title="ENGT 4050"
                value="Senior Technology Capstone"
                url="/capstone.jpg"
                professor="Prof. Bilal Sarsour"
            />
            <Card
                title="CSET 3250"
                value="Client-Side Scripting"
                professor="Dr. Hong Wang"
                url="/scripting.jpg"
            />
            <Card
                title="INFS 3400"
                value="Information Systems"
                professor="Dr. Basaam Hasan"
                url="/information-security.jpg"
            />
            <Card
                title="CSET 4750"
                value="Computer Networks"
                professor="Prof. Scott Brahaney"
                url="/information-security.jpg"
            />
            <Card
                title="BUAD 3010"
                value="Principles of Marketing"
                professor="Dr. Ellen Pullins"
                url="/information-security.jpg"
            />
            <Card
                title="FINA 3060"
                value="Personal Finance"
                professor="Prof. Shawn Tysiak"
                url="/information-security.jpg"
            />
        </>
    );
};

const Card = ({
    title,
    value,
    url,
    professor,
}: {
    title: string;
    value: string;
    url?: string;
    professor?: string;
}) => {
    return (
        <div className="col-span-4 relative h-96 rounded-xl overflow-hidden shadow-xl">
            {/* Full-sized background image */}
            <div className="absolute inset-0">
                <Image
                    src={url || ''}
                    alt={title}
                    fill
                    className="object-cover"
                />
            </div>

            {/* Semi-transparent overlay for better text readability if needed */}
            <div className="absolute inset-0 bg-black/30 bg-opacity-20"></div>

            {/* Text overlay container */}
            <div className="absolute bottom-0 left-0 right-0">
                <div className="bg-white/90 backdrop-blur-3xl p-4 m-3 rounded-lg shadow-sm">
                    <h3 className="text-stone-600 text-lg font-medium mb-2">{title}</h3>
                    <p className="text-3xl font-bold text-stone-800 mb-1">{value}</p>
                    <p className="text-2xl font-bold text-stone-500 mb-1">{professor}</p>
                </div>
            </div>
        </div>
    );
};