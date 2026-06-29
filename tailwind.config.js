/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          dark: '#03001e',
          neonCyan: '#00f2fe',
          neonPurple: '#7f00ff',
          neonPink: '#ec008c',
          bg: '#05050f',
          grid: '#11112b',
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 15s linear infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      boxShadow: {
        'neon-cyan': '0 0 10px rgba(0, 242, 254, 0.6), 0 0 25px rgba(0, 242, 254, 0.3)',
        'neon-purple': '0 0 10px rgba(127, 0, 255, 0.6), 0 0 25px rgba(127, 0, 255, 0.3)',
        'neon-pink': '0 0 10px rgba(236, 0, 140, 0.6), 0 0 25px rgba(236, 0, 140, 0.3)',
      }
    },
  },
  plugins: [],
}
