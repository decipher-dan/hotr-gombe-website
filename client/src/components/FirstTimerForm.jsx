import { useState } from 'react';

const FirstTimerForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone_number: '',
        address: '',
        email: '',
        reached_out: '',
        sex: '',
        joining_church: '',
        prayer_request: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [status, setStatus] = useState(null); // 'success' | 'error' | null
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setStatus(null);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/first-timer`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus('success');
                setFormData({
                    name: '',
                    phone_number: '',
                    address: '',
                    email: '',
                    reached_out: '',
                    sex: '',
                    joining_church: '',
                    prayer_request: ''
                });
            } else {
                const data = await response.json().catch(() => ({}));
                setErrorMessage(data.error || 'Something went wrong. Please try again.');
                setStatus('error');
            }
        } catch (err) {
            setErrorMessage('Could not reach the server. Please try again.');
            setStatus('error');
        } finally {
            setSubmitting(false);
        }
    };

    const inputClass =
        "w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/80 transition";

    return (
        <section className="max-w-xl mx-auto px-6 py-24">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-2">
                We'd Love to Meet You
            </h1>
            <p className="text-gray-500 text-center mb-10">
                Fill in your details and we'll be in touch soon.
            </p>

            {status === 'success' && (
                <div className="mb-6 p-4 rounded-xl bg-green-50 text-green-700 text-sm text-center">
                    Thanks! We've received your details and will reach out soon.
                </div>
            )}

            {status === 'error' && (
                <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-700 text-sm text-center">
                    {errorMessage}
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-8 space-y-5">
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full name"
                    required
                    className={inputClass}
                />
                <input
                    type="tel"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    placeholder="Phone number"
                    required
                    className={inputClass}
                />
                <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Address"
                    required
                    className={inputClass}
                />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                    className={inputClass}
                />

                <select
                    name="reached_out"
                    value={formData.reached_out}
                    onChange={handleChange}
                    required
                    className={inputClass}
                >
                    <option value="">How should we reach out?</option>
                    <option value="phone call">Phone call</option>
                    <option value="email">Email</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="home visit">Home visit</option>
                </select>

                <select
                    name="sex"
                    value={formData.sex}
                    onChange={handleChange}
                    required
                    className={inputClass}
                >
                    <option value="">Sex</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>

                <select
                    name="joining_church"
                    value={formData.joining_church}
                    onChange={handleChange}
                    required
                    className={inputClass}
                >
                    <option value="">Are you joining the church?</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                    <option value="maybe">Maybe</option>
                </select>

                <textarea
                    name="prayer_request"
                    value={formData.prayer_request}
                    onChange={handleChange}
                    placeholder="Prayer request (optional)"
                    rows={4}
                    className={inputClass}
                />

                <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-gray-900 text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {submitting ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </section>
    );
};

export default FirstTimerForm;