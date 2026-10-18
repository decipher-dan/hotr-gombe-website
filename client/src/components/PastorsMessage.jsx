import psd from '../assets/psdmessage.jpg';

const PastorsMessage = () => (
    <section className="py-20 px-6 bg-hotr-green/30">
        <div className="max-w-4xl mx-auto grid md:grid-cols-[220px_1fr] gap-10 items-center">
            <div className="w-48 h-48 md:w-full md:h-64 rounded-2xl overflow-hidden mx-auto">
                <img
                    src={psd}
                    alt="Senior Pastor Sam L. Dogori"
                    className="w-full h-full object-cover"
                />
            </div>
            <div>
                <p className="text-hotr-green text-sm font-medium mb-3">A Word From the Pastor</p>
                <p className="font-display text-xl md:text-2xl text-ink leading-relaxed mb-6">
                    "God is doing something new among us. Come as you are, and let's build on the rock
                    together there's room for you here."
                </p>
                <p className="text-ink/50 text-sm">- Pastor Sam L. Dogori (psd), House on the Rock, Gombe</p>
            </div>
        </div>
    </section>
);

export default PastorsMessage;
