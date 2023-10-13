/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
        extend: {
            "colors": {
                "chatOrange": {
                    1: "#FFF4E0",
                    2: "#FFE2AD",
                    3: "#FFBF4B",
                    4: "#FFAB10",
                    5: "#F29C00",
                    6: "#2C2C2C",
                }
            },
            "screens": {
                "sm": "450px",
                "md": "850px"
            },
            "fontSize": {
                "xxs": "0.625rem"
            },
        },
    },
    plugins: [],
}
