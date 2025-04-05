"use client";

import React, { useEffect, useState } from "react";

interface Event {
  title: string;
  date: string;
  location: string;
  descriptionText: string;
  image: string;
  imageAltText: string;
  eventUrl: string;
  tags: string[];
}

const allowedTags = [
  "academic",
  "Academics",
  "accessibility",
  "admissions",
  "alumni",
  "event",
  "events",
  "holiday",
  "home",
  "institute",
  "Lecture",
  "lectures",
  "mathematics",
  "networking",
  "research",
  "Student activities",
  "students",
  "tech",
];

const EventsList = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events");
        const data = await response.json();

        const filtered = data.filter((event: Event) =>
          event.tags?.some((tag) => allowedTags.includes(tag)),
        );

        setEvents(filtered);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-stone-950 dark:text-white/80 mb-8 text-center">
        Upcoming Events
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event, index) => (
          <div
            key={index}
            className="relative h-96 rounded-xl overflow-hidden shadow-xl group"
          >
            <div className="absolute inset-0">
              {event.image ? (
                <img
                  src={event.image}
                  alt={event.imageAltText || "Event image"}
                  className="object-cover w-full h-full"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full bg-stone-200 dark:bg-[#0B1739] flex items-center justify-center">
                  <span className="text-stone-700 dark:text-[#AEB9E1] font-semibold">UToledo</span>
                </div>
              )}
            </div>

            <div className="absolute inset-0 bg-black/30"></div>

            <div className="absolute bottom-0 left-0 right-0">
              <div className="bg-white/50 dark:bg-[#101935]/50 backdrop-blur-md backdrop-saturate-150 p-4 m-3 rounded-lg shadow-sm border border-stone-300/50 dark:border-white/10">
                <h3 className="text-stone-900 dark:text-[#AEB9E1] text-lg font-medium mb-2 line-clamp-2">
                  {event.title}
                </h3>

                <div className="mb-3">
                  {event.date && (
                    <p className="text-sm text-stone-800 dark:text-[#AEB9E1] flex items-center mb-1">
                      {event.date}
                    </p>
                  )}
                  {event.location && (
                    <p className="text-sm text-stone-800 dark:text-[#AEB9E1] flex items-center">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      {event.location}
                    </p>
                  )}
                </div>

                {event.descriptionText && (
                  <p className="text-stone-800 dark:text-white/80 mb-4 line-clamp-3">
                    {event.descriptionText}
                  </p>
                )}

                <a
                  href={event.eventUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <button className="w-full bg-violet-500 hover:bg-violet-600 text-white py-2 px-4 rounded transition-colors duration-300">
                    View Details
                  </button>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsList;
