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
        metric: "Math",
        current: 85,
        target: 90,
        fullMark: 100,
    },
    {
        metric: "Science",
        current: 78,
        target: 85,
        fullMark: 100,
    },
    {
        metric: "English",
        current: 92,
        target: 88,
        fullMark: 100,
    },
    {
        metric: "History",
        current: 80,
        target: 82,
        fullMark: 100,
    },
    {
        metric: "Art",
        current: 88,
        target: 85,
        fullMark: 100,
    },
];

export default function PerformanceRadar() {
    return (
        <div className="col-span-4 overflow-hidden rounded border border-stone-300/50 dark:border-white/10 bg-white/50 dark:bg-[#101935]/50 backdrop-blur-md backdrop-saturate-150 shadow-lg shadow-black/5 dark:shadow-[#000000]/20">
            <div className="p-4 border-b border-stone-200/50 dark:border-white/10">
                <h3 className="flex items-center gap-1.5 font-medium text-stone-950 dark:text-white/80">
                    <FiTrendingUp className="text-violet-500" /> Performance
                </h3>
            </div>

            <div className="h-64 px-4 py-2">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                        <PolarGrid stroke="#E5E7EB/50" />
                        <PolarAngleAxis dataKey="metric" stroke="#6B7280" tick={{ fill: '#6B7280', fontSize: 12 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#6B7280" tick={{ fill: '#6B7280', fontSize: 12 }} />
                        <Radar
                            name="Current"
                            dataKey="current"
                            stroke="#8B5CF6"
                            fill="#8B5CF6"
                            fillOpacity={0.15}
                        />
                        <Radar
                            name="Target"
                            dataKey="target"
                            stroke="#AEB9E1"
                            fill="#AEB9E1"
                            fillOpacity={0.15}
                        />
                        <Legend />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
