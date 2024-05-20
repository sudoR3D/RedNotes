import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        Kayak: ["Kayak"],
        FredokaOne: ["FredokaOne"],
      },
    },
  },
  plugins: [],
} satisfies Config

