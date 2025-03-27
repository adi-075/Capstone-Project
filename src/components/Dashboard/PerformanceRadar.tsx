"use client";

import React from "react";
import { FiTrendingUp } from "react-icons/fi";
import {
    Radar,
    RadarChart,
    PolarGrid,
    Legend,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
} from "recharts";

const data = [
    {
        metric: "Exam Scores",
        current: 85,
        target: 90,
        fullMark: 100,
    },
    {
        metric: "Assignments",
        current: 75,
        target: 80,
        fullMark: 100,
    },
    {
        metric: "Participation",
        current: 95,
        target: 100,
        fullMark: 100,
    },
    {
        metric: "Attendance",
        current: 90,
        target: 95,
        fullMark: 100,
    },
    {
        metric: "Project Work",
        current: 80,
        target: 85,
        fullMark: 100,
    },
    {
        metric: "Extra-curricular",
        current: 70,
        target: 80,
        fullMark: 100,
    },
];

export default function PerformanceRadar() {
    return (
        <div className="col-span-4 overflow-hidden rounded border border-stone-300">
            <div className="p-4">
                <h3 className="flex items-center gap-1.5 font-medium">
                    <FiTrendingUp /> Performance
                </h3>
            </div>

            <div className="h-64 px-4">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="metric" />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} />
                        <Radar
                            name="Current"
                            dataKey="current"
                            stroke="#8884d8"
                            fill="#8884d8"
                            fillOpacity={0.6}
                        />
                        <Radar
                            name="Target"
                            dataKey="target"
                            stroke="#82ca9d"
                            fill="#82ca9d"
                            fillOpacity={0.6}
                        />
                        <Legend />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
