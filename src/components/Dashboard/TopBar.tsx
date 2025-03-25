import React from "react";
import { getFormattedDate } from "@/app/utils/dateFetch";
import { fetchApi } from "@/app/utils/api";

interface Student {
    first_name: string;
    // add other student fields as needed
}

export const TopBar = async () => {
    try {
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
                        {(!studentData || studentData.length === 0) && (
                            <span className="text-2xl font-bold block">
                                🚀 Welcome to your dashboard!
                            </span>
                        )}
                        <span className="text-lg block text-stone-500">
                            {getFormattedDate()}
                        </span>
                    </div>

                    {/* <button className="flex text-sm items-center gap-2 bg-stone-100 transition-colors hover:bg-violet-100 hover:text-violet-700 px-3 py-1.5 rounded">
                        <FiCalendar />
                        <span>Prev 6 Months</span>
                    </button> */}
                </div>
            </div>
        );
    } catch (error) {
        console.error('Failed to fetch student data:', error);
        // Return a fallback UI instead of an error
        return (
            <div className="border-b px-4 mb-4 mt-2 pb-4 border-stone-200">
                <div className="flex items-center justify-between p-0.5">
                    <div>
                        <span className="text-2xl font-bold block">
                            🚀 Welcome to your dashboard!
                        </span>
                        <span className="text-lg block text-stone-500">
                            {getFormattedDate()}
                        </span>
                    </div>
                </div>
            </div>
        );
    }
};