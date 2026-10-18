import { useEffect, useRef, useState } from "react";

const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
};

const getYouTubeId = (url) => {
    if (!url) return null;
    const match = url.match(
        /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/
    );
    return match ? match[1] : null;
};

const glass =
    "rounded-full bg-ink/40 backdrop-blur-md text-paper flex items-center justify-center hover:bg-ink/60 active:scale-95 transition disabled:opacity-30 disabled:pointer-events-none";

const SermonOfTheDay = () => {
    const [playable, setPlayable] = useState([]);
    const [index, setIndex] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [showVideo, setShowVideo] = useState(false);
    const [copied, setCopied] = useState(false);
    const audioRef = useRef(null);
    const autoplayNext = useRef(false);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/sermon`)
            .then((res) => res.json())
            .then((data) => {
                setPlayable((data.result || []).filter((s) => s.audio_file || s.video_url));
            })
            .catch((err) => console.error("sermon fetch failed:", err))
            .finally(() => setLoaded(true));
    }, []);

    // After switching sermons, keep playing if the last one was playing
    useEffect(() => {
        if (autoplayNext.current && audioRef.current) {
            audioRef.current.play().catch(() => {});
        }
        autoplayNext.current = false;
    }, [index]);

    if (!loaded) return null;

    if (playable.length === 0) {
        return (
            <section className="py-20 px-6 bg-ink text-center">
                <p className="text-paper/50">No playable sermons yet. Upload one with audio or a video link.</p>
            </section>
        );
    }

    const sermon = playable[index];
    const hasAudio = Boolean(sermon.audio_file);
    const youtubeId = getYouTubeId(sermon.video_url);
    const percent = duration ? (progress / duration) * 100 : 0;
    const remaining = Math.max(duration - progress, 0);

    const goTo = (nextIndex) => {
        autoplayNext.current = isPlaying;
        setProgress(0);
        setDuration(0);
        setShowVideo(false);
        setIsPlaying(false);
        setIndex(nextIndex);
    };

    const togglePlay = () => {
        if (!hasAudio) {
            if (youtubeId) setShowVideo(true);
            return;
        }
        const audio = audioRef.current;
        if (!audio) return;
        if (audio.paused) {
            audio.play().catch((err) => console.error("playback failed:", err));
        } else {
            audio.pause();
        }
    };

    const handlePrev = () => {
        if (progress > 3 || index === 0) {
            if (audioRef.current) audioRef.current.currentTime = 0;
            setProgress(0);
        } else {
            goTo(index - 1);
        }
    };

    const handleNext = () => {
        if (index < playable.length - 1) goTo(index + 1);
    };

    const handleSeek = (e) => {
        const value = Number(e.target.value);
        if (audioRef.current) audioRef.current.currentTime = value;
        setProgress(value);
    };

    const handleShare = async () => {
        const url = `${window.location.origin}/#sermon-of-the-day`;
        try {
            if (navigator.share) {
                await navigator.share({ title: sermon.title, text: `${sermon.title}, ${sermon.preacher}`, url });
            } else {
                await navigator.clipboard.writeText(url);
                setCopied(true);
                setTimeout(() => setCopied(false), 1800);
            }
        } catch {
            /* share dismissed */
        }
    };

    return (
        <section id="sermon-of-the-day" className="relative py-24 px-6 bg-ink overflow-hidden">
            {/* Blurred cover art as ambient backdrop */}
            <img
                src={sermon.cover_art}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover scale-125 blur-3xl opacity-40 pointer-events-none"
            />
            <div className="absolute inset-0 bg-ink/50 pointer-events-none" />

            <div className="relative max-w-sm mx-auto">
                <h2 className="font-display text-2xl font-semibold text-paper text-center mb-8">
                    Sermon of the Day
                </h2>

                {/* Widget frame */}
                <div className="rounded-[2.75rem] bg-paper/10 p-2.5 shadow-2xl">
                    <div className="relative aspect-square rounded-[2.25rem] overflow-hidden bg-ink">
                        {showVideo && youtubeId ? (
                            <iframe
                                className="absolute inset-0 w-full h-full"
                                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
                                title={sermon.title}
                                allow="autoplay; encrypted-media; picture-in-picture"
                                allowFullScreen
                            />
                        ) : (
                            <>
                                <img
                                    src={sermon.cover_art}
                                    alt={sermon.title}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-ink/30" />

                                {/* Top row: sermon pill + actions */}
                                <div className="absolute top-3 left-3 right-3 flex items-center gap-2">
                                    <div className="flex-1 min-w-0 flex items-center gap-3 rounded-full bg-ink/40 backdrop-blur-md pl-1.5 pr-4 py-1.5">
                                        <img
                                            src={sermon.cover_art}
                                            alt=""
                                            className="w-9 h-9 rounded-full object-cover shrink-0"
                                        />
                                        <div className="min-w-0">
                                            <p className="text-paper text-sm font-semibold truncate leading-tight">
                                                {sermon.title}
                                            </p>
                                            <p className="text-paper/60 text-xs truncate leading-tight">
                                                {sermon.preacher}
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleShare}
                                        className={`${glass} w-11 h-11 shrink-0`}
                                        aria-label="Share sermon"
                                        title={copied ? "Link copied" : "Share"}
                                    >
                                        {copied ? (
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                                <path d="m5 12 5 5L20 7" />
                                            </svg>
                                        ) : (
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                                <path d="M12 3v12M8 7l4-4 4 4M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7" />
                                            </svg>
                                        )}
                                    </button>

                                    {sermon.video_url && (
                                        <a
                                            href={sermon.video_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`${glass} w-11 h-11 shrink-0`}
                                            aria-label="Watch on YouTube"
                                            title="Watch on YouTube"
                                        >
                                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-red-500">
                                                <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8ZM10 15V9l5.2 3L10 15Z" />
                                            </svg>
                                        </a>
                                    )}
                                </div>

                                {/* Bottom: progress + transport */}
                                <div className="absolute bottom-0 left-0 right-0 px-5 pb-5">
                                    {hasAudio && (
                                        <>
                                            <div className="flex justify-between text-paper text-xs font-medium tabular-nums mb-1.5">
                                                <span>{formatTime(progress)}</span>
                                                <span>-{formatTime(remaining)}</span>
                                            </div>
                                            <input
                                                type="range"
                                                min="0"
                                                max={duration || 0}
                                                step="0.1"
                                                value={progress}
                                                onChange={handleSeek}
                                                aria-label="Seek"
                                                className="w-full h-1 rounded-full appearance-none cursor-pointer mb-4
                                                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-0 [&::-webkit-slider-thumb]:h-0
                                                    [&::-moz-range-thumb]:w-0 [&::-moz-range-thumb]:h-0 [&::-moz-range-thumb]:border-0"
                                                style={{
                                                    background: `linear-gradient(to right, #F8FAFC ${percent}%, rgba(248,250,252,0.25) ${percent}%)`,
                                                }}
                                            />
                                        </>
                                    )}

                                    <div className={`flex items-center justify-center gap-4 ${hasAudio ? "" : "mt-12"}`}>
                                        <button
                                            onClick={handlePrev}
                                            className={`${glass} w-12 h-12`}
                                            aria-label="Previous sermon"
                                        >
                                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                                <path d="M6 5h2v14H6zM20 5v14L9 12z" />
                                            </svg>
                                        </button>

                                        <button
                                            onClick={togglePlay}
                                            className={`${glass} w-16 h-16`}
                                            aria-label={isPlaying ? "Pause" : "Play"}
                                        >
                                            {isPlaying ? (
                                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                                                    <rect x="6" y="5" width="4" height="14" rx="1" />
                                                    <rect x="14" y="5" width="4" height="14" rx="1" />
                                                </svg>
                                            ) : (
                                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 ml-0.5">
                                                    <path d="M8 5v14l11-7z" />
                                                </svg>
                                            )}
                                        </button>

                                        <button
                                            onClick={handleNext}
                                            disabled={index >= playable.length - 1}
                                            className={`${glass} w-12 h-12`}
                                            aria-label="Next sermon"
                                        >
                                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                                <path d="M16 5h2v14h-2zM4 5v14l11-7z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {playable.length > 1 && (
                    <p className="text-paper/40 text-xs text-center mt-5 tabular-nums">
                        {index + 1} of {playable.length}
                    </p>
                )}

                {hasAudio && (
                    <audio
                        key={sermon.id}
                        ref={audioRef}
                        src={sermon.audio_file}
                        preload="metadata"
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                        onEnded={() => {
                            setIsPlaying(false);
                            if (index < playable.length - 1) goTo(index + 1);
                        }}
                        onTimeUpdate={() => setProgress(audioRef.current.currentTime)}
                        onLoadedMetadata={() => setDuration(audioRef.current.duration)}
                    />
                )}
            </div>
        </section>
    );
};

export default SermonOfTheDay;