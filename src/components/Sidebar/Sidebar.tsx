"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { RocketDash } from "./AccountToggle";
import { Search } from "./Search";
import { RouteSelect } from "./RouteSelect";
// import { Plan } from "./Plan";

export const Sidebar = () => {
  const pathname = usePathname();

  // Do not render the sidebar on the login route
  if (pathname === "/login") {
    return null;
  }

  return (
    <div>
      <div className="sticky top-4 h-[calc(100vh-32px-48px)]">
        <RocketDash />
        <Search />
        <RouteSelect />
      </div>

      {/* <Plan /> */}
    </div>
  );
};