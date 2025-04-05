"use client";

import React, { useEffect, useState } from "react";
import { getFormattedDate } from "@/app/utils/dateFetch";
import { Student } from "@/types/student";

interface TopBarClientProps {
    students: Student[] | null;
}

export function TopBarClient({ students }: TopBarClientProps) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading state for better UX
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="border-b px-4 mb-4 mt-2 pb-4 border-stone-200">
            <div className="flex items-center justify-between p-0.5">
                <div>
                    {isLoading ? (
                        <>
                            <div className="h-8 w-48 bg-stone-200 rounded animate-pulse mb-2" />
                            <div className="h-6 w-32 bg-stone-200 rounded animate-pulse" />
                        </>
                    ) : (
                        <>
                            {students && students[0] ? (
                                <span className="text-2xl font-bold block">
                                    🚀 Hi, {students[0].first_name}!
                                </span>
                            ) : (
                                <span className="text-2xl font-bold block">
                                    🚀 Welcome!
                                </span>
                            )}
                            <span className="text-lg block text-stone-500">
                                {getFormattedDate()}
                            </span>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
} 