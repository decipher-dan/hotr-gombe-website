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
                    <div key={n} className="bg-white rounded-2xl shadow p-6 space-y-3">
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
            <div className="max-w-6xl mx-auto px-6 py-24 text-center text-red-600">
                Something went wrong: {error}
            </div>
        );
    }

    return (
        <section className="max-w-6xl mx-auto px-6 py-24">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
                Events
            </h1>

            {events.length === 0 ? (
                <p className="text-center text-gray-500">No upcoming events right now.</p>
            ) : (
                <div className="grid md:grid-cols-3 gap-6">
                    {events.map((event) => (
                        <div
                            key={event.id}
                            className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col"
                        >
                            {event.flyer && (
                                <img
                                    src={event.flyer}
                                    alt={event.title}
                                    className="w-full h-44 object-cover"
                                />
                            )}
                            <div className="p-6 flex flex-col gap-2 flex-1">
                                <h2 className="text-xl font-semibold text-gray-900">
                                    {event.title}
                                </h2>
                                <p className="text-sm text-gray-500">
                                    {new Date(event.start_date).toLocaleDateString("en-GB", {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    })}
                                    {event.event_time && ` · ${event.event_time.slice(0, 5)}`}
                                </p>
                                <p className="text-sm text-gray-500">{event.venue}</p>
                                {event.description && (
                                    <p className="text-sm text-gray-600 mt-2 line-clamp-3">
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