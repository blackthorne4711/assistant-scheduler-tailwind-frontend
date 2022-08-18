<script setup>
import { computed } from 'vue'
import { RouterView } from 'vue-router'

import { useMainStore } from '@/stores/main.js'
import { useAuthStore } from '@/stores/auth.js'
import { useLayoutStore } from '@/stores/layout.js'

import menu from '@/menu.js'

import NavBar from '@/components/NavBar.vue'
import AsideMenu from '@/components/AsideMenu.vue'
import FooterBar from '@/components/FooterBar.vue'
import OverlayLayer from '@/components/OverlayLayer.vue'

// Firebase
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "@/plugins/firebase";

// Auth store has user and auth
const mainStore = useMainStore()
const store = useAuthStore();

// Keep track of user and auth changes
onAuthStateChanged(auth, (user) => {
  if (user) {
    store.user = user;
    store.isLoggedIn = true;
  } else {
    store.user = null;
    store.isLoggedIn = false;
  }
})

const layoutStore = useLayoutStore()

const isAsideLgActive = computed(() => layoutStore.isAsideLgActive)

const overlayClick = () => {
  layoutStore.asideLgToggle(false)
}
</script>

<template>
  <NavBar />
  <AsideMenu :menu="menu" />
  <RouterView />
  <FooterBar />
  <OverlayLayer
    v-show="isAsideLgActive"
    z-index="z-30"
    @overlay-click="overlayClick"
  />
</template>
