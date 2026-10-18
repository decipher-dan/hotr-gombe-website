import { useState, useEffect } from "react";
import Skeleton from "./Skeleton";

const ContactComponent = () => {
    const [slots, setSlots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        phone_number: '',
        message: '',
        appointment_date: '',
        appointment_time: ''
    });
    const [bookedTimes, setBookedTimes] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [status, setStatus] = useState(null); // 'success' | 'error' | null
    const [statusMessage, setStatusMessage] = useState('');

    useEffect(() => {
        const fetchSlots = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/contact/slots`);

                if (!response.ok) {
                    throw new Error(`response failed with status ${response.status}`);
                }

                const data = await response.json();
                setSlots(data.slots);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSlots();
    }, []);

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
            const response = await fetch(`${import.meta.env.VITE_API_URL}/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setStatus('success');
                setStatusMessage('Your appointment has been booked!');
                setFormData({
                    name: '',
                    phone_number: '',
                    message: '',
                    appointment_date: '',
                    appointment_time: ''
                });
                setBookedTimes([]);
            } else {
                const data = await response.json().catch(() => ({}));
                setStatusMessage(data.error || 'Something went wrong. Please try again.');
                setStatus('error');
            }
        } catch (err) {
            setStatusMessage('Could not reach the server. Please try again.');
            setStatus('error');
        } finally {
            setSubmitting(false);
        }
    };

    useEffect(() => {
        if (!formData.appointment_date) {
            return;
        }

        const fetchAvailability = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/contact/availability?date=${formData.appointment_date}`
                );

                if (!response.ok) {
                    throw new Error(`request failed with status ${response.status}`);
                }

                const data = await response.json();
                setBookedTimes(data.result);
            } catch (err) {
                console.error(err);
            }
        };

        fetchAvailability();
    }, [formData.appointment_date]);

    const convertTo24Hour = (time12h) => {
        const [time, modifier] = time12h.split(' ');
        let [hours, minutes] = time.split(':');

        if (hours === '12') {
            hours = '00';
        }
        if (modifier === 'PM') {
            hours = String(Number(hours) + 12);
        }

        return `${hours.padStart(2, '0')}:${minutes}:00`;
    };

    // Updated inputClass styling to match House on the Rock colorway focus rings
    const inputClass =
        "w-full px-4 py-3 rounded-xl border border-gray-200 text-hotr-dark placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-hotr-blue/80 transition shadow-sm";

    if (loading) {
        return (
            <section className="max-w-xl mx-auto px-6 py-24 space-y-4">
                <Skeleton className="h-8 w-2/3 mx-auto" />
                <Skeleton className="h-40 w-full mt-8" />
            </section>
        );
    }

    if (error) {
        return (
            <div className="max-w-xl mx-auto px-6 py-24 text-center text-red-600 font-medium">
                Something went wrong: {error}
            </div>
        );
    }

    return (
        <section className="max-w-xl mx-auto px-6 py-24">
            <h1 className="text-3xl md:text-4xl font-bold text-hotr-blue text-center mb-2">
                Book an Appointment
            </h1>
            <p className="text-gray-500 text-center mb-10">
                Choose a weekday between 10am and 3pm to meet with a pastor.
            </p>

            {status === 'success' && (
                <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm text-center font-medium">
                    {statusMessage}
                </div>
            )}

            {status === 'error' && (
                <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm text-center font-medium">
                    {statusMessage}
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-xl shadow-hotr-blue/5 p-8 space-y-5">
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
                    type="date"
                    name="appointment_date"
                    value={formData.appointment_date}
                    onChange={handleChange}
                    required
                    className={inputClass}
                />

                <select
                    name="appointment_time"
                    value={formData.appointment_time}
                    onChange={handleChange}
                    required
                    disabled={!formData.appointment_date}
                    className={`${inputClass} disabled:bg-gray-50 disabled:text-gray-400`}
                >
                    <option value="">
                        {formData.appointment_date ? "Select a time" : "Pick a date first"}
                    </option>
                    {slots.map((slot, index) => {
                        const isBooked = bookedTimes.includes(convertTo24Hour(slot));
                        return (
                            <option key={index} value={slot} disabled={isBooked}>
                                {isBooked ? `${slot} — Booked` : slot}
                            </option>
                        );
                    })}
                </select>

                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="What would you like to talk about? (optional)"
                    rows={4}
                    className={inputClass}
                />

                {/* Updated Action Button highlighting the core House on the Rock primary branding colors */}
                <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-hotr-blue text-white py-3 rounded-xl font-semibold hover:bg-hotr-blue/90 border border-transparent active:scale-[0.99] transition-all duration-200 shadow-md shadow-hotr-blue/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                    {submitting ? 'Booking...' : 'Book Appointment'}
                </button>
            </form>
        </section>
    );
};

export default ContactComponent;
