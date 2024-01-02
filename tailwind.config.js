const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#6750a4',
        'primary-light': '#e9ddff',
        'primary-lighter': '#e9ddff',
        'primary-dark': '#4c2889',
        'primary-darker': '#22005d',
        secondary: '#67fbd0',
        'secondary-dark': '#44deb5',
        'secondary-darker': '#00876b',
        tertiary: 'rgb(234 179 8)',
        'accent-1': '#002118',
        'accent-2': '#0a0c0c',
        'accent-3': '#00513f',
        'accent-4': '#006b54',
        'accent-5': '#00876b',
        'accent-6': '#00a482',
        'accent-7': '#0ac19a',
        'accent-8': '#44deb5',
        'accent-9': '#67fbd0',
        'accent-0': '#ffffff',
      },
      textColor: {
        primary: '#6750a4',
        'primary-dark': '#4c2889',
        'primary-light': '#cfbcff',
        base: '#1C1B1E',
        'base-light': '#e9ddff',
      },
      fontFamily: {
        geist: ['var(--font-geist-sans)'],
        sans: ['museo-sans', 'sans-serif'],
        rounded: ['museo-sans-rounded', 'sans-serif'],
        script: ['eldwin-script', 'sans-serif'],
        informal: ['laila', 'sans-serif'],
      },
      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        blink: {
          '0%': { opacity: 0.2 },
          '20%': { opacity: 1 },
          '100% ': { opacity: 0.2 },
        },
      },
      boxShadow: {
        'outline-normal': '0 0 0 2px var(--accent-2)',
      },
      animation: {
        fadeIn: 'fadeIn .3s ease-in-out',
        carousel: 'marquee 60s linear infinite',
        blink: 'blink 1.4s both infinite',
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [
    require('@tailwindcss/container-queries'),
    require('@tailwindcss/typography'),
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          'animation-delay': (value) => {
            return {
              'animation-delay': value,
            };
          },
        },
        {
          values: theme('transitionDelay'),
        },
      );
    }),
  ],
};
