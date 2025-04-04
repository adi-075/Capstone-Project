import React from "react";
import { usePathname } from "next/navigation";
import { AccountToggle } from "./AccountToggle";
import { Search } from "./Search";
import { RouteSelect } from "./RouteSelect";
import { LogoutButton } from "./LogoutButton";
// import { Plan } from "./Plan";

export const Sidebar = () => {
  const pathname = usePathname();

  // Do not render the sidebar on the login route
  if (pathname === "/login" || pathname === "/logout") {
    return null;
  }

  return (
    <div>
      <div className="sticky top-4 h-[calc(100vh-32px-48px)]">
        <AccountToggle />
        <Search />
        <RouteSelect />
        <LogoutButton />
      </div>

      {/* <Plan /> */}
    </div>
  );
};