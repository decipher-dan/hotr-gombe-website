import { useState } from "react";

const testimonies = [
    { id: 1, quote: "Joining this community completely reshaped my walk with God. I found real fellowship and true discipleship.", author: "Sarah Jenkins" },
    { id: 2, quote: "The Word Feast on Thursdays has given me a deeper understanding of scripture than I ever thought possible.", author: "David Alao" },
    { id: 3, quote: "We walked through a rough season last year, but the family service reminded us we aren't alone.", author: "The Emmanuel Family" },
    { id: 4, quote: "I found healing and a sense of purpose here that I had been searching for, for years.", author: "Grace Okonkwo" },
];

const stoneShapes = [
    "polygon(15% 0%, 85% 5%, 100% 45%, 90% 100%, 10% 95%, 0% 50%)",
    "polygon(10% 10%, 80% 0%, 100% 60%, 85% 100%, 15% 95%, 0% 40%)",
    "polygon(20% 0%, 90% 10%, 100% 70%, 75% 100%, 5% 90%, 0% 30%)",
    "polygon(5% 15%, 70% 0%, 100% 50%, 90% 95%, 20% 100%, 0% 60%)",
];

const Testimonies = () => {
    const [active, setActive] = useState(null);

    return (
        <section id="testimonies" className="py-24 px-6 bg-gray-900 overflow-hidden">
            <div className="max-w-5xl mx-auto text-center mb-14">
                <p className="text-hotr-green text-sm font-medium mb-3">Stones of Testimony</p>
                <h2 className="font-display text-3xl font-semibold text-paper mb-4">Stories Carried Across the River</h2>
                <p className="text-paper/60 max-w-xl mx-auto">
                    In Joshua 4, Israel set up twelve stones as a lasting witness to what God had done.
                    These are ours.
                </p>
            </div>

            <div className="flex gap-6 overflow-x-auto px-6 pb-6 no-scrollbar snap-x snap-mandatory">
                {testimonies.map((t, i) => {
                    const isActive = active === t.id;
                    return (
                        <button
                            key={t.id}
                            onClick={() => setActive(isActive ? null : t.id)}
                            className={`shrink-0 w-64 snap-center text-left transition-transform duration-300 ${
                                isActive ? "scale-105" : "hover:-translate-y-1"
                            } ${i % 2 === 1 ? "mt-6" : ""}`}
                            style={{ clipPath: stoneShapes[i % stoneShapes.length] }}
                        >
                            <div className="bg-paper/95 h-72 p-8 flex flex-col justify-center">
                                <p className="text-ink/70 text-sm leading-relaxed mb-4 line-clamp-6">"{t.quote}"</p>
                                <p className="text-ink font-medium text-sm">— {t.author}</p>
                            </div>
                        </button>
                    );
                })}
            </div>
        </section>
    );
};

export default Testimonies;