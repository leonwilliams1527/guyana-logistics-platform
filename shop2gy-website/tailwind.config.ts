import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        shopGreen: '#00A651',
        shopNavy: '#003366',
        shopGold: '#F4B400',
        softGray: '#F5F7FA'
      },
      boxShadow: {
        card: '0 20px 60px rgba(0, 51, 102, 0.10)'
      }
    },
  },
  plugins: [],
}
export default config
