import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Events", path: "/events" },
    { label: "Sermons", path: "/sermons" },
    { label: "Partnership", path: "/partnership" },
    { label: "Give", path: "/give" },
    { label: "First Timer", path: "/first-timer" },
    { label: "Contact", path: "/contact" },
];

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out
                flex items-center justify-between gap-6
                rounded-full backdrop-blur-xl bg-gray-900/80 border border-white/10 shadow-lg
                ${scrolled ? "px-4 py-2 w-[90%] max-w-3xl" : "px-6 py-3 w-[92%] max-w-4xl"}
            `}
        >
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 shrink-0">
                <span className="text-white font-bold text-lg tracking-tight">
                    HOTR Gombe
                </span>
            </Link>

            {/* Desktop links */}
            <ul className="hidden md:flex items-center gap-1">
                {navLinks.map((link) => {
                    const isActive = location.pathname === link.path;
                    return (
                        <li key={link.path}>
                            <Link
                                to={link.path}
                                className={`relative px-3 py-1.5 text-sm rounded-full transition-colors duration-300
                                    ${isActive ? "text-gray-900 bg-white" : "text-gray-300 hover:text-white"}
                                `}
                            >
                                {link.label}
                            </Link>
                        </li>
                    );
                })}
            </ul>

            {/* Mobile toggle */}
            <button
                className="md:hidden text-white"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {menuOpen ? (
                        <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
                    ) : (
                        <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
                    )}
                </svg>
            </button>

            {/* Mobile dropdown */}
            {menuOpen && (
                <ul className="absolute top-full mt-3 left-0 right-0 flex flex-col gap-1 bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-white/10 p-3 md:hidden">
                    {navLinks.map((link) => (
                        <li key={link.path}>
                            <Link
                                to={link.path}
                                onClick={() => setMenuOpen(false)}
                                className={`block px-3 py-2 text-sm rounded-xl transition-colors
                                    ${location.pathname === link.path ? "text-gray-900 bg-white" : "text-gray-300 hover:text-white"}
                                `}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </nav>
    );
};

export default Navbar;