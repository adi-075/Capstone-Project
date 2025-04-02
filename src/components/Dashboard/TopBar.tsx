import React from "react";
import { getFormattedDate } from "@/app/utils/dateFetch";
import { getStudents } from "@/lib/getStudents";

export const TopBar = async () => {
    const students = await getStudents();

    return (
        <div className="border-b px-4 mb-4 mt-2 pb-4 border-stone-200">
            <div className="flex items-center justify-between p-0.5">
                <div>
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
                </div>
            </div>
        </div>
    );
};