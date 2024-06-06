import { forwardRef } from "react";

export default forwardRef(function TextInput(
    { className = "", children, ...props },
    ref
) {
    return (
        <textarea
            {...props}
            className={
                "border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm h-32 " +
                className
            }
        >
            {children}
        </textarea>
    );
});
