import type { Config } from 'tailwindcss'

// Tailwind 配置整理：
// 1. 将 fontFamily / animation / keyframes 等放入 theme.extend 保证生效
// 2. 修正动画命名拼写 (yelloFade -> yellowFade)
// 3. 保留原有阴影自定义
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      boxShadow: {
        sp: '0 3px 12px 0 rgba(255, 0, 0, 0.3)'
      },
      fontFamily: {
        sans: ['Avenir', 'Helvetica', 'Arial', 'sans-serif']
      },
      animation: {
        fade: 'yellowFade 3s ease-in-out'
      },
      keyframes: {
        yellowFade: {
          '0%': { backgroundColor: 'yellow' },
          '100%': { backgroundColor: 'transparent' }
        }
      }
    }
  },
  plugins: []
} satisfies Config
