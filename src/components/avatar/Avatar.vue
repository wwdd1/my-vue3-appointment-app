<script setup lang="ts">
import { computed } from 'vue'
import { type Props, type Emits, EMIT_TYPE_CLICK } from './AvatarBase'

const props = defineProps<Props>()
const emit = defineEmits<Emits<MouseEvent>>()

const backgroundColorStyle = computed(() => ({
  'background-color': props.backgroundColor
}))

function onClick(event: MouseEvent) {
  emit(EMIT_TYPE_CLICK, event)
}
</script>

<template>
  <span
    @click="onClick"
    :style="backgroundColorStyle"
    class="rounded-full w-12 h-12 flex items-center justify-center border border-white border-2 text-white"
  >
    {{ initials }}
  </span>
</template>
