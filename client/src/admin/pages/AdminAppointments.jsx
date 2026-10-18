import { useEffect, useState } from "react";
import { adminFetch } from "../utils/adminApi";

const AdminAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        adminFetch("/contact")
            .then((res) => res.json())
            .then((data) => setAppointments(data.result || []))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div>
            <h1 className="font-display text-2xl font-semibold text-ink mb-6">Appointment Bookings</h1>
            {loading ? (
                <p className="text-ink/50">Loading…</p>
            ) : appointments.length === 0 ? (
                <p className="text-ink/50">No appointments booked yet.</p>
            ) : (
                <table className="w-full bg-white rounded-xl border border-ink/10 overflow-hidden text-sm">
                    <thead className="bg-paper text-ink/50 text-left">
                        <tr>
                            <th className="px-4 py-3">Name</th>
                            <th className="px-4 py-3">Phone</th>
                            <th className="px-4 py-3">Date</th>
                            <th className="px-4 py-3">Time</th>
                            <th className="px-4 py-3">Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((a) => (
                            <tr key={a.id} className="border-t border-ink/5">
                                <td className="px-4 py-3">{a.name}</td>
                                <td className="px-4 py-3">{a.phone_number}</td>
                                <td className="px-4 py-3">{a.appointment_date}</td>
                                <td className="px-4 py-3">{a.appointment_time}</td>
                                <td className="px-4 py-3 text-ink/60">{a.message || "—"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AdminAppointments;