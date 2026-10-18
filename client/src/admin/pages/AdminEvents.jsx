import { useState, useEffect } from "react";
import { adminFetch } from "../utils/adminApi";

const emptyForm = { title: "", description: "", start_date: "", end_date: "", event_time: "", venue: "" };

const AdminEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState(emptyForm);
    const [flyerFile, setFlyerFile] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    const loadEvents = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/events`);
            const data = await res.json();
            setEvents(data.result || []);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { loadEvents(); }, []);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!flyerFile) {
            setError("a flyer image is required");
            return;
        }
        if (form.end_date && form.end_date < form.start_date) {
            setError("End date can't be before the start date — leave it blank for a single-day event.");
            return;
        }

        setSubmitting(true);
        try {
            const formData = new FormData();
            formData.append("flyer", flyerFile);
            Object.entries(form).forEach(([key, value]) => formData.append(key, value));

            const res = await adminFetch("/events", { method: "POST", body: formData });
            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data.error || "failed to create event");
            }
            setForm(emptyForm);
            setFlyerFile(null);
            e.target.reset();
            await loadEvents();
        } catch (err) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Delete this event?")) return;
        const res = await adminFetch(`/events/${id}`, { method: "DELETE" });
        if (res.ok) await loadEvents();
        else alert("Could not delete event");
    };

    return (
        <div>
            <h1 className="font-display text-2xl font-semibold text-ink mb-6">Events</h1>

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 border border-ink/10 mb-10 grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                    <label className="block text-sm text-ink/60 mb-1">Flyer image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setFlyerFile(e.target.files[0])}
                        className="text-sm"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm text-ink/60 mb-1">Title</label>
                    <input
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        required
                        className="w-full border border-ink/15 rounded-lg px-3 py-2 text-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm text-ink/60 mb-1">Venue</label>
                    <input
                        name="venue"
                        value={form.venue}
                        onChange={handleChange}
                        required
                        className="w-full border border-ink/15 rounded-lg px-3 py-2 text-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm text-ink/60 mb-1">Time</label>
                    <input
                        type="time"
                        name="event_time"
                        value={form.event_time}
                        onChange={handleChange}
                        className="w-full border border-ink/15 rounded-lg px-3 py-2 text-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm text-ink/60 mb-1">Start Date</label>
                    <input
                        type="date"
                        name="start_date"
                        value={form.start_date}
                        onChange={handleChange}
                        required
                        className="w-full border border-ink/15 rounded-lg px-3 py-2 text-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm text-ink/60 mb-1">
                        End Date <span className="text-ink/40">(only if multi-day)</span>
                    </label>
                    <input
                        type="date"
                        name="end_date"
                        value={form.end_date}
                        onChange={handleChange}
                        min={form.start_date || undefined}
                        className="w-full border border-ink/15 rounded-lg px-3 py-2 text-sm"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm text-ink/60 mb-1">Description</label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        rows={3}
                        className="w-full border border-ink/15 rounded-lg px-3 py-2 text-sm resize-none"
                    />
                </div>

                {error && <p className="md:col-span-2 text-red-500 text-sm">{error}</p>}

                <div className="md:col-span-2">
                    <button
                        type="submit"
                        disabled={submitting}
                        className="bg-brand text-paper px-6 py-2.5 rounded-full font-medium hover:brightness-110 transition disabled:opacity-50"
                    >
                        {submitting ? "Uploading…" : "Create Event"}
                    </button>
                </div>
            </form>

            {loading ? (
                <p className="text-ink/50">Loading events…</p>
            ) : events.length === 0 ? (
                <p className="text-ink/50">No events yet.</p>
            ) : (
                <div className="grid md:grid-cols-2 gap-4">
                    {events.map((ev) => (
                        <div key={ev.id} className="bg-white rounded-xl border border-ink/10 p-4 flex gap-4">
                            <img src={ev.flyer} alt={ev.title} className="w-20 h-20 object-cover rounded-lg shrink-0" />
                            <div className="flex-1 min-w-0">
                                <h3 className="font-medium text-ink truncate">{ev.title}</h3>
                                <p className="text-ink/50 text-sm">{ev.venue}</p>
                                <p className="text-ink/40 text-xs">
                                    {ev.start_date}
                                    {ev.end_date ? ` → ${ev.end_date}` : ""}
                                    {ev.event_time ? ` · ${ev.event_time}` : ""}
                                </p>
                                <button onClick={() => handleDelete(ev.id)} className="text-red-500 text-sm hover:underline mt-2">
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminEvents;