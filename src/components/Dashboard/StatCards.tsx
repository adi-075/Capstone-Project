import React from "react";
import { FiTrendingDown, FiTrendingUp } from "react-icons/fi";

export const StatCards = () => {
    return (
        <>
            <Card
                title="Current GPA"
                value="3.92"
                pillText="Up 0.08"
                trend="up"
                period="This Semester"
            />
            <Card
                title="Total Study Hours"
                value="32 hrs"
                pillText="Up 15%"
                trend="up"
                period="Last Week"
            />
            <Card
                title="Assignments Completed"
                value="12"
                pillText="2 Pending"
                trend="down"
                period="Current Courses"
            />
        </>
    );
};

const Card = ({
    title,
    value,
    pillText,
    trend,
    period,
}: {
    title: string;
    value: string;
    pillText: string;
    trend: "up" | "down";
    period: string;
}) => {
    return (
        <div className="col-span-4 p-4 rounded border border-stone-300 dark:border-white/15">
            <div className="flex mb-8 items-start justify-between">
                <div>
                    <h3 className="text-stone-500 dark:text-[#AEB9E1] mb-2 text-sm">{title}</h3>
                    <p className="text-3xl font-semibold">{value}</p>
                </div>
                <span
                    className={`text-xs flex items-center gap-1 font-medium px-2 py-1 rounded ${trend === "up"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                        }`}
                >
                    {trend === "up" ? <FiTrendingUp /> : <FiTrendingDown />} {pillText}
                </span>
            </div>
            <p className="text-xs text-stone-500 dark:text-[#AEB9E1]">{period}</p>
        </div>
    );
};
