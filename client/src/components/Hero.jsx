import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 10,
}));

const Hero = () => {
    return (
        <section
            id="hero"
            className="relative min-h-[70vh] flex flex-col items-center justify-center text-center px-6 py-20 bg-gray-900 overflow-hidden"
        >
            {/* soft glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent pointer-events-none" />

            {/* floating particles */}
            <div className="absolute inset-0 pointer-events-none">
                {particles.map((p) => (
                    <motion.span
                        key={p.id}
                        className="absolute rounded-full bg-gray-700"
                        style={{
                            width: p.size,
                            height: p.size,
                            left: `${p.left}%`,
                            bottom: "-10%",
                        }}
                        animate={{
                            y: ["0vh", "-110vh"],
                            opacity: [0, 0.6, 0],
                        }}
                        transition={{
                            duration: p.duration,
                            delay: p.delay,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                ))}
            </div>


            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="relative font-display text-paper text-4xl md:text-6xl font-semibold max-w-3xl leading-tight mb-4"
            >
                The Wealthy Place
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative text-paper/70 text-base md:text-lg max-w-xl mb-7"
            >
                A contemporary church in Gombe where faith feels real,
                community feels genuine, and every Sunday feels like coming home.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="relative flex flex-wrap justify-center gap-3"
            >
                <Link
                    to="/first-timer"
                    className="bg-gray-400 text-ink px-6 py-3 rounded-full font-medium hover:brightness-110 transition"
                >
                    Join Us This Sunday
                </Link>

                <Link
                    to="/sermons"
                    className="border border-paper/30 text-paper px-6 py-3 rounded-full font-medium hover:bg-paper hover:text-ink transition"
                >
                    Watch Latest Sermon
                </Link>
            </motion.div>
        </section>
    );
};

export default Hero;