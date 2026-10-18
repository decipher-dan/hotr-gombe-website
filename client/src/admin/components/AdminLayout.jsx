import { Link, Outlet, useLocation } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";

const navItems = [
    { label: "Dashboard", path: "/admin/dashboard" },
    { label: "Events", path: "/admin/dashboard/events" },
    { label: "Sermons", path: "/admin/dashboard/sermons" },
    { label: "First-Timers", path: "/admin/dashboard/first-timers" },
    { label: "Prayer Requests", path: "/admin/dashboard/prayer-requests" },
    { label: "Appointments", path: "/admin/dashboard/appointments" },
    { label: "Partners & Payments", path: "/admin/dashboard/partners" },
];

const AdminLayout = () => {
    const { logout } = useAdminAuth();
    const location = useLocation();
    return (
        <div className="h-screen flex bg-paper overflow-hidden">
            <aside className="w-64 bg-ink text-paper flex flex-col shrink-0 h-screen">
                <div className="px-6 py-6 font-display text-lg font-semibold border-b border-paper/10">HOTR Admin</div>
                <nav className="flex-1 py-4 overflow-y-auto">
                    {navItems.map((item) => (
                        <Link key={item.path} to={item.path}
                            className={`block px-6 py-3 text-sm transition ${
                                location.pathname === item.path
                                    ? "bg-paper/10 text-brand font-medium"
                                    : "text-paper/70 hover:text-paper hover:bg-paper/5"
                            }`}>
                            {item.label}
                        </Link>
                    ))}
                </nav>
                <button onClick={logout} className="m-4 px-4 py-2.5 text-sm rounded-lg border border-paper/20 text-paper/70 hover:text-paper hover:border-paper/40 transition">
                    Log Out
                </button>
            </aside>
            <main className="flex-1 p-8 overflow-y-auto h-screen">
                <Outlet />
            </main>
        </div>
    );
};
export default AdminLayout;
