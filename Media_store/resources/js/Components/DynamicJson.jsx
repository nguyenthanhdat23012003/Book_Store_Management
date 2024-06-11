import React, { useState } from "react";
import TextInput from "./TextInput";
import InputLabel from "./InputLabel";

const DynamicJson = ({
    keys = [],
    values = [],
    onAdded = () => {},
    inputID,
}) => {
    const freshObj = () => {
        const obj = {};
        keys.forEach((key) => {
            obj[key] = "";
        });

        return obj;
    };

    const [object, setObject] = useState(freshObj());

    const checkObjectValid = () => {
        let valid = true;
        keys.forEach((key) => {
            if (!object[key]) {
                valid = false;
            }
        });

        return valid;
    };

    return (
        <div className="dropdown dropdown-end w-full">
            <TextInput
                tabIndex={0}
                role="button"
                id={inputID}
                value={JSON.stringify(values).toString()}
                type="text"
                className="w-full"
                placeholder="Add..."
                readOnly
            />
            <div
                tabIndex={0}
                className="dropdown-content z-[1] flex flex-col gap-2 p-4 shadow-lg w-full bg-white rounded-lg mt-2 overflow-auto"
            >
                {keys.map((key, index) => (
                    <div key={index} className="mx-2">
                        <div className="block mb-2">
                            <InputLabel htmlFor={key} value={key} />
                        </div>
                        <TextInput
                            id={key}
                            value={object[key]}
                            className="w-full"
                            onChange={(e) =>
                                setObject({
                                    ...object,
                                    [key]: e.target.value,
                                })
                            }
                        />
                    </div>
                ))}
                <button
                    className="btn btn-outline btn-success rounded-lg self-end w-32 mx-2"
                    onClick={() => {
                        onAdded(object);
                        setObject(freshObj());
                    }}
                    disabled={!checkObjectValid()}
                >
                    Add
                </button>
            </div>
        </div>
    );
};

export default DynamicJson;
