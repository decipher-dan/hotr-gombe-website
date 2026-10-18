import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HeartHandshake, CalendarCheck, X } from "lucide-react";
import Modal from "./Modal";

const FloatingActions = () => {
    const [visitOpen, setVisitOpen] = useState(false);
    const [prayerOpen, setPrayerOpen] = useState(false);

    return (
        <>
            <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    onClick={() => setPrayerOpen(true)}
                    className="flex items-center gap-2 bg-ink text-paper pl-4 pr-5 py-3 rounded-full shadow-lg hover:brightness-110 transition text-sm font-medium"
                >
                    <HeartHandshake size={18} />
                    Prayer Request
                </motion.button>

                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.95, duration: 0.5 }}
                    onClick={() => setVisitOpen(true)}
                    className="flex items-center gap-2 bg-hotr-green text-paper pl-4 pr-5 py-3 rounded-full shadow-lg hover:brightness-110 transition text-sm font-medium"
                >
                    <CalendarCheck size={18} />
                    Plan Your Visit
                </motion.button>
            </div>

            <PlanVisitModal isOpen={visitOpen} onClose={() => setVisitOpen(false)} />
            <PrayerRequestModal isOpen={prayerOpen} onClose={() => setPrayerOpen(false)} />
        </>
    );
};

const PlanVisitModal = ({ isOpen, onClose }) => (
    <Modal isOpen={isOpen} onClose={onClose} title="Plan Your Visit">
        <p className="text-ink/60 mb-6">
            We'd love to have you. Register as a first-time visitor and we'll have
            someone ready to welcome you personally when you arrive.
        </p>
        <div className="space-y-3 mb-6 text-sm text-ink/70">
            <p><span className="font-medium text-ink">Sundays</span> — 9:00 AM</p>
            <p><span className="font-medium text-ink">What to expect</span> — come as you are, no dress code</p>
        </div>
        <Link
            to="/first-timer"
            onClick={onClose}
            className="block text-center bg-hotr-blue text-paper px-6 py-3 rounded-full font-medium hover:brightness-110 transition"
        >
            Register as a First-Timer
        </Link>
    </Modal>
);

const PrayerRequestModal = ({ isOpen, onClose }) => {
    const [form, setForm] = useState({ fullname: "", phone: "", message: "" });
    const [status, setStatus] = useState("idle"); // idle | sending | sent | error

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/prayer-request`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: form.fullname,
                phone_number: form.phone,
                message: form.message,
            }),
        });
        if (!res.ok) throw new Error("Request failed");
        setStatus("sent");
        setForm({ fullname: "", phone: "", message: "" });
    } catch (err) {
        console.error("prayer request failed:", err);
        setStatus("error");
    }
};

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Prayer Request">
            {status === "sent" ? (
                <p className="text-ink/70">
                    Received — we're praying with you. Someone from our team may reach
                    out if you left a way to contact you.
                </p>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        name="fullname"
                        value={form.fullname}
                        onChange={handleChange}
                        placeholder="Your name (optional)"
                        className="w-full border border-ink/15 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40"
                    />
                    <input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="Phone or email (optional)"
                        className="w-full border border-ink/15 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40"
                    />
                    <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        placeholder="What can we pray with you about?"
                        className="w-full border border-ink/15 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40 resize-none"
                    />
                    {status === "error" && (
                        <p className="text-red-500 text-sm">Something went wrong — please try again.</p>
                    )}
                    <button
                        type="submit"
                        disabled={status === "sending"}
                        className="w-full bg-ink text-paper px-6 py-3 rounded-full font-medium hover:brightness-110 transition disabled:opacity-50"
                    >
                        {status === "sending" ? "Sending…" : "Send Prayer Request"}
                    </button>
                </form>
            )}
        </Modal>
    );
};

export default FloatingActions;