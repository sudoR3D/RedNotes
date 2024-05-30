import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        'xm': '480px',
      },
      fontFamily: {
        Kayak: ["Kayak", 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config

