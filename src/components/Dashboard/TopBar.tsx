import React from "react";
import { getFormattedDate } from "@/app/utils/dateFetch";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export const TopBar = async () => {
    console.log('Client Debug:')
    console.log('API Key exists:', !!API_KEY)
    console.log('API Key length:', API_KEY?.length || 0)

    const response = await fetch(`${BASE_URL}/api/students`, {
        headers: {
            'x-api-key': API_KEY || ''
        }
    })
    const studentData = await response.json()

    if (!response.ok) {
        console.error('Failed to fetch student data:', studentData)
        return <div>Failed to load student data</div>
    }

    return (
        <div className="border-b px-4 mb-4 mt-2 pb-4 border-stone-200">
            <div className="flex items-center justify-between p-0.5">
                <div>
                    {/* <span className="text-2xl font-bold block">🚀 Good day, Aditya!</span> */}
                    {studentData && !('error' in studentData) && studentData.length > 0 && (
                        <span className="text-2xl font-bold block">
                            🚀 Good day, {studentData[0].first_name}!
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
};