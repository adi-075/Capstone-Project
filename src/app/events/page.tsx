export const dynamic = "force-dynamic";

import React from "react";
import { TopBar } from "@/components/Dashboard/TopBar";
import EventList from "@/app/events/EventList";

export default function Events() {
  return (
    <div className="bg-white/50 dark:bg-[#101935]/50 backdrop-blur-md backdrop-saturate-150 rounded-lg shadow p-2 border border-stone-300/50 dark:border-white/10">
      <TopBar />
      <EventList />
    </div>
  );
}
