import { useState } from "react";
import { Link } from "react-router-dom";

const faqs = [
    {
        question: "What time are Sunday services?",
        answer: "Join us every Sunday — check the Events page for the current schedule and any special services.",
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

    const toggleFaq = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <footer className="bg-gray-900 text-gray-300 pt-20 pb-10 px-6 mt-20">
            <div className="max-w-5xl mx-auto">
                {/* FAQ */}
                <div className="mb-16">
                    <h2 className="text-2xl font-semibold text-white text-center mb-8">
                        Frequently Asked Questions
                    </h2>
                    <div className="max-w-2xl mx-auto divide-y divide-white/10">
                        {faqs.map((faq, index) => (
                            <div key={index} className="py-4">
                                <button
                                    onClick={() => toggleFaq(index)}
                                    className="w-full flex items-center justify-between text-left text-white font-medium"
                                >
                                    {faq.question}
                                    <span
                                        className={`transition-transform duration-300 ${openIndex === index ? "rotate-45" : ""}`}
                                    >
                                        +
                                    </span>
                                </button>
                                <div
                                    className={`overflow-hidden transition-all duration-300 ${openIndex === index ? "max-h-40 mt-2" : "max-h-0"}`}
                                >
                                    <p className="text-sm text-gray-400">{faq.answer}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer bottom */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/10 pt-8">
                    <span className="font-bold text-white">HOTR Gombe</span>
                    <ul className="flex flex-wrap gap-6 text-sm">
                        <li><Link to="/about" className="hover:text-white">About</Link></li>
                        <li><Link to="/events" className="hover:text-white">Events</Link></li>
                        <li><Link to="/sermons" className="hover:text-white">Sermons</Link></li>
                        <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
                    </ul>
                    <span className="text-xs text-gray-500">
                        © {new Date().getFullYear()} HOTR Gombe. All rights reserved.
                    </span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;