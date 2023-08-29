import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import axios from 'axios';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './styles/element/index.scss';
import './styles/global.css';


// 配置请求的跟路径
// axios.defaults.baseURL = 'https://service.test.nttcc.com.cn/api/v1/service_type/ladderlist'
axios.interceptors.request.use(config => {
  // console.log(config)
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 在最后必须 return config
  return config
})


// import './style.css';
// const router = VueRouter.createRouter({
//     history: VueRouter.createWebHashHistory(),
//     routes: [
//         { path: '/', redirect: 'login' },
//         { path: '/login', component: login },
//     ]
// })

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.config.globalProperties.$axios = axios
app.use(ElementPlus)
app.use(router);
app.mount('#app');