import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class",

    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: 0 },
                    '100%': { opacity: 1 },
                },
                fadeOut: {
                    '0%': { opacity: 1 },
                    '100%': { opacity: 0 },
                },
                jumpIn: {
                    '0%': { transform: 'scale(0.5)', opacity: 0 },
                    '50%': { transform: 'scale(1.2)', opacity: 1 },
                    '100%': { transform: 'scale(1)' },
                },
                jumpOut: {
                    '0%': { transform: 'scale(1)', opacity: 1 },
                    '50%': { transform: 'scale(1.2)', opacity: 1 },
                    '100%': { transform: 'scale(0.5)', opacity: 0 },
                },
                zoomIn: {
                    '0%': { transform: 'scale(0.5)', opacity: 0 },
                    '100%': { transform: 'scale(1)', opacity: 1 },
                },
                zoomOut: {
                    '0%': { transform: 'scale(1)', opacity: 1 },
                    '100%': { transform: 'scale(0.5)', opacity: 0 },
                },
                flyIn: {
                    '0%': { transform: 'translateX(-100%)', opacity: 0 },
                    '100%': { transform: 'translateX(0)', opacity: 1 },
                },
                flyOut: {
                    '0%': { transform: 'translateX(0)', opacity: 1 },
                    '100%': { transform: 'translateX(100%)', opacity: 0 },
                },
                floatIn: {
                    '0%': { transform: 'translateY(50%)', opacity: 0 },
                    '100%': { transform: 'translateY(0)', opacity: 1 },
                },
                floatOut: {
                    '0%': { transform: 'translateY(0)', opacity: 1 },
                    '100%': { transform: 'translateY(50%)', opacity: 0 },
                },
                splitIn: {
                    '0%': { transform: 'scaleY(0.5)', opacity: 0 },
                    '100%': { transform: 'scaleY(1)', opacity: 1 },
                },
                splitOut: {
                    '0%': { transform: 'scaleY(1)', opacity: 1 },
                    '100%': { transform: 'scaleY(0)', opacity: 0 },
                },
                wiggle: {
                    '0%, 100%': { transform: 'rotate(-3deg)' },
                    '50%': { transform: 'rotate(3deg)' },
                },
                loopScroll: {
                    from: { transform: "translateX(0)" },
                    to: { transform: "translateX(-100%)" },
                },
                shake: {
                    '0%, 100%': { transform: 'translateX(0)' },
                    '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-10px)' },
                    '20%, 40%, 60%, 80%': { transform: 'translateX(10px)' },
                },

            },
            animation: {
                fadeIn: 'fadeIn 1s ease-in-out forwards',
                fadeOut: 'fadeOut 1s ease-in-out forwards',
                jumpIn: 'jumpIn 1s ease-in-out forwards',
                jumpOut: 'jumpOut 1s ease-in-out forwards',
                zoomIn: 'zoomIn 0.5s ease-in-out forwards',
                zoomOut: 'zoomOut 0.5s ease-in-out forwards',
                flyIn: 'flyIn 1s ease-in-out forwards',
                flyOut: 'flyOut 1s ease-in-out forwards',
                floatIn: 'floatIn 1s ease-in-out forwards',
                floatOut: 'floatOut 1s ease-in-out forwards',
                splitIn: 'splitIn 0.5s ease-in-out forwards',
                splitOut: 'splitOut 0.5s ease-in-out forwards',
                wiggle: 'wiggle 0.5s ease-in-out infinite',
                loopScroll: 'loopScroll 30s linear infinite',
                shake: 'shake 5s ease-in-out infinite',
            },
        },
    },

    plugins: [forms, require("daisyui")],

    daisyui: {
        themes: [
            "light",
            "dark",
            "cupcake",
            "bumblebee",
            "emerald",
            "corporate",
            "synthwave",
            "retro",
            "cyberpunk",
            "valentine",
            "halloween",
            "garden",
            "forest",
            "aqua",
            "lofi",
            "pastel",
            "fantasy",
            "wireframe",
            "black",
            "luxury",
            "dracula",
            "cmyk",
            "autumn",
            "business",
            "acid",
            "lemonade",
            "night",
            "coffee",
            "winter",
            "dim",
            "nord",
            "sunset",
        ],
        darkTheme: "valentine", // name of one of the included themes for dark mode
    },
};
