import { useEffect, useState } from "react";
import CountdownTimer from "./CountdownTimer";

const UpcomingEventPhone = () => {
    const [nextEvent, setNextEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/events`)
            .then((res) => res.json())
            .then((data) => {
                const events = data.result || [];
                const upcoming = events
                    .filter((e) => new Date(e.start_date) >= new Date().setHours(0, 0, 0, 0))
                    .sort((a, b) => new Date(a.start_date) - new Date(b.start_date));
                setNextEvent(upcoming[0] || null);
            })
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    if (loading || !nextEvent) return null;

    return (
        <section className="py-20 px-6 bg-paper">
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                {/* Phone mockup */}
                <div className="flex justify-center">
                    <div className="relative w-[280px] h-[580px] rounded-[2.5rem] border-[10px] border-ink bg-ink shadow-2xl">
                        {/* Notch */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-5 bg-ink rounded-b-xl z-20" />

                        {/* Screen */}
                        <div className="relative w-full h-full rounded-[1.75rem] overflow-hidden">
                            <img
                                src={nextEvent.flyer}
                                alt={nextEvent.title}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />

                            <div className="absolute bottom-10 left-0 right-0 px-6 text-center">
                                <p className="text-paper/70 text-xs mb-3">Counting down to</p>
                                <p className="font-display text-paper font-semibold text-lg mb-5 leading-snug">
                                    {nextEvent.title}
                                </p>
                                <div className="flex justify-center">
                                    <CountdownTimer targetDate={nextEvent.start_date} />
                                </div>
                            </div>
                        </div>

                        {/* Home indicator */}
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 bg-paper/60 rounded-full" />
                    </div>
                </div>

                {/* Event details */}
                <div>
                    <p className="text-brand font-medium mb-3">Upcoming Event</p>
                    <h2 className="font-display text-3xl font-semibold text-ink mb-4">{nextEvent.title}</h2>
                    {nextEvent.description && (
                        <p className="text-ink/60 leading-relaxed mb-6">{nextEvent.description}</p>
                    )}
                    <p className="text-ink/50 text-sm mb-1">{nextEvent.venue}</p>
                    <p className="text-ink/50 text-sm mb-8">
                        {new Date(nextEvent.start_date).toLocaleDateString(undefined, {
                            weekday: "long", year: "numeric", month: "long", day: "numeric",
                        })}
                        {nextEvent.event_time ? ` · ${nextEvent.event_time}` : ""}
                    </p>
                    <a
                        href="#events"
                        className="inline-block bg-brand text-paper px-8 py-3 rounded-full font-medium hover:brightness-110 transition"
                    >
                        See All Events
                    </a>
                </div>
            </div>
        </section>
    );
};

export default UpcomingEventPhone;