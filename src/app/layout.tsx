"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/nav/Nav";
import { FaBars } from "react-icons/fa";
import "./globals.css";

// Mapping paths to page titles
const pageTitles: { [key: string]: string } = {
  "/": "Home",
  "/dashboard": "Dashboard",
  "/courses": "Courses",
  "/notes": "Study Notes",
  "/events": "Events",
  "/resources": "Resources",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const pageTitle = pageTitles[pathname] || "Page";

  return (
    <html lang="en">
      <head />
      <body className="antialiased">
        {/* Sidebar */}
        <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />

        {/* Wrapper with sidebar offset on md+ screens */}
        <div className="md:ml-[250px]">
          {/* FIXED TOP BAR */}
          <div className="fixed top-0 left-0 w-full md:ml-[250px] h-16 bg-[#003E7E] flex items-center px-4 shadow-md z-0">
            {/* Hamburger button (only on mobile) */}
            <div className="md:hidden mr-4">
              <button onClick={() => setIsOpen(true)}>
                <FaBars size={20} className="text-white" />
              </button>
            </div>
            {/* Dynamic Page Title */}
            <h1 className="text-2xl text-white">{pageTitle}</h1>
          </div>

          {/* MAIN CONTENT - with margin to avoid hiding under fixed bar */}
          <main className="min-h-screen mt-16">{children}</main>
        </div>
      </body>
    </html>
  );
}
