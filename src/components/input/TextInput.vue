<script setup lang="ts">
import type { Props, InputValueType, Emits } from './InputBase'

defineProps<Props<InputValueType>>()
const model = defineModel()
defineEmits<Emits<InputValueType>>()
</script>

<template>
  <input type="text" v-model="model" />
</template>
