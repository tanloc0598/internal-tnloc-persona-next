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
  future: {
      // removeDeprecatedGapUtilities: true,
      // purgeLayersByDefault: true,
  },
  content: [
      "./app/**/*.{js,ts,jsx,tsx}", // Note the addition of the `app` directory.
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
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
      },
  },
  variants: {},
  plugins: [],
}
