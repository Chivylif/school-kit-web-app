/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        // Colors from screenshot
        primary: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        teal: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        dark: {
          teal: '#0f4c3a',
          'teal-light': '#1a5f4a',
          'teal-gradient': 'linear-gradient(135deg, #0f4c3a 0%, #1a5f4a 100%)',
        },
        accent: {
          green: '#10b981',
          'green-bright': '#22c55e',
          orange: '#f59e0b',
          'orange-yellow': '#fbbf24',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
      backgroundImage: {
        'gradient-teal': 'linear-gradient(135deg, #0f4c3a 0%, #1a5f4a 100%)',
      },
    },
  },
  plugins: [],
};
