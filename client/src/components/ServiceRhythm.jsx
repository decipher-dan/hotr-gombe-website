const rhythm = [
    {
        day: "Tuesdays",
        name: "Prayer Feast",
        description: "A gathering devoted to prayer — contending together for our families, our city, and the church.",
        image: "https://picsum.photos/seed/hotr-prayer/600/700",
    },
    {
        day: "Thursdays",
        name: "Word Feast",
        description: "Deep, unhurried teaching from the Word, built for growth that outlasts a Sunday morning.",
        image: "https://picsum.photos/seed/hotr-word/600/700",
    },
    {
        day: "Sundays",
        name: "Sunday Service",
        description: "Worship, ministration, and community — the heartbeat of our week, together as one house.",
        image: "https://picsum.photos/seed/hotr-sunday/600/700",
    },
];

const ServiceRhythm = () => {
    return (
        <section id="services" className="py-20 px-6 max-w-6xl mx-auto">
            <div className="text-center mb-12">
                <h2 className="font-display text-3xl font-semibold text-ink mb-3">How We Gather</h2>
                <p className="text-ink/60 max-w-xl mx-auto">
                    Three rhythms that shape our week — each one open to you, whether you're a first-timer or family.
                </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
                {rhythm.map((r) => (
                    <div key={r.day} className="relative rounded-2xl overflow-hidden h-96 group">
                        <img
                            src={r.image}
                            alt={r.name}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                            <p className="text-hotr-green text-sm font-medium mb-1">{r.day}</p>
                            <h3 className="font-display text-xl font-semibold text-paper mb-2">{r.name}</h3>
                            <p className="text-paper/70 text-sm leading-relaxed">{r.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ServiceRhythm;