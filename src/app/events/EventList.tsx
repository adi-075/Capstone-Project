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
      <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">
        Upcoming Events
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {events.map((event, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
          >
            <div className="relative h-48 w-full">
              {event.image ? (
                <img
                  src={event.image}
                  alt={event.imageAltText || "Event image"}
                  className="object-cover w-full h-full"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full bg-blue-200 flex items-center justify-center">
                  <span className="text-blue-800 font-semibold">UToledo</span>
                </div>
              )}
            </div>

            <div className="p-4 flex flex-col h-full">
              <div className="flex-grow">
                <h3 className="text-xl font-bold text-blue-900 mb-2 line-clamp-2">
                  {event.title}
                </h3>

                <div className="mb-3">
                  {event.date && (
                    <p className="text-sm text-gray-600 flex items-center mb-1">
                      {event.date}
                    </p>
                  )}
                  {event.location && (
                    <p className="text-sm text-gray-600 flex items-center">
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
                  <p className="text-gray-700 mb-4 line-clamp-3">
                    {event.descriptionText}
                  </p>
                )}
              </div>

              <a
                href={event.eventUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="w-full bg-blue-800 hover:bg-blue-900 text-white py-2 px-4 rounded transition-colors duration-300">
                  View Details
                </button>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsList;
