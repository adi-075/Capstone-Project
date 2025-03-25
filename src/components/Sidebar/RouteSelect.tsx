"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons";
import { fetchApi } from "@/app/utils/api";
import {
    FiPlus,
    FiHome,
    FiUser,
    FiPaperclip,
    FiBookOpen,
} from "react-icons/fi";

interface Student {
    // add student fields as needed
    id: string;
    first_name: string;
}

export const RouteSelect = () => {
    // Use the current route
    const pathname = usePathname();

    const routes = [
        { Icon: FiHome, title: "Dashboard", url: "/" },
        { Icon: FiBookOpen, title: "Courses", url: "/courses" },
        { Icon: FiUser, title: "Events", url: "/events" },
        { Icon: FiPaperclip, title: "Study Notes", url: "/notes" },
        { Icon: FiPlus, title: "Resources", url: "/resources" },
    ];

    const [studentData, setStudentData] = useState<Student[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchApi<Student[]>('/api/students');
                setStudentData(data);
            } catch (error) {
                setError(error instanceof Error ? error.message : 'An unknown error occurred');
            }
        };

        fetchData();
    }, []);

    if (error) return <div>Error loading data</div>;
    if (!studentData) return <div>Loading...</div>;

    return (
        <div className="space-y-1">
            {routes.map(({ Icon, title, url }) => (
                <Route key={url} Icon={Icon} title={title} url={url} selected={pathname === url} />
            ))}
        </div>
    );
};

const Route = ({
    selected,
    Icon,
    title,
    url,
}: {
    selected: boolean;
    Icon: IconType;
    title: string;
    url: string;
}) => {
    return (
        <Link href={url} className="block">
            <button
                className={`flex items-center justify-start cursor-pointer gap-2 w-full rounded px-2 py-1.5 text-sm transition-[box-shadow,_background-color,_color] ${selected
                    ? "bg-white text-stone-950 shadow"
                    : "hover:bg-stone-200 bg-transparent text-stone-500 shadow-none"
                    }`}
            >

                <Icon className={selected ? "text-violet-500" : ""} />
                <span>{title}</span>
            </button>
        </Link>
    );
};