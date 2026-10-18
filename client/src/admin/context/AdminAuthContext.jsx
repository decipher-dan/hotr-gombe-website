import { createContext, useContext, useState } from "react";

const AdminAuthContext = createContext(null);

export const AdminAuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem("admin_token"));

    const login = async (email, password) => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (!res.ok) {
            const data = await res.json().catch(() => ({}));
            throw new Error(data.error || "login failed");
        }

        const data = await res.json();
        localStorage.setItem("admin_token", data.token);
        setToken(data.token);
    };

    const logout = () => {
        localStorage.removeItem("admin_token");
        setToken(null);
    };

    return (
        <AdminAuthContext.Provider value={{ token, isAuthenticated: !!token, login, logout }}>
            {children}
        </AdminAuthContext.Provider>
    );
};

export const useAdminAuth = () => {
    const ctx = useContext(AdminAuthContext);
    if (!ctx) throw new Error("useAdminAuth must be used inside AdminAuthProvider");
    return ctx;
};