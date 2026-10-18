import { useEffect, useState } from "react";

const RecentSermons = () => {
    const [sermons, setSermons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/sermon`)
            .then((res) => res.json())
            .then((data) => setSermons(data.result || []))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    if (loading || sermons.length === 0) return null;

    const [featured, ...rest] = sermons;
    const gridItems = rest.slice(0, 6);

    return (
        <section id="sermons" className="py-20 px-6 max-w-6xl mx-auto">
            <div className="text-center mb-12">
                <h2 className="font-display text-3xl font-semibold text-ink mb-3">Recent Sermons</h2>
                <p className="text-ink/60 max-w-xl mx-auto">Catch up on the Word — watch, listen, or read along.</p>
            </div>

            <div className="grid lg:grid-cols-5 gap-8">
                {/* Featured — newest sermon */}
                <div className="lg:col-span-3 rounded-2xl overflow-hidden bg-white border border-ink/10">
                    <div className="relative h-72">
                        <img src={featured.cover_art} alt={featured.title} className="absolute inset-0 w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
                    </div>
                    <div className="p-6">
                        <h3 className="font-display text-2xl font-semibold text-ink mb-2">{featured.title}</h3>
                        <p className="text-ink/50 text-sm mb-4">
                            {featured.preacher}
                            {featured.preached_at ? ` · ${new Date(featured.preached_at).toLocaleDateString()}` : ""}
                        </p>
                        {featured.description && (
                            <p className="text-ink/60 text-sm leading-relaxed mb-5 line-clamp-3">{featured.description}</p>
                        )}
                        <div className="flex items-center gap-4">
                            {featured.audio_file && (
                                <a
                                    href={featured.audio_file}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-brand font-medium text-sm hover:underline"
                                >
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                                    Listen
                                </a>
                            )}
                            {featured.video_url && (
                                <a
                                    href={featured.video_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-ink/60 font-medium text-sm hover:text-ink"
                                >
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="2" y="5" width="15" height="14" rx="2" /><path d="m17 9 5-3v12l-5-3" />
                                    </svg>
                                    Watch
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* Grid — the rest */}
                <div className="lg:col-span-2 grid grid-cols-2 gap-4">
                    {gridItems.map((s) => (
                        <div key={s.id} className="rounded-xl overflow-hidden bg-white border border-ink/10">
                            <div className="h-24">
                                <img src={s.cover_art} alt={s.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="p-3">
                                <h4 className="text-sm font-medium text-ink leading-snug line-clamp-2">{s.title}</h4>
                                <p className="text-ink/40 text-xs mt-1">
                                    {s.preached_at ? new Date(s.preached_at).toLocaleDateString() : s.preacher}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RecentSermons;