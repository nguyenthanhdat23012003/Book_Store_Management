import React from "react";

const Rating = ({ rating = 5, size = "", onRate = () => {} }) => {
    return (
        <div className={`rating rating-${size}`}>
            <input
                type="radio"
                className="mask mask-star-2 bg-orange-400"
                onChange={() => onRate(1)}
                checked={rating >= 1}
            />
            <input
                type="radio"
                className="mask mask-star-2 bg-orange-400"
                onChange={() => onRate(2)}
                checked={rating >= 2}
            />
            <input
                type="radio"
                className="mask mask-star-2 bg-orange-400"
                onChange={() => onRate(3)}
                checked={rating >= 3}
            />
            <input
                type="radio"
                className="mask mask-star-2 bg-orange-400"
                onChange={() => onRate(4)}
                checked={rating >= 4}
            />
            <input
                type="radio"
                className="mask mask-star-2 bg-orange-400"
                onChange={() => onRate(5)}
                checked={rating == 5}
            />
        </div>
    );
};

export default Rating;
