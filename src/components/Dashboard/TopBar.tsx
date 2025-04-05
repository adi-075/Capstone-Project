import React from "react";
import { getFormattedDate } from "@/app/utils/dateFetch";
import { getStudents } from "@/lib/getStudents";
import { TopBarClient } from "./TopBarClient";

export const TopBar = async () => {
    const students = await getStudents();

    return <TopBarClient students={students} />;
};