import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";

const AdminLogin = () => {
    const { login } = useAdminAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await login(form.email, form.password);
            navigate("/admin/dashboard");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-ink px-6">
            <form onSubmit={handleSubmit} className="bg-paper rounded-2xl p-8 w-full max-w-sm">
                <h1 className="font-display text-2xl font-semibold text-ink mb-6">Admin Login</h1>

                <label className="block text-sm text-ink/60 mb-1">Email</label>
                <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    className="w-full border border-ink/15 rounded-lg px-4 py-2.5 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-brand/40"
                />

                <label className="block text-sm text-ink/60 mb-1">Password</label>
                <input
                    type="password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    required
                    className="w-full border border-ink/15 rounded-lg px-4 py-2.5 text-sm mb-6 focus:outline-none focus:ring-2 focus:ring-brand/40"
                />

                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-brand text-paper px-6 py-3 rounded-full font-medium hover:brightness-110 transition disabled:opacity-50"
                >
                    {loading ? "Signing in…" : "Sign In"}
                </button>
            </form>
        </div>
    );
};

export default AdminLogin;