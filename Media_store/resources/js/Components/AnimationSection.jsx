import React, { useRef, useEffect, useState } from "react";

const AnimationSection = ({ children, animation }) => {
    const [isVisible, setIsVisible] = useState(false);
    const domRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                setIsVisible(entry.isIntersecting);
            });
        });

        if (domRef.current) {
            observer.observe(domRef.current);
        }

        return () => {
            if (domRef.current) {
                observer.unobserve(domRef.current);
            }
        };
    }, []);

    return (
        <div
            ref={domRef}
            className={`transition-opacity duration-1000 ${
                isVisible ? `animate-${animation}` : ""
            }`}
        >
            {children}
        </div>
    );
};

export default AnimationSection;
