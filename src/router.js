import * as VueRouter from 'vue-router'
import login from './components/login.vue'
import mysubject from './components/manage/subject.vue'
import manage from './components/managehome.vue'
import practice from './components/practice.vue'
import search from './components/search.vue'
import docxpreview from './components/yy/docxpreview.vue'
import primaryEnglish from './components/yy/primary.vue'
// Vue.use(Router)

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes: [
        { path: '/', redirect: 'login' },
        { path: '/login', component: login },
        { path: '/search', component: search },
        { path: '/practice', component: practice },
        { path: '/primaryEnglish', component: primaryEnglish },
        { path: '/docxpreview', component: docxpreview },
        {
            path: '/manage',
            component: manage,
            redirect: '/mysubject',
            children: [
                { path: '/mysubject', component: mysubject },
                
            ]
        },
        
    ]
})

router.beforeEach((to, from, next) => {
    // to 将要访问的路径
    // from 代表从哪个路径跳转而来
    // next 是一个函数，表示放行
    //     next()  放行    next('/login')  强制跳转
  
    if (to.path === '/login') return next()
    // 获取token
    const tokenStr = window.sessionStorage.getItem('token')
    if (!tokenStr) return next('/login')
    next()
  })

export default router
