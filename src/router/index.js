import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'


export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },


  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '主页', icon: 'dashboard' }
    }]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user',
    // meta: { title: '管理', icon: 'user' },
    children: [
      {
        path: '/user',
        component: () => import('@/views/user/index'),
        meta: { title: '用户', icon: 'wares' }
      },


    ]
  },

  {
    path: '/api',
    component: Layout,
    redirect: '/api',
    // meta: { title: '管理', icon: 'user' },
    children: [
      {
        path: '/api',
        component: () => import('@/views/api/index'),
        meta: { title: '接口', icon: 'cart' }
      },
    ]
  },



  {
    path: '/cert',
    component: Layout,
    redirect: '/cert',
    // meta: { title: '管理', icon: 'user' },
    children: [
      {
        path: '/cert',
        component: () => import('@/views/cert/index'),
        meta: { title: '凭证', icon: 'cart' }
      },
    ]
  },



  {
    path: '/invoke',
    component: Layout,
    redirect: '/invoke',
    // meta: { title: '管理', icon: 'user' },
    children: [

      {
        path: '/invoke',
        component: () => import('@/views/invoke/index'),
        meta: { title: '调用', icon: 'order' }
      },
    ]
  },


  {
    path: '/no-auth',
    component: () => import('@/views/no-auth'),
    name: 'NoAuth',
    hidden: true
  },



  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
