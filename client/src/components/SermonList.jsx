import { useState, useEffect } from "react";
import Skeleton from "./Skeleton";

const SermonList = () => {
    const [sermons, setSermons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSermon = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/sermon`);

                if (!response.ok) {
                    throw new Error(`request failed with status ${response.status}`);
                }

                const data = await response.json();
                setSermons(data.result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSermon();
    }, []);

    if (loading) {
        return (
            <div className="max-w-5xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-6">
                {[1, 2].map((n) => (
                    <div key={n} className="bg-white rounded-2xl shadow p-6 space-y-3">
                        <Skeleton className="h-5 w-2/3" />
                        <Skeleton className="h-4 w-1/3" />
                        <Skeleton className="h-16 w-full" />
                    </div>
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-5xl mx-auto px-6 py-24 text-center text-red-600">
                Something went wrong: {error}
            </div>
        );
    }

    return (
        <section className="max-w-5xl mx-auto px-6 py-24">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
                Sermons
            </h1>

            {sermons.length === 0 ? (
                <p className="text-center text-gray-500">No sermons posted yet.</p>
            ) : (
                <div className="grid md:grid-cols-2 gap-6">
                    {sermons.map((sermon) => (
                        <div
                            key={sermon.id}
                            className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col"
                        >
                            {sermon.cover_art && (
                                <img
                                    src={sermon.cover_art}
                                    alt={sermon.title}
                                    className="w-full h-44 object-cover"
                                />
                            )}
                            <div className="p-6 flex flex-col gap-2 flex-1">
                                <h2 className="text-xl font-semibold text-gray-900">
                                    {sermon.title}
                                </h2>
                                <p className="text-sm text-gray-500">{sermon.preacher}</p>
                                <p className="text-xs text-gray-400">
                                    {new Date(sermon.preached_at).toLocaleDateString("en-GB", {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    })}
                                </p>
                                {sermon.description && (
                                    <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                                        {sermon.description}
                                    </p>
                                )}
                                <div className="flex gap-4 mt-4 text-sm font-medium">
                                    {sermon.audio_url && (
                                        <a
                                            href={sermon.audio_url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-gray-900 hover:underline"
                                        >
                                            Listen →
                                        </a>
                                    )}
                                    {sermon.video_url && (
                                        <a
                                            href={sermon.video_url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-gray-900 hover:underline"
                                        >
                                            Watch →
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default SermonList;