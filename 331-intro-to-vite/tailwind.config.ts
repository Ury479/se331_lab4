import type { Config } from 'tailwindcss'

export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      // 添加阴影效果
      boxShadow: {
        'sp': '0 3px 12px 0 rgba(255, 0, 0, 0.3)',
      }
    },
  },
  fontFamily:{
    sans: ['Avenir','Helvetica','Arial','sans-serif'],
  },
  animation:{
    fade:'yellowFade 3s ease-in-out',
  },
  keyframes:{
    yelloFade:{
      '0%':{backgroundColor:'yellow'},
      '100%':{backgroundColor:'transparent'},
    },
  },
  plugins: [],
} satisfies Config
