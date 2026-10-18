// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Link } from "react-router-dom";
// import logo from "../assets/house-on-the-rock-logo.svg";
// import hero1 from "../assets/hero1.jpg"
// import hero2 from "../assets/hero2.jpg"
// import hero3 from "../assets/hero2.jpg"
// import hero4 from "../assets/hero2.jpg"
// import hero5 from "../assets/hero2.jpg"
// import hero6 from "../assets/hero2.jpg"

// // Placeholder images — replace these with real HOTR photos later.
// // Any URL works here; swap the array contents when you have real assets.
// const heroImages = [
//     "https://picsum.photos/seed/hotr-worship/1600/900",
//     "https://picsum.photos/seed/hotr-crowd/1600/900",
//     "https://picsum.photos/seed/hotr-hands/1600/900",
//     "https://picsum.photos/seed/hotr-choir/1600/900",
// ];

// const SLIDE_DURATION = 6000; // ms each image stays before crossfading

// const particles = Array.from({ length: 18 }, (_, i) => ({
//     id: i,
//     left: `${Math.random() * 100}%`,
//     size: `${4 + Math.random() * 6}px`,
//     delay: Math.random() * 4,
//     duration: 6 + Math.random() * 6,
// }));

// const Hero = () => {
//     const [current, setCurrent] = useState(0);

//     useEffect(() => {
//         const timer = setInterval(() => {
//             setCurrent((prev) => (prev + 1) % heroImages.length);
//         }, SLIDE_DURATION);
//         return () => clearInterval(timer);
//     }, []);

//     return (
//         <section id="hero" className="relative h-[90vh] min-h-[600px] w-full overflow-hidden flex items-center justify-center text-center">
//             {/* Crossfading background photos */}
//             <div className="absolute inset-0 z-0">
//                 <AnimatePresence mode="sync">
//                     <motion.img
//                         key={current}
//                         src={heroImages[current]}
//                         alt=""
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         transition={{ duration: 1.5, ease: "easeInOut" }}
//                         className="absolute inset-0 w-full h-full object-cover"
//                     />
//                 </AnimatePresence>
//                 {/* Dark overlay so white text stays legible over any photo */}
//                 <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/50 to-ink/80" />
//             </div>

//             {/* Floating particles, above the photo, below the text */}
//             <div className="absolute inset-0 z-10 pointer-events-none motion-reduce:hidden">
//                 {particles.map((p) => (
//                     <motion.span
//                         key={p.id}
//                         className="absolute bottom-0 rounded-full bg-paper/30"
//                         style={{ left: p.left, width: p.size, height: p.size }}
//                         animate={{ y: ["0%", "-120vh"], opacity: [0, 1, 0] }}
//                         transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
//                     />
//                 ))}
//             </div>

//                             {/* Content */}
//                 <div className="relative z-20 px-6 max-w-3xl mx-auto">
//                 <motion.div
//                     initial={{ opacity: 0, y: 12 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.6 }}
//                     className="mx-auto mb-8 w-36 md:w-44 rounded-3xl px-5 py-4 shadow-xl"
//                 >
//                     <img src={logo} alt="House on the Rock, Gombe" className="w-full h-auto" />
//                 </motion.div>

//                 <motion.h1
//                     initial={{ opacity: 0, y: 16 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.6, delay: 0.1 }}
//                     className="font-display text-4xl md:text-6xl font-semibold text-paper leading-tight mb-6"
//                 >
//                     welcome to the wealthy place
//                 </motion.h1>

//                 <motion.p
//                     initial={{ opacity: 0, y: 16 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.6, delay: 0.2 }}
//                     className="text-paper/80 text-lg mb-10"
//                 >
//                     Join us for worship, prayer, and community every Tuesday, Thursday, and Sunday.
//                 </motion.p>

//                 <motion.div
//                     initial={{ opacity: 0, y: 16 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.6, delay: 0.3 }}
//                     className="flex flex-col sm:flex-row gap-4 justify-center"
//                 >
//                     <Link
//                         to="/first-timer"
//                         className="bg-hotr-green text-paper px-8 py-3 rounded-full font-medium hover:brightness-110 transition"
//                     >
//                         Join Us This Sunday
//                     </Link>
//                     <a
//                         href="#sermons"
//                         className="bg-paper/10 border border-paper/30 text-paper px-8 py-3 rounded-full font-medium hover:bg-paper/20 transition"
//                     >
//                         Watch Latest Sermon
//                     </a>
//                 </motion.div>
//             </div>
//         </section>
//     );
// };

// export default Hero;

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import logo from "../assets/house-on-the-rock-logo.svg";

// Imported local assets
import hero1 from "../assets/hero1.jpg";
import hero2 from "../assets/hero2.jpg";
import hero3 from "../assets/hero3.jpg";
import hero5 from "../assets/hero5.jpg";
import hero6 from "../assets/hero6.jpg";

// Dynamic array loading your real imported assets
const heroImages = [hero1, hero2, hero3, hero5, hero6];

// Updated to 600000ms (10 minutes)
const SLIDE_DURATION = 600000; 

const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: `${4 + Math.random() * 6}px`,
    delay: Math.random() * 4,
    duration: 6 + Math.random() * 6,
}));

const Hero = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % heroImages.length);
        }, SLIDE_DURATION);
        return () => clearInterval(timer);
    }, []);

    return (
        <section id="hero" className="relative h-[90vh] min-h-[600px] w-full overflow-hidden flex items-center justify-center text-center">
            {/* Crossfading background photos */}
            <div className="absolute inset-0 z-0">
                <AnimatePresence mode="sync">
                    <motion.img
                        key={current}
                        src={heroImages[current]}
                        alt=""
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </AnimatePresence>
                {/* Dark overlay so white text stays legible over any photo */}
                <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/50 to-ink/80" />
            </div>

            {/* Floating particles, above the photo, below the text */}
            <div className="absolute inset-0 z-10 pointer-events-none motion-reduce:hidden">
                {particles.map((p) => (
    <motion.span
        key={p.id}
        className="absolute bottom-0 rounded-full bg-paper/30"
        style={{ left: p.left, width: p.size, height: p.size }}
        animate={{ 
            y: ["0%", "-120vh"], 
            opacity: [0, 1, 0] // Fades in quickly, stays visible, then fades away at the top
        }}
        transition={{ 
            duration: p.duration, 
            delay: p.delay, 
            repeat: Infinity, 
            ease: "linear" 
        }}
    />
))}
            </div>

            {/* Content */}
            <div className="relative z-20 px-6 max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mx-auto mb-8 w-36 md:w-44 rounded-3xl px-5 py-4 shadow-xl"
                >
                    <img src={logo} alt="House on the Rock, Gombe" className="w-full h-auto" />
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="font-display text-4xl md:text-6xl font-semibold text-paper leading-tight mb-6"
                >
                    welcome to the wealthy place
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-paper/80 text-lg mb-10"
                >
                    Join us for worship, prayer, and community every Tuesday, Thursday, and Sunday.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <Link
                        to="/first-timer"
                        className="bg-hotr-green text-paper px-8 py-3 rounded-full font-medium hover:brightness-110 transition"
                    >
                        Join Us This Sunday
                    </Link>
                    <a
                        href="#sermons"
                        className="bg-paper/10 border border-paper/30 text-paper px-8 py-3 rounded-full font-medium hover:bg-paper/20 transition"
                    >
                        Watch Latest Sermon
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
