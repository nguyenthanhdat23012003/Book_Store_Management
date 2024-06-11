import { forwardRef, useRef } from "react";

export default forwardRef(function Select(
    { className = "", children, ...props },
    ref
) {
    const input = ref ? ref : useRef();

    return (
        <select
            {...props}
            className={
                "border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm " +
                className
            }
            ref={input}
        >
            {children}
        </select>
    );
});
