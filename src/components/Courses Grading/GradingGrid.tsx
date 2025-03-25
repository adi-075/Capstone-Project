"use client";
import React from "react";
import { RadialBarChart, PolarAngleAxis, RadialBar } from 'recharts';

export const GradingGrid = () => {
    return (
        <>
            <Card
                course="ENGT 4050"
                value="A"
            />
            <Card
                course="CSET 4750"
                value="B"
            />
        </>
    );
};

const Card = ({
    course,
    value,
}: {
    course: string;
    value: string;
}) => {
    // Convert letter grade to percentage
    const getPercentage = (grade: string): number => {
        switch (grade) {
            case 'A+': return 100;
            case 'A': return 95;
            case 'A-': return 90;
            case 'B+': return 87;
            case 'B': return 83;
            case 'B-': return 80;
            case 'C+': return 77;
            case 'C': return 73;
            case 'C-': return 70;
            case 'D+': return 67;
            case 'D': return 63;
            case 'D-': return 60;
            case 'F': return 50;
            default: return 0;
        }
    };

    const percentage = getPercentage(value);

    const data = [
        { name: 'Progress', value: percentage, fill: '#7DD3FB' }
    ];

    return (
        <div className="col-span-3 p-4 rounded border border-stone-300">
            <div className="flex flex-col items-center pb-5">
                <h3 className="text-black mb-4 text-xl font-bold">{course}</h3>
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
                            fill="#003E7E"
                        />
                    </RadialBarChart>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="flex flex-col items-center">
                            <p className="text-center text-md">Progress</p>
                            <span className="text-xl font-bold">{percentage}%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
