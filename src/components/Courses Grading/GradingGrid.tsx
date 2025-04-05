"use client";
import React from "react";
import { FiBook, FiAward } from "react-icons/fi";

export const GradingGrid = () => {
    return (
        <div className="flex flex-wrap gap-5">
            <GradeCard
                course="ENGT 4050"
                value="A"
                progress={95}
                assignments={12}
                completed={10}
                nextExam="May 15"
            />
            <GradeCard
                course="CSET 4750"
                value="B"
                progress={83}
                assignments={8}
                completed={6}
                nextExam="May 20"
            />
        </div>
    );
};

const GradeCard = ({
    course,
    value,
    progress,
    assignments,
    completed,
    nextExam,
}: {
    course: string;
    value: string;
    progress: number;
    assignments: number;
    completed: number;
    nextExam: string;
}) => {
    const getGradeColor = (grade: string) => {
        switch (grade) {
            case 'A': return 'text-green-500';
            case 'B': return 'text-blue-500';
            case 'C': return 'text-yellow-500';
            case 'D': return 'text-orange-500';
            case 'F': return 'text-red-500';
            default: return 'text-gray-500';
        }
    };

    const getProgressColor = (progress: number) => {
        if (progress >= 90) return 'bg-green-500';
        if (progress >= 80) return 'bg-blue-500';
        if (progress >= 70) return 'bg-yellow-500';
        if (progress >= 60) return 'bg-orange-500';
        return 'bg-red-500';
    };

    return (
        <div className="flex-1 min-w-[350px] p-6 rounded border border-stone-300/50 dark:border-white/10 bg-white/50 dark:bg-[#101935]/50 backdrop-blur-md backdrop-saturate-150 shadow-lg shadow-black/5 dark:shadow-[#000000]/20">
            <div className="flex items-start justify-between mb-6">
                <div>
                    <h3 className="text-xl font-semibold text-stone-950 dark:text-white/80">{course}</h3>
                    <div className="flex items-center gap-2 mt-1">
                        <span className={`text-3xl font-bold ${getGradeColor(value)}`}>{value}</span>
                        <span className="text-stone-500 dark:text-[#AEB9E1]">({progress}%)</span>
                    </div>
                </div>
                <div className="p-2 rounded-full bg-stone-100 dark:bg-[#0B1739]">
                    <FiBook className="text-violet-500 text-xl" />
                </div>
            </div>

            <div className="flex flex-col gap-6">
                {/* Progress Bar */}
                <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                        <span className="text-stone-500 dark:text-[#AEB9E1]">Course Progress</span>
                        <span className="text-stone-700 dark:text-white/80">{progress}%</span>
                    </div>
                    <div className="h-2 bg-stone-100 dark:bg-[#0B1739] rounded-full overflow-hidden">
                        <div 
                            className={`h-full ${getProgressColor(progress)} transition-all duration-500`}
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* Assignments Progress */}
                <div className="flex items-center justify-between p-3 bg-stone-50 dark:bg-[#0B1739] rounded-lg">
                    <div className="flex items-center gap-2 min-w-0">
                        <FiAward className="text-violet-500 flex-shrink-0" />
                        <span className="text-stone-700 dark:text-white/80 truncate">Assignments</span>
                    </div>
                    <span className="text-stone-500 dark:text-[#AEB9E1] flex-shrink-0">
                        {completed}/{assignments}
                    </span>
                </div>

                {/* Next Exam */}
                <div className="text-sm text-stone-500 dark:text-[#AEB9E1]">
                    Next exam: <span className="text-stone-700 dark:text-white/80">{nextExam}</span>
                </div>
            </div>
        </div>
    );
};
