import React from "react";
import { getStudents } from "@/lib/getStudents";
import { getFormattedDate } from "@/app/utils/dateFetch";

export const TopBar = async () => {
    const students = await getStudents();

    return (
        <div className="border-b px-4 mb-4 mt-2 pb-4 border-stone-200/50 dark:border-white/10">
            <div className="flex items-center justify-between p-0.5">
                <div>
                    {students && students[0] ? (
                        <span className="text-2xl font-bold block text-stone-950 dark:text-white/80">
                            🚀 Hello, {students[0].first_name}! 
                        </span>
                    ) : (
                        <span className="text-2xl font-bold block text-stone-950 dark:text-white/80">
                            🚀 Welcome!
                        </span>
                    )}
                    <span className="text-lg block text-stone-500 dark:text-[#AEB9E1]">
                        {getFormattedDate()}
                    </span>
                </div>
            </div>
        </div>
    );
};