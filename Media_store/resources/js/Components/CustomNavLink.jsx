import React from "react";

const CustomNavLink = ({
    active = false,
    className = "",
    children,
    ...props
}) => {
    return (
        <div
            {...props}
            className={
                "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none " +
                (active
                    ? "border-rose-400 dark:border-rose-600 text-gray-900 dark:text-gray-100 focus:border-rose-700 "
                    : "border-transparent text-gray-500 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-700 focus:text-gray-700 dark:focus:text-gray-300 focus:border-gray-300 dark:focus:border-gray-700 ") +
                className
            }
        >
            {children}
        </div>
    );
};

export default CustomNavLink;
