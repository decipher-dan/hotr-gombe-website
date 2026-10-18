import { Link } from "react-router-dom";

const NewHereBand = () => {
    return (
        <section className="bg-gray-900 py-16 px-6 text-center">
            <div className="max-w-2xl mx-auto">
                <h2 className="font-display text-2xl md:text-3xl font-semibold text-paper mb-4">
                    New here? We'd love to meet you.
                </h2>
                <p className="text-paper/70 mb-8 leading-relaxed">
                    Stop by any Sunday and let us know you're visiting — we'll make sure someone's there to welcome
                    you and answer whatever you're wondering about.
                </p>
                <Link
                    to="/first-timer"
                    className="inline-block bg-hotr-green text-ink px-8 py-3 rounded-full font-medium hover:brightness-95 transition"
                >
                    Plan Your Visit
                </Link>
            </div>
        </section>
    );
};

export default NewHereBand;