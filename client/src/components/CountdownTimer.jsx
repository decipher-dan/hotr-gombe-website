import { useState, useEffect } from "react";

const getTimeLeft = (targetDate) => {
    const total = new Date(targetDate).getTime() - new Date().getTime();
    if (total <= 0) return null;

    return {
        days: Math.floor(total / (1000 * 60 * 60 * 24)),
        hours: Math.floor((total / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((total / (1000 * 60)) % 60),
        seconds: Math.floor((total / 1000) % 60),
    };
};

const CountdownTimer = ({ targetDate }) => {
    const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(targetDate));

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(getTimeLeft(targetDate));
        }, 1000);
        return () => clearInterval(timer);
    }, [targetDate]);

    if (!timeLeft) {
        return <p className="text-gold font-medium">Happening now</p>;
    }

    const units = [
        { label: "Days", value: timeLeft.days },
        { label: "Hrs", value: timeLeft.hours },
        { label: "Min", value: timeLeft.minutes },
        { label: "Sec", value: timeLeft.seconds },
    ];

    return (
        <div className="flex gap-4">
            {units.map((unit) => (
                <div key={unit.label} className="flex flex-col items-center">
                    <span className="font-display text-3xl md:text-4xl font-semibold text-gold tabular-nums">
                        {String(unit.value).padStart(2, "0")}
                    </span>
                    <span className="text-xs uppercase tracking-wider text-paper/50 mt-1">
                        {unit.label}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default CountdownTimer;