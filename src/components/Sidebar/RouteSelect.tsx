"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons";
import {
    FiPlus,
    FiHome,
    FiUser,
    FiPaperclip,
    FiBookOpen,
} from "react-icons/fi";
import { LogoutButton } from "./LogoutButton";

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

    return (
        <div className="space-y-1">
            {routes.map(({ Icon, title, url }) => (
                <Route key={url} Icon={Icon} title={title} url={url} selected={pathname === url} />
            ))}
            <LogoutButton />
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
                    ? "bg-white dark:bg-[#0B1739] dark:text-white dark:border-l-3 dark:border-violet-500 text-stone-950 shadow"
                    : "hover:bg-stone-200 dark:hover:bg-[#0B1739] bg-transparent text-stone-500 dark:text-stone-100/80 shadow-none"
                    }`}

            
            >
                                    
                <Icon className={selected ? "text-violet-500" : ""} />
                <span>{title}</span>
            </button>
        </Link>
    );
};