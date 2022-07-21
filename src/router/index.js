import { createRouter, createWebHashHistory } from 'vue-router'
import Style from '@/views/StyleView.vue'
import Home from '@/views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/dashboard',
  },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'Dashboard'
    },
    path: '/dashboard',
    name: 'dashboard',
    component: Home
  },
  {
    meta: {
      title: 'Bokningar'
    },
    path: '/bookings',
    name: 'bookings',
    component: () => import('@/views/BookingsView.vue')
  },
  {
    meta: {
      title: 'Arbetspass'
    },
    path: '/timeslots',
    name: 'timeslots',
    component: () => import('@/views/TimeslotsView.vue')
  },
  {
    meta: {
      title: 'Assistenter'
    },
    path: '/assistants',
    name: 'assistants',
    component: () => import('@/views/AssistantsView.vue')
  },
  {
    meta: {
      title: 'Konfigurering'
    },
    path: '/config',
    name: 'config',
    component: () => import('@/views/ConfigView.vue')
  },
  {
    meta: {
      title: 'Scheman'
    },
    path: '/schedules',
    name: 'schedules',
    component: () => import('@/views/SchedulesView.vue')
  },
  {
    meta: {
      title: 'Login',
      fullScreen: true
    },
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue')
  },
  {
    meta: {
      title: 'Error',
      fullScreen: true
    },
    path: '/error',
    name: 'error',
    component: () => import('@/views/ErrorView.vue')
  },
  {
    meta: {
      title: '404',
      fullScreen: true
    },
    path: '/404',
    name: 'page404',
    component: () => import('@/views/Page404View.vue')
  },
  {
    meta: {
      title: '500',
      fullScreen: true
    },
    path: '/500',
    name: 'page500',
    component: () => import('@/views/Page500View.vue')
  },
  {
    meta: {
      title: 'Logout',
      fullScreen: true
    },
    path: '/logout',
    name: 'logout',
    component: () => import('@/views/LogoutView.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior (to, from, savedPosition) {
    return savedPosition || { top: 0 }
  }
})

export default router
