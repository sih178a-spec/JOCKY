/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyber: {
          dark: '#070b14',
          card: '#0d1527',
          cardHover: '#131e38',
          border: '#1e2d4d',
          neonCyan: '#00f0ff',
          neonEmerald: '#10b981',
          neonGreen: '#00ff88',
          neonPurple: '#a855f7',
          neonAmber: '#f59e0b',
          neonRose: '#f43f5e',
          textMuted: '#94a3b8',
        }
      },
      fontFamily: {
        mono: ['Fira Code', 'Cascadia Code', 'JetBrains Mono', 'Consolas', 'monospace'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'neon-cyan': '0 0 20px -5px rgba(0, 240, 255, 0.3)',
        'neon-green': '0 0 20px -5px rgba(0, 255, 136, 0.3)',
        'neon-purple': '0 0 20px -5px rgba(168, 85, 247, 0.3)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scanline': 'scanline 8s linear infinite',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        }
      }
    },
  },
  plugins: [],
}
