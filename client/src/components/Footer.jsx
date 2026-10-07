import { useState } from "react";
import { Link } from "react-router-dom";

const faqs = [
    {
        question: "What time are Sunday services?",
        answer: "Join us every Sunday check the Events page for the current schedule and any special services.",
    },
    {
        question: "What should I expect as a first-time visitor?",
        answer: "A warm welcome! Fill out our First Timer form ahead of time or simply come as you are — our team will help you find your way around.",
    },
    {
        question: "How can I book time with a pastor?",
        answer: "Use the Contact page to pick an available weekday slot between 10am and 3pm (excluding 1–2pm).",
    },
    {
        question: "How do I become a partner or give?",
        answer: "Visit the Partnership page to set up recurring or one-time giving at a frequency that works for you.",
    },
];

const Footer = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const [email, setEmail] = useState("");

    const toggleFaq = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const handleSubscribe = (e) => {
        e.preventDefault();
        // Handle newsletter subscription logic here
        console.log("Subscribed email:", email);
        setEmail("");
    };

    return (
        <footer className="bg-gray-900 text-gray-300 pt-20 pb-10 px-6 mt-20 border-t border-gray-800">
            <div className="max-w-6xl mx-auto">
                
                {/* 1. Frequently Asked Questions Section */}
                <div className="mb-20">
                    <h2 className="text-2xl font-semibold text-white text-center mb-8">
                        Frequently Asked Questions
                    </h2>
                    <div className="max-w-2xl mx-auto divide-y divide-white/10">
                        {faqs.map((faq, index) => (
                            <div key={index} className="py-4">
                                <button
                                    onClick={() => toggleFaq(index)}
                                    className="w-full flex items-center justify-between text-left text-white font-medium hover:text-amber-400 transition-colors"
                                >
                                    <span>{faq.question}</span>
                                    <span
                                        className={`text-xl transition-transform duration-300 ${openIndex === index ? "rotate-45 text-amber-400" : "text-gray-500"}`}
                                    >
                                        +
                                    </span>
                                </button>
                                <div
                                    className={`overflow-hidden transition-all duration-300 ${openIndex === index ? "max-h-40 mt-2" : "max-h-0"}`}
                                >
                                    <p className="text-sm text-gray-400 leading-relaxed">{faq.answer}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 2. Main Footer Directory & Subscription Link Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 border-t border-white/10 pt-16 mb-16">
                    
                    {/* Brand Profile Column */}
                    <div className="space-y-4">
                        <span className="text-xl font-bold text-white tracking-tight">HOTR Gombe</span>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            A Christ-centered community committed to true worship, practical discipleship, and structural transformation.
                        </p>
                        {/* Social Media Links (Using clean inline SVGs) */}
                        <div className="flex items-center gap-4 pt-2">
                            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-amber-500 hover:text-gray-900 transition text-gray-400" aria-label="Facebook">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-amber-500 hover:text-gray-900 transition text-gray-400" aria-label="Instagram">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                            </a>
                            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-amber-500 hover:text-gray-900 transition text-gray-400" aria-label="YouTube">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                            </a>
                        </div>
                    </div>

                    {/* Navigation Column */}
                    <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-white block mb-4">Quick Links</span>
                        <ul className="space-y-2.5 text-sm">
                            <li><Link to="/about" className="hover:text-amber-400 transition-colors">About Us</Link></li>
                            <li><Link to="/events" className="hover:text-amber-400 transition-colors">Upcoming Events</Link></li>
                            <li><Link to="/sermons" className="hover:text-amber-400 transition-colors">Sermon Archives</Link></li>
                            <li><Link to="/contact" className="hover:text-amber-400 transition-colors">Contact / Counseling</Link></li>
                        </ul>
                    </div>

                    {/* Engagement / Partnership Column */}
                    <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-white block mb-4">Get Involved</span>
                        <ul className="space-y-2.5 text-sm">
                            <li><Link to="/partnership" className="hover:text-amber-400 transition-colors">Become a Partner</Link></li>
                            <li><Link to="/give" className="hover:text-amber-400 transition-colors">Online Giving</Link></li>
                            <li><Link to="/serve" className="hover:text-amber-400 transition-colors">Join a Service Team</Link></li>
                            <li><Link to="/contact" className="hover:text-amber-400 transition-colors">Submit Prayer Request</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter / Bulletin Column */}
                    <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-white block mb-4">Weekly Bulletin</span>
                        <p className="text-xs text-gray-400 mb-3 leading-relaxed">
                            Stay up-to-date with words of encouragement, announcements, and events directly in your inbox.
                        </p>
                        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email address"
                                className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500 w-full"
                            />
                            <button
                                type="submit"
                                className="bg-amber-500 text-gray-900 font-medium text-sm px-4 py-2 rounded-lg hover:bg-amber-400 transition whitespace-nowrap"
                            >
                                Join
                            </button>
                        </form>
                    </div>
                </div>

                {/* 3. Footer Bottom Metadata Strip */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/10 pt-8 text-center md:text-left">
                    <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
                        <span className="text-xs text-gray-500">
                            © {new Date().getFullYear()} HOTR Gombe. All rights reserved.
                        </span>
                    </div>
                    <ul className="flex gap-6 text-xs text-gray-500">
                        <li><Link to="/privacy" className="hover:text-gray-400 transition-colors">Privacy Policy</Link></li>
                        <li><Link to="/terms" className="hover:text-gray-400 transition-colors">Terms of Service</Link></li>
                    </ul>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
