/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      spacing: {
        '18': '4.5rem',
      },
      colors: {
        // Scientific ecological palette
        forest: {
          50: '#f0f7f4',
          100: '#dcf0e6',
          200: '#b9e1d0',
          300: '#85ccb3',
          400: '#4fb090',
          500: '#2d8f6f',
          600: '#1f7359',
          700: '#1a5c48',
          800: '#164a3b',
          900: '#133d31',
          950: '#0a221b',
        },
        glacier: {
          50: '#f0f7fb',
          100: '#dcecf5',
          200: '#b9d9eb',
          300: '#85c0dc',
          400: '#4fa0c9',
          500: '#2d7fb0',
          600: '#1f6691',
          700: '#1a5275',
          800: '#164360',
          900: '#133850',
          950: '#0a1f2e',
        },
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        earth: {
          50: '#faf8f5',
          100: '#f5f0e8',
          200: '#ebe2d3',
          300: '#ddceb6',
          400: '#c9b08e',
          500: '#b09068',
          600: '#95724d',
          700: '#785a3e',
          800: '#624a34',
          900: '#523e2e',
          950: '#2f231a',
        },
        alert: {
          amber: '#f59e0b',
          red: '#ef4444',
          orange: '#f97316',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232d8f6f' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
