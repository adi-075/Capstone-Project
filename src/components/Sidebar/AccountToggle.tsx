"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Student } from "@/types/student";

const avatars = [
  "/avatar/avatar3.bmp"  
];

export function AccountToggle() {
  const [student, setStudent] = useState<Student | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/students");
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        setStudent(Array.isArray(data) ? data[0] : null);
      } catch (error) {
        console.error("Error fetching students:", error);
        setStudent(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStudent();
  }, []);

  return (
    <div className="border-b mb-4 mt-2 pb-4 border-stone-300 dark:border-white/30 dark:text-white">
      <button className="flex p-0.5 hover:bg-stone-200 dark:hover:bg-[#0a1947] rounded transition-colors relative gap-2 w-full items-center">
        <div
          className="relative size-8 rounded shrink-0 bg-violet-500 cursor-pointer"
          title="Click to change avatar"
        >
          <Image
            src={avatars[0]}
            alt="avatar"
            fill
            className="rounded object-cover"
            priority
          />
        </div>
        <div className="text-start">
          {isLoading ? (
            <>
              <div className="h-4 w-20 bg-stone-200 rounded animate-pulse mb-1" />
              <div className="h-3 w-24 bg-stone-200 rounded animate-pulse" />
            </>
          ) : (
            <>
              <span className="text-sm font-bold block">
                {student?.first_name || "No Name"}
              </span>
              <span className="text-xs block text-stone-500 dark:text-stone-100/70 break-words">
                {student?.email || "No Email"}
              </span>
            </>
          )}
        </div>
      </button>
    </div>
  );
}
