import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}', // Scans all files in the `pages` directory
    './components/**/*.{js,ts,jsx,tsx}', // Scans all files in the `components` directory
    './app/**/*.{js,ts,jsx,tsx}', // For Next.js 13+ with the `app` directory
  ],
  theme: {
    extend: {
      colors: {
       airbnb: '#ff385c',
       'airbnbDark' : '#d50027',
      },
    },
  },
  plugins: [],
};

export default config;
