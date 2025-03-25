import React from "react";
import { getFormattedDate } from "@/app/utils/dateFetch";
import { fetchApi } from "@/app/utils/api";

interface Student {
    first_name: string;
    // add other student fields as needed
}

export const TopBar = async () => {
    const studentData = await fetchApi<Student[]>('/api/students');

    return (
        <div className="border-b px-4 mb-4 mt-2 pb-4 border-stone-200">
            <div className="flex items-center justify-between p-0.5">
                <div>
                    {studentData && studentData.length > 0 && (
                        <span className="text-2xl font-bold block">
                            🚀 Good Day, {studentData[0].first_name}!
                        </span>
                    )}
                    <span className="text-lg block text-stone-500">
                        {getFormattedDate()}
                    </span>
                </div>
            </div>
        </div>
    );
};