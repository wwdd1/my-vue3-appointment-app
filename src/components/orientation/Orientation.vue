<script setup lang="ts">
import { computed, useSlots } from 'vue'
import { type Props, type Emits } from './OrientationBase'

const { orientation } = defineProps<Props>()
defineEmits<Emits<MouseEvent>>()

const slots = useSlots()
const slotNodes = slots.default ? slots.default() : []

const classes = computed(() => {
  if (orientation === 'horizontal') {
    return 'flex items-center'
  }
  return 'flex flex-col'
})
</script>

<template>
  <div :class="classes">
    <div class="flex-1" v-for="node in slotNodes" :key="String(node.key)">
      <component :is="node"></component>
    </div>
  </div>
</template>
