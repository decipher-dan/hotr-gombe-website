import { useEffect, useState } from "react";
import { adminFetch } from "../utils/adminApi";

const AdminFirstTimers = () => {
    const [firstTimers, setFirstTimers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        adminFetch("/first-timer")
            .then((res) => res.json())
            .then((data) => setFirstTimers(data.result || []))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div>
            <h1 className="font-display text-2xl font-semibold text-ink mb-6">First-Timers</h1>

            {loading ? (
                <p className="text-ink/50">Loading…</p>
            ) : error ? (
                <p className="text-red-500 text-sm">{error}</p>
            ) : firstTimers.length === 0 ? (
                <p className="text-ink/50">No first-timer registrations yet.</p>
            ) : (
                <div className="bg-white rounded-xl border border-ink/10 overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-paper text-ink/50 text-left">
                            <tr>
                                <th className="px-4 py-3 whitespace-nowrap">Date</th>
                                <th className="px-4 py-3 whitespace-nowrap">Name</th>
                                <th className="px-4 py-3 whitespace-nowrap">Phone</th>
                                <th className="px-4 py-3 whitespace-nowrap">Email</th>
                                <th className="px-4 py-3 whitespace-nowrap">Address</th>
                                <th className="px-4 py-3 whitespace-nowrap">Sex</th>
                                <th className="px-4 py-3 whitespace-nowrap">Reach Out Via</th>
                                <th className="px-4 py-3 whitespace-nowrap">Joining?</th>
                                <th className="px-4 py-3">Prayer Request</th>
                            </tr>
                        </thead>
                        <tbody>
                            {firstTimers.map((f) => (
                                <tr key={f.id} className="border-t border-ink/5 align-top">
                                    <td className="px-4 py-3 whitespace-nowrap text-ink/60">
                                        {new Date(f.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-4 py-3 font-medium text-ink whitespace-nowrap">{f.name}</td>
                                    <td className="px-4 py-3 whitespace-nowrap">{f.phone_number}</td>
                                    <td className="px-4 py-3 whitespace-nowrap">{f.email}</td>
                                    <td className="px-4 py-3">{f.address}</td>
                                    <td className="px-4 py-3 capitalize whitespace-nowrap">{f.sex}</td>
                                    <td className="px-4 py-3 capitalize whitespace-nowrap">{f.reached_out}</td>
                                    <td className="px-4 py-3 capitalize whitespace-nowrap">{f.joining_church}</td>
                                    <td className="px-4 py-3 text-ink/70 min-w-[200px]">
                                        {f.prayer_request || <span className="text-ink/30">—</span>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminFirstTimers;