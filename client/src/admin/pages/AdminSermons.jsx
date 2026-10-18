import { useState, useEffect } from "react";
import { adminFetch } from "../utils/adminApi";

const emptyForm = { video_url: "", title: "", description: "", preacher: "", preached_at: "" };

const AdminSermons = () => {
    const [sermons, setSermons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState(emptyForm);
    const [coverFile, setCoverFile] = useState(null);
    const [audioFile, setAudioFile] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    const loadSermons = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/sermon`);
            const data = await res.json();
            setSermons(data.result || []);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { loadSermons(); }, []);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (!coverFile || !audioFile) {
            setError("cover art and audio file are both required");
            return;
        }
        setSubmitting(true);
        try {
            const formData = new FormData();
            formData.append("cover_art", coverFile);
            formData.append("audio_file", audioFile);
            Object.entries(form).forEach(([key, value]) => formData.append(key, value));

            const res = await adminFetch("/sermon", { method: "POST", body: formData });
            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data.error || "failed to create sermon");
            }
            setForm(emptyForm);
            setCoverFile(null);
            setAudioFile(null);
            e.target.reset();
            await loadSermons();
        } catch (err) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Delete this sermon?")) return;
        const res = await adminFetch(`/sermon/${id}`, { method: "DELETE" });
        if (res.ok) await loadSermons();
        else alert("Could not delete sermon");
    };

    return (
        <div>
            <h1 className="font-display text-2xl font-semibold text-ink mb-6">Sermons</h1>

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 border border-ink/10 mb-10 grid md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm text-ink/60 mb-1">Cover art (image)</label>
                    <input type="file" accept="image/*" onChange={(e) => setCoverFile(e.target.files[0])} required className="text-sm" />
                </div>
                <div>
                    <label className="block text-sm text-ink/60 mb-1">Audio file</label>
                    <input type="file" accept="audio/*" onChange={(e) => setAudioFile(e.target.files[0])} required className="text-sm" />
                </div>
                <div>
                    <label className="block text-sm text-ink/60 mb-1">Title</label>
                    <input name="title" value={form.title} onChange={handleChange} required className="w-full border border-ink/15 rounded-lg px-3 py-2 text-sm" />
                </div>
                <div>
                    <label className="block text-sm text-ink/60 mb-1">Preacher</label>
                    <input name="preacher" value={form.preacher} onChange={handleChange} required className="w-full border border-ink/15 rounded-lg px-3 py-2 text-sm" />
                </div>
                <div>
                    <label className="block text-sm text-ink/60 mb-1">Preached at (date)</label>
                    <input type="date" name="preached_at" value={form.preached_at} onChange={handleChange} className="w-full border border-ink/15 rounded-lg px-3 py-2 text-sm" />
                </div>
                <div>
                    <label className="block text-sm text-ink/60 mb-1">Video URL (optional, e.g. YouTube)</label>
                    <input name="video_url" value={form.video_url} onChange={handleChange} className="w-full border border-ink/15 rounded-lg px-3 py-2 text-sm" />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm text-ink/60 mb-1">Description</label>
                    <textarea name="description" value={form.description} onChange={handleChange} rows={3} className="w-full border border-ink/15 rounded-lg px-3 py-2 text-sm resize-none" />
                </div>
                {error && <p className="md:col-span-2 text-red-500 text-sm">{error}</p>}
                <div className="md:col-span-2">
                    <button type="submit" disabled={submitting} className="bg-brand text-paper px-6 py-2.5 rounded-full font-medium hover:brightness-110 transition disabled:opacity-50">
                        {submitting ? "Uploading…" : "Create Sermon"}
                    </button>
                </div>
            </form>

            {loading ? (
                <p className="text-ink/50">Loading sermons…</p>
            ) : (
                <div className="grid md:grid-cols-2 gap-4">
                    {sermons.map((s) => (
                        <div key={s.id} className="bg-white rounded-xl border border-ink/10 p-4 flex gap-4">
                            <img src={s.cover_art} alt={s.title} className="w-20 h-20 object-cover rounded-lg shrink-0" />
                            <div className="flex-1 min-w-0">
                                <h3 className="font-medium text-ink truncate">{s.title}</h3>
                                <p className="text-ink/50 text-sm">{s.preacher}</p>
                                <button onClick={() => handleDelete(s.id)} className="text-red-500 text-sm hover:underline mt-2">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminSermons;