const BASE_URL = import.meta.env.VITE_API_URL;

export const adminFetch = async (path, options = {}) => {
    const token = localStorage.getItem("admin_token");

    const res = await fetch(`${BASE_URL}${path}`, {
        ...options,
        headers: {
            ...(options.headers || {}),
            Authorization: `Bearer ${token}`,
        },
    });

    if (res.status === 401) {
        localStorage.removeItem("admin_token");
        window.location.href = "/admin/login";
        throw new Error("session expired");
    }

    return res;
};