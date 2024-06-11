import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

const NumberInput = ({ min = 1, value, max, onChangevalue = () => {} }) => {
    return (
        <div className="flex justify-between items-center w-32 mx-3 my-2">
            <button
                className="btn btn-outline border-none btn-primary rounded-sm px-2"
                onClick={() => {
                    onChangevalue(Math.max(min, value - 1));
                }}
            >
                <FontAwesomeIcon icon={faMinus} />
            </button>
            <input
                type="number"
                value={value}
                min={min}
                max={max}
                className="text-center w-20 py-3 border-none rounded-none"
                onChange={(e) => {
                    onChangevalue(Math.min(Math.max(e.target.value), max));
                }}
            />
            <button
                className="btn btn-outline border-none btn-accent rounded-sm px-2"
                onClick={() => {
                    onChangevalue(Math.min(value + 1, max));
                }}
            >
                <FontAwesomeIcon icon={faPlus} />
            </button>
        </div>
    );
};

export default NumberInput;
