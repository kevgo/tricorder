/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: { 900: '#0A0E27', 800: '#111638', 700: '#1A1A2E' },
        error: '#FF4757',
        warning: '#FFA502',
        success: '#2ED573',
        ai: { from: '#7C5CFC', to: '#00D2FF' },
        code: { bg: '#1E1E2E', text: '#E4E4E7' }
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        code: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
        body: ['Inter', 'sans-serif']
      }
    }
  },
  plugins: []
}
