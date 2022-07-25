import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/HomeView.vue'
import { getCurrentUser } from '@/plugins/firebase'

import { useLayoutStore } from '@/stores/layout.js'
import { useAuthStore } from '@/stores/auth.js'

/* Default title tag */
const defaultDocumentTitle = 'Stallhjälpen'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    redirect: '/dashboard',
  },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'Dashboard',
      requireAuth: true,
    },
    path: '/dashboard',
    name: 'dashboard',
    component: Home
  },
  {
    meta: {
      title: 'Bokningar',
      requireAuth: true,
    },
    path: '/bookings',
    name: 'bookings',
    component: () => import('@/views/BookingsView.vue')
  },
  {
    meta: {
      title: 'Arbetspass',
      requireAuth: true,
    },
    path: '/timeslots',
    name: 'timeslots',
    component: () => import('@/views/TimeslotsView.vue')
  },
  {
    meta: {
      title: 'Assistenter',
      requireAuth: true,
    },
    path: '/assistants',
    name: 'assistants',
    component: () => import('@/views/AssistantsView.vue')
  },
  {
    meta: {
      title: 'Konfigurering',
      requireAuth: true,
    },
    path: '/config',
    name: 'config',
    component: () => import('@/views/ConfigView.vue')
  },
  {
    meta: {
      title: 'Perioder',
      requireAuth: true,
    },
    path: '/periods',
    name: 'periods',
    component: () => import('@/views/PeriodsView.vue')
  },
  {
    meta: {
      title: 'Scheman',
      requireAuth: true,
    },
    path: '/schedules',
    name: 'schedules',
    component: () => import('@/views/SchedulesView.vue')
  },
  {
    meta: {
      title: 'Användare',
      requireAuth: true,
    },
    path: '/users',
    name: 'users',
    component: () => import('@/views/UsersView.vue')
  },
  {
    meta: {
      title: 'Inställningar',
      requireAuth: true,
    },
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/ProfileView.vue')
  },
  {
    meta: {
      title: 'Login',
      fullScreen: true,
      redirectIfAuthenticated: true,
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

/* Collapse mobile aside menu on route change */
router.beforeEach(async (to, from, next) => {
  const authUser = await getCurrentUser()
  const requireAuth = to.matched.some((route) => route.meta.requireAuth)

  console.log('To - ' + to.name)
  console.log('authUser - ' + authUser)
  console.log(authUser)
  console.log('requireAuth - ' + requireAuth)

  const authStore = useAuthStore()

  if (authUser) {
    authStore.userEmail = authUser.email
  }

  const layoutStore = useLayoutStore()

  layoutStore.asideMobileToggle(false)
  layoutStore.asideLgToggle(false)

  if (requireAuth && !authUser) {
    next({ name: "login" })
  } else if (to.meta.redirectIfAuthenticated && authUser) {
    next({ name: "home" })
  } else {
    next()
  }
})

router.afterEach(to => {
  /* Set document title from route meta */
  document.title = to.meta?.title
    ? `${to.meta.title} — ${defaultDocumentTitle}`
    : defaultDocumentTitle

  /* Full screen mode */
  const layoutStore = useLayoutStore()
  layoutStore.fullScreenToggle(!!to.meta.fullScreen)
})

export default router
