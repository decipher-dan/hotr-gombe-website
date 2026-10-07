import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
    const [events, setEvents] = useState([]);
    const [sermons, setSermons] = useState([]);

    useEffect(() => {
        const fetchPreview = async () => {
            try {
                const [eventsRes, sermonsRes] = await Promise.all([
                    fetch(`${import.meta.env.VITE_API_URL}/events`),
                    fetch(`${import.meta.env.VITE_API_URL}/sermon`),
                ]);

                if (eventsRes.ok) {
                    const data = await eventsRes.json();
                    setEvents(data.result.slice(0, 3));
                }

                if (sermonsRes.ok) {
                    const data = await sermonsRes.json();
                    setSermons(data.result.slice(0, 2));
                }
            } catch (err) {
                console.error("homepage preview fetch failed:", err);
            }
        };

        fetchPreview();
    }, []);

    return (
        <div className="w-full">
            {/* Hero */}
            <section className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 bg-gray-900 text-white">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    House of the Redeemer, Gombe
                </h1>
                <p className="text-lg md:text-xl text-gray-300 max-w-xl mb-8">
                    A place to encounter God, grow in faith, and find community.
                </p>
                <div className="flex gap-4">
                    <Link
                        to="/first-timer"
                        className="bg-white text-gray-900 px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition"
                    >
                        Plan Your Visit
                    </Link>
                    <Link
                        to="/sermons"
                        className="border border-white px-6 py-3 rounded-full font-medium hover:bg-white hover:text-gray-900 transition"
                    >
                        Watch Latest Sermon
                    </Link>
                </div>
            </section>

            {/* About teaser */}
            <section className="py-20 px-6 max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-semibold mb-4">Who We Are</h2>
                <p className="text-gray-600 mb-6">
                    We are a Christ-centered community committed to worship, discipleship,
                    and reaching our city with the gospel. Whether you're exploring faith
                    for the first time or looking for a church home, we'd love to have you.
                </p>
                <Link to="/about" className="text-blue-600 font-medium hover:underline">
                    Learn more about us →
                </Link>
            </section>

            {/* Upcoming events preview */}
            <section className="py-20 px-6 bg-gray-50">
                <h2 className="text-3xl font-semibold text-center mb-10">Upcoming Events</h2>
                <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {events.map((event) => (
                        <div key={event.id} className="bg-white rounded-xl shadow p-6">
                            <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                            <p className="text-gray-500 text-sm mb-2">{event.venue}</p>
                            <p className="text-gray-600 text-sm">{event.description}</p>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-10">
                    <Link to="/events" className="text-blue-600 font-medium hover:underline">
                        View all events →
                    </Link>
                </div>
            </section>

            {/* Latest sermons preview */}
            <section className="py-20 px-6 max-w-5xl mx-auto">
                <h2 className="text-3xl font-semibold text-center mb-10">Latest Sermons</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    {sermons.map((sermon) => (
                        <div key={sermon.id} className="bg-white rounded-xl shadow p-6">
                            <h3 className="text-xl font-semibold mb-1">{sermon.title}</h3>
                            <p className="text-gray-500 text-sm mb-2">{sermon.preacher}</p>
                            <p className="text-gray-600 text-sm">{sermon.description}</p>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-10">
                    <Link to="/sermons" className="text-blue-600 font-medium hover:underline">
                        View all sermons →
                    </Link>
                </div>
            </section>

            {/* CTA strip */}
            <section className="py-20 px-6 bg-gray-900 text-white text-center">
                <h2 className="text-3xl font-semibold mb-4">Get Involved</h2>
                <p className="text-gray-300 mb-8 max-w-xl mx-auto">
                    Partner with us, book a time with a pastor, or reach out with a prayer request.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <Link to="/partnership" className="bg-white text-gray-900 px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition">
                        Become a Partner
                    </Link>
                    <Link to="/contact" className="border border-white px-6 py-3 rounded-full font-medium hover:bg-white hover:text-gray-900 transition">
                        Book an Appointment
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default HomePage;