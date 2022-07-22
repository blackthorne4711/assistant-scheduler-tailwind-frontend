<script setup>
import SectionFullScreen from '@/components/SectionFullScreen.vue'
import CardBox from '@/components/CardBox.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
</script>

<template>
  <SectionFullScreen
    v-slot="{ cardClass, cardRounded }"
    bg="logout"
  >
    <CardBox
      :class="cardClass"
      :rounded="cardRounded"
    >
      <div class="space-y-3">
        <h1 class="text-2xl">
          Du har loggats ut
        </h1>

        <p>Gå till Login</p>
      </div>

      <BaseDivider />

      <BaseButtons>
        <BaseButton
          label="Login"
          to="/login"
          color="info"
        />
      </BaseButtons>
    </CardBox>
  </SectionFullScreen>
</template>
