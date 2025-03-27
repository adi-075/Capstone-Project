import React from "react";
import { getFormattedDate } from "@/app/utils/dateFetch";
import { fetchStudents } from "@/app/api/supabase";

interface Student {
    first_name: string;
}

export const TopBar = async () => {
    // Directly use the server-side function and type its return value
    const students = await fetchStudents() as Student[] | null;

    // Format the data similarly to what you'd get from fetchApi
    const studentData = students || [];

    return (
        <div className="border-b px-4 mb-4 mt-2 pb-4 border-stone-200">
            <div className="flex items-center justify-between p-0.5">
                <div>
                    {studentData.length > 0 && (
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