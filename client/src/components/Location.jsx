// import { motion } from "framer-motion";
// import { MapPin, Clock, Navigation } from "lucide-react";

const Location = () => {
    const address = "House on the Rock, Gombe, Gombe State, Nigeria";
    const mapQuery = encodeURIComponent(address);

    return (
        <section id="visit" className="py-20">
            <div className="text-center mb-12 px-6">
                <h2 className="font-display text-3xl font-semibold text-ink mb-3">Join Us for Service</h2>
                <p className="text-ink/60">Tuesdays & Thursdays — 5:00 PM · Sundays — 8:00 AM & 10:30 AM</p>
                <p className="text-ink/50 text-sm mt-2 max-w-md mx-auto">
                    We suggest arriving 15 minutes early for parking and a seat before worship begins.
                </p>
            </div>

            <div className="w-full h-[420px]">
                <iframe
                    title="House on the Rock, Gombe — map"
                    src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </div>

            <div className="text-center mt-6">
                <a
                    href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-hotr-green font-medium hover:underline"
                >
                    Get Directions
                </a>
            </div>
        </section>
    );
};

export default Location;