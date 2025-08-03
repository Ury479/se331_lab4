import './assets/style.css'
// import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import {createPinia} from "pinia";
import router from './router'
import pinia from './stores'
import 'nprogress/nprogress.css'
import nProgress from 'nprogress'

// 配置 nprogress
nProgress.configure({
  showSpinner: false, // 禁用加载环
  speed: 500,         // 动画速度
  minimum: 0.2        // 最小百分比
})

const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')
