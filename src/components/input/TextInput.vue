<script setup lang="ts">
import type { Props, InputValueType, Emits } from './InputBase'

defineProps<Props<InputValueType>>()
const model = defineModel()
const emit = defineEmits<Emits<InputValueType>>()
</script>

<template>
  <input type="text" v-model="model" />
</template>
