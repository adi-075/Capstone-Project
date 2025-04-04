"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Student } from "@/types/student";

const avatarList = [
  "/avatar/avatar2.png",
  "/avatar/avatar4.png",
  "/avatar/avatar5.png",
  // Add more if needed
];

function getRandomAvatar(current?: string) {
  // Avoid returning the same avatar
  // TODO: Make this more efficient
  let newAvatar: string;
  do {
    newAvatar = avatarList[Math.floor(Math.random() * avatarList.length)];
  } while (newAvatar === current && avatarList.length > 1);
  return newAvatar;
}

export function AccountToggle() {
  const [student, setStudent] = useState<Student | null>(null);
  const [avatar, setAvatar] = useState<string>(getRandomAvatar);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await fetch("/api/students");
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        setStudent(Array.isArray(data) ? data[0] : null);
      } catch (error) {
        console.error("Error fetching students:", error);
        setStudent(null);
      }
    };
    fetchStudent();
  }, []);

  const handleAvatarClick = () => {
    setAvatar((prev) => getRandomAvatar(prev));
  };

  return (
    <div className="border-b mb-4 mt-2 pb-4 border-stone-300">
      <button className="flex p-0.5 hover:bg-stone-200 rounded transition-colors relative gap-2 w-full items-center">
        <div
          className="relative size-8 rounded shrink-0 bg-violet-500 cursor-pointer"
          onClick={handleAvatarClick}
          title="Click to change avatar"
        >
          <Image
            src={avatar}
            alt="avatar"
            fill
            className="rounded object-cover"
          />
        </div>
        <div className="text-start">
          <span className="text-sm font-bold block">
            {student?.first_name || "No Name"}
          </span>
          <span className="text-xs block text-stone-500 break-words">
            {student?.email || "No Email"}
          </span>
        </div>
      </button>
    </div>
  );
}
