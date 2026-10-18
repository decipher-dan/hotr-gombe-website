import { useEffect, useState } from "react";
import { adminFetch } from "../utils/adminApi";

const icons = {
    events: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="5" width="18" height="16" rx="2" />
            <path d="M3 10h18M8 3v4M16 3v4" />
        </svg>
    ),
    sermons: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3a6 6 0 0 0-6 6v4a6 6 0 0 0 6 6 6 6 0 0 0 6-6V9a6 6 0 0 0-6-6Z" />
            <path d="M5 13v1a7 7 0 0 0 14 0v-1M12 21v-1" />
        </svg>
    ),
    prayer: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20s-7-4.4-9.3-9A5 5 0 0 1 12 6a5 5 0 0 1 9.3 5c-2.3 4.6-9.3 9-9.3 9Z" />
        </svg>
    ),
    appointments: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 3" />
        </svg>
    ),
    partners: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="8" cy="8" r="3" />
            <circle cx="17" cy="9" r="2.5" />
            <path d="M2.5 20v-1.5A4.5 4.5 0 0 1 7 14h2a4.5 4.5 0 0 1 4.5 4.5V20M14 14.3A3.5 3.5 0 0 1 21.5 17v1" />
        </svg>
    ),
    payments: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="6" width="20" height="13" rx="2" />
            <path d="M2 10h20M6 15h4" />
        </svg>
    ),
};

const cardTheme = {
    events: { bg: "bg-blue-50", text: "text-hotr-blue" },
    sermons: { bg: "bg-violet-50", text: "text-violet-600" },
    prayer: { bg: "bg-rose-50", text: "text-rose-600" },
    appointments: { bg: "bg-amber-50", text: "text-amber-600" },
    partners: { bg: "bg-lime-50", text: "text-hotr-green" },
    payments: { bg: "bg-cyan-50", text: "text-cyan-600" },
};

const StatCard = ({ label, value, loading, icon }) => {
    const theme = cardTheme[icon];
    return (
        <div className="bg-white rounded-2xl border border-ink/10 p-6 flex items-start gap-4">
            <div className={`w-11 h-11 rounded-xl ${theme.bg} ${theme.text} flex items-center justify-center shrink-0`}>
                <div className="w-5 h-5">{icons[icon]}</div>
            </div>
            <div>
                <p className="text-ink/50 text-sm mb-1">{label}</p>
                <p className="font-display text-2xl font-semibold text-ink">
                    {loading ? "…" : value}
                </p>
            </div>
        </div>
    );
};

const BarChart = ({ data }) => {
    const max = Math.max(...data.map((d) => d.value), 1);
    return (
        <div className="bg-white rounded-2xl border border-ink/10 p-6">
            <h2 className="font-display text-lg font-semibold text-ink mb-6">Totals by Category</h2>
            <div className="flex items-end gap-4 h-56">
                {data.map((d) => (
                    <div key={d.label} className="flex-1 flex flex-col items-center justify-end h-full">
                        <span className="text-sm font-medium text-ink mb-1">{d.value}</span>
                        <div
                            className="w-full rounded-t-md bg-hotr-blue transition-all"
                            style={{ height: `${(d.value / max) * 100}%`, minHeight: d.value > 0 ? "4px" : "0px" }}
                        />
                        <span className="text-xs text-ink/50 mt-2 text-center leading-tight">{d.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Donut = ({ segments }) => {
    const total = segments.reduce((sum, s) => sum + s.value, 0) || 1;
    const radius = 60;
    const circumference = 2 * Math.PI * radius;
    let offsetAccum = 0;

    return (
        <div className="bg-white rounded-2xl border border-ink/10 p-6">
            <h2 className="font-display text-lg font-semibold text-ink mb-6">Payment Status</h2>
            {total === 0 || segments.every((s) => s.value === 0) ? (
                <p className="text-ink/50 text-sm">No payments recorded yet.</p>
            ) : (
                <div className="flex items-center gap-8">
                    <svg width="160" height="160" viewBox="0 0 160 160">
                        <circle cx="80" cy="80" r={radius} fill="none" stroke="#E2E8F0" strokeWidth="20" />
                        {segments.map((s) => {
                            if (s.value === 0) return null;
                            const fraction = s.value / total;
                            const dash = fraction * circumference;
                            const gap = circumference - dash;
                            const circle = (
                                <circle
                                    key={s.label}
                                    cx="80"
                                    cy="80"
                                    r={radius}
                                    fill="none"
                                    stroke={s.color}
                                    strokeWidth="20"
                                    strokeDasharray={`${dash} ${gap}`}
                                    strokeDashoffset={-offsetAccum}
                                    transform="rotate(-90 80 80)"
                                />
                            );
                            offsetAccum += dash;
                            return circle;
                        })}
                        <text x="80" y="80" textAnchor="middle" dominantBaseline="middle" className="fill-ink font-display text-xl font-semibold">
                            {total}
                        </text>
                    </svg>
                    <ul className="space-y-2">
                        {segments.map((s) => (
                            <li key={s.label} className="flex items-center gap-2 text-sm">
                                <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                                <span className="text-ink/70">{s.label}</span>
                                <span className="text-ink/40">({s.value})</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

const AdminDashboardHome = () => {
    const [counts, setCounts] = useState({});
    const [paymentStatusCounts, setPaymentStatusCounts] = useState({ success: 0, pending: 0, failed: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadCounts = async () => {
            try {
                const [events, sermons, prayerRequests, appointments, partners, payments] = await Promise.all([
                    fetch(`${import.meta.env.VITE_API_URL}/events`).then((r) => r.json()),
                    fetch(`${import.meta.env.VITE_API_URL}/sermon`).then((r) => r.json()),
                    adminFetch("/prayer-request").then((r) => r.json()),
                    adminFetch("/contact").then((r) => r.json()),
                    adminFetch("/partnership").then((r) => r.json()),
                    adminFetch("/payments").then((r) => r.json()),
                ]);

                const paymentRows = payments.result || [];
                const statusCounts = { success: 0, pending: 0, failed: 0 };
                paymentRows.forEach((p) => {
                    if (statusCounts[p.payment_status] !== undefined) {
                        statusCounts[p.payment_status] += 1;
                    } else {
                        statusCounts.pending += 1;
                    }
                });
                setPaymentStatusCounts(statusCounts);

                setCounts({
                    events: events.result?.length || 0,
                    sermons: sermons.result?.length || 0,
                    prayerRequests: prayerRequests.result?.length || 0,
                    appointments: appointments.result?.length || 0,
                    partners: partners.result?.length || 0,
                    payments: paymentRows.length,
                });
            } catch (err) {
                console.error("failed to load dashboard counts:", err);
            } finally {
                setLoading(false);
            }
        };
        loadCounts();
    }, []);

    const barData = [
        { label: "Events", value: counts.events || 0 },
        { label: "Sermons", value: counts.sermons || 0 },
        { label: "Prayer Requests", value: counts.prayerRequests || 0 },
        { label: "Appointments", value: counts.appointments || 0 },
        { label: "Partners", value: counts.partners || 0 },
        { label: "Payments", value: counts.payments || 0 },
    ];

    const donutSegments = [
        { label: "Success", value: paymentStatusCounts.success, color: "#93BF20" },
        { label: "Pending", value: paymentStatusCounts.pending, color: "#94A3B8" },
        { label: "Failed", value: paymentStatusCounts.failed, color: "#DC2626" },
    ];

    return (
        <div>
            <h1 className="font-display text-2xl font-semibold text-ink mb-1">Overview</h1>
            <p className="text-ink/50 text-sm mb-6">What's happening across the church right now.</p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <StatCard label="Total Events" value={counts.events} loading={loading} icon="events" />
                <StatCard label="Total Sermons" value={counts.sermons} loading={loading} icon="sermons" />
                <StatCard label="Prayer Requests" value={counts.prayerRequests} loading={loading} icon="prayer" />
                <StatCard label="Appointment Bookings" value={counts.appointments} loading={loading} icon="appointments" />
                <StatCard label="Partners" value={counts.partners} loading={loading} icon="partners" />
                <StatCard label="Payments Recorded" value={counts.payments} loading={loading} icon="payments" />
            </div>

            {!loading && (
                <div className="grid lg:grid-cols-2 gap-6">
                    <BarChart data={barData} />
                    <Donut segments={donutSegments} />
                </div>
            )}
        </div>
    );
};

export default AdminDashboardHome;