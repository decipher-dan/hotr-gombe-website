import { useEffect, useState } from "react";
import { adminFetch } from "../utils/adminApi";

const AdminPartners = () => {
    const [partners, setPartners] = useState([]);
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const [partnersRes, paymentsRes] = await Promise.all([
                    adminFetch("/partnership").then((r) => r.json()),
                    adminFetch("/payments").then((r) => r.json()),
                ]);
                setPartners(partnersRes.result || []);
                setPayments(paymentsRes.result || []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const paymentsForPartner = (partnerId) =>
        payments.filter((p) => p.partnership_id === partnerId);

    if (loading) return <p className="text-ink/50">Loading…</p>;

    return (
        <div>
            <h1 className="font-display text-2xl font-semibold text-ink mb-6">Partners & Payments</h1>

            {partners.length === 0 ? (
                <p className="text-ink/50">No partners registered yet.</p>
            ) : (
                <div className="space-y-4">
                    {partners.map((partner) => {
                        const partnerPayments = paymentsForPartner(partner.id);
                        return (
                            <div key={partner.id} className="bg-white rounded-xl border border-ink/10 p-5">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <h3 className="font-medium text-ink">{partner.full_name}</h3>
                                        <p className="text-ink/50 text-sm">{partner.email} · {partner.phone_number}</p>
                                        <p className="text-ink/40 text-xs mt-0.5 capitalize">{partner.frequency} partner</p>
                                    </div>
                                    <span className="text-xs bg-brand/10 text-brand px-2.5 py-1 rounded-full">
                                        {partnerPayments.length} payment{partnerPayments.length === 1 ? "" : "s"}
                                    </span>
                                </div>

                                {partnerPayments.length > 0 && (
                                    <table className="w-full text-sm mt-2 border-t border-ink/5 pt-2">
                                        <thead className="text-ink/40 text-left">
                                            <tr>
                                                <th className="py-1 pr-4">Amount</th>
                                                <th className="py-1 pr-4">Type</th>
                                                <th className="py-1 pr-4">Status</th>
                                                <th className="py-1">Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {partnerPayments.map((p) => (
                                                <tr key={p.id} className="border-t border-ink/5">
                                                    <td className="py-1.5 pr-4">₦{Number(p.amount).toLocaleString()}</td>
                                                    <td className="py-1.5 pr-4 capitalize">{p.payment_type}</td>
                                                    <td className="py-1.5 pr-4 capitalize">
                                                        <span className={p.payment_status === "success" ? "text-hotr-green" : "text-ink/50"}>
                                                            {p.payment_status}
                                                        </span>
                                                    </td>
                                                    <td className="py-1.5">{new Date(p.created_at).toLocaleDateString()}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default AdminPartners;