<script setup>
import { computed, ref, onMounted } from 'vue'
import { useMainStore } from '@/stores/main'
import {
  mdiAccountMultiple,
  mdiCartOutline,
  mdiFinance,
  mdiMonitorCellphone,
  mdiReload,
  mdiGithub
} from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import SectionTitleBar from '@/components/SectionTitleBar.vue'
import SectionHeroBar from '@/components/SectionHeroBar.vue'
import CardBoxWidget from '@/components/CardBoxWidget.vue'
import CardBox from '@/components/CardBox.vue'
import TableSampleClients from '@/components/TableSampleClients.vue'
import NotificationBar from '@/components/NotificationBar.vue'
import BaseButton from '@/components/BaseButton.vue'
import CardBoxTransaction from '@/components/CardBoxTransaction.vue'
import CardBoxClient from '@/components/CardBoxClient.vue'
import SectionTitleBarSub from '@/components/SectionTitleBarSub.vue'

const titleStack = ref(['Admin', 'Användare'])

const mainStore = useMainStore()

const clientBarItems = computed(() => mainStore.clients.slice(0, 3))

const transactionBarItems = computed(() => mainStore.history.slice(0, 3))
</script>

<template>
  <SectionTitleBar :title-stack="titleStack" />
  <SectionHeroBar>Användare</SectionHeroBar>
  <SectionMain>

  </SectionMain>
</template>
