const colors = require('tailwindcss/colors');

module.exports = {
    purge: ['./src/**/*.html', './src/**/*.js'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                teal: colors.teal,
                fuchsia: colors.fuchsia,
                bluegray: colors.blueGray,
                lightblue: colors.lightBlue,
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
