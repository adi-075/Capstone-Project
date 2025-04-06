import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Link from "next/link";
import LogoutButton from "@/app/logout/page";
// import { FiEye, FiLink, FiLogOut, FiPhone, FiPlus } from "react-icons/fi";
// NOTE: Fixing buildtime errors
// import { FiEye, FiLink, FiPhone, FiPlus } from "react-icons/fi";
import { FiEye, FiLink, FiPlus } from "react-icons/fi";

export const CommandMenu = ({
    open,
    setOpen,
}: {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
    const [value, setValue] = useState("");
    // Toggle the menu when ⌘K is pressed
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, [setOpen]);
    const router = useRouter();

    return (
        <Command.Dialog
            open={open}
            onOpenChange={setOpen}
            label="Global Command Menu"
            className="fixed inset-0 bg-stone-950/50"
            onClick={() => setOpen(false)}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-[#101935] rounded-lg shadow-xl border border-stone-300/50 dark:border-white/10 overflow-hidden w-full max-w-lg mx-auto mt-12"
            >
                <Command.Input
                    value={value}
                    onValueChange={setValue}
                    placeholder="What do you need?"
                    className="relative border-b border-stone-300/50 dark:border-white/10 p-3 text-lg w-full placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none bg-transparent text-stone-950 dark:text-white/80"
                />
                <Command.List className="p-3">
                    <Command.Empty className="text-stone-600 dark:text-stone-400">
                        No results found for{" "}
                        <span className="text-violet-500">&quot;{value}&quot;</span>
                    </Command.Empty>

                    <Command.Group heading="Dashboard" className="text-sm mb-3 text-stone-400 dark:text-stone-500">
                        <Command.Item
                            className="flex cursor-pointer transition-colors p-2 text-sm text-stone-950 dark:text-white/80 hover:bg-stone-200 dark:hover:bg-white/10 rounded items-center gap-2"
                            onSelect={() => {
                                setOpen(false); // Close the command menu

                                if (window.location.pathname !== "/") {
                                    router.push("/#activity");
                                } else {
                                    const activitySection = document.getElementById("activity");
                                    if (activitySection) {
                                        activitySection.scrollIntoView({ behavior: "smooth" });
                                    }
                                }
                            }}
                        >
                            <FiPlus />
                            Activity Chart
                        </Command.Item>
                        <Command.Item className="flex cursor-pointer transition-colors p-2 text-sm text-stone-950 dark:text-white/80 hover:bg-stone-200 dark:hover:bg-white/10 rounded items-center gap-2">
                            <FiEye />
                            Usage Chart
                        </Command.Item>
                    </Command.Group>

                    <Command.Group
                        heading="Courses"
                        className="text-sm text-stone-400 dark:text-stone-500 mb-3"
                    >
                        <Link href="/courses" prefetch={true}>
                            <Command.Item className="flex cursor-pointer transition-colors p-2 text-sm text-stone-950 dark:text-white/80 hover:bg-stone-200 dark:hover:bg-white/10 rounded items-center gap-2">
                                <FiLink />
                                Courses
                            </Command.Item>
                        </Link>
                    </Command.Group>

                    <Command.Group
                        heading="Events"
                        className="text-sm text-stone-400 dark:text-stone-500 mb-3"
                    >
                        <Link href="/events" prefetch={true}>
                            <Command.Item className="flex cursor-pointer transition-colors p-2 text-sm text-stone-950 dark:text-white/80 hover:bg-stone-200 dark:hover:bg-white/10 rounded items-center gap-2">
                                <FiLink />
                                Events Page
                            </Command.Item>
                        </Link>
                    </Command.Group>
                    <Command.Group
                        heading="Sign Out"
                        className="text-sm text-stone-400 dark:text-stone-500 mb-3"
                    >
                        <LogoutButton />
                    </Command.Group>

                    {/* <Command.Item className="flex cursor-pointer transition-colors p-2 text-sm text-stone-50 hover:bg-stone-700 bg-stone-950 rounded items-center gap-2">
                        <FiLogOut />
                        Sign Out
                    </Command.Item> */}
                </Command.List>
            </div>
        </Command.Dialog>
    );
};