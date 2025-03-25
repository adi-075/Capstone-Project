import React from 'react';

const EventsGrid = () => {
    // Static event data
    const events = [
        {
            title: "Spend Summer at UToledo",
            date: "February 12, 2025 – May 12, 2025",
            location: "University of Toledo",
            description: "Join us for summer courses and programs at the University of Toledo. Advance your education during the summer months with a variety of course offerings.",
            imageUrl: "/1.jpg",
            eventUrl: "/events/summer-at-utoledo"
        },
        {
            title: "2025 Juried Student Exhibition",
            date: "February 27, 2025 – March 23, 2025",
            location: "Center for Visual Arts",
            description: "An exhibition showcasing outstanding artwork from UToledo students across various disciplines, selected by a panel of professional jurors.",
            imageUrl: "/2.jpg",
            eventUrl: "/events/student-exhibition-2025"
        },
        {
            title: "RocketHacks hackathon",
            date: "March 8, 2025 – March 16, 2025",
            location: "College of Engineering",
            description: "A week-long hackathon where students collaborate to create innovative solutions to real-world problems. Open to all skill levels.",
            imageUrl: "/rockethacks.png",
            eventUrl: "/events/rockethacks-2025"
        },
        {
            title: "Saturday Morning Science",
            date: "March 15, 2025 at 10:00 AM",
            location: "Wolfe Hall Auditorium",
            description: "Join us for an engaging science lecture series designed for the general public. This month features discussions on recent advances in renewable energy.",
            imageUrl: "/3.png",
            eventUrl: "/events/saturday-morning-science"
        }
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">Upcoming Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {events.map((event, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                        {/* Event Image or Fallback */}
                        <div className="relative h-48 w-full">
                            {event.imageUrl ? (
                                <div
                                    className="absolute inset-0 bg-cover bg-center"
                                    style={{ backgroundImage: `url(${event.imageUrl})` }}
                                />
                            ) : (
                                <div className="w-full h-full bg-blue-200 flex items-center justify-center">
                                    <span className="text-blue-800 font-semibold">UToledo</span>
                                </div>
                            )}
                        </div>

                        {/* Event Details */}
                        <div className="p-4">
                            <h3 className="text-xl font-bold text-blue-900 mb-2 line-clamp-2">{event.title}</h3>

                            <div className="mb-3">
                                {event.date && (
                                    <p className="text-sm text-gray-600 flex items-center mb-1">
                                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
                                        </svg>
                                        {event.date}
                                    </p>
                                )}

                                {event.location && (
                                    <p className="text-sm text-gray-600 flex items-center">
                                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                                        </svg>
                                        {event.location}
                                    </p>
                                )}
                            </div>

                            {event.description && (
                                <p className="text-gray-700 mb-4 line-clamp-3">{event.description}</p>
                            )}

                            <a href={event.eventUrl} target="_blank" rel="noopener noreferrer">
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

export default EventsGrid;