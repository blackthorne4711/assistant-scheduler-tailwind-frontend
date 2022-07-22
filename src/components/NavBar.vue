<script setup>
import { computed, ref } from 'vue'
import { useMainStore } from '@/stores/main.js'
import { useAuthStore } from '@/stores/auth.js'
import { useStyleStore } from '@/stores/style.js'
import { useLayoutStore } from '@/stores/layout.js'
import {
  mdiForwardburger,
  mdiBackburger,
  mdiClose,
  mdiDotsVertical,
  mdiMenu,
  mdiClockOutline,
  mdiCloud,
  mdiCrop,
  mdiAccount,
  mdiCogOutline,
  mdiEmail,
  mdiLogout,
  mdiGithub,
  mdiThemeLightDark,
  mdiMonitorShimmer,
  mdiOpenInNew
} from '@mdi/js'
import NavBarItem from '@/components/NavBarItem.vue'
import NavBarItemLabel from '@/components/NavBarItemLabel.vue'
import NavBarMenu from '@/components/NavBarMenu.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import UserAvatar from '@/components/UserAvatar.vue'
import BaseIcon from '@/components/BaseIcon.vue'

const mainStore = useMainStore()
const authStore = useAuthStore()

//const userName = computed(() => authStore.user != undefined ? authStore.user.email : '')
let userName = computed(() => authStore.userEmail )

const styleStore = useStyleStore()

const toggleLightDark = () => {
  styleStore.setDarkMode()
}

const layoutStore = useLayoutStore()

const isNavBarVisible = computed(() => !layoutStore.isFullScreen)

const isAsideMobileExpanded = computed(() => layoutStore.isAsideMobileExpanded)

const menuToggleMobileIcon = computed(() => isAsideMobileExpanded.value ? mdiBackburger : mdiForwardburger)

const menuToggleMobile = () => layoutStore.asideMobileToggle()

const isMenuNavBarActive = ref(false)

const menuNavBarToggleIcon = computed(() => isMenuNavBarActive.value ? mdiClose : mdiDotsVertical)

const menuNavBarToggle = () => {
  isMenuNavBarActive.value = !isMenuNavBarActive.value
}

const menuOpenLg = () => {
  layoutStore.asideLgToggle(true)
}

const logout = () => {
  //
}
</script>

<template>
  <nav
    v-show="isNavBarVisible"
    class="top-0 left-0 right-0 fixed flex bg-white h-14 border-b border-gray-100 z-30 w-screen
    transition-position xl:pl-60 dark:bg-gray-900 dark:border-gray-800"
    :class="{'ml-60 lg:ml-0':isAsideMobileExpanded}"
  >

    <div class="flex-1 items-stretch flex h-14">

      <!-- // Mobile menu icon -->
      <NavBarItem
        type="flex lg:hidden"
        @click.prevent="menuToggleMobile"
      >
        <BaseIcon
          :path="menuToggleMobileIcon"
          size="24"
        />
      </NavBarItem>

      <!-- // Medium Menu icon -->
      <NavBarItem
        type="hidden lg:flex xl:hidden"
        @click.prevent="menuOpenLg"
      >
        <BaseIcon
          :path="mdiMenu"
          size="24"
        />
      </NavBarItem>

      <!-- // Mobile title -->
      <div
        class="
          py-3 px-6 text-center
          lg:hidden
        ">
        <b class="font-semibold text-xl">Stallhjälpen (mobil)</b>
      </div>

      <!-- // Medium title -->
      <div
        class="
          py-3 px-6 text-center
          hidden lg:flex xl:hidden
        ">
        <b class="font-semibold text-xl">Stallhjälpen (medium)</b>
      </div>

      <!-- // Full title -->
      <div
        class="
          py-3 px-6 text-center
          hidden xl:flex
        ">
        <b class="font-semibold text-xl">Stallhjälpen (full)</b>
      </div>

    </div>

    <!-- <div class="flex-1 items-stretch flex h-14"> -->

    <!-- TODO Mobile-->
    <!-- <div
      class="
        py-4 px-6 px-0 text-center
      ">
      <span>Stallhjälpen</span> <b class="font-black">Mobile</b>
    </div>

    </div> -->

    <!-- Mobile dot icon to expand Navbar menu -->
    <div class="flex-none items-stretch flex h-14 lg:hidden">
      <NavBarItem @click.prevent="menuNavBarToggle">
        <BaseIcon
          :path="menuNavBarToggleIcon"
          size="24"
        />
      </NavBarItem>
    </div>

    <div
      class="absolute w-screen top-14 left-0 bg-white shadow
        lg:w-auto lg:items-stretch lg:flex lg:grow lg:static lg:border-b-0 lg:overflow-visible lg:shadow-none dark:bg-gray-900"
      :class="[isMenuNavBarActive ? 'block' : 'hidden']"
    >

      <!-- Large and above -->
      <div
        class="max-h-screen-menu overflow-y-auto lg:overflow-visible lg:flex lg:items-stretch lg:justify-end lg:ml-auto"
      >

        <NavBarMenu has-divider>
          <NavBarItemLabel :label="userName">
            <UserAvatar class="w-6 h-6 mr-3 inline-flex" />
          </NavBarItemLabel>

          <template #dropdown>
            <NavBarItem to="/profile">
              <NavBarItemLabel
                :icon="mdiAccount"
                label="Min profil"
              />
            </NavBarItem>
            <NavBarItem to="/logout">
              <NavBarItemLabel
                :icon="mdiLogout"
                label="Logga ut"
              />
            </NavBarItem>
          </template>
        </NavBarMenu>
      </div>
    </div>
  </nav>
</template>
