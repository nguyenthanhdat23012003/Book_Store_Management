import {
    faChevronLeft,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";

const Carousel = ({
    children: slides,
    autoSlide = false,
    autoSlideInterval = 3000,
    eleEachSlide = 1,
}) => {
    const [curr, setCurr] = React.useState(0);

    const next = () => {
        setCurr((curr + 1) % slides.length);
    };

    const prev = () => {
        setCurr((curr - 1 + slides.length) % slides.length);
    };

    useEffect(() => {
        if (!autoSlide) return;
        const interval = setInterval(next, autoSlideInterval);
        return () => clearInterval(interval);
    }, [curr]);

    return (
        <div className="relative overflow-hidden w-full max-w-xl">
            <div
                className="flex transition-transform ease-out duration-500"
                style={{
                    transform: `translateX(-${(curr * 100) / eleEachSlide}%)`,
                }}
            >
                {slides}
            </div>
            <div className="absolute inset-0 flex items-center justify-between">
                <button
                    className="rounded-full hover:bg-black/10"
                    onClick={() => prev()}
                >
                    <FontAwesomeIcon
                        icon={faChevronLeft}
                        className="w-8 py-4"
                    />
                </button>
                <button
                    className="rounded-full hover:bg-black/10"
                    onClick={() => next()}
                >
                    <FontAwesomeIcon
                        icon={faChevronRight}
                        className="w-8 py-4"
                    />
                </button>
            </div>
            <div className="absolute bottom-16 inset-x-0">
                <div className="flex items-center justify-center gap-2">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            className={`rounded-full ${
                                curr === index
                                    ? "bg-white w-4 h-4"
                                    : "w-2 h-2 bg-white/50"
                            }`}
                            onClick={() => setCurr(index)}
                        ></button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Carousel;
