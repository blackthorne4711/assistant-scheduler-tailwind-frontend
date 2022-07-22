import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { useMainStore } from '@/stores/main.js'
import { useAuthStore } from '@/stores/auth.js'
import { useStyleStore } from '@/stores/style.js'
import { useLayoutStore } from '@/stores/layout.js'
import { darkModeKey, styleKey } from '@/config.js'

import Toaster from '@meforma/vue-toaster'

//import firebaseService from '@/services/FirebaseService.js'

// Firebase
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from "@/plugins/firebase"

import './css/main.css'

/* Init Pinia */
const pinia = createPinia()

// pinia.use(({ authStore }) => {
//   authStore.router = markRaw(router)
// })
pinia.use(({ store }) => {
  store.router = markRaw(router)
})

/* Init Pinia stores */
const mainStore = useMainStore(pinia)
const authStore = useAuthStore(pinia)
const styleStore = useStyleStore(pinia)
const layoutStore = useLayoutStore(pinia)

// Initialize Firebase service
//firebaseService.init(mainStore)

/* App style */
styleStore.setStyle(localStorage[styleKey] ?? 'basic')

/* Dark mode */
if ((!localStorage[darkModeKey] && window.matchMedia('(prefers-color-scheme: dark)').matches) || localStorage[darkModeKey] === '1') {
  styleStore.setDarkMode(true)
}

/* Default title tag */
// const defaultDocumentTitle = 'Stallhjälpen'

/* Refresh from Firebase Auth state */
// const getCurrentUser = () =>
//   new Promise((resolve, reject) => {
//     const removeListener = onAuthStateChanged(
//       getAuth(),
//       (user) => {
//         removeListener()
//         resolve(user)
//       },
//       reject,
//     )
//   })


/* Create Vue app */
// const app = createApp(App)
// app.use(pinia)
// app.use(Toaster, { position: 'top' })
// app.use(router)
// app.mount('#app')
let app

onAuthStateChanged(auth, () => {
  if (!app) {
    app = createApp(App)

    app.use(pinia)
    app.use(Toaster, { position: 'top' })
    app.use(router)

    app.mount("#app")
  }
})
