"use client";

import React, { useEffect, useState } from "react";
import Image from 'next/image';

interface Event {
  title: string;
  date: string;
  location: string;
  descriptionText: string;
  image: string;
  imageAltText: string;
  eventUrl: string;
  tags: string[];
  start: string; // Add start date for sorting
  id: string;
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
  const [isLoading, setIsLoading] = useState(true);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [page, setPage] = useState(1);
  const eventsPerPage = 9; // Show 9 events per page (3x3 grid)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Ensure skeleton shows for at least 1 second
        const startTime = Date.now();
        
        // Get the ID from the URL
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        
        // Construct the API URL with the ID parameter if it exists
        const apiUrl = id ? `/api/events?id=${id}` : '/api/events';
        
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Filter and sort events
        const filtered = data
          .filter((event: Event) =>
            event.tags?.some((tag) => allowedTags.includes(tag))
          )
          .sort((a: Event, b: Event) => 
            new Date(a.start).getTime() - new Date(b.start).getTime()
          );

        // Calculate remaining time to ensure 1 second minimum
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, 1000 - elapsedTime);
        
        // Wait for remaining time if needed
        if (remainingTime > 0) {
          await new Promise(resolve => setTimeout(resolve, remainingTime));
        }

        setEvents(filtered);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setIsLoading(false);
        // Add a small delay before hiding skeleton to ensure smooth transition
        setTimeout(() => setShowSkeleton(false), 200);
      }
    };

    fetchEvents();
  }, []);

  // Calculate pagination
  const totalPages = Math.ceil(events.length / eventsPerPage);
  const currentEvents = events.slice(
    (page - 1) * eventsPerPage,
    page * eventsPerPage
  );

  if (isLoading || showSkeleton) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <div 
              key={i} 
              className="h-96 bg-stone-200/50 dark:bg-[#0B1739]/50 rounded-xl overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-stone-200/50 to-stone-300/50 dark:from-[#0B1739]/50 dark:to-[#0F1F4A]/50 animate-pulse" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="h-6 w-3/4 bg-stone-300/50 dark:bg-[#0F1F4A]/50 rounded mb-2 animate-pulse" />
                <div className="h-4 w-1/2 bg-stone-300/50 dark:bg-[#0F1F4A]/50 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-stone-950 dark:text-white/80 mb-8 text-center">
        Upcoming Events
      </h2>

      {events.length === 0 ? (
        <div className="text-center text-stone-500 dark:text-[#AEB9E1]">
          <p className="text-lg">No upcoming events found.</p>
          <p className="text-sm mt-2">Check back later for new events!</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentEvents.map((event, index) => (
              <div
                key={index}
                className="relative h-96 rounded-xl overflow-hidden shadow-xl group"
              >
                <div className="absolute inset-0">
                  {event.image ? (
                    <Image 
                      src={event.image} 
                      alt={event.imageAltText || "Event image"}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      priority={index < 3}
                    />
                  ) : (
                    <div className="w-full h-full bg-stone-200 dark:bg-[#0B1739] flex items-center justify-center">
                      <span className="text-stone-700 dark:text-[#AEB9E1] font-semibold">UToledo</span>
                    </div>
                  )}
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>

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
                      href={`https://www.utoledo.edu/events/university-events/#event-details/${event.id}`}
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

          {totalPages > 1 && (
            <div className="flex justify-center mt-8 gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 rounded-md bg-stone-200 dark:bg-[#0F1F4A] text-stone-700 dark:text-[#AEB9E1] disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-4 py-2 text-stone-700 dark:text-[#AEB9E1]">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 rounded-md bg-stone-200 dark:bg-[#0F1F4A] text-stone-700 dark:text-[#AEB9E1] disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EventsList;
