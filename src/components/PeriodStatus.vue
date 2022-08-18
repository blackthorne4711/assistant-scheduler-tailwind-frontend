<script setup>
import { computed } from 'vue'
import { colorsBg } from '@/colors.js'
import PillTag from '@/components/PillTag.vue'

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  small: Boolean,
})

const type = computed(() => {
  let matchedType = "light"
  // TODO - add outline = false, and set to true for LOCKED (before Open)

  switch(props.text) {
    case 'PREPARE':
      matchedType = "info"
      break;
    case 'OPEN':
      matchedType = 'success'
      break;
    case 'ARCHIVED':
      matchedType = 'warning'
      break;
  }

  return matchedType
})
</script>

<template>
  <PillTag
    :type="type"
    :text="props.text"
    small
  />
</template>
