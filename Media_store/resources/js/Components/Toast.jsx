import React from "react";

const Toast = ({ messages = [{}] }) => {
    return (
        <div className="toast toast-top toast-center z-10">
            {messages.length > 0 &&
                messages.map((message, index) => (
                    <div key={index} className={`alert ${message.type}`}>
                        <span className="text-white font-semibold">
                            {message.message}
                        </span>
                    </div>
                ))}
        </div>
    );
};

export default Toast;
