import React, { useEffect, useState } from "react";

const Countdown = ({ initialTime }) => {
    const [time, setTime] = useState(initialTime);

    useEffect(() => {
        const timer = setInterval(() => {
            setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (time) => {
        const days = String(Math.floor(time / (3600 * 24)));
        const hours = String(Math.floor((time % (3600 * 24)) / 3600)).padStart(
            2,
            "0"
        );
        const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, "0");
        const seconds = String(time % 60).padStart(2, "0");
        return {
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
        };
    };

    return (
        <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
            <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                <span className="countdown font-mono text-5xl">
                    <span
                        style={{ "--value": formatTime(time)["days"] }}
                    ></span>
                </span>
                days
            </div>
            <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                <span className="countdown font-mono text-5xl">
                    <span
                        style={{ "--value": formatTime(time)["hours"] }}
                    ></span>
                </span>
                hours
            </div>
            <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                <span className="countdown font-mono text-5xl">
                    <span
                        style={{ "--value": formatTime(time)["minutes"] }}
                    ></span>
                </span>
                min
            </div>
            <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                <span className="countdown font-mono text-5xl">
                    <span
                        style={{ "--value": formatTime(time)["seconds"] }}
                    ></span>
                </span>
                sec
            </div>
        </div>
    );
};

export default Countdown;
