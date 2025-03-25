"use client";
import React from "react";
import { RadialBarChart, PolarAngleAxis, RadialBar } from 'recharts';

export const GradingGrid = () => {
    return (
        <>
            <Card
                course="ENGT 4050"
                value="90%"
                trend="up"
                period="This Semester"
            />
            <Card
                course="CSET 4750"
                value="100%"
                trend="up"
                period="This Semester"
            />
        </>
    );
};

const Card = ({
    course,
    value,
    trend,
    period,
}: {
    course: string;
    value: string;
    trend: "up" | "down";
    period: string;
}) => {
    const data = [
        { name: 'Progress', value: 90, fill: '#003E7E' }
    ];

    return (
        <div className="col-span-3 p-4 rounded border border-stone-300">
            <div className="flex flex-col items-center">
                <h3 className="text-black text-2xl font-bold mb-4">{course}</h3>
                <div className="relative -m-4 flex justify-center items-center">
                    <RadialBarChart
                        width={200}
                        height={200}
                        data={data}
                        innerRadius={100}
                        barSize={5}
                        startAngle={90}
                        endAngle={-270}
                    >
                        <PolarAngleAxis
                            type="number"
                            domain={[0, 100]}
                            angleAxisId={0}
                            tick={false}
                        />
                        <RadialBar
                            background
                            dataKey="value"
                            cornerRadius={40 / 2}
                            fill="#0BEFF2"
                        />
                    </RadialBarChart>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <span className="text-3xl font-bold">{value}</span>
                    </div>
                </div>
                <p className="text-xs text-stone-500 mt-4">{period}</p>
            </div>
        </div>
    );
};
