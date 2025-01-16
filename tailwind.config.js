/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        'gmarket': ['GmarketSansMedium', 'sans-serif']
      },
      keyframes: {
        'fade-slide-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        }
      },
      animation: {
        'fade-slide-up': 'fade-slide-up 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        blink: 'blink 1s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
