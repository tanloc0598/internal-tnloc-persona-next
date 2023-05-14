/** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

module.exports = {
    // prefix: 'tw-',
    // purge: {
    //     enabled: true,
    //     content: ['./src/**/*.tsx'],
    //     options: {
    //         safelist: ['dark'], //specific classes
    //     },
    // },
    future: {
        // removeDeprecatedGapUtilities: true,
        // purgeLayersByDefault: true,
    },
    // darkMode: "class",
    darkMode: ['class', '[data-mode="dark"]'],
    content: [
        "./app/**/*.{js,ts,jsx,tsx,md}", // Note the addition of the `app` directory.
        "./pages/**/*.{js,ts,jsx,tsx,md}",
        "./components/**/*.{js,ts,jsx,tsx,md}",
        "./content/**/*.{js,ts,jsx,tsx,md,mdx}",
    ],
    theme: {
        fontFamily: {
            sans: ['IBMPlexMono'],
            serif: ['IBMPlexMono'],
            mono: ['IBMPlexMono'],
            display: ['IBMPlexMono'],
            body: ['IBMPlexMono'],
        },
        extend: {
            colors: {
                'main-color': 'rgb(247, 208, 12)',
            },
            typography: (theme) => ({
                dark: {
                    css: {
                        color: 'white',
                    },
                },
            }),
        },
    },
    variants: {},
    plugins: [require('@tailwindcss/typography')],
}
