<script setup lang="ts">
import { type Props, type Emits, EMIT_TYPE_CLICK } from './ButtonBase'

defineProps<Props>()
const emit = defineEmits<Emits<MouseEvent>>()

function onClick(event: MouseEvent) {
  emit(EMIT_TYPE_CLICK, event)
}
</script>

<template>
  <button @click="onClick" class="bg-black text-white px-4 py-2">
    {{ label }}
  </button>
</template>
