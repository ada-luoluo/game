import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue'),
  },
  {
    path: '/introduce',
    name: 'Introduce',
    component: () => import('@/views/Introduce.vue')
  },
  {
    path: '/introDetails/:id',
    name: 'introDetails',
    component: () => import('@/views/introDetails/introDetails.vue')
  },
  {
    path: '/exchange',
    name: 'Exchange',
    component: () => import('@/views/Exchange.vue')
  },
  {
    path: '/exchangeDetails/:id',
    name: 'exchangeDetails',
    component: () => import('@/views/exchangeDetails/exchangeDetails.vue')
  },
  {
    path: '/leaderboard/:id',
    name: 'Leaderboard',
    component: () => import('@/views/Leaderboard.vue')
  },
  {
    path: '/news',
    name: 'News',
    component: () => import('@/views/News.vue')
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('@/views/Contact.vue')
  },
  {
    path: '/serve',
    name: 'Serve',
    component: () => import('@/views/Serve.vue')
  },
  {
    path: '/privacy',
    name: 'Privacy',
    component: () => import('@/views/Privacy.vue')
  },
  {
    path: '/disclaimer',
    name: 'Disclaimer',
    component: () => import('@/views/Disclaimer.vue')
  },

  // 个人中心页面, 与会员相关
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/member/Login.vue')
  },
  {
    path: '/register/:invite_code?',
    name: 'Register',
    component: () => import('@/views/member/Register.vue')
  },
  {
    path: '/forget',
    name: 'Forget',
    component: () => import('@/views/member/Forget.vue')
  },
  {
    path: '/personal',
    name: 'Personal',
    component: () => import('@/views/member/Personal.vue')
  },

  {
    path: '/exchangeTele',
    name: 'exchangeTele',
    component: () => import('@/views/member/exchangeTele.vue')
  },
  {
    path: '/password',
    name:'Password',
    component: () => import('@/views/member/Password.vue')
  },
  {
    path: '/invite',
    name:'Invite',
    component: () => import('@/views/member/Invite.vue')
  },
  {
    path: '/gold',
    name:'Gold',
    component: () => import('@/views/member/Gold.vue')
  },
  {
    path: '/integral',
    name:'Integral',
    component: () => import('@/views/member/Integral.vue')
  },
  {
    path: '/gift',
    name:'Gift',
    component: () => import('@/views/member/Gift.vue')
  },

]



const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  //scrollBehavior滚动行为
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 } //期望滚动到哪个的位置
    }
  },
})


//路由点击跳转后页面回到顶部
router.beforeEach((to, form, next) => {
window.scrollTo(0, 0)
  next()
})



export default router
