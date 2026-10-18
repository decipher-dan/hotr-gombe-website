const ministries = [
    { name: "Choir", role: "Leading worship through song", image: "https://picsum.photos/seed/hotr-choir/300/300" },
    { name: "Ushering", role: "Welcoming you at the door", image: "https://picsum.photos/seed/hotr-ushers/300/300" },
    { name: "Media & Tech", role: "Sound, stream, and visuals", image: "https://picsum.photos/seed/hotr-media/300/300" },
    { name: "Children's Church", role: "Shepherding the next generation", image: "https://picsum.photos/seed/hotr-kids/300/300" },
    { name: "Hospitality", role: "Making every guest feel at home", image: "https://picsum.photos/seed/hotr-hosp/300/300" },
    { name: "Prayer Band", role: "Standing in the gap in prayer", image: "https://picsum.photos/seed/hotr-prayerband/300/300" },
];

const ChurchFacets = () => (
    <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-14">
            <h2 className="font-display text-3xl font-semibold text-ink mb-3">The Hands That Serve</h2>
            <p className="text-ink/60 max-w-xl mx-auto">Every ministry is a different way we serve God and each other.</p>
        </div>
        <div className="flex gap-10 overflow-x-auto pb-4 px-2 no-scrollbar">
            {ministries.map((m, i) => (
                <div key={m.name} className={`flex flex-col items-center text-center shrink-0 w-36 ${i % 2 === 1 ? "mt-8" : ""}`}>
                    <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-paper shadow-md mb-4">
                        <img src={m.image} alt={m.name} className="w-full h-full object-cover" />
                    </div>
                    <h3 className="font-medium text-ink text-sm mb-1">{m.name}</h3>
                    <p className="text-ink/50 text-xs leading-snug">{m.role}</p>
                </div>
            ))}
        </div>
    </section>
);

export default ChurchFacets;