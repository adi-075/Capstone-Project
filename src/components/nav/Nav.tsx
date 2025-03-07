// /components/nav/Nav.tsx
"use client";

import { FC } from "react";
import Link from "next/link";
import { MdOutlineFlagCircle, MdMenuBook } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";

interface NavProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Navbar: FC<NavProps> = ({ isOpen, setIsOpen }) => {
  return (
    <div
      className={`
        fixed top-0 left-0 h-screen w-[250px] bg-white
        shadow-md shadow-gray-500/50
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 z-10
        // No transitions => instant open/close
      `}
    >
      {/* MOBILE CLOSE BUTTON */}
      <div className="flex items-center justify-between p-4 bg-[#4F2A80] md:hidden">
        <span className="text-white font-bold text-base">Rocket Dashboard</span>
        <button onClick={() => setIsOpen(false)}>
          <AiOutlineClose size={20} color="#FFF" />
        </button>
      </div>

      {/* Logo (desktop only) */}
      <div className="hidden md:block p-4 text-xl text-black font-bold">
        <Link href="/">Rocket Dashboard</Link>
      </div>

      {/* Nav links */}
      <nav className="p-4">
        <ul className="list-none m-0 p-0 font-bold space-y-5">
          <li>
            <Link
              href="/dashboard"
              className="flex items-center hover:text-purple-800 text-black"
            >
              <MdOutlineFlagCircle className="text-2xl mr-3" />
              <span>DASHBOARD</span>
            </Link>
          </li>
          <li>
            <Link
              href="/courses"
              className="flex items-center hover:text-purple-800 text-black"
            >
              <MdMenuBook className="text-2xl mr-3" />
              <span>COURSES</span>
            </Link>
          </li>
          <li>
            <Link
              href="/notes"
              className="flex items-center hover:text-purple-800 text-black"
            >
              <span>Study Notes</span>
            </Link>
          </li>
          <li>
            <Link
              href="/events"
              className="flex items-center hover:text-purple-800 text-black"
            >
              <span>Events</span>
            </Link>
          </li>
          <li>
            <Link
              href="/resources"
              className="flex items-center hover:text-purple-800 text-black"
            >
              <span>Resources</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
