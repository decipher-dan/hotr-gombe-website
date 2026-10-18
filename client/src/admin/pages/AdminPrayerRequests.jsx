import { useEffect, useState } from "react";
import { adminFetch } from "../utils/adminApi";

const AdminPrayerRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        adminFetch("/prayer-request")
            .then((res) => res.json())
            .then((data) => setRequests(data.result || []))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div>
            <h1 className="font-display text-2xl font-semibold text-ink mb-6">Prayer Requests</h1>
            {loading ? (
                <p className="text-ink/50">Loading…</p>
            ) : requests.length === 0 ? (
                <p className="text-ink/50">No prayer requests yet.</p>
            ) : (
                <div className="space-y-4">
                    {requests.map((r) => (
                        <div key={r.id} className="bg-white rounded-xl border border-ink/10 p-4">
                            <p className="text-ink mb-1">{r.message}</p>
                            <p className="text-ink/50 text-sm">
                                {r.name || "Anonymous"} {r.phone_number ? `· ${r.phone_number}` : ""}
                            </p>
                            <p className="text-ink/30 text-xs mt-1">{new Date(r.created_at).toLocaleString()}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminPrayerRequests;