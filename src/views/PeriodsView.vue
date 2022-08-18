<script setup>
import { computed, ref, onMounted } from 'vue'
import { useMainStore } from '@/stores/main'
import { usePeriodStore } from '@/stores/period.js'

import BaseLevel from '@/components/BaseLevel.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import BaseButton from '@/components/BaseButton.vue'

import CardBoxWidget from '@/components/CardBoxWidget.vue'
import CardBox from '@/components/CardBox.vue'
import SectionMain from '@/components/SectionMain.vue'
import SectionTitleBar from '@/components/SectionTitleBar.vue'
import SectionHeroBar from '@/components/SectionHeroBar.vue'

import TableSampleClients from '@/components/TableSampleClients.vue'
import NotificationBar from '@/components/NotificationBar.vue'
import CardBoxTransaction from '@/components/CardBoxTransaction.vue'
import CardBoxClient from '@/components/CardBoxClient.vue'
import SectionTitleBarSub from '@/components/SectionTitleBarSub.vue'

//import PillTag from '@/components/PillTag.vue'
import PeriodStatus from '@/components/PeriodStatus.vue'

import { mdiWrenchClock, mdiPen, mdiPlus } from '@mdi/js'

const titleStack = ref(['Admin', 'Perioder'])

const mainStore = useMainStore()
const periodStore = usePeriodStore()

const getPeriods = computed(() => {
  return periodStore.getPeriods
})

let periods = computed(() => {
  return periodStore.getPeriods
})

onMounted(() => {
  periodStore.fetchPeriods();
})

const modalCreatePeriod = ref(false)

</script>

<template>
  <SectionTitleBar :title-stack="titleStack" />

    <CardBox
      class="mb-6"
      title="Perioder"
      :icon="mdiWrenchClock"
      :headerIcon="mdiPlus"
      has-table
    >
        <table>
          <thead>
            <tr>
              <th>Namn</th>
              <th>Från</th>
              <th>Till</th>
              <th>Status</th>
              <th>Beskrivning</th>
              <th />
            </tr>
          </thead>
          <tbody v-if="periods">
            <tr
              v-for="period in periods"
              :key="period.id"
            >
              <td data-label="Name">
                {{ period.name }}
              </td>
              <td data-label="From">
                {{ new Date(period.from * 1000).toLocaleDateString() }}
              </td>
              <td data-label="To">
                {{ new Date(period.to * 1000).toLocaleDateString()}}
              </td>
              <td data-label="Status">
                <PeriodStatus :text="period.status" />
              </td>
              <td data-label="Description">
                {{ period.description }}
              </td>
              <td class="before:hidden lg:w-1 whitespace-nowrap">
                <BaseButtons
                  type="justify-start lg:justify-end"
                  no-wrap
                >
                  <BaseButton
                    color="info"
                    :icon="mdiPen"
                    small
                    @click="isModalActive = true"
                  />
                </BaseButtons>
              </td>
            </tr>
          </tbody>
        </table>

    </CardBox>

</template>
