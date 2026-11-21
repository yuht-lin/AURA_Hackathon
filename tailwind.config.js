/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#080c16",
        surface: "#0f172a",
        "surface-light": "#1e293b",
        cyan: {
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2",
        },
        shield: {
          safe: "#10b981",
          warning: "#f59e0b",
          danger: "#ef4444",
          critical: "#dc2626",
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 15px rgba(6, 182, 212, 0.4)' },
          '100%': { boxShadow: '0 0 30px rgba(6, 182, 212, 0.8)' },
        }
      }
    },
  },
  plugins: [],
};
