import { useState, useEffect } from "react";
import Skeleton from "./Skeleton";

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/events`);

                if (!response.ok) {
                    throw new Error(`Request failed with status ${response.status}`);
                }

                const data = await response.json();
                setEvents(data.result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    if (loading) {
        return (
            <div className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-3 gap-6">
                {[1, 2, 3].map((n) => (
                    <div key={n} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-3">
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-20 w-full" />
                    </div>
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-6xl mx-auto px-6 py-24 text-center text-red-600 font-medium">
                Something went wrong: {error}
            </div>
        );
    }

    return (
        <section className="max-w-6xl mx-auto px-6 py-24">
            {/* Title updated with display font and brand color */}
            <h1 className="text-3xl md:text-4xl font-display font-bold text-hotr-blue text-center mb-12">
                Upcoming Events
            </h1>

            {events.length === 0 ? (
                <p className="text-center text-gray-500 font-medium">No upcoming events right now.</p>
            ) : (
                <div className="grid md:grid-cols-3 gap-6">
                    {events.map((event) => (
                        <div
                            key={event.id}
                            className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-hotr-blue/5 transition-all duration-300 overflow-hidden flex flex-col group"
                        >
                            {event.flyer && (
                                <div className="overflow-hidden bg-hotr-dark/5">
                                    <img
                                        src={event.flyer}
                                        alt={event.title}
                                        className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                            )}
                            <div className="p-6 flex flex-col gap-2 flex-1">
                                {/* Heading matches brand typography coloring */}
                                <h2 className="text-xl font-semibold text-hotr-dark group-hover:text-hotr-blue transition-colors">
                                    {event.title}
                                </h2>
                                
                                {/* Time marker accented using the custom signature brand green subtle styling */}
                                <div className="flex flex-wrap items-center gap-1.5 text-sm font-medium text-hotr-green">
                                    <span>
                                        {new Date(event.start_date).toLocaleDateString("en-GB", {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                        })}
                                    </span>
                                    {event.event_time && (
                                        <>
                                            <span className="text-gray-300">·</span>
                                            <span className="bg-hotr-green/10 text-hotr-dark text-xs px-2 py-0.5 rounded-md font-semibold">
                                                {event.event_time.slice(0, 5)}
                                            </span>
                                        </>
                                    )}
                                </div>

                                <p className="text-sm text-gray-500 flex items-center gap-1">
                                    <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span className="truncate">{event.venue}</span>
                                </p>

                                {event.description && (
                                    <p className="text-sm text-gray-600 mt-2 line-clamp-3 leading-relaxed">
                                        {event.description}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default EventList;
