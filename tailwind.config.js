/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        base:    '#0B1220',
        surface: '#111A2C',
        card:    '#182238',
        muted:   '#233252',
        accent:  '#C6F135',
        'accent-dark': '#9FCB1F',
        court:   '#2FB8E0',
        positive: '#4ADE80',
        negative: '#F87171',
        warning:  '#FBBF24',
        primary:   '#F5F7FA',
        secondary: '#8E9BB5',
        tertiary:  '#4B5268',
        tier: {
          finals:   '#C6F135',
          major:    '#FF4D6D',
          p1:       '#FF8A3D',
          p2:       '#FFC93D',
          platinum: '#D7DEE8',
          gold:     '#E8B93F',
          silver:   '#B9C4D0',
          bronze:   '#C97B4A',
          other:    '#8E9BB5',
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
        '4xl': '32px',
      },
      boxShadow: {
        'accent': '0 8px 32px rgba(198, 241, 53, 0.25)',
        'card':   '0 2px 12px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
}
