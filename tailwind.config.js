/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html','./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: { brand:{500:'#6366f1',600:'#4f46e5'}, accent:'#06b6d4', surface:'#0f172a', glow:'#818cf8' },
      boxShadow: { glow:'0 0 40px rgba(129,140,248,0.6)', glowSoft:'0 0 10px rgba(129,140,248,0.35)' }
    }
  },
  plugins: [],
}
